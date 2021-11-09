<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Promotions;
use App\Entity\Users;
use App\Entity\PhotoArt;
use App\Entity\Articles;
use Symfony\Component\HttpFoundation\JsonResponse;

class PhotoArtController extends AbstractController
{
    /**
     * @Route("/api/PhotoArt/add", name="api_add_PhotoArt",  methods={"POST"})
     * @param Request $request
     */

    function add_PhotoArt(Request $request)
    {

        $reception = json_decode($request->getContent(), true); // mettre pour que ça devient un tableau
        $entityManager = $this->getDoctrine()->getManager();


        $verify = new AuthController();
        $check = $verify->decode_token($reception['token']);
        $informationToken = json_decode($check->getContent(), true);
        $role = $informationToken['roles'];
        if ($role == '["ROLE_ADMIN"]') {
            $Promotions = new PhotoArt();
            $id = $entityManager->getRepository(Articles::class)->findOneBy(['id' => $reception["idArticle"]]);
            $Promotions->setIdArticle($id);
            $Promotions->setUrl($reception['url']);
            $Promotions->setNom($reception['nom']);
            $entityManager->persist($Promotions);
            // actually executes the queries (i.e. the INSERT query)
            $entityManager->flush();

            return new JsonResponse(["msg" => "La photo a ete ajouté."]);
        } else {
            return new JsonResponse(['msg' => "vous n etes pas un admin."]);
        }
    }


    /**
     * @Route("/api/PhotoArt", name="photo_update",  methods={"PUT"})
     * @param Request $request
     */
    public function update_photo(Request $request)
    {
        $reception = json_decode($request->getContent(), true); // mettre pour que ça devient un tableau
        $entityManager = $this->getDoctrine()->getManager();

        $verify = new AuthController();
        $check = $verify->decode_token($reception['token']);
        $informationToken = json_decode($check->getContent(), true);
        $role = $informationToken['roles'];
        if ($role == '["ROLE_ADMIN"]') {

            if (isset($reception["photo_id"])) {
                $photoArt = $entityManager->getRepository(PhotoArt::class)->findOneBy(['id' => $reception["id_photo"]]);
                $photoArt->setNom($reception['nom']);
                $photoArt->setUrl($reception['photo_url']);
                $entityManager->flush();

                return new JsonResponse(['msg' => "Mise a jour reussit."]);
            } else {
                return new JsonResponse(['error' => "choisir la photoArt"]);
            }
        } else {
            return new JsonResponse(['error' => "vous n'etes pas un admin."]);
        }
    }
}
