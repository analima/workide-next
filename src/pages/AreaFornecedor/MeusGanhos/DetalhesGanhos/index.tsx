import { Col, Row } from 'react-bootstrap';
import { Card } from '../../../../components/Card';
import { Titulo } from '../../../../components/Titulo';
import { PRETO_10 } from '../../../../styles/variaveis';
import {
  Content,
  DetalhesGanhos,
  CardContent,
  NenhumRepasseEnviado,
} from './style';
import { pagamentos_api } from '../../../../services/pagamentos_api';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import { useAuth } from '../../../../contexts/auth';
import { Spacer } from '../../../../components/Spacer';
import { useState, useEffect } from 'react';
import { formatToPrice } from '../../../../helpers/formatsHelper';

interface IDadosRepasse {
  id_repasse: number;
  id_fatura_iugu: string;
  nm_status: string;
  id_pessoa_consum: number;
  id_pessoa_forn: number;
  dh_criacao: string;
  dh_ultima_atualizacao: string;
  dh_transf: string;
  vl_transf_cent: number;
  id_projeto: number;
  vl_servico_cent: number;
  nome: string;
  pessoaConsumidor: IDadosConsumidor;
  agencia: string;
  conta: string;
}

interface IDadosConsumidor {
  nomeTratamento: string;
  id: number;
}

export function DetalhesDosGanhos() {
  const { user } = useAuth();
  const [dados, setDados] = useState<Array<IDadosRepasse>>(
    [] as IDadosRepasse[],
  );
  const [repassesExecutados, setRepassesExecutados] = useState<
    Array<IDadosRepasse>
  >([] as IDadosRepasse[]);

  useEffect(() => {
    pagamentos_api
      .get(`/repasse/fornecedor/${user.id_pessoa}`)
      .then(({ data }) => {
        setDados(data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, [user?.id_pessoa]);

  useEffect(() => {
    try {
      let arrayAux: Array<IDadosRepasse> = [];
      dados
        ?.filter((obj: IDadosRepasse) => obj.nm_status === 'REPASSE_LIBERADO')
        .forEach(obj => {
          oportunidades_api
            .get(`/projetos/${obj?.id_projeto}`)
            .then(({ data }) => {
              obj = {
                ...obj,
                nome: data?.nome,
                pessoaConsumidor: data?.pessoaConsumidor,
              };
              arrayAux = [...arrayAux, obj];
              setRepassesExecutados(arrayAux);
            });
        });
    } catch (error: any) {}
  }, [dados]);

  useEffect(() => {
    repassesExecutados.forEach(obj => {
      let arrayAux: Array<IDadosRepasse> = [];

      pagamentos_api
        .get(`/subconta/${obj?.pessoaConsumidor?.id}`)
        .then(({ data }) => {
          obj = {
            ...obj,
            agencia: data?.agencia,
            conta: data?.conta,
          };
          arrayAux = [...arrayAux, obj];
          setRepassesExecutados(arrayAux);
        });
    });
  }, [dados, repassesExecutados]);

  return (
    <Content>
      <Card>
        <CardContent>
          <Titulo titulo="Detalhes" tamanho={24} />
          <Spacer size={20} />
          <Row className="d-flex">
            <Col lg={12}>
              {dados?.filter(
                (obj: IDadosRepasse) => obj.nm_status === 'REPASSE_LIBERADO',
              ).length > 0 ? (
                <>
                  <Titulo
                    titulo="Repasse enviado"
                    tamanho={18}
                    cor={PRETO_10}
                  />
                  {repassesExecutados?.map((obj: IDadosRepasse, index) => {
                    return (
                      <DetalhesGanhos key={index}>
                        <div className="detalhes-1">
                          <span>{obj?.nome}</span>
                          <span>{obj?.pessoaConsumidor?.nomeTratamento}</span>
                          <span>
                            C/C: {obj?.agencia}/{obj?.conta}
                          </span>
                        </div>
                        <div className="detalhes-2">
                          <span>
                            {formatToPrice(obj?.vl_servico_cent / 100)}
                          </span>
                          <span>Em: {obj?.dh_transf}</span>
                        </div>
                      </DetalhesGanhos>
                    );
                  })}
                </>
              ) : (
                <NenhumRepasseEnviado>
                  Ainda não foram enviados repasses.
                </NenhumRepasseEnviado>
              )}
            </Col>
          </Row>
        </CardContent>
      </Card>
    </Content>
  );
}
