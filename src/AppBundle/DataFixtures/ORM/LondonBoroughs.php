<?php

namespace AppBundle\DataFixtures\ORM;
// Class level
use Doctrine\Common\DataFixtures\FixtureInterface;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
// Method params
use Symfony\Component\DependencyInjection\ContainerInterface;
use Doctrine\Common\Persistence\ObjectManager;
// Used in methods
use AppBundle\Entity\Borough;
use Symfony\Component\Config\FileLocator;

/**
 * This class will load in boroughs from a GeoJson file into the database with the names and coordinates already defined
 */
class LondonBoroughs implements FixtureInterface, ContainerAwareInterface
{
  private $container,
  $validator;

  public function setContainer(ContainerInterface $container = null)
  {
    $this->container = $container;
    $this->validator = $this->container->get('validator');
  }

  /**
   * Helper method to return an already existing Locator from the database, else create and return a new one
   *
   * @param string        $name
   * @param ObjectManager $manager
   *
   * @return Borough
   */
  protected function findOrCreateLocator($borough, ObjectManager $manager)
  {
      return $manager->getRepository('AppBundle\Entity\Borough')->findOneBy(['name' => $borough]) ?: new Borough();
  }

  public function load(ObjectManager $manager)
  {
    $boroughs = [];
    $GeoJsonFile = $this->container->get('file_locator')->locate(__DIR__.'/source/GeoJson.json', null, true);
    $GeoJson = json_decode(file_get_contents($GeoJsonFile), true);
    foreach($GeoJson['features'] as $feature)
    {
      $locator = $this->findOrCreateLocator($feature['properties']['name'], $manager);
      if (!$manager->contains($locator))
      {
          $this->createBorough($feature, $manager);
      }
    }
  }

  private function createBorough(array $feature, ObjectManager $manager)
  {
    $entity = new Borough();

    $entity->setName($feature['properties']['name']);
    $entity->setCoordinates(json_encode($feature['geometry']['coordinates']));

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
}