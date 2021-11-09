<?php

namespace App\Repository;

use App\Entity\PhotoArt;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method PhotoArt|null find($id, $lockMode = null, $lockVersion = null)
 * @method PhotoArt|null findOneBy(array $criteria, array $orderBy = null)
 * @method PhotoArt[]    findAll()
 * @method PhotoArt[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PhotoArtRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PhotoArt::class);
    }

    // /**
    //  * @return PhotoArt[] Returns an array of PhotoArt objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?PhotoArt
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
