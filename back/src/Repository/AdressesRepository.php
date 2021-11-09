<?php

namespace App\Repository;

use App\Entity\Adresses;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Adresses|null find($id, $lockMode = null, $lockVersion = null)
 * @method Adresses|null findOneBy(array $criteria, array $orderBy = null)
 * @method Adresses[]    findAll()
 * @method Adresses[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AdressesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Adresses::class);
    }

    // /**
    //  * @return Adresses[] Returns an array of Adresses objects
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
    public function findOneBySomeField($value): ?Adresses
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */

    /**
     * @return Adresses[]
     */
    public function findOneAdresse(int $id): array
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery(
            'SELECT u.id, u.nom, u.prenom, u.rue, u.codePostal , u.ville, u.pays
            FROM App\Entity\Adresses u
            WHERE u.id = :id'
        );
        $query->setParameter('id', $id);
        $resultat = $query->getScalarResult();




        return $resultat;
    }
}
