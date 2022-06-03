import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { IProject } from '../../interfaces/IProject';
import { pessoas_api } from '../../services/pessoas_api';

export const PDFProjectGenerator = async (projects: {
  [key: number]: IProject;
}): Promise<any> => {
  const DOCStructure: any = {
    content: [
      {
        style: 'tableStyles',
        table: {
          body: [
            [
              'Nome',
              'Criado por',
              'Sobre o projeto',
              'Nível de experiencia',
              'Faixa de preço',
              'Status',
              'Proposta enviada por',
              'Valor da proposta',
              'Descrição da proposta',
            ],
          ],
        },
      },
    ],
    styles: {
      tableStyles: {
        margin: [0, 0, 0, 0],
      },
    },
    pageSize: 'A4',
    pageOrientation: 'landscape',
  };
  for (let project in projects) {
    if (
      !projects[project].pessoaConsumidor ||
      !projects[project].pessoaFornecedor
    ) {
      try {
        const { data: pessoaConsumidor } = await pessoas_api.get(
          `/pessoas/${projects[project].idPessoaConsumidor}`,
        );
        const { data: pessoaFornecedor } = await pessoas_api.get(
          `/pessoas/${projects[project].idPessoaFornecedor}`,
        );
        projects[project].pessoaConsumidor = pessoaConsumidor;
        projects[project].pessoaFornecedor = pessoaFornecedor;
      } catch (error) {
        console.log(error);
      }
    }

    DOCStructure.content[0].table.body.push([
      projects[project].nome,
      projects[project].pessoaConsumidor.nome,
      projects[project].descricao,
      projects[project].niveisExperiencia,
      `${
        projects[project].precoMaximo && projects[project].precoMinimo
          ? `R$${projects[project].precoMaximo} - R$${projects[project].precoMinimo}`
          : 'Não informado'
      }`,
      projects[project].status.descricao,
      projects[project].pessoaFornecedor.nome,
      `R$${projects[project].propostaAceita.valor}`,
      projects[project].propostaAceita.descricao,
    ]);
  }

  return DOCStructure;
};

export const PDFGenerator = async (projects: {
  [key: number]: IProject;
}): Promise<void> => {
  const structure = await PDFProjectGenerator(projects);
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  pdfMake.createPdf(structure).download();
};
