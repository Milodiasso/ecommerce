<?php

namespace App\Entity;

use App\Repository\ArtCmdRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ArtCmdRepository::class)
 */
class ArtCmd
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Commande::class, inversedBy="artCmds")
     * @ORM\JoinColumn(nullable=false , onDelete="CASCADE")
     */
    private $cmd_id;

    /**
     * @ORM\ManyToOne(targetEntity=Articles::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $art_id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $curr_price;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $discount;

    /**
     * @ORM\Column(type="integer")
     */
    private $quantite;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCmdId(): ?Commande
    {
        return $this->cmd_id;
    }

    public function setCmdId(?Commande $cmd_id): self
    {
        $this->cmd_id = $cmd_id;

        return $this;
    }

    public function getArtId(): ?Articles
    {
        return $this->art_id;
    }

    public function setArtId(?Articles $art_id): self
    {
        $this->art_id = $art_id;

        return $this;
    }

    public function getCurrPrice(): ?string
    {
        return $this->curr_price;
    }

    public function setCurrPrice(?string $curr_price): self
    {
        $this->curr_price = $curr_price;

        return $this;
    }

    public function getDiscount(): ?string
    {
        return $this->discount;
    }

    public function setDiscount(?string $discount): self
    {
        $this->discount = $discount;

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
}
