<?php

namespace App\Repository;

use App\Entity\ArtCmd;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ArtCmd|null find($id, $lockMode = null, $lockVersion = null)
 * @method ArtCmd|null findOneBy(array $criteria, array $orderBy = null)
 * @method ArtCmd[]    findAll()
 * @method ArtCmd[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ArtCmdRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ArtCmd::class);
    }

    // /**
    //  * @return ArtCmd[] Returns an array of ArtCmd objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ArtCmd
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
