import React from 'react';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import HoverImage from "react-hover-image";

import especialista from '../../../images/Especialista.png';
import especialista1 from '../../../images/Especialista1.png';
import './Especialista.css';

function Especialista () {

    
    const renderTooltipConsultor = (props) => (
        <Tooltip className="tooltipConsultor" {...props}>
            <b>Especialista</b>
            <br/>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dapibus ac tortor vitae feugiat. Cras id risus vitae sem ornare pretium. Etiam convallis nulla ac imperdiet vulputate. Nulla vestibulum sapien in magna convallis, sit amet pharetra nisl mattis. Duis laoreet lacus eget mauris tempus rutrum.</p>
        </Tooltip>
      );
    

    return (
      <div> 
      <OverlayTrigger placement="top-end" delay={{ show: 250, hide: 400 }} overlay={renderTooltipConsultor} >
      <span></span>
      </OverlayTrigger>
      <OverlayTrigger placement="top-end" delay={{ show: 250, hide: 400 }} overlay={renderTooltipConsultor} >
         <div> 
         <HoverImage src={especialista} hoverSrc={especialista1} className="imagem_especialista" />
         </div>   
      </OverlayTrigger>
    </div>
    )
}

export default Especialista;    