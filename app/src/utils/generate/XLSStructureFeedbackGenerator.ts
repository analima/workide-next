import { formatDate } from '../../helpers/DateHelper';
import { IFeedback } from '../../interfaces/IFeedback';

interface IFeedbackXLS {
  id: string;
  nome: string;
  email: string;
  'data e Hora criação': string;
  tipo: string;
  status: string;
  'data e Hora conclusão': string;
  conteúdo: string;
}

export interface IXlsStructureFeedback {
  feedbacks: IFeedbackXLS[];
}

export const XLSStructureFeedbackGenerator = async (feedbacks: {
  [key: number]: IFeedback;
}): Promise<IXlsStructureFeedback> => {
  const DOCStructure: IXlsStructureFeedback = {
    feedbacks: [],
  };
  for (let feedback in feedbacks) {
    DOCStructure.feedbacks.push({
      id: feedbacks[feedback].id.toLocaleString('pt-BR', {
        minimumIntegerDigits: 5,
        useGrouping: false,
      }),
      nome: feedbacks[feedback].nome_pessoa || 'Nome não encontrado',
      email: feedbacks[feedback].email_usuario || 'Email não encontrado',
      'data e Hora criação': formatDate(
        feedbacks[feedback].data_criacao,
        'dd/MM/yyyy hh:mm',
      ),
      tipo: feedbacks[feedback].ds_tipo,
      status: feedbacks[feedback].status,
      'data e Hora conclusão':
        feedbacks[feedback].conclusao !== null
          ? formatDate(feedbacks[feedback].conclusao, 'dd/MM/yyyy hh:mm')
          : '-',
      conteúdo: feedbacks[feedback].conteudo,
    });
  }
  return DOCStructure;
};
