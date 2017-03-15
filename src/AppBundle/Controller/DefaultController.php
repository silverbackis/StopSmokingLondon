<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\HttpFoundation\JsonResponse;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

use AppBundle\Form\ContactType;
use AppBundle\Entity\Contact;

use Symfony\Component\Yaml\Yaml;

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
        $title = $this->getHeader($request);

        return $this->render('@App/Default/stop_smoking.html.twig', [
            'title' => $title,
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
        $title = $this->getHeader($request);

        return $this->render('@App/Default/stop_smoking_map.html.twig', [
            "type" => 'advisor',
            "title" => $title,
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
        $title = $this->getHeader($request);

        return $this->render('@App/Default/stop_smoking_map.html.twig', [
            "type" => 'medicine',
            "title" => $title,
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
        $title = $this->getHeader($request);

        return $this->render('@App/Default/stop_smoking_alone.html.twig', [
            "title" => $title,
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
        $title = $this->getHeader($request);

        // Add SDKs to template for Share buttons
        $bwBase = $this->container->get('bw.base');
        $bwBase->addSDK('facebook');
        $bwBase->addSDK('twitter');

        return $this->render('@App/Default/help_others_quit.html.twig', [
            "title" => $title,
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
        $title = $this->getHeader($request);

        return $this->render('@App/Default/find_out_more.html.twig', [
            'title' => $title,
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
        $title = $this->getHeader($request);

        return $this->render('@App/Default/websites_apps.html.twig', [
            'title' => $title,
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
     * @Route("/about", name="about_us")
     */
    public function aboutAction(Request $request)
    {
        $title = $this->getHeader($request);

        return $this->render('@App/Default/about_us.html.twig', [
            'title' => $title,
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
        $title = $this->getHeader($request);

        return $this->render('@App/Default/terms_privacy.html.twig', [
            'title' => $title,
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

        $contactEntity = new Contact();
        $form = $this->createForm(ContactType::class, $contactEntity, [
            'action' => $this->generateUrl('contact_us').'#contactform',
            'attr' => ['id' => 'contactform']
        ]);
        $form->handleRequest($request);
        $sendEmailResponse = $this->sendContactEmail($form);
        if($sendEmailResponse !== false)
        {
            return $sendEmailResponse;
        }

        $title = $this->getHeader($request);
        return $this->render('@App/Default/contact_us.html.twig', [
            'title' => $title,
            'breadcrumb' => array(
                array(
                    'path' => $this->generateUrl('homepage'),
                    'title' => 'Home'
                ),
                array(
                    'title' => 'Contact us'
                )
            ),
            'form' => $form->createView()
        ]);
    }

    private function sendContactEmail($form)
    {
        if ($form->isSubmitted() && $form->isValid()) {
            $contact = $form->getData();
            $message = \Swift_Message::newInstance()
                ->setSubject('New Contact Message: '.$contact->getSubject())
                ->setFrom([
                    'outgoing@stopsmokingportal.com' => 'Stop Smoking London'
                ])
                ->setTo('london@stopsmokingportal.com')
                ->setReplyTo($contact->getEmail())
                ->setBody(
                    $this->renderView(
                        '@App/Emails/contact.txt.twig', [
                            'contact' => $contact
                        ]
                    ),
                    'text/plain'
                );
            $this->get('mailer')->send($message);

            return $this->redirectToRoute('contact_success');
        }
        return false;
    }

    /**
     * @Route("/contact-success", name="contact_success")
     */
    public function contactSuccessAction(Request $request)
    {
        $title = $this->getHeader($request);

        $seoPage = $this->container->get('sonata.seo.page');
        $seoPage->addMeta('name', 'robots', 'noindex, nofollow');

        return $this->render('@App/Default/contact_success.html.twig', [
            'title' => $title,
            'breadcrumb' => array(
                array(
                    'path' => $this->generateUrl('homepage'),
                    'title' => 'Home'
                ),
                array(
                    'path' => $this->generateUrl('contact_us'),
                    'title' => 'Contact us'
                ),
                array(
                    'title' => 'Contact message sent'
                )
            )
        ]);
    }

    /**
     * @Route("/tooltip/{text}", name="tooltip_info")
     */
    public function tooltipInfo($text = '', Request $request)
    {
        $tooltipText = $this->get('translator')->trans($text, array(), 'tooltips');
        return new JsonResponse([
            'tooltip' => $tooltipText
        ]);
    }

    /**
     * @Route("/geocode", name="geocode")
     */
    /*public function geocodeAction(Request $request)
    {
        $response = new JsonResponse();
        // Allow in debug mode or if in production - only with a valid csrf token
        if ($this->isCsrfTokenValid('geocode_search', $request->request->get('token'))) {
            //$referrer_ip = $this->container->getParameter('kernel.debug') ? '88.98.91.88' : getHostByName(getHostName());
            $url = 'https://maps.googleapis.com/maps/api/geocode/json?'.http_build_query(array(
                'address'   =>    $request->request->get('address'),
                'key'       =>    $this->container->getParameter('google_map_api_key_server'),
                'region'    =>    'GB',
                'bounds'    =>    $request->request->get('bounds'),
            ));
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            //curl_setopt($ch, CURLOPT_HTTPHEADER, ["REMOTE_ADDR: $referrer_ip", "HTTP_X_FORWARDED_FOR: $referrer_ip"]);
            curl_setopt($ch, CURLOPT_REFERER, "https://www.stopsmokingportal.com");
            $rawResponse = curl_exec($ch);
            $responseData = json_decode($rawResponse, true);

            $response->setData($responseData);
        }
        else
        {
            $response->setStatusCode(JsonResponse::HTTP_FORBIDDEN);
        }
        return $response;
    }*/

    /**
     * @Route("/tweets.json", name="home_tweets")
     */
    public function homeTweets(Request $request)
    {
        // Dummy response for cache
        $response = new JsonResponse();

        // \Endroid\Twitter\Twitter
        $twitter = $this->get('endroid.twitter');

        $tweets = $twitter->getTimeline([
            'screen_name' => 'StopSmokingLon', 
            //'exclude_replies' => 'true', 
            //'include_rts' => 'true', 
            'count' => 6
        ]);
        $halfYear = round((86400*365)/2);
        $cacheArray = array(
            'last_modified' => new \DateTime(),
            'max_age'       => $halfYear, //.5 years
            's_maxage'      => $halfYear, //.5 years
            'public'        => true
        );
        //die(dump($tweets));
        if(!empty($tweets)) {
            $urls_found = [];
            $cacheArray['last_modified'] = new \DateTime($tweets[0]->created_at);
            $response->setCache($cacheArray);

            // Check that the Response is not modified for the given Request
            if ($response->isNotModified($request)) {
                // return the 304 Response immediately
                return $response;
            }

            foreach($tweets as $tweet) {
                # Assign text as a variable to modify
                $tweetText = isset($tweet->retweeted_status) ? $tweet->retweeted_status->text : $tweet->text;

                # Replace text with entities we want to make into links
                $entities = isset($tweet->retweeted_status) ? $tweet->retweeted_status->entities : $tweet->entities;
                $replacements = [];
                foreach($entities->hashtags as $hashtag)
                {
                    $replacements[] = [
                        'start' => $hashtag->indices[0],
                        'end' => $hashtag->indices[1],
                        'new' => '<a href="https://twitter.com/hashtag/'.$hashtag->text.'?src=hash" target="_blank">'.$hashtag->text.'</a>'
                    ];
                }
                foreach($entities->user_mentions as $user_mention)
                {
                    $replacements[] = [
                        'start' => $user_mention->indices[0],
                        'end' => $user_mention->indices[1],
                        'new' => '<a href="https://twitter.com/'.$user_mention->screen_name.'" target="_blank">@'.$user_mention->screen_name.'</a>'
                    ];
                }
                foreach($entities->urls as $url)
                {
                    /*
                    URL indicies can be wrong - let's find the URL ourselves
                     */
                    $url_occurances = array_count_values($urls_found);
                    $strposOffset = isset($url_occurances[$url->url]) ? $url_occurances[$url->url] : 0;
                    $url->indices[0] = strpos($tweetText, $url->url, $strposOffset);
                    $url->indices[1] = $url->indices[0]+strlen($url->url);
                    $replacements[] = [
                        'start' => $url->indices[0],
                        'end' => $url->indices[1],
                        'new' => '<a href="'.$url->expanded_url.'" target="_blank">'.$url->display_url.'</a>'
                    ];
                    $urls_found[] = $url->url;
                }
                
                usort($replacements, function($a,$b){
                    return($b["start"]-$a["start"]);
                });
                
                foreach($replacements as $r)
                {
                    $tweetText = substr_replace($tweetText, $r["new"], $r["start"], $r["end"] - $r["start"]);
                }

                # Set text variable back to object to read in
                $tweet->htmlText = $tweetText;
                $tweet->tweetUser = isset($tweet->retweeted_status) ? $tweet->retweeted_status->user : $tweet->user;
            }
        }
        $finalResponse = $this->render('@App/Default/home_tweets.html.twig', [
            'tweets' => $tweets
        ]);
        $finalResponse->setCache($cacheArray);
        return $finalResponse;
    }

    /**
     * @Route("/boroughs-and-messages.json", name="boroughs_json")
     */
    public function boroughJsonAction(Request $request)
    {
        $response = new JsonResponse();
        // Allow in debug mode or if in production - only with a valid csrf token
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
            $halfYear = round((86400*365)/2);
            $response->setCache(array(
                'etag'          => 'boroughs.json',
                'last_modified' => $lastUpdatedDate,
                'max_age'       => $halfYear,
                's_maxage'      => $halfYear,
                'public'        => true
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

            //Now let's get the messages javascript needs to display results.
            $locale = $this->get('translator')->getLocale();
            $kernel = $this->get('kernel');
            try{
                $path = $kernel->locateResource("@AppBundle/Resources/translations/pages/stop_smoking_chosen.$locale.yml");
            }catch(\InvalidArgumentException $e)
            {
                $path = $kernel->locateResource("@AppBundle/Resources/translations/pages/stop_smoking_chosen.en.yml");
            }
            $yamlArray = Yaml::parse(file_get_contents($path));
            $messages = [
                'map'   =>  $yamlArray['map_search_results'],
                'step2' =>  $yamlArray['steps'][2]
            ];


            $encoders = array(new JsonEncoder());
            $normalizer = new ObjectNormalizer();
            $normalizer->setCircularReferenceHandler(function ($object) {
                return array(
                    'id' => $object->getId(),
                    'name' => $object->getName()
                );
            });
            $serializer = new Serializer(array($normalizer), $encoders);
            
            $data = $serializer->serialize([
                'LoadedGeoJson' => $data,
                'messages' => $messages
            ], 'json');
            $response->setContent($data);
            //$response->setEncodingOptions(JSON_PRETTY_PRINT);
            
        }
        else
        {
            $response->setStatusCode(JsonResponse::HTTP_FORBIDDEN);
        }
        return $response;
    }

    private function getHeader(Request $request)
    {
        $page = $request->get('_route');
        $trans = $this->get('translator')->trans($page, array(), 'page_headers');
        if($trans === $page)
        {
            $ret = [
                'header' => $this->get('translator')->trans($page.'.header', array(), 'page_headers'),
                'lead' => $this->get('translator')->trans($page.'.lead', array(), 'page_headers')
            ];
        }
        else
        {
            $ret = [
                'header' => $trans,
                'lead' => null
            ];
        }
        $seoPage = $this->container->get('sonata.seo.page');
        $seoPage->setTitle($ret['header']." - ".$seoPage->getTitle());
        return $ret;
    }
}
