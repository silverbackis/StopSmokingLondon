<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\HttpFoundation\JsonResponse;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

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
        $seoPage = $this->container->get('sonata.seo.page');
        $seoPage->setTitle("Ready to Stop Smoking - ".$seoPage->getTitle());

        return $this->render('@App/Default/stop_smoking.html.twig', [
            'title' => 'Ready to stop smoking?',
            'lead' => 'We\'ll help you find the best method for you.',
            'breadcrumb' => array(
                array(
                    'path' => $this->generateUrl('homepage'),
                    'title' => 'Home'
                ),
                array(
                    'title' => 'I want to stop smoking'
                )
            )
        ]);
    }

    /**
     * @Route("/stop-smoking/telephone-advisor", name="stop_smoking_advisor")
     */
    public function stopSmokingAdvisorAction(Request $request)
    {
        $seoPage = $this->container->get('sonata.seo.page');
        $seoPage->setTitle("Talk to a specialist advisor - ".$seoPage->getTitle());

        return $this->render('@App/Default/stop_smoking_map.html.twig', [
            "type" => 'advisor',
            "title" => "You are making an appointment<br />with an advisor",
            'breadcrumb' => array(
                array(
                    'path' => $this->generateUrl('homepage'),
                    'title' => 'Home'
                ),
                array(
                    'path' => $this->generateUrl('stop_smoking_choices'),
                    'title' => 'I want to stop smoking'
                ),
                array(
                    'title' => 'Book appointment'
                )
            )
        ]);
    }

    /**
     * @Route("/stop-smoking/using-medicines", name="stop_smoking_medicines")
     */
    public function stopSmokingMedicinesAction(Request $request)
    {
        $seoPage = $this->container->get('sonata.seo.page');
        $seoPage->setTitle("Getting a Stop Smoking Medicine - ".$seoPage->getTitle());

        return $this->render('@App/Default/stop_smoking_map.html.twig', [
            "type" => 'medicine',
            "title" => "You are getting a stop smoking medicine",
            'breadcrumb' => array(
                array(
                    'path' => $this->generateUrl('homepage'),
                    'title' => 'Home'
                ),
                array(
                    'path' => $this->generateUrl('stop_smoking_choices'),
                    'title' => 'I want to stop smoking'
                ),
                array(
                    'title' => 'Get medicine'
                )
            )
        ]);
    }

    /**
     * @Route("/stop-smoking/alone-with-websites-and-apps", name="stop_smoking_alone")
     */
    public function stopSmokingAloneAction(Request $request)
    {
        $seoPage = $this->container->get('sonata.seo.page');
        $seoPage->setTitle("Going it alone - ".$seoPage->getTitle());

        return $this->render('@App/Default/stop_smoking_alone.html.twig', [
            "title" => "You are going it alone",
            'breadcrumb' => array(
                array(
                    'path' => $this->generateUrl('homepage'),
                    'title' => 'Home'
                ),
                array(
                    'path' => $this->generateUrl('stop_smoking_choices'),
                    'title' => 'I want to stop smoking'
                ),
                array(
                    'title' => 'Going it alone'
                )
            )
        ]);
    }

    /**
     * @Route("/help-others-stop-smoking", name="help_others_stop")
     */
    public function familyFriendAction(Request $request)
    {
        $seoPage = $this->container->get('sonata.seo.page');
        $seoPage->setTitle("Help someone else stop smoking - ".$seoPage->getTitle());

        return $this->render('@App/Default/help_others_quit.html.twig', [
            "title" => "You want to help a family member or friend to stop",
            'breadcrumb' => array(
                array(
                    'path' => $this->generateUrl('homepage'),
                    'title' => 'Home'
                ),
                array(
                    'title' => 'Help someone else stop smoking'
                )
            )
        ]);
    }

    /**
     * @Route("/find-out-about-stopping-smoking", name="find_out_more")
     */
    public function stoppingInfoAction(Request $request)
    {
        $seoPage = $this->container->get('sonata.seo.page');
        $seoPage->setTitle("Find out more about stopping - ".$seoPage->getTitle());

        return $this->render('@App/Default/find_out_more.html.twig', [
            'title' => 'Find out more about stopping',
            'breadcrumb' => array(
                array(
                    'path' => $this->generateUrl('homepage'),
                    'title' => 'Home'
                ),
                array(
                    'title' => 'Find out more about stopping'
                )
            )
        ]);
    }

    /**
     * @Route("/stop-smoking-websites-and-apps", name="websites_apps")
     */
    public function websitesAppsAction(Request $request)
    {
        $seoPage = $this->container->get('sonata.seo.page');
        $seoPage->setTitle("Useful websites and apps - ".$seoPage->getTitle());

        return $this->render('@App/Default/websites_apps.html.twig', [
            'title' => 'Useful websites and apps',
            'breadcrumb' => array(
                array(
                    'path' => $this->generateUrl('homepage'),
                    'title' => 'Home'
                ),
                array(
                    'title' => 'Useful websites and apps'
                )
            )
        ]);
    }

    /**
     * @Route("/about-us", name="about_us")
     */
    public function aboutAction(Request $request)
    {
        $seoPage = $this->container->get('sonata.seo.page');
        $seoPage->setTitle("About us - ".$seoPage->getTitle());

        return $this->render('@App/Default/about_us.html.twig', [
            'title' => 'About Stop Smoking London',
            'breadcrumb' => array(
                array(
                    'path' => $this->generateUrl('homepage'),
                    'title' => 'Home'
                ),
                array(
                    'title' => 'About us'
                )
            )
        ]);
    }

    /**
     * @Route("/terms-privacy", name="terms_privacy")
     */
    public function termsAction(Request $request)
    {
        $seoPage = $this->container->get('sonata.seo.page');
        $seoPage->setTitle("Terms and privacy - ".$seoPage->getTitle());

        return $this->render('@App/Default/terms_privacy.html.twig', [
            'title' => 'Terms and Privacy',
            'breadcrumb' => array(
                array(
                    'path' => $this->generateUrl('homepage'),
                    'title' => 'Home'
                ),
                array(
                    'title' => 'Terms and privacy'
                )
            )
        ]);
    }

    /**
     * @Route("/contact", name="contact_us")
     */
    public function contactAction(Request $request)
    {
        $seoPage = $this->container->get('sonata.seo.page');
        $seoPage->setTitle("Contact us - ".$seoPage->getTitle());

        return $this->render('@App/Default/contact_us.html.twig', [
            'title' => 'Contact Stop Smoking London',
            'breadcrumb' => array(
                array(
                    'path' => $this->generateUrl('homepage'),
                    'title' => 'Home'
                ),
                array(
                    'title' => 'Contact us'
                )
            )
        ]);
    }

    /**
     * @Route("/tweets.json", name="home_tweets")
     */
    public function homeTweets(Request $request)
    {
        // \Endroid\Twitter\Twitter
        $twitter = $this->get('endroid.twitter');

        $tweets = $twitter->getTimeline([
            'screen_name' => 'StopSmokingLon', 
            //'exclude_replies' => 'true', 
            //'include_rts' => 'true', 
            'count' => 6
        ]);
        //die(dump($tweets));
        if(!empty($tweets)) {
            foreach($tweets as $tweet) {
                # Access as an object
                $tweetText = isset($tweet->retweeted_status) ? $tweet->retweeted_status->text : $tweet->text;
                # Make links active
                $tweetText = preg_replace("#(https://|(www.))(([^s<]{4,68})[^s<]*)#", '<a href="https://$2$3" target="_blank">$1$2$4</a>', $tweetText);
                # Linkify user mentions
                $tweetText = preg_replace("/@(w+)/", '<a href="https://www.twitter.com/$1" target="_blank">@$1</a>', $tweetText);
                # Linkify tags
                $tweetText = preg_replace("/#(w+)/", '<a href="https://search.twitter.com/search?q=$1" target="_blank">#$1</a>', $tweetText);
                # Output
                $tweet->text = $tweetText;
                $tweet->tweetUser = isset($tweet->retweeted_status) ? $tweet->retweeted_status->user : $tweet->user;
            }
        }
        return $this->render('@App/Default/home_tweets.html.twig', [
            'tweets' => $tweets
        ]);
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
                        "service" => $borough->getService() ?: null
                    ),
                    "geometry" => array(
                        "type" => "Polygon",
                        "coordinates" => json_decode($borough->getCoordinates())
                    )
                );
            }

            $encoders = array(new JsonEncoder());
            $normalizer = new ObjectNormalizer();
            $normalizer->setCircularReferenceHandler(function ($object) {
                return array(
                    'id' => $object->getId(),
                    'name' => $object->getName()
                );
            });
            $serializer = new Serializer(array($normalizer), $encoders);
            
            $data = $serializer->serialize($data, 'json');
            $response->setContent($data);
            //$response->setEncodingOptions(JSON_PRETTY_PRINT);
            
        }
        else
        {
            $response->setStatusCode(JsonResponse::HTTP_FORBIDDEN);
        }
        return $response;
    }
}
