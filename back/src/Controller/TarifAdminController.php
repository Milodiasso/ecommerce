<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use App\Entity\TarifAdmin;
use App\Entity\Users;

class TarifAdminController extends AbstractController
{
    /**
     * @Route("/api/tarifadmin", name="tarifadmin_add",  methods={"POST"})
     * @param Request $request
     */
    public function insert_tarif_admin(Request $request)
    {
        $reception = json_decode($request->getContent(), true);
        $entityManager = $this->getDoctrine()->getManager();
        $verify = new AuthController();
        $check = $verify->decode_token($reception['token']); 
        $informationToken=json_decode($check->getContent(),true);
        $role=$informationToken['roles'];


        if ($role == '["ROLE_ADMIN"]') {
            $TarifAdmin = new TarifAdmin();
            $TarifAdmin->setVille($reception['ville']);
            $TarifAdmin->setPays($reception['pays']);
            $TarifAdmin->setPrix($reception['prix']);
            $entityManager->persist($TarifAdmin);
            $entityManager->flush();
            return new JsonResponse(['msg' => 'insert réussi']);
        } else {
            return new JsonResponse(['msg' => "vous n etes pas un admin."]);
        }
    }


    /**
     * @Route("api/tarifadmin", name="tarifadmin_read",  methods={"GET"})
     * @param Request $request
     */
    public function read_all_tarif_admin()
    {
        $resultatTarifAdmin = $this->getDoctrine()
            ->getRepository(TarifAdmin::class)
            ->findAllTarifAdmin(0);
        return new JsonResponse([$resultatTarifAdmin]);
    }


    /**
     * @Route("/api/tarifadmin", name="tarifadmin_update",  methods={"PUT"})
     * @param Request $request
     */
    public function update_tarif_admin(Request $request)
    {
        $reception = json_decode($request->getContent(), true); // mettre pour que ça devient un tableau
        $entityManager = $this->getDoctrine()->getManager();

        $verify = new AuthController();
        $check = $verify->decode_token($reception['token']); 
        $informationToken=json_decode($check->getContent(),true);
        $role=$informationToken['roles'];
        if ($role == '["ROLE_ADMIN"]') {

            if (isset($reception["id"])) {
                $TarifAdmin= $entityManager->getRepository(TarifAdmin::class)->findOneBy(['id' => $reception["id"]]);
                $TarifAdmin->setVille($reception['ville']);
                $TarifAdmin->setPays($reception['pays']);
                $TarifAdmin->setPrix($reception['prix']);
                $entityManager->flush();

                return new JsonResponse(['msg' => "Mise a jour reussit."]);
            } else {
                return new JsonResponse(['msg' => "choisissez le tarif a modifie"]);
            }
        } else {
            return new JsonResponse(['msg' => "vous n'etes pas un admin."]);
        }
    }


    /**
     * @Route("/api/tarifadmin", name="tarif_admin_delete",  methods={"DELETE"})
     * @param Request $request
     */
    function delete_une_categrorie(Request $request)
    {

        $reception = json_decode($request->getContent(), true); // mettre pour que ça devient un tableau
        $entityManager = $this->getDoctrine()->getManager();

        $verify = new AuthController();
        $check = $verify->decode_token($reception['token']); 
        $informationToken=json_decode($check->getContent(),true);
        $role=$informationToken['roles'];
        if ($role == '["ROLE_ADMIN"]') {

            if (isset($reception["id"])) {
                $TarifAdmin = $entityManager->getRepository(TarifAdmin::class)->findOneBy(['id' => $reception["id"]]);
                $entityManager->remove($TarifAdmin);
                $entityManager->flush();

                return new JsonResponse(['msg' => "Tarif supprimé"]);
            } else {
                return new JsonResponse(['msg' => "choisissez le tarif a modifie"]);
            }
        } else {
            return new JsonResponse(['msg' => "vous n'etes pas un admin."]);
        }
    }

}
