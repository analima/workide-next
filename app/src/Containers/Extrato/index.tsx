import { useCallback, useEffect, useState } from 'react';
import { hotjar } from 'react-hotjar';
import { Col, Row } from 'react-bootstrap';
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
import { useAuth } from 'src/contexts/auth';
import { IPessoa } from 'src/interfaces/IPessoa';

interface TypeProfileProps {
  type: string;
}

export default function Extrato({ type }: TypeProfileProps) {
  const router = useRouter();
  const schema = Yup.object().shape({});

  let { user } = useAuth();

  console.log(user);
  const { control, getValues, watch } = useForm({
    resolver: yupResolver(schema),
  });
  const mesAno = [
    { value: 'fulano', label: 'Fulano 1' },
    { value: 'fulano2', label: 'Fulano 2' },
    { value: 'fulano3', label: 'Fulano 3' },
    { value: 'fulano4', label: 'Fulano 4' },
    { value: 'fulano5', label: 'Fulano 5' },
  ];

  useEffect(() => {
    watch((value: any) => {
      console.log(value);
    });
  }, [watch, control._formValues.inicio]);

  useEffect(() => {
    const aa = getValues('inicio');
    console.log(aa);
  }, [getValues, control._formValues.inicio]);

  return (
    <Layout>
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
              name="inicio"
              options={mesAno}
              noValueOption="Todos"
              label={type === 'consumer' ? 'Fornecedores' : 'Clientes'}
            />
            <div className="content-buttons-filters">
              <span>ver por: </span>

              <ButtonFilter active={false} onClick={() => console.log('click')}>
                Todos
              </ButtonFilter>
            </div>
          </ContentFilter>

          <Main>
            <ContentCardExtrato>
              <CardExtrato />
              <CardExtrato />
              <CardExtrato />
              <CardExtrato />
            </ContentCardExtrato>

            <CardTotalExtrato />

            {type === 'provider' && (
              <ContentEntendaMelhor>
                <span>Entenda melhor:</span>
                <p>
                  Quando o cliente paga via cartão de crédito: Nessa forma de
                  pagamento, pode levar até 30 dias para o pagamento ser
                  processado. Por isso, as vezes, pode levar mais tempo para que
                  o valor seja liberado para você. Pagamentos que estão
                  “Aguardando conclusão”: Para estimarmos com mais precisão
                  quando o valor será liberado, é necessário que o projeto seja
                  primeiramente concluído. Por isso, não é possível informarmos
                  uma data.
                </p>
              </ContentEntendaMelhor>
            )}

            <ContentButton>
              <Button color="ghost" label="VOLTAR" onClick={router.back} />
            </ContentButton>
          </Main>
        </Wrapper>
      </Container>
    </Layout>
  );
}
