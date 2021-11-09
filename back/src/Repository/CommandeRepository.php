<?php

namespace App\Repository;

use App\Entity\Commande;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Commande|null find($id, $lockMode = null, $lockVersion = null)
 * @method Commande|null findOneBy(array $criteria, array $orderBy = null)
 * @method Commande[]    findAll()
 * @method Commande[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CommandeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Commande::class);
    }

    // /**
    //  * @return Commande[] Returns an array of Commande objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Commande
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */

    /**
     * @return Commande[]
     */
    public function findBigRef(int $number): array
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery(
            'SELECT u.ref
            FROM App\Entity\Commande u 
            WHERE u.ref > :ref
            ORDER BY u.ref DESC'
        );
        $query->setParameter('ref', $number);
        $query->setMaxResults(1);
        $resultat = $query->getArrayResult();
        return $resultat;
    }

    /**
     * @return Commande[]
     */
    public function findLastIdCommande(): array
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery(
            'SELECT u.id
            FROM App\Entity\Commande u 
            ORDER BY u.id DESC'
        );
        $query->setMaxResults(1);
        $resultat = $query->getArrayResult();
        return $resultat;
    }

    /**
     * @return Commande[]
     */
    public function findWhereIdUser(int $id): array
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery(
            'SELECT u.ref, u.pay_id, u.date, u.prix_transport ,a.rue, a.codePostal, 
            a.ville, a.pays, b.curr_price , b.discount , b.quantite, 
            c.nomProduit, c.description, d.nom , d.url
            FROM App\Entity\Commande u 
            LEFT JOIN App\Entity\Adresses a 
            WITH u.address_id= a.id
            LEFT JOIN App\Entity\ArtCmd b
            WITH u.id=b.cmd_id
            LEFT JOIN App\Entity\Articles c
            WITH b.art_id=c.id
            LEFT JOIN App\Entity\PhotoArt d
            WITH c.id=d.idArticle
            WHERE u.user_id = (:user_id)
            ORDER BY u.id DESC'
        );

        $query->setParameter('user_id',$id);
        $resultat = $query->getScalarResult();
        return $resultat;
    }
}
