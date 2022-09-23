import React, { useEffect, useState } from 'react';
import { PRETO_10 } from 'src/styles/variaveis';
import Layout from 'src/components/AreaFornecedor/Layout';
import { Titulo } from 'src/components/Titulo';
import {
  ButtonFilter,
  Container,
  Header,
  Wrapper,
  ContentFilter,
  Main,
  ContentCardExtrato,
  ContentEntendaMelhor,
  ContentButton,
} from './styles';
import { CardExtrato } from 'src/components/CardExtrato';
import { CardTotalExtrato } from 'src/components/CardTotalExtrato';
import { useRouter } from 'next/router';
import { Button } from 'src/components/Form/Button';
import { Select } from 'src/components/Form/Select';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { IExtratoProps } from 'src/interfaces/IExtratoProps';
import Paginacao from 'src/components/AreaFornecedor/MeusProjetos/Paginacao';
import { ID_TOKEN, useAuth } from 'src/contexts/auth';
import { consultas_api } from 'src/services/consultas_api';
import { InputDate } from 'src/components/Form/inputDate';

interface TypeProfileProps {
  type: string;
}

interface IDadosSelect {
  label: string;
  value: string;
}

export default function Extrato({ type }: TypeProfileProps) {
  const { user } = useAuth();
  const router = useRouter();
  const schema = Yup.object().shape({});
  const [dataSelect, setDataSelect] = useState<IDadosSelect[]>([]);
  const [extractData, setExtractData] = useState<IExtratoProps[]>([]);
  const [filterUser, setFilterUser] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [periodo, setPeriodo] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const { control, watch } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    async function load() {
      if (user.id_pessoa) {
        const newIdToken = localStorage.getItem(ID_TOKEN);

        if (newIdToken) {
          if (type === 'provider') {
            const { data } = await consultas_api.post<{
              values: IExtratoProps[];
              pages: number;
            }>(
              `/consulta/extrato/fornecedor/${user?.id_pessoa}?limit=10&page=${pagina}`,
              {
                idPessoaConsumidor: filterUser,
                periodo: periodo || 0,
              },
              {
                headers: {
                  Authorization: `Bearer ${newIdToken}`,
                },
              },
            );
            setTotalPaginas(data.pages);
            setExtractData(data.values);
          }

          if (type === 'consumer') {
            const { data } = await consultas_api.post<{
              values: IExtratoProps[];
              pages: number;
            }>(
              `/consulta/extrato/consumidor/${user?.id_pessoa}?limit=10&page=${pagina}`,
              {
                idPessoaFornecedor: filterUser,
                periodo: periodo || 0,
              },
              {
                headers: {
                  Authorization: `Bearer ${newIdToken}`,
                },
              },
            );
            setTotalPaginas(data.pages);
            setExtractData(data.values);
          }
        }
      }
    }
    load();
  }, [filterUser, pagina, periodo, router, type, user.id_pessoa]);

  useEffect(() => {
    if (extractData) {
      let dadosSelect: IDadosSelect[] = [];
      dadosSelect = extractData.map(item => ({
        value: String(item.idPessoaConsumidor),
        label: item.nomeConsumidor,
      }));

      const parsed_array = dadosSelect.map(val => {
        return JSON.stringify(val);
      });
      const filtered_array = parsed_array
        .filter((value, ind) => parsed_array.indexOf(value) == ind)
        .map(val => {
          return JSON.parse(val);
        });

      setDataSelect(filtered_array);
    }
  }, [extractData]);

  useEffect(() => {
    watch((value: any) => {
      if (value.user === 'Selecione...' || value.user === undefined)
        setFilterUser(0);
      setFilterUser(Number(value.user));
    });
  }, [watch, control._formValues.user]);

  useEffect(() => {
    watch((value: any) => {
      if (value.data === 'Selecione...' || value.data === undefined)
        setPeriodo(0);
      setPeriodo(Number(value.data));
    });
  }, [watch, control._formValues.data]);

  const dayFilter = [
    { value: '7', label: 'Últimos 7 dias' },
    { value: '15', label: 'Últimos 15 dias' },
    { value: '30', label: 'Últimos 30 dias' },
  ];

  return (
    <Container>
      <Header>
        <Titulo
          titulo="Extrato de repasses e pagamentos"
          cor={PRETO_10}
          negrito={false}
          tamanho={39}
        />
        <Titulo
          titulo="Acompanhe aqui a movimentação do seu dinheiro"
          cor={PRETO_10}
          tamanho={20}
        />
      </Header>
      <Wrapper>
        <ContentFilter>
          <Select
            control={control}
            name="user"
            options={dataSelect}
            label={type === 'consumer' ? 'Fornecedores' : 'Clientes'}
          />

          <div className="content-buttons-filters">
            <div className="buttons">
              <span>ver por: </span>

              <ButtonFilter active={false} onClick={() => console.log('click')}>
                Todos
              </ButtonFilter>
            </div>
            <Select
              control={control}
              name="data"
              className="input-date"
              options={dayFilter}
              label="Período"
            />
          </div>
        </ContentFilter>

        <Main>
          <ContentCardExtrato>
            {extractData.map((item: IExtratoProps) => (
              <CardExtrato type={type} key={item.id} item={item} />
            ))}
            <Paginacao
              pagina={pagina}
              setPagina={setPagina}
              totalPaginas={totalPaginas}
            />
          </ContentCardExtrato>

          <CardTotalExtrato dados={extractData} />

          {type === 'provider' && (
            <ContentEntendaMelhor>
              <span>Entenda melhor:</span>
              <p>
                Quando o cliente paga via cartão de crédito: Nessa forma de
                pagamento, pode levar até 30 dias para o pagamento ser
                processado. Por isso, as vezes, pode levar mais tempo para que o
                valor seja liberado para você. Pagamentos que estão “Aguardando
                conclusão”: Para estimarmos com mais precisão quando o valor
                será liberado, é necessário que o projeto seja primeiramente
                concluído. Por isso, não é possível informarmos uma data.
              </p>
            </ContentEntendaMelhor>
          )}

          <ContentButton>
            <Button color="ghost" label="VOLTAR" onClick={router.back} />
          </ContentButton>
        </Main>
      </Wrapper>
    </Container>
  );
}
