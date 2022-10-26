import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { ModalFullRecordGuidance } from '../../../../ModalFullRecordGuidance';
import { AZUL } from '../../../../../styles/variaveis';
import {
  NavDropdown,
  NavDropdownButton,
  NavDropdownItem,
  TituloDropdown,
} from './style';
import Content from './style';
import { useAuth } from '../../../../../contexts/auth';
import { useRouter } from 'next/router';

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

export default function Dropdown({ titulo, itens }: IDropdown) {
  const [state, setState] = useState(true);
  //assigning location variable
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  function toggle() {
    setState(!state);
  }

  return (
    <Content open={state}>
      <TituloDropdown onClick={toggle}>
        {titulo} <FiChevronDown color={AZUL} />
      </TituloDropdown>
      <NavDropdown open={state}>
        {itens.map((item, index) => {
          if (item.isButton)
            return (
              <NavDropdownButton
                key={index}
                onClick={() => router.push(item.link)}
              >
                {item.descricao}
              </NavDropdownButton>
            );
          if (item.isShowCadastro)
            return (
              <NavDropdownButton key={index} onClick={() => setShowModal(true)}>
                {item.descricao}
              </NavDropdownButton>
            );
          else
            return (
              <NavDropdownItem key={index} href={item.link}>
                {item.descricao}
              </NavDropdownItem>
            );
        })}
        <ModalFullRecordGuidance
          showModal={showModal}
          setShowModal={setShowModal}
          id_usuario={user.id_usuario}
          tipo={'Consumidor'}
        />
      </NavDropdown>
    </Content>
  );
}
