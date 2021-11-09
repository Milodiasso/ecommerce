<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Users;
use App\Entity\Articles;
use App\Entity\Promotions;
use Exception;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use App\Repository\ArticlesRepository;
use Symfony\Component\Serializer\Encoder\XmlEncoder;

class SearchController extends AbstractController
{
    /**
     * @Route("/api/search/{produit}", name="api_search_articles",  methods={"GET"})
     * @param Request $request
     */
    function search_articles(Request $request, string $produit = null)
    {

        // $reception = json_decode($request->getContent(), true); 
        // $entityManager = $this->getDoctrine()->getManager();



        if (($produit != null) && (strlen($produit) >= 3)) {

            $repository = $this->getDoctrine()
                ->getRepository(Articles::class)
                ->findAllProduit($produit);



            $response = new Response(json_encode($repository));
            $response->headers->set('Content-Type', 'application/json');

            return $response;
        } else {

            return new JsonResponse(["error" => "Veuillez taper un mot a 3"]);
        }
    }

    /**
     * @Route("/api/search/{idSousCat}/{search}", name="api_articles_search_sous-cat",  methods={"GET"})
     * @param Request $request
     */
    function search_sou_cat_articles($idSousCat = 0, string $search = '')
    {

        $entityManager = $this->getDoctrine()->getManager();
        if ($idSousCat > 0 && strlen($search) > 3) {
            $produit = $this->getDoctrine()
                ->getRepository(Articles::class)
                ->searchByIdSousCat($idSousCat, $search);



            return new JsonResponse(['article' => $produit]);
        }
        return new JsonResponse(['no id sousCat or search < 3']);
    }
}
