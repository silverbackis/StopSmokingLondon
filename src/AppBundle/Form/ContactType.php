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
use Symfony\Component\Translation\TranslatorInterface;

class ContactType extends AbstractType
{
    private $translator;
    public function __construct(TranslatorInterface $translator=null)
    {
        $this->translator = $translator;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $choicesLoaded = false;
        $index = 0;
        $choices = [];
        while(!$choicesLoaded)
        {
            $choiceKey = 'subject_choices.'.$index;
            $choice = $this->translator->trans($choiceKey, array(), 'contact');
            if($choice !== $choiceKey)
            {
                $choices[$choice] = $choice;
                $index++;
            }
            else
            {
                $choicesLoaded = true;
            }
        }

        $builder
            ->add('subject', ChoiceType::class, [
              'label' => 'labels.subject',
              'translation_domain' => 'contact',
              'required' => true,
              'choices' => $choices
            ])
            ->add('name', TextType::class, [
              'label' => 'labels.name',
              'translation_domain' => 'contact',
              'required' => true
            ])
            ->add('email', EmailType::class, [
              'label' => 'labels.email',
              'translation_domain' => 'contact',
              'required' => true
            ])
            ->add('telephone', TextType::class, [
              'label' => 'labels.telephone',
              'translation_domain' => 'contact',
              'required' => false
            ])
            ->add('message', TextareaType::class, [
              'label' => 'labels.message',
              'translation_domain' => 'contact',
              'required' => true
            ])
            ->add('submit', SubmitType::class, [
              'label' => 'labels.submit',
              'translation_domain' => 'contact'
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