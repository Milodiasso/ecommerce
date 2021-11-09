<?php

namespace App\Repository;

use App\Entity\TarifAdmin;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method TarifAdmin|null find($id, $lockMode = null, $lockVersion = null)
 * @method TarifAdmin|null findOneBy(array $criteria, array $orderBy = null)
 * @method TarifAdmin[]    findAll()
 * @method TarifAdmin[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TarifAdminRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TarifAdmin::class);
    }

    // /**
    //  * @return TarifAdmin[] Returns an array of TarifAdmin objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?TarifAdmin
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */


    /**
     * @return TarifAdmin[]
     */
    public function findAllTarifAdmin(int $number): array
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery(
            'SELECT u
            FROM App\Entity\TarifAdmin u 
            WHERE u.id > :id'
        );
        $query->setParameter('id', $number);
        $resultat = $query->getArrayResult();
        return $resultat;
    }


    /**
     * @return TarifAdmin[]
     */
    public function findPrixTarifAdmin(string $ville, string $pays): array
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery(
            'SELECT u.prix
            FROM App\Entity\TarifAdmin u 
            WHERE u.ville = :ville
            AND  u.pays = :pays'
        );
        $query->setParameter('ville', $ville);
        $query->setParameter('pays', $pays);
        $resultat = $query->getScalarResult();
        return $resultat;
    }
}
