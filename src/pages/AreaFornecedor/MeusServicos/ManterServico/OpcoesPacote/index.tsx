import { range } from 'lodash';
import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from 'react-bootstrap';
import { FiInfo, FiX } from 'react-icons/fi';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../../../../contexts/auth';

import { ofertas_api } from '../../../../../services/ofertas_api';
import { InputTag } from '../../../../../components/Form/InputTag';
import { Card } from '../../../../../components/Card';
import { Foto } from '../../../../../components/Foto';
import { InputText } from '../../../../../components/Form/InputText';
import { InputCheck } from '../../../../../components/Form/InputCheck';
import { Spacer } from '../../../../../components/Spacer';
import { TextArea } from '../../../../../components/Form/TextArea';
import { Titulo } from '../../../../../components/Titulo';
import { ToggleSwitch } from '../../../../../components/Form/ToggleSwitch';
import { AZUL, PRETO_10 } from '../../../../../styles/variaveis';

import {
  FotoServico,
  GhostButton,
  Button,
  ValueMax,
  AjudaCalculadora,
  ContentInfoPrice,
} from './style';
import Content from './style';
import { useCadastroServico } from '../../../../../hooks/cadastroServico';
import { IoMdHelpCircle } from 'react-icons/io';
import { InputNumber } from '../../../../../components/Form/InputNumber';
import { InputMoney } from '../../../../../components/Form/InputMoney';
import { Subarea } from '../FiltroSubarea';
import FiltroSubarea from '../FiltroSubarea';
import { TagInput } from '../../../../../components/TagInput';
import { useHistory } from 'react-router';
import { formatToPrice } from '../../../../../helpers/formatsHelper';
import { useLimitacoesPlanos } from '../../../../../contexts/planLimitations';
import { ModalCalculadora } from '../../../../../components/ModalCalculadora';

interface IOpcoesPacoteProps {
  continuar: () => void;
}

interface IPacote {
  id: number;
  tipo: string;
}

interface IItem {
  id?: number;
  descricao: string;
  basico: boolean;
  intermediario: boolean;
  avancado: boolean;
}

const schema = Yup.object().shape({
  nome: Yup.string()
    .required('Nome é obrigatório')
    .min(5, 'Nome deve conter no mínimo 5 caracteres')
    .max(30, 'Nome deve conter no máximo 30 caracteres'),
  descricao: Yup.string()
    .min(10, 'Descrição deve conter no mínimo 10 caracteres')
    .max(1000, 'Descrição deve conter no máximo 1000 caracteres')
    .required('Descrição é obrigatória'),
  // termo_autoria: Yup.boolean().required('Termo de autoria é obrigatório'),
  url_apresentacao: Yup.string().matches(
    /^$|https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g,
    'Link deve ser uma URL válida',
  ),
  // primeira_reuniao_obrigatoria: Yup.boolean().required(
  //   'Informação da primeira reunião é obrigatória',
  // ),
  nome_pacote_basico: Yup.string()
    .min(5, 'Nome do pacote deve conter no mínimo 5 caracteres')
    .max(30, 'Nome do pacote deve conter no máximo 30 caracteres')
    .required('Nome é obrigatório'),
  descricao_pacote_basico: Yup.string()
    .min(10, 'Descrição deve conter no mínimo 10 caracteres')
    .max(150, 'Descrição deve conter no máximo 150 caracteres')
    .required('Descrição é obrigatória'),
  prazo_pacote_basico: Yup.string().required('Prazo é obrigatório'),
  tempo_pacote_basico: Yup.string().required('Tempo de trabalho é obrigatório'),
  item_servico_0_descricao: Yup.string().required(
    'É necessário informar ao menos 1 item',
  ),
  preco_pacote_basico: Yup.string()
    .test(
      'valor-minimo',
      'O preço mínimo é de R$ 30,00',
      function (value: any) {
        return parseInt(value) >= 30 ? true : false;
      },
    )
    .test(
      'valor-máximo',
      'O preço máximo é de R$ 10.000,00',
      function (value: any) {
        return parseInt(value) <= 10000 ? true : false;
      },
    )
    .required('Preço é obrigatório'),
  // oferecer_3_pacotes: Yup.boolean().required('Opção de ofertas é obrigatória'),
  nome_pacote_intermediario: Yup.string()
    .min(5, 'Nome do pacote deve conter no mínimo 5 caracteres')
    .max(30, 'Nome do pacote deve conter no máximo 30 caracteres')
    .nullable()
    .when('oferecer_3_pacotes', {
      is: true,
      then: Yup.string().required('Nome é obrigatório'),
    })
    .max(100, 'Nome deve conter no máximo 100 caracteres'),
  descricao_pacote_intermediario: Yup.string()
    .min(10, 'Descrição deve conter no mínimo 10 caracteres')
    .max(150, 'Descrição deve conter no máximo 150 caracteres')
    .nullable()
    .when('oferecer_3_pacotes', {
      is: true,
      then: Yup.string().required('Descrição é obrigatória'),
    })
    .max(1000, 'Nome deve conter no máximo 1000 caracteres'),
  prazo_pacote_intermediario: Yup.string()
    .nullable()
    .when('oferecer_3_pacotes', {
      is: true,
      then: Yup.string().required('Prazo é obrigatório'),
    }),
  tempo_pacote_intermediario: Yup.string()
    .nullable()
    .when('oferecer_3_pacotes', {
      is: true,
      then: Yup.string().required('Tempo de trabalho é obrigatório'),
    }),
  preco_pacote_intermediario: Yup.string()
    .nullable()
    .when('oferecer_3_pacotes', {
      is: true,
      then: Yup.string()
        .test(
          'valor-minimo',
          'O preço mínimo é deR$ 30,00',
          function (value: any) {
            return parseInt(value) >= 30 ? true : false;
          },
        )
        .test(
          'valor-máximo',
          'O preço máximo é de R$ 10.000,00',
          function (value: any) {
            return parseInt(value) <= 10000 ? true : false;
          },
        )
        .required('Preço é obrigatório'),
    }),
  nome_pacote_avancado: Yup.string()
    .min(5, 'Nome do pacote deve conter no mínimo 5 caracteres')
    .max(30, 'Nome do pacote deve conter no máximo 30 caracteres')
    .nullable()
    .when('oferecer_3_pacotes', {
      is: true,
      then: Yup.string().required('Nome é obrigatório'),
    })
    .max(100, 'Nome deve conter no máximo 100 caracteres'),
  descricao_pacote_avancado: Yup.string()
    .min(10, 'Descrição deve conter no mínimo 10 caracteres')
    .max(150, 'Descrição deve conter no máximo 150 caracteres')
    .nullable()
    .when('oferecer_3_pacotes', {
      is: true,
      then: Yup.string().required('Descrição é obrigatória'),
    })
    .max(1000, 'Nome deve conter no máximo 1000 caracteres'),
  prazo_pacote_avancado: Yup.string()
    .nullable()
    .when('oferecer_3_pacotes', {
      is: true,
      then: Yup.string().required('Prazo é obrigatório'),
    }),
  tempo_pacote_avancado: Yup.string()
    .nullable()
    .when('oferecer_3_pacotes', {
      is: true,
      then: Yup.string().required('Tempo de trabalho é obrigatório'),
    }),
  preco_pacote_avancado: Yup.string()
    .nullable()
    .when('oferecer_3_pacotes', {
      is: true,
      then: Yup.string()
        .test(
          'valor-minimo',
          'O preço mínimo é de R$ 30,00',
          function (value: any) {
            return parseInt(value) >= 30 ? true : false;
          },
        )
        .test(
          'valor-máximo',
          'O preço máximo é de R$ 10.000,00',
          function (value: any) {
            return parseInt(value) <= 10000 ? true : false;
          },
        )
        .required('Preço é obrigatório'),
    }),
});

export default function OpcoesPacote({ continuar }: IOpcoesPacoteProps) {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  const [fotoId, setFotoId] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');
  const [idPacoteBasico, setIdPacoteBasico] = useState<number>();
  const [idPacoteIntermediario, setIdPacoteIntermediario] = useState<number>();
  const [idPacoteAvancado, setIdPacoteAvancado] = useState<number>();
  const [fullServicos, setFullServicos] = useState(false);
  const [itemServico, setItemServico] = useState(1);
  const [erro, setErro] = useState('');
  const [valorPacoteBasico, setValorPacoteBasico] = useState(0);
  const [valorPacoteIntermediario, setValorPacoteIntermediario] = useState(0);
  const [valorPacoteAvancado, setValorPacoteAvancado] = useState(0);
  const [habilidadesTecnicas, setHabilidadesTecnicas] = useState<string[]>([]);
  const [taxaFornecedor, setTaxaFornecedor] = useState(12);
  const { limitacoesPlano, buscarLimitacoes } = useLimitacoesPlanos();
  const [showTaxaAdminPacoteBasico, setShowTaxaAdminPacoteBasico] =
    useState(false);
  const [
    showTaxaAdminPacoteIntermediario,
    setShowTaxaAdminPacoteIntermediario,
  ] = useState(false);
  const [showTaxaAdminPacoteAvancado, setShowTaxaAdminPacoteAvancado] =
    useState(false);
  const { user } = useAuth();
  const [taxaPacoteBasico, setTaxaPacoteBasico] = useState(0);
  const [taxaPacoteIntermediario, setTaxaPacoteIntermediario] = useState(0);
  const [taxaPacoteAvancado, setTaxaPacoteAvancado] = useState(0);
  const [showModalCalculadora, setShowModalCalculadora] = useState(false);

  /**Filtro busca subarea */
  const [idsSubareas, setIdsSubareas] = useState<number[]>([]);
  const [, setSelectedSubareas] = useState<Subarea[]>([]);
  const [subareasInitialValue, setSubareasInitialValue] = useState<Subarea[]>(
    [],
  );
  const [errorSubArea, setErrorSubArea] = useState(false);
  const handleChangeSubareas = useCallback((selSubareas: Subarea[]) => {
    setIdsSubareas(selSubareas.map(sa => sa.id));
  }, []);
  const history = useHistory();
  /**Fim Filtro busca subarea */

  const setOutrasSubareas = (value: string) => {
    reset({
      ...control._formValues,
      outras_subareas: value,
    });
  };

  const mensagemAdicaoOferta = `
  Informações básicas*
  Vamos começar criando a sua oferta dando um nome.
  Aqui você irá resumir em poucas palavras o que você está ofertando.
  Coloque uma foto ou uma imagem relacionada ao serviço ofertado
  e depois o descreva em detalhes.*
  Link de apresentação*
  Nesse campo você pode inserir um link de apresentação.
  Ele deve ser um vídeo anunciando a sua oferta com mais detalhes!
  A ideia é que o cliente possa saber um pouco mais sobre você e seu trabalho.
  `;

  const mensagemTresPacotes = `
  Aqui nessa mesma oferta você pode criar um ou três pacotes (versões)
  diferentes, oferecendo quantidades, preços e prazos diferentes para cada um deles.*
  Por exemplo: Se você trabalha com vídeos, no seu plano básico você pode oferecer edição de 3 vídeos de até 10 minutos. No seu plano intermediário você pode oferecer a edição de 10 vídeos de até 15 minutos. E no plano avançado, os  mesmos serviços dos outros planos mais a produção de vinheta.*
  Claro que, conforme seu trabalho muda, os preços também podem ser alterados.*
  E é aqui que você configura tudo isso. Eai, mão na massa?
  `;

  const mensagemNome = `
  Dê um nome para cada pacote do seu serviço.
  Aqui é importante ser um nome único para cada pacote,
  para que seu cliente possa perceber claramente qual a
  diferença entre um pacote e outro, e não venha a confundi-los.
  `;

  const mensagemDescricao = `
  Descreva em poucas palavras o diferencial de cada pacote,
  o serviço a ser executado e por que o seu cliente deve comprá-lo.
  Neste momento, não se preocupe com os métodos e os requisitos.
  Temos uma sessão específica para eles.
  `;

  const mensagemPrazo = `
  Informe o prazo em dias que você vai levar para executar cada pacote.
  Lembrando que quanto mais itens você promete entregar, maior deve ser seu prazo.
  `;

  const handleGetProviderFee = useCallback(() => {
    setTaxaFornecedor(Number(limitacoesPlano.taxaAdministracao));
  }, [limitacoesPlano.taxaAdministracao]);

  const { idServico, setIdServico, mostrarDicaAntonio, subareaOutras } =
    useCadastroServico();

  const loadServico = useCallback(async () => {
    buscarLimitacoes();
    const response = await ofertas_api.get(`/servicos/${idServico}`);
    const { data } = response;

    const pacoteBasico = data.pacotes?.find(
      (pacote: IPacote) => pacote.tipo === 'BASICO',
    );
    const pacoteIntermediario = data.pacotes?.find(
      (pacote: IPacote) => pacote.tipo === 'INTERMEDIARIO',
    );
    const pacoteAvancado = data.pacotes?.find(
      (pacote: IPacote) => pacote.tipo === 'AVANCADO',
    );

    let formData = {
      nome: data.nome,
      descricao: data.descricao,
      termo_autoria: data.termo_autoria,
      url_apresentacao: data.url_apresentacao ? data.url_apresentacao : '',
      primeira_reuniao_obrigatoria: data.primeira_reuniao_obrigatoria || false,
      id_arquivo: data.arquivo?.id,
      url_arquivo: data.arquivo?.url,
      oferecer_3_pacotes: fullServicos,
      nome_pacote_basico: pacoteBasico?.nome,
      descricao_pacote_basico: pacoteBasico?.descricao,
      prazo_pacote_basico: pacoteBasico?.prazo,
      tempo_pacote_basico: pacoteBasico?.tempo,
      preco_pacote_basico: pacoteBasico?.preco,
      parcelas_pacote_basico: pacoteBasico?.parcelas || 1,
      nome_pacote_intermediario: pacoteIntermediario?.nome,
      descricao_pacote_intermediario: pacoteIntermediario?.descricao,
      prazo_pacote_intermediario: pacoteIntermediario?.prazo,
      tempo_pacote_intermediario: pacoteIntermediario?.tempo,
      preco_pacote_intermediario: pacoteIntermediario?.preco,
      parcelas_pacote_intermediario: pacoteIntermediario?.parcelas || 1,
      nome_pacote_avancado: pacoteAvancado?.nome,
      descricao_pacote_avancado: pacoteAvancado?.descricao,
      prazo_pacote_avancado: pacoteAvancado?.prazo,
      tempo_pacote_avancado: pacoteAvancado?.tempo,
      preco_pacote_avancado: pacoteAvancado?.preco,
      parcelas_pacote_avancado: pacoteAvancado?.parcelas || 1,
    };

    setHabilidadesTecnicas(
      data.habilidades_tecnicas && data.habilidades_tecnicas.indexOf('|') !== -1
        ? data.habilidades_tecnicas.split('|')
        : [data.habilidades_tecnicas],
    );

    if (data.itens?.length > 0) {
      data.itens.sort(function (a: any, b: any) {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
        return 0;
      });

      setItemServico(data.itens.length);
      data.itens?.forEach((itemRetornado: any, index: number) => {
        formData = {
          ...formData,
          [`item_servico_${index}_descricao`]: itemRetornado.descricao,
          [`item_servico_${index}_basico`]: itemRetornado.basico || false,
          [`item_servico_${index}_intermediario`]:
            itemRetornado.intermediario || false,
          [`item_servico_${index}_avancado`]: itemRetornado.avancado || false,
        };
      });
    }

    if (data.pacotes?.length > 0) {
      const pacoteBasico = data.pacotes.find(
        (pacote: IPacote) => pacote.tipo === 'BASICO',
      );

      if (pacoteBasico) {
        setIdPacoteBasico(pacoteBasico.id);
      }
    }

    if (data.pacotes?.length > 1) {
      setFullServicos(true);
      formData = { ...formData, oferecer_3_pacotes: true };

      const pacoteIntermediario = data.pacotes.find(
        (pacote: IPacote) => pacote.tipo === 'INTERMEDIARIO',
      );

      if (pacoteIntermediario) {
        setIdPacoteIntermediario(pacoteIntermediario.id);
      }

      const pacoteAvancado = data.pacotes.find(
        (pacote: IPacote) => pacote.tipo === 'AVANCADO',
      );

      if (pacoteAvancado) {
        setIdPacoteAvancado(pacoteAvancado.id);
      }
    }

    if (data.subareas?.length > 0) {
      setSubareasInitialValue(
        data.subareas.map((sa: Subarea) => ({
          ...sa,
          selected: true,
        })),
      );
      setSelectedSubareas(data.subareas);
      setIdsSubareas(data.subareas.map((sa: Subarea) => sa.id));
    }

    reset(formData);
    setFotoId(data.arquivo?.id);
    setFotoUrl(data.arquivo?.url);
  }, [buscarLimitacoes, idServico, fullServicos, reset]);

  useEffect(() => {
    if (idServico) {
      loadServico();
      handleGetProviderFee();
    }
  }, [handleGetProviderFee, idServico, loadServico]);

  const handleSalvarServico = useCallback(
    async (formData: any) => {
      setErro('');
      try {
        const {
          nome,
          descricao,
          termo_autoria,
          url_apresentacao,
          primeira_reuniao_obrigatoria,
          nome_pacote_basico,
          descricao_pacote_basico,
          prazo_pacote_basico,
          tempo_pacote_basico,
          preco_pacote_basico,
          parcelas_pacote_basico,
          oferecer_3_pacotes,
          nome_pacote_intermediario,
          descricao_pacote_intermediario,
          prazo_pacote_intermediario,
          tempo_pacote_intermediario,
          preco_pacote_intermediario,
          parcelas_pacote_intermediario,
          nome_pacote_avancado,
          descricao_pacote_avancado,
          prazo_pacote_avancado,
          tempo_pacote_avancado,
          preco_pacote_avancado,
          parcelas_pacote_avancado,
          ...rest
        } = formData;

        const pacotes = [];

        const pacoteBasico = {
          id: idPacoteBasico,
          tipo: 'BASICO',
          nome: nome_pacote_basico,
          descricao: descricao_pacote_basico,
          prazo: prazo_pacote_basico,
          tempo: tempo_pacote_basico,
          preco: parseFloat(preco_pacote_basico),
          parcelas: parcelas_pacote_basico || 1,
          taxa: taxaPacoteBasico,
        };

        pacotes.push(pacoteBasico);

        if (oferecer_3_pacotes) {
          const pacoteIntermediario = {
            id: idPacoteIntermediario,
            tipo: 'INTERMEDIARIO',
            nome: nome_pacote_intermediario,
            descricao: descricao_pacote_intermediario,
            prazo: prazo_pacote_intermediario,
            tempo: tempo_pacote_intermediario,
            preco: parseFloat(preco_pacote_intermediario),
            parcelas: parcelas_pacote_intermediario || 1,
            taxa: taxaPacoteIntermediario,
          };

          pacotes.push(pacoteIntermediario);

          const pacoteAvancado = {
            id: idPacoteAvancado,
            tipo: 'AVANCADO',
            nome: nome_pacote_avancado,
            descricao: descricao_pacote_avancado,
            prazo: prazo_pacote_avancado,
            tempo: tempo_pacote_avancado,
            preco: parseFloat(preco_pacote_avancado),
            parcelas: parcelas_pacote_avancado || 1,
            taxa: taxaPacoteAvancado,
          };

          pacotes.push(pacoteAvancado);
        }

        const itens: IItem[] = [];

        for (let index = 0; index < itemServico; index++) {
          const chave_descricao = `item_servico_${index}_descricao`;
          const chave_basico = `item_servico_${index}_basico`;
          const chave_intermediario = `item_servico_${index}_intermediario`;
          const chave_avancado = `item_servico_${index}_avancado`;

          let item = {
            descricao: rest[chave_descricao],
            basico: rest[chave_basico] || false,
            intermediario: false,
            avancado: false,
          };

          if (oferecer_3_pacotes) {
            item = Object.assign(item, {
              intermediario: rest[chave_intermediario] || false,
              avancado: rest[chave_avancado] || false,
            });
          }

          itens.push(item);
        }

        const itemDescricaoVazia = itens.find(
          item => !item.descricao || item.descricao.trim() === '',
        );

        const itemNoCheck = itens.find(
          item => !item.avancado && !item.basico && !item.intermediario,
        );

        if (itemDescricaoVazia) {
          setErro('Não é permitida a inclusão de itens com descrição vazia');
          window.scroll(0, 0);
          return;
        }

        if (itemNoCheck) {
          setErro('O check é obrigatório para pelo menos um dos pacotes. ');
          window.scroll(0, 0);
          return;
        }

        if (!fotoId) {
          setErro('Foto da oferta é obrigatória');
          window.scroll(0, 0);
          return;
        }

        if (habilidadesTecnicas.length === 0) {
          setErro('Habilidades técnicas são obrigatórias!');
          window.scroll(0, 0);
          return;
        }

        if (idServico) {
          let request = {
            nome,
            descricao,
            id_arquivo: fotoId,
            url_apresentacao: url_apresentacao || undefined,
            primeira_reuniao_obrigatoria,
            // termo_autoria: true,
            pacotes,
            itens,
            habilidades_tecnicas: habilidadesTecnicas,
            ids_subareas: idsSubareas,
          };

          await ofertas_api.put(`/servicos/${idServico}`, request);
          continuar();
        } else {
          let request = {
            nome,
            descricao,
            id_arquivo: fotoId,
            url_apresentacao: url_apresentacao || undefined,
            primeira_reuniao_obrigatoria,
            termo_autoria: true,
            pacotes,
            itens,
            ids_subareas: idsSubareas,
            areas_atuacao: [],
            habilidades_tecnicas: habilidadesTecnicas,
          };
          try {
            const { data } = await ofertas_api.post(`/servicos`, request);
            setIdServico(data.id);
            continuar();
          } catch (error: any) {
            console.error(error.response);
          }
        }
      } catch (error: any) {
        const { data } = error.response;
        console.error(error.response);
        if (data.status === 'error' && data.message) {
          setErro(data.message);
        }
      }
    },
    [
      idPacoteBasico,
      taxaPacoteBasico,
      fotoId,
      habilidadesTecnicas,
      idServico,
      idPacoteIntermediario,
      taxaPacoteIntermediario,
      idPacoteAvancado,
      taxaPacoteAvancado,
      itemServico,
      idsSubareas,
      continuar,
      setIdServico,
    ],
  );

  useEffect(() => {
    watch(value => {
      if (!value.preco_pacote_basico) setShowTaxaAdminPacoteBasico(false);
      else {
        setValorPacoteBasico(
          Number(value.preco_pacote_basico.replace(',', '.')),
        );
        setShowTaxaAdminPacoteBasico(true);
      }

      if (!value.preco_pacote_intermediario)
        setShowTaxaAdminPacoteIntermediario(false);
      else {
        setValorPacoteIntermediario(
          Number(value.preco_pacote_intermediario.replace(',', '.')),
        );
        setShowTaxaAdminPacoteIntermediario(true);
      }

      if (!value.preco_pacote_avancado) setShowTaxaAdminPacoteAvancado(false);
      else {
        setValorPacoteAvancado(
          Number(value.preco_pacote_avancado.replace(',', '.')),
        );
        setShowTaxaAdminPacoteAvancado(true);
      }
    });
  }, [watch]);

  useEffect(() => {
    watch(value => {
      const valorTaxaBasico =
        value.preco_pacote_basico / (1 - 0.12) - value.preco_pacote_basico;
      setTaxaPacoteBasico(valorTaxaBasico >= 14 ? valorTaxaBasico : 14);
      if (value.oferecer_3_pacotes) {
        if (value.preco_pacote_intermediario) {
          const valorTxaIntermediario =
            value.preco_pacote_intermediario / (1 - 0.12) -
            value.preco_pacote_intermediario;
          setTaxaPacoteIntermediario(
            valorTxaIntermediario >= 14 ? valorTxaIntermediario : 14,
          );
        }
        if (value.preco_pacote_avancado) {
          const valorTxaAvancado =
            value.preco_pacote_avancado / (1 - 0.12) -
            value.preco_pacote_avancado;
          setTaxaPacoteAvancado(valorTxaAvancado >= 14 ? valorTxaAvancado : 14);
        }
      }
    });
  }, [
    watch,
    control._formValues.preco_pacote_baisco,
    user.plano,
    getValues,
    taxaFornecedor,
  ]);

  return (
    <Content>
      <Titulo titulo="Informações básicas" cor={PRETO_10} />
      <Spacer size={32} />
      <Row>
        <Col lg={12}>{erro && <Alert variant="danger">{erro}</Alert>}</Col>
      </Row>
      <Spacer size={32} />
      <Card>
        <Container className="p-3">
          <Row>
            <Col className="d-flex justify-content-end">
              <IoMdHelpCircle
                color={AZUL}
                size={24}
                onClick={() => mostrarDicaAntonio(mensagemAdicaoOferta)}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={3}>
              <FotoServico>
                <Foto
                  id="foto-servico"
                  idFoto={fotoId}
                  urlFoto={fotoUrl}
                  setterId={setFotoId}
                  setterUrl={setFotoUrl}
                />
              </FotoServico>
            </Col>

            <Col lg={9}>
              <Row>
                <Col lg={6} className="mb-3">
                  <InputText
                    control={control}
                    label="Nome da oferta"
                    name="nome"
                    placeholder="Obrigatório"
                    error={errors.nome && errors.nome.message}
                    maxLength={100}
                  />
                </Col>
                <Col lg={6} className="mb-3">
                  <FiltroSubarea
                    control={control}
                    onChange={handleChangeSubareas}
                    initialValue={subareasInitialValue}
                    label="Selecione uma subárea de atuação"
                    setter={setSelectedSubareas}
                  />
                  {errorSubArea && (
                    <span className="help-block">Adicione uma sub-area</span>
                  )}
                </Col>
              </Row>

              {subareaOutras && (
                <Row>
                  <Col lg={6} className="mb-3">
                    <TagInput
                      name="outras_subareas"
                      label="Outras subareas de atuação"
                      value={control._formValues.outras_subareas}
                      setter={setOutrasSubareas}
                      className="primary"
                      error={
                        errors.outras_subareas && errors.outras_subareas.message
                      }
                    />
                  </Col>
                </Row>
              )}

              <Row>
                <Col lg={6} className="mb-3">
                  <TextArea
                    control={control}
                    label="Descrição da oferta"
                    name="descricao"
                    placeholder="Obrigatório"
                    error={errors.descricao && errors.descricao.message}
                    maxLength={1000}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col lg={6} className="mb-3">
              <InputText
                control={control}
                label="Link de apresentação"
                name="url_apresentacao"
                placeholder="https://www.example.com.br"
                error={
                  errors.url_apresentacao &&
                  errors.url_apresentacao?.message?.includes('string')
                    ? 'URL inválida.'
                    : errors.url_apresentacao?.message
                }
              />
            </Col>
          </Row>

          <Row>
            <Col lg={6} className="mb-3">
              <ToggleSwitch
                control={control}
                name="primeira_reuniao_obrigatoria"
                label="Sugere reunião de alinhamento"
                error={
                  errors.primeira_reuniao_obrigatoria &&
                  errors.primeira_reuniao_obrigatoria.message
                }
              />
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <InputTag
                name="habilidades_tecnicas"
                label="Selecione suas habilidades técnicas para esse projeto"
                value={control._formValues.habilidades_tecnicas}
                setter={(event: any) => {
                  setHabilidadesTecnicas(event.split('|'));
                }}
                habilidades={habilidadesTecnicas}
                validate={true}
              />
            </Col>
          </Row>
        </Container>
      </Card>

      <Spacer size={64} />

      <Titulo titulo="Sobre pacotes e preços" cor={PRETO_10} />

      <Spacer size={32} />

      <Card padding="32px 0px">
        <Container>
          <Row>
            <Col lg={4} className="mb-4">
              <ToggleSwitch
                control={control}
                name="oferecer_3_pacotes"
                label="Oferecer 3 pacotes para essa oferta."
                change={() => setFullServicos(!fullServicos)}
                error={
                  errors.oferecer_3_pacotes && errors.oferecer_3_pacotes.message
                }
              />
            </Col>
            <Col lg={1} className="mb-4">
              <IoMdHelpCircle
                color={AZUL}
                size={24}
                onClick={() => mostrarDicaAntonio(mensagemTresPacotes)}
              />
            </Col>

            <Col lg={12}>
              <Table responsive>
                <tbody>
                  <tr>
                    <td></td>
                    <td className="label-pacote">Opções de Pacote</td>
                    <td className="label-pacote azul">Básico</td>

                    {fullServicos && (
                      <>
                        <td className="label-pacote verde todos-servicos">
                          Intermediário
                        </td>
                        <td className="label-pacote laranja todos-servicos">
                          Avançado
                        </td>
                      </>
                    )}
                  </tr>
                  <tr>
                    <td>
                      <IoMdHelpCircle
                        color={AZUL}
                        size={24}
                        onClick={() => mostrarDicaAntonio(mensagemNome)}
                      />
                    </td>
                    <td className="label-pacote">Nome</td>
                    <td>
                      <InputText
                        control={control}
                        name="nome_pacote_basico"
                        placeholder="Obrigatório"
                        error={
                          errors.nome_pacote_basico &&
                          errors.nome_pacote_basico.message
                        }
                        maxLength={100}
                      />
                    </td>

                    {fullServicos && (
                      <>
                        <td>
                          <InputText
                            control={control}
                            name="nome_pacote_intermediario"
                            placeholder="Obrigatório"
                            error={
                              errors.nome_pacote_intermediario &&
                              errors.nome_pacote_intermediario.message
                            }
                            maxLength={100}
                          />
                        </td>
                        <td>
                          <InputText
                            control={control}
                            name="nome_pacote_avancado"
                            placeholder="Obrigatório"
                            error={
                              errors.nome_pacote_avancado &&
                              errors.nome_pacote_avancado.message
                            }
                            maxLength={100}
                          />
                        </td>
                      </>
                    )}
                  </tr>

                  <tr>
                    <td>
                      <IoMdHelpCircle
                        color={AZUL}
                        size={24}
                        onClick={() => mostrarDicaAntonio(mensagemDescricao)}
                      />
                    </td>
                    <td className="label-pacote">Descrição</td>
                    <td>
                      <TextArea
                        control={control}
                        name="descricao_pacote_basico"
                        placeholder="Obrigatório"
                        error={
                          errors.descricao_pacote_basico &&
                          errors.descricao_pacote_basico.message
                        }
                        maxLength={150}
                      />
                    </td>

                    {fullServicos && (
                      <>
                        <td>
                          <TextArea
                            control={control}
                            name="descricao_pacote_intermediario"
                            placeholder="Obrigatório"
                            error={
                              errors.descricao_pacote_intermediario &&
                              errors.descricao_pacote_intermediario.message
                            }
                            maxLength={150}
                          />
                        </td>
                        <td>
                          <TextArea
                            control={control}
                            name="descricao_pacote_avancado"
                            placeholder="Obrigatório"
                            error={
                              errors.descricao_pacote_avancado &&
                              errors.descricao_pacote_avancado.message
                            }
                            maxLength={150}
                          />
                        </td>
                      </>
                    )}
                  </tr>

                  <tr>
                    <td>
                      <IoMdHelpCircle
                        color={AZUL}
                        size={24}
                        onClick={() => mostrarDicaAntonio(mensagemPrazo)}
                      />
                    </td>
                    <td className="label-pacote">Prazo</td>
                    <td>
                      <InputNumber
                        control={control}
                        name="prazo_pacote_basico"
                        placeholder="Em dias"
                        maxLength={4}
                        error={
                          errors.prazo_pacote_basico &&
                          errors.prazo_pacote_basico.message
                        }
                      />
                    </td>

                    {fullServicos && (
                      <>
                        <td>
                          <InputNumber
                            control={control}
                            name="prazo_pacote_intermediario"
                            placeholder="Em dias"
                            maxLength={4}
                            error={
                              errors.prazo_pacote_intermediario &&
                              errors.prazo_pacote_intermediario.message
                            }
                          />
                        </td>

                        <td>
                          <InputNumber
                            control={control}
                            name="prazo_pacote_avancado"
                            placeholder="Em dias"
                            maxLength={4}
                            error={
                              errors.prazo_pacote_avancado &&
                              errors.prazo_pacote_avancado.message
                            }
                          />
                        </td>
                      </>
                    )}
                  </tr>

                  <tr>
                    <td></td>
                    <td className="label-pacote">
                      Tempo de trabalho
                      <span className="m-1">
                        <OverlayTrigger
                          key="right"
                          placement="right"
                          overlay={
                            <Tooltip id={`tooltip-right`}>
                              Essa informação não será visível para o consumidor
                            </Tooltip>
                          }
                        >
                          <FiInfo />
                        </OverlayTrigger>
                      </span>
                    </td>
                    <td>
                      <InputNumber
                        control={control}
                        name="tempo_pacote_basico"
                        placeholder="Em horas"
                        maxLength={4}
                        error={
                          errors.tempo_pacote_basico &&
                          errors.tempo_pacote_basico.message
                        }
                      />
                    </td>

                    {fullServicos && (
                      <>
                        <td>
                          <InputNumber
                            control={control}
                            name="tempo_pacote_intermediario"
                            placeholder="Em horas"
                            maxLength={4}
                            error={
                              errors.tempo_pacote_intermediario &&
                              errors.tempo_pacote_intermediario.message
                            }
                          />
                        </td>
                        <td>
                          <InputNumber
                            control={control}
                            name="tempo_pacote_avancado"
                            placeholder="Em horas"
                            maxLength={4}
                            error={
                              errors.tempo_pacote_avancado &&
                              errors.tempo_pacote_avancado.message
                            }
                          />
                        </td>
                      </>
                    )}
                  </tr>

                  <tr>
                    <td></td>
                    <td className="text--only-padding-top td--no-border">
                      <label className="label-metodo">
                        Métodos de entrega/Entregáveis
                      </label>
                    </td>
                    <td className="td--no-border"></td>
                  </tr>

                  {range(0, itemServico).map((item, index) => (
                    <tr key={item}>
                      <td></td>
                      <td className="td-item">
                        <InputText
                          control={control}
                          name={`item_servico_${index}_descricao`}
                          placeholder={`Item ${item + 1} da oferta`}
                          error={
                            errors[`item_servico_${index}_descricao`] &&
                            errors[`item_servico_${index}_descricao`]['message']
                          }
                          maxLength={100}
                        />
                        <FiX
                          color={AZUL}
                          onClick={() => setItemServico(itemServico - 1)}
                        />
                      </td>
                      <td>
                        <InputCheck
                          control={control}
                          name={`item_servico_${index}_basico`}
                        />
                      </td>

                      {fullServicos && (
                        <>
                          <td className="text-center">
                            <InputCheck
                              control={control}
                              name={`item_servico_${index}_intermediario`}
                            />
                          </td>
                          <td className="text-center">
                            <InputCheck
                              control={control}
                              name={`item_servico_${index}_avancado`}
                            />
                          </td>
                        </>
                      )}
                    </tr>
                  ))}

                  <tr>
                    <td></td>
                    <td>
                      <GhostButton
                        onClick={() => setItemServico(itemServico + 1)}
                      >
                        MAIS ITENS
                      </GhostButton>
                    </td>
                  </tr>

                  <tr>
                    <td></td>
                    <td className="label-pacote">
                      <ContentInfoPrice>
                        <span>Preço</span>
                        <AjudaCalculadora
                          onClick={() => setShowModalCalculadora(true)}
                        >
                          Precisa de ajuda para calcular?
                        </AjudaCalculadora>
                      </ContentInfoPrice>
                    </td>
                    <td>
                      <InputMoney
                        control={control}
                        name="preco_pacote_basico"
                        maxValue={8000}
                        placeholder="R$"
                        error={
                          errors.preco_pacote_basico &&
                          errors.preco_pacote_basico.message
                        }
                      />
                      <ValueMax>Valor máximo: R$ 8.000,00</ValueMax>
                      {showTaxaAdminPacoteBasico && (
                        <>
                          <div className="container-taxa-admin">
                            <span>Taxa Admin</span>
                            <span>{formatToPrice(taxaPacoteBasico || 0)}</span>
                          </div>
                          <div className="container-valor-total">
                            <span>Total</span>
                            <span>
                              {formatToPrice(
                                valorPacoteBasico + taxaPacoteBasico || 0,
                              )}
                            </span>
                          </div>
                        </>
                      )}
                    </td>

                    {fullServicos && (
                      <>
                        <td>
                          <InputMoney
                            control={control}
                            name="preco_pacote_intermediario"
                            placeholder="R$"
                            maxValue={8000}
                            error={
                              errors.preco_pacote_intermediario &&
                              errors.preco_pacote_intermediario.message
                            }
                          />
                          <ValueMax>Valor máximo: R$ 8.000,00</ValueMax>
                          {showTaxaAdminPacoteIntermediario && (
                            <>
                              <div className="container-taxa-admin">
                                <span>Taxa Admin</span>
                                <span>
                                  {formatToPrice(taxaPacoteIntermediario || 0)}
                                </span>
                              </div>
                              <div className="container-valor-total">
                                <span>Total</span>
                                <span>
                                  {formatToPrice(
                                    valorPacoteIntermediario +
                                      taxaPacoteIntermediario || 0,
                                  )}
                                </span>
                              </div>
                            </>
                          )}
                        </td>
                        <td>
                          <InputMoney
                            control={control}
                            name="preco_pacote_avancado"
                            placeholder="R$"
                            maxValue={8000}
                            error={
                              errors.preco_pacote_avancado &&
                              errors.preco_pacote_avancado.message
                            }
                          />
                          <ValueMax>Valor máximo: R$ 8.000,00</ValueMax>
                          {showTaxaAdminPacoteAvancado && (
                            <>
                              <div className="container-taxa-admin">
                                <span>Taxa Admin</span>
                                <span>
                                  {formatToPrice(taxaPacoteAvancado || 0)}
                                </span>
                              </div>
                              <div className="container-valor-total">
                                <span>Total</span>
                                <span>
                                  {formatToPrice(
                                    valorPacoteAvancado + taxaPacoteAvancado ||
                                      0,
                                  )}
                                </span>
                              </div>
                            </>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </Card>
      <Spacer size={120} />

      <Container>
        <Row>
          <Col lg={12}>
            <div className="btn-acoes">
              <GhostButton
                className="voltar-button"
                onClick={() => history.goBack()}
              >
                VOLTAR
              </GhostButton>
              <Button onClick={handleSubmit(handleSalvarServico)}>
                PROXIMO
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      <ModalCalculadora
        setShowModal={setShowModalCalculadora}
        showModal={showModalCalculadora}
        porHora={false}
      />
    </Content>
  );
}
