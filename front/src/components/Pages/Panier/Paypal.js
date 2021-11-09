import React from 'react';
import 'react-hook-form';
import { PayPalButton } from "react-paypal-button-v2";
import { reactLocalStorage } from 'reactjs-localstorage';
const axios = require('axios');

 function Paypal(props){

    return (

      <PayPalButton
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: props.prix,

              },

            }],
          });
        }}
        onApprove={(data, actions) => {
          // Capture the funds from the transaction
          return actions.order.capture().then(function(details) {
            // Show a success message to your buyer
            reactLocalStorage.remove('panier');
            props.setLs(reactLocalStorage.getObject(null))
            props.setCompteur(0);
            //console.log(reactLocalStorage.remove('panier'));
            //alert("id paiement" + data.orderID);
            console.log(data);
            //console.log(props.article_quantite)

            console.log(props.article_quantity)
            let idPaiement=data.orderID
            let information={
              "token": reactLocalStorage.get("token"),
              "adress_id": 1,
              "pay_id": idPaiement,
              "prix_transport": props.prixDelivery,
              "article_quantite": props.article_quantity
            }


            axios.post("http://127.0.0.1:8000/api/commande",information,{
              headers: { "Content-Type": "application/json"}
              })
                .then(res => {
                  console.log(res.data);
                  if (res.data.msg) {reactLocalStorage.remove('panier')}
                  window.location='/';


                })
                .catch(function (error) {
                  console.log(error);
            })
          });
        }}
        options={{
          clientId: "AXC8KfIpB3JYYXKXuKpAkz2Zpo6LS3v-14sfpShTt2wCr1dafhFkkkJJM6s5O9QeivSb20ekkYyQXdEw",
          currency: "EUR"
        }}
      />
    );


}

export default Paypal;
