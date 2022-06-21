import { ContainerAntonio, Content, TextoNenhumProjeto } from './style';
import { Card } from '../../../../components/Card';
import Antonio  from '../../../../assets/antonio-full.svg';
import { LARANJA } from '../../../../styles/variaveis';
import { Titulo } from '../../../../components/Titulo';
import { Col, Row } from 'react-bootstrap';
import Image from 'next/image'

type ProjetoProps = {
  tipo: 'exclusivo' | 'normal';
};

export function NenhumProjeto({ tipo }: ProjetoProps) {
  return (
    <Content>
      <Card>
        <Row>
          <Col lg={8}>
            {tipo === 'exclusivo' ? (
              <TextoNenhumProjeto>
                <Titulo
                  titulo="Nesse momento você não tem projetos exclusivos"
                  tamanho={24}
                  cor={LARANJA}
                />
                <Titulo
                  titulo="Mas você ainda pode encontrar outros trabalhos precisando de suas
              habilidades."
                  tamanho={24}
                  cor={LARANJA}
                />
                <Titulo
                  titulo="Da uma olhada aqui em baixo e confira novas oportunidades!"
                  tamanho={24}
                  cor={LARANJA}
                />
              </TextoNenhumProjeto>
            ) : (
              <TextoNenhumProjeto>
                <Titulo
                  titulo="Parece que não encontramos o que você procura."
                  tamanho={24}
                  cor={LARANJA}
                />
                <Titulo
                  titulo="Por que não tenta usar o filtro?"
                  tamanho={24}
                  cor={LARANJA}
                />
              </TextoNenhumProjeto>
            )}
          </Col>
          <Col lg={4}>
            <ContainerAntonio>
              <Image src={Antonio} alt="" />
              
            </ContainerAntonio>
          </Col>
        </Row>
      </Card>
    </Content>
  );
}
