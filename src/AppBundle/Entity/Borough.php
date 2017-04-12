<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="app_borough")
 * @ORM\HasLifecycleCallbacks
 */
class Borough
{
    /**
    * @ORM\Id
    * @ORM\Column(type="integer")
    * @ORM\GeneratedValue(strategy="AUTO")
    */
    protected $id;

    /**
    * @ORM\Column(type="string", length=500, nullable=false)
    */
    protected $name;

    /**
     * Many boroughs havwe the same service
     * @ORM\ManyToOne(targetEntity="StopSmokingService", inversedBy="boroughs")
     * @ORM\JoinColumn(name="service_id", referencedColumnName="id", onDelete="SET NULL")
     */
    protected $service;

    /**
    * @ORM\Column(type="text", nullable=false)
    */
    protected $coordinates;

    /**
    * @ORM\Column(type="datetime", nullable=true)
    */
    protected $created_at;

    /**
    * @ORM\Column(type="datetime", nullable=true)
    */
    protected $modified_at;

    /**
    * @ORM\PrePersist
    * @ORM\PreUpdate
    */
    public function updatedTimestamps()
    {
        $this->setModifiedAt(new \DateTime(date('Y-m-d H:i:s')));

        if($this->getCreatedAt() == null)
        {
            $this->setCreatedAt(new \DateTime(date('Y-m-d H:i:s')));
        }
    }

    /**
    * Get id
    *
    * @return integer
    */
    public function getId()
    {
      return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Borough
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set coordinates
     *
     * @param string $coordinates
     *
     * @return Borough
     */
    public function setCoordinates($coordinates)
    {
        $this->coordinates = $coordinates;

        return $this;
    }

    /**
     * Get coordinates
     *
     * @return string
     */
    public function getCoordinates()
    {
        return $this->coordinates;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Borough
     */
    public function setCreatedAt($createdAt)
    {
        $this->created_at = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * Set modifiedAt
     *
     * @param \DateTime $modifiedAt
     *
     * @return Borough
     */
    public function setModifiedAt($modifiedAt)
    {
        $this->modified_at = $modifiedAt;

        return $this;
    }

    /**
     * Get modifiedAt
     *
     * @return \DateTime
     */
    public function getModifiedAt()
    {
        return $this->modified_at;
    }

    /**
     * Set service
     *
     * @param \AppBundle\Entity\StopSmokingService $service
     *
     * @return Borough
     */
    public function setService(\AppBundle\Entity\StopSmokingService $service = null)
    {
        $this->service = $service;

        return $this;
    }

    /**
     * Get service
     *
     * @return \AppBundle\Entity\StopSmokingService
     */
    public function getService()
    {
        return $this->service;
    }
}
