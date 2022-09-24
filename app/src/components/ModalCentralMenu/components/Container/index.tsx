import { useHistory } from 'react-router-dom';
import { CardStyled } from './style';
import { Titulo } from '../../../../components/Titulo';

import { useAuth } from '../../../../contexts/auth';
import JourneyPath from '../../../../assets/running_white.png';
import TogetherImage from '../../../../assets/together_white.png';
import MyProjectsImage from '../../../../assets/journey_path_white.png';
import ToTeacherImage from '../../../../assets/to_teacher_white.png';
import BuildingTogetherImage from '../../../../assets/b-together_white.png';
import searchUsersImage from '../../../../assets/search-users_white.png';
import BeToBeImage from '../../../../assets/be_to_be_white.png';
import { pessoas_api } from '../../../../services/pessoas_api';
import { AZUL, LARANJA } from '../../../../styles/variaveis';
import Image from 'next/image';

type Props = {
  img: string;
  text?: string;
  typeCard?: string;
  link: string;
  onClick(): void;
};

export function Card({
  img,
  text,
  link,
  typeCard,
  onClick,
}: Props): JSX.Element {
  const history = useHistory();
  const { user, refreshUserData } = useAuth();

  function checkerColor(type: string | undefined) {
    return type === 'Fornecedor' ? LARANJA : AZUL;
  }

  function checkImage(nameImage: string) {
    switch (nameImage) {
      case 'together':
        return <Image src={TogetherImage} alt={nameImage} />;
      case 'myProjects':
        return <Image src={MyProjectsImage} alt={nameImage} />;
      case 'journeyPath':
        return <Image src={JourneyPath} alt={nameImage} />;
      case 'toTeacher':
        return <Image src={ToTeacherImage} alt={nameImage} />;
      case 'buildingTogether':
        return <Image src={BuildingTogetherImage} alt={nameImage} />;
      case 'searchUsers':
        return <Image src={searchUsersImage} alt={nameImage} />;
      case 'beTobe':
        return <Image src={BeToBeImage} alt={nameImage} />;
      default:
        <Image src={BeToBeImage} alt={nameImage} />;
    }
  }

  function handleChangeTypePeople(type: string | undefined, selected?: string) {
    if (type === 'Fornecedor' && img === 'myProjects') {
      let dataResponse = {
        tipoCadastro: 'FORNECEDOR',
      };
      pessoas_api
        .put(`pessoas/tipo-pessoa/${user.id_pessoa}`, dataResponse)
        .then(response => {
          if (!user.fornecedor) {
            refreshUserData().then(() => {
              history.push('/fornecedor/meus-projetos');
            });
          } else {
            history.push('/fornecedor/meus-projetos');
          }
        });
    } else if (type === 'Fornecedor' && img === 'together') {
      let dataResponse = {
        tipoCadastro: 'FORNECEDOR',
      };
      pessoas_api
        .put(`pessoas/tipo-pessoa/${user.id_pessoa}`, dataResponse)
        .then(response => {
          if (!user.fornecedor) {
            refreshUserData().then(() => {
              history.push('/fornecedor/captar-projetos?voluntario=true');
            });
          } else {
            history.push('/fornecedor/captar-projetos?voluntario=true');
          }
        });
    } else if (type === 'Fornecedor' && img === 'journeyPath') {
      let dataResponse = {
        tipoCadastro: 'FORNECEDOR',
      };
      pessoas_api
        .put(`pessoas/tipo-pessoa/${user.id_pessoa}`, dataResponse)
        .then(response => {
          if (!user.fornecedor) {
            refreshUserData().then(() => {
              history.push('/fornecedor/captar-projetos');
            });
          } else {
            history.push('/fornecedor/captar-projetos');
          }
        });
    }

    if (type === 'Consumidor') {
      let dataResponse = {
        tipoCadastro: 'CONSUMIDOR',
      };
      pessoas_api
        .put(`pessoas/tipo-pessoa/${user.id_pessoa}`, dataResponse)
        .then(response => {
          if (!user.consumidor) {
            refreshUserData().then(() => {
              if (img === 'beTobe')
                history.push('/consumidor/busca?oferta=true');
              if (img === 'searchUsers') history.push('/consumidor/busca');
              if (img === 'buildingTogether')
                history.push('/consumidor/busca?voluntario=true');
            });
          } else {
            if (img === 'beTobe') history.push('/consumidor/busca?oferta=true');
            if (img === 'searchUsers') history.push('/consumidor/busca');
            if (img === 'buildingTogether')
              history.push('/consumidor/busca?voluntario=true');
          }
        });
    }
    onClick();
  }

  return (
    <CardStyled
      href={link}
      isProvider={[typeCard].includes('Consumidor')}
      onClick={() => {
        handleChangeTypePeople(typeCard, img);
      }}
    >
      {checkImage(img)}
      <Titulo titulo={text} tamanho={24} cor={checkerColor(typeCard)} />
    </CardStyled>
  );
}
