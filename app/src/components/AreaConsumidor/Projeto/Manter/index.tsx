import { useState, useEffect } from 'react';
import { Card } from '../../../Card';
import { ButtonCancel } from './style';
import Content from './style';
import Layout from '../../Layout';
import { Titulo } from '../../../Titulo';
import { Spacer } from '../../../Spacer';
import { ModalExcludConfirmation } from '../../../ModalExcludConfirmation';
import { UserPanel } from '../../../UserPanel';
import { ProgressBar } from '../../../ProgessBar';

import { ProposalCard } from '../../../ProposalCard';
import { UserCard } from '../../../UserCard';
import { RequirementsList } from '../../../RequirementsList';
import { SearchProject } from '../../../SearchProject';
import { Helmet } from 'react-helmet';
import { hotjar } from 'react-hotjar';
import { IS_EMPTY } from 'src/const';

const Manter = (): JSX.Element => {
  const [showModalConfirmation, setShowModalConfirmation] =
    useState<boolean>(false);

  const handleProjects = () => {};
  const listItems = [
    'Requisito 01',
    'Requisito 02',
    'Requisito 03',
    'Requisito 04',
  ];
  useEffect(() => {''
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || IS_EMPTY,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/contratante/projeto/manter');
  }, []);

  return (
    <Content>
      <Helmet>
        <title>freelas town - Tela para debug</title>
      </Helmet>
      <Layout titulo="ESTA TELA É APENAS PARA DEBUG" activeMenu={true}>
        <Card>
          <Spacer size={20} />
          <Titulo titulo="UserPanel" tamanho={28} />
          <Spacer size={20} />
          <UserPanel
            image="https://www.petlove.com.br/images/breeds/194940/profile/original/bernese-p.jpg?1532380300"
            name="Gabriel Brune"
            text="Opa, consegue fazer num prazo menor? To precisando meio urgente"
            date="2021-11-28T15:15:00.000Z"
          />
          <Spacer size={20} />
          <Titulo titulo="ProgessBar" tamanho={28} />
          <Spacer size={20} />
          <ProgressBar
            percentage={70}
            date="2021-11-28T15:15:00.000Z"
            title="Progresso do Projeto"
          />
          <Spacer size={20} />
          <Titulo titulo="CardProjectDuplicate" tamanho={28} />
          <Spacer size={20} />
          {/* <CardProjectDuplicate
            nameProject="Nome do Projeto"
            hours="12:00"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra eu pulvinar mauris risus. Aliquam eget nunc ac natoque ac pharetra."
            arraySubArea={arraySubArea}
            handleClick={handlePublish}
          />  */}
          <Spacer size={20} />
          <Titulo titulo="ProposalCard" tamanho={28} />
          <Spacer size={20} />
          <ProposalCard
            // type="PF"
            portion={3}
            id_projeto={1}
            value={50}
            status="Recusado"
            // name="Gabriel Brune"
            id_fornecedor={1}
            id_proposta={1}
            date="2021-11-28T15:15:00.000Z"
            isProbono={false}
          />

          <Spacer size={20} />
          <Titulo titulo="UserCard" tamanho={28} />
          <Spacer size={20} />
          <UserCard
            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            ranking={1380}
            name="Gabriel Brune"
            ativo={true}
            image="https://www.petlove.com.br/images/breeds/194940/profile/original/bernese-p.jpg?1532380300"
          />
          <Spacer size={20} />
          <Titulo titulo="UserCard with ranking" tamanho={28} />
          <Spacer size={20} />
          <UserCard
            isProject
            amountProjects={47}
            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            isRanking
            ranking={1380}
            ativo={true}
            name="Gabriel Brune"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb_FVT8P_AjWhsmap6ZAhBb-E_7D0MgMWBnJ3S_rsrGkQP63J8FQkvy7VYoaSbF9lzTP0&usqp=CAU"
          />
          <Spacer size={20} />
          <Titulo titulo="UserCard with action" tamanho={28} />
          <Spacer size={20} />
          <UserCard
            isProject
            amountProjects={47}
            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            isRanking
            isAction
            ranking={1380}
            ativo={true}
            name="Gabriel Brune"
            image="http://jornalgazetadooeste.com.br/wp-content/uploads/2019/10/o-leao-e-conhecido-como-o-rei-dos-animais_362fc95c8f7188a27c2a0a6f70f15579948c2dfc.jpg"
          />
          <Spacer size={20} />
          <Titulo titulo="RequirementsList" tamanho={28} />
          <Spacer size={20} />
          <RequirementsList
            title="Pré requisitos para entrega"
            listItems={listItems}
          />

          <Spacer size={20} />
          <Titulo titulo="SearchProjects" tamanho={28} />
          <Spacer size={20} />
          <SearchProject
            handleEvent={handleProjects}
            textButton="Buscar em meus projetos"
            text="Deseja duplicar um projeto que você já publicou anteriormente?"
          />

          <Spacer size={20} />
          <Titulo titulo="Modais" tamanho={28} />
          <Spacer size={20} />

          <ButtonCancel
            onClick={() => {
              setShowModalConfirmation(!showModalConfirmation);
            }}
          >
            Confirmar exclusão
          </ButtonCancel>
          <Spacer size={24} />
        </Card>
      </Layout>
      {/* MODAIS */}
      <ModalExcludConfirmation
        showModal={showModalConfirmation}
        setShowModal={setShowModalConfirmation}
        id_usuario={1}
        title="Confirmar exclusão"
        text="Todas as proostas serão perdida. Tem certeza que deseja excluir ?"
      />
    </Content>
  );
};

export default Manter;
