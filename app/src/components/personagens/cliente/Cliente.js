import React from 'react';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import HoverImage from "react-hover-image";

import cliente from '../../../images/Cliente.png';
import cliente1 from '../../../images/Cliente1.png';
import './Cliente.css';

function Cliente () {

    
    const renderTooltipConsultor = (props) => (
        <Tooltip className="tooltipCliente" id="tooltipCliente"   {...props}>
            <b>Cliente</b>
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
         <HoverImage src={cliente} hoverSrc={cliente1} className="imagem_cliente" />
         </div>   
      </OverlayTrigger>
    </div>
    )
}

export default Cliente;    