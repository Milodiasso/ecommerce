import React from 'react';
import {Zoom} from "react-slideshow-image";

const Caroussel = (props) => {
  const zoomInProperties = {
    indicators: false,
    scale: 1.4,
    transitionDuration: 1000,
    arrows: false
  }

  return (<div className="Bandeau">
    <div className="Bandeau-container">
      <Zoom {...zoomInProperties}>
        {
          props.images.map((each, index) => (<div key={index} className="promotion">
            <img key={index} style={{
                width: "auto",
                height: '300px'
              }} src={each.b_url} alt={index}/>
            <span className='promo'>
              -{each.u_promotion}
              %</span>
          </div>))
        }
      </Zoom>
      <div className="Bandeau-text">{props.titre}</div>
    </div>
  </div >)
}

export default Caroussel;
