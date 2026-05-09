import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "identificando-funcoes",
    section: "funcoes-tipos",
    title: "Identificando Funções no Binário",
    difficulty: "iniciante",
    subtitle: "Como o Ghidra reconhece blocos de código como unidades lógicas",
    intro: "Imagine que você recebeu um quebra-cabeça gigante de peças cinzas e sem imagem. Para começar a montar, você primeiro separa as peças de borda, certo? No mundo da engenharia reversa, identificar funções é exatamente isso. O Ghidra olha para a 'sopa de letrinhas' binária e procura por padrões conhecidos como 'prólogos'. Na arquitetura x64, quase toda função começa preparando o terreno para suas variáveis, geralmente com instruções como PUSH RBP e MOV RBP, RSP. É como o porteiro de um prédio que sempre segue o mesmo protocolo ao receber um visitante. No entanto, nem sempre o Ghidra acerta de primeira. Binários ofuscados, códigos de inicialização (boot) ou funções muito simples (funções folha) podem passar despercebidos, exigindo que o analista intervenha manualmente para definir onde uma função começa e termina.",
    codes: [
      {
        lang: "asm",
        code: "PUSH RBP          ; Salva o ponteiro da base da pilha anterior\nMOV RBP, RSP      ; Define o início do novo frame de pilha\nSUB RSP, 0x20     ; Reserva 32 bytes para variáveis locais",
        label: "Prólogo padrão x64"
      },
      {
        lang: "asm",
        code: "ADD EAX, EBX      ; Apenas uma soma simples\nRET               ; Retorna imediatamente",
        label: "Função 'Folha' (Leaf Function) sem prólogo complexo"
      }
    ],
    points: [
      "Prólogos de função são sequências de bytes previsíveis.",
      "O Ghidra usa 'Function ID' para comparar assinaturas de funções conhecidas.",
      "Funções folha não chamam outras funções e podem não ter prólogos padrão.",
      "A detecção automática pode falhar em códigos maliciosos ou muito otimizados.",
      "Criar uma função manualmente é feito selecionando os bytes e pressionando 'F'.",
      "O 'Entry Point' é a primeira função que o sistema operacional executa.",
      "O 'Function Graph' ajuda a visualizar se o fluxo de controle pertence a uma única função."
    ],
    alerts: [
      {
        type: "tip",
        content: "Se você encontrar um bloco de código solto que parece uma função, clique com o botão direito e escolha 'Create Function' ou pressione a tecla de atalho 'F'."
      },
      {
        type: "warning",
        content: "Cuidado com funções 'Thunk'. Elas são apenas saltos para outras funções, muito comuns em chamadas de bibliotecas externas (DLLs)."
      }
    ]
  },
  {
    slug: "renomear-funcoes",
    section: "funcoes-tipos",
    title: "Renomeando Funções e Variáveis",
    difficulty: "iniciante",
    subtitle: "Transformando endereços genéricos em nomes significativos",
    intro: "Trabalhar em um binário sem renomear nada é como tentar navegar em uma cidade onde todas as ruas se chamam 'Rua 0x401000'. É humanamente impossível manter o foco por muito tempo. Por isso, a regra número 1 da engenharia reversa é: 'entendeu o que faz? Dê um nome!'. No Ghidra, a tecla 'L' (de Label) é sua melhor amiga. Ao renomear uma função de 'FUN_00401230' para 'validar_licenca', o Ghidra propaga essa alteração para cada lugar onde essa função é chamada. É como um corretor automático inteligente que atualiza todos os contratos de uma vez só. Ter nomes claros ajuda a criar um 'mapa mental' do software, permitindo que você ignore partes irrelevantes e foque no que realmente importa para sua análise.",
    codes: [
      {
        lang: "c",
        code: "void FUN_004010a0(char *param_1) {\n  if (strcmp(param_1, \"admin\") == 0) {\n    FUN_00402000();\n  }\n}",
        label: "Código original (sem nomes)"
      },
      {
        lang: "c",
        code: "void check_admin_access(char *username) {\n  if (strcmp(username, \"admin\") == 0) {\n    grant_privileges();\n  }\n}",
        label: "Código após renomeação (semântico)"
      }
    ],
    points: [
      "Pressione 'L' em cima de qualquer símbolo para renomeá-lo.",
      "Use nomes que descrevam a ação e o objeto (ex: process_packet).",
      "Variáveis locais também devem ser renomeadas conforme seu uso é descoberto.",
      "Renomear uma função atualiza todas as 'Cross-References' (XREFs).",
      "Nomes começados com 'FUN_' são automáticos do Ghidra e indicam endereços.",
      "Evite nomes genéricos como 'funcao_1' ou 'temp_var'.",
      "A consistência nos nomes facilita a busca no 'Symbol Tree'."
    ],
    alerts: [
      {
        type: "info",
        content: "O Ghidra permite usar caracteres especiais, mas manter o padrão C (letras, números e underscores) evita confusão no decompilador."
      },
      {
        type: "success",
        content: "Ao renomear uma variável no Decompilador, a mudança reflete instantaneamente na Listing View (Assembly)."
      }
    ]
  },
  {
    slug: "tipos-primitivos",
    section: "funcoes-tipos",
    title: "Tipos de Dados Primitivos no Nível Binário",
    difficulty: "iniciante",
    subtitle: "Bits, bytes e como o processador interpreta números",
    intro: "Para o processador, tudo é bit. Ele não sabe se aqueles 4 bytes na memória representam o saldo da sua conta bancária, uma cor em RGB ou um endereço de memória. Quem dá significado a esses dados é o software (e você, o analista). No Ghidra, definir o tipo correto é crucial. Um 'int' de 4 bytes pode ser interpretado como 'signed' (com sinal) ou 'unsigned' (sem sinal). A diferença é enorme: 0xFFFFFFFF pode ser o número -1 ou 4.294.967.295. É como interpretar a batida de um bumbo em uma música: pode ser o início de um samba ou o final de uma marcha fúnebre, dependendo do contexto. Aprender a distinguir entre um 'char' (1 byte), um 'short' (2 bytes) e um 'long long' (8 bytes) é o que separa os amadores dos profissionais.",
    codes: [
      {
        lang: "asm",
        code: "MOV EAX, 0xFFFFFFFF\nCMP EAX, 0\nJL label_negative   ; Pula se for menor que 0 (Interpretado como -1)\nJB label_below      ; Pula se estiver abaixo (Não pula, pois é > 0)",
        label: "Diferença entre saltos signed (JL) e unsigned (JB)"
      },
      {
        lang: "c",
        code: "char c;      // 1 byte\nshort s;     // 2 bytes\nint i;       // 4 bytes\nlong long l; // 8 bytes (x64)",
        label: "Tamanhos típicos em C"
      }
    ],
    points: [
      "O tamanho dos tipos varia conforme a arquitetura (x86 vs x64).",
      "O Ghidra usa 'Set Data Type' (tecla T) para definir tipos.",
      "Inteiros 'Signed' usam complemento de dois para números negativos.",
      "Ponteiros em x64 sempre ocupam 8 bytes.",
      "Booleans no binário costumam ser apenas 1 byte (0 ou 1).",
      "Floats e Doubles usam registradores XMM e padrões IEEE 754.",
      "O Decompilador muda drasticamente a lógica ao trocar 'int' por 'unsigned int'."
    ],
    alerts: [
      {
        type: "danger",
        content: "Errar o tamanho de um tipo (ex: usar int onde era long) pode esconder vulnerabilidades de Buffer Overflow ou Integer Overflow."
      },
      {
        type: "info",
        content: "Em x64, o tipo 'long' no Windows costuma ter 4 bytes, mas no Linux/GCC costuma ter 8. Verifique sempre o compilador alvo."
      }
    ]
  },
  {
    slug: "arrays-ghidra",
    section: "funcoes-tipos",
    title: "Arrays: Sequências de Dados na Memória",
    difficulty: "iniciante",
    subtitle: "Trabalhando com listas contíguas no binário",
    intro: "Um array no binário é como uma fileira de casas idênticas em um condomínio. Se você sabe onde a primeira casa começa e qual o tamanho de cada lote, você consegue chegar a qualquer casa apenas somando o índice. Se temos um array de inteiros (4 bytes cada), o segundo elemento estará exatamente 4 bytes após o primeiro. No assembly, você verá frequentemente acessos do tipo [base + índice * tamanho]. O Ghidra é excelente em identificar esses padrões, mas às vezes ele mostra apenas uma série de variáveis soltas. Criar o array manualmente limpa o código e permite que o decompilador use a sintaxe elegante de colchetes, como 'lista[i]', facilitando muito a compreensão de loops.",
    codes: [
      {
        lang: "asm",
        code: "MOV EAX, [RCX + RAX*4] ; RCX = base do array, RAX = índice\n                       ; Multiplica RAX por 4 pois é um array de int",
        label: "Acesso a array em assembly x64"
      },
      {
        lang: "c",
        code: "int scores[10];\nfor(int i=0; i<10; i++) {\n    scores[i] = 0;\n}",
        label: "Representação em C de um loop sobre array"
      }
    ],
    points: [
      "Arrays são blocos contínuos de memória sem separadores.",
      "O cálculo de índice é feito por: endereço_base + (índice * tamanho_do_elemento).",
      "Strings são essencialmente arrays de 'char' terminados em null (0x00).",
      "No Ghidra, clique no primeiro endereço e use 'Data -> Create Array'.",
      "Você precisa informar o número de elementos ao criar o array.",
      "Arrays multidimensionais são apenas 'arrays de arrays' em uma linha longa.",
      "O Decompilador usa a informação do array para simplificar a aritmética de ponteiros."
    ],
    alerts: [
      {
        type: "tip",
        content: "Se vir uma sequência de instruções acessando endereços com offsets como +0, +4, +8, +12... você provavelmente está diante de um array de 4 bytes."
      },
      {
        type: "warning",
        content: "Cuidado com o 'Off-by-one'. O último índice de um array de tamanho N é sempre N-1."
      }
    ]
  },
  {
    slug: "structs-definicao",
    section: "funcoes-tipos",
    title: "Structs: Criando e Aplicando no Ghidra",
    difficulty: "intermediario",
    subtitle: "Organizando dados complexos e heterogêneos",
    intro: "Diferente de um array, onde todos os elementos são iguais, uma Struct (Estrutura) é como uma mochila que guarda coisas diferentes: um chaveiro, uma carteira e um celular. No binário, isso se traduz em acessos a um ponteiro base com vários 'offsets' (deslocamentos) fixos. Por exemplo, se o celular está no offset +8 da mochila, o código sempre somará 8 ao endereço da mochila para acessá-lo. Identificar structs é um dos trabalhos mais gratificantes na engenharia reversa, pois o código passa de 'ponteiro+24' para 'usuario->email'. O Ghidra possui o 'Structure Editor', uma ferramenta poderosa onde você pode desenhar sua struct, definir os tipos de cada campo e depois aplicá-la globalmente.",
    codes: [
      {
        lang: "asm",
        code: "MOV EAX, [RCX]        ; Pega o ID (offset +0)\nMOV RDX, [RCX + 8]    ; Pega o ponteiro do Nome (offset +8)\nMOV [RCX + 16], 1     ; Define status como ativo (offset +16)",
        label: "Acesso a campos de uma struct via offsets"
      },
      {
        lang: "c",
        code: "struct User {\n    int id;           // +0\n    char *name;       // +8 (alinhamento de 8 bytes em x64)\n    int active;       // +16\n};",
        label: "Definição correspondente no Ghidra"
      }
    ],
    points: [
      "Structs agrupam tipos de dados diferentes em um único bloco.",
      "O alinhamento (padding) é inserido pelo compilador para performance.",
      "No Ghidra, use o 'Data Type Manager' para criar novas structs.",
      "Você pode renomear os campos da struct para dar sentido ao código.",
      "Aplicar uma struct a um parâmetro limpa todo o código da função.",
      "Structs podem conter outras structs dentro delas.",
      "A ferramenta 'Fill in structured data' pode ajudar a automatizar a criação."
    ],
    alerts: [
      {
        type: "info",
        content: "Compiladores costumam alinhar campos de 8 bytes em endereços múltiplos de 8. Isso cria 'buracos' (padding) na struct que você deve preencher no Ghidra."
      },
      {
        type: "success",
        content: "Depois de definir uma struct, você pode exportá-la para um arquivo .h para usar em outros projetos ou ferramentas."
      }
    ]
  },
  {
    slug: "enums-ghidra",
    section: "funcoes-tipos",
    title: "Enums: Constantes Nomeadas no Binário",
    difficulty: "intermediario",
    subtitle: "Dando nome aos bois (e aos números mágicos)",
    intro: "Você está analisando um código e vê: 'if (status == 3)'. O que é 3? Pode ser 'Erro de Rede', 'Usuário Logado' ou 'Arquivo não Encontrado'. Números mágicos são os inimigos da clareza. Enums (Enumerações) resolvem isso. No binário, o enum desaparece e vira apenas o número, mas no Ghidra você pode recriar essa tabela de nomes. Ao definir um Enum no Data Type Manager e aplicá-lo a uma variável, o Decompilador troca automaticamente o '3' por 'STATUS_NETWORK_ERROR'. É como colocar legendas em um filme numa língua que você não domina: de repente, tudo faz sentido.",
    codes: [
      {
        lang: "c",
        code: "if (param_1 == 1) {\n    do_start();\n} else if (param_1 == 2) {\n    do_stop();\n}",
        label: "Código original com números mágicos"
      },
      {
        lang: "c",
        code: "if (action == CMD_START) {\n    do_start();\n} else if (action == CMD_STOP) {\n    do_stop();\n}",
        label: "Código após aplicação de Enum"
      }
    ],
    points: [
      "Enums mapeiam nomes para valores inteiros constantes.",
      "Melhoram drasticamente a legibilidade de instruções 'switch'.",
      "Crie Enums no 'Data Type Manager' -> botão direito -> New -> Enum.",
      "Use a tecla 'E' para aplicar um enum a um número no Listing View.",
      "Enums podem ter valores específicos ou sequenciais.",
      "Muitas APIs do Windows usam enums para flags (ex: permissões de arquivo).",
      "O Ghidra permite importar enums de arquivos C headers."
    ],
    alerts: [
      {
        type: "tip",
        content: "Muitos enums são usados como bitmasks (onde cada bit é uma flag). No editor de enums, você pode definir valores em hexadecimal para facilitar o alinhamento de bits."
      }
    ]
  },
  {
    slug: "typedef-ghidra",
    section: "funcoes-tipos",
    title: "Typedefs e Apelidos de Tipo",
    difficulty: "intermediario",
    subtitle: "Simplificando nomes e importando definições de API",
    intro: "Programadores adoram dar apelidos às coisas. Em vez de escrever 'unsigned int' toda hora, eles preferem 'DWORD'. Em vez de 'void*', usam 'HANDLE'. Esses são os typedefs. No Ghidra, usar typedefs não muda o tamanho do dado, mas muda como você lê o código. Se você vê um 'HMODULE', você já sabe que aquele número é um endereço base de uma DLL carregada. Além disso, o Ghidra permite importar milhares desses tipos de uma vez através do 'Parse C Source'. Você pode carregar os cabeçalhos oficiais do Windows ou do Linux, e o Ghidra passará a reconhecer instantaneamente tipos complexos da API, poupando horas de trabalho manual.",
    codes: [
      {
        lang: "c",
        code: "typedef unsigned long long QWORD;\ntypedef void* PVOID;",
        label: "Definições comuns de tipos"
      },
      {
        lang: "c",
        code: "HMODULE hMod = GetModuleHandleA(\"user32.dll\");\n// HMODULE é um typedef para um ponteiro",
        label: "Uso de tipos da API Windows"
      }
    ],
    points: [
      "Typedefs criam apelidos para tipos existentes, sem criar novos tipos reais.",
      "São essenciais para análise de código que usa APIs de sistema (Win32, POSIX).",
      "O Ghidra possui arquivos de tipos (.gdt) pré-compilados para várias plataformas.",
      "Use 'File -> Parse C Source' para importar seus próprios cabeçalhos.",
      "Facilitam a comunicação entre analistas ('Isso aqui é um HWND').",
      "Ajudam o decompilador a escolher a assinatura correta de funções de biblioteca.",
      "Podem ser usados para criar 'tipos opacos' onde você ainda não conhece a estrutura interna."
    ],
    alerts: [
      {
        type: "info",
        content: "Ao importar arquivos C, o Ghidra pode reclamar de macros não definidas. Você pode adicionar definições extras na tela de configuração do parser."
      }
    ]
  },
  {
    slug: "ponteiros-funcao",
    section: "funcoes-tipos",
    title: "Ponteiros de Função: Quando o Código Chama Endereços",
    difficulty: "intermediario",
    subtitle: "Desvendando chamadas indiretas e callbacks",
    intro: "Normalmente, uma chamada de função é direta: 'CALL 0x401000'. Mas e quando o código faz 'CALL RAX'? Aqui, o endereço de destino está guardado dentro de um registrador. Isso é um ponteiro de função. É como um GPS que não te dá o endereço final, mas te manda ler um bilhete que diz para onde ir. Isso é muito comum em tabelas de despacho, callbacks de eventos e sistemas de plugins. Para o Ghidra, seguir esses ponteiros pode ser um desafio, pois o destino pode mudar durante a execução. Como analista, seu trabalho é identificar onde esse ponteiro é carregado para descobrir quais funções podem ser chamadas ali.",
    codes: [
      {
        lang: "asm",
        code: "LEA RAX, [target_function]\nMOV [RBX + 8], RAX      ; Guarda o endereço da função na struct\n...\nCALL qword ptr [RBX + 8] ; Chama a função guardada anteriormente",
        label: "Chamada indireta via ponteiro em struct"
      },
      {
        lang: "c",
        code: "typedef void (*callback_t)(int);\nvoid register_event(callback_t cb) {\n    cb(42); // Chamada indireta\n}",
        label: "Definição de ponteiro de função em C"
      }
    ],
    points: [
      "Ponteiros de função armazenam o endereço de memória de um código executável.",
      "Aparecem como chamadas indiretas no assembly (CALL RAX, CALL [RSP+8]).",
      "São a base para polimorfismo e tabelas de funções virtuais.",
      "O Ghidra pode mostrar esses destinos no decompilador se o tipo for bem definido.",
      "Análise dinâmica (debugger) costuma ser a forma mais rápida de resolver destinos complexos.",
      "Muitas vezes usados em 'Jump Tables' de comandos switch.",
      "Identificar o tipo do ponteiro ajuda o Ghidra a mostrar os argumentos da função chamada."
    ],
    alerts: [
      {
        type: "warning",
        content: "Malwares usam ponteiros de função para ofuscar o fluxo de controle, dificultando a análise estática simples."
      },
      {
        type: "tip",
        content: "No Ghidra, você pode usar referências (XREFs) no endereço da variável que guarda o ponteiro para ver quem o preenche."
      }
    ]
  },
  {
    slug: "heranca-c-patterns",
    section: "funcoes-tipos",
    title: "Padrões de OOP em C++: Herança e Vtables",
    difficulty: "intermediario",
    subtitle: "Reconstruindo classes e objetos no decompilador",
    intro: "O C++ introduz a Programação Orientada a Objetos, e no nível binário, isso traz as Vtables (Virtual Tables). Se uma classe tem métodos virtuais, o primeiro campo do objeto será um ponteiro para uma tabela de endereços de funções. Quando o código chama um método, ele consulta essa tabela. Analisar C++ sem entender vtables é como tentar entender uma peça de teatro onde os atores trocam de papel no meio da cena sem avisar. O Ghidra permite reconstruir essas estruturas: você define a struct da vtable, define a struct da classe começando com o ponteiro da vtable, e 'voilà', o decompilador transforma chamadas obscuras em 'objeto->metodo_virtual()'.",
    codes: [
      {
        lang: "asm",
        code: "MOV RAX, [RCX]         ; Pega o ponteiro da Vtable do objeto em RCX\nCALL qword ptr [RAX + 16] ; Chama o 3º método virtual (offset 16)",
        label: "Chamada de método virtual em C++"
      },
      {
        lang: "c",
        code: "struct MyClass_Vtable {\n    void* dtor;        // +0\n    void* process;     // +8\n    void* get_id;      // +16\n};\n\nstruct MyClass {\n    MyClass_Vtable* vtable;\n    int data;\n};",
        label: "Reconstrução da estrutura de classe no Ghidra"
      }
    ],
    points: [
      "Vtables permitem que classes filhas sobrescrevam métodos das classes mãis.",
      "O ponteiro para a vtable (vptr) é quase sempre o primeiro campo do objeto.",
      "Construtores são fáceis de achar porque eles preenchem o vptr.",
      "Cada classe tem sua própria Vtable estática no binário.",
      "No Ghidra, crie uma struct para a vtable e use-a como tipo do primeiro campo da classe.",
      "RTTI (Run-Time Type Information) pode dar dicas dos nomes reais das classes.",
      "Destrutores costumam ser os primeiros itens na vtable."
    ],
    alerts: [
      {
        type: "info",
        content: "Em x64, os métodos virtuais são ponteiros de 8 bytes. No x86, são de 4 bytes."
      },
      {
        type: "success",
        content: "O uso de scripts como o 'Ghidra-Cpp-Class-Analyzer' pode automatizar muito a reconstrução de hierarquias de classes."
      }
    ]
  },
  {
    slug: "propagacao-tipos",
    section: "funcoes-tipos",
    title: "Propagação de Tipos: Fazendo o Decompilador Trabalhar para Você",
    difficulty: "intermediario",
    subtitle: "O efeito dominó da informação correta",
    intro: "A engenharia reversa no Ghidra é um processo iterativo. Você descobre uma pequena verdade, e essa verdade revela outras maiores. A propagação de tipos é o coração disso. Quando você define que o parâmetro de uma função é um ponteiro para uma struct 'USUARIO', o Ghidra olha para todas as vezes que esse parâmetro é usado dentro daquela função (e nas funções que ela chama) e atualiza a exibição. É como acender uma lanterna em uma caverna: a luz se reflete nas paredes e revela o que estava escondido nas sombras. Se você fizer o trabalho bem feito na base (parâmetros e variáveis globais), o resto do código quase 'se resolve sozinho'.",
    codes: [
      {
        lang: "c",
        code: "void process(long param_1) {\n    *(int *)(param_1 + 8) = 0;\n}",
        label: "Antes da definição de tipo (bruto)"
      },
      {
        lang: "c",
        code: "void process(ConfigStruct *config) {\n    config->is_initialized = 0;\n}",
        label: "Depois de definir param_1 como ConfigStruct*"
      }
    ],
    points: [
      "Definir o tipo de um parâmetro afeta todos os usos dessa variável na função.",
      "O Decompilador usa análise de fluxo de dados para propagar os tipos.",
      "Comece definindo tipos de funções conhecidas da biblioteca (ex: de sockets ou arquivos).",
      "Use 'Retype Variable' (Ctrl+L) no decompilador para forçar um tipo.",
      "O Ghidra tenta 'adivinhar' tipos (especulativo), mas a confirmação manual é essencial.",
      "Ponteiros para ponteiros (**ptr) são comuns e exigem atenção redobrada.",
      "A propagação funciona melhor quando as assinaturas de funções (Function Signatures) estão corretas."
    ],
    alerts: [
      {
        type: "success",
        content: "Dica de ouro: Comece renomeando e tipando as funções de log ou erro. Elas costumam dar nomes de variáveis e estruturas de graça!"
      },
      {
        type: "danger",
        content: "Cuidado ao forçar tipos. Se você definir um tipo maior que o real, o Decompilador pode esconder acessos a variáveis vizinhas na memória."
      }
    ]
  }
];
