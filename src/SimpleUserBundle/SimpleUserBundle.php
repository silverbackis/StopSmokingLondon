<?php

namespace SimpleUserBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class SimpleUserBundle extends Bundle
{
    public function getParent()
    {
        return 'FOSUserBundle';
    }
}