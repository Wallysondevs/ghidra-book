import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "visao-geral-interface",
    section: "interface",
    title: "Visão Geral da Interface do Ghidra",
    difficulty: "iniciante",
    subtitle: "Navegando pela nave-mãe da engenharia reversa",
    intro: "Entrar no Ghidra pela primeira vez é como sentar no cockpit de um Boeing 747 sem nunca ter pilotado nem um teco-teco. A interface é densa, cheia de janelas, botões e termos técnicos que podem assustar. Mas relaxe, a lógica por trás é muito parecida com a de uma oficina organizada. Imagine que você tem uma bancada central (o Code Browser) onde o motor que você está desmontando fica exposto, e ao redor dela, prateleiras com ferramentas (janelas de suporte). O segredo do Ghidra é que ele não é apenas um programa, mas uma suíte de ferramentas integradas. Tudo começa no 'Project Manager', que funciona como a garagem onde você guarda seus carros (projetos). Uma vez que você abre um arquivo para análise, você entra no 'Code Browser', que é onde a mágica acontece de verdade. O mais legal é que a interface é totalmente 'drag-and-drop': se você não gosta de onde o Decompilador está, basta arrastá-lo e encaixá-lo onde preferir, como se estivesse organizando os móveis da sua sala para ver melhor a TV.",
    codes: [
      {
        lang: "bash",
        code: "./ghidraRun # Comando para iniciar o Ghidra no Linux/macOS",
        label: "Iniciando o Ghidra"
      },
      {
        lang: "text",
        code: "File -> New Project -> Non-Shared -> Project Name",
        label: "Fluxo para criar um novo projeto"
      },
      {
        lang: "text",
        code: "Window -> [Nome da Janela] # Caminho para recuperar janelas fechadas",
        label: "Recuperando janelas"
      },
      {
        lang: "text",
        code: "Edit -> Tool Options # Onde você muda o tema e cores (importante para o descanso visual!)",
        label: "Personalização"
      }
    ],
    points: [
      "O Project Manager é o gestor de arquivos e pastas dos seus projetos",
      "O Code Browser é a ferramenta principal de análise e visualização de código",
      "Interface baseada em 'Docking Windows' (janelas encaixáveis)",
      "Você pode salvar layouts personalizados para diferentes tipos de análise",
      "O 'Tool Chest' permite abrir ferramentas específicas como o 'Symbol Debugger'",
      "A análise automática começa assim que você abre um arquivo no Code Browser",
      "Cada janela (Provider) pode ser flutuante ou acoplada",
      "O 'Help' do Ghidra é extremamente detalhado e acessível por F1"
    ],
    alerts: [
      {
        type: "info",
        content: "O Ghidra salva o estado das janelas automaticamente ao fechar a ferramenta."
      },
      {
        type: "tip",
        content: "Use o 'Tool Options' para configurar o 'Dark Mode' se seus olhos cansarem com o fundo branco padrão."
      }
    ]
  },
  {
    slug: "code-browser",
    section: "interface",
    title: "O Code Browser: Seu Cockpit de Análise",
    difficulty: "iniciante",
    subtitle: "Onde o código bruto se transforma em conhecimento",
    intro: "Se o Ghidra é uma oficina, o Code Browser é a sua bancada principal. É aqui que você passará 90% do seu tempo. Ele foi desenhado para te dar 'visão de raio-x' sobre o binário. Imagine ler um livro onde, na página da esquerda, você tem o texto original em Latim (o Assembly) e, na página da direita, uma tradução moderna em Português (o Decompilador). O Code Browser mantém essas duas visões sincronizadas: se você clica em uma linha de código no decompilador, o assembly correspondente é destacado instantaneamente, e vice-versa. Além disso, a barra de ferramentas superior é recheada de atalhos que agilizam a vida. Navegar por um binário gigante sem atalhos é como tentar atravessar São Paulo a pé; com os atalhos certos (G, L, ;), você está de Ferrari. Aprender a dominar o Code Browser é a diferença entre um analista que 'se perde' e um que 'caça' vulnerabilidades com precisão cirúrgica.",
    codes: [
      {
        lang: "text",
        code: "G # Atalho 'Goto': Digite um endereço ou nome de função para saltar até lá",
        label: "Navegação rápida"
      },
      {
        lang: "text",
        code: "L # Atalho 'Label': Renomeia uma variável ou endereço genérico para algo legível",
        label: "Organização"
      },
      {
        lang: "text",
        code: "; # Atalho 'Comment': Adiciona um comentário na linha atual (essencial para não se perder)",
        label: "Documentação"
      },
      {
        lang: "text",
        code: "Ctrl + F # Busca por texto ou bytes no binário",
        label: "Busca"
      },
      {
        lang: "text",
        code: "Alt + Left/Right # Navega pelo histórico de onde você clicou (como o 'Voltar' do navegador)",
        label: "Histórico de navegação"
      }
    ],
    points: [
      "Sincronização bidirecional entre Listing (ASM) e Decompiler",
      "Barra de localização no topo mostra o endereço atual da memória",
      "O campo de filtro na Symbol Tree ajuda a achar funções rapidamente",
      "Marcadores visuais na barra lateral indicam referências e erros",
      "A barra de status inferior mostra o progresso da análise automática",
      "Renomear variáveis (L) propaga o nome por todo o programa",
      "Comentários (;) podem ser de vários tipos: Pre, Post, EOL, Plate",
      "Snapshots permitem salvar estados específicos da sua análise"
    ],
    alerts: [
      {
        type: "warning",
        content: "Sempre renomeie funções genéricas como FUN_00401234 conforme descobrir o que elas fazem. Isso reduz a carga cognitiva."
      },
      {
        type: "success",
        content: "O atalho 'G' aceita nomes de funções, não apenas endereços hexadecimais!"
      }
    ]
  },
  {
    slug: "function-graph",
    section: "interface",
    title: "O Grafo de Funções (Function Graph)",
    difficulty: "iniciante",
    subtitle: "Visualizando a árvore de decisões do código",
    intro: "Às vezes, ler milhares de linhas de código é exaustivo e confuso. É como tentar entender o mapa de um labirinto lendo uma descrição textual. O 'Function Graph' resolve isso transformando a função em um fluxograma visual. Cada 'caixinha' no grafo representa um 'bloco básico' (Basic Block), que é uma sequência de instruções que sempre são executadas juntas, sem desvios. As setas entre os blocos mostram as decisões: a seta verde geralmente é o caminho 'Sim' (condição verdadeira), a vermelha é o 'Não' (falsa) e a azul é um salto incondicional. Ver o grafo permite que você identifique padrões instantaneamente: um 'if-else' parece um diamante, um 'loop' parece um círculo que volta para cima. É a ferramenta perfeita para entender a lógica de algoritmos complexos de checagem de senha ou criptografia sem precisar ler cada instrução assembly individualmente.",
    codes: [
      {
        lang: "text",
        code: "Window -> Function Graph # Como abrir a visualização",
        label: "Abrindo o Grafo"
      },
      {
        lang: "text",
        code: "Verde -> Condição atendida (Jump Taken)",
        label: "Convenção de cores (Padrão)"
      },
      {
        lang: "text",
        code: "Vermelho -> Condição não atendida (Jump Not Taken)",
        label: "Convenção de cores (Padrão)"
      },
      {
        lang: "text",
        code: "Azul -> Fluxo contínuo ou salto direto",
        label: "Convenção de cores (Padrão)"
      }
    ],
    points: [
      "Transforma código linear em visualização de fluxo de controle (CFG)",
      "Permite identificar loops e estruturas condicionais visualmente",
      "Blocos básicos terminam sempre em uma instrução de salto ou retorno",
      "Interatividade total: clicar no grafo move o Code Browser",
      "É possível agrupar blocos para simplificar funções gigantescas",
      "O layout pode ser alterado (hierárquico, orgânico, etc.)",
      "Ajuda a encontrar caminhos 'mortos' no código (que nunca são executados)",
      "Essencial para análise de algoritmos de proteção"
    ],
    alerts: [
      {
        type: "tip",
        content: "Use o scroll do mouse para dar zoom. Em funções muito grandes, o 'overview' no canto ajuda a se localizar."
      },
      {
        type: "info",
        content: "Se o grafo parecer uma maçaroca de fios, tente mudar o layout para 'Compact Hierarchical'."
      }
    ]
  },
  {
    slug: "decompiler-window",
    section: "interface",
    title: "A Janela do Decompilador",
    difficulty: "iniciante",
    subtitle: "O tradutor universal de assembly para C",
    intro: "Se o Assembly é o 'baixo nível' onde as máquinas conversam, o Decompilador é o tradutor que traz essa conversa para o nosso mundo. Ele pega os bytes crus e as instruções complexas de processador e tenta reconstruir um código em linguagem C. Mas atenção: ele não 'recupera' o código original do programador. Ele cria uma 'interpretação' baseada na lógica que encontrou. Isso significa que nomes de variáveis locais e comentários originais foram perdidos na compilação e não estarão lá. O que o Ghidra nos dá é um 'Pseudo-C' legível. É como pegar um bolo pronto e tentar deduzir a receita original; você sabe que vai farinha e ovos, mas não sabe a marca da farinha. O decompilador é absurdamente poderoso porque ele lida com detalhes chatos como a manipulação da pilha (stack) e registradores, permitindo que você foque na lógica do programa.",
    codes: [
      {
        lang: "c",
        code: "// Exemplo de Pseudo-C gerado pelo Ghidra\nvoid FUN_00401234(int param_1) {\n    if (param_1 == 0x7b) {\n        puts(\"Acesso garantido!\");\n    }\n    return;\n}",
        label: "Exemplo de Decompilação"
      },
      {
        lang: "text",
        code: "Ctrl + E # Atalho para focar na janela do Decompiler",
        label: "Atalho rápido"
      },
      {
        lang: "text",
        code: "Right Click -> Commit Locals # Salva os nomes de variáveis que você editou",
        label: "Consolidando análise"
      }
    ],
    points: [
      "Gera código em C a partir de qualquer arquitetura suportada",
      "Sincronizado com a visão de Listagem (ASM)",
      "Permite renomear variáveis e mudar tipos de dados (Casting)",
      "Simplifica operações matemáticas complexas que no ASM seriam várias linhas",
      "Lida com convenções de chamada de funções automaticamente",
      "O código gerado é editável apenas para fins de análise (renomeação/tipagem)",
      "Ideal para entender fluxos lógicos e chamadas de API",
      "Pode ser configurado para mostrar ou esconder casts excessivos"
    ],
    alerts: [
      {
        type: "danger",
        content: "Nunca confie 100% no decompilador. Ele pode cometer erros de interpretação em códigos ofuscados ou malformados."
      },
      {
        type: "info",
        content: "As variáveis que começam com 'uVar', 'iVar' ou 'local_' são nomes genéricos criados pelo Ghidra."
      }
    ]
  },
  {
    slug: "symbol-tree",
    section: "interface",
    title: "A Árvore de Símbolos (Symbol Tree)",
    difficulty: "iniciante",
    subtitle: "O índice remissivo do seu binário",
    intro: "Imagine tentar encontrar um capítulo específico em um livro de 2.000 páginas sem índice. Impossível, certo? A 'Symbol Tree' é o índice do seu binário. Ela organiza tudo o que o Ghidra conseguiu identificar em categorias lógicas: 'Imports' (quais funções de fora o programa usa), 'Exports' (quais funções ele oferece para outros), 'Functions' (o código dele mesmo) e 'Labels' (locais específicos na memória). Quando você abre um programa e quer saber se ele acessa a internet, você não sai lendo o código do zero; você vai na Symbol Tree, expande os Imports e procura por termos como 'socket', 'connect' ou 'InternetOpen'. É o seu ponto de partida estratégico. Se você encontrar uma função chamada 'validate_license', parabéns, você acabou de encontrar o alvo da sua análise apenas olhando o índice!",
    codes: [
      {
        lang: "text",
        code: "Imports -> kernel32.dll -> CreateFileA # Exemplo de busca por API de sistema",
        label: "Navegando em Imports"
      },
      {
        lang: "text",
        code: "Functions -> FUN_00401000 # Função identificada sem nome (símbolos removidos)",
        label: "Função 'Stripped'"
      },
      {
        lang: "text",
        code: "Filter: [digite aqui] # Campo de busca rápida na base da Symbol Tree",
        label: "Filtragem"
      }
    ],
    points: [
      "Organiza o binário em Imports, Exports, Functions, Labels e Classes",
      "Essencial para identificar bibliotecas externas utilizadas",
      "O filtro rápido permite achar funções por nome em segundos",
      "Agrupa funções por Namespaces em programas C++ ou Java",
      "Permite ver todas as funções que o Ghidra detectou automaticamente",
      "É possível criar seus próprios símbolos para marcar áreas de interesse",
      "Mostra se o binário tem informações de debug (símbolos preservados)",
      "Facilita a navegação em DLLs complexas"
    ],
    alerts: [
      {
        type: "info",
        content: "FUN_XXXXXXXX significa que a função foi detectada, mas o nome original foi removido (stripped). O número é o endereço de memória."
      },
      {
        type: "tip",
        content: "Sempre verifique a pasta 'Imports' primeiro para entender o 'poder' do programa (se ele deleta arquivos, usa rede, etc)."
      }
    ]
  },
  {
    slug: "listing-view",
    section: "interface",
    title: "A Visão de Listagem (Listing)",
    difficulty: "iniciante",
    subtitle: "Onde o metal encontra o código",
    intro: "A 'Listing View' é o coração tradicional da engenharia reversa. Enquanto o decompilador tenta ser amigável, a Listagem te mostra a realidade nua e crua: endereços de memória, bytes em hexadecimal e as instruções Assembly correspondentes. Se o decompilador é a tradução, a Listagem é o manuscrito original. Aqui você vê exatamente o que o processador vai executar. É nesta janela que você define o que é código (pressionando 'C') e o que é dado (pressionando 'D'). O Ghidra colore as instruções para facilitar a leitura: instruções de salto podem ter uma cor, chamadas de função outra. É a visão mais precisa, permitindo que você veja detalhes que o decompilador pode omitir, como a manipulação exata de flags do processador ou truques de ofuscação de baixo nível.",
    codes: [
      {
        lang: "asm",
        code: "00401234  55           PUSH  EBP        ; Prólogo da função\n00401235  8b ec        MOV   EBP, ESP   ; Configura o frame de pilha",
        label: "Visão típica do Listing"
      },
      {
        lang: "text",
        code: "D # Transforma os bytes selecionados em Dados (Data)",
        label: "Definindo dados"
      },
      {
        lang: "text",
        code: "C # Transforma os bytes selecionados em Código (Code)",
        label: "Definindo código"
      },
      {
        lang: "text",
        code: "U # Transforma em 'Undefined' (limpa a definição)",
        label: "Limpando análise"
      }
    ],
    points: [
      "Exibição detalhada: Endereço | Bytes | Opcode | Operandos",
      "Permite criar e editar comentários em diversas posições",
      "Suporte a 'Data Types' complexos (Arrays, Structs) diretamente na visualização",
      "Colorização semântica automática para melhorar a legibilidade",
      "Mostra referências cruzadas (XREFs) logo acima das funções e dados",
      "É o local principal para realizar 'Patching' (alterar bytes do binário)",
      "Permite criar Labels (L) para marcar endereços importantes",
      "Visualização de bytes crus ao lado da instrução (Field: Bytes)"
    ],
    alerts: [
      {
        type: "warning",
        content: "Às vezes o Ghidra confunde dados com código. Use 'U' para desmanchar e 'C' ou 'D' para corrigir manualmente."
      },
      {
        type: "success",
        content: "Pressionar 'P' em cima de um endereço define aquele local como o início de uma Função (Function)."
      }
    ]
  },
  {
    slug: "cross-references",
    section: "interface",
    title: "Cross-References: Quem Chama Quem?",
    difficulty: "iniciante",
    subtitle: "Seguindo os fios da teia de execução",
    intro: "Em engenharia reversa, o contexto é tudo. Se você encontra uma função que deleta um arquivo, a pergunta imediata é: 'Quem acionou essa função?'. É aqui que entram as Cross-References (XREFs). Elas são como links mágicos que dizem: 'Este dado aqui é lido por estas 3 funções' ou 'Esta função é chamada nestes 10 lugares'. Sem XREFs, você seria como um detetive que encontra uma arma, mas não consegue saber quem a segurou. No Ghidra, as XREFs aparecem como pequenos comentários automáticos acima de nomes de funções ou variáveis. Ao clicar nelas, você vê uma lista completa de todos os 'culpados'. É a ferramenta mais poderosa para mapear o comportamento de um programa e entender a jornada de um dado desde a entrada do usuário até o processamento final.",
    codes: [
      {
        lang: "text",
        code: "Right Click -> References -> Show References to [Símbolo]",
        label: "Caminho pelo menu"
      },
      {
        lang: "text",
        code: "X # Atalho rápido para ver referências do símbolo sob o cursor",
        label: "Atalho essencial"
      },
      {
        lang: "text",
        code: "[XREF] -> CALL FUN_00401000 # Indica que a função é chamada no endereço indicado",
        label: "Exemplo de XREF de chamada"
      },
      {
        lang: "text",
        code: "[XREF] -> MOV EAX, [DAT_00403000] # Indica que o dado é lido",
        label: "Exemplo de XREF de leitura"
      }
    ],
    points: [
      "XREFs mostram onde uma função é chamada (Code Reference)",
      "XREFs mostram onde um dado é lido ou escrito (Data Reference)",
      "Permitem navegar 'para trás' na lógica do programa",
      "Ajudam a identificar se uma função é 'morta' (nunca referenciada)",
      "São atualizadas em tempo real conforme você renomeia funções",
      "Podem ser visualizadas em formato de lista ou gráfico",
      "Essenciais para entender o impacto de uma mudança (patching)",
      "Mostram o tipo de acesso: Read (R), Write (W) ou Call (C)"
    ],
    alerts: [
      {
        type: "tip",
        content: "Sempre use o atalho 'X' sobre uma função para ver quão importante ela é no fluxo global."
      },
      {
        type: "info",
        content: "Se uma função não tem XREFs, ela pode ser o Entry Point ou código morto."
      }
    ]
  },
  {
    slug: "console-log-ghidra",
    section: "interface",
    title: "Console e Log do Ghidra",
    difficulty: "iniciante",
    subtitle: "Ouvindo o que o Ghidra tem a dizer",
    intro: "O Ghidra é uma ferramenta complexa que trabalha muito 'por baixo do capô'. Enquanto você analisa o código, ele está rodando dezenas de scripts de análise automática, identificando padrões e tipos de dados. O 'Console' e o 'Log' são as janelas onde ele reporta como está se saindo. Se algo der errado na análise automática, se um script Python que você baixou falhar, ou se você quiser rodar um comando rápido, é aqui que você olha. O Console não serve apenas para erros; ele é o terminal de saída de toda a automação. Para quem quer automatizar tarefas repetitivas, o console se torna o melhor amigo, exibindo os resultados de buscas complexas ou logs de descompactação de malware executados via scripts.",
    codes: [
      {
        lang: "text",
        code: "Window -> Console # Onde a mágica do log aparece",
        label: "Abrindo o Console"
      },
      {
        lang: "text",
        code: "print(\"Hello Ghidra\") # Exemplo de saída de um script Python no console",
        label: "Saída de script"
      },
      {
        lang: "text",
        code: "Clear Icon (Vassourinha) # Limpa as mensagens acumuladas",
        label: "Limpeza"
      }
    ],
    points: [
      "Exibe mensagens de erro, avisos e informações da análise",
      "É o destino final de todas as mensagens de scripts (Java/Python)",
      "Permite acompanhar o progresso de tarefas longas em segundo plano",
      "Ajuda a debugar por que o decompilador não conseguiu processar uma função",
      "Mostra detalhes técnicos sobre a importação de arquivos",
      "Pode ser usado para interagir com scripts em tempo real",
      "O histórico de logs pode ser salvo em arquivo para análise posterior",
      "Indispensável para desenvolvedores de scripts e plugins"
    ],
    alerts: [
      {
        type: "warning",
        content: "Se o console estiver piscando em vermelho, algo na análise automática falhou. Verifique a mensagem!"
      },
      {
        type: "info",
        content: "Muitos scripts de terceiros imprimem resultados úteis (como chaves de criptografia encontradas) diretamente no Console."
      }
    ]
  }
];
