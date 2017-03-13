<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('subject', ChoiceType::class, [
              'label' => 'Reason for contact',
              'required' => true,
              'choices' => [
                'General enquiry' => 'General enquiry'
              ]
            ])
            ->add('name', TextType::class, [
              'label' => 'Your name',
              'required' => true
            ])
            ->add('email', EmailType::class, [
              'label' => 'Your email',
              'required' => true
            ])
            ->add('telephone', TextType::class, [
              'label' => 'Your telephone number',
              'required' => false
            ])
            ->add('message', TextareaType::class, [
              'label' => 'Comment',
              'required' => true
            ])
            ->add('submit', SubmitType::class, [
              'label' => 'Send Message'
            ])
        ;
    }

    public function setDefaultOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'error_bubbling' => true
        ));
    }

    public function getName()
    {
        return 'contact_form';
    }
}