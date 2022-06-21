import React from 'react';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import HoverImage from "react-hover-image";

import mentor from '../../../images/Mentor.png';
import mentor1 from '../../../images/Mentor1.png';
import './Mentor.css';

function Mentor () {

    
    const renderTooltipMentor = (props) => (
        <Tooltip className="tooltipMentor" {...props}>
            <b>Mentor</b>
            <br/>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dapibus ac tortor vitae feugiat. Cras id risus vitae sem ornare pretium. Etiam convallis nulla ac imperdiet vulputate. Nulla vestibulum sapien in magna convallis, sit amet pharetra nisl mattis. Duis laoreet lacus eget mauris tempus rutrum.</p>
        </Tooltip>
      );
    

    return (
      <div> 
      <OverlayTrigger placement="top-end" delay={{ show: 250, hide: 400 }} overlay={renderTooltipMentor} >
      <span></span>
      </OverlayTrigger>
      <OverlayTrigger placement="top-end" delay={{ show: 250, hide: 400 }} overlay={renderTooltipMentor} >
         <div> 
         <HoverImage src={mentor} hoverSrc={mentor1} className="imagem_mentor"  /> 
         </div>   
      </OverlayTrigger>
    </div>
    )
}

export default Mentor;    