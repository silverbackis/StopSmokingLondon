<?php

namespace Tests\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class DefaultControllerTest extends WebTestCase
{
    public function testIndex()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/');

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertContains('Stop Smoking London', $crawler->filter('h1')->text());
    }

    public function testMailIsSentAndContentIsOk()
    {
        $client = static::createClient();

        $container = $client->getKernel()->getContainer();

        $CSRF_Token = (string)$container->get('security.csrf.token_manager')->getToken('contact');        

        // Enable the profiler for the next request (it does nothing if the profiler is not available)
        $client->enableProfiler();

        $crawler = $client->request('POST', '/contact', [
            'contact' => [
                '_token'    =>  $CSRF_Token,
                'subject'   =>  'General enquiry',
                'name'      =>  'Test name',
                'email'     =>  'info@silverback.is',
                'telephone' =>  '0208 133 2939',
                'message'   =>  'Test message post'
            ]
        ]);

        $mailCollector = $client->getProfile()->getCollector('swiftmailer');

        // Check that an email was sent
        $this->assertEquals(1, $mailCollector->getMessageCount(), $client->getResponse()->getContent());

        $collectedMessages = $mailCollector->getMessages();
        $message = $collectedMessages[0];

        // Asserting email data
        $this->assertInstanceOf('Swift_Message', $message);
        $this->assertEquals('New Contact Message: General enquiry', $message->getSubject());
        $this->assertEquals('outgoing@stopsmokingportal.com', key($message->getFrom()));
        $this->assertEquals('daniel@silverback.is', key($message->getTo()));
        $this->assertEquals('info@silverback.is', key($message->getReplyTo()));
        $this->assertContains(
            'Test message post',
            $message->getBody()
        );
    }
}
