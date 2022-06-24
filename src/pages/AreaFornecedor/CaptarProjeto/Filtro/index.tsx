import { Titulo } from '../../../../components/Titulo';
import { PRETO_60 } from '../../../../styles/variaveis';

import { CardFiltro, FiltroGroup, FiltroInputCheck } from './style';
import Content from './style';
import { Col, Row } from 'react-bootstrap';
import { Spacer } from '../../../../components/Spacer';

import { useCaptarProjetoFornecedor } from '../../../../hooks/captarProjetoFornecedor';
import { InputNumber } from '../../../../components/Form/InputNumber';
import { Subarea } from '../../../AreaConsumidor/Busca/Filtro/FiltroSubarea';
import FiltroSubarea from '../../../AreaConsumidor/Busca/Filtro/FiltroSubarea';
import { Dispatch, SetStateAction, useCallback } from 'react';
import FiltroHabilidades  from '../../../AreaConsumidor/Busca/Filtro/FiltroHabilidades';
import { InputCheck } from '../../../../components/Form/InputCheck';
import FiltroCausas from '../../../AreaConsumidor/Busca/Filtro/FiltroCausas';

interface IProp {
  filtroEnviado: boolean;
  setFiltroEnviado: Dispatch<SetStateAction<boolean>>;
}

export default function Filtro({ filtroEnviado, setFiltroEnviado }: IProp) {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    obterProjetos,
    avaliacao,
    setAvaliacao,
    escopo,
    setEscopo,
    setCausas,
  } = useCaptarProjetoFornecedor();
  const volutario = watch('toggle_volutarios');
  const nivelBasico = watch('nivel_basico');
  const nivelIntermediario = watch('nivel_intermediario');
  const nivelAvancado = watch('nivel_avancado');
  const nivelEspecialista = watch('nivel_especialista');

  const onSubmit = useCallback(() => {
    obterProjetos();
  }, [obterProjetos]);

  const handleChangeSubareas = useCallback(
    (selAreas: Subarea[]) => {
      setValue(
        'subareas',
        selAreas.map(sa => sa.descricao),
      );
      obterProjetos();
    },
    [obterProjetos, setValue],
  );

  const handleChangeHabilidades = useCallback(
    (selHabilidades: any[]) => {
      setValue(
        'habilidades',
        selHabilidades.map(sa => sa.habilidades),
      );
      obterProjetos();
    },
    [obterProjetos, setValue],
  );

  const handleChangeCausas = useCallback(
    (selCausas: any[]) => {
      setCausas(selCausas);
    },
    [setCausas],
  );

  return (
    <Content filtro={!filtroEnviado}>
      {volutario && (
        <CardFiltro>
          <Row>
            <Col lg={12}>
              <Titulo
                titulo="Causas sociais"
                cor={PRETO_60}
                tamanho={20}
                negrito
              />
              <FiltroCausas
                label=""
                control={control}
                onChange={handleChangeCausas}
              />
            </Col>
          </Row>
        </CardFiltro>
      )}

      <CardFiltro>
        <Row>
          <Col lg={12}>
            <Titulo
              titulo="Área do Projeto"
              cor={PRETO_60}
              tamanho={20}
              negrito
            />
            <FiltroSubarea
              control={control}
              onChange={handleChangeSubareas}
              page="captar"
            />
          </Col>
        </Row>
      </CardFiltro>

      <CardFiltro>
        <Row>
          <Col lg={12}>
            <Titulo titulo="Habilidades" cor={PRETO_60} tamanho={20} negrito />
            <FiltroHabilidades
              control={control}
              page="captar"
              onChange={handleChangeHabilidades}
            />
          </Col>
        </Row>
      </CardFiltro>

      <CardFiltro>
        <Row>
          <Col lg={12}>
            <Titulo
              titulo="Nível de experiência"
              cor={PRETO_60}
              negrito
              tamanho={20}
            />
          </Col>
        </Row>

        <Spacer size={24} />

        <Row>
          <Col lg={12}>
            <FiltroGroup>
              <FiltroInputCheck checked={nivelBasico}>
                <input
                  type="checkbox"
                  name="basico"
                  id="basico"
                  checked={nivelBasico}
                  onClick={handleSubmit(onSubmit)}
                  onChange={() => setValue('nivel_basico', !nivelBasico)}
                />
                <label htmlFor="basico">Iniciante</label>
              </FiltroInputCheck>
              <FiltroInputCheck checked={nivelIntermediario}>
                <input
                  type="checkbox"
                  name="intermediario"
                  id="intermediario"
                  checked={nivelIntermediario}
                  onClick={handleSubmit(onSubmit)}
                  onChange={() =>
                    setValue('nivel_intermediario', !nivelIntermediario)
                  }
                />
                <label htmlFor="intermediario">Intermediário</label>
              </FiltroInputCheck>
            </FiltroGroup>
            <FiltroGroup>
              <FiltroInputCheck checked={nivelAvancado}>
                <input
                  type="checkbox"
                  name="avancado"
                  id="avancado"
                  checked={nivelAvancado}
                  onClick={handleSubmit(onSubmit)}
                  onChange={() => setValue('nivel_avancado', !nivelAvancado)}
                />
                <label htmlFor="avancado">Avançado</label>
              </FiltroInputCheck>
              <FiltroInputCheck checked={nivelEspecialista}>
                <input
                  type="checkbox"
                  name="especialista"
                  id="especialista"
                  checked={nivelEspecialista}
                  onClick={handleSubmit(onSubmit)}
                  onChange={() =>
                    setValue('nivel_especialista', !nivelEspecialista)
                  }
                />
                <label htmlFor="especialista">Especialista</label>
              </FiltroInputCheck>
            </FiltroGroup>
          </Col>
        </Row>
      </CardFiltro>

      {!volutario && (
        <CardFiltro>
          <Row>
            <Col lg={12}>
              <Titulo
                titulo="Faixa de Preço"
                cor={PRETO_60}
                tamanho={20}
                negrito
              />
            </Col>
          </Row>

          <Row className="mt-2">
            <Col lg={6}>
              <InputNumber
                name="preco_minimo"
                control={control}
                placeholder="R$"
                label="De:"
                onBlur={handleSubmit(onSubmit)}
                onKeyUp={(e: any) => {
                  if (e.keyCode === 13) {
                    obterProjetos();
                  }
                }}

                // error={errors.nome_tratamento}
              />
            </Col>
            <Col lg={6}>
              <InputNumber
                name="preco_maximo"
                control={control}
                placeholder="R$"
                label="Até:"
                onBlur={handleSubmit(onSubmit)}
                onKeyUp={(e: any) => {
                  if (e.keyCode === 13) {
                    obterProjetos();
                  }
                }}
                // error={errors.nome_tratamento}
              />
            </Col>
          </Row>
        </CardFiltro>
      )}

      <CardFiltro>
        <Row>
          <Col lg={12}>
            <Titulo
              titulo="Avaliação do Cliente"
              cor={PRETO_60}
              negrito
              tamanho={20}
            />
          </Col>
        </Row>

        <Spacer size={24} />

        <Row>
          <Col lg={12}>
            <FiltroGroup>
              <FiltroInputCheck checked={avaliacao === 3}>
                <div>
                  <InputCheck
                    control={control}
                    name="avaliacao"
                    type="radio"
                    checked={avaliacao === 3}
                    onClick={() => {
                      setAvaliacao(3);
                      handleSubmit(onSubmit);
                    }}
                    label="3 estrelas"
                  />
                </div>
              </FiltroInputCheck>
              <FiltroInputCheck checked={avaliacao === 4}>
                <div>
                  <InputCheck
                    control={control}
                    name="avaliacao"
                    type="radio"
                    checked={avaliacao === 4}
                    onClick={() => {
                      setAvaliacao(4);
                      handleSubmit(onSubmit);
                    }}
                    label="4 estrelas"
                  />
                </div>
              </FiltroInputCheck>
            </FiltroGroup>
            <FiltroGroup>
              <FiltroInputCheck checked={avaliacao === 5}>
                <div>
                  <InputCheck
                    control={control}
                    name="avaliacao"
                    type="radio"
                    checked={avaliacao === 5}
                    onClick={() => {
                      setAvaliacao(5);
                      handleSubmit(onSubmit);
                    }}
                    label="5 estrelas"
                  />
                </div>
              </FiltroInputCheck>
              <FiltroInputCheck checked={avaliacao === 0}>
                <div>
                  <InputCheck
                    control={control}
                    name="avaliacao"
                    type="radio"
                    checked={avaliacao === 0}
                    onClick={() => {
                      setAvaliacao(0);
                      handleSubmit(onSubmit);
                    }}
                    label="Indiferente"
                  />
                </div>
              </FiltroInputCheck>
            </FiltroGroup>
          </Col>
        </Row>
      </CardFiltro>

      <CardFiltro>
        <Row>
          <Col lg={12}>
            <Titulo
              titulo="Tipo de escopo"
              cor={PRETO_60}
              negrito
              tamanho={20}
            />
          </Col>
        </Row>

        <Spacer size={24} />

        <Row>
          <Col lg={12}>
            <FiltroInputCheck checked={escopo === 'FECHADO'}>
              <InputCheck
                control={control}
                name="escopo"
                type="radio"
                checked={escopo === 'FECHADO'}
                onClick={() => {
                  setEscopo('FECHADO');
                  handleSubmit(onSubmit);
                }}
                label="Escopo Fechado"
              />
            </FiltroInputCheck>

            <FiltroInputCheck checked={escopo === 'ABERTO'}>
              <InputCheck
                control={control}
                name="escopo"
                type="radio"
                checked={escopo === 'ABERTO'}
                onClick={() => {
                  setEscopo('ABERTO');
                  handleSubmit(onSubmit);
                }}
                label="Escopo Aberto (por horas)"
              />
            </FiltroInputCheck>
          </Col>
        </Row>
      </CardFiltro>
    </Content>
  );
}
