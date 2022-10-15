import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router';
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
  const history = useHistory();
  //assigning location variable
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const [pathname, setPathname] = useState<String>('');
  let splitLocation: String[] = [];

  //destructuring pathname from location
  if (router.query.pathname) {
    setPathname(router.query.pathname as String);
    splitLocation = pathname?.split('/');
  }

  //Javascript split method to get the name of the path in array

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
                className={splitLocation[1] === item.link ? 'ativo' : ''}
                onClick={() => history.push(item.link, item.props)}
              >
                {item.descricao}
              </NavDropdownButton>
            );
          if (item.isShowCadastro)
            return (
              <NavDropdownButton
                key={index}
                className={splitLocation[1] === item.link ? 'ativo' : ''}
                onClick={() => setShowModal(true)}
              >
                {item.descricao}
              </NavDropdownButton>
            );
          else
            return (
              <NavDropdownItem
                key={index}
                className={splitLocation[1] === item.link ? 'ativo' : ''}
                href={item.link}
              >
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
