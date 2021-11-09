<?php

namespace App\Entity;

use App\Repository\CommandeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CommandeRepository::class)
 * @ORM\HasLifecycleCallbacks()
 */
class Commande
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column( type="integer")
     */
    private $ref;

    /**
     * @ORM\ManyToOne(targetEntity=Users::class, inversedBy="commandes")
     */
    private $user_id;

    /**
     * @ORM\ManyToOne(targetEntity=Adresses::class, inversedBy="commandes")
     * @ORM\JoinColumn(nullable=false)
     */
    private $address_id;

    /**
     * @ORM\Column(type="string")
     */
    private $pay_id;

    /**
     * @ORM\Column(type="date")
     */
    private $date;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $prix_transport;

    /**
     * @ORM\OneToMany(targetEntity=ArtCmd::class, mappedBy="cmd_id")
     */
    private $artCmds;

    public function __construct()
    {
        $this->artCmds = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRef(): ?int
    {
        return $this->ref;
    }

    public function setRef(int $ref): self
    {
        $this->ref = $ref;

        return $this;
    }

    public function getUserId(): ?Users
    {
        return $this->user_id;
    }

    public function setUserId(?Users $user_id): self
    {
        $this->user_id = $user_id;

        return $this;
    }

    public function getAddressId(): ?Adresses
    {
        return $this->address_id;
    }

    public function setAddressId(?Adresses $address_id): self
    {
        $this->address_id = $address_id;

        return $this;
    }

    public function getPayId(): ?string
    {
        return $this->pay_id;
    }

    public function setPayId(string $pay_id): self
    {
        $this->pay_id = $pay_id;

        return $this;
    }

    public function getDate()
    {
        return $this->date;
    }

    /**
     * @ORM\PrePersist
     */
    public function setDate()
    {
        $this->date = new \DateTime();

        return $this;
    }



    public function getPrixTransport(): ?string
    {
        return $this->prix_transport;
    }

    public function setPrixTransport(string $prix_transport): self
    {
        $this->prix_transport = $prix_transport;

        return $this;
    }

    /**
     * @return Collection|ArtCmd[]
     */
    public function getArtCmds(): Collection
    {
        return $this->artCmds;
    }

    public function addArtCmd(ArtCmd $artCmd): self
    {
        if (!$this->artCmds->contains($artCmd)) {
            $this->artCmds[] = $artCmd;
            $artCmd->setCmdId($this);
        }

        return $this;
    }

    public function removeArtCmd(ArtCmd $artCmd): self
    {
        if ($this->artCmds->removeElement($artCmd)) {
            // set the owning side to null (unless already changed)
            if ($artCmd->getCmdId() === $this) {
                $artCmd->setCmdId(null);
            }
        }

        return $this;
    }
}
