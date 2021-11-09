<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Adresses;
use App\Entity\Users;
use App\Entity\Articles;
use App\Entity\Commande;
use App\Entity\ArtCmd;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Mime\Address;
use Symfony\Component\HttpClient\HttpClient;


class CommandeController extends AbstractController
{
    
    /**
     * @Route("/api/commande", name="commande_add",  methods={"POST"})
     * @param Request $request
     */
    public function commande_add(Request $request)
    {
        
        $reception = json_decode($request->getContent(), true);
        if(empty($reception['token'])) return new JsonResponse(["error"=>"veuillez vous connectez"]);
        $entityManager = $this->getDoctrine()->getManager();
        $verify = new AuthController();
        $check = $verify->decode_token($reception['token']); 
        
        $informationToken=json_decode($check->getContent(),true);
        if(null ==($informationToken['id'])) return new JsonResponse(["error"=>"veuillez vous connectez"]);
        $idUser=$informationToken['id'];

        
        $commande = new Commande();
        $userId = $entityManager->getRepository(Users::class)->findOneBy(['id' => $idUser]);
        $commande->setUserId($userId );
        $addressId = $entityManager->getRepository(Adresses::class)->findOneBy(['id' => $reception['adress_id']]);
        $commande->setAddressId($addressId);
        $commande->setPayId($reception['pay_id']);
        $commande->setPrixTransport($reception['prix_transport']);
        
        $bigRef = $this->getDoctrine()
        ->getRepository(Commande::class)
        ->findBigRef(999);
        
        if($bigRef==[]){
            $commande->setRef(1000);
        }else if($bigRef>999){
            
            $bigRef=$bigRef[0]['ref'];
            $commande->setRef($bigRef+1);
        }
        $entityManager->persist($commande);
        $entityManager->flush();

        
        foreach($reception['article_quantite'] as $article_id => $quantity){
       //et la partie tableau artcmd
        $ArtCmd = new ArtCmd();
        $cmdId = $this->getDoctrine()
        ->getRepository(Commande::class)
        ->findLastIdCommande();    
        $cmdId = $entityManager->getRepository(Commande::class)->findOneBy(['id' => $cmdId[0]['id']]);
        $ArtCmd ->setCmdId($cmdId);
        
        $article = $entityManager->getRepository(Articles::class)->findOneBy(['id' => $article_id]);
        $artPrix=$article->getPrixUnitaireTtc();
        $artPromotion=$article->getPromotion();
        $ArtCmd ->setArtId($article);
        $ArtCmd ->setCurrPrice($artPrix);
        $ArtCmd ->setDiscount($artPromotion);
        $ArtCmd ->setQuantite($quantity);
        $entityManager->persist($ArtCmd );
        $entityManager->flush();
        }
        return new JsonResponse(['msg' => 'insert réussi']);
    }

    /**
     * @Route("/api/commande", name="commande_read",  methods={"GET"})
     * @param Request $request
     */
    public function commande_read_user(Request $request)
    {
        $reception = json_decode($request->getContent(), true);
        $entityManager = $this->getDoctrine()->getManager();
        
        if(empty($reception['token'])) return new Jsonresponse(["error"=>'veuillez vous connecter']);
        
        $verify = new AuthController();
        $check = $verify->decode_token($reception['token']); 
        $informationToken=json_decode($check->getContent(),true);
        
        $email=$informationToken['email'];
        
        $idUser = $this->getDoctrine()
        ->getRepository(Users::class)
        ->findIdUser($email);

        
        $idUser=$idUser[0]['id'];
        
        $AllCommandeUser = $this->getDoctrine()
        ->getRepository(Commande::class)
        ->findWhereIdUser($idUser);
        return new JsonResponse($AllCommandeUser);
    }


    /**
     * @Route("/api/commande", name="api_commande_update",  methods={"PUT"})
     * @param Request $request
     */
    function update_commande(Request $request)
    {

        $reception = json_decode($request->getContent(), true); // mettre pour que ça devient un tableau
        $entityManager = $this->getDoctrine()->getManager();

        if(empty($reception['token'])) return new Jsonresponse(["error"=>'veuillez vous connecter']);
        
        $verify = new AuthController();
        $check = $verify->decode_token($reception['token']); 
        $informationToken=json_decode($check->getContent(),true);



        if (isset($informationToken['id'])) {
            $commande = $entityManager->getRepository(Commande::class)->findOneBy(['user_id' => $informationToken['id'], "ref"=>$reception['ref']]);   
            $idAddress = $entityManager->getRepository(Adresses::class)->findOneBy(['id' => $reception['address_id']]);
            $commande->setAddressId($idAddress);
            $commande->setPayId($reception['pay_id']);
            $commande->setDate();
            $commande->setPrixTransport($reception['prix_transport']);
            $entityManager->flush();
            $i=0;
            $idCommande=$commande->getId();
            if(isset($reception['update_article_quantite'])){
                $array=$this->array_article_quantite($reception['update_article_quantite']);
                $maxForeach=max(array_keys($array))+1;
                $i=0;
                $ArtCmd = $entityManager->getRepository(ArtCmd::class)->findBy(['cmd_id' => $idCommande]);
                foreach($ArtCmd as $value){
                $article = $entityManager->getRepository(Articles::class)->findOneBy(['id' => $array[$i]['id_article']]);
                    $artPrix=$article->getPrixUnitaireTtc();
                    $artPromotion=$article->getPromotion();  
                    $value->setCurrPrice($artPrix);
                    $value->setDiscount($artPromotion);
                    $value->setArtId($article);
                    
                    $value->setQuantite($array[$i]['quantite']);
                    $entityManager->flush();
                    $i++;
                    if($maxForeach==$i) break;
                }
                
        
            }
            if(isset($reception['add_article_quantite'])){
                foreach($reception['add_article_quantite'] as $idArticle => $quantite){
                     $ArtCmd = new ArtCmd();   
                     $cmdId = $entityManager->getRepository(Commande::class)->findOneBy(['id' => $idCommande]);
                     $ArtCmd ->setCmdId($cmdId);
                     $article = $entityManager->getRepository(Articles::class)->findOneBy(['id' => $idArticle]);
                     $artPrix=$article->getPrixUnitaireTtc();
                     $artPromotion=$article->getPromotion();
                     $ArtCmd ->setArtId($article);
                     $ArtCmd ->setCurrPrice($artPrix);
                     $ArtCmd ->setDiscount($artPromotion);
                     $ArtCmd ->setQuantite($quantite);
                     $entityManager->persist($ArtCmd );
                     $entityManager->flush();
                     }
            }
            if(isset($reception['delete_article'])){
                foreach($reception['delete_article'] as $idArticle){
                    $ArtCmd = $entityManager->getRepository(ArtCmd::class)->findOneBy(['cmd_id' => $idCommande,'art_id' => $idArticle]);
                    $entityManager->remove($ArtCmd);
                    $entityManager->flush();
                }
                $ArtCmd = $entityManager->getRepository(ArtCmd::class)->findOneBy(['cmd_id' => $idCommande]);
                if($ArtCmd==null){
                    $deleteCommande = $entityManager->getRepository(Commande::class)->findOneBy(['id' => $idCommande]);  
                    $entityManager->remove($deleteCommande);
                    $entityManager->flush();
                } 
                
            }


            
            return new JsonResponse(['msg' => "Mise a jour reussit."]);
                
        }else{
            return new Jsonresponse(["error"=>'veuillez vous connecter']);
        }
    }
    









    

    /**
     * @Route("/api/commande", name="commande_delete",  methods={"DELETE"})
     * @param Request $request
     */
    public function commande_delete_user(Request $request)
    {
        $reception = json_decode($request->getContent(), true);
        $entityManager = $this->getDoctrine()->getManager();
        
        if(empty($reception['token'])) return new Jsonresponse(['error'=>'veuillez vous connecter']);
        
        $verify = new AuthController();
        $check = $verify->decode_token($reception['token']); 
        $informationToken=json_decode($check->getContent(),true);
        $email=$informationToken['email'];
        $idUser = $this->getDoctrine()
        ->getRepository(Users::class)
        ->findIdUser($email);
        $idUser=$idUser[0]['id'];
        $deleteCommande = $entityManager->getRepository(Commande::class)->findOneBy(['user_id' => $idUser, "ref"=>$reception['ref']]);    
        $entityManager->remove($deleteCommande);
        $entityManager->flush();
        $httpClient = HttpClient::create();
        $response = $httpClient->request('POST', 'https://api.shipengine.com/v1/rates', [
        'headers' => [
            'Content-Type' => 'application/json',
        'API-KEY' => 'TEST_7JMkhX1qvZoaTSQzqCkDfrkMFKDhBv29Hfq7A+oec1Q'
        ],
        'json' => $data
        ]);
        return new JsonResponse(["msg"=>"supprimer"]);
    }


    public function array_article_quantite($array){
        $i=0;
        $allIdArticleQuantite=[];
        foreach($array as $idArticle=> $quantite){
            $allIdArticleQuantite[$i]=["id_article"=>$idArticle,"quantite"=>$quantite];
            $i++;
        }
        return $allIdArticleQuantite;
    }

}
