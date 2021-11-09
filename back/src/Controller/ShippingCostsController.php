<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpClient\HttpClient;
use App\Entity\TarifAdmin;

class ShippingCostsController extends AbstractController
{

  /**
   * @Route("/api/shippingcosts", name="api_ShippingCosts",  methods={"POST"})
   * @param Request $request
   */
  function ShippingCosts(Request $request)
  {
    
    
    $reception = json_decode($request->getContent(), true); // mettre pour que ça devient un tableau
    
    if($reception["city_locality"] && $reception["country_code"] ){
      
          $resultatTarifAdmin = $this->getDoctrine()
                ->getRepository(TarifAdmin::class)
                ->findPrixTarifAdmin($reception["city_locality"],$reception["country_code"]);
                
          if($resultatTarifAdmin!=[]){
            return new Response($resultatTarifAdmin[0]['prix']);
          }
    }
    
    $data = [
      "rate_options" => [
        "carrier_ids" =>  [
          "se-731948"
        ]
      ],
      "shipment" =>  [
        "validate_address" => "no_validation",
        "ship_to" =>  [
          "name" => $reception["name"],
          "phone" => $reception["phone"],
          "address_line1" => $reception["address_line1"],
          "city_locality" => $reception["city_locality"],
          "postal_code" => $reception["postal_code"],
          "country_code" => $reception["country_code"],
          "address_residential_indicator" => "yes"
        ],
        "ship_from" =>  [
          "company_name" => "Example Corp.",
          "name" => "John Doe",
          "phone" => "111-111-1111",
          "address_line1" => "4009 Marathon Blvd",
          "address_line2" => "Suite 300",
          "city_locality" => "Austin",
          "state_province" => "TX",
          "postal_code" => "78756",
          "country_code" => "US",
          "address_residential_indicator" => "no"
        ],
        "packages" =>  [
          [
            "weight" => [
              "value" => $reception["packages"][0]["weight"]["value"],
              "unit" => $reception["packages"][0]["weight"]["unit"]
            ],
            "dimensions" => [
              "unit" => "inch",
              "length" => 10.0,
              "width" => 10.0,
              "height" => 10.0
            ]
          ]
        ]
      ]
    ];
    

    $httpClient = HttpClient::create();
    $response = $httpClient->request('POST', 'https://api.shipengine.com/v1/rates', [
      'headers' => [
        'Content-Type' => 'application/json',
        'API-KEY' => 'TEST_7JMkhX1qvZoaTSQzqCkDfrkMFKDhBv29Hfq7A+oec1Q'
      ],
      'json' => $data
    ]);
    //$statusCode = $response->getStatusCode();
    // $statusCode = 200
    //$content = $response->getContent();
    // returns the raw content returned by the server (JSON in this case)
    // $content = '{"id":521583, "name":"symfony-docs", ...}'
    $content = $response->toArray();
    // transforms the response JSON content into a PHP array
    // $content = ['id' => 521583, 'name' => 'symfony-docs', ...]
   
    $value = $content['rate_response']["invalid_rates"][0]['shipping_amount']['amount'];
    
    //dd($content);
  return new Response($value);

  }
}
