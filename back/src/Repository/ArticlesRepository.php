<?php

namespace App\Repository;

use App\Entity\Articles;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use phpDocumentor\Reflection\Types\Integer;

/**
 * @method Articles|null find($id, $lockMode = null, $lockVersion = null)
 * @method Articles|null findOneBy(array $criteria, array $orderBy = null)
 * @method Articles[]    findAll()
 * @method Articles[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ArticlesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Articles::class);
    }

    // /**
    //  * @return Articles[] Returns an array of Articles objects
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
    public function findOneBySomeField($value): ?Articles
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
     * @return Articles[]
     */
    public function findAllProduit(string $nom): array
    {

        $conn = $this->getEntityManager()->getConnection();

        $sql = "
                SELECT a.id, id_sous_cat_id, nom_produit, c.nom, c.id_cat_id FROM articles a
                LEFT JOIN sous_cat c
                ON a.id_sous_cat_id = c.id
                WHERE a.nom_produit LIKE '%$nom%'  ";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        // returns an array of arrays (i.e. a raw data set)
        return $stmt->fetchAllAssociative();
    }


    /**
     * @return Articles[]
     */
    public function searchByIdSousCat(int $idSousCat, string $nom): array
    {

        $conn = $this->getEntityManager()->getConnection();

        $sql = "
                SELECT a.id, id_sous_cat_id, nom_produit, c.nom, c.id_cat_id FROM articles a
                LEFT JOIN sous_cat c
                ON a.id_sous_cat_id = c.id
                WHERE a.nom_produit LIKE '%$nom%' 
                AND a.id_sous_cat_id = $idSousCat ";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        // returns an array of arrays (i.e. a raw data set)
        return $stmt->fetchAllAssociative();
    }



    /**
     * @return Articles[]
     */
    public function findArticlesPhotoArt(array $nombres): array
    {
        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQuery(
            'SELECT p
            FROM App\Entity\PhotoArt p
            WHERE p.idArticle IN (:idArticle)'
        )->setParameter('idArticle', $nombres);

        return $query->getArrayResult();
    }

    /**
     * @return Articles[]
     */
    public function findOneArticle(int $nombre): array
    {
        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQuery(
            'SELECT p, s 
            FROM App\Entity\Articles p
            LEFT JOIN App\Entity\PhotoArt s 
            WITH p.id = s.idArticle
            WHERE p.id = (:id)'
        )->setParameter('id', $nombre);

        return $query->getScalarResult();
    }


    /**
     * @return Articles[]
     */
    public function findByIdArticle(int $id): array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
            SELECT * FROM articles a
            LEFT JOIN photo_art p
            ON a.id = p.id_article_id
            WHERE p.id = (:id) ';
        $stmt = $conn->prepare($sql);
        $stmt->executeQuery(['id' => $id]);

        // returns an array of arrays (i.e. a raw data set)
        return $stmt->fetchAllAssociative();
    }

    /**
     * @return Articles[]
     */
    public function findAllArticlesByidArticle(array $nombres): array
    {
        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQuery(
            "SELECT p, s
            FROM App\Entity\Articles p
            LEFT JOIN App\Entity\PhotoArt s 
            WITH p.id = s.idArticle
            WHERE p.id IN (:id)"
        )->setParameter('id', $nombres);

        return $query->getScalarResult();
    }

    /**
     * @return Articles[]
     */
    public function findAllArticlesByIdSousCat($idSousCat, $search): array
    {
        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQuery(
            "SELECT p, s
            FROM App\Entity\Articles p
            LEFT JOIN App\Entity\PhotoArt s 
            WITH p.id = s.idArticle
            WHERE p.idSousCat = (:idSousCat)
            AND p.nomProduit LIKE :search"
        )
            ->setParameter('idSousCat', $idSousCat)
            ->setParameter('search', '%' .  $search .  '%');

        return $query->getScalarResult();
    }


    /**
     * @return Articles[]
     */
    public function findAllPromotion(int $not): array
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT u,b 
        FROM App\Entity\Articles u 
        LEFT JOIN APP\Entity\PhotoArt b 
        WITH u.id = b.idArticle 
        WHERE u.promotion > :promotion');
        $query->setParameter('promotion', $not);
        $resultat = $query->getScalarResult();
        return $resultat;
    }
}
