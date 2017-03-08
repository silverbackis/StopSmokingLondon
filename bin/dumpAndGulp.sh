#!/bin/bash
composer dump-autoload --optimize --no-dev --classmap-authoritative
cd "${BASH_SOURCE%/*}" || exit
php ./console cache:clear -e prod --no-warmup
rm -rf ./../src/AppBundle/Resources/assets/assetic/*
php ./console assetic:dump -e prod
gulp
