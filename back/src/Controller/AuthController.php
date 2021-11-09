<?php

namespace App\Controller;

use App\Entity\Users;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Ahc\Jwt\JWT;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactory;

class AuthController extends AbstractController
{
    /**
     * @Route("/api/connexion", name="login",  methods={"POST"})
     * @param Request $request
     */
    public function connexion(Request $request)
    {
        $reception = json_decode($request->getContent(), true);
        $entityManager = $this->getDoctrine()->getManager();
        $user = $entityManager->getRepository(Users::class)->findOneBy([
            'email' => $reception['email']
        ]);

        $factory = new PasswordHasherFactory([
            'common' => ['algorithm' => 'bcrypt'],
            'memory-hard' => ['algorithm' => 'sodium'],
        ]);

        $passwordHasher = $factory->getPasswordHasher('common');

        if ($user !== null) {
            $check_flag = $user->getFlag();
            $check = $passwordHasher->verify($user->getPassword(), $reception['password']); // returns true (valid)
            if ($check && $check_flag) {

                $token   = (new JWT('ecommerce', 'HS512', 100000))->encode(
                    [
                        'id' => $user->getId(),
                        'username' => $user->getUsername(),
                        'email' => $user->getEmail(),
                        'roles' => $user->getRoles()
                    ]
                );

                return new JsonResponse($token);
            } else {
                return new Response(false);
            }
        }
        return new Response(false);
    }


    /**
     * @Route("/api/decode", name="decode",  methods={"POST"})
     * @param Request $request
     */
    public function decode_front(Request $request)
    {
        $reception = json_decode($request->getContent(), true);
        $verify = new AuthController();
        $check = $verify->decode_token($reception['token']);
        $informationToken = json_decode($check->getContent(), true);
        return new JsonResponse($informationToken);
    }



    /**
     * @param $token
     */
    public function decode_token($token)
    {
        if (isset($token)) {
            try {
                $payload = (new JWT('ecommerce', 'HS512', 10000))->decode($token);
                return new JsonResponse($payload);
            } catch (\Exception $th) {
                return new Response('token inexistant');
            }
        } else {
            return new Response('aucun token envoyé');
        }
    }
}
