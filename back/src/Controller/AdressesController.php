<?php

namespace App\Controller;

use App\Entity\Adresses;
use App\Entity\Users;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Response;

class AdressesController extends AbstractController
{
    /**
     * @Route("/api/adresses/insert", name="adresseInsert",  methods={"POST"})
     * @param Request $request
     */
    public function insert(Request $request)
    {
        $reception = json_decode($request->getContent(), true);
        $entityManager = $this->getDoctrine()->getManager();

        $verify = new AuthController();
        $check = $verify->decode_token($reception['token']);
        $informationToken = json_decode($check->getContent(), true);
        $id_user = $informationToken['id'];

        $adresses = new Adresses();
        $id = $entityManager->getRepository(Users::class)->findOneBy(['id' => $id_user]);
        $adresses->setIdUser($id);
        $adresses->setNom($reception['nom']);
        $adresses->setPrenom($reception['prenom']);
        $adresses->setRue($reception['rue']);
        $adresses->setCodePostal($reception['codePostal']);
        $adresses->setVille($reception['ville']);
        $adresses->setPays($reception['pays']);

        $entityManager->persist($adresses);
        $entityManager->flush();
        return new JsonResponse(['msg' => 'insert réussi']);
    }


    /**
     * @Route("/api/adresses/read", name="adresseRead",  methods={"GET"})
     * @param Request $request
     */
    public function read_all(Request $request)
    {
        $reception = json_decode($request->getContent(), true); // mettre pour que ça devient un tableau
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);
        $entityManager = $this->getDoctrine()->getManager();
        $verify = new AuthController();
        $check = $verify->decode_token($reception['token']);
        $informationToken = json_decode($check->getContent(), true);
        $email = $informationToken['email'];

        $id_user = $entityManager->getRepository(Users::class)->findOneBy(['email' => $email])->getId();

        $allAdresses = $this->getDoctrine()->getRepository(Adresses::class)->findBy(['idUser' => $id_user]);
        $resultat = $serializer->serialize($allAdresses, 'json', [
            'ignored_attributes' => ['idUser'], 'circular_reference_handler' => function ($object) {
                return $object;
            }
        ]);
        return new Response($resultat);
    }

    /**
     * @Route("/api/adresses/read/{id}", name="adresseReadById",  methods={"GET"})
     * @param Request $request
     */
    public function read_one_adress(int $id)
    {

        $response = $this->getDoctrine()
            ->getRepository(Adresses::class)
            ->findOneAdresse($id);



        $response = new Response(json_encode($response));
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }






    /**
     * @Route("/api/adresses/update", name="adresseUpdate",  methods={"PUT"})
     * @param Request $request
     */
    public function update(Request $request)
    {
        $reception = json_decode($request->getContent(), true); // mettre pour que ça devient un tableau
        $entityManager = $this->getDoctrine()->getManager();

        // $id_user = $entityManager->getRepository(Users::class)->findOneBy(['email' => $reception["email"]])->getId();

        if (isset($reception['id_adresse'])) {

            $id = $entityManager->getRepository(Adresses::class)->findOneBy(['id' => $reception['id_adresse']])->getIdUser();

            $id_adresse = $entityManager->getRepository(Adresses::class)->findOneBy(['id' => $reception['id_adresse']]);
            $id_adresse->setIdUser($id);

            $id_adresse->setNom($reception['nom']);
            $id_adresse->setPrenom($reception['prenom']);
            $id_adresse->setRue($reception['rue']);
            $id_adresse->setCodePostal($reception['codePostal']);
            $id_adresse->setVille($reception['ville']);
            $id_adresse->setPays($reception['pays']);

            $entityManager->flush();

            return new JsonResponse(['msg' => "Mise a jour reussit."]);
        } else {
            return new JsonResponse(['error' => "il manque le choix adresse (id)"]);
        }
    }


    /**
     * @Route("/api/adresses/delete", name="adresseDelete",  methods={"DELETE"})
     * @param Request $request
     */
    function delete(Request $request)
    {

        $reception = json_decode($request->getContent(), true); // mettre pour que ça devient un tableau
        $entityManager = $this->getDoctrine()->getManager();


        if (isset($reception["id_adresse"])) {
            $adresses = $entityManager->getRepository(Adresses::class)->findOneBy(['id' => $reception["id_adresse"]]);
            $entityManager->remove($adresses);
            $entityManager->flush();

            return new JsonResponse(['msg' => "Catégorie supprimé"]);
        } else {
            return new JsonResponse(['error' => "envoyer l'id adresse"]);
        }
    }
}
