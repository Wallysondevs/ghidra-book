import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "introducao-scripting",
    section: "scripting",
    title: "Por que Automatizar? Introdução ao Scripting",
    difficulty: "iniciante",
    subtitle: "Deixando o trabalho pesado para o computador",
    intro: "Imagine que você recebeu um desafio monumental: analisar um software bancário que contém mais de 50.000 funções diferentes. Se você fosse analisar uma função por minuto, sem parar nem para dormir ou tomar aquele cafezinho brasileiro, levaria mais de um mês apenas para olhar cada uma delas uma única vez. Na engenharia reversa, tempo é um recurso escasso. O scripting no Ghidra é como ter um exército de estagiários robôs que nunca cansam e seguem suas instruções à risca. Enquanto a análise manual permite entender a semântica profunda, os scripts brilham na execução de tarefas repetitivas, como renomear funções baseadas em padrões, buscar assinaturas criptográficas ou extrair dados para relatórios. Automatizar não é preguiça, é estratégia: você delega o volume de dados ao Ghidra e foca sua inteligência humana no que realmente importa.",
    codes: [
      {
        lang: "bash",
        code: "# No Ghidra, o Script Manager é sua central de controle\n# Localizado em: Window > Script Manager",
        label: "Acesso ao Script Manager"
      },
      {
        lang: "python",
        code: "# Exemplo simples em Python (Jython)\nprint(\"Olá do Ghidra! Estamos automatizando.\")",
        label: "Primeiro comando"
      }
    ],
    points: [
      "Escalabilidade: analise milhares de funções em segundos",
      "Consistência: evite erros humanos em tarefas repetitivas",
      "Reprodutibilidade: aplique a mesma lógica em diferentes binários",
      "Integração: use bibliotecas externas para processar dados",
      "Suporte Nativo: Java e Python 2.7 (Jython) integrados",
      "Script Manager: interface intuitiva para gerenciar scripts"
    ],
    alerts: [
      { type: "info", content: "O Ghidra usa Jython 2.7, o que significa que você tem acesso direto às classes Java dentro do Python." },
      { type: "tip", content: "Muitos scripts úteis já vêm instalados por padrão. Explore a pasta 'Examples' no Script Manager." }
    ]
  },
  {
    slug: "ghidra-script-api",
    section: "scripting",
    title: "A API do Ghidra: O que Você Pode Fazer",
    difficulty: "iniciante",
    subtitle: "Navegando pelo oceano de classes e métodos",
    intro: "Entrar na API do Ghidra pela primeira vez é como entrar em uma biblioteca gigante onde todos os livros estão em prateleiras que você ainda não conhece. A base de quase tudo o que você fará reside na classe `GhidraScript`, que herda de `FlatProgramAPI`. Pense na `FlatProgramAPI` como um canivete suíço: ela simplifica operações complexas em comandos diretos. Você quer saber onde o cursor está? Use `currentAddress`. Quer saber qual programa está aberto? `currentProgram`. Precisa mostrar uma mensagem na tela? `println`. A API permite que você manipule símbolos, tipos de dados, instruções e até o próprio decompilador. É um poder imenso que exige que você aprenda a consultar o 'mapa da mina': o JavaDoc da API, disponível localmente ou online, onde cada função disponível está documentada.",
    codes: [
      {
        lang: "java",
        code: "// Objetos principais disponíveis em qualquer GhidraScript:\n// currentProgram -> O binário aberto no momento\n// currentAddress -> O endereço onde o cursor está no Listing\n// monitor        -> Controla a barra de progresso e cancelamento\n// println()      -> Imprime no Console do Ghidra",
        label: "Variáveis Globais da API"
      }
    ],
    points: [
      "FlatProgramAPI: a interface simplificada para iniciantes",
      "currentProgram: acesso ao banco de dados do binário",
      "currentAddress: interação com a posição do usuário",
      "Monitoramento: como permitir que o usuário cancele scripts longos",
      "Navegação via Script: movendo o cursor programaticamente",
      "Consulta ao JavaDoc: a habilidade mais importante do desenvolvedor de scripts"
    ],
    alerts: [
      { type: "warning", content: "Sempre use o objeto 'monitor' em loops longos para evitar que o Ghidra trave se o script precisar ser interrompido." },
      { type: "success", content: "O JavaDoc pode ser acessado em Help -> Ghidra API Help dentro do próprio programa." }
    ]
  },
  {
    slug: "seu-primeiro-script-java",
    section: "scripting",
    title: "Seu Primeiro Script em Java",
    difficulty: "iniciante",
    subtitle: "Mãos à obra com a linguagem principal do Ghidra",
    intro: "Embora o Python seja muito popular pela sua simplicidade, o Java é a 'língua materna' do Ghidra. Escrever scripts em Java oferece vantagens como auto-complete superior (se você usar uma IDE como Eclipse ou IntelliJ) e acesso total sem as limitações do Jython. Um script Java no Ghidra é uma classe que estende `GhidraScript` e coloca toda a lógica dentro do método `run()`. É como uma receita de bolo: você define os ingredientes (variáveis) e o passo a passo (código). Ao executar, o Ghidra compila o código em tempo real e o aplica ao binário aberto. Veremos agora como criar um script que faz uma 'geral' no binário, identificando seu nome, endereço base e quantas funções ele possui, dando os primeiros passos na automação real.",
    codes: [
      {
        lang: "java",
        code: "import ghidra.app.script.GhidraScript;\nimport ghidra.program.model.listing.Function;\nimport ghidra.program.model.listing.FunctionIterator;\n\npublic class HelloGhidra extends GhidraScript {\n    @Override\n    public void run() throws Exception {\n        // Pega o nome do programa\n        String name = currentProgram.getName();\n        // Pega o endereço base de carregamento\n        String baseAddr = currentProgram.getImageBase().toString();\n        \n        println(\"--- Relatório do Binário ---\");\n        println(\"Nome: \" + name);\n        println(\"Endereço Base: \" + baseAddr);\n        \n        // Conta as funções\n        int count = 0;\n        FunctionIterator iter = currentProgram.getListing().getFunctions(true);\n        while (iter.hasNext() && !monitor.isCancelled()) {\n            iter.next();\n            count++;\n        }\n        \n        println(\"Total de Funções: \" + count);\n    }\n}",
        label: "HelloGhidra.java"
      }
    ],
    points: [
      "Estrutura básica: import, extends e run()",
      "Uso de FunctionIterator para percorrer o código",
      "Acesso a metadados do programa (Image Base, Name)",
      "Interação com o Console de saída",
      "Tratamento de exceções no script",
      "Compilação 'on-the-fly' pelo Ghidra"
    ],
    alerts: [
      { type: "tip", content: "Você pode usar o ícone 'New Script' (folha com sinal de +) no Script Manager para criar este arquivo rapidamente." }
    ]
  },
  {
    slug: "ghidrapy-python",
    section: "scripting",
    title: "Python no Ghidra: GhidraPy e Ghidra Bridge",
    difficulty: "iniciante",
    subtitle: "O melhor dos dois mundos",
    intro: "Para muitos, o Python é a linguagem do coração na cibersegurança. No Ghidra, temos duas formas principais de usá-lo. A nativa usa o Jython, que roda dentro da Máquina Virtual Java do Ghidra. A desvantagem é que o Jython está 'preso' na versão 2.7. Mas não desanime! Existe uma solução moderna chamada `Ghidra Bridge`. Ela funciona como uma ponte de rádio: você roda um script Python 3.x fora do Ghidra, e ele envia comandos via rede para um servidor rodando dentro do Ghidra. Isso permite usar bibliotecas modernas de Data Science, IA ou qualquer pacote do PyPI enquanto manipula o binário. É a flexibilidade total unida ao poder do Ghidra.",
    codes: [
      {
        lang: "python",
        code: "# Exemplo Jython (Python 2.7 nativo)\nfrom ghidra.program.model.listing import Function\n\nfm = currentProgram.getFunctionManager()\nfuncs = fm.getFunctions(True) # True para ordem ascendente\n\nfor f in funcs:\n    print(\"Função encontrada: %s em %s\" % (f.getName(), f.getEntryPoint()))",
        label: "Listagem de Funções (Jython)"
      },
      {
        lang: "python",
        code: "# Exemplo Ghidra Bridge (Python 3 Externo)\n# pip install ghidrabridge\nimport ghidrabridge\n\nwith ghidrabridge.GhidraBridge(namespace=globals()):\n    # Agora currentProgram e outros estão disponíveis no Python 3!\n    print(f\"Analisando: {currentProgram.getName()}\")",
        label: "Usando Ghidra Bridge"
      }
    ],
    points: [
      "Jython 2.7: integrado e sem necessidade de instalação extra",
      "Acesso a classes Java via Python: 'from ghidra... import...'",
      "Ghidra Bridge: usando Python 3 e bibliotecas modernas",
      "Comunicação via sockets entre Python e Ghidra",
      "Scripts de automação rápida com sintaxe Python",
      "Diferenças de performance entre Java nativo e Bridge"
    ],
    alerts: [
      { type: "danger", content: "O Jython não suporta bibliotecas que usam extensões em C, como o Pandas ou NumPy moderno. Para isso, use o Ghidra Bridge." }
    ]
  },
  {
    slug: "automatizar-renomear",
    section: "scripting",
    title: "Automatizando Renomeação de Funções",
    difficulty: "intermediario",
    subtitle: "Dando nome aos bois automaticamente",
    intro: "Um dos maiores obstáculos no RE são as funções com nomes genéricos como `FUN_00401234`. Muitas vezes, você percebe um padrão: 'toda função que chama a API de log e depois a de rede deve ser uma função de telemetria'. Fazer isso na mão para 100 funções é tedioso. Com um script, podemos iterar sobre todas as funções, olhar quem elas chamam (Cross-References de saída) e, se encontrarmos uma chamada para `malloc` seguida de um loop específico, podemos renomeá-la para `alloc_and_init`. Isso transforma um mar de endereços em um código legível e semântico em frações de segundo, preparando o terreno para uma análise muito mais profunda.",
    codes: [
      {
        lang: "java",
        code: "import ghidra.app.script.GhidraScript;\nimport ghidra.program.model.listing.*;\nimport ghidra.program.model.symbol.*;\n\npublic class RenameMallocFunctions extends GhidraScript {\n    public void run() throws Exception {\n        FunctionIterator iter = currentProgram.getListing().getFunctions(true);\n        while (iter.hasNext() && !monitor.isCancelled()) {\n            Function f = iter.next();\n            // Verifica se a função chama 'malloc'\n            for (Function called : f.getCalledFunctions(monitor)) {\n                if (called.getName().contains(\"malloc\")) {\n                    f.setName(\"mem_alloc_\" + f.getEntryPoint(), SourceType.USER_DEFINED);\n                    println(\"Renomeada: \" + f.getEntryPoint());\n                    break;\n                }\n            }\n        }\n    }\n}",
        label: "RenameByCall.java"
      }
    ],
    points: [
      "Iteração inteligente sobre o FunctionManager",
      "Análise de chamadas de função (Called Functions)",
      "Uso de SourceType.USER_DEFINED para garantir a mudança",
      "Evitando colisões de nomes com endereços de entrada",
      "Filtragem por padrões de strings nos nomes das APIs",
      "Feedback em tempo real no console de análise"
    ],
    alerts: [
      { type: "warning", content: "Cuidado ao renomear em massa! Sempre faça um backup ou use o 'Undo' do Ghidra se o resultado não for o esperado." }
    ]
  },
  {
    slug: "busca-pattern-matching",
    section: "scripting",
    title: "Buscando Padrões de Bytes no Binário",
    difficulty: "intermediario",
    subtitle: "Encontrando agulhas em palheiros binários",
    intro: "Muitas vezes, a chave para quebrar um malware ou entender um firmware não está no código, mas em um padrão de dados. Pode ser uma tabela de substituição (S-Box) do AES, uma chave XOR fixa ou uma assinatura de arquivo específica. O Ghidra permite buscar sequências de bytes (incluindo wildcards para bytes que variam) programaticamente. Em vez de usar o 'Search -> Memory' repetidamente, você pode escrever um script que varre o binário em busca de assinaturas conhecidas e coloca um 'Bookmark' (marcador) em cada local encontrado. Isso cria um mapa visual imediato das áreas de interesse, permitindo que você 'pule' direto para onde o processamento de dados crítico acontece.",
    codes: [
      {
        lang: "java",
        code: "import ghidra.app.script.GhidraScript;\nimport ghidra.program.model.address.*;\nimport ghidra.program.model.mem.*;\n\npublic class FindXorKey extends GhidraScript {\n    public void run() throws Exception {\n        // Padrão de bytes: 0x31 0x41 0x59 (π em hex parcial)\n        byte[] pattern = {0x31, 0x41, 0x59};\n        Address current = currentProgram.getMinAddress();\n        \n        while ((current = find(current, pattern)) != null) {\n            createBookmark(current, \"XOR_KEY\", \"Possível chave encontrada\");\n            println(\"Padrão em: \" + current);\n            current = current.add(1); // Continua busca após este endereço\n        }\n    }\n}",
        label: "PatternFinder.java"
      }
    ],
    points: [
      "Busca de assinaturas de bytes (Signature matching)",
      "Uso de Memory.findBytes() para performance",
      "Criação de Bookmarks para navegação visual",
      "Trabalhando com endereços e espaços de memória",
      "Identificação de constantes criptográficas",
      "Automatização de tarefas de triage inicial"
    ],
    alerts: [
      { type: "info", content: "A busca por padrões é extremamente útil para identificar algoritmos de compressão ou criptografia conhecidos através de suas constantes." }
    ]
  },
  {
    slug: "analise-em-batch",
    section: "scripting",
    title: "Analisando Múltiplos Binários em Série",
    difficulty: "intermediario",
    subtitle: "Produção em escala industrial",
    intro: "Você recebeu 500 amostras de uma nova campanha de phishing. Abrir uma por uma na interface gráfica do Ghidra levaria o dia todo apenas no tempo de carregar as janelas. O verdadeiro poder do scripting se revela quando você sai da interface gráfica e processa arquivos em 'Batch' (lote). Podemos criar um script que abre cada binário, executa a análise automática, extrai as strings e os endereços de rede, e salva tudo em um arquivo CSV. É como uma esteira de produção: o binário entra de um lado e os dados estruturados saem do outro. Essa técnica é fundamental para analistas de malware (Threat Intel) que precisam processar grandes volumes de dados diariamente.",
    codes: [
      {
        lang: "java",
        code: "// Nota: Este script é pensado para rodar via Headless ou no Script Manager\n// Ele pode iterar sobre arquivos em uma pasta do projeto Ghidra\nimport ghidra.app.script.GhidraScript;\nimport ghidra.framework.model.DomainFile;\nimport ghidra.framework.model.DomainFolder;\n\npublic class BatchReport extends GhidraScript {\n    public void run() throws Exception {\n        DomainFolder root = state.getProject().getProjectData().getRootFolder();\n        for (DomainFile file : root.getFiles()) {\n            println(\"Analisando: \" + file.getName());\n            // Lógica de extração aqui...\n        }\n    }\n}",
        label: "BatchProcessor.java"
      }
    ],
    points: [
      "Processamento sem intervenção humana",
      "Interação com o ProjectData e DomainFolder",
      "Geração de relatórios estruturados (CSV, JSON)",
      "Extração automática de IOCs (Indicators of Compromise)",
      "Otimização de tempo em triagens de larga escala",
      "Integração com bases de dados externas"
    ],
    alerts: [
      { type: "tip", content: "Para extração massiva de dados, prefira gerar arquivos CSV simples que podem ser importados no Excel ou bancos de dados." }
    ]
  },
  {
    slug: "exportando-dados",
    section: "scripting",
    title: "Exportando Dados do Ghidra para Outros Formatos",
    difficulty: "intermediario",
    subtitle: "Levando o conhecimento para fora",
    intro: "O Ghidra é uma ferramenta incrível, mas às vezes você precisa dos dados em outro lugar. Talvez você queira o código C decompilado para ler em um editor de texto mais confortável, ou precise dos bytes em formato Intel Hex para gravar em um hardware. O Ghidra oferece exportadores nativos, mas usá-los via script permite uma precisão cirúrgica. Imagine um script que identifica apenas as funções 'interessantes' (como as que lidam com pacotes de rede) e exporta apenas o código C delas para arquivos individuais. Isso limpa o ruído e permite que você use ferramentas de busca externa como o `grep` ou até alimente modelos de linguagem (LLMs) com o código limpo para obter explicações extras.",
    codes: [
      {
        lang: "java",
        code: "import ghidra.app.decompiler.DecompInterface;\nimport ghidra.app.decompiler.DecompileResults;\nimport ghidra.program.model.listing.Function;\nimport java.io.PrintWriter;\n\npublic class ExportDecompiled extends GhidraScript {\n    public void run() throws Exception {\n        DecompInterface di = new DecompInterface();\n        di.openProgram(currentProgram);\n        Function f = getFunctionAt(currentAddress);\n        \n        DecompileResults res = di.decompileFunction(f, 30, monitor);\n        if (res.decompileCompleted()) {\n            PrintWriter out = new PrintWriter(\"C:/temp/\" + f.getName() + \".c\");\n            out.println(res.getDecompiledFunction().getC());\n            out.close();\n        }\n    }\n}",
        label: "ExportC.java"
      }
    ],
    points: [
      "Uso da DecompInterface programaticamente",
      "Exportação para formatos de texto (C, ASM, ASCII)",
      "Filtragem de funções para exportação seletiva",
      "Integração com o sistema de arquivos do SO",
      "Preparação de dados para relatórios externos",
      "Uso do DecompilerResults para acessar o pseudo-código"
    ],
    alerts: [
      { type: "info", content: "O decompilador pode levar tempo para processar. Sempre verifique 'res.decompileCompleted()' antes de tentar acessar o código C." }
    ]
  },
  {
    slug: "headless-mode",
    section: "scripting",
    title: "Modo Headless: Ghidra sem Interface Gráfica",
    difficulty: "intermediario",
    subtitle: "O Ghidra no seu terminal",
    intro: "Você sabia que pode usar o Ghidra sem nunca ver um menu ou um botão? O modo `analyzeHeadless` é a versão 'linha de comando' do Ghidra. É aqui que a mágica da automação séria acontece. Ele permite que você importe binários, rode scripts de análise e exporte resultados direto do terminal. Por que isso é importante? Imagine um servidor que recebe arquivos suspeitos de um firewall e precisa rodar uma análise rápida. O `analyzeHeadless` pode ser chamado por scripts Bash ou Python externos, integrando o Ghidra em pipelines de CI/CD ou laboratórios de malware automatizados. É a transformação do Ghidra de uma 'ferramenta de desktop' em um 'serviço de análise'.",
    codes: [
      {
        lang: "bash",
        code: "# Exemplo de comando no terminal\n./analyzeHeadless /caminho/projeto NomeProjeto \\\n    -import /caminho/malware.exe \\\n    -postScript MeuScript.java \\\n    -deleteProject",
        label: "Comando Headless"
      }
    ],
    points: [
      "Execução via linha de comando (CLI)",
      "Importação automática de binários",
      "Execução de scripts pré e pós análise",
      "Ideal para servidores e automação em nuvem",
      "Economia de recursos (sem overhead de GUI)",
      "Parâmetros de controle: -import, -postScript, -process"
    ],
    alerts: [
      { type: "danger", content: "No modo headless, você não tem acesso a variáveis de estado da GUI (como 'currentAddress'). Use buscas programáticas no script." },
      { type: "success", content: "O log do headless é extremamente detalhado e pode ser redirecionado para arquivos de texto para debug posterior." }
    ]
  },
  {
    slug: "scripts-da-comunidade",
    section: "scripting",
    title: "Scripts da Comunidade: O Ecossistema do Ghidra",
    difficulty: "intermediario",
    subtitle: "Não reinvente a roda, use o conhecimento coletivo",
    intro: "A comunidade de engenharia reversa é vibrante e generosa. Desde que a NSA liberou o Ghidra, milhares de desenvolvedores criaram scripts para quase tudo: desde desofuscar malwares específicos até suporte para processadores obscuros de máquinas de lavar. Sites como o GitHub hospedam repositórios gigantescos como o 'ghidra-scripts' e listas curadas como o 'Awesome Ghidra'. Antes de gastar horas escrevendo um script para analisar um binário de GameBoy ou uma técnica de proteção anti-pirataria, vale a pena dar um 'Google'. Aprender a ler e adaptar scripts de terceiros é uma forma acelerada de se tornar um mestre no Ghidra, pois você verá como os especialistas resolvem problemas reais.",
    codes: [
      {
        lang: "bash",
        code: "# Para instalar scripts externos:\n# 1. Baixe o arquivo .java ou .py\n# 2. No Script Manager, clique no ícone 'Script Directories' (três barras)\n# 3. Adicione a pasta onde você salvou os arquivos\n# 4. Clique em 'Refresh' e eles aparecerão na lista!",
        label: "Instalando Scripts"
      }
    ],
    points: [
      "Repositórios GitHub famosos (NationalSecurityAgency, etc.)",
      "Adaptação de scripts existentes para suas necessidades",
      "Configuração de diretórios de scripts externos",
      "Colaboração: como contribuir com seus próprios scripts",
      "Identificação de scripts confiáveis vs. maliciosos",
      "Uso de scripts para suporte a novas arquiteturas"
    ],
    alerts: [
      { type: "warning", content: "Sempre revise o código de scripts baixados da internet antes de rodá-los. Eles têm acesso total ao seu sistema através do Java/Python." },
      { type: "info", content: "O site 'ghidra.re' possui links para as principais comunidades e discussões." }
    ]
  }
];
