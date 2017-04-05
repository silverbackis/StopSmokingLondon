<?php

namespace Tests\AppBundle\Form;

use AppBundle\Form\ContactType;
use AppBundle\Entity\Contact;

use Symfony\Component\Form\Test\TypeTestCase;
use Symfony\Component\Form\PreloadedExtension;

use Symfony\Component\Translation\TranslatorInterface;

class ContactTypeTest extends TypeTestCase
{
    private $trans;

    protected function setUp()
    {
        // mock any dependencies
        $this->trans = $this->createMock(TranslatorInterface::class);

        parent::setUp();
    }

    protected function getExtensions()
    {
        // create a type instance with the mocked dependencies
        $type = new ContactType($this->trans);

        return array(
            // register the type instances with the PreloadedExtension
            new PreloadedExtension(array($type), array()),
        );
    }

    public function testSubmitValidData()
    {
        $formData = array(
            'subject' => 'General enquiry',
            'name' => 'Test Name',
            'email' => 'info@silverback.is',
            'telephone' => '0208 133 2939',
            'message' => 'Testing a message from the contact form',
        );

        // This fails currently although the builder seems to be created from the ContactType - Don't know why...
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