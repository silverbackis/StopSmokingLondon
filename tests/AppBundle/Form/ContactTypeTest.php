<?php

namespace Tests\AppBundle\Form;

use AppBundle\Form\ContactType;
use AppBundle\Entity\Contact;
use Symfony\Component\Form\Test\TypeTestCase;

class ContactTypeTest extends TypeTestCase
{
    public function testSubmitValidData()
    {
        $formData = array(
            'subject' => 'General enquiry',
            'name' => 'Test Name',
            'email' => 'info@silverback.is',
            'telephone' => '0208 133 2939',
            'message' => 'Testing a message from the contact form',
        );

        $form = $this->factory->create(ContactType::class);
        $object = Contact::fromArray($formData);

        // submit the data to the form directly
        $form->submit($formData);
        $this->assertTrue($form->isSynchronized());
        $this->assertEquals($formData, $form->getData());

        $view = $form->createView();
        $children = $view->children;

        foreach (array_keys($formData) as $key) {
            $this->assertArrayHasKey($key, $children);
        }
    }
}