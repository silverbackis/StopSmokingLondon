<?php

namespace RestrictedLexikTranslationBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class RestrictedLexikTranslationBundle extends Bundle
{
    public function getParent()
    {
        return 'LexikTranslationBundle';
    }
}