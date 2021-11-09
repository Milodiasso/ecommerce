function PanierContenu(props) {

  return (<div>
    {
      props.images.detail
        ? <div className="Panier">
            {
              props.images.detail.map((e, k) => (<div key={k} className="PanierContenu">
                <div className="enlever">
                  <button className="supprimer" onClick={() => (props.removeItems(e.id))}><img alt="supprimer" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABnklEQVRIie2Wu1LCUBCG/yMS1GRGiK9AR0lBywwNUAg4ZngOLw0vQOXlOSAzAhbAS1DS+QTOGCiScUyEtVBCMuZyEsEqf5dk9//OJrvnBEiU6L9FtXxGr5Q6pBSEyLlKQdArpQ7V8hm/mAPfRCvXB6hrLMRBkMGv3GIxrWtiD6CuYcpDKpePuMGGJt0wYuffTqjrptzjqZyUgqBnUyoDmj+3qkbq/YobLC4/7wgYbK4Z0AirfFMpAxrYJo5F4e3BK54FGmVTPQa0XEZp7YJNXj48YvuOSn1jQ8G88DjQUHAYHK+n6zhQLrAvHDQhBstuwghQbrA/3OXEDY0EdsBVV+cCAKOpmF40eaGAzzgF0ynSYv8MtruXOb6p/ZBVDUt+irLDcYG9RoaBJsToeRuEehR4KNhvTk+ERUtarC8JGMaB82wggXO68w0kiuHOtsw4RlFzvI/F7OGt04CAkZgzWoGvbjazJNloEzDargZ1wzy79or3PhZl/d7uWIaxJGhtps5NP6gNV+emtFwpjoabiqvjx7A8l/b965Mo0d70BayOCxm/1OYaAAAAAElFTkSuQmCC"/></button>
                </div>
                <div className="PanierContenuImage">
                  <img src={e.url} alt="ordinateur"/>
                </div>
                <div className="PanierContenuTitre">
                  {e.nomProduit}
                </div>
                <div className="PanierContenuPrix">
                  {e.prix}€
                </div>
                <div className="ajoutEnlever">
                  <div className="editionAjoutEnlever">
                    <div>
                      <button className="ajouter" onClick={() => (props.moreItem(e.id))}><img alt="ajouter" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAACyElEQVRIieWWy08TURSHvzPTaiLBpmCMrxCrcaXoBrtxU8JOLVhUNpqYqGsXuPCPMBDi2viIOysUW9AV1o2JRKKJj4WvokSjUbBpcCGPuccNHVo7Y1vAlb/VueeeOd+5cyZnLvxvknqCY9lYoKEQioqxImKZzQBqrG9A7mc4/+Rh+8PFNQUfHUocAHoRPQo0+YTNoDJq2U5fuiv9fFXgeCa+SRftfuAUYNVSJGAEbgVULqa6UzN1g48MJfaJaBqI1Aj8UzlV6RrtTr2sGbwEfQRsXCG0mLyA7RzKdGZeVQUnhhLNi6LjCrtXAy1K4YNZCEbv9yS/l/or+rYoOrBWUACBnYHgwmUP/7I673buN8Z65lVQqXY0bufEnuMA3Hk7yKfZz9X4xrJMW7or/azoKAMYx75YDQoQXh+mo6WdjpZ2wuvD1cIBLMdYF8ocRSOWjQUQPVJLlpVIIB7LxgIV4IZCKAo0/ysw0Nz4o6mtuHArEGNFEPV8Ykfj9rJXuisU8bQB8nN5/55bJgI8LgdbZquq9zw5sec4HS3tnnvnW8+Wrcemsgw8veIZa2CbW4PrVJ/jrqGkhLHcbNEvfie+83aQsakH7npXKOKe9OqLa+QKk+5efi7vT7aM2wMXbOCD3+D+NPvZt2+5wiQvpj3HcYXEsT+6NRSNDfPrxoHpmjKsTDOzTT8mKsDJnqQjMPrPsCrp0otCoHTPEe2zVE4D9t9y5OfyjE1lXbsGOQr9pY6KtsZTx24onKklWx26NpIYPlfqqJjL8wvBXuDdGkInJeBc+tPp+SHH0/G9OPYjhdBqiH+7CHj+iTKdmVeOShR4vQroez+oLxjgXnfqTVDlkMBNwNTBdFC5Pr8QjPpBlwqrrsPDXa2i0isQx/8PNq0wgkqf3wWvbnBRJ2+ftH/ZzkEsE0F0CwAqXx3RXMP8uolkT9KpJ9//pd92bf5hfpUDKgAAAABJRU5ErkJggg=="/></button>

                      <button className="ajouter" onClick={() => (props.lessItem(e.id))}><img alt="supprimer" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAACf0lEQVRIie2WTWtTQRSGnzM3BFObFmzVKghGRBG/kNpI1UVKBRELXXWl/0FoFy50qRuhxX+gortupNaF2mA30k9RsLYotn6AWKVR+xkJvXNcpGmT3IQmbbLSdzX3ncM8c4a5Zw78a5JigjUS8cWdpQaL7kNkR9LUHwaZCrgVI9Lfv1xS8EJT+DiGdqAF2JYnLAb0Ik5nZd/Am02B5yL1tcZxOoHLgClkk4AF7lvoqIoOx4oGzzWHDxjoAQ4WCMxeeNJabQ0+H3lbMHi+qeGwGHkBVG8EmqZZRU4Ho0Pj2ROe45s937jNOPKwBFCAakF75y+c2L4u2HHd26rsLwE0pZAk/LeyzYyjXmg+dQz0Va4NbVIWo/WVz0Zep4wsgHaUAZrkWHMl3VjNWCMR36KzNA3UlAEMENvqVtSlisxqdvNmMVxGKEBN3Bc/mfrwpQZGCOWKNoeOsOX6zaIIf25cw06MeXxrNQQMZoBRswtRT7D4/cjOuqLA4vfnmdDdqeHaRRLrpZZca5mtZSzyjRxoTSTQ79NFLa+JRG4f/eoBW6ufjHgrqJ0YY+lSa1HgfHLEfE6NV486WLN3CJgpCSG3YoHlwKgHLN3dLvC4bFjRnvRGIbNKidMJuGXAumq0K93IAK90Dg/KAL4XfDqa8WN76rLrc9pF+FBC6EfrulezTQ+4+snAT6vSCsyWAPpbxVys6n/pubQ5X6JgdGjcQhh4t1GiwKRaPRvsG5zINZ/3CayKDr+3cAbkLskGrlC5iN5Z9jnhfP3WysbW18K5xqOobQdtAWrzhM0g+kiNdmVfpA2DU9K2Nif+60uDtRrCkHw5LNNGzVSgds/oSi34r5z6C2v/0zks/gg+AAAAAElFTkSuQmCC"/></button>
                    </div>
                    <div className="nbrElement">{e.quantity}</div>
                  </div>
                </div>
              </div>))
            }
          </div>
        : <h1>Votre panier est vide 😱</h1>
    }
  </div>);
};

export default PanierContenu;
