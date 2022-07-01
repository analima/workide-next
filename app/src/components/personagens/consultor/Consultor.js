import React from 'react';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import HoverImage from "react-hover-image";

import consultor from '../../../images/Consultor.png';
import consultor1 from '../../../images/Consultor1.png';
import './Consultor.css';

function Consultor () {

    
    const renderTooltipConsultor = (props) => (
        <Tooltip className="tooltipConsultor" {...props}>
            <b>Consultor</b>
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
         <HoverImage src={consultor} hoverSrc={consultor1} className="imagem_consultor"  />
         </div>   
      </OverlayTrigger>
    </div>
    )
}

export default Consultor;    