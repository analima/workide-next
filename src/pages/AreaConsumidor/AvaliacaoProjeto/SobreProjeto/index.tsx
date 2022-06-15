import { Col, Row } from 'react-bootstrap';
import { Titulo } from '../../../../components/Titulo';
import { LARANJA, VERDE } from '../../../../styles/variaveis';
import { ReactComponent as EstrelaOff } from '../../../../assets/estrela-off.svg';
import { ReactComponent as Estrela } from '../../../../assets/estrela.svg';
import { AvaliacaoContainer, Content, LabelHabilidade } from './style';
import { TextArea } from '../../../../components/Form/TextArea';
import { useAvaliacaoProjetoConsumidor } from '../../../../hooks/avaliacaoProjetoConsumidor';
import { InputList } from '../../../../components/Form/InputList';
import { useEffect, useState } from 'react';
import { pessoas_api } from '../../../../services/pessoas_api';
import { oportunidades_api } from '../../../../services/oportunidades_api';

interface IProps {
  id: number;
  idProjeto: number;
}

export function SobreProjeto({ id, idProjeto }: IProps) {
  const {
    control,
    setValue,
    errors,
    nota,
    setNota,
    habilidades_percebidas,
    setHabilidades_percebidas,
    watch,
  } = useAvaliacaoProjetoConsumidor();

  const [habilidades, setHabilidades] = useState<string[]>([]);
  const [numeroEstrelas, setNumeroEstrelas] = useState<Array<number>>();
  const [habilidadesMock, setHabilidadesMock] = useState<Array<string>>(
    [] as Array<string>,
  );
  const [nomeForncedor, setNomeForncedor] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');

  useEffect(() => {
    watch((value: any) => {
      setDescricao(value.experiencia);
    });
  }, [watch, control._formValues.experiencia]);

  useEffect(() => {
    const loadName = async () => {
      const { data } = await pessoas_api.get(`/pessoas/${id}`);
      setNomeForncedor(data.nome_tratamento);
    };
    loadName();
    const loadSkills = async () => {
      const { data } = await oportunidades_api.get(`/projetos/${idProjeto}`);
      const arrayAuxHabilidadesComportamentais =
        data.habilidadesComportamentais;
      const arrayAuxHabilidadesTecnicas = data.habilidadesTecnicas;
      const arrayAllSkills = arrayAuxHabilidadesComportamentais
        ?.split('|')
        .concat(arrayAuxHabilidadesTecnicas.split('|'));
      setHabilidadesMock(arrayAllSkills);
    };
    loadSkills();
  }, [id, idProjeto]);

  useEffect(() => {
    const arrayAux = [];
    if (nota) {
      for (
        let quantidadeEstrelas = 1;
        quantidadeEstrelas <= 5;
        quantidadeEstrelas++
      ) {
        if (quantidadeEstrelas <= nota) arrayAux.push(1);
        else arrayAux.push(0);
      }
      setNumeroEstrelas(arrayAux);
    } else {
      const arrayAux = [];
      for (let estrelas = 1; estrelas <= 5; estrelas++) {
        arrayAux.push(0);
      }
      setNumeroEstrelas(arrayAux);
    }
  }, [nota]);

  const preencherEstrelas = (e: any, index: number) => {
    const arrayAux = [];
    for (
      let quantidadeEstrelas = 1;
      quantidadeEstrelas <= 5;
      quantidadeEstrelas++
    ) {
      if (quantidadeEstrelas <= index) arrayAux.push(1);
      else arrayAux.push(0);
    }
    setNumeroEstrelas(arrayAux);
    setNota(index);
  };

  const selecionaHabilidade = (habilidade: string) => {
    const habilidadesAtualizadas = habilidades.includes(habilidade)
      ? habilidades.filter(item => item !== habilidade)
      : [...habilidades, ...[habilidade]];

    setHabilidades(habilidadesAtualizadas);
    setHabilidades_percebidas(habilidadesAtualizadas);
  };

  return (
    <Content>
      <Row className="mt-3">
        <Col lg={12}>
          <Titulo titulo="Sobre o projeto" cor={VERDE} tamanho={24} />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col lg={12}>
          <span>
            Conte-nos um pouco mais como foi trabalhar com{' '}
            <strong>{nomeForncedor}</strong>
          </span>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col lg={12}>
          <span>Escolha de 1 a 5 para classificar</span>
        </Col>
        <Col lg={12}>
          <AvaliacaoContainer>
            {numeroEstrelas?.map((estrela, index) => {
              return estrela === 1 ? (
                <Estrela
                  key={index}
                  onClick={e => preencherEstrelas(e, index + 1)}
                />
              ) : (
                <EstrelaOff
                  key={index}
                  onClick={e => preencherEstrelas(e, index + 1)}
                />
              );
            })}
          </AvaliacaoContainer>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col lg={12}>
          <TextArea
            control={control}
            onChange={event => {
              setValue('experiencia', event.target.value);
            }}
            contador={false}
            name="experiencia"
            label="Você também pode deixar uma avaliação por escrito. Descreva como foi sua experiência"
          />
          <p>{descricao?.length}/30 e 1000 caracteres</p>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col lg={12}>
          <p>Quais dessas habilidades ele mandou bem?</p>
        </Col>
        <Col lg={12}>
          {habilidadesMock?.map(
            (habilidadeDescricao, index) =>
              habilidadeDescricao !== '' && (
                <LabelHabilidade
                  key={index}
                  onClick={() => selecionaHabilidade(habilidadeDescricao)}
                  checked={habilidades.includes(habilidadeDescricao)}
                >
                  <label>{habilidadeDescricao}</label>
                  <input
                    id={`habilidade_${index}`}
                    name={`habilidade_${index}`}
                    type="checkbox"
                  />
                </LabelHabilidade>
              ),
          )}
        </Col>
      </Row>

      <Row className="mt-5">
        <Col lg={12}>
          <InputList
            control={control}
            setValue={(event: any) => {
              let arrayAux: any = habilidades_percebidas
                ? habilidades_percebidas.concat(event)
                : [...event];
              setHabilidades_percebidas(arrayAux);
            }}
            name="habilidades"
            label="Percebeu outra habilidade? Se sim, liste aqui"
            color={LARANJA}
            items={[]}
            error={errors.habilidades && errors.habilidades.message}
          />
        </Col>
      </Row>
    </Content>
  );
}
