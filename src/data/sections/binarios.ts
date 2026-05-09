import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "o-que-e-binario",
    section: "binarios",
    title: "O que é um Arquivo Binário?",
    difficulty: "iniciante",
    subtitle: "A forma final da computação",
    intro: "Para a maioria das pessoas, um arquivo é um documento de texto ou uma foto. Para um engenheiro reverso, tudo se resume a um 'Arquivo Binário'. Quando um programador escreve código em C++ ou Java, ele está criando algo que humanos entendem. Porém, o processador do computador não entende 'if' ou 'while'; ele entende apenas eletricidade, representada por 0s e 1s. O processo de transformar aquele código bonitinho em algo que a máquina execute é a Compilação. O resultado é o binário: um pacote fechado que contém instruções diretas para o hardware e dados necessários para o programa rodar. A engenharia reversa é o caminho de volta: pegamos esse pacote 'fechado' e tentamos deduzir o que o programador original pretendia. É como tentar reconstruir o projeto de um castelo apenas olhando para o entulho de uma demolição.",
    codes: [
      {
        lang: "c",
        code: "int main() { return 42; } // Código fonte (Human-friendly)",
        label: "Código Fonte"
      },
      {
        lang: "asm",
        code: "mov eax, 2Ah ; 2Ah é 42 em hexadecimal\nret",
        label: "Assembly (Intermediário)"
      },
      {
        lang: "text",
        code: "B8 2A 00 00 00 C3 // Bytes reais (Máquina)",
        label: "Binário (Hexadecimal)"
      }
    ],
    points: [
      "Binários são compostos por Opcodes (instruções) e Operandos (dados)",
      "O código-fonte é transformado em binário pelo compilador e linker",
      "Diferentes CPUs (Intel, ARM, MIPS) usam diferentes conjuntos de instruções",
      "O binário não contém nomes de variáveis locais originais",
      "A estrutura do binário é definida pelo sistema operacional (ELF, PE)",
      "Engenharia Reversa é a análise do binário sem acesso ao código-fonte",
      "Binários podem ser nativos (instruções de CPU) ou bytecode (como Java/C#)",
      "O Ghidra traduz os bytes de volta para algo próximo do código-fonte"
    ],
    alerts: [
      {
        type: "info",
        content: "Um binário é como uma caixa preta. Nosso trabalho é abrir a tampa e entender as engrenagens."
      },
      {
        type: "danger",
        content: "A descompilação nunca é 100% igual ao código original. O processo de compilação é 'destrutivo' para metadados humanos."
      }
    ]
  },
  {
    slug: "formatos-elf-pe",
    section: "binarios",
    title: "Formatos: ELF, PE e Mach-O",
    difficulty: "iniciante",
    subtitle: "Os sotaques dos sistemas operacionais",
    intro: "Assim como diferentes países têm diferentes formatos de documentos de identidade, cada sistema operacional tem seu próprio 'jeito' de organizar um binário. No Windows, usamos o formato PE (Portable Executable), que você conhece como .exe ou .dll. No Linux, o padrão é o ELF (Executable and Linkable Format). Já no ecossistema Apple (macOS/iOS), temos o Mach-O. Esses formatos são como containers que dizem ao sistema operacional: 'Ei, comece a executar por aqui, carregue estas bibliotecas e coloque estes dados naquela parte da memória'. O Ghidra é incrível porque ele reconhece esses 'magic bytes' (os primeiros bytes do arquivo) e já configura todo o ambiente de análise para você, identificando se é um programa de Windows ou um driver de Linux.",
    codes: [
      {
        lang: "bash",
        code: "xxd -l 4 programa.exe # Mostra 'MZ' (4d 5a) - Início de um arquivo PE (Windows)",
        label: "Check Magic Bytes (Windows)"
      },
      {
        lang: "bash",
        code: "xxd -l 4 binario_linux # Mostra '.ELF' (7f 45 4c 46) - Início de um arquivo ELF",
        label: "Check Magic Bytes (Linux)"
      },
      {
        lang: "bash",
        code: "file meu_arquivo # Comando Linux que identifica o formato automaticamente",
        label: "Identificação automática"
      }
    ],
    points: [
      "PE (Portable Executable): Usado no Windows (.exe, .dll, .sys)",
      "ELF (Executable and Linkable Format): Usado no Linux, Android e BSD",
      "Mach-O: Usado no macOS, iOS e tvOS",
      "O 'Header' (Cabeçalho) contém metadados críticos sobre o arquivo",
      "Magic Bytes são assinaturas no início do arquivo que definem seu tipo",
      "O Ghidra usa esses formatos para mapear as seções na memória",
      "Cada formato lida com imports e exports de maneira diferente",
      "O formato define como o sistema carrega o programa na RAM"
    ],
    alerts: [
      {
        type: "tip",
        content: "Sempre verifique os Magic Bytes se um arquivo não abrir no Ghidra. Ele pode estar compactado ou corrompido."
      },
      {
        type: "info",
        content: "O formato PE começa com os bytes 'MZ', em homenagem a Mark Zbikowski, um dos criadores do MS-DOS."
      }
    ]
  },
  {
    slug: "secoes-binarios",
    section: "binarios",
    title: "Seções de um Binário: .text, .data, .bss",
    difficulty: "iniciante",
    subtitle: "Organizando a bagunça dentro do arquivo",
    intro: "Um binário não é um amontoado aleatório de bytes. Ele é organizado em 'Seções', como as gavetas de um armário. Cada gaveta tem um propósito. A seção '.text' é a mais importante para nós: é onde vive o código executável (as instruções da CPU). A seção '.data' guarda variáveis globais que já começam com um valor (ex: uma mensagem de boas-vindas). A '.bss' é para variáveis que começam vazias. Temos também a '.rodata', que significa 'Read Only Data' (Dados de Apenas Leitura), onde ficam as constantes e strings que o programa não deve mudar. No Ghidra, entender onde você está (em qual seção) é crucial: se você está na .text, você está lendo lógica; se está na .data, está lendo informações.",
    codes: [
      {
        lang: "text",
        code: "Window -> Memory Map # Atalho no Ghidra para ver todas as seções",
        label: "Visualizando seções"
      },
      {
        lang: "text",
        code: ".text   -> Permissões: R-X (Read, Execute) # Código",
        label: "Propriedades da .text"
      },
      {
        lang: "text",
        code: ".data   -> Permissões: RW- (Read, Write) # Variáveis globais",
        label: "Propriedades da .data"
      },
      {
        lang: "text",
        code: ".rodata -> Permissões: R-- (Read Only) # Constantes/Strings",
        label: "Propriedades da .rodata"
      }
    ],
    points: [
      ".text: Contém o código de máquina (instruções executáveis)",
      ".data: Guarda variáveis globais e estáticas inicializadas",
      ".bss: Reserva espaço para variáveis não inicializadas",
      ".rodata: Armazena constantes e strings de texto fixas",
      ".plt / .got: Usadas para resolver chamadas de funções dinâmicas",
      "O Memory Map no Ghidra permite mudar permissões de seções",
      "Seções com permissão de Escrita e Execução (RWX) são raras e suspeitas",
      "O alinhamento de seções garante que o SO as carregue eficientemente"
    ],
    alerts: [
      {
        type: "warning",
        content: "Malwares costumam criar seções novas com nomes estranhos ou permissões RWX para esconder código malicioso."
      },
      {
        type: "info",
        content: "No Ghidra, você pode renomear seções se achar que o compilador deu nomes genéricos."
      }
    ]
  },
  {
    slug: "tabelas-simbolos",
    section: "binarios",
    title: "Tabelas de Símbolos e Strip",
    difficulty: "iniciante",
    subtitle: "Onde foram parar os nomes das funções?",
    intro: "Quando você programa, suas funções têm nomes lindos como 'autenticarUsuario' ou 'calcularImposto'. No entanto, para o computador, esses nomes não servem para nada. Ao gerar o binário final, o compilador pode jogar esses nomes fora para economizar espaço ou dificultar a engenharia reversa — um processo chamado 'Strip'. Se um binário está 'stripped', o Ghidra não saberá os nomes originais e chamará as funções de algo genérico como 'FUN_00401234'. Se ele NÃO está stripped, você verá todos os nomes originais, o que facilita seu trabalho em 1000%. Programas em desenvolvimento (debug) mantêm os símbolos; softwares comerciais e malwares quase sempre os removem.",
    codes: [
      {
        lang: "bash",
        code: "strip --strip-all meu_programa # Comando para remover todos os símbolos no Linux",
        label: "Removendo Símbolos"
      },
      {
        lang: "bash",
        code: "nm meu_programa # Comando para listar símbolos de um binário (se existirem)",
        label: "Listando Símbolos"
      },
      {
        lang: "text",
        code: "FUN_00401050 -> Significa: Função no endereço 0x401050 (Sem nome)",
        label: "Convenção do Ghidra"
      }
    ],
    points: [
      "Símbolos são metadados que mapeiam endereços a nomes humanos",
      "Binários 'Stripped' tiveram esses nomes removidos",
      "O Ghidra usa análise de fluxo para identificar funções mesmo sem nomes",
      "Símbolos de Debug (DWARF, PDB) contêm até nomes de variáveis locais",
      "A Symbol Tree no Ghidra lista todos os símbolos encontrados",
      "Você pode carregar arquivos de símbolos externos (.pdb no Windows)",
      "A falta de símbolos é o 'normal' na vida do engenheiro reverso",
      "Identificar o compilador ajuda a prever padrões de funções sem nome"
    ],
    alerts: [
      {
        type: "info",
        content: "Mesmo em binários stripped, as funções das bibliotecas do sistema (como printf) costumam manter os nomes nos 'Imports'."
      },
      {
        type: "tip",
        content: "Se encontrar um arquivo .pdb junto com um .exe, SEMPRE carregue-o no Ghidra. É o mapa da mina!"
      }
    ]
  },
  {
    slug: "strings-em-binarios",
    section: "binarios",
    title: "Strings: A Mina de Ouro do RE",
    difficulty: "iniciante",
    subtitle: "O código fala com você através do texto",
    intro: "Se você tem apenas 5 minutos para analisar um binário desconhecido, vá direto para as Strings. Elas são sequências de caracteres (texto) que o programa usa para falar com o usuário, registrar logs, acessar sites ou mostrar erros. Strings como 'Senha incorreta', 'Conectando ao servidor...' ou 'C:\\Users\\Admin\\Desktop\\payload.exe' revelam o propósito do programa quase instantaneamente. No Ghidra, existe uma janela dedicada apenas a listar todas as strings encontradas. Muitas vezes, um desafio de CTF ou uma análise de malware termina aqui, encontrando uma flag escondida ou o endereço IP de um servidor de controle (C2).",
    codes: [
      {
        lang: "text",
        code: "Window -> Defined Strings # Abre a lista de todas as strings do binário",
        label: "Buscando Strings no Ghidra"
      },
      {
        lang: "bash",
        code: "strings -n 6 binario # Comando terminal para mostrar strings com 6+ caracteres",
        label: "Comando strings (Terminal)"
      },
      {
        lang: "text",
        code: "Filter: http # Técnica comum para achar URLs",
        label: "Filtragem estratégica"
      }
    ],
    points: [
      "Strings revelam funcionalidades, URLs, IPs e caminhos de arquivo",
      "Geralmente ficam armazenadas nas seções .rodata ou .data",
      "O Ghidra identifica automaticamente strings nulas (C-style) e Unicode",
      "Referências cruzadas (XREFs) em strings mostram onde elas são usadas",
      "Malwares costumam ofuscar (esconder) strings importantes",
      "A busca por strings é o primeiro passo de 99% das análises",
      "Podem conter dicas sobre bibliotecas e versões de compiladores",
      "Strings de erro são ótimas para entender a lógica de funções complexas"
    ],
    alerts: [
      {
        type: "success",
        content: "Encontrou uma string interessante? Clique nela e pressione 'X' para ver qual função a utiliza!"
      },
      {
        type: "warning",
        content: "Se não houver strings legíveis, o binário pode estar compactado (Packed) ou criptografado."
      }
    ]
  },
  {
    slug: "endianness",
    section: "binarios",
    title: "Endianness: Big-Endian vs Little-Endian",
    difficulty: "iniciante",
    subtitle: "A ordem dos fatores altera o produto (na memória)",
    intro: "Imagine escrever o número 1.234. Algumas pessoas poderiam preferir escrever 'mil, duzentos e trinta e quatro', enquanto outras poderiam começar pelas unidades. No mundo dos processadores, isso é o Endianness. No 'Little-Endian' (usado por quase todos os PCs modernos Intel/AMD e ARM), o byte menos significativo vem primeiro na memória. No 'Big-Endian' (comum em roteadores antigos, Mainframes e redes), o mais significativo vem primeiro. Isso é confuso pra caramba no início! Se você vê na memória os bytes 'EF BE AD DE', e o sistema é Little-Endian, o valor real é '0xDEADBEEF'. Se você ler errado, sua análise vai por água abaixo. O Ghidra cuida disso automaticamente com base na arquitetura, mas você precisa entender o conceito para não se perder ao olhar os bytes crus.",
    codes: [
      {
        lang: "text",
        code: "Valor: 0x12345678\nBig-Endian:    12 34 56 78\nLittle-Endian: 78 56 34 12",
        label: "Comparação Visual"
      },
      {
        lang: "text",
        code: "Intel x86/x64 -> Little-Endian\nPowerPC/MIPS  -> Geralmente Big-Endian",
        label: "Arquiteturas comuns"
      }
    ],
    points: [
      "Endianness define a ordem dos bytes de um número na memória",
      "Little-Endian: Byte de menor valor no menor endereço",
      "Big-Endian: Byte de maior valor no menor endereço",
      "Isso afeta apenas valores multubyte (inteiros, ponteiros), não strings simples",
      "O Ghidra inverte os bytes para você na visualização 'Listing'",
      "É um dos erros mais comuns ao tentar extrair dados manualmente",
      "Redes (TCP/IP) usam Big-Endian ('Network Byte Order')",
      "A arquitetura ARM pode ser 'Bi-endian' (suporta ambos)"
    ],
    alerts: [
      {
        type: "info",
        content: "Dica: 'Little' começa com o 'Lado pequeno' (o byte menos significativo)."
      },
      {
        type: "danger",
        content: "Se um endereço de memória parecer totalmente impossível, verifique se você não está lendo na ordem inversa!"
      }
    ]
  },
  {
    slug: "bibliotecas-dinamicas",
    section: "binarios",
    title: "Bibliotecas Dinâmicas e o PLT/GOT",
    difficulty: "iniciante",
    subtitle: "Não reinventando a roda",
    intro: "Um programa moderno não faz tudo sozinho. Ele pede ajuda ao sistema operacional. Se ele quer escrever algo na tela, ele chama uma biblioteca (como a msvcrt.dll no Windows ou libc.so no Linux). Essas são as Bibliotecas Dinâmicas. O binário não contém o código dessas bibliotecas, apenas um 'lembrete' de que precisa delas. Para que isso funcione em tempo de execução, o binário usa duas tabelas técnicas chamadas PLT (Procedure Linkage Table) e GOT (Global Offset Table). Elas funcionam como uma lista telefônica: o programa vai na PLT, que consulta a GOT para saber em qual endereço real a função da DLL foi carregada na memória. No Ghidra, essas chamadas aparecem como saltos para 'external' ou nomes de bibliotecas conhecidas.",
    codes: [
      {
        lang: "text",
        code: "CALL <EXTERNAL>::puts # O programa chamando uma função da biblioteca padrão",
        label: "Chamada Externa no Ghidra"
      },
      {
        lang: "bash",
        code: "ldd meu_programa # Comando Linux para listar dependências (.so)",
        label: "Listando dependências"
      },
      {
        lang: "text",
        code: ".dll (Windows) | .so (Linux) | .dylib (macOS)",
        label: "Extensões comuns"
      }
    ],
    points: [
      "Bibliotecas Dinâmicas reduzem o tamanho do arquivo executável",
      "Permitem que vários programas compartilhem o mesmo código na memória",
      "O PLT é o 'trampolim' para chamar funções externas",
      "O GOT armazena os endereços reais das funções após o carregamento",
      "Importante para análise de segurança: redirecionar o GOT é uma técnica de exploit",
      "O Ghidra mostra essas funções na pasta 'Imports' da Symbol Tree",
      "O linking dinâmico acontece no momento em que o programa abre",
      "Facilita atualizações: você atualiza a DLL e todos os programas ganham a correção"
    ],
    alerts: [
      {
        type: "info",
        content: "A maioria das funções que começam com '_' (ex: _printf) são entradas na PLT."
      },
      {
        type: "tip",
        content: "Se o programa usa 'LoadLibrary' ou 'GetProcAddress', ele está carregando bibliotecas de forma manual e oculta."
      }
    ]
  },
  {
    slug: "entrypoints",
    section: "binarios",
    title: "O Entry Point: Por Onde o Programa Começa",
    difficulty: "iniciante",
    subtitle: "O tiro de partida da execução",
    intro: "Todo programa precisa de um começo. No entanto, ao contrário do que ensinam na faculdade, o programa não começa exatamente na função 'main()'. Antes de chegar nela, o sistema operacional executa uma série de preparações (como configurar a pilha e as variáveis de ambiente). O ponto exato onde o sistema operacional começa a ler instruções é chamado de 'Entry Point'. No Ghidra, ele é marcado automaticamente. Frequentemente, o Entry Point aponta para uma função chamada '_start', que por sua vez chama a 'main()'. Identificar o Entry Point é o primeiro passo para seguir o fluxo de execução real do software.",
    codes: [
      {
        lang: "text",
        code: "entry: 00401000 # Onde o Ghidra coloca a label de início",
        label: "Identificador de entrada"
      },
      {
        lang: "asm",
        code: "PUSH EBP\nMOV EBP, ESP\nCALL main # A jornada do entry point até a main",
        label: "Exemplo de Prólogo de Sistema"
      }
    ],
    points: [
      "O Entry Point é o endereço da primeira instrução executada pelo SO",
      "Geralmente aponta para a função '_start', não diretamente para 'main'",
      "O endereço do Entry Point fica guardado no Header do binário (ELF/PE)",
      "O Ghidra cria um símbolo especial chamado 'entry' para marcá-lo",
      "Softwares empacotados (Packed) têm Entry Points que levam a código de descompressão",
      "No Windows, para aplicações gráficas, o ponto de entrada comum é o WinMain",
      "A preparação do ambiente (Runtime Setup) acontece antes da lógica principal",
      "Alterar o Entry Point é uma técnica comum para infectar binários"
    ],
    alerts: [
      {
        type: "info",
        content: "No Ghidra, você pode ir rapidamente para o início pressionando 'G' e digitando 'entry'."
      },
      {
        type: "warning",
        content: "Se o Entry Point cair em uma área com bytes sem sentido, o arquivo pode estar ofuscado."
      }
    ]
  },
  {
    slug: "analise-importacoes",
    section: "binarios",
    title: "Analisando as Importações de um Binário",
    difficulty: "iniciante",
    subtitle: "Diga-me o que importas e dir-te-ei quem és",
    intro: "A lista de 'Imports' é o currículo do programa. Se você vê que um binário importa funções como 'CreateFile', 'WriteFile' e 'RegOpenKey', você já sabe que ele manipula arquivos e o registro do Windows. Se ele importa 'WSAStartup' e 'send', ele definitivamente tem funções de rede. Analisar as importações é como ler os ingredientes de um produto no supermercado: você sabe o que tem lá dentro antes mesmo de abrir. Para malwares, os imports são denúncias: funções de injeção de código (como VirtualAllocEx) são bandeiras vermelhas gigantes que dizem 'CUIDADO, SOU PERIGOSO!'.",
    codes: [
      {
        lang: "text",
        code: "Symbol Tree -> Imports -> KERNEL32.DLL -> VirtualAlloc",
        label: "Localizando Imports Críticos"
      },
      {
        lang: "text",
        code: "ShellExecuteA # Função para rodar outros comandos/programas",
        label: "Import Suspeito 1"
      },
      {
        lang: "text",
        code: "InternetReadFile # Função para baixar conteúdo da web",
        label: "Import Suspeito 2"
      }
    ],
    points: [
      "Imports são funções externas que o programa solicita ao SO",
      "Estão organizados por DLL (Windows) ou Shared Object (Linux)",
      "Revelam a capacidade técnica do binário (rede, arquivo, criptografia)",
      "Malwares costumam usar 'Dynamic Imports' para esconder essas funções",
      "A Symbol Tree no Ghidra é o melhor lugar para explorar os imports",
      "Você pode ver onde cada import é usado clicando nele (XREF)",
      "Muitos programas legítimos usam as mesmas funções que malwares",
      "A ausência total de imports em um binário grande é extremamente suspeita"
    ],
    alerts: [
      {
        type: "danger",
        content: "Fique atento a: VirtualAllocEx, WriteProcessMemory e CreateRemoteThread. Elas são a 'trindade' da injeção de código."
      },
      {
        type: "info",
        content: "Funções que terminam em 'A' (ANSI) ou 'W' (Wide/Unicode) são comuns na API do Windows."
      }
    ]
  },
  {
    slug: "exportacoes",
    section: "binarios",
    title: "Exportações: O que o Binário Oferece ao Mundo",
    difficulty: "intermediario",
    subtitle: "A vitrine de uma biblioteca",
    intro: "Enquanto executáveis (.exe) geralmente apenas consomem funções, as Bibliotecas Dinâmicas (.dll, .so) foram feitas para oferecer funções a outros. Essas funções oferecidas publicamente são as 'Exportações'. Se você está analisando uma DLL suspeita, as exportações dizem exatamente quais 'serviços' ela presta. Algumas vezes, essas funções não têm nomes amigáveis, sendo identificadas apenas por números chamados 'Ordinals'. Analisar exportações é fundamental para entender drivers de dispositivo, plugins e componentes do sistema operacional. No Ghidra, as exportações ficam logo acima dos imports na Symbol Tree, mostrando a porta de entrada para quem quer usar aquela biblioteca.",
    codes: [
      {
        lang: "text",
        code: "Symbol Tree -> Exports -> MyFunction (Ordinal 1)",
        label: "Visualizando Exportações"
      },
      {
        lang: "bash",
        code: "dumpbin /exports biblioteca.dll # Ferramenta Windows para ver exportações",
        label: "Ferramenta Externa"
      }
    ],
    points: [
      "Exportações são funções que podem ser chamadas por outros programas",
      "Comuns em DLLs, .so, e Drivers",
      "Cada exportação tem um nome ou um número de índice (Ordinal)",
      "O Entry Point também é tecnicamente uma exportação especial",
      "Ajudam a identificar o propósito de bibliotecas de terceiros",
      "Alguns malwares se disfarçam de DLLs legítimas exportando os mesmos nomes",
      "A análise de ordinais exige olhar a tabela de exportação manualmente no Ghidra",
      "Exportações podem ser usadas para 'DLL Hijacking'"
    ],
    alerts: [
      {
        type: "info",
        content: "Se uma DLL exporta apenas uma função chamada 'Start' ou 'PluginMain', esse é o lugar para começar sua análise."
      },
      {
        type: "warning",
        content: "Exportações por Ordinal (sem nome) são comuns em DLLs do sistema para economizar espaço."
      }
    ]
  }
];
