<?php

namespace App\Entity;

use App\Repository\PhotoArtRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PhotoArtRepository::class)
 */
class PhotoArt
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
     * @ORM\Column(type="text")
     */
    private $url;

    /**
     * @ORM\ManyToOne(targetEntity=Articles::class, inversedBy="photoArt")
     * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
     */
    private $idArticle;

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

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): self
    {
        $this->url = $url;

        return $this;
    }

    public function getIdArticle(): ?Articles
    {
        return $this->idArticle;
    }

    public function setIdArticle(?Articles $idArticle): self
    {
        $this->idArticle = $idArticle;

        return $this;
    }
}
