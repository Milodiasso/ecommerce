<?php

namespace App\Controller;

use App\Entity\Categories;
use App\Entity\Users;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class CategoriesController extends AbstractController
{
    /**
     * @Route("/api/categories/insert", name="categorie_add",  methods={"POST"})
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
            $categorie = new Categories();
            $categorie->setNom($reception['nom']);
            $categorie->setBase64($reception['base']);
            $entityManager->persist($categorie);
            $entityManager->flush();
            return new JsonResponse(['msg' => 'insert réussi']);
        } else {
            return new JsonResponse(['msg' => "vous n etes pas un admin."]);
        }
    }


    /**
     * @Route("/api/categories/read", name="categorie_read",  methods={"GET"})
     * @param Request $request
     */
    public function read_all()
    {
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);
        $allCategories = $this->getDoctrine()->getRepository(Categories::class)->findAll();
        $resultat = $serializer->serialize($allCategories, 'json', [
            'ignored_attributes' => ['articles'], 'circular_reference_handler' => function ($object) {
                return $object;
            }
        ]);
        return new Response($resultat);
    }


    /**
     * @Route("/api/categories/update", name="categorie_update",  methods={"PUT"})
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

            if (isset($reception["id_cat"])) {
                $categorie = $entityManager->getRepository(Categories::class)->findOneBy(['id' => $reception["id_cat"]]);
                $categorie->setNom($reception['nom']);
                $categorie->setBase64($reception['base']);
                $entityManager->flush();

                return new JsonResponse(['msg' => "Mise a jour reussit."]);
            } else {
                return new JsonResponse(['msg' => "choisir la categorie"]);
            }
        } else {
            return new JsonResponse(['msg' => "vous n'etes pas un admin."]);
        }
    }


    /**
     * @Route("/api/categories/delete", name="categorie_delete",  methods={"POST"})
     * @param Request $request
     */
    function delete_une_categrorie(Request $request)
    {

        $reception = json_decode($request->getContent(), true); // mettre pour que ça devient un tableau
        $entityManager = $this->getDoctrine()->getManager();

        $verify = new AuthController();
        $check = $verify->decode_token($reception['token']);
        $informationToken = json_decode($check->getContent(), true);
        $role = $informationToken['roles'];
        if ($role == '["ROLE_ADMIN"]') {

            if (isset($reception["id_cat"])) {
                $categorie = $entityManager->getRepository(Categories::class)->findOneBy(['id' => $reception["id_cat"]]);
                $entityManager->remove($categorie);
                $entityManager->flush();

                return new JsonResponse(['msg' => "Catégorie supprimé"]);
            } else {
                return new JsonResponse(['msg' => "choisir la categorie"]);
            }
        } else {
            return new JsonResponse(['msg' => "vous n'etes pas un admin."]);
        }
    }
}
