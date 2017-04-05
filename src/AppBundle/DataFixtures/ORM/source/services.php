<?php
/**
 * Changes made to original data
 * - Wandworth and Richmond were combined, moved Richmond into Kick-It
 * - Added Kingston upon thames to kick-it service (kingston did provide another contact, clarify if I should use that instead) - SWITCHED
 * - Kingston now provided and used their data
 * - Corrected http://oneyouealing.co.uk to http://oneyouealing.org (Failed DNS lookup validation on entry)
 * - Havering removed - added to NELFT
 * - Barking and Dagenham added to NELFT
 * - Freephone added to Tower Hamlets as top priority number
 * - Corrected web address for NELFT (Page did not exist on website, new page introduces buttons to select which area user is in)
 * - One You Haringey corrected link from http://www.haringey.gov.uk/oneyou to http://www.oneyouharingey.org/sign-up/
 * - Wandsworth correct phone number from 0800 389 7921 to 0800 389 7291 (Saw difference on the website)
 *
 * NOTES:
 * - Camden & Islington Service - Web and Tel are TBC, so not set yet
 * - Camden number may be 0800 1070 401 (found website https://www.smokefreelifecamden.co.uk/)
 * - Islington number may be 0800 093 9030 (found website http://www.smokefreeislington.nhs.uk/)
 */
return array(
    array(
      'name' => null,
      'boroughs' => array(
        'Haringey'
      ),
      'specialist_advisors' => true,
      'pharmacy_staff' => true,
      'meds' => array(
        'varenicline' => true,
        'bupropion' => true,
        'nrt_single' => true,
        'nrt_dual' => true
      ),
      'gp_prescription' => false,
      'ecig_friendly' => true,
      'web' => 'http://www.oneyouharingey.org/sign-up/',
      'tel' => array(
        '0208 885 9095'
      )
    ),
    array(
      'name' => null,
      'boroughs' => array(
        'Wandsworth'
      ),
      'specialist_advisors' => true,
      'pharmacy_staff' => true,
      'meds' => array(
        'varenicline' => true,
        'bupropion' => true,
        'nrt_single' => false,
        'nrt_dual' => true
      ),
      'gp_prescription' => true,
      'ecig_friendly' => true,
      'web' => 'http://www.wandsworth.gov.uk/stopsmoking',
      'tel' => array(
        '0800 389 7291'
      )      
    ),
    array(
      'name' => null,
      'boroughs' => array(
        'Tower Hamlets'
      ),
      'specialist_advisors' => true,
      'pharmacy_staff' => true,
      'meds' => array(
        'varenicline' => true,
        'bupropion' => false,
        'nrt_single' => true,
        'nrt_dual' => true
      ),
      'gp_prescription' => true,
      'ecig_friendly' => true,
      'web' => 'http://www.towerhamlets.gov.uk/stopsmoking',
      'tel' => array(
        '0800 169 1943',
        '020 7882 8230',
        '020 7882 8660',
        '020 7882 8669'
      )
    ),
    array(
      'name' => null,
      'boroughs' => array(
        'Bexley'
      ),
      'specialist_advisors' => true,
      'pharmacy_staff' => false,
      'meds' => array(
        'varenicline' => true,
        'bupropion' => false,
        'nrt_single' => false,
        'nrt_dual' => true
      ),
      'gp_prescription' => true,
      'ecig_friendly' => true,
      'web' => 'http://www.smokefreebexley.co.uk',
      'tel' => array(
        '0800 783 2514',
        '0203 045 3833'
      )
    ),
    array(
      'name' => null,
      'boroughs' => array(
        'Hillingdon'
      ),
      'specialist_advisors' => true,
      'pharmacy_staff' => true,
      'meds' => array(
        'varenicline' => true,
        'bupropion' => true,
        'nrt_single' => true,
        'nrt_dual' => true
      ),
      'gp_prescription' => true,
      'ecig_friendly' => true,
      'web' => 'http://www.connecttosupporthillingdon.org/s4s/WhereILive/Council?pageId=1315',
      'tel' => array(
        '0800 169 7541'
      )
    ),
    array(
      'name' => null,
      'boroughs' => array(
        'Croydon'
      ),
      'specialist_advisors' => false,
      'pharmacy_staff' => true,
      'meds' => array(
        'varenicline' => true,
        'bupropion' => true,
        'nrt_single' => false,
        'nrt_dual' => true
      ),
      'gp_prescription' => false,
      'ecig_friendly' => true,
      'web' => 'https://www.croydon.gov.uk/healthsocial/phealth/daservices/croydon-stop-smoking-service-0',
      'tel' => array(
        '0800 019 8570'
      )
    ),
    array(
      'name' => null,
      'boroughs' => array(
        'Camden',
        'Islington'
      ),
      'specialist_advisors' => true,
      'pharmacy_staff' => true,
      'meds' => array(
        'varenicline' => false,
        'bupropion' => true,
        'nrt_single' => true,
        'nrt_dual' => true
      ),
      'gp_prescription' => true,
      'ecig_friendly' => true,
      'web' => null,
      'tel' => null
    ),
    array(
      'name' => null,
      'boroughs' => array(
        'Lewisham'
      ),
      'specialist_advisors' => true,
      'pharmacy_staff' => true,
      'meds' => array(
        'varenicline' => true,
        'bupropion' => true,
        'nrt_single' => false,
        'nrt_dual' => true
      ),
      'gp_prescription' => true,
      'ecig_friendly' => true,
      'web' => 'http://www.smokefreelewisham.co.uk',
      'tel' => array(
        '0800 0820 388'
      )
    ),
    array(
      'name' => 'NELFT',
      'boroughs' => array(
        'Redbridge',
        'Waltham Forest',
        //'Essex', // Not a Longon Borough
        'Havering',
        'Barking and Dagenham'
      ),
      'specialist_advisors' => true,
      'pharmacy_staff' => true,
      'meds' => array(
        'varenicline' => true,
        'bupropion' => true,
        'nrt_single' => true,
        'nrt_dual' => false
      ),
      'gp_prescription' => false,
      'ecig_friendly' => true,
      'web' => 'http://www.nelft.nhs.uk/our-services',
      'tel' => array(
        '0800 032 0102',
        '0300 300 1880'
      )
    ),
    array(
      'name' => null,
      'boroughs' => array(
        'City of London'
      ),
      'specialist_advisors' => true,
      'pharmacy_staff' => true,
      'meds' => array(
        'varenicline' => true,
        'bupropion' => false,
        'nrt_single' => false,
        'nrt_dual' => true
      ),
      'gp_prescription' => false,
      'ecig_friendly' => true,
      'web' => 'http://www.squaremilehealth.org.uk/smokingservices/',
      'tel' => array(
        '0300 303 2715'
      )
    ),
    array(
      'name' => null,
      'boroughs' => array(
        'Ealing'
      ),
      'specialist_advisors' => true,
      'pharmacy_staff' => true,
      'meds' => array(
        'varenicline' => true,
        'bupropion' => true,
        'nrt_single' => false,
        'nrt_dual' => true
      ),
      'gp_prescription' => true,
      'ecig_friendly' => true,
      'web' => 'http://oneyouealing.org',
      'tel' => array(
        '0208 579 8622'
      )
    ),
    array(
      'name' => null,
      'boroughs' => array(
        'Hackney'
      ),
      'specialist_advisors' => true,
      'pharmacy_staff' => true,
      'meds' => array(
        'varenicline' => true,
        'bupropion' => false,
        'nrt_single' => true,
        'nrt_dual' => true
      ),
      'gp_prescription' => true,
      'ecig_friendly' => true,
      'web' => 'http://www.smokefreehackney.org',
      'tel' => array(
        '0800 046 9946',
        '0203 316 1085'
      )
    ),
    /*array(
      'boroughs' => array(
        'Havering'
      ),
      'specialist_advisors' => true,
      'pharmacy_staff' => false,
      'meds' => array(
        'varenicline' => false,
        'bupropion' => false,
        'nrt_single' => true,
        'nrt_dual' => true
      ),
      'gp_prescription' => true,
      'ecig_friendly' => true,
      'web' => null,
      'tel' => array(
        '0208 724 8018'
      )
    ),*/
    array(
      'name' => 'Kick-It',
      'boroughs' => array(
        'Westminster',
        'Kensington and Chelsea',
        'Hammersmith and Fulham',
        'Richmond upon Thames',
        'Kingston upon Thames'
      ),
      'specialist_advisors' => true,
      'pharmacy_staff' => true,
      'meds' => array(
        'varenicline' => true,
        'bupropion' => true,
        'nrt_single' => true,
        'nrt_dual' => true
      ),
      'gp_prescription' => true,
      'ecig_friendly' => true,
      'web' => 'https://kick-it.org.uk/',
      'tel' => array(
        '0203 434 2500'
      )
    ),
    array(
      'name' => 'Kick-It',
      'boroughs' => array(
        'Kingston upon Thames'
      ),
      'specialist_advisors' => true,
      'pharmacy_staff' => true,
      'meds' => array(
        'varenicline' => true,
        'bupropion' => false,
        'nrt_single' => false,
        'nrt_dual' => true
      ),
      'gp_prescription' => true,
      'ecig_friendly' => true,
      'web' => 'https://kick-it.org.uk/',
      'tel' => array(
        '0203 434 2500'
      )
    ),
    array(
      'name' => null,
      'boroughs' => array(
        'Lambeth'
      ),
      'specialist_advisors' => true,
      'pharmacy_staff' => true,
      'meds' => array(
        'varenicline' => true,
        'bupropion' => false,
        'nrt_single' => true,
        'nrt_dual' => true
      ),
      'gp_prescription' => true,
      'ecig_friendly' => true,
      'web' => 'http://www.guysandstthomas.nhs.uk/ourservices/stop-smoking-service/overview.aspx',
      'tel' => array(
        '0207 188 7188'
      )
    ),
    array(
      'name' => null,
      'boroughs' => array(
        'Newham'
      ),
      'specialist_advisors' => false, // no response was given
      'pharmacy_staff' => true,
      'meds' => array(
        'varenicline' => true,
        'bupropion' => false,
        'nrt_single' => true,
        'nrt_dual' => true
      ),
      'gp_prescription' => false,
      'ecig_friendly' => true,
      'web' => 'http://www.newham.gov.uk/stopsmoking',
      'tel' => array(
        null
      )
    ),
    array(
      'name' => null,
      'boroughs' => array(
        'Newham'
      ),
      'specialist_advisors' => false, // no response was given
      'pharmacy_staff' => true,
      'meds' => array(
        'varenicline' => true,
        'bupropion' => false,
        'nrt_single' => true,
        'nrt_dual' => true
      ),
      'gp_prescription' => false,
      'ecig_friendly' => true,
      'web' => 'http://www.newham.gov.uk/stopsmoking',
      'tel' => null
    ),
    array(
      'name' => null,
      'boroughs' => array(
        'Barnet'
      ),
      'specialist_advisors' => false,
      'pharmacy_staff' => true,
      'meds' => array(
        'varenicline' => false,
        'bupropion' => false,
        'nrt_single' => false,
        'nrt_dual' => true
      ),
      'gp_prescription' => false, // no answer given
      'ecig_friendly' => true,
      'web' => null, // provided but cut off in word doc
      'tel' => null
    ),
    // No service at all
    array(
      'name' => null,
      'boroughs' => array(
        'Enfield',
        'Harrow'
      ),
      'specialist_advisors' => false,
      'pharmacy_staff' => false,
      'meds' => array(
        'varenicline' => false,
        'bupropion' => false,
        'nrt_single' => false,
        'nrt_dual' => false
      ),
      'gp_prescription' => false, // no answer given
      'ecig_friendly' => false, // no answer given
      'web' => null,
      'tel' => null
    )/*,
    array(
      'boroughs' => array(
        ''
      ),
      'specialist_advisors' => 0,
      'pharmacy_staff' => 0,
      'meds' => array(
        'varenicline' => 0,
        'bupropion' => 0,
        'nrt_single' => 0,
        'nrt_dual' => 0
      ),
      'gp_prescription' => 0,
      'ecig_friendly' => 0,
      'web' => '',
      'tel' => array(
        ''
      )
    )*/
  );