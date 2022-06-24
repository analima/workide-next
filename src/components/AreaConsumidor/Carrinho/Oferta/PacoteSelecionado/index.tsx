import { Col, Row } from 'react-bootstrap';
import { Spacer } from '../../../../Spacer';
import { Titulo } from '../../../../Titulo';
import { AZUL, CINZA_40, VERDE } from '../../../../../styles/variaveis';
import {
  CardPacote,
  ContainerValor,
  PassoDescricao,
  ValorTotal,
} from './style';
import Content from './style';
import { useCarrinhoConsumidor } from '../../../../../hooks/carrinhoConsumidor';
import { ofertas_api } from '../../../../../services/ofertas_api';
import { useEffect, useState } from 'react';
import { IItens } from '../../../../../interfaces/IServicoInfo';
import { formatarValor } from '../../../../../utils/CurrencyFormat';
import { Skeleton } from '../../../../Skeleton';

export default function PacoteSelecionado() {
  const { pacote, servicoInfo } = useCarrinhoConsumidor();
  const [itens, setItens] = useState<IItens[]>([] as IItens[]);
  const [valorTaxa, setValorTaxa] = useState<number>(0);

  function handleGetTypeOfPackage(
    type: 'BASICO' | 'INTERMEDIARIO' | 'AVANCADO' | undefined,
  ) {
    const packageTypeStrategy = {
      BASICO: 'Básico',
      INTERMEDIARIO: 'Intermediário',
      AVANCADO: 'Avançado',
    };
    return type ? packageTypeStrategy[type] || 'Básico' : 'Básico';
  }

  useEffect(() => {
    (async function handleGetItens() {
      try {
        const response = await ofertas_api.get(`/servicos/${servicoInfo.id}`);
        if (response.data.itens?.length > 0) {
          response.data.itens.sort(function (a: any, b: any) {
            if (a.id > b.id) {
              return 1;
            }
            if (a.id < b.id) {
              return -1;
            }
            return 0;
          });
        }
        setItens(response.data.itens);
      } catch (error: any) {
        console.error(error.response);
      }
    })();
  }, [servicoInfo.id]);

  function handleGetindexOfpackageType():
    | 'intermediario'
    | 'basico'
    | 'avancado' {
    const index = pacote.tipo?.toLocaleLowerCase();
    if (index === 'intermediario') return index;
    if (index === 'basico') return index;
    if (index === 'avancado') return index;
    return 'basico';
  }

  useEffect(() => {
    const fee = Number(pacote.preco) / (1 - 0.12) - Number(pacote.preco);
    fee > 14 ? setValorTaxa(fee) : setValorTaxa(14);
  }, [pacote]);

  return (
    <Content>
      <Row>
        <Col lg={12}>
          <Titulo
            titulo="Pacote selecionado"
            tamanho={32}
            cor={AZUL}
            negrito={false}
          />
        </Col>
      </Row>

      <Spacer size={24} />

      <CardPacote>
        <Row>
          <Col lg={12}>
            <Titulo
              titulo={handleGetTypeOfPackage(pacote.tipo)}
              tamanho={32}
              cor={CINZA_40}
              negrito={false}
            />
          </Col>
        </Row>

        <Spacer size={36} />

        {itens
          .filter(item => item[handleGetindexOfpackageType()])
          .map((item, index) => {
            return (
              <Row key={item.id}>
                <Col lg={2}>
                  <Titulo
                    titulo={`Passo ${index + 1}`}
                    tamanho={24}
                    cor={CINZA_40}
                  />
                </Col>
                <Col lg={10}>
                  <PassoDescricao>{item.descricao}</PassoDescricao>
                </Col>
              </Row>
            );
          })}

        <ContainerValor>
          <div>
            <Titulo
              titulo={`Este serviço será entregue em ${pacote.prazo} ${
                Number(pacote.prazo) > 1 ? 'dias' : 'dia'
              }`}
              tamanho={24}
              cor={VERDE}
            />
            <p>
              Esse prazo é uma estimativa a partir da primeira reunião
              obrigatório e da entrega dos requisitos
            </p>
          </div>

          <ValorTotal>
            {valorTaxa ? (
              <p>{formatarValor(Number(pacote.preco) + valorTaxa)}</p>
            ) : (
              <Skeleton width="170px" height="50px" />
            )}
            <span>em até {pacote.parcelas}x no cartão</span>
          </ValorTotal>
        </ContainerValor>
      </CardPacote>
    </Content>
  );
}
