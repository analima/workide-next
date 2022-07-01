import ScrollContainer from 'react-indiana-drag-scroll';
import  CoracaoOn from '../../assets/coracao.svg';
import  CoracaoOff from '../../assets/coracao-off.svg';
import EstrelaOff from '../../assets/estrela-off.svg';
import Estrela from '../../assets/estrela.svg';
import {
  Content,
  Body,
  Avaliacao,
  Medalhas,
  Footer,
  Info,
  FotoPerfil,
  Foto,
  AreasInteresse,
  Area,
  Favorito,
} from './style';
import { Titulo } from '../Titulo';
import { AZUL, CINZA_40, LARANJA } from '../../styles/variaveis';
import { Col, Row } from 'react-bootstrap';
import { Medalha } from '../Medalha';

export interface IVitrine {
  nome: string;
  imagem: string;
  avaliacao: number;
  estrelas: number;
  medalhas: string;
  ranking: number;
  projetos: number;
  profissao: string;
  areas_interesse: string[];
  favorito?: boolean;
  exibir_favorito?: boolean;
}

interface IDataVitrine {
  dataVitrine: IVitrine[];
}

export function VitrinePerfil({ dataVitrine }: IDataVitrine) {
  return (
    <Content>
      <ScrollContainer className="container">
        {dataVitrine.map((item, index) => (
          <div key={index}>
            <Body>
              <Info>
                <Titulo titulo={item.nome} tamanho={32} />

                <Avaliacao>
                  <span>{item.avaliacao}</span>
                  <Estrela />
                  <Estrela />
                  <Estrela />
                  <Estrela />
                  <EstrelaOff />
                </Avaliacao>

                <Medalhas>
                  <Medalha chave="pessoa-verificada" />
                  <Medalha chave="fundador" />
                  <Medalha chave="feedback" />
                  <Medalha chave="recomendacao-prata" />
                  <Medalha chave="indicacao-bronze" />
                </Medalhas>

                <p>Ranking: {item.ranking}</p>
                <p>Nº de projetos {item.projetos}</p>

                <Titulo titulo="FREELANCER" cor={AZUL} tamanho={24} />

                <Titulo titulo="Designer Gráfico" cor={CINZA_40} tamanho={24} />
              </Info>
              <FotoPerfil>
                <Foto src={item.imagem} alt={item.nome} />
              </FotoPerfil>
            </Body>
            <Footer>
              <Titulo titulo="Áreas de atuação" cor={LARANJA} tamanho={16} />

              <Row>
                <Col lg={10}>
                  <AreasInteresse>
                    {item.areas_interesse.map(item => (
                      <Area key={item}>{item}</Area>
                    ))}
                  </AreasInteresse>
                </Col>

                {item.exibir_favorito && (
                  <Col lg={2}>
                    <Favorito>
                      {item.favorito ? <CoracaoOn /> : <CoracaoOff />}
                    </Favorito>
                  </Col>
                )}
              </Row>
            </Footer>
          </div>
        ))}
      </ScrollContainer>
    </Content>
  );
}
