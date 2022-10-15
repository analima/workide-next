import { useRouter } from 'next/router';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router';
import { ModalFullRecordGuidance } from 'src/components/ModalFullRecordGuidance';
import { useAuth } from 'src/contexts/auth';
import { LARANJA } from 'src/styles/variaveis';
import {
  Content,
  NavDropdown,
  NavDropdownButton,
  NavDropdownItem,
  TituloDropdown,
} from './style';

interface Item {
  link: string;
  descricao: string;
  isButton?: boolean;
  props?: any;
  isShowCadastro?: boolean;
  onClick?: boolean;
}

interface IDropdown {
  titulo: string;
  itens: Item[];
}

export function Dropdown({ titulo, itens }: IDropdown) {
  const [state, setState] = useState(true);
  const { user } = useAuth();

  const router = useRouter();
  //assigning location variable
  // const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split('/');

  function toggle() {
    setState(!state);
  }

  return (
    <Content open={state}>
      <TituloDropdown onClick={toggle}>
        {titulo} <FiChevronDown color={LARANJA} />
      </TituloDropdown>
      <NavDropdown open={state}>
        {itens.map((item, index) => {
          if (item.isButton) {
            return (
              <NavDropdownButton
                key={index}
                className={splitLocation[1] === item.link ? 'ativo' : ''}
                onClick={() => router.push(item.link)}
              >
                {item.descricao}
              </NavDropdownButton>
            );
          }

          if (item.onClick) {
            return (
              <NavDropdownButton
                key={index}
                className={splitLocation[1] === item.link ? 'ativo' : ''}
                onClick={() => setShowModal(true)}
              >
                {item.descricao}
              </NavDropdownButton>
            );
          }

          if (item.isShowCadastro) {
            return (
              <NavDropdownButton
                key={index}
                className={splitLocation[1] === item.link ? 'ativo' : ''}
                onClick={() => setShowModal(true)}
              >
                {item.descricao}
              </NavDropdownButton>
            );
          } else {
            return (
              <NavDropdownItem
                key={index}
                className={splitLocation[1] === item.link ? 'ativo' : ''}
                href={item.link}
              >
                {item.descricao}
              </NavDropdownItem>
            );
          }
        })}
        <ModalFullRecordGuidance
          showModal={showModal}
          setShowModal={setShowModal}
          id_usuario={user.id_usuario}
        />
      </NavDropdown>
    </Content>
  );
}
