<?php

namespace AppBundle\DataFixtures\ORM;
// Class level
use Doctrine\Common\DataFixtures\FixtureInterface;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
// Method params
use Symfony\Component\DependencyInjection\ContainerInterface;
use Doctrine\Common\Persistence\ObjectManager;
// Used in methods
use AppBundle\Entity\StopSmokingService;
use AppBundle\Entity\Borough;
use Symfony\Component\Config\FileLocator;

/**
 * This class will load in boroughs from a GeoJson file into the database with the names and coordinates already defined
 */
class BoroughsAndServices implements FixtureInterface, ContainerAwareInterface
{
  private $container,
  $validator,
  $servicesInput,
  $boroughsServices = [];

  public function setContainer(ContainerInterface $container = null)
  {
    $this->container = $container;
    $this->validator = $this->container->get('validator');
  }

  private function locateBorough($borough, ObjectManager $manager)
  {
      return $manager->getRepository('AppBundle\Entity\Borough')->findOneBy(['name' => $borough]) ?: new Borough();
  }

  private function createBorough(array $feature, ObjectManager $manager)
  {
    $entity = new Borough();

    $entity->setName($feature['properties']['name']);
    $entity->setCoordinates(json_encode($feature['geometry']['coordinates']));
    if(isset($this->boroughsServices[$feature['properties']['name']]))
    {
      $entity->setService($this->boroughsServices[$feature['properties']['name']]);
    }

    // validate
    $errors = $this->validator->validate($entity);
    if (count($errors) > 0) {
      $errorsString = (string) $errors;
      throw new \Exception($errorsString);
    }

    // persist new entity to database and flush
    $manager->persist($entity);
    $manager->flush();

    // return the new entity
    return $entity;
  }

  /*private function makeServiceName($boroughs)
  {
    $serviceNamePostfix = 'Stop Smoking Service';
    $totalBoroughs = count($boroughs);
    if($totalBoroughs === 1)
    {
      $serviceName = $boroughs[0]." $serviceNamePostfix";
    }
    else
    {
      $lastBorough = array_pop($boroughs);
      $serviceName = join(", ",$boroughs)." and $lastBorough $serviceNamePostfix";
    }
    return $serviceName;
  }*/

  private function locateService($service, ObjectManager $manager)
  {
      return $manager->getRepository('AppBundle\Entity\StopSmokingService')->findOneBy(['website' => $service['web']]) ?: new StopSmokingService();
  }

  private function createService(array $service, ObjectManager $manager)
  {
    $entity = new StopSmokingService();

    $entity->setName($service['name']);

    $entity->setSpecialistAdvisors($service['specialist_advisors']);
    $entity->setPharmacyStaff($service['pharmacy_staff']);

    $entity->setVarenicline($service['meds']['varenicline']);
    $entity->setBupropion($service['meds']['bupropion']);
    $entity->setNrtSingle($service['meds']['nrt_single']);
    $entity->setNrtDual($service['meds']['nrt_dual']);
    
    $entity->setGpPrescription($service['gp_prescription']);
    $entity->setEcigFriendly($service['ecig_friendly']);

    $entity->setWebsite($service['web']);
    $entity->setTelephone($service['tel']);

    // validate
    $errors = $this->validator->validate($entity);
    if (count($errors) > 0) {
      $errorsString = (string) $errors;
      throw new \Exception($errorsString);
    }

    // persist new entity to database and flush
    $manager->persist($entity);
    $manager->flush();

    // return the new entity
    return $entity;
  }

  public function load(ObjectManager $manager)
  {
    // Create services first
    $servicesInput  = include 'source/services.php';
    
    foreach($servicesInput as $service)
    {
      if($service['tel'] !== null)
      {
        $service['tel'] = json_encode($service['tel']);
      }

      $locator = $this->locateService($service, $manager);
      if (!$manager->contains($locator))
      {
          $serviceEntity = $this->createService($service, $manager);
      }

      foreach($service['boroughs'] as $boroughName)
      {
        $this->boroughsServices[$boroughName] = $serviceEntity;
      }
    }

    $GeoJsonFile = $this->container->get('file_locator')->locate(__DIR__.'/source/GeoJson.json', null, true);
    $GeoJson = json_decode(file_get_contents($GeoJsonFile), true);
    foreach($GeoJson['features'] as $feature)
    {
      $locator = $this->locateBorough($feature['properties']['name'], $manager);
      if (!$manager->contains($locator))
      {
          $this->createBorough($feature, $manager);
      }
    }
  }
}