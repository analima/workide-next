import React from 'react';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import HoverImage from "react-hover-image";

import freelancer from '../../../images/Freelancer.png';
import freelancer1 from '../../../images/Freelancer1.png';
import './Freelancer.css';

function Freelancer () {

    
    const renderTooltipConsultor = (props) => (
        <Tooltip className="tooltipConsultor" {...props}>
            <b>Freelancer</b>
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
         <HoverImage src={freelancer} hoverSrc={freelancer1} className="imagem_freelancer" />
         </div>   
      </OverlayTrigger>
    </div>
    )
}

export default Freelancer;    