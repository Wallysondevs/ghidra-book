import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "pre-requisitos",
    section: "instalacao",
    title: "Pré-requisitos: O que Você Precisa Saber",
    difficulty: "iniciante",
    subtitle: "Preparando o terreno para a análise",
    intro: `Antes de mergulharmos nas entranhas dos binários, precisamos garantir que sua "bancada de trabalho" está pronta. A boa notícia é que você não precisa ser um mestre da programação para começar na Engenharia Reversa. No entanto, ter uma noção básica de como usar o terminal (a tela preta) ajuda muito, pois muitas ferramentas e scripts de automação rodam por lá. Em termos de hardware, o Ghidra é democrático, mas como ele faz muita conta pesada para traduzir assembly em C, ele gosta de memória RAM. Imagine que o Ghidra é um chef de cozinha que precisa de muito espaço na mesa para abrir todos os ingredientes de uma vez; com 4GB de RAM ele consegue trabalhar, mas com 8GB ou 16GB ele voa. O sistema operacional fica a seu critério: Windows, Linux ou macOS, o Ghidra roda em todos graças ao Java. O mais importante é ter curiosidade e disposição para ler textos técnicos, pois o RE é, acima de tudo, um trabalho de investigação e leitura atenta.`,
    codes: [
      {
        lang: "text",
        code: "Hardware Mínimo:\n- CPU: Dual-core (x86_64)\n- RAM: 4GB\n- Disco: 1GB livre para instalação",
        label: "Requisitos de Hardware"
      },
      {
        lang: "text",
        code: "Hardware Recomendado:\n- CPU: Quad-core ou superior\n- RAM: 8GB a 16GB\n- Monitor: Resolução Full HD (muitas janelas!)",
        label: "Hardware Ideal"
      },
      {
        lang: "bash",
        code: "# Verificando se você tem o básico de ferramentas no Linux\nwhich bash\nwhich python3\n# O Ghidra usa Python para scripts, então é bom ter instalado",
        label: "Verificação de Ambiente"
      },
      {
        lang: "bash",
        code: "uname -a\n# Verifica se seu sistema é 64-bit (essencial para o Ghidra moderno)",
        label: "Verificação de OS"
      }
    ],
    points: [
      "Não é necessário saber programar fluentemente, mas ajuda a ler lógica básica.",
      "Conhecimento básico de linha de comando é um diferencial importante.",
      "Memória RAM é o recurso mais crítico para o Ghidra.",
      "Monitor de alta resolução ajuda a organizar as várias janelas da interface.",
      "O sistema deve ser de 64 bits para compatibilidade total.",
      "Java 17 ou superior é obrigatório (veremos no próximo capítulo).",
      "Espaço em disco para salvar os projetos e arquivos analisados.",
      "Curiosidade analítica é o pré-requisito mental mais importante."
    ],
    alerts: [
      {
        type: "info",
        content: "Se você usa Linux, o Ghidra se comporta muito bem em distribuições como Ubuntu, Debian ou Arch."
      },
      {
        type: "warning",
        content: "Evite rodar o Ghidra em máquinas virtuais com pouca memória, a interface pode ficar extremamente lenta."
      }
    ]
  },
  {
    slug: "instalando-java",
    section: "instalacao",
    title: "Instalando o Java",
    difficulty: "iniciante",
    subtitle: "O motor por trás do Ghidra",
    intro: `O Ghidra é escrito quase inteiramente em Java. Isso é excelente porque permite que ele rode em qualquer lugar, mas significa que você precisa do motor correto instalado no seu sistema. Pense no Java como o combustível especial que o Ghidra precisa para dar a partida. Mas cuidado: não serve qualquer versão. O Ghidra moderno exige o JDK (Java Development Kit) versão 17 ou superior. Muitas vezes as pessoas têm o JRE (Java Runtime Environment) comum, que serve apenas para rodar programas simples, mas para o Ghidra, precisamos do kit completo de desenvolvimento para que ele consiga compilar scripts e realizar análises profundas. No Brasil, o OpenJDK é a escolha favorita por ser totalmente gratuito e de código aberto, mantido pela comunidade e por grandes empresas. Vamos configurar também o 'JAVA_HOME', que é como dar ao sistema um mapa indicando exatamente onde o Java está escondido, para que o Ghidra não se perca na hora de iniciar.`,
    codes: [
      {
        lang: "bash",
        code: "# No Ubuntu/Debian\nsudo apt update\nsudo apt install openjdk-17-jdk\n# Instala a versão 17, que é o padrão ouro para estabilidade",
        label: "Instalação no Linux"
      },
      {
        lang: "powershell",
        code: "# No Windows usando Winget\nwinget install Microsoft.OpenJDK.17\n# Ou baixe o instalador .msi no site da Amazon Corretto ou Adoptium",
        label: "Instalação no Windows"
      },
      {
        lang: "bash",
        code: "# No macOS usando Homebrew\nbrew install openjdk@17\nsudo ln -sfn /usr/local/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk",
        label: "Instalação no macOS"
      },
      {
        lang: "bash",
        code: "java -version\n# O comando deve retornar algo como 'openjdk version \"17.0.x\"'\njavac -version\n# Verifique se o compilador (javac) também está acessível",
        label: "Verificação"
      }
    ],
    points: [
      "Ghidra requer especificamente o JDK (Java Development Kit), não apenas o JRE.",
      "A versão recomendada atualmente é a 17 ou superior (LTS).",
      "OpenJDK é a distribuição recomendada por ser open-source.",
      "Configurar a variável de ambiente JAVA_HOME facilita a vida do Ghidra.",
      "No Windows, o instalador costuma configurar o PATH automaticamente.",
      "Diferentes versões de Java podem coexistir, mas o Ghidra precisa da 17+.",
      "Verifique a instalação com 'java -version' no terminal.",
      "Sem o Java correto, o script ghidraRun nem sequer abrirá a janela de erro."
    ],
    alerts: [
      {
        type: "danger",
        content: "Java 8 ou 11 são muito antigos para as versões recentes do Ghidra. Certifique-se de usar a 17+."
      },
      {
        type: "tip",
        content: "Se o Ghidra reclamar que não achou o Java, você pode editar o arquivo 'support/launch.properties' e apontar o caminho manualmente."
      }
    ]
  },
  {
    slug: "baixando-ghidra",
    section: "instalacao",
    title: "Baixando e Verificando o Ghidra",
    difficulty: "iniciante",
    subtitle: "Obtendo sua ferramenta de forma segura",
    intro: `Agora que o motor (Java) está pronto, vamos buscar o Ghidra. O único lugar oficial e seguro para baixar o Ghidra é o repositório da NationalSecurityAgency no GitHub. Evite baixar de outros sites, pois você estará lidando com uma ferramenta de segurança e não quer que a própria ferramenta venha com "brindes" maliciosos. O download virá em um arquivo compactado (.zip). Após baixar, um passo de mestre é verificar o SHA-256 do arquivo. Pense nisso como uma impressão digital digital: se um único bit do arquivo for alterado por um erro de download ou por um hacker, a impressão digital muda completamente. É como conferir o lacre de uma encomenda. Depois de verificado, basta extrair o conteúdo para uma pasta de sua preferência. Dica de organização: crie uma pasta chamada 'ferramentas' na sua home ou no C: e coloque o Ghidra lá. Ele não precisa de "instalação" no sentido tradicional; ele roda direto da pasta extraída, o que chamamos de software portátil.`,
    codes: [
      {
        lang: "text",
        code: "URL Oficial:\nhttps://github.com/NationalSecurityAgency/ghidra/releases",
        label: "Onde Baixar"
      },
      {
        lang: "bash",
        code: "# Verificando a integridade no Linux\nsha256sum ghidra_11.0.3_PUBLIC_20240410.zip\n# Compare o resultado com o hash no site oficial",
        label: "Verificação SHA-256 (Linux)"
      },
      {
        lang: "powershell",
        code: "# Verificando no Windows (PowerShell)\nGet-FileHash .\\ghidra_11.0.3_PUBLIC_20240410.zip -Algorithm SHA256",
        label: "Verificação SHA-256 (Windows)"
      },
      {
        lang: "text",
        code: "ghidra_11.0.3_PUBLIC/\n├── Ghidra/          # Onde o código mora\n├── docs/            # Manuais e tutoriais\n├── ghidraRun        # Script de início (Linux/Mac)\n└── ghidraRun.bat    # Script de início (Windows)",
        label: "Estrutura do ZIP"
      }
    ],
    points: [
      "Baixe sempre do GitHub oficial da NSA.",
      "Sempre verifique o hash SHA-256 para garantir que o arquivo não foi corrompido.",
      "O Ghidra é um software 'portable', não precisa de instalador MSI ou DEB.",
      "Extraia para um caminho sem espaços ou caracteres especiais (recomendado).",
      "Mantenha a estrutura de pastas interna do ZIP intacta.",
      "A pasta 'docs' contém o 'GhidraClass', um curso excelente (em inglês).",
      "A versão 'PUBLIC' é a estável para uso geral.",
      "Atualizar o Ghidra é simples: basta baixar a nova versão e mover seus projetos."
    ],
    alerts: [
      {
        type: "success",
        content: "Dica: Mantenha as versões antigas do Ghidra por um tempo se estiver no meio de um projeto importante, por segurança."
      },
      {
        type: "warning",
        content: "Caminhos de pasta muito longos no Windows podem causar problemas. Tente algo curto como C:\\tools\\ghidra."
      }
    ]
  },
  {
    slug: "primeira-execucao",
    section: "instalacao",
    title: "Primeira Execução do Ghidra",
    difficulty: "iniciante",
    subtitle: "Abrindo as portas do castelo",
    intro: `Chegou o grande momento. Para abrir o Ghidra, não procuramos um ícone no menu iniciar, mas sim o script de inicialização dentro da pasta que extraímos. No Windows, você clicará duas vezes no 'ghidraRun.bat'; no Linux ou Mac, executará './ghidraRun' no terminal. Na primeira vez, uma janela preta (o console) aparecerá — não feche ela! Ela é o diário de bordo do Ghidra, onde ele avisa se algo der errado nos bastidores. Logo em seguida, você verá a tela de splash da NSA e os termos de uso. Uma vez aceitos, a janela principal do 'Project Manager' aparecerá. Ela parece vazia e simples, mas é aqui que a mágica começa. O Ghidra organiza tudo em projetos, como se fosse um fichário de um detetive. Antes de analisar qualquer arquivo, você precisa dizer ao Ghidra onde vai guardar as anotações sobre ele. É uma abordagem diferente de um editor de texto comum, focada em manter suas descobertas salvas e organizadas a longo prazo.`,
    codes: [
      {
        lang: "bash",
        code: "cd ~/ferramentas/ghidra_11.0.3/\n./ghidraRun\n# O terminal mostrará o carregamento dos módulos",
        label: "Executando no Linux"
      },
      {
        lang: "cmd",
        code: "C:\\tools\\ghidra> ghidraRun.bat\n:: Uma janela de comando abrirá e permanecerá aberta\n:: Se ela fechar instantaneamente, há um erro no Java",
        label: "Executando no Windows"
      },
      {
        lang: "text",
        code: "User Agreement:\nLeia e clique em 'I Agree'.\nO Ghidra não envia seus dados para a NSA (promessa oficial!).",
        label: "Primeira Janela"
      },
      {
        lang: "text",
        code: "Ghidra: [No Project]\nFile -> New Project...\n# O ponto de partida obrigatório",
        label: "Project Manager"
      }
    ],
    points: [
      "O script 'ghidraRun' configura o ambiente Java automaticamente para você.",
      "O console (janela preta) é útil para diagnosticar erros de memória ou plugins.",
      "Aceite os termos de licença na primeira execução.",
      "A interface inicial é o Project Manager, não o Code Browser.",
      "O Ghidra não abre arquivos 'soltos', tudo deve estar dentro de um projeto.",
      "Você pode ter vários projetos para diferentes objetivos (ex: Malware, CTF, Estudos).",
      "A janela principal permite gerenciar arquivos, usuários (em modo compartilhado) e ferramentas.",
      "Se o Ghidra não abrir, verifique se o JAVA_HOME está correto no console."
    ],
    alerts: [
      {
        type: "tip",
        content: "Você pode criar um atalho na sua área de trabalho para o ghidraRun.bat ou criar um arquivo .desktop no Linux para facilitar."
      },
      {
        type: "info",
        content: "O Ghidra salva suas preferências de interface automaticamente ao fechar."
      }
    ]
  },
  {
    slug: "criando-projeto",
    section: "instalacao",
    title: "Criando Seu Primeiro Projeto",
    difficulty: "iniciante",
    subtitle: "Organizando sua mesa de trabalho",
    intro: `No Ghidra, um "Projeto" é muito mais do que uma pasta; é um banco de dados inteligente que guarda tudo o que você descobre sobre um binário. Quando você renomeia uma função ou comenta uma linha de assembly, o Ghidra salva isso no projeto, e não no arquivo original. Isso é fantástico porque você nunca estraga o arquivo que está analisando. Para começar, vá em 'File > New Project'. Você terá duas opções: 'Non-Shared' (para você trabalhar sozinho) e 'Shared' (para trabalhar em equipe, tipo um 'Google Docs' da engenharia reversa). Como estamos começando, escolha 'Non-Shared'. Em seguida, você dará um nome ao projeto e escolherá onde ele será salvo no seu disco. O Ghidra criará uma pasta com a extensão '.rep' e um arquivo '.gpr'. Pense no arquivo '.gpr' como o ícone do projeto e na pasta '.rep' como o porão onde todos os dados pesados e históricos de alterações ficam guardados. Mantenha os dois sempre juntos!`,
    codes: [
      {
        lang: "text",
        code: "Passo a passo:\n1. File -> New Project\n2. Selecione 'Non-Shared Project'\n3. Clique em Next",
        label: "Iniciando Projeto"
      },
      {
        lang: "text",
        code: "Project Directory: C:\\Users\\Voce\\Documents\\GhidraProjects\nProject Name: MeuPrimeiroEstudo",
        label: "Configuração de Pasta"
      },
      {
        lang: "bash",
        code: "ls MeuPrimeiroEstudo.gpr\nls -d MeuPrimeiroEstudo.rep/\n# O arquivo .gpr é o ponteiro, a pasta .rep contém os dados reais",
        label: "Arquivos do Projeto"
      },
      {
        lang: "text",
        code: "Dica: Use nomes descritivos.\n'Desafio_CTF_01' é melhor que 'projeto1'.",
        label: "Boas Práticas"
      }
    ],
    points: [
      "Projetos 'Non-Shared' são ideais para estudos individuais e privacidade.",
      "O arquivo .gpr (Ghidra Project) é o que você abre para carregar o trabalho.",
      "A pasta .rep contém os bancos de dados de análise e não deve ser mexida manualmente.",
      "O Ghidra permite organizar arquivos em pastas dentro do próprio projeto.",
      "Você pode arrastar binários de um projeto para outro, se necessário.",
      "O conceito de 'Workspace' permite salvar a disposição das suas janelas favoritas.",
      "Sempre feche o projeto antes de mover os arquivos no Windows/Linux para evitar corrupção.",
      "Projetos podem crescer bastante em tamanho após análises extensas."
    ],
    alerts: [
      {
        type: "success",
        content: "Você pode ter vários binários dentro de um único projeto. É ótimo para analisar um software e suas DLLs juntas."
      },
      {
        type: "warning",
        content: "Nunca delete a pasta .rep se quiser manter suas anotações e nomes de funções!"
      }
    ]
  },
  {
    slug: "importando-binario",
    section: "instalacao",
    title: "Importando um Binário para Análise",
    difficulty: "iniciante",
    subtitle: "O paciente entra na sala de cirurgia",
    intro: `Com o projeto criado, é hora de trazer o "paciente" para a mesa de cirurgia. Importar um binário no Ghidra é como fazer um raio-x inicial. Você pode simplesmente arrastar o arquivo (um .exe, um .elf de Linux ou até um firmware de roteador) para dentro da janela do Project Manager. O Ghidra é extremamente inteligente: ele vai ler o cabeçalho do arquivo e tentar adivinhar qual é o formato (PE, ELF, Mach-O) e para qual processador ele foi feito (x86, ARM, MIPS). Se ele não tiver certeza, ele te perguntará. Após clicar em 'OK', você verá um resumo da importação com várias informações técnicas. Mas atenção: o arquivo ainda não foi "analisado", ele apenas foi copiado para dentro do banco de dados do Ghidra. Para começar a ver o código, você deve dar um duplo clique no arquivo, o que abrirá o 'Code Browser' (a ferramenta com ícone de dragão verde). É lá que a análise automática vai te perguntar: "Deseja analisar este binário agora?". Diga que sim, e o Ghidra começará a dissecar cada byte para você.`,
    codes: [
      {
        lang: "text",
        code: "Métodos de Importação:\n1. Arrastar e soltar o arquivo na janela\n2. Tecla de atalho 'I'\n3. File -> Import File",
        label: "Como Importar"
      },
      {
        lang: "text",
        code: "Janela de Importação:\nFormat: Executable and Linking Format (ELF)\nLanguage: x86:LE:64:default (v11.0)\nDestination: /meu_programa",
        label: "Detecção Automática"
      },
      {
        lang: "text",
        code: "Import Results Summary:\n- Processor: x86_64\n- Compiler: gcc\n- Number of Sections: 25",
        label: "Resumo da Importação"
      },
      {
        lang: "text",
        code: "Auto-Analysis Options:\n[x] Aggressive Instruction Finder\n[x] Decompiler Parameter ID\n[x] Reference Aggregator",
        label: "Opções de Análise"
      }
    ],
    points: [
      "O Ghidra suporta quase todos os formatos de executáveis modernos.",
      "A importação cria uma cópia do binário dentro do projeto (o original fica intacto).",
      "Language/Compiler Spec: O Ghidra define como as funções se comportam baseado nisso.",
      "A análise automática pode levar de segundos a horas, dependendo do tamanho do arquivo.",
      "O 'Dragon Icon' (Code Browser) é a ferramenta principal de análise visual.",
      "Se a detecção automática falhar, você pode definir o processador manualmente.",
      "A fase de análise automática identifica funções, strings e referências cruzadas.",
      "Você pode re-analisar o arquivo a qualquer momento com novas opções."
    ],
    alerts: [
      {
        type: "tip",
        content: "Para binários de arquiteturas exóticas, o Ghidra é frequentemente superior a outras ferramentas gratuitas."
      },
      {
        type: "info",
        content: "Sempre deixe as opções padrão de análise marcadas se você for iniciante; elas cobrem 90% dos casos."
      }
    ]
  },
  {
    slug: "configuracoes-basicas",
    section: "instalacao",
    title: "Configurações Essenciais do Ghidra",
    difficulty: "iniciante",
    subtitle: "Deixando a ferramenta com a sua cara",
    intro: `O Ghidra é uma ferramenta de uso intensivo. Você passará horas olhando para a tela, então o conforto visual é questão de produtividade, não apenas estética. A primeira coisa que muitos fazem é mudar para o "Dark Mode" ou ajustar o tamanho das fontes. No Ghidra, essas configurações ficam em 'Edit > Tool Options'. É um labirinto de opções, mas foque no básico: 'Listing Display' para as cores do assembly e 'Decompiler' para as cores do código C. Outro ponto vital é o desempenho. Se você estiver analisando um binário gigante (como o kernel de um SO), o Ghidra pode ficar lento. Você pode aumentar a memória RAM disponível editando o arquivo 'ghidraRun.bat' (Windows) ou o script 'ghidra' (Linux), alterando o parâmetro '-Xmx'. Se você tem 16GB de RAM, dar 4GB ou 8GB para o Ghidra vai deixá-lo muito mais esperto na hora de processar funções complexas.`,
    codes: [
      {
        lang: "text",
        code: "Caminho para Cores e Fontes:\nEdit -> Tool Options -> Tool -> Fonts / Colors",
        label: "Personalização"
      },
      {
        lang: "bash",
        code: "# No arquivo 'support/launch.properties' ou no script de início:\n# Aumentando a memória para 4GB\nMAXMEM=4G",
        label: "Ajuste de Memória (JVM)"
      },
      {
        lang: "text",
        code: "Atalhos Essenciais para Configurar:\n- 'L': Renomear (Label)\n- 'T': Mudar Tipo (Type)\n- 'G': Ir para (Go to)",
        label: "Atalhos"
      },
      {
        lang: "text",
        code: "Theme: Flat LaF Dark (O queridinho da comunidade)\nEdit -> Tool Options -> Tool -> Theme",
        label: "Tema Escuro"
      }
    ],
    points: [
      "O tema escuro (Dark Theme) reduz a fadiga ocular em sessões longas.",
      "Ajustar o tamanho da fonte no 'Listing View' e 'Decompiler' é essencial.",
      "Aumentar o limite de memória (Xmx) evita travamentos em binários grandes.",
      "Configurar atalhos de teclado (Key Bindings) acelera muito a análise.",
      "O Ghidra permite salvar diferentes 'Tools' com configurações distintas.",
      "Você pode exportar suas configurações para usar em outra máquina.",
      "O salvamento automático do projeto pode ser configurado nas opções.",
      "A 'Search Limit' pode ser aumentada se você estiver buscando strings em arquivos massivos."
    ],
    alerts: [
      {
        type: "tip",
        content: "Se a interface parecer 'borrada' em monitores 4K, verifique as configurações de DPI do Java nas opções do sistema."
      },
      {
        type: "warning",
        content: "Cuidado ao aumentar demais a memória (MAXMEM) se você tiver pouca RAM física; o sistema operacional pode travar."
      }
    ]
  },
  {
    slug: "plugins-uteis",
    section: "instalacao",
    title: "Plugins Úteis para Começar",
    difficulty: "iniciante",
    subtitle: "Turbinando seu Ghidra",
    intro: `O Ghidra já vem completo "de fábrica", mas a comunidade é vibrante e cria extensões que resolvem problemas específicos ou adicionam superpoderes à ferramenta. Instalar um plugin no Ghidra é simples: você vai em 'File > Install Extensions', aponta para o arquivo .zip do plugin e reinicia a ferramenta. Um dos mais famosos é o 'GhidraBridge', que permite usar o Python 3 moderno para escrever scripts (por padrão, o Ghidra usa o Jython, que é o Python 2.7 rodando no Java). Outro essencial para quem faz análise de malware ou CTF é o 'LazyGhidra', que adiciona vários atalhos úteis no menu de contexto. Se você gosta de ver gráficos de fluxo de chamadas mais bonitos ou integrar o Ghidra com outros debuggers como o x64dbg, existem plugins para isso também. Lembre-se: menos é mais. Comece com o Ghidra puro e vá adicionando plugins conforme sentir necessidade de automatizar algo repetitivo.`,
    codes: [
      {
        lang: "text",
        code: "Como instalar:\n1. Baixe o plugin (.zip)\n2. No Ghidra: File -> Install Extensions\n3. Clique no '+' e selecione o arquivo\n4. Reinicie o Ghidra",
        label: "Passo a Passo"
      },
      {
        lang: "text",
        code: "Plugins Recomendados:\n- GhidraBridge (Python 3 support)\n- Ghidra2Frida (Dynamic analysis integration)\n- BinExport (Exportar para BinDiff)",
        label: "Lista de Desejos"
      },
      {
        lang: "text",
        code: "Script Manager (Window -> Script Manager):\nAqui você ativa e roda os scripts dos plugins instalados.",
        label: "Gerenciador de Scripts"
      },
      {
        lang: "bash",
        code: "# Exemplo de instalação manual via pasta\ncp plugin_famoso.zip ~/ghidra_scripts/Extensions/",
        label: "Caminho das Extensões"
      }
    ],
    points: [
      "Plugins estendem as funcionalidades nativas do Ghidra.",
      "GhidraBridge é quase obrigatório para usar bibliotecas Python modernas.",
      "O menu 'Extensions' facilita a gestão do que está ativo ou não.",
      "Sempre verifique se a versão do plugin é compatível com a sua versão do Ghidra.",
      "Muitos plugins excelentes estão hospedados no GitHub sob a tag 'ghidra-extension'.",
      "Plugins podem adicionar novos processadores ou formatos de arquivos exóticos.",
      "Integrações com debuggers (como Frida) permitem análise híbrida (estática + dinâmica).",
      "Cuidado com plugins de fontes desconhecidas; eles rodam com plenos privilégios."
    ],
    alerts: [
      {
        type: "success",
        content: "O Ghidra já vem com centenas de scripts úteis embutidos. Antes de procurar um plugin, olhe o Script Manager!"
      },
      {
        type: "danger",
        content: "Plugins desatualizados são a causa número 1 de crashes no Ghidra após uma atualização de versão."
      }
    ]
  },
  {
    slug: "usando-no-terminal",
    section: "instalacao",
    title: "Ghidra em Modo Headless (Terminal)",
    difficulty: "intermediario",
    subtitle: "Automação em larga escala",
    intro: `Você sabia que o Ghidra pode trabalhar sem nem sequer abrir uma janela? Isso é o que chamamos de modo "Headless". Imagine que você tem uma pasta com 1.000 arquivos de malware e precisa extrair todas as strings e endereços IP de dentro deles. Fazer isso manualmente na interface gráfica levaria semanas e acabaria com a sua paciência. Com o comando 'analyzeHeadless', você pode criar um script que abre o Ghidra no terminal, importa os arquivos, roda a análise, executa um script customizado seu e salva o resultado, tudo isso enquanto você toma um café. É uma ferramenta poderosíssima para profissionais de segurança e pesquisadores que lidam com grandes volumes de dados (Big Data Analysis). Dominar o modo Headless é o que separa os entusiastas dos analistas de nível industrial, permitindo integrar o Ghidra em esteiras de CI/CD ou servidores de análise automática.`,
    codes: [
      {
        lang: "bash",
        code: "./support/analyzeHeadless ~/meu_projeto ProjetoTeste \\\n-import ~/binarios_suspeitos/ \\\n-postScript MeuScriptDeBusca.java\n# Comando básico para processar em lote",
        label: "Comando Headless"
      },
      {
        lang: "text",
        code: "Parâmetros Comuns:\n-import : Importa arquivos ou pastas\n-process : Processa arquivos já existentes no projeto\n-postScript : Roda um script APÓS a análise",
        label: "Parâmetros Principais"
      },
      {
        lang: "bash",
        code: "# Rodando sem salvar alterações (apenas para extração)\n./analyzeHeadless . temp -import bin.exe -postScript ExportData.py -deleteProject",
        label: "Análise Temporária"
      },
      {
        lang: "text",
        code: "INFO  HEADLESS: Gestão de memória JVM otimizada para terminal.\nINFO  HEADLESS: Processando arquivo 1 de 500...",
        label: "Saída do Log"
      }
    ],
    points: [
      "analyzeHeadless permite automação total sem interface gráfica.",
      "Ideal para processamento em lote (bulk analysis) de milhares de arquivos.",
      "Pode ser integrado em scripts Bash ou Python externos.",
      "Reduz o consumo de recursos por não carregar a UI (interface de usuário).",
      "Permite rodar análises em servidores remotos via SSH.",
      "Essencial para criar 'sanitizadores' ou buscadores de padrões em larga escala.",
      "Os scripts rodados no modo headless têm acesso total à API do Ghidra.",
      "É possível criar e destruir projetos temporários apenas para uma análise rápida."
    ],
    alerts: [
      {
        type: "warning",
        content: "Erros no modo Headless aparecem apenas no log do terminal. Fique atento às mensagens de 'ERROR' ou 'FATAL'."
      },
      {
        type: "tip",
        content: "Use o modo Headless em máquinas com muitos núcleos de CPU para paralelizar a análise de vários arquivos ao mesmo tempo."
      }
    ]
  }
];
