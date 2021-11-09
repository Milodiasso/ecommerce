<?php

namespace App\Entity;

use App\Repository\ArticlesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ArticlesRepository::class)
 * @ORM\HasLifecycleCallbacks()
 */
class Articles
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
    private $nomProduit;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="integer")
     */
    private $quantite;

    /**
     * @ORM\Column(type="array", nullable=true)
     */
    private $caracteristique = [];

    /**
     * @ORM\Column(type="integer")
     */
    private $prixUnitaireHt;

    /**
     * @ORM\Column(type="integer")
     */
    private $prixUnitaireTtc;

    /**
     * @ORM\Column(type="integer")
     */
    private $poids;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $dimension;

    /**
     * @ORM\ManyToOne(targetEntity=SousCat::class, inversedBy="articles")
     * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
     */
    private $idSousCat;

    /**
     * @ORM\OneToMany(targetEntity=PhotoArt::class, mappedBy="idArticle")
     */
    private $photoArt;

    /**
     * @ORM\Column(type="date")
     */
    private $dateCreation;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $promotion;

    public function __construct()
    {
        $this->photoArt = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomProduit(): ?string
    {
        return $this->nomProduit;
    }

    public function setNomProduit(string $nomProduit): self
    {
        $this->nomProduit = $nomProduit;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getQuantite(): ?int
    {
        return $this->quantite;
    }

    public function setQuantite(int $quantite): self
    {
        $this->quantite = $quantite;

        return $this;
    }

    public function getCaracteristique(): ?array
    {
        return $this->caracteristique;
    }

    public function setCaracteristique(?array $caracteristique): self
    {
        $this->caracteristique = $caracteristique;

        return $this;
    }

    public function getPrixUnitaireHt(): ?int
    {
        return $this->prixUnitaireHt;
    }

    public function setPrixUnitaireHt(int $prixUnitaireHt): self
    {
        $this->prixUnitaireHt = $prixUnitaireHt;

        return $this;
    }

    public function getPrixUnitaireTtc(): ?int
    {
        return $this->prixUnitaireTtc;
    }

    public function setPrixUnitaireTtc(int $prixUnitaireTtc): self
    {
        $this->prixUnitaireTtc = $prixUnitaireTtc;

        return $this;
    }

    public function getPoids(): ?int
    {
        return $this->poids;
    }

    public function setPoids(int $poids): self
    {
        $this->poids = $poids;

        return $this;
    }

    public function getDimension(): ?string
    {
        return $this->dimension;
    }

    public function setDimension(string $dimension): self
    {
        $this->dimension = $dimension;

        return $this;
    }

    public function getIdSousCat(): ?SousCat
    {
        return $this->idSousCat;
    }

    public function setIdSousCat(?SousCat $idSousCat): self
    {
        $this->idSousCat = $idSousCat;

        return $this;
    }

    /**
     * @return Collection|PhotoArt[]
     */
    public function getPhotoArt(): Collection
    {
        return $this->photoArt;
    }

    public function addPhotoArt(PhotoArt $photoArt): self
    {
        if (!$this->photoArt->contains($photoArt)) {
            $this->photoArt[] = $photoArt;
            $photoArt->setIdArticle($this);
        }

        return $this;
    }

    public function removePhotoArt(PhotoArt $photoArt): self
    {
        if ($this->photoArt->removeElement($photoArt)) {
            // set the owning side to null (unless already changed)
            if ($photoArt->getIdArticle() === $this) {
                $photoArt->setIdArticle(null);
            }
        }

        return $this;
    }

    public function getDateCreation()
    {
        return $this->dateCreation;
    }


    /**
     * @ORM\PrePersist
     */
    public function setDateCreation()
    {
        $this->dateCreation = new \DateTime();

        return $this;
    }

    public function getPromotion(): ?int
    {
        return $this->promotion;
    }

    public function setPromotion(?int $promotion): self
    {
        $this->promotion = $promotion;

        return $this;
    }
}
