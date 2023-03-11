import { AZUL, LARANJA, VERDE } from '../../../styles/variaveis';
import { Content, ContentConheca, BoxContent } from './styles';
import { BsCheckCircleFill } from 'react-icons/bs';

export function ConhecaComoFunciona() {
  return (
    <Content>
      <h1>Conheças os benefícios</h1>
      <ContentConheca>
        <BoxContent color="#FB966D">
          <div>
            <span>
              <BsCheckCircleFill color={LARANJA} size={51} />
            </span>
            Para profissionais
          </div>

          <p>
            Tenha acesso gratuito e ilimitado a todos os recursos que
            desenvolvemos para te ajudar no seu trabalho.
          </p>
        </BoxContent>

        <BoxContent color="#33a5ea">
          <div>
            <span>
              <BsCheckCircleFill color={AZUL} size={51} />
            </span>
            Para empresas
          </div>

          <p>
            Encontre e selecione profissionais que contribuirão para que seu
            projeto seja executado com excelência.
          </p>
        </BoxContent>

        <BoxContent color="#33CDB1">
          <div>
            <span>
              <BsCheckCircleFill color={VERDE} size={51} />
            </span>
            Para ONGs
          </div>

          <p>
            Zero taxa de negociação para projetos voluntários. Incentivamos a
            cultura do voluntariado para o mercado de trabalho.
          </p>
        </BoxContent>

        <BoxContent color="#FB6B60">
          <div>
            <span>
              <BsCheckCircleFill color="#FC8980" size={51} />
            </span>
            Segurança para todos
          </div>

          <p>
            Na freelas town você tem a garantia de que o pagamento só será
            efetuado quando o projeto estiver concluído e validado, tanto pelo
            freelancer quanto pela empresa.
          </p>
        </BoxContent>
      </ContentConheca>
    </Content>
  );
}
