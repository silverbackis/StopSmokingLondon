<?php

namespace LexikTranslationBundle\Controller;

use AppBundle\Entity\StopSmokingService;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;

use Doctrine\ORM\EntityRepository;

class ServicesController extends Controller
{
  /**
   * @Route("/boroughs", name="admin_boroughs")
   */
  public function listBoroughsAction(Request $request)
  {
    $boroughs = $this->getDoctrine()->getRepository('AppBundle:Borough')->findAll();
    return $this->render('@BoroughServices/boroughs.html.twig', [
      'boroughs' => $boroughs
    ]);
  }

  /**
   * @Route("/service/delete/{id}", name="admin_service_delete", requirements={"id": "\d+"})
   */
  public function deleteServiceAction(Request $request, $id)
  {
    $doc = $this->getDoctrine();
    $service = $doc->getRepository('AppBundle:StopSmokingService')->findOneById($id);
    if (!$service) {
      $this->addFlash(
          'danger',
          'Could not delete service - service not found'
      );
      return $this->redirectToRoute('admin_services');
    }

    $em = $doc->getEntityManager();
    $em->remove($service);
    $em->flush();
    $this->addFlash(
        'success',
        'Service successfully deleted'
    );
    return $this->redirectToRoute('admin_services');
  }

  /**
   * @Route("/service/{id}", name="admin_service", requirements={"id": "\d+"})
   */
  public function modifyServiceAction(Request $request, int $id)
  {
    $doc = $this->getDoctrine();
    $em = $doc->getEntityManager();
    if($id === 0)
    {
      $service = new StopSmokingService();
    }
    else
    {
      $service = $doc->getRepository('AppBundle:StopSmokingService')->findOneById($id);
    }
    $OriginalBoroughs = clone $service->getBoroughs();

    $form = $this->createFormBuilder($service)
      ->add('name', TextType::class, [
        'required' => false
      ])
      ->add('boroughs', EntityType::class, array(
          // query choices from this entity
          'class' => 'AppBundle:Borough',
          // use the StopSmokingService.name property as the visible option string
          'choice_label' => 'name',

          // used to render a select box, check boxes or radios
          'multiple' => true//,
          //'em' => $em
          // 'expanded' => true,
      ))
      ->add('specialist_advisors', CheckboxType::class, [
        'required' => false
      ])
      ->add('pharmacy_staff', CheckboxType::class, [
        'required' => false
      ])
      ->add('gp_prescription', CheckboxType::class, [
        'required' => false
      ])
      ->add('telephone', TextType::class, [
        'required' => false
      ])
      ->add('save', SubmitType::class, array('label' => $service->getId() ? 'Update Service' : 'Add Service'))
      ->getForm();

    $form->handleRequest($request);

    if ($form->isSubmitted() && $form->isValid()) {
      foreach( $OriginalBoroughs as $OriginalBorough )
      {
        $OriginalBorough->setService(null);
      }

      foreach( $service->getBoroughs() as $borough )
      {
        $borough->setService($service);
      }
      $em->persist($service);
      $em->flush();
      $this->addFlash(
          'success',
          'Stop smoking service successfully updated'
      );
      return $this->redirectToRoute('admin_services');
    }

    return $this->render('@BoroughServices/service.html.twig', [
      'service' => $service,
      'form' => $form->createView()
    ]);
  }

  /**
   * @Route("/services", name="admin_services")
   */
  public function listServicesAction(Request $request)
  {
    $services = $this->getDoctrine()->getRepository('AppBundle:StopSmokingService')->findAll();
    return $this->render('@BoroughServices/services.html.twig', [
      'services' => $services
    ]);
  }
}
