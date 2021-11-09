<?php

namespace App\Controller;

use App\Entity\Categories;
use App\Entity\SousCat;
use App\Entity\Users;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Response;

class SousCatController extends AbstractController
{
    /**
     * @Route("/api/SousCat/insert", name="sousCategorie_insert",  methods={"POST"})
     * @param Request $request
     */
    public function insert_une_cat(Request $request)
    {
        $reception = json_decode($request->getContent(), true);
        $entityManager = $this->getDoctrine()->getManager();
        $verify = new AuthController();
        $check = $verify->decode_token($reception['token']);
        $informationToken = json_decode($check->getContent(), true);
        $role = $informationToken['roles'];
        if ($role == '["ROLE_ADMIN"]') {
            $sousCategorie = new SousCat();
            $id = $entityManager->getRepository(Categories::class)->findOneBy(['id' => $reception['id_cat']]);
            $sousCategorie->setIdCat($id);
            $sousCategorie->setNom($reception['nom']);
            $entityManager->persist($sousCategorie);
            $entityManager->flush();
            return new JsonResponse(['msg' => 'insert réussi']);
        } else {
            return new JsonResponse(['msg' => "vous n etes pas un admin."]);
        }
    }


    /**
     * @Route("/api/SousCat/read", name="sousCategorie_read",  methods={"GET"})
     * @param Request $request
     */
    public function read_all()
    {
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);
        $allSousCat = $this->getDoctrine()->getRepository(SousCat::class)->findAll();
        $resultat = $serializer->serialize($allSousCat, 'json', [
            'ignored_attributes' => ['photoArt', 'dateCreation', 'articles'], 'circular_reference_handler' => function ($object) {
                return $object;
            }
        ]);
        return new Response($resultat);
    }


    /**
     * @Route("/api/SousCat/update", name="sousCategorie_update",  methods={"PUT"})
     * @param Request $request
     */
    public function update_une_cat(Request $request)
    {
        $reception = json_decode($request->getContent(), true); // mettre pour que ça devient un tableau
        $entityManager = $this->getDoctrine()->getManager();

        $verify = new AuthController();
        $check = $verify->decode_token($reception['token']);
        $informationToken = json_decode($check->getContent(), true);
        $role = $informationToken['roles'];
        if ($role == '["ROLE_ADMIN"]') {

            if (isset($reception["id"])) {
                $sousCategorie = $entityManager->getRepository(SousCat::class)->findOneBy(['id' => $reception["id"]]);
                if (!$sousCategorie) {
                    return new JsonResponse(['msg' => "La sous categorie  n existe pas."]);
                } else {
                    $sousCategorie->setNom($reception['nom']);
                    $id = $entityManager->getRepository(Categories::class)->findOneBy(['id' => $reception['idCat']]);
                    $sousCategorie->setIdCat($id);
                    $entityManager->flush();

                    return new JsonResponse(['msg' => "Mise a jour reussit."]);
                }
            } else {
                return new JsonResponse(['msg' => "choisir la sousCategorie"]);
            }
        } else {
            return new JsonResponse(['msg' => "vous n'etes pas un admin."]);
        }
    }


    /**
     * @Route("/api/SousCat/delete", name="sousCategorie_delete",  methods={"POST"})
     * @param Request $request
     */
    function delete_une_sous_categrorie(Request $request)
    {

        $reception = json_decode($request->getContent(), true); // mettre pour que ça devient un tableau
        $entityManager = $this->getDoctrine()->getManager();

        $verify = new AuthController();
        $check = $verify->decode_token($reception['token']);
        $informationToken = json_decode($check->getContent(), true);
        $role = $informationToken['roles'];
        if ($role == '["ROLE_ADMIN"]') {

            if (isset($reception["idSousCat"])) {
                $sousCategorie = $entityManager->getRepository(SousCat::class)->findOneBy(['id' => $reception["idSousCat"]]);
                if (!$sousCategorie) {
                    return new JsonResponse(['msg' => "Le produit " . $reception["idSousCat"] . " n existe pas."]);
                } else {

                    $entityManager->remove($sousCategorie);
                    $entityManager->flush();

                    return new JsonResponse(['msg' => "Catégorie supprimé"]);
                }
            } else {
                return new JsonResponse(['msg' => "choisir la sousCategorie"]);
            }
        } else {
            return new JsonResponse(['msg' => "vous n'etes pas un admin."]);
        }
    }
}
