import {Check, Content, Field} from './style';
import checkAzul from '../../assets/check-azul.svg'
import checkCinza from '../../assets/check-cinza.svg'

export function PlanoBasico(): JSX.Element {
  return(
    <Content>
      <div className="conteudo">
        <h3 className="mt-2">Básico</h3>
        <h3>
          R$ <span>0</span>
        </h3>

        <ul>
          <li>
            <Field>
              Conexões <strong>Ilimitado</strong>
            </Field>
          </li>
          <li>
            <Field>
              Selo de assinatura <Check src={checkCinza} alt="não possui" />
            </Field>
          </li>
          <li>
            <Field>
              Dashboard <Check src={checkAzul} alt="possui" />
            </Field>
          </li>
          <li>
            <Field>
              Visibilidade de banco de dados <Check src={checkAzul} alt="possui" />
            </Field>
          </li>
          <li>
            <Field>
              Visibilidade de busca <Check src={checkAzul} alt="possui" />
            </Field>
          </li>
          <li>
            <Field>
              Recebimento <strong>20 dias</strong>
            </Field>
          </li>
          <li>
            <Field>
              Acesso ao painel de oportunidades<Check src={checkAzul} alt="possui" />
            </Field>
          </li>
          <li>
            <Field>
              Receber proposta exclusiva<Check src={checkAzul} alt="possui" />
            </Field>
          </li>
          <li>
            <Field>
              Receber recomendações externas <strong>01</strong>
            </Field>
          </li>
          <li>
            <Field>
              Verificação de pessoas<Check src={checkAzul} alt="possui" />
            </Field>
          </li>
          <li>
            <Field>
              Chamada de vídeo <strong>Recebe</strong>
            </Field>
          </li>
          <li>
            <Field>
              Áreas e subáreas da sua competência <strong>03</strong>
            </Field>
          </li>
          <li>
            <Field>
              Habilidades e competências <strong>10</strong>
            </Field>
          </li>
          <li>
            <Field>
              Vender serviços, pacotes e cases <strong>01</strong>
            </Field>
          </li>
          <li>
            <Field>
              Campanha de divulgação nas redes <strong>Ilimidado</strong>
            </Field>
          </li>
          <li>
            <Field>
              Pesquisas salvas (favoritar) <strong>03</strong>
            </Field>
          </li>
          <li>
            <Field>
              Permitir projetos simultâneos<strong>04</strong>
            </Field>
          </li>
          <li>
            <Field>
              Oferecer parcelamento ao consumidor <Check src={checkCinza} alt="não possui" />
            </Field>
          </li>
          <li>
            <Field>
              Acesso a treinamentos <Check src={checkAzul} alt="possui" />
            </Field>
          </li>
          <li>
            <Field>
              Feedback de habilidades percebidas <Check src={checkAzul} alt="possui" />
            </Field>
          </li>
          <li>
            <Field>
              Atendimento premium via chat <Check src={checkCinza} alt="não possui" />
            </Field>
          </li>
        </ul>
      </div>
    </Content>
  )
}