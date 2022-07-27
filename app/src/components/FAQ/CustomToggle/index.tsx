import { useContext, useEffect, useState } from 'react';
import { AccordionContext, useAccordionToggle } from 'react-bootstrap';
import { IFaqPost } from '../../../interfaces/IFaq';
import { ContainerHeader, PostFaqCardHeader } from './style';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

export const CustomToggle = ({
  post,
  eventKey,
}: {
  post: IFaqPost;
  eventKey: string;
}) => {
  const [sizePage, setSizePage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleResize = (e: any) => {
    setSizePage(window.innerWidth);
  };

  useEffect(() => {
    setSizePage(window.innerWidth);
    window.addEventListener('resize', handleResize);
  }, []);
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(eventKey);

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <PostFaqCardHeader onClick={decoratedOnClick}>
      <ContainerHeader onClick={() => setIsModalOpen(!isModalOpen)}>
        <span>{post.titulo}</span>
        {sizePage <= 578 &&
          (!isModalOpen ? (
            <MdKeyboardArrowDown size={20} />
          ) : (
            <MdKeyboardArrowUp size={20} />
          ))}
      </ContainerHeader>
      {!isCurrentEventKey && sizePage > 578 && <p>{post.conteudo}</p>}
    </PostFaqCardHeader>
  );
};
