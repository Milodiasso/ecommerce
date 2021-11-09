<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\HttpClient\HttpClient;

class PaypalController extends AbstractController
{
    /**
     * @Route("/api/paypal", name="paypal_token",  methods={"POST"})
     * @param Request $request
     */
    public function paypal_token( HttpClientInterface $client)
    {
        
        //partie paypal token
        $response = $client->request('POST', 'https://api-m.sandbox.paypal.com/v1/oauth2/token', [
            'headers' => [
                'Content-Type' => 'application/x-www-form-urlencoded'
            ],
            'auth_basic' => ['AXC8KfIpB3JYYXKXuKpAkz2Zpo6LS3v-14sfpShTt2wCr1dafhFkkkJJM6s5O9QeivSb20ekkYyQXdEw', 'EGuFvZEE02Lbc4GZ9zt5pnKs1j5F-W0USWtXSHdE-fqiaYf-SD7bkZZxyOdz0AI03WAjLnXuBsU45Bfa'],
            'body' => ['grant_type' => 'client_credentials'],
        ]);

        $content = $response->getContent();
        $content = json_decode($content, true); // mettre pour que ça devient un tableau
        $tokenPaypal = $content['access_token'];


        

        //partie paypal demande de paiement
        $httpClient = HttpClient::create();
        $data =
        [
            "intent" => "sale",
            "payer" =>  [
              "payment_method" => "paypal"
            ],
            "transactions" => [
              0 =>  [
                "amount" => [
                  "total" => "30.11",
                  "currency" => "USD",
                  "details" =>  [
                    "subtotal" => "30.00",
                    "tax" => "0.07",
                    "shipping" => "0.03",
                    "handling_fee" => "1.00",
                    "shipping_discount" => "-1.00",
                    "insurance" => "0.01"
                  ]
                  ],
                "description" => "This is the payment transaction description.",
                "custom" => "EBAY_EMS_90048630024435",
                "invoice_number" => "487875896734",
                "payment_options" =>  [
                  "allowed_payment_method" => "INSTANT_FUNDING_SOURCE"
                ],
                "soft_descriptor" => "ECHI5786786",
                "item_list" =>  [
                  "items" =>  [
                    0 =>  [
                      "name" => "hat",
                      "description" => "Brown color hat",
                      "quantity" => "5",
                      "price" => "3",
                      "tax" => "0.01",
                      "sku" => "1",
                      "currency" => "USD"
                    ],
                    1 =>  [
                      "name" => "handbag",
                      "description" => "Black color hand bag",
                      "quantity" => "1",
                      "price" => "15",
                      "tax" => "0.02",
                      "sku" => "product34",
                      "currency" => "USD"
                    ]
                    ],
                  "shipping_address" =>  [
                    "recipient_name" => "Hello World",
                    "line1" => "4thFloor",
                    "line2" => "unit#34",
                    "city" => "SAn Jose",
                    "country_code" => "US",
                    "postal_code" => "95131",
                    "phone" => "011862212345678",
                    "state" => "CA"
                  ]
                ]
              ]
                  ],
            "note_to_payer" => "Contact us for any questions on your order.",
            "redirect_urls" =>  [
              "return_url" => "http://localhost:3000/Paypal",
              "cancel_url" => "https://example.com"
            ]
            ];
        $response = $httpClient->request('POST', 'https://api-m.sandbox.paypal.com/v1/payments/payment', [
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $tokenPaypal,

            ],
            'json' => $data,
        ]);
        
        $content = $response->getContent();
        
        $content = json_decode($content, true); // mettre pour que ça devient un tableau
        $pathCmd=$content['links'][1]['href'];
        $pathExecute=$content['links'][2]['href'];
        

        return new JsonResponse(["jetonPaypal" => $tokenPaypal, "cmd"=> $pathCmd, "execute"=>$pathExecute]);
    }


    /**
     * @Route("/api/payeridentifiant/{information}", name="paypal_commande",  methods={"GET"})
     * @param Request $request
     */
    public function paypal_commande( string $information){
        return new Response($information);
    }
    
}
