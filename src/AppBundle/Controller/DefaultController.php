<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        return $this->render('@App/Default/index.html.twig');
    }

    /**
     * @Route("/stop-smoking", name="stop_smoking_choices")
     */
    public function stopSmokingAction(Request $request)
    {
        return $this->render('@App/Default/stop_smoking.html.twig');
    }

    /**
     * @Route("/stop-smoking/telephone-advisor", name="stop_smoking_advisor")
     */
    public function stopSmokingAdvisorAction(Request $request)
    {
        return $this->render('@App/Default/stop_smoking_map.html.twig', [
            "title" => "You are making an appointment<br />with an advisor",
            "type" => 'advisor'
        ]);
    }

    /**
     * @Route("/stop-smoking/using-medicines", name="stop_smoking_medicines")
     */
    public function stopSmokingMedicinesAction(Request $request)
    {
        return $this->render('@App/Default/stop_smoking_map.html.twig', [
            "title" => "You are getting a stop smoking medicine",
            "type" => 'medicine'
        ]);
    }

    /**
     * @Route("/stop-smoking/alone-with-websites-and-apps", name="stop_smoking_alone")
     */
    public function stopSmokingAloneAction(Request $request)
    {
        return $this->render('@App/Default/stop_smoking_alone.html.twig');
    }

    /**
     * @Route("/boroughs.json", name="boroughs_json")
     */
    public function boroughJsonAction(Request $request)
    {
        $response = new JsonResponse();
        if ($this->container->getParameter('kernel.debug') || $this->isCsrfTokenValid('borough_json', $request->query->get('token'))) {
            $csrf = $this->get('security.csrf.token_manager');
            $token = $csrf->refreshToken('borough_json');

            $boroughs = $this->getDoctrine()->getRepository('AppBundle:Borough')->findAll();

            $lastUpdatedDate = null;
            foreach($boroughs as $borough)
            {
                $lastModified = $borough->getModifiedAt();
                $service = $borough->getService();
                $serviceLastModified = $service ? $borough->getService()->getModifiedAt() : new \DateTime("1970");
                if($serviceLastModified > $lastModified)
                {
                    $lastModified = $serviceLastModified;
                }
                if(null === $lastUpdatedDate || $lastModified > $lastUpdatedDate)
                {
                    $lastUpdatedDate = $lastModified;
                }
            }
            $response->setCache(array(
                'etag'          => 'borough-geojson',
                'last_modified' => $lastUpdatedDate,
                'max_age'       => (86400*365)/2, //.5 years
                's_maxage'      => (86400*365)/2, //.5 years
                'public'        => true,
                // 'private'    => true,
            ));
            // Check that the Response is not modified for the given Request
            if ($response->isNotModified($request)) {
                // return the 304 Response immediately
                return $response;
            }

            // Populate complete array
            $data = array(
                "type" => "FeatureCollection",
                "features" => []
            );
            foreach($boroughs as $borough)
            {
                $service = $borough->getService();
                $data['features'][] = array(
                    "type" => "Feature",
                    "id" => $borough->getId(),
                    "properties" => array(
                        "name" => $borough->getName(),
                        "service" => $service ? $service->getName() : null,
                        "telephone" => $service ? $service->getTelephone() : null,
                        "website" => $service ? $service->getWebsite() : null,
                        "created" => $service ? $service->getCreatedAt() : null,
                        "modified" => $service ? $service->getModifiedAt() : null,
                    ),
                    "geometry" => array(
                        "type" => "Polygon",
                        "coordinates" => json_decode($borough->getCoordinates())
                    )
                );
            }
            $response->setData($data);
            //$response->setEncodingOptions(JSON_PRETTY_PRINT);
            
        }
        else
        {
            $response->setStatusCode(JsonResponse::HTTP_FORBIDDEN);
        }
        return $response;
    }
}
