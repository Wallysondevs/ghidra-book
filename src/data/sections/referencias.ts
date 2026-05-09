import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "recursos-comunidade",
    section: "referencias",
    title: "Recursos da Comunidade de RE",
    difficulty: "iniciante",
    subtitle: "Onde os mestres se encontram (e onde pedir socorro)",
    intro: "Engenharia Reversa não é uma jornada solitária, embora pareça quando você está às 3 da manhã tentando entender um ponteiro triplo. A comunidade de RE é uma das mais apaixonadas e prestativas da tecnologia. O conhecimento está espalhado por servidores de Discord, fóruns e perfis de redes sociais de pesquisadores que vivem de quebrar o impossível. No Brasil e no mundo, existem grupos dedicados apenas a discutir Ghidra e análise de malware. Estar conectado a esses hubs é vital: o que você levaria dias para descobrir sozinho, alguém pode te explicar em cinco minutos com uma analogia simples. É como ter um grupo de amigos mecânicos quando o seu carro resolve fazer um barulho estranho — alguém ali já viu esse problema antes.",
    codes: [
      {
        lang: "text",
        code: "Discord: Ghidra Users, RE Team, Pwn.college\nReddit: r/ReverseEngineering, r/ghidra, r/netsec\nTwitter (X): @GhidraBook, @NSACyber, @mame82, @gamozolabs\nYouTube: LiveOverflow, stacksmashing, OALabs",
        label: "Principais canais de comunicação"
      }
    ],
    points: [
      "Discord é o lugar para tirar dúvidas em tempo real",
      "O Reddit r/ReverseEngineering tem discussões técnicas de alto nível",
      "GitHub é onde você encontra os melhores scripts e extensões para o Ghidra",
      "Siga pesquisadores ativos no Twitter para ficar por dentro de novas vulnerabilidades",
      "YouTube é a melhor fonte de 'walkthroughs' visuais de desafios de CTF",
      "O fórum da NSA (mantenedora do Ghidra) é o lugar oficial para reportar bugs",
      "Participe de grupos locais de segurança (BSides, Grupos de Usuários)",
      "Não tenha medo de perguntar, mas sempre mostre o que você já tentou fazer"
    ],
    alerts: [
      {
        type: "tip",
        content: "Ao pedir ajuda, forneça o máximo de contexto: arquitetura, sistema operacional e, se possível, o snippet de código do Decompiler."
      },
      {
        type: "info",
        content: "Muitas comunidades têm canais específicos para iniciantes ('newbies' ou 'beginners'). Comece por lá!"
      }
    ]
  },
  {
    slug: "livros-recomendados",
    section: "referencias",
    title: "Livros e Cursos Recomendados",
    difficulty: "iniciante",
    subtitle: "Construindo sua biblioteca mental",
    intro: "Embora a prática seja fundamental, a teoria sólida poupa muito tempo de 'bateção de cabeça'. Existem livros que são considerados verdadeiras bíblias no mundo da Engenharia Reversa. Eles não apenas ensinam a usar uma ferramenta, mas explicam o funcionamento profundo dos sistemas operacionais e da arquitetura de computadores. Ler um desses livros é como ganhar um mapa detalhado de uma cidade onde você antes andava no escuro. Além dos livros, existem cursos gratuitos de altíssima qualidade mantidos por universidades e especialistas que acreditam na democratização do conhecimento em segurança. Se você quer ir além do básico, investir tempo em uma leitura estruturada é o que vai te diferenciar de um 'script kiddie'.",
    codes: [
      {
        lang: "text",
        code: "1. Practical Malware Analysis (Chris Eagle & Andrew Honig)\n2. The Ghidra Book: The Definitive Guide (Chris Eagle)\n3. Hacking: The Art of Exploitation (Jon Erickson)\n4. Rootkits: Subverting the Windows Kernel (Hoglund & Butler)",
        label: "Lista de leitura obrigatória"
      }
    ],
    points: [
      "'Practical Malware Analysis' é essencial para quem quer seguir carreira em defesa",
      "'The Ghidra Book' é o manual oficial para dominar todas as janelas do software",
      "Open Security Training (OST2) oferece cursos gratuitos de nível universitário",
      "TCM Security possui cursos acessíveis e muito práticos",
      "O site 'pwn.college' é uma jornada gamificada incrível para RE e Pwn",
      "Leia sobre arquitetura de sistemas operacionais (Windows Internals ou Linux Kernel)",
      "Livros de Assembly (como os do Art of Assembly) ajudam a entender a base",
      "Acompanhe blogs de empresas de antivírus (Kaspersky, CrowdStrike, SentinelOne)"
    ],
    alerts: [
      {
        type: "success",
        content: "Muitos desses livros têm exemplos de código e laboratórios disponíveis gratuitamente no GitHub dos autores."
      },
      {
        type: "info",
        content: "A maioria do conteúdo técnico de ponta está em inglês. Desenvolver a leitura técnica nesse idioma é um divisor de águas."
      }
    ]
  },
  {
    slug: "ferramentas-complementares",
    section: "referencias",
    title: "Ferramentas que Trabalham com o Ghidra",
    difficulty: "iniciante",
    subtitle: "Montando seu laboratório de análise",
    intro: "O Ghidra é fantástico para análise estática (olhar o código sem rodar), mas às vezes você precisa ver o programa 'respirando'. É aí que entram os debuggers e as ferramentas complementares. Imagine que o Ghidra é o raio-X e o debugger é a cirurgia em tempo real. Saber alternar entre o Ghidra e ferramentas como GDB ou x64dbg é o que define um analista completo. Além disso, existem ferramentas que 'estendem' o poder do Ghidra, permitindo que você compare dois binários diferentes (BinDiff) ou automatize a extração de dados. Ter um kit de ferramentas bem montado é como ter uma oficina completa: para cada parafuso, existe a chave de fenda correta.",
    codes: [
      {
        lang: "bash",
        code: "# Debugger dinâmico no Linux (com extensão GEF)\ngdb ./desafio -ex \"gef config\"\n\n# Instrumentação dinâmica com Frida (Hooking)\nfrida -l script.js -n processo_alvo\n\n# Alternativa rápida via terminal\nradare2 -A ./binario",
        label: "Comandos básicos de ferramentas externas"
      }
    ],
    points: [
      "GDB com extensões (Pwndbg, GEF ou PEDA) é o padrão para Linux",
      "x64dbg é o sucessor espiritual do OllyDbg para Windows moderno",
      "Frida permite injetar scripts em processos rodando para alterar funções",
      "Radare2 e Cutter são excelentes alternativas de código aberto",
      "Binary Ninja é uma opção comercial com uma interface muito limpa",
      "BinDiff ajuda a encontrar diferenças entre duas versões do mesmo programa",
      "Process Hacker/Sysinternals são vitais para monitorar malware no Windows",
      "PE-bear é ótimo para analisar a estrutura de arquivos executáveis Windows"
    ],
    alerts: [
      {
        type: "tip",
        content: "Use o plugin 'BinExport' no Ghidra para exportar sua análise e abri-la no BinDiff ou em outras ferramentas de comparação."
      },
      {
        type: "warning",
        content: "Sempre verifique se a versão da sua ferramenta é compatível com a arquitetura (x86 vs x64) do binário."
      }
    ]
  },
  {
    slug: "certificacoes-re",
    section: "referencias",
    title: "Certificações e Carreira em Reverse Engineering",
    difficulty: "iniciante",
    subtitle: "Transformando o hobby em profissão",
    intro: "O mercado para profissionais de Engenharia Reversa é escasso e, por isso, muito bem pago. Grandes empresas de tecnologia, firmas de cibersegurança e órgãos governamentais estão constantemente em busca de pessoas que saibam analisar ameaças ou encontrar vulnerabilidades críticas. No Brasil, o mercado de análise de malware em bancos e empresas de pagamento é muito forte devido à alta incidência de trojans bancários. As certificações funcionam como um 'selo de qualidade' no seu currículo, provando que você passou por testes rigorosos. Mas não se engane: na RE, o seu portfólio (desafios resolvidos, scripts no GitHub, write-ups de CTF) muitas vezes brilha mais do que qualquer papel assinado.",
    codes: [
      {
        lang: "text",
        code: "Principais Certificações:\n- GREM (GIAC Reverse Engineering Malware) - A 'Padrão Ouro'\n- CREA (Certified Reverse Engineering Analyst)\n- OSCP (Possui módulos de RE básica)\n- eCRE (eLearnSecurity Certified Reverse Engineer)",
        label: "Caminhos de certificação"
      }
    ],
    points: [
      "GREM é focada em análise de malware e é muito valorizada internacionalmente",
      "Analistas de Malware trabalham em empresas de Antivírus e CSIRTs",
      "Pesquisadores de Vulnerabilidades (Bug Hunters) buscam falhas em softwares famosos",
      "O salário de um especialista em RE costuma ser acima da média de Devs Senior",
      "Trabalhar em Red Teams envolve criar exploits baseados em RE",
      "No Brasil, o setor bancário é o maior empregador de reversers",
      "O trabalho remoto para empresas do exterior é muito comum nesta área",
      "Mantenha um blog com seus 'write-ups' para atrair recrutadores técnicos"
    ],
    alerts: [
      {
        type: "success",
        content: "Contribuir para ferramentas open-source como o próprio Ghidra é uma das melhores formas de ser notado por grandes empresas."
      },
      {
        type: "info",
        content: "Muitas empresas preferem ver seu perfil no CTFtime do que sua formação acadêmica tradicional."
      }
    ]
  },
  {
    slug: "proximo-nivel",
    section: "referencias",
    title: "O Próximo Nível: Para Onde Ir Daqui",
    difficulty: "iniciante",
    subtitle: "A toca do coelho é mais profunda do que parece",
    intro: "Se você chegou até aqui, você já sabe mais sobre como os computadores funcionam do que 90% dos programadores. Mas a Engenharia Reversa é um campo vasto. O que você aprendeu com binários de PC é apenas a ponta do iceberg. O próximo passo pode ser mergulhar em firmwares de dispositivos IoT (Internet das Coisas), entender como o kernel de um sistema operacional gerencia a memória, ou até mesmo analisar aplicativos móveis (Android/iOS) que usam proteções pesadas. O aprendizado nunca para porque a tecnologia nunca para. Cada novo processador, cada nova proteção de software é um novo enigma esperando para ser resolvido. Mantenha a curiosidade acesa e nunca pare de perguntar: 'O que acontece se eu mudar esse byte aqui?'",
    codes: [
      {
        lang: "text",
        code: "Próximos temas para estudar:\n1. Exploit Development (Buffer Overflows, ROP Chains)\n2. Firmware RE (Extracção de flash, binwalk, análise de bootloaders)\n3. Mobile RE (Descompilação de APKs com JADX, Hooking com Frida)\n4. Anti-RE Techniques (Virtualização de código, ofuscação polimórfica)",
        label: "Roteiro de estudos avançados"
      }
    ],
    points: [
      "Aprenda Exploit Development para entender como bugs viram armas",
      "Estude sistemas embarcados e protocolos de comunicação (I2C, SPI, UART)",
      "Mergulhe na arquitetura ARM, muito comum em dispositivos móveis e IoT",
      "Experimente o Ghidra para analisar apps de Android (arquivos .so)",
      "Aprenda sobre descompactação (unpacking) manual de executáveis",
      "Explore o mundo da Engenharia Reversa de Hardware",
      "Tente criar seus próprios desafios de CTF para entender o lado do autor",
      "Mantenha-se atualizado com as conferências de segurança (DEF CON, Black Hat, CCC)"
    ],
    alerts: [
      {
        type: "success",
        content: "A Engenharia Reversa é um superpoder. Use-o para o bem, para aprender e para tornar o mundo digital mais seguro."
      },
      {
        type: "tip",
        content: "A melhor maneira de aprender um assunto avançado é tentar ensiná-lo para alguém. Escreva sobre o que você aprendeu!"
      }
    ]
  }
];
