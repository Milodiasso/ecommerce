<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactory;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Users;
use App\Entity\Adresses;
use Exception;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class InscriptionController extends AbstractController
{


    /**
     * @Route("/api/inscription", name="api_todo_create",  methods={"POST"})
     * @param Request $request
     */
    public function create(Request $request, ValidatorInterface $validator)
    {


        $reception = json_decode($request->getContent(), true); // mettre pour que ça devient un tableau
        $entityManager = $this->getDoctrine()->getManager();
        $Users = new Users();
        //$errors = $validator->validate($Users);
        $today = date("m.d.y");
        $Users->setUsername($reception['username']);
        // Configure different password hashers via the factory
        $factory = new PasswordHasherFactory([
            'common' => ['algorithm' => 'bcrypt'],
            'memory-hard' => ['algorithm' => 'sodium'],
        ]);

        // Retrieve the right password hasher by its name
        $passwordHasher = $factory->getPasswordHasher('common');

        // Hash a plain password
        $hash = $passwordHasher->hash($reception['password']); // returns a bcrypt hash

        // Verify that a given plain password matches the hash
        $passwordHasher->verify($hash, 'wrong'); // returns false
        $passwordHasher->verify($hash, 'plain'); // returns true (valid)
        $Users->setPassword($hash);
        $Users->setEmail($reception['email']);
        $Users->setDatecreation($today);
        $Users->setRoles('["ROLE_USER"]');
        $Users->setFlag(true);
        $usernameError = $validator->validateProperty($Users, 'username');
        $passwordError = $validator->validateProperty($Users, 'password');
        $emailError = $validator->validateProperty($Users, 'email');

        $formErrors = [];
        if (count($usernameError) > 0) {
            $formErrors['usernameError'] = $usernameError[0]->getMessage();
        }
        if (count($passwordError) > 0) {
            $formErrors['passwordError'] = $passwordError[0]->getMessage();
        }
        if (count($emailError) > 0) {
            $formErrors['emailError'] = $emailError[0]->getMessage();
        }
        if ($formErrors) {

            return new JsonResponse($formErrors);
        }

        // tell Doctrine you want to (eventually) save the Product (no queries yet)
        try {
            $entityManager->persist($Users);
            // actually executes the queries (i.e. the INSERT query)
            $entityManager->flush();

            return new JsonResponse(['msg' => 'inscription reussi']);
        } catch (Exception $e) {
            return new JsonResponse(["msg" => "Email existant"]);
        }
    }

    /**
     * @Route("/api/user", name="user_read",  methods={"POST"})
     * @param Request $request
     */
    public function read_all(Request $request)
    {
        
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);
        $entityManager = $this->getDoctrine()->getManager();
        $reception = json_decode($request->getContent(), true);

        if (isset($reception['token'])) {
            $verify = new AuthController();
            $check = $verify->decode_token($reception['token']);
            
            $informationToken = json_decode($check->getContent(), true);
            if (isset($informationToken['email'])){
                
                $email = $informationToken['email'];
                $user_info = $entityManager->getRepository(Users::class)->findOneBy(['email' => $email]);
                //$idUser=$user_info->getId();
                //$user_adresses = $entityManager->getRepository(Adresses::class)->findBy(['idUser' => $idUser]);
                //dd($user_adresses[0]->getNom());
                //return new JsonResponse($user_adresses);
                $resultat = $serializer->serialize($user_info, 'json', [
                    'ignored_attributes' => ['password', ], 'circular_reference_handler' => function ($object) {
                        return $object;
                    }
                ]);
                //return new Response("coucou");
                
                return new Response($resultat);
            } else {
                return new Response('token inexistant');
            }
        }
    }

    /**
     * @Route("/api/user/update", name="user_update",  methods={"PUT"})
     * @param Request $request
     */

    function update_user(Request $request)
    {
        $reception = json_decode($request->getContent(), true);
        $entityManager = $this->getDoctrine()->getManager();
        if (isset($reception['token'])) {
            $verify = new AuthController();
            $check = $verify->decode_token($reception['token']);
            $informationToken = json_decode($check->getContent(), true);

            $user_info = $entityManager->getRepository(Users::class)->findOneBy(['email' => $informationToken["email"]]);
            if (isset($reception['email_change'])) {
                $user_info->setEmail($reception['email_change']);
            }
            if (isset($reception['username'])) {
                $user_info->setUsername($reception['username']);
            }
            if (isset($reception['password'])) {
                $user_info->setPassword($reception['password']);
            }
            $entityManager->flush();
            return new JsonResponse(['msg' => "Mise a jour reussit."]);
        }
    }

    /**
     * @Route("/api/user/delete", name="user_delete",  methods={"PUT"})
     * @param Request $request
     */
    function delete_user(Request $request)
    {
        $reception = json_decode($request->getContent(), true);
        $entityManager = $this->getDoctrine()->getManager();
        $verify = new AuthController();
        $check = $verify->decode_token($reception['token']);
        $informationToken = json_decode($check->getContent(), true);

        $user_info = $entityManager->getRepository(Users::class)->findOneBy(['email' => $informationToken['email']]);
        $user_info->setFlag(false);
        $entityManager->flush();
        return new JsonResponse(['msg' => "Flag du compte = false"]);
    }
}
