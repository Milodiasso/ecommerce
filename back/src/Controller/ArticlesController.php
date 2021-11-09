<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Users;
use App\Entity\Articles;
use App\Entity\SousCat;
use App\Entity\Promotions;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Exception;

class ArticlesController extends AbstractController
{
    /**
     * @Route("/api/articles/add", name="api_add_articles",  methods={"POST"})
     * @param Request $request
     */
    function add_articles(Request $request)
    {

        $reception = json_decode($request->getContent(), true); // mettre pour que ça devient un tableau
        $entityManager = $this->getDoctrine()->getManager();


        $verify = new AuthController();
        $check = $verify->decode_token($reception['token']);
        $informationToken = json_decode($check->getContent(), true);
        $role = $informationToken['roles'];
        if ($role == '["ROLE_ADMIN"]') {
            $Articles = new Articles();
            $Articles->setNomProduit($reception['nomProduit']);
            $Articles->setDescription($reception['description']);
            $Articles->setQuantite($reception['quantite']);
            $Articles->setCaracteristique($reception['caracteristique']);
            $Articles->setPrixUnitaireHt($reception['prixUnitaireHt']);
            $Articles->setPrixUnitaireTtc($reception['prixUnitaireTtc']);
            $Articles->setPoids($reception['poids']);
            $Articles->setDimension($reception['dimension']);
            $id = $entityManager->getRepository(SousCat::class)->findOneBy(['id' => $reception['idSousCat']]);
            $Articles->setIdSousCat($id);
            $entityManager->persist($Articles);
            // actually executes the queries (i.e. the INSERT query)
            $entityManager->flush();

            return new JsonResponse(["error" => "L article a ete cree."]);
        } else {
            return new JsonResponse(['error' => "vous n etes pas un admin."]);
        }
    }

    /**
     * @Route("/api/articles/{idSousCat}", name="api_readall_articles",  methods={"GET"})
     * @param Request $request
     */
    function readall_articles(Request $request, int $idSousCat)
    {
        header("Access-Control-Allow-Origin: *");

        $reception = json_decode($request->getContent(), true); // mettre pour que ça devient un tableau
        $entityManager = $this->getDoctrine()->getManager();





        $resultatArticles = $this->getDoctrine()->getRepository(Articles::class)->findBy(["idSousCat" => $idSousCat]);
        // findBy(array('nom' => 'Symfony')) retournera les nom "Symfony".
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        // Serialize your object in Json
        $jsonObject = $serializer->serialize($resultatArticles, 'json', ['ignored_attributes' => ['articles', 'idSousCat', 'photoArt', 'dateCreation'], 'circular_reference_handler' => function ($object) {
            return $object;
        }]);
        $allArticles = new Response($jsonObject);
        $allArticles = json_decode($allArticles->getContent(), true);
        $idarticles = [];
        foreach ($allArticles as $key) {
            $idarticles[] = $key['id'];
        }
        $allArticles = $this->getDoctrine()
            ->getRepository(Articles::class)
            ->findAllArticlesByidArticle($idarticles);

        return new JsonResponse(['articles' => $allArticles]);
    }

    /**
     * @Route("/api/article/{idArticle}", name="api_readoneproduit_articles",  methods={"GET"})
     * @param Request $request
     */
    function readoneproduit_articles(Request $request, int $idArticle = 0)
    {

        $reception = json_decode($request->getContent(), true); // mettre pour que ça devient un tableau
        $entityManager = $this->getDoctrine()->getManager();




        if ($idArticle > 0) {
            $resultat = $entityManager->getRepository(Articles::class)->findOneBy(['id' => $idArticle]);

            if (!$resultat) {
                return new JsonResponse(['error' => "Le produit n existe pas."]);
            } else {
                $id = $resultat->getId();
                $produit = $this->getDoctrine()
                    ->getRepository(Articles::class)
                    ->findOneArticle($id);
                return new JsonResponse(['article' => $produit]);
            }
        }
    }


    /**
     * @Route("/api/produit/{idArticle}", name="api_readoneproduit_produit",  methods={"GET"})
     * @param Request $request
     */
    function readOneProduct(Request $request, int $idArticle = 0)
    {

        $entityManager = $this->getDoctrine()->getManager();
        if ($idArticle > 0) {
            $resultat = $entityManager->getRepository(Articles::class)->findOneBy(['id' => $idArticle]);
            $id = $resultat->getId();
            $produit = $this->getDoctrine()
                ->getRepository(Articles::class)
                ->findByIdArticle($id);
            return new JsonResponse(['article' => $produit]);
        }
    }

    /**
     * @Route("/api/articles/update", name="api__articles_update",  methods={"PUT"})
     * @param Request $request
     */
    function update_articles(Request $request)
    {

        $reception = json_decode($request->getContent(), true); // mettre pour que ça devient un tableau
        $entityManager = $this->getDoctrine()->getManager();



        $verify = new AuthController();
        $check = $verify->decode_token($reception['token']);

        $informationToken = json_decode($check->getContent(), true);
        $role = $informationToken['roles'];



        if ($role == '["ROLE_ADMIN"]') {
            if (isset($reception["id"])) {
                $produit = $entityManager->getRepository(Articles::class)->findOneBy(['id' => $reception["id"]]);
                if (!$produit) {
                    return new JsonResponse(['error' => "Le produit n existe pas."]);
                } else {
                    $produit->setNomProduit($reception['nomProduit']);
                    $produit->setDescription($reception['description']);
                    $produit->setQuantite($reception['quantite']);
                    $produit->setCaracteristique($reception['caracteristique']);
                    $produit->setPrixUnitaireHt($reception['prixUnitaireHt']);
                    $produit->setPrixUnitaireTtc($reception['prixUnitaireTtc']);
                    $produit->setPoids($reception['poids']);
                    $produit->setDimension($reception['dimension']);
                    $idSousCat = $entityManager->getRepository(SousCat::class)->findOneBy(['id' => $reception['idSousCat']]);
                    $produit->setIdSousCat($idSousCat);
                    $dateImmutable = \DateTime::createFromFormat('Y-m-d H:i:s', strtotime('now'));
                    $produit->setDateCreation($dateImmutable);
                    $entityManager->flush();
                    return new JsonResponse(['msg' => "Mise a jour reussit."]);
                }
            } else {
                return new JsonResponse(['error' => "veuillez taper le nom du produit a modifie"]);
            }
        } else {
            return new JsonResponse(['error' => "vous n etes pas un admin."]);
        }
    }

    /**
     * @Route("/api/articles/delete", name="api__articles_delete",  methods={"POST"})
     * @param Request $request
     */
    function delete_articles(Request $request)
    {

        $reception = json_decode($request->getContent(), true); // mettre pour que ça devient un tableau
        $entityManager = $this->getDoctrine()->getManager();

        $verify = new AuthController();
        $check = $verify->decode_token($reception['token']);
        $informationToken = json_decode($check->getContent(), true);
        $role = $informationToken['roles'];
        if ($role == '["ROLE_ADMIN"]') {

            if (isset($reception["id"])) {
                $produit = $entityManager->getRepository(Articles::class)->findOneBy(['id' => $reception["id"]]);
                if (!$produit) {
                    return new JsonResponse(['error' => "Le produit  n existe pas."]);
                } else {
                    $entityManager->remove($produit);
                    $entityManager->flush();
                    return new JsonResponse(['msg' => "Le produit a ete supprimer."]);
                }
            } else {
                return new JsonResponse(['error' => "veuillez taper le nom du produit a supprimer"]);
            }
        } else {
            return new JsonResponse(['error' => "vous n etes pas un admin."]);
        }
    }

    /**
     * @Route("/api/promotion", name="api__articles_create_update_delete",  methods={"PUT"})
     * @param Request $request
     */
    function create_update_delete_promotion(Request $request)
    {

        $reception = json_decode($request->getContent(), true); // mettre pour que ça devient un tableau
        $entityManager = $this->getDoctrine()->getManager();

        $verify = new AuthController();
        $check = $verify->decode_token($reception['token']);
        $informationToken = json_decode($check->getContent(), true);
        $role = $informationToken['roles'];
        if ($role == '["ROLE_ADMIN"]') {

            if (isset($reception["id"])) {
                $produit = $entityManager->getRepository(Articles::class)->findOneBy(['id' => $reception["id"]]);
                if (!$produit) {
                    return new JsonResponse(['error' => "Le produit n existe pas."]);
                } else {
                    $produit->setPromotion($reception['promotion']);
                    $entityManager->flush();
                    return new JsonResponse(['msg' => "Mise a jour reussit."]);
                }
            } else {
                return new JsonResponse(['error' => "veuillez taper le nom du produit a modifie"]);
            }
        } else {
            return new JsonResponse(['error' => "vous n etes pas un admin."]);
        }
    }

    /**
     * @Route("/api/promotion", name="api_promotion",  methods={"GET"})
     * @param Request $request
     */
    function readall_promotion(Request $request)
    {

        $reception = json_decode($request->getContent(), true); // mettre pour que ça devient un tableau
        $entityManager = $this->getDoctrine()->getManager();


        $resultatpromotion = $this->getDoctrine()
            ->getRepository(Articles::class)
            ->findAllPromotion(0);
        return new JsonResponse([$resultatpromotion]);
    }
}
