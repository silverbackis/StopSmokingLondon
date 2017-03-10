<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity
 * @ORM\Table(name="stop_smoking_service")
 * @ORM\HasLifecycleCallbacks
 */
class StopSmokingService
{
    /**
    * @ORM\Id
    * @ORM\Column(type="integer")
    * @ORM\GeneratedValue(strategy="AUTO")
    */
    protected $id;

    /**
     * One Service has Many Boroughs.
     * @ORM\OneToMany(targetEntity="Borough", mappedBy="service")
     */
    protected $boroughs;

    /**
    * @ORM\Column(type="string", length=50, nullable=true)
    */
    protected $telephone;

    /**
    * @ORM\Column(type="string", length=500, nullable=true)
    * @Assert\Url(
    *    message = "The url '{{ value }}' is not a valid url",
    *    protocols = {"http", "https"},
    *    checkDNS = true,
    *    dnsMessage = "The host '{{ value }}' could not be resolved."
    * )
    */
    protected $website;

    /**
    * @ORM\Column(type="boolean", nullable=true)
    */
    protected $gp_prescription;

    /**
    * @ORM\Column(type="boolean", nullable=false, options={"default" : 0})
    */
    protected $varenicline = 0;

    /**
    * @ORM\Column(type="boolean", nullable=false, options={"default" : 0})
    */
    protected $bupropion = 0;

    /**
    * @ORM\Column(type="boolean", nullable=false, options={"default" : 0})
    */
    protected $nrt_single = 0;

    /**
    * @ORM\Column(type="boolean", nullable=false, options={"default" : 0})
    */
    protected $nrt_dual = 0;

    /**
    * @ORM\Column(type="boolean", nullable=false, options={"default" : 0})
    */
    protected $specialist_advisors = 0;

    /**
    * @ORM\Column(type="boolean", nullable=false, options={"default" : 0})
    */
    protected $pharmacy_staff = 0;

    /**
    * @ORM\Column(type="boolean", nullable=false, options={"default" : 0})
    */
    protected $ecig_friendly = 0;

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

    public function __construct() {
        $this->boroughs = new ArrayCollection();
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
     * Set telephone
     *
     * @param string $telephone
     *
     * @return StopSmokingService
     */
    public function setTelephone($telephone)
    {
        $this->telephone = $telephone;

        return $this;
    }

    /**
     * Get telephone
     *
     * @return string
     */
    public function getTelephone()
    {
        return $this->telephone;
    }

    /**
     * Set website
     *
     * @param string $website
     *
     * @return StopSmokingService
     */
    public function setWebsite($website)
    {
        $this->website = $website;

        return $this;
    }

    /**
     * Get website
     *
     * @return string
     */
    public function getWebsite()
    {
        return $this->website;
    }

    /**
     * Set gpPrescription
     *
     * @param boolean $gpPrescription
     *
     * @return StopSmokingService
     */
    public function setGpPrescription($gpPrescription)
    {
        $this->gp_prescription = $gpPrescription;

        return $this;
    }

    /**
     * Get gpPrescription
     *
     * @return boolean
     */
    public function getGpPrescription()
    {
        return $this->gp_prescription;
    }

    /**
     * Set varenicline
     *
     * @param boolean $varenicline
     *
     * @return StopSmokingService
     */
    public function setVarenicline($varenicline)
    {
        $this->varenicline = $varenicline;

        return $this;
    }

    /**
     * Get varenicline
     *
     * @return boolean
     */
    public function getVarenicline()
    {
        return $this->varenicline;
    }

    /**
     * Set bupropion
     *
     * @param boolean $bupropion
     *
     * @return StopSmokingService
     */
    public function setBupropion($bupropion)
    {
        $this->bupropion = $bupropion;

        return $this;
    }

    /**
     * Get bupropion
     *
     * @return boolean
     */
    public function getBupropion()
    {
        return $this->bupropion;
    }

    /**
     * Set nrtSingle
     *
     * @param boolean $nrtSingle
     *
     * @return StopSmokingService
     */
    public function setNrtSingle($nrtSingle)
    {
        $this->nrt_single = $nrtSingle;

        return $this;
    }

    /**
     * Get nrtSingle
     *
     * @return boolean
     */
    public function getNrtSingle()
    {
        return $this->nrt_single;
    }

    /**
     * Set nrtDual
     *
     * @param boolean $nrtDual
     *
     * @return StopSmokingService
     */
    public function setNrtDual($nrtDual)
    {
        $this->nrt_dual = $nrtDual;

        return $this;
    }

    /**
     * Get nrtDual
     *
     * @return boolean
     */
    public function getNrtDual()
    {
        return $this->nrt_dual;
    }

    /**
     * Set specialistAdvisors
     *
     * @param boolean $specialistAdvisors
     *
     * @return StopSmokingService
     */
    public function setSpecialistAdvisors($specialistAdvisors)
    {
        $this->specialist_advisors = $specialistAdvisors;

        return $this;
    }

    /**
     * Get specialistAdvisors
     *
     * @return boolean
     */
    public function getSpecialistAdvisors()
    {
        return $this->specialist_advisors;
    }

    /**
     * Set pharmacyStaff
     *
     * @param boolean $pharmacyStaff
     *
     * @return StopSmokingService
     */
    public function setPharmacyStaff($pharmacyStaff)
    {
        $this->pharmacy_staff = $pharmacyStaff;

        return $this;
    }

    /**
     * Get pharmacyStaff
     *
     * @return boolean
     */
    public function getPharmacyStaff()
    {
        return $this->pharmacy_staff;
    }

    /**
     * Set ecigFriendly
     *
     * @param boolean $ecigFriendly
     *
     * @return StopSmokingService
     */
    public function setEcigFriendly($ecigFriendly)
    {
        $this->ecig_friendly = $ecigFriendly;

        return $this;
    }

    /**
     * Get ecigFriendly
     *
     * @return boolean
     */
    public function getEcigFriendly()
    {
        return $this->ecig_friendly;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return StopSmokingService
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
     * @return StopSmokingService
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
}
