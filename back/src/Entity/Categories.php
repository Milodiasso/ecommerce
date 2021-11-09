<?php

namespace App\Entity;

use App\Repository\CategoriesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CategoriesRepository::class)
 */
class Categories
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nom;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $base64;

    /**
     * @ORM\OneToMany(targetEntity=SousCat::class, mappedBy="idCat")
     */
    private $sousCats;

    public function __construct()
    {
        $this->sousCats = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getBase64(): ?string
    {
        return $this->base64;
    }

    public function setBase64(?string $base64): self
    {
        $this->base64 = $base64;

        return $this;
    }

    /**
     * @return Collection|SousCat[]
     */
    public function getSousCats(): Collection
    {
        return $this->sousCats;
    }

    public function addSousCat(SousCat $sousCat): self
    {
        if (!$this->sousCats->contains($sousCat)) {
            $this->sousCats[] = $sousCat;
            $sousCat->setIdCat($this);
        }

        return $this;
    }

    public function removeSousCat(SousCat $sousCat): self
    {
        if ($this->sousCats->removeElement($sousCat)) {
            // set the owning side to null (unless already changed)
            if ($sousCat->getIdCat() === $this) {
                $sousCat->setIdCat(null);
            }
        }

        return $this;
    }
}
