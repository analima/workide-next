import React, { useEffect, useState } from 'react';
import { AZUL, PRETO_10 } from 'src/styles/variaveis';
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
import { SemConteudo } from 'src/components/SemConteudo';
// import { FaRegCalendarAlt } from 'react-icons/fa';

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
  const [extractData, setExtractData] = useState<IExtratoProps[]>([]);
  const [filterUser, setFilterUser] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [periodo, setPeriodo] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [filter, setFilter] = useState('todos');
  const [dadosUserFilter, setDadosUserFilter] = useState<IDadosSelect[]>([]);
  const { control, watch } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    async function load() {
      if (user.id_pessoa) {
        if (type === 'provider') {
          const { data } = await consultas_api.post<{
            values: IExtratoProps[];
            pages: number;
          }>(
            `/consulta/extrato/fornecedor/${user?.id_pessoa}?limit=10&page=${pagina}`,
            {
              idPessoaConsumidor: filterUser || 0,
              periodo: periodo || 0,
              statusPagamento: filter === 'todos' ? undefined : filter,
            },
          );
          setTotalPaginas(data.pages);
          setExtractData(data.values);

          let dadosSelect: IDadosSelect[] = [];
          dadosSelect = data.values.map(item => ({
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

          setDadosUserFilter(filtered_array);
        }

        if (type === 'consumer') {
          const { data } = await consultas_api.post<{
            values: IExtratoProps[];
            pages: number;
          }>(
            `/consulta/extrato/contratante/${user?.id_pessoa}?limit=10&page=${pagina}`,
            {
              idPessoaFornecedor: filterUser || 0,
              periodo: periodo || 0,
              statusPagamento: filter === 'todos' ? undefined : filter,
            },
          );
          setTotalPaginas(data.pages);
          setExtractData(data.values);

          let dadosSelect: IDadosSelect[] = [];
          dadosSelect = data.values.map(item => ({
            value: String(item.idPessoaFornecedor),
            label: item.nomeFornecedor,
          }));

          const parsed_array = dadosSelect.map(val => {
            return JSON.stringify(val);
          });
          const filtered_array = parsed_array
            .filter((value, ind) => parsed_array.indexOf(value) == ind)
            .map(val => {
              return JSON.parse(val);
            });

          setDadosUserFilter(filtered_array);
        }
      }
    }
    load();
  }, [filter, filterUser, pagina, periodo, router, type, user.id_pessoa]);

  useEffect(() => {
    setTimeout(() => {}, 2000);
  }, []);

  useEffect(() => {
    watch((value: any) => {
      if (value.user === 'Selecione...' || value.user === undefined)
        setFilterUser(0);
      setFilterUser(Number(value.user));
    });
  }, [watch, control._formValues.user]);

  useEffect(() => {
    watch((value: any) => {
      if (
        value.data === 'Selecione...' ||
        value.data === undefined ||
        value.data === NaN
      )
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
            noValueOption="Todos"
            options={dadosUserFilter}
            label={type === 'consumer' ? 'Fornecedores' : 'Clientes'}
          />

          <div className="content-buttons-filters">
            <div className="buttons">
              <span>ver por: </span>

              <ButtonFilter
                active={filter === 'todos'}
                onClick={() => setFilter('todos')}
              >
                Todos
              </ButtonFilter>

              <ButtonFilter
                active={filter === 'previsto'}
                onClick={() => setFilter('previsto')}
              >
                Com previsão
              </ButtonFilter>

              <ButtonFilter
                active={filter === 'recebido'}
                onClick={() => setFilter('recebido')}
              >
                Recebido
              </ButtonFilter>

              <ButtonFilter
                onClick={() => setFilter('cancelado')}
                active={filter === 'cancelado'}
              >
                Cancelado
              </ButtonFilter>
            </div>

            <div className="calendar">
              {/* <FaRegCalendarAlt color={AZUL} size={24} /> */}
              <Select
                control={control}
                noValueOption="Todos"
                name="data"
                className="input-date"
                options={dayFilter}
                label="Período"
              />
            </div>
          </div>
        </ContentFilter>

        <Main>
          {extractData.length > 0 ? (
            <>
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

              <CardTotalExtrato
                dados={extractData}
                type={type}
                periodo={periodo}
              />

              {type === 'provider' && (
                <ContentEntendaMelhor>
                  <span>Entenda melhor:</span>
                  <p>
                    Quando o cliente paga via <strong>cartão de crédito</strong>: Nessa forma de
                    pagamento, pode levar até 30 dias para o pagamento ser
                    processado. Por isso, as vezes, pode levar mais tempo para
                    que o valor seja liberado para você. Pagamentos que estão
                    “Aguardando conclusão”: Para estimarmos com mais precisão
                    quando o valor será liberado, é necessário que o projeto
                    seja primeiramente concluído. Por isso, não é possível
                    informarmos uma data.
                  </p>
                </ContentEntendaMelhor>
              )}
            </>
          ) : (
            <SemConteudo mensagem="Você ainda não possui itens." />
          )}

          <ContentButton>
            <Button color="ghost" label="VOLTAR" onClick={router.back} />
          </ContentButton>
        </Main>
      </Wrapper>
    </Container>
  );
}
