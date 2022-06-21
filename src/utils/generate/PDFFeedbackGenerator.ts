import { IFeedback } from '../../interfaces/IFeedback';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { formatDate } from '../../helpers/DateHelper';

export const PDFFeedbackGenerator = async (feedbacks: {
  [key: number]: IFeedback;
}): Promise<any> => {
  const DOCStructure = {
    content: [
      {
        style: 'tableStyles',
        table: {
          body: [
            [
              'id',
              'nome',
              'email',
              'data e hora',
              'tipo',
              'status',
              'conclusão',
              'conteúdo',
            ],
          ],
        },
      },
    ],
    styles: {
      tableStyles: {
        margin: [0, 15, 0, 15],
      },
    },
    pageSize: 'A4',
    pageOrientation: 'landscape',
  };
  for (let feedback in feedbacks) {
    DOCStructure.content[0].table.body.push([
      feedbacks[feedback].id.toLocaleString('pt-BR', {
        minimumIntegerDigits: 5,
        useGrouping: false,
      }),
      feedbacks[feedback].nome_pessoa || 'Nome não encontrado',
      feedbacks[feedback].email_usuario || 'Email não encontrado',
      formatDate(feedbacks[feedback].data_criacao, 'dd/MM/yyyy hh:mm'),
      feedbacks[feedback].ds_tipo,
      feedbacks[feedback].status,
      feedbacks[feedback].conclusao !== null
        ? formatDate(feedbacks[feedback].conclusao, 'dd/MM/yyyy hh:mm')
        : '-',
      feedbacks[feedback].conteudo,
    ]);
  }
  return DOCStructure;
};

export const PDFGenerator = async (feedbacks: {
  [key: number]: IFeedback;
}): Promise<void> => {
  const structure = await PDFFeedbackGenerator(feedbacks);
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  pdfMake.createPdf(structure).download();
};
