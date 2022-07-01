import React from 'react';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import HoverImage from "react-hover-image";

import coaching from '../../../images/Coaching.png';
import coaching1 from '../../../images/Coaching1.png';
import './Coaching.css';

function Coaching () {

    
    const renderTooltipConsultor = (props) => (
        <Tooltip className="tooltipConsultor" {...props}>
            <b>Coaching</b>
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
         <HoverImage src={coaching} hoverSrc={coaching1} className="imagem_coaching"  />
         </div>   
      </OverlayTrigger>
    </div>
    )
}

export default Coaching;    