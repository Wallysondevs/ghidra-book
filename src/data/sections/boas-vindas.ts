import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "bem-vindo-ao-re",
    section: "boas-vindas",
    title: "Bem-vindo ao Reverse Engineering",
    difficulty: "iniciante",
    subtitle: "A arte de ler a mente das máquinas",
    intro: `Imagine que você comprou um rádio antigo em uma feira de antiguidades no centro de São Paulo. Ele funciona, mas você não tem o manual e nem ideia de como os componentes internos conversam entre si para transformar ondas invisíveis em música. Para entender, você decide abrir o aparelho, observar as trilhas da placa, identificar os capacitores e entender a lógica do engenheiro que o desenhou décadas atrás. Isso é Engenharia Reversa (RE). No mundo do software, é o processo de pegar um programa pronto — o "executável" que você clica para rodar — e desmontá-lo para entender como ele funciona, sem nunca ter visto o código-fonte original escrito pelo programador. É como aprender a ler uma "escrita secreta" que o computador usa para processar ordens. Ao dominar essa arte, você deixa de ser apenas um usuário e passa a ser alguém que consegue auditar segurança, encontrar falhas ocultas e entender o comportamento de malwares que tentam se esconder no sistema. É uma jornada de curiosidade profunda, onde cada byte conta uma história e cada instrução de assembly é um passo na mente de quem criou o software.`,
    codes: [
      {
        lang: "c",
        code: "// O código original que o programador escreveu\n#include <stdio.h>\nint main() {\n    printf(\"Olá, RE!\\n\"); // Uma mensagem simples\n    return 0;\n}",
        label: "Código Fonte (C)"
      },
      {
        lang: "assembly",
        code: "; O que o computador realmente executa (x64 Assembly)\nmov rax, 1          ; syscall: sys_write\nmov rdi, 1          ; file descriptor: stdout\nmov rsi, message    ; endereço da string\nmov rdx, 9          ; tamanho da string\nsyscall             ; chama o kernel",
        label: "Assembly (Visão do RE)"
      },
      {
        lang: "text",
        code: "48 c7 c0 01 00 00 00   ; O 'op-code' (hexadecimal)\n48 c7 c7 01 00 00 00\n48 c7 c6 ...",
        label: "Bytecode (O binário real)"
      },
      {
        lang: "bash",
        code: "strings programa.exe | grep \"Olá\"\n# O comando 'strings' tenta achar texto dentro do binário\n# Uma técnica básica de RE para começar a investigação",
        label: "Exploração Básica"
      }
    ],
    points: [
      "Compreender o funcionamento interno de softwares sem acesso ao código-fonte.",
      "Identificar vulnerabilidades de segurança e falhas lógicas.",
      "Analisar o comportamento de códigos maliciosos (malware analysis).",
      "Interoperabilidade: fazer dois sistemas conversarem sem documentação.",
      "Desenvolver habilidades de resolução de problemas extremamente complexos.",
      "Aprender como compiladores transformam lógica humana em instruções de máquina."
    ],
    alerts: [
      {
        type: "tip",
        content: "RE não é apenas sobre quebrar proteções, é sobre curiosidade e aprendizado profundo de sistemas."
      },
      {
        type: "info",
        content: "Neste livro, focaremos no Ghidra, mas os conceitos se aplicam a qualquer ferramenta de análise."
      }
    ]
  },
  {
    slug: "o-que-e-ghidra",
    section: "boas-vindas",
    title: "O que é o Ghidra?",
    difficulty: "iniciante",
    subtitle: "A ferramenta de elite da NSA ao seu alcance",
    intro: `Se a Engenharia Reversa é como desmontar um motor de carro, o Ghidra é a sua oficina mecânica completa e profissional, com todas as ferramentas de ponta que você possa imaginar. Desenvolvido pela NSA (Agência de Segurança Nacional dos EUA) e lançado como código aberto em 2019, o Ghidra mudou o jogo. Antes dele, se você quisesse uma ferramenta desse nível, teria que desembolsar milhares de dólares no IDA Pro. O Ghidra oferece um ambiente de análise sofisticado, com um decompilador poderoso que tenta traduzir aquele assembly "feio" de volta para algo parecido com a linguagem C, tornando a vida do analista muito mais fácil. É como ter um tradutor universal para dialetos esquecidos de computador. Ele suporta uma infinidade de arquiteturas, desde processadores de computador comum (x86/x64) até chips de celulares (ARM) e até consoles de videogame antigos. O Ghidra não é apenas um visualizador; ele é um framework que permite automatizar tarefas com scripts em Python e Java, sendo uma escolha robusta tanto para quem está começando quanto para especialistas que caçam vulnerabilidades em larga escala.`,
    codes: [
      {
        lang: "bash",
        code: "./ghidraRun\n# Comando básico para iniciar no Linux ou macOS\n# Certifique-se de estar no diretório extraído",
        label: "Iniciando no Linux/Mac"
      },
      {
        lang: "cmd",
        code: "ghidraRun.bat\n:: Script de inicialização no Windows\n:: Ele abrirá o console e depois a interface gráfica",
        label: "Iniciando no Windows"
      },
      {
        lang: "bash",
        code: "ls -R ghidra_11.0.3_PUBLIC/\n# Estrutura de pastas: \n# /Ghidra: Binários principais\n# /Docs: Documentação oficial (leitura obrigatória!)\n# /Extensions: Onde os plugins vivem",
        label: "Estrutura de Pastas"
      },
      {
        lang: "text",
        code: "Analyzing: [Nome do Binário]\nProcessor: x86:LE:64:default\nFormat: Executable and Linking Format (ELF)\n# Informações que o Ghidra mostra logo no início",
        label: "Feedback de Identificação"
      }
    ],
    points: [
      "Software de código aberto e gratuito desenvolvido pela NSA.",
      "Inclui um dos melhores decompiladores gratuitos do mercado.",
      "Suporte multi-plataforma: Windows, Linux e macOS.",
      "Arquitetura baseada em plugins e extensível via scripts.",
      "Suporta uma vasta gama de arquiteturas de processadores.",
      "Permite análise colaborativa em projetos compartilhados.",
      "Diferente de debuggers, o Ghidra foca em análise estática.",
      "Interface altamente customizável para diferentes fluxos de trabalho."
    ],
    alerts: [
      {
        type: "success",
        content: "O Ghidra é gratuito! Você tem em mãos uma ferramenta que custaria uma fortuna em versões comerciais."
      },
      {
        type: "warning",
        content: "Por ser escrito em Java, o Ghidra pode consumir bastante memória RAM em binários grandes."
      }
    ]
  },
  {
    slug: "historia-re",
    section: "boas-vindas",
    title: "Uma Breve História do Reverse Engineering",
    difficulty: "iniciante",
    subtitle: "Dos laboratórios secretos ao seu computador",
    intro: `A história da Engenharia Reversa é digna de um filme de espionagem. Nos anos 60 e 70, o foco era quase todo em hardware: empresas desmontavam chips de concorrentes para entender como economizar em transistores ou aumentar a velocidade. Com a explosão dos softwares nos anos 80, a batalha mudou para o código. Um caso icônico foi a criação dos clones do IBM PC, onde engenheiros usaram RE para replicar a BIOS sem infringir direitos autorais, usando a técnica de "Clean Room". Imagine que um grupo de pessoas lê o manual e diz o que o código faz, e outro grupo, que nunca viu o original, escreve um novo código baseado apenas nessas instruções. Na segurança moderna, o RE foi crucial para conter ameaças globais. Quando o malware WannaCry paralisou hospitais em 2017, foi através da engenharia reversa que um pesquisador encontrou um "kill switch" que interrompeu o ataque. O Ghidra foi a arma secreta da NSA por décadas antes de ser revelado ao mundo em uma conferência RSA, mostrando que o conhecimento de defesa precisa ser compartilhado para fortalecer toda a comunidade de segurança.`,
    codes: [
      {
        lang: "text",
        code: "1982: Phoenix Technologies clona a BIOS da IBM usando RE\n1990: Início da análise de malwares complexos em laboratórios\n2000: RE do Skype revela protocolos proprietários de comunicação\n2019: NSA libera o Ghidra para o público geral",
        label: "Linha do Tempo RE"
      },
      {
        lang: "text",
        code: "WannaCry Kill Switch:\nif (get_request(\"http://www.iuqerfsodp9ifjaposdfjhgosurijfaewrwergwea.com\")) {\n    exit(0); // O malware parava se o domínio existisse\n}",
        label: "Exemplo WannaCry (Lógica Simplificada)"
      },
      {
        lang: "bash",
        code: "# Antigamente usava-se muito o 'DEBUG.EXE' no DOS\ndebug programa.com\n-u  ; Unassemble as instruções",
        label: "Ferramentas Arcaicas"
      },
      {
        lang: "text",
        code: "NSA Slogan Interno: 'Nós aprendemos com os outros'\nAbertura do Ghidra: Fomento à transparência e educação cibernética.",
        label: "Filosofia do Ghidra"
      }
    ],
    points: [
      "Evoluiu de hardware físico para algoritmos complexos de software.",
      "Técnica de 'Clean Room Design' foi essencial para a indústria de clones de PC.",
      "Casos como Samba e WINE dependem de RE para interoperabilidade.",
      "A análise do malware Stuxnet é um dos marcos mais famosos da RE de elite.",
      "A liberação do Ghidra em 2019 democratizou o acesso a ferramentas de nível estatal.",
      "RE é fundamental para a preservação de softwares antigos (abandonware).",
      "Históricamente usada para encontrar backdoors em criptografia.",
      "Essencial na guerra contra malwares e ransomwares modernos."
    ],
    alerts: [
      {
        type: "info",
        content: "Muitos protocolos que usamos hoje só funcionam em sistemas diferentes graças ao trabalho de RE de voluntários."
      },
      {
        type: "danger",
        content: "Atenção: Sempre pratique RE em ambientes controlados quando lidar com malwares reais."
      }
    ]
  },
  {
    slug: "onde-ghidra-e-usado",
    section: "boas-vindas",
    title: "Para que o Ghidra é Usado?",
    difficulty: "iniciante",
    subtitle: "As infinitas possibilidades da análise estática",
    intro: `Onde existe um arquivo executável sem manual de instruções, o Ghidra pode estar presente. Imagine um perito digital tentando descobrir como um invasor conseguiu entrar em um servidor: ele usará o Ghidra para analisar o binário deixado pelo hacker e entender quais "portas" ele abriu. Ou pense em um pesquisador de segurança em uma empresa de antivírus, como a Kaspersky ou CrowdStrike; o Ghidra é seu microscópio para dissecar vírus e vacinar sistemas. Além do mundo das ameaças, o RE é vital para a interoperabilidade. Se você quer fazer um programa moderno de Linux abrir arquivos de um software de contabilidade dos anos 90 que não existe mais, o Ghidra te ajuda a ler o formato dos dados. No mundo dos games, entusiastas usam RE para criar traduções de jogos que nunca chegaram ao Brasil ou para corrigir bugs que os desenvolvedores originais abandonaram. É uma habilidade valorizada em carreiras de elite na tecnologia, desde Pentesters (hackers éticos) até arquitetos de sistemas que precisam garantir que o código final não tem segredos indesejados.`,
    codes: [
      {
        lang: "text",
        code: "Setores que usam Ghidra:\n1. Segurança Ofensiva (Red Team)\n2. Defesa Cibernética (Blue Team)\n3. Forense Digital\n4. Desenvolvimento de Drivers e Kernels",
        label: "Áreas de Atuação"
      },
      {
        lang: "text",
        code: "Empresa X quer conectar seu ERP a um hardware legado Y.\nHardware Y não tem documentação da API.\nRE é usado para mapear as chamadas de função no binário do driver.",
        label: "Cenário: Interoperabilidade"
      },
      {
        lang: "text",
        code: "Competições Capture The Flag (CTF):\nDesafios de 'Rev' exigem encontrar uma 'flag' escondida em um binário.\nGhidra é a ferramenta principal dos competidores.",
        label: "Cenário: CTF"
      },
      {
        lang: "bash",
        code: "# Exemplo de comando para analistas de malware\nsha256sum malicioso.exe\n# Antes de abrir no Ghidra, identificamos o arquivo unicamente.",
        label: "Preparação de Análise"
      }
    ],
    points: [
      "Auditoria de segurança em softwares de terceiros.",
      "Descoberta de vulnerabilidades 'Zero-Day'.",
      "Análise e engenharia reversa de firmware de dispositivos IoT.",
      "Modificação de jogos e criação de patches de compatibilidade.",
      "Verificação de conformidade e busca por backdoors.",
      "Recuperação de algoritmos de sistemas legados sem documentação.",
      "Ensino de arquitetura de computadores e sistemas operacionais.",
      "Desenvolvimento de emuladores para consoles antigos."
    ],
    alerts: [
      {
        type: "tip",
        content: "A carreira de analista de malware é uma das mais bem pagas na área de segurança ofensiva."
      },
      {
        type: "info",
        content: "Grandes empresas de tecnologia possuem times dedicados apenas para fazer RE de seus próprios produtos em busca de falhas."
      }
    ]
  },
  {
    slug: "como-usar-este-livro",
    section: "boas-vindas",
    title: "Como Aproveitar Este Livro ao Máximo",
    difficulty: "iniciante",
    subtitle: "Transformando teoria em prática real",
    intro: `Aprender Engenharia Reversa é como aprender a tocar um instrumento musical: ler a partitura é importante, mas você só vai tocar bem se colocar as mãos nas teclas. Este livro foi desenhado para ser o seu guia prático. Não tente ler tudo de uma vez como se fosse um romance. O segredo aqui é o aprendizado ativo. Sempre que encontrar um snippet de código ou uma explicação de como abrir uma janela no Ghidra, pare e faça exatamente isso no seu computador. Imagine que você está seguindo uma receita de bolo bem detalhada: se você pular a etapa de bater as claras em neve, o resultado final não será o mesmo. Recomendamos que você tenha o Ghidra aberto em uma tela (ou metade da tela) e este livro na outra. Não tenha medo de clicar em botões que você não conhece ou de "quebrar" a análise; o binário original continuará intacto e você pode sempre recomeçar o projeto. A curiosidade é sua melhor ferramenta, e a paciência será sua maior aliada quando o código parecer confuso.`,
    codes: [
      {
        lang: "text",
        code: "Setup Ideal:\n- Monitor 1: Ghidra (Code Browser + Decompiler)\n- Monitor 2: Este Livro + Referência de Instruções x86\n- Um bloco de notas (físico ou digital) para rascunhos de lógica",
        label: "Ambiente de Estudo"
      },
      {
        lang: "text",
        code: "Fluxo Sugerido:\n1. Leia o conceito\n2. Tente replicar o código/comando\n3. Mude um parâmetro e veja o que acontece\n4. Explique para si mesmo o que o Ghidra mostrou",
        label: "Método de Estudo"
      },
      {
        lang: "bash",
        code: "# Mantenha uma pasta organizada para seus experimentos\nmkdir -p ~/estudos-re/capitulo-1\n# Salve os binários de teste aqui",
        label: "Organização"
      },
      {
        lang: "text",
        code: "Dica de Ouro:\nSe o assembly estiver difícil, olhe para o Decompiler.\nSe o Decompiler estiver confuso, volte para o Assembly.",
        label: "Dica de Navegação"
      }
    ],
    points: [
      "Pratique cada exemplo logo após a leitura.",
      "Não tenha pressa: RE exige tempo para que o cérebro processe a lógica de baixo nível.",
      "Use as seções de 'pontos-chave' para revisar o que aprendeu.",
      "Os alertas coloridos contêm dicas valiosas que poupam horas de frustração.",
      "Participe de comunidades e fóruns de RE para trocar conhecimentos.",
      "Tente explicar os conceitos para outra pessoa; isso solidifica o aprendizado.",
      "Sempre comece por binários simples antes de pular para malwares complexos.",
      "Mantenha o Ghidra atualizado para aproveitar as últimas melhorias do decompilador."
    ],
    alerts: [
      {
        type: "tip",
        content: "A tecla 'G' no Ghidra é sua melhor amiga para navegar rapidamente para endereços de memória."
      },
      {
        type: "success",
        content: "Ao final de cada capítulo, você terá uma nova 'peça do quebra-cabeça' para entender softwares complexos."
      }
    ]
  }
];
