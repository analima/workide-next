import ImgGrafico from '../../assets/area-grafico.jpg';
import ImgMark from '../../assets/area-mkt.jpg';
import ImgEscrita from '../../assets/area-escrita.jpg';
import ImgVideo from '../../assets/area-video.jpg';
import ImgTech from '../../assets/area-tech.jpg';
import ImgLegal from '../../assets/area-legal.jpg';
import ImgAdm from '../../assets/area-adm.jpg';
import ImgFinan from '../../assets/area-financ.jpg';

export const perguntaAreas = [
  {
    id: 1,
    nome: 'Gráficos & Design',
    image: ImgGrafico,
    perguntas: [
      {
        id: 1,
        pergunta: 'Como escolher um designer ideal para o meu projeto?',
        resposta:
          'Pesquise por designers na Gyan, após fazer uma pesquisa, você terá um grupo de freelancers candidatos para o seu projeto com base em habilidades, disponibilidade e outros aspectos que você está buscando para o seu projeto. Agora olhe as experiências de cada um, veja seus projetos realizados e avaliações recebidas, assim você conseguirá identificar o designer perfeito para o seu projeto.',
      },

      {
        id: 2,
        pergunta:
          'Por que e quando poderia ser necessário terceirizar um serviço de Design?',
        resposta:
          'A decisão de qualquer terceirização deve ser levada como um ponto estratégico, ainda mais quando se pensa em um crescimento do seu trabalho. Pois imagine você que a demanda de clientes é alta e prazos curtos ou que precise dar prioridade a algum cliente em algum momento você precisará terceirizar um serviço de Design para conseguir entregar o melhor trabalho. Logo, você pode considerar 2 cenários para pensar em terceirizar: (1) Quando há muitas demandas secundárias de Design; (2) Quando você tem demandas que necessitam de um trabalho específico de um profissional de design - por exemplo, você precisa combinar várias fotos da mesma composição básica em uma única imagem aperfeiçoada. A qualidade do trabalho de um profissional especializado poderá fazer a diferença nas suas fotos.',
      },
      {
        id: 3,
        pergunta:
          'Quais as principais ferramentas são necessárias para um profissional de web design?',
        resposta:
          'Os designers possuem diversas especialidades que demandam diferentes ferramentas, porém, de maneira geral um profissional de Design precisa entender e conhecer os fundamentos, as combinações de cores, o alinhamento de elementos e os princípios da tipografia. Ferramentas técnicas relacionadas a edição e modelagem também são necessárias para o dia a dia de um design, ferramentas como Photoshop, Figma, Canva, entre outras podem fazer parte do seu dia a dia como design a depender de sua especialização.',
      },
      {
        id: 4,
        pergunta:
          'Como a edição de imagens pode ajudar nos anúncios do meu negócio?',
        resposta:
          'Sabemos que a primeira impressão é que fica, pois uma imagem transmite sentimentos, valores e mensagens. Por isso é fundamental em campanhas e anúncios garantir a qualidade de uma imagem. Através da edição que se faz isso, pois com ela se faz tratamento da imagem, a aperfeiçoa e logo evidencia a mensagem que se deseja passar seja em uma venda ou qualquer outro uso sem necessariamente ter um texto. Porque um design consegue captar a sensibilidade e a essência de uma imagem.',
      },
      {
        id: 5,
        pergunta:
          'Quais as diferenças entre PNG, SVG e Arquivo de origem? Qual eu preciso para o meu projeto?',
        resposta:
          'PNG: O formato PNG é um dos principais formatos de imagem, tendo como suas principais vantagens o suporte a transparência de imagens, essa transparência normalmente é indicada um fundo quadriculado, estes pontos quadriculados são espaços transparentes no arquivo, o que significa que ele terá a cor do plano de fundo do site ou da imagem que for adicionado, por exemplo uma logo que você deseja adicionar em seus anúncios e sites. SVG: O formato SVG é um formato de imagem vetorial,  tendo como sua principal característica a escalabilidade de imagens, permitindo assim que o arquivo seja ampliado, sem que haja perda de qualidade ou aumento de peso, sendo o tipo de arquivo ideal para utilização em sites, tendo suporte para seus formato em todos os navegadores atuais. Arquivo origem: Um arquivo de origem é um arquivo em camadas editável contendo projeto desenvolvido, ele permite que você faça alterações adicionais no trabalho com mais facilidade, como exemplo os Arquivos no formato .PSD do Photoshop, esse tipo de arquivo necessita de Softwares específicos para sua visualização e edição. Caso não planeje fazer edições adicionais no arquivo além do simples corte ou redimensionamento, provavelmente você não precisará do arquivo de origem e poderá solicitar para o fornecedor o envio do arquivo em formato de imagem.',
      },
    ],
  },

  {
    id: 2,
    nome: 'Marketing',
    image: ImgMark,
    perguntas: [
      {
        id: 1,
        pergunta: 'O que é branding?',
        resposta:
          'O Branding é o responsável por estabelecer uma conexão entre sua empresa e o público, causando identificação das pessoas com sua marca, potencializando suas vendas. Sendo um passo importante também para fidelizar clientes, assim garantindo a satisfação do cliente a longo prazo e lucratividade para sua empresa.',
      },
      {
        id: 2,
        pergunta: 'Qual o primeiro passo para construir meu branding?',
        resposta:
          'Branding não é algo simples de ser construído, uma marca consolidada precisa possuir produtos, estratégias de marketing e design bem consolidados e em harmonia, portanto antes de iniciar a criação de marca da sua empresa recomendamos dedicar um tempo para estabelecer cada um desses pontos, como eles se relacionam entre si e com seus objetivos de negócios.',
      },
      {
        id: 3,
        pergunta: 'O que é patrimônio de marca?',
        resposta:
          'O patrimônio de marca é o valor relacionado aos elementos não materiais de uma empresa, como a qualidade de seus produtos, atendimentos ao cliente, aparência que ajudam a ao longo do tempo construir a confiança e reconhecimento da sua empresa perante o público.',
      },
      {
        id: 4,
        pergunta: 'O que é identidade de marca?',
        resposta:
          'A identidade da sua marca é qualquer coisa que você possa ver. Por exemplo, a plataforma de marketing por e-mail Mailchimp é conhecida por suas ilustrações em preto e branco usadas em todo o site e canais de mídia social. Os gráficos são usados ​​para ícones e para explicar rapidamente conceitos técnicos de forma visual. Mesmo que não seja o logotipo, ainda faz parte da identidade da marca. A identidade da marca pode incluir: Logo, Cores, Tipografia e fontes, Elementos visuais, como ilustrações ou fotografia, Ícones.',
      },
    ],
  },

  {
    id: 3,
    nome: 'Escrita & Tradução',
    image: ImgEscrita,
    perguntas: [
      {
        id: 1,
        pergunta: 'Do que se trata os serviços de transcrição?',
        resposta:
          'O serviço de transcrição se trata da conversão do é dito em um vídeo ou áudio ou vídeo para o formato de texto. A transcrição se concentra na reprodução precisa de palavras ditas no formato de um texto, mas pode haver outros tipos de transcrição do tipo de transcrição, como por exemplo as focadas em transformar as palavras ditas em um texto simplificado ou formal.',
      },
      {
        id: 2,
        pergunta: 'Porque posso precisar de um profissional de tradução?',
        resposta:
          'Um profissional de transcrição pode trazer diversas vantagens para você e a sua empresa, como por exemplo.',
        subresposta: [
          'Precisão e registro: Ter uma transcrição de uma gravação te fornece um registro preciso e formal do assunto tratado, sendo ideal fins comerciais e legais.',
          'Compreensão garantida: A transcrição fornece uma excelente forma de consultas, assim facilitando o entendimento do conteúdo e fornecendo  uma maneira de absorver melhor o que foi dito.',
          'Acessibilidade geral: A transcrição permite que portadores de necessidades especiais consumam seu conteúdo tornando-o mais inclusivo e abrangente.',
          'Tradução: O processo de transcrição é o primeiro passo para produzir legendas em outros idiomas, tornando o processo mais fácil caso queira traduzir para outros idiomas o seu conteúdo.',
          'SEO de conteúdo: Ter uma transcrição acompanhando seus conteúdos postados auxilia aos mecanismos de pesquisa a identificar da melhor maneira o conteúdo que está sendo tratado. As transcrições garantem que seu conteúdo de antes estava apenas no formato de áudio apareça nos mecanismos de pesquisas aumentando seu alcance.',
        ],
      },

      {
        id: 3,
        pergunta: 'O que faz um profissional de transcrição?',
        resposta:
          'Um profissional de transcrição, tem a função de transcrever registros no formato de áudio em texto digitados, o profissional de transcrição pode se especializar em um tipo específico de tradução ou campo do conhecimento técnico ou trabalhar em diversas áreas sendo um profissional mais geral. O transcritor deve trabalhar a escuta ativa junto ao processo de anotação precisa, sendo um trabalho que exige muito foco e atenção.',
      },
    ],
  },

  {
    id: 4,
    nome: 'Vídeo & Animação',
    image: ImgVideo,
    perguntas: [
      {
        id: 1,
        pergunta: 'O que faz um profissional de edição de fotos?',
        resposta:
          'O editor de imagens tem como principal função a edição e aprimoramento de imagens, realizando os recortes e tratamentos para a melhoria e/ou edição da composição de uma imagem, podendo trabalhar em fotos, vídeos e composições 3D a depender de sua especialidade, utilizando não apenas de ferramentas de seu abrangente conhecimento para realizar os serviços.',
      },
      {
        id: 2,
        pergunta:
          'Por que e quando poderia ser necessário terceirizar a edição/retoque de fotos?',
        resposta:
          'A decisão de qualquer terceirização deve ser levada como um ponto estratégico, ainda mais quando se pensa em um crescimento do seu trabalho. Pois imagine você que a demanda de clientes é alta e prazos curtos ou que precise dar prioridade a algum cliente em algum momento você precisará terceirizar a edição e/ou retoque das fotos para conseguir entregar o melhor trabalho. Logo, você pode considerar 2 cenários para pensar em terceirizar: (1) Quando há muitas imagens que precisam de um pouco de retoque, redimensionamento, reformatação ou edição; (2) quando você tem um arquivo ou arquivos de imagem que precisam de muito trabalho - por exemplo, você precisa combinar várias fotos da mesma composição básica em uma única imagem aperfeiçoada. A qualidade do trabalho de um profissional especializado poderá fazer a diferença nas suas fotos.',
      },
      {
        id: 3,
        pergunta: 'Por que eu devo editar o meu vídeo?',
        resposta:
          'A audiência para vídeos não para de crescer, seja para aprender uma nova habilidade, ficar por dentro de tendências, planejar uma viagem ou somente se divertir. O vídeo é, ainda, um complemento para outros formatos, como por exemplo as imagens e o conteúdo escrito. No entanto, para conquistar bons resultados, é importante criar um material de qualidade e bem editada. Caso contrário, por melhor que seja a sua intenção, talvez o público não a entenda. Dentro deste cenário de grandes oportunidades, há também muita concorrência. A edição torna o seu vídeo profissional e é por isso que o editor de vídeos é tão importante.',
      },
      {
        id: 4,
        pergunta: 'Quais são as vantagens de produzir um conteúdo em vídeo?',
        resposta:
          'A vantagem é que o vídeo gera identificação e, por ser um conteúdo visual, ajuda a assimilar uma determinada informação. Além disso, há um fator muito importante que você talvez ainda não saiba: os vídeos levam mais confiança para a pessoa que está assistindo. A confiança é uma emoção muito poderosa que ajuda a gerar aproximação, ou seja, se alguém confia em você, é muito mais fácil que essa pessoa queira te contratar ou comprar algo seu.',
      },
      {
        id: 5,
        pergunta: 'Quem pode utilizar o editor de vídeo?',
        resposta:
          'Há muitos profissionais que podem utilizar o vídeo em sua estratégia de conteúdo, como, por exemplo, professores, empreendedores, especialistas, médicos e muito mais. O setor esportivo também está se beneficiando de conteúdos de fotos e vídeos, que integram competições interativas de surf e outras atividades. Sendo assim, a edição de vídeos ajuda de duas maneiras: você pode gravar vídeos profissionais, para que empresas e profissionais encontrem o seu trabalho, ou pode gravar vídeos para criar a sua audiência.',
      },
    ],
  },

  {
    id: 5,
    nome: 'Tecnologia da Informação',
    image: ImgTech,
    perguntas: [
      {
        id: 1,
        pergunta: 'O que fazem os profissionais de TI?',
        resposta:
          'Os profissionais de TI tem como principais funções gerenciar as informações das empresas e tratar o processamento de dados, além de ser responsável por toda a parte de softwares, hardwares, informática e engenharia de software. Até há alguns anos, esses profissionais estavam ligados a atividades bem técnicas. Com a transformação digital e as mudanças no mercado, eles passaram a atuar também como parceiros estratégicos da organização, desenvolvendo ações e inovações competitivas. Outro ponto importante é que esses profissionais relacionam-se com diversos departamentos dentro de uma companhia, esclarecendo dúvidas e otimizando processos. O setor de TI pode ser dividido em sete áreas de atuação:',

        subresposta: [
          'Infraestrutura: Cabe a esses profissionais monitorar e garantir o pleno funcionamento de todos os equipamentos da organização.',
          'Software e Sistemas: Responsáveis por certificar a qualidade das soluções adotadas e por garantir que os processos de negócio sejam suportados por elas.',
          'Banco de Dados: São esses profissionais que cuidam e controlam todos os dados da empresa, garantindo sua integridade e segurança.',
          'Segurança da Informação: Esses profissionais garantem a disponibilidade, integridade e confidencialidade das informações em relação a ameaças digitais.',
          'Administração de Redes: Os profissionais dessa frente fazem a instalação e configuração de toda a rede necessárias para conexão e o melhor funcionamento dos equipamentos e produtividade dos colaboradores.',
          'Cloud Computing: O uso da nuvem no ambiente corporativo e pessoal está crescendo. Aqueles que atuam nessa frente ajudam a aproveitar todos os benefícios da cloud com segurança, de acordo com o perfil e as necessidades da empresa.',
          'Programação: Cabe a esses profissionais mexer com todos os recursos que envolvem programação e códigos.',
        ],
      },

      {
        id: 2,
        pergunta: 'Qual a importância da Tecnologia da informação em empresas?',
        resposta:
          'Hoje em dia, a tecnologia da informação está presente na nossa vida e as soluções tecnológicas que a englobam são fundamentais para o gerenciamento de qualquer negócio. O acesso a essas ferramentas coloca empresas em posição de destaque no mercado, de modo que ela se diferencie dos concorrentes com soluções e inovações que envolvem o processo, gerenciamento, atendimento e planejamento de suas atividades. Por esse e outros motivos diz-se que o investimento em tecnologia da informação em empresas é indispensável para os dias de hoje.',
      },
      {
        id: 3,
        pergunta: 'O que são Requisitos de Software?',
        resposta:
          'Os requisitos de software são a descrição dos recursos e funcionalidades do sistema, os requisitos tem como objetivo explicitar aos desenvolvedores as especificações do sistema a ser desenvolvido. O processo de coletar, analisar e documentar os requisitos contemplam a primeira etapa do ciclo de vida de um software comumente conhecida como Análise e definição de requisitos.',
      },
      {
        id: 4,
        pergunta: 'Qual a importância de ter documentação no meu projeto?',
        resposta:
          'A documentação dentro de um projeto de desenvolvimento de software serve não  apenas para meios operacionais e jurídicos, mas principalmente para auxiliar os outros profissionais como desenvolvedores, testers e designers no desenvolvimento da aplicação desejada, sendo uma ferramenta útil desde o desenvolvimento do software até a etapa de manutenção, podendo ser uma fonte de economia de tempo e dinheiro para o seu projeto, facilitando a execução de tarefas e evitando retrabalho. A documentação de um software se mostra necessária também para membros novos na equipe, facilitando o uso e entendimento do software, principalmente quando é necessário realizar manutenções e evoluções no Software onde uma documentação bem feita faz toda a diferença.',
      },
    ],
  },

  {
    id: 6,
    nome: 'Legal',
    image: ImgLegal,
    perguntas: [
      {
        id: 1,
        pergunta: 'O que fazem os profissionais de Legais?',
        resposta:
          'Os profissionais de TI tem como principais funções gerenciar as informações das empresas e tratar o processamento de dados, além de ser responsável por toda a parte de softwares, hardwares, informática e engenharia de software. Até há alguns anos, esses profissionais estavam ligados a atividades bem técnicas. Com a transformação digital e as mudanças no mercado, eles passaram a atuar também como parceiros estratégicos da organização, desenvolvendo ações e inovações competitivas. Outro ponto importante é que esses profissionais relacionam-se com diversos departamentos dentro de uma companhia, esclarecendo dúvidas e otimizando processos. O setor de TI pode ser dividido em sete áreas de atuação:',

        subresposta: [
          'Infraestrutura: Cabe a esses profissionais monitorar e garantir o pleno funcionamento de todos os equipamentos da organização.',
          'Software e Sistemas: Responsáveis por certificar a qualidade das soluções adotadas e por garantir que os processos de negócio sejam suportados por elas.',
          'Banco de Dados: São esses profissionais que cuidam e controlam todos os dados da empresa, garantindo sua integridade e segurança.',
          'Segurança da Informação: Esses profissionais garantem a disponibilidade, integridade e confidencialidade das informações em relação a ameaças digitais.',
          'Administração de Redes: Os profissionais dessa frente fazem a instalação e configuração de toda a rede necessárias para conexão e o melhor funcionamento dos equipamentos e produtividade dos colaboradores.',
          'Cloud Computing: O uso da nuvem no ambiente corporativo e pessoal está crescendo. Aqueles que atuam nessa frente ajudam a aproveitar todos os benefícios da cloud com segurança, de acordo com o perfil e as necessidades da empresa.',
          'Programação: Cabe a esses profissionais mexer com todos os recursos que envolvem programação e códigos.',
        ],
      },

      {
        id: 2,
        pergunta: 'Qual a importância de pessoas legais nas empresas?',
        resposta:
          'Hoje em dia, a tecnologia da informação está presente na nossa vida e as soluções tecnológicas que a englobam são fundamentais para o gerenciamento de qualquer negócio. O acesso a essas ferramentas coloca empresas em posição de destaque no mercado, de modo que ela se diferencie dos concorrentes com soluções e inovações que envolvem o processo, gerenciamento, atendimento e planejamento de suas atividades. Por esse e outros motivos diz-se que o investimento em tecnologia da informação em empresas é indispensável para os dias de hoje.',
      },
      {
        id: 3,
        pergunta: 'O que são Requisitos de Software?',
        resposta:
          'Os requisitos de software são a descrição dos recursos e funcionalidades do sistema, os requisitos tem como objetivo explicitar aos desenvolvedores as especificações do sistema a ser desenvolvido. O processo de coletar, analisar e documentar os requisitos contemplam a primeira etapa do ciclo de vida de um software comumente conhecida como Análise e definição de requisitos.',
      },
      {
        id: 4,
        pergunta: 'Qual a importância de ter documentação no meu projeto?',
        resposta:
          'A documentação dentro de um projeto de desenvolvimento de software serve não  apenas para meios operacionais e jurídicos, mas principalmente para auxiliar os outros profissionais como desenvolvedores, testers e designers no desenvolvimento da aplicação desejada, sendo uma ferramenta útil desde o desenvolvimento do software até a etapa de manutenção, podendo ser uma fonte de economia de tempo e dinheiro para o seu projeto, facilitando a execução de tarefas e evitando retrabalho. A documentação de um software se mostra necessária também para membros novos na equipe, facilitando o uso e entendimento do software, principalmente quando é necessário realizar manutenções e evoluções no Software onde uma documentação bem feita faz toda a diferença.',
      },
    ],
  },

  {
    id: 7,
    nome: 'Administração',
    image: ImgAdm,
    perguntas: [
      {
        id: 1,
        pergunta:
          'Qual o papel que o Administrador deve desempenhar nas organizações?',
        resposta:
          'O papel do administrador nas organizações é alocar os recursos de maneira eficiente e eficaz. Planejando, organizando, liderando e controlando.',
      },
      {
        id: 2,
        pergunta: 'Por que as empresas necessitam de um Administrador?',
        resposta:
          'Para que a empresa tenha um direcionamento estratégico que leve ela a patamares maiores, para que os recursos sejam bem alocados, para que cada área tenha a quem se direcionar.',
      },
      {
        id: 3,
        pergunta: 'Qual o perfil que o Administrador deve possuir?',
        resposta:
          'O perfil que o administrador do século XXI deve ter princípios éticos, criatividade, controle emocional, liderança, empatia, humildade e curiosidade.',
      },
      {
        id: 4,
        pergunta: 'Quais são as principais áreas de atuação?',
        resposta:
          'Qualquer organização, independentemente do tamanho ou ramo, precisa de mão de obra qualificada para alcançar bons resultados. Com isso, entre os muitos segmentos de atuação para área administrativa, encontram-se:',
        subresposta: [
          'Recursos humanos',
          'Perícia judicial',
          'Marketing',
          'Logística',
          'Vendas,',
          'Comércio exterior',
          'Auditoria, assessoria e consultoria.',
        ],
      },
    ],
  },

  {
    id: 8,
    nome: 'Finanças & Contabilidade',
    image: ImgFinan,
    perguntas: [
      {
        id: 1,
        pergunta:
          'Qual o perfil ideal para o gestor financeiro da minha empresa e por que ter um?',
        resposta:
          'Não tem saída! Como empreendedor, se finanças não é seu forte, a gestão desses processos logo vão virar um gargalo para a empresa. Se você entende bastante de finanças, logo não vai poder dar a devida atenção a isso – afinal, seus stakeholders precisam de você. Por isso, em algum momento, uma pessoa dedicada à área será fundamental para seu negócio conseguir crescer. Mas entender o perfil ideal para o gestor financeiro demanda, antes de tudo, entender o protagonismo da área financeira na gestão de empresas.',
      },
      {
        id: 2,
        pergunta: 'Quais as competências de um líder financeiro?',
        resposta:
          'Como gestor líder destes processos, além do conhecimento técnico, o aspecto comportamental merece atenção especial. Destacamos 5 importantes aspectos da capacidade de liderança do gestor:',
        subresposta: [
          '1) Trabalho em Equipe e na formação de talentos – Equipes de alta performance.',
          '2) Inovação – capacidade de inovar desafiando o status quo de processos e sistemas – Eficácia operacional.',
          '3) Disciplina no planejamento e controle – Governança e Gestão de Risco.',
          '4) Foco no resultado – A meritocracia na entrega da equipe e do indivíduo.',
          '5) Comunicação – o poder de comunicar de forma clara e persuasiva dentro e fora da área financeira.',
        ],
      },
      {
        id: 3,
        pergunta: 'Quais são as leis que envolvem o imóvel da minha empresa?',
        resposta:
          'Empresas de reciclagem, lavanderia, marmoraria e outras, precisam estar adequadas às leis ambientais. Já, escolas, clínicas, bares, danceterias, restaurantes e empresas que recebam algum público, necessitam de agendamento no corpo de bombeiros para a liberação do alvará de funcionamento na prefeitura e também alvará da vigilância sanitária. Para cada tipo de empresa há uma legislação diferente. Elas variam de estado ou região.  Consulte o seu contador sobre estas questões burocráticas para se preparar diante de algumas exigências.',
      },
      {
        id: 4,
        pergunta:
          'Quais são as minhas obrigações a partir da contratação de funcionários?',
        resposta:
          'Ao admitir um funcionário você deverá solicitar a carteira de trabalho para registro, e Previdência Social. O contador também deverá informar-lhe sobre suas obrigações para com os funcionários contratados. Há leis específicas para funcionários contratados temporariamente, funcionárias grávidas, ou doentes. Funcionários com família devem receber o “salário família”, que apresenta um ajuste um pouco superior ao salário mínimo. O certificado militar também deverá ser solicitado.',
      },
      {
        id: 5,
        pergunta:
          'Quais documentos são exigidos para registrar a minha empresa?',
        resposta:
          'Para registrar a marca da empresa alguns documentos do empresário deverão ser solicitados como, certidão de nascimento ou RG, CPF, cartão PIS, declaração de dependentes para abatimento do imposto de renda, comprovante de residência, e outros se necessário.',
      },
      {
        id: 6,
        pergunta:
          ' Como o contador me auxilia na avaliação da rotina contábil?',
        resposta:
          'Com a praticidade e a disponibilidade cada vez maior de softwares de controle para empresas, é certo que muitos empresários dispensem os contadores de executar esta função, mas já que essa avaliação é exigida pelo pelos órgãos administrativos, convém solicitar, também, uma avaliação profissional para que a empresa não saia dos trilhos. E contar com um contador pode garantir a normalidade. Esta avaliação lista as atividades rotineiras da empresa como, compra, venda, mercadoria em estoque e outros, para manter a empresa sob controle.',
      },
      {
        id: 7,
        pergunta: 'O que é esperado de mim na declaração de Imposto de Renda?',
        resposta:
          'A declaração do Imposto de Renda do empresário e sócios pode ser feita pelo contador da empresa. Ele saberá como tomar as providências para o processo.',
      },
      {
        id: 8,
        pergunta:
          'O contador pode realizar o levantamento de balancetes da minha empresa?',
        resposta:
          'O levantamento de balancetes pode ser realizado pelo contador da empresa para facilitar a observação do empresário sobre o bom andamento da empresa. Desta forma se torna mais fácil e prático tomar decisões de compra, venda ou outras decisões estratégicas.',
      },
      {
        id: 9,
        pergunta: 'O que preciso saber sobre os Encargos Financeiros?',
        resposta:
          'Os encargos financeiros estão implicados nas taxas de juros, faturas de cartão de crédito e atraso do pagamento de um empréstimo, por exemplo. A desatenção na contratação de serviços financeiros trazer muita dor de cabeça na saúde financeira da empresa. O acompanhamento de um contador também serve para contabilizar dados dedutíveis do Imposto de Renda e da Contribuição sobre o Lucro.',
      },
      {
        id: 10,
        pergunta: 'Como posso contribuir para o contador?',
        resposta:
          'Para que o contador possa realizar seu trabalho, você deve fornecer-lhe informações sobre tudo o que acontece na sua empresa, como, notas fiscais emitidas aos clientes, gastos, e organização do fluxo de caixa (entrada e saída). O contador deve ser de sua extrema confiança, mas de vez em quando pode haver desentendimentos por conta de atrasos no pagamento de alguns impostos, para evitar este e outros problemas convém organizar e anotar, por exemplo, os prazos para o pagamento, valores para o cálculo dos impostos e percentual correto. A comunicação é extremamente importante no bom relacionamento.',
      },
    ],
  },
];
