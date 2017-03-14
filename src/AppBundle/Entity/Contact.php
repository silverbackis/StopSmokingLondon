<?php

namespace AppBundle\Entity;

use Symfony\Component\Validator\Constraints as Assert;

class Contact
{
    /**
     * @Assert\NotBlank(
     *     message = "contact.subject.not_blank"
     * )
     */
    protected $subject;

    /**
     * @Assert\NotBlank(
     *     message = "contact.name.not_blank"
     * )
     */
    protected $name;

    /**
     * @Assert\NotBlank(
     *     message = "contact.email.not_blank"
     * )
     * @Assert\Email(
     *     message = "contact.email.invalid",
     *     checkMX = true,
     *     checkHost = true
     * )
     */
    protected $email;

    /**
     * @Assert\Length(
     *      min = 10,
     *      max = 20,
     *      minMessage = "contact.telephone.short",
     *      maxMessage = "contact.telephone.long"
     * )
     */
    protected $telephone;

    /**
     * @Assert\NotBlank(
     *     message = "contact.message.not_blank"
     * )
     */
    protected $message;

    public static function fromArray($array) {
      $model = new self();
      foreach($array as $prop=>$value)
      {
        $propKey = 'set'.ucwords($prop);
        $model->$propKey($value);
      }
      return $model;
    }

    /**
     * Set subject
     *
     * @param string $subject
     *
     * @return Contact
     */
    public function setSubject($subject)
    {
        $this->subject = $subject;

        return $this;
    }

    /**
     * Get subject
     *
     * @return string
     */
    public function getSubject()
    {
        return $this->subject;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Contact
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
     * Set email
     *
     * @param string $email
     *
     * @return Contact
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set telephone
     *
     * @param string $telephone
     *
     * @return Contact
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
     * Set message
     *
     * @param string $message
     *
     * @return Contact
     */
    public function setMessage($message)
    {
        $this->message = $message;

        return $this;
    }

    /**
     * Get message
     *
     * @return string
     */
    public function getMessage()
    {
        return $this->message;
    }
}
