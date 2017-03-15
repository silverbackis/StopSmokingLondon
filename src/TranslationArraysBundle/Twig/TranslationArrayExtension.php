<?php

namespace TranslationArraysBundle\Twig;

use Symfony\Component\Translation\TranslatorInterface;

class TranslationArrayExtension extends \Twig_Extension
{
    private $translator;

    public function __construct(TranslatorInterface $translator) {
        $this->translator = $translator;
    }

    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('transarray', array($this, 'transArrayFilter')),
        );
    }

    public function transArrayFilter($id, $params = array(), $domain = null, $locale = null)
    {
        $returnArray = [];
        $catalogue = $this->translator->getCatalogue($locale);
        $i = 0;
        while( $catalogue->has("$id.$i", $domain) )
        {
            $returnArray[] = $this->translator->trans("$id.$i", $params, $domain, $locale);
            $i++;
        }
        return $returnArray;
    }

    public function getName()
    {
        return 'translation_array_extension';
    }
}