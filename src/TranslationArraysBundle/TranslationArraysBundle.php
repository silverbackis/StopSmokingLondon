<?php

namespace TranslationArraysBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;
use TranslationArraysBundle\DependencyInjection\TranslationArraysExtension;

class TranslationArraysBundle extends Bundle
{
    public function getContainerExtension()
    {
        return new TranslationArraysExtension();
    }
}
