import { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "como-funciona-decompiler",
    section: "decompilador",
    title: "Como o Decompilador do Ghidra Funciona",
    difficulty: "iniciante",
    subtitle: "Transformando sopa de letrinhas em código C",
    intro: "Você já tentou transformar um hambúrguer de volta em uma vaca? Decompilar é quase isso. Quando um programa é compilado, muita coisa se perde: nomes de variáveis, comentários e a estrutura original do código são jogados fora para que o processador receba apenas instruções cruas. O decompilador do Ghidra não faz mágica; ele faz uma análise matemática profunda. Primeiro, ele transforma o Assembly em uma linguagem intermediária chamada P-Code (como se fosse um esperanto para CPUs). Depois, ele aplica milhares de regras de simplificação para tentar adivinhar onde estavam os 'ifs', 'whiles' e as variáveis. O resultado é o pseudo-código em C. É 'pseudo' porque, embora pareça C, às vezes ele toma liberdades para mostrar o que o código faz, mesmo que não seja um C 100% elegante ou compilável de volta.",
    codes: [
      {
        lang: "c",
        label: "O que o Decompiler gera (Exemplo)",
        code: "void FUN_00401234(int param_1) {\n    if (param_1 == 0x539) { // 0x539 = 1337\n        print(\"Acesso garantido\");\n    }\n    return;\n}"
      }
    ],
    points: [
      "O Decompilador converte Assembly -> P-Code -> Código C",
      "Baseado em análise de fluxo de dados (Data Flow Analysis)",
      "Nomes de variáveis originais são PERDIDOS (exceto se houver símbolos de debug)",
      "O código gerado é funcionalmente equivalente ao original, mas esteticamente diferente",
      "É a ferramenta mais poderosa do Ghidra para entender lógica complexa rapidamente",
      "Sincronização bidirecional: clique no C e veja o Assembly correspondente brilhar"
    ],
    alerts: [
      {
        type: "info",
        content: "O decompilador do Ghidra é considerado um dos melhores do mundo, competindo até com ferramentas pagas como o IDA Pro."
      },
      {
        type: "warning",
        content: "Nunca confie 100% no Decompilador. Às vezes, otimizações agressivas do compilador original fazem o Ghidra 'alucinar' uma lógica estranha."
      }
    ]
  },
  {
    slug: "lendo-pseudo-codigo",
    section: "decompilador",
    title: "Lendo o Pseudo-Código do Decompilador",
    difficulty: "iniciante",
    subtitle: "Decifrando os segredos do código gerado",
    intro: "Ao abrir o decompilador pela primeira vez, você vai ver nomes como `FUN_00401234`, `param_1` e `local_18`. Não se assuste! O Ghidra é como um tradutor esforçado que não conhece os nomes das pessoas na história, então ele inventa apelidos baseados em endereços ou posições. A leitura do pseudo-código deve ser ativa: você não apenas lê, você interage. Clique em uma variável e veja onde ela é usada. Clique em uma função e mergulhe nela. O Listing View (Assembly) e o Decompiler trabalham em dupla sertaneja: quando você seleciona uma linha em um, o outro pula para o mesmo lugar. Se o código parecer uma maçaroca de tipos como `undefined4`, é apenas o Ghidra dizendo: 'Eu sei que aqui tem 4 bytes de dados, mas ainda não sei se é um número, um caractere ou um ponteiro'.",
    codes: [
      {
        lang: "c",
        label: "Código Típico do Ghidra",
        code: "undefined4 FUN_00101189(int param_1, long param_2) {\n  int local_c;\n  \n  local_c = (int)(param_2 + (long)param_1);\n  return (undefined4)local_c;\n}"
      }
    ],
    points: [
      "Nomes iniciados em FUN_ são endereços de funções",
      "param_X: Argumentos da função identificados pela convenção de chamada",
      "local_X: Variáveis que vivem na pilha (Stack)",
      "undefinedX: Tipos de dados cujo propósito ainda é desconhecido",
      "Clique duplo em funções navega para dentro delas",
      "Botão direito > Rename (ou tecla 'L') é essencial para limpar o código"
    ],
    alerts: [
      {
        type: "tip",
        content: "Use a tecla '/' no Decompiler para adicionar comentários que ajudam você a não se perder em lógicas grandes."
      },
      {
        type: "success",
        content: "A sincronização entre o Decompiler e o Listing é a melhor forma de aprender Assembly: veja o C e olhe para o lado para ver o Assembly equivalente."
      }
    ]
  },
  {
    slug: "variaveis-locais",
    section: "decompilador",
    title: "Variáveis Locais no Decompilador",
    difficulty: "iniciante",
    subtitle: "Identificando os dados temporários",
    intro: "As variáveis locais em Assembly não têm nomes, apenas 'endereços relativos' à pilha. O Ghidra as batiza como `local_` seguido de um número hexadecimal (como `local_10`). Esse número geralmente é o 'offset' (a distância) daquela variável em relação ao ponteiro da base da pilha (RBP) ou do topo (RSP). É como dizer 'o morador que vive 10 casas depois da esquina'. Uma variável `local_8` de 4 bytes (int) é diferente de uma `local_18` de 8 bytes (long/ponteiro). O segredo para uma boa análise é renomear essas variáveis assim que você descobrir o que elas fazem. Se `local_c` recebe o resultado de um `scanf`, ela provavelmente é `input_usuario`.",
    codes: [
      {
        lang: "c",
        label: "Renomeando Variáveis",
        code: "// Antes\nint local_14 = 0;\nwhile (local_14 < 10) {\n    local_14 = local_14 + 1;\n}\n\n// Depois (após apertar 'L' em local_14)\nint i = 0;\nwhile (i < 10) {\n    i = i + 1;\n}"
      }
    ],
    points: [
      "Variáveis locais vivem na memória RAM (Stack) ou em Registradores",
      "O número em local_0x indica a posição na Stack Frame",
      "Variáveis de 4 bytes (undefined4/int) vs 8 bytes (undefined8/long)",
      "O Ghidra usa análise de fluxo para agrupar usos da mesma variável",
      "Renomear variáveis (tecla L) propaga o novo nome em toda a função",
      "Variáveis podem ser 'reutilizadas' pelo compilador, o que às vezes confunde o Ghidra"
    ],
    alerts: [
      {
        type: "info",
        content: "O Ghidra tenta detectar automaticamente o tipo (int, char, etc.), mas você pode ajudar clicando com o botão direito e em 'Retype Variable' (tecla Ctrl+L)."
      },
      {
        type: "tip",
        content: "Se uma variável local parece nunca ser usada, ela pode ser apenas um 'espaço de manobra' (padding) que o compilador deixou na pilha."
      }
    ]
  },
  {
    slug: "parametros-funcao",
    section: "decompilador",
    title: "Parâmetros de Função no Decompilador",
    difficulty: "iniciante",
    subtitle: "O que entra na função?",
    intro: "Os parâmetros (`param_1`, `param_2`, etc.) são os dados que uma função recebe para trabalhar. O Ghidra descobre quantos parâmetros existem olhando para os registradores de convenção de chamada (como RDI, RSI em Linux) ou para a pilha antes de um CALL. Às vezes o Ghidra se engana e acha que uma função recebe 10 parâmetros quando na verdade ela só recebe 2, mas usa muitos registradores para cálculos internos. Você pode corrigir isso usando o 'Edit Function Signature'. Definir o tipo correto do parâmetro (por exemplo, mudar de `int` para `char *`) pode mudar drasticamente a aparência do resto do código, tornando-o muito mais legível, como se você estivesse limpando uma lente suja.",
    codes: [
      {
        lang: "c",
        label: "Ajustando Assinaturas",
        code: "// Ghidra inicial:\nvoid FUN_0040(undefined8 param_1) {\n    puts((char *)param_1);\n}\n\n// Após ajuste para 'char * str':\nvoid print_string(char * str) {\n    puts(str);\n}"
      }
    ],
    points: [
      "Identificados com base na Convenção de Chamada (Calling Convention)",
      "Aparecem como param_1, param_2, etc. por padrão",
      "Mudar o tipo de um parâmetro afeta como o Ghidra interpreta seu uso",
      "Edit Function Signature (tecla F) permite renomear a função e seus parâmetros",
      "Ponteiros passados como parâmetro são a base para structs e arrays",
      "O valor de retorno da função também pode ter seu tipo editado"
    ],
    alerts: [
      {
        type: "danger",
        content: "Cuidado ao deletar parâmetros que o Ghidra detectou; se o Assembly realmente usa aquele registrador como entrada, o pseudo-código vai quebrar."
      },
      {
        type: "success",
        content: "Ao identificar uma função da biblioteca padrão (como 'strcpy'), renomeie-a imediatamente para que o Ghidra use a assinatura correta conhecida."
      }
    ]
  },
  {
    slug: "tipos-de-retorno",
    section: "decompilador",
    title: "Tipos de Retorno e Como Corrigi-los",
    difficulty: "iniciante",
    subtitle: "O que a função nos devolve?",
    intro: "Toda função no mundo do C/C++ retorna algo (mesmo que seja `void`, ou seja, nada). No baixo nível, o retorno quase sempre viaja no registrador RAX (ou EAX). O Ghidra observa o que acontece com o RAX logo antes do `RET` para decidir qual o tipo de retorno. Se ele vê o RAX recebendo um endereço, ele pode colocar `undefined8 *`. Se vê um número pequeno, `int`. Mas ele nem sempre acerta o contexto. Se você sabe que uma função verifica uma senha e retorna verdadeiro ou falso, mudar o retorno de `undefined4` para `bool` (ou `boolean` no Ghidra) fará com que os lugares que chamam essa função mostrem `if (check_password(...))` em vez de `if (FUN_0040(...) != 0)`.",
    codes: [
      {
        lang: "c",
        label: "Melhorando a legibilidade do retorno",
        code: "// Antes\nint is_valid(void) {\n  return 1;\n}\n\n// Depois de editar para 'bool'\nbool is_valid(void) {\n  return true;\n}"
      }
    ],
    points: [
      "O valor de retorno geralmente fica no registrador RAX/EAX",
      "Ghidra usa 'undefined' quando não tem certeza do tipo e tamanho",
      "Corrigir o retorno ajuda a análise de quem chama a função (Cross-references)",
      "Tipos comuns: void, bool, int, char*, pointer",
      "Funções que retornam structs podem ser complexas e usar múltiplos registradores",
      "Use 'Edit Function' para alterar o tipo de retorno na assinatura"
    ],
    alerts: [
      {
        type: "info",
        content: "Em x64, valores de ponto flutuante (float/double) são retornados no registrador XMM0, não no RAX!"
      },
      {
        type: "tip",
        content: "Se uma função termina e o RAX não foi modificado, o Ghidra pode erroneamente achar que o retorno é o que quer que estivesse no RAX antes."
      }
    ]
  },
  {
    slug: "structs-no-decompiler",
    section: "decompilador",
    title: "Structs no Decompilador",
    difficulty: "intermediario",
    subtitle: "Organizando dados complexos",
    intro: "Na programação real, dados raramente andam sozinhos. Eles vivem em `structs` (estruturas). Imagine uma struct `Usuario` que tem um nome (32 bytes), uma idade (4 bytes) e um ID (4 bytes). No Assembly, isso é apenas um grande bloco de 40 bytes. Quando o código acessa `usuario->idade`, você verá algo como `MOV EAX, [RDX + 32]`. Para o Ghidra, isso parece apenas um acesso a memória com offset. A mágica acontece quando você cria uma Struct no 'Data Type Manager' e diz ao Ghidra: 'Ei, aquele parâmetro `param_1` não é um ponteiro qualquer, é um ponteiro para a struct `Usuario`'. Instantaneamente, o código muda de `*(param_1 + 32)` para `param_1->idade`. É como se as peças do quebra-cabeça finalmente se encaixassem.",
    codes: [
      {
        lang: "c",
        label: "Visualização sem Struct",
        code: "void update(long param_1) {\n    *(int *)(param_1 + 0x20) = 10; // O que é + 0x20?\n}"
      },
      {
        lang: "c",
        label: "Visualização com Struct definida",
        code: "void update(Player *param_1) {\n    param_1->health = 10; // Muito mais claro!\n}"
      }
    ],
    points: [
      "Structs são blocos contíguos de memória",
      "Identificadas por acessos frequentes a offsets de um mesmo ponteiro",
      "Podem ser criadas manualmente no Data Type Manager",
      "O comando 'Auto Create Structure' do Ghidra tenta adivinhar os campos",
      "Aplicar structs é o passo final para transformar pseudo-código em código legível",
      "Mudar o tamanho de uma struct no editor atualiza todos os seus usos"
    ],
    alerts: [
      {
        type: "warning",
        content: "O alinhamento de memória (padding) pode deixar buracos vazios dentro das structs. O Ghidra mostra isso como 'field_0x...'"
      },
      {
        type: "tip",
        content: "Se você estiver analisando um jogo ou programa em C++, as VTables de classes se comportam como structs de ponteiros de funções."
      }
    ]
  },
  {
    slug: "ponteiros-decompiler",
    section: "decompilador",
    title: "Ponteiros no Decompilador",
    difficulty: "intermediario",
    subtitle: "A seta que aponta para o tesouro",
    intro: "Ponteiros são apenas variáveis que guardam um endereço de memória. No Decompilador, eles aparecem com o símbolo de asterisco `*` (como `*param_1`) ou como arrays `param_1[0]`. O Ghidra tenta ser inteligente: se ele vê o código somando valores a um ponteiro, ele pode mostrar como um array. Ponteiros duplos (`char **`) são comuns para listas de strings, como o `argv` da função main. Entender ponteiros é fundamental porque quase toda interação com strings, objetos ou arquivos passa por eles. Se o Ghidra mostrar algo como `(int *)0x405000`, ele está dizendo que há um número inteiro guardado exatamente naquele endereço fixo da memória.",
    codes: [
      {
        lang: "c",
        label: "Ponteiros e Dereference",
        code: "int local_10 = 5;\nint *ptr = &local_10; // ptr guarda o endereço de local_10\n*ptr = 10;            // local_10 agora vale 10\n\n// No Ghidra:\n// local_10 = 5;\n// pvVar1 = &local_10;\n// *pvVar1 = 10;"
      }
    ],
    points: [
      "Ponteiros em x64 têm sempre 8 bytes de tamanho",
      "O símbolo '&' pega o endereço (Address of)",
      "O símbolo '*' acessa o valor no endereço (Dereference)",
      "Ponteiros nulos (0x0) causam crashes se acessados",
      "Ghidra usa tipos como 'undefined8 *' para ponteiros de tipo desconhecido",
      "Pode-se trocar entre visualização de array `ptr[i]` e ponteiro `*(ptr + i)`"
    ],
    alerts: [
      {
        type: "info",
        content: "Ponteiros são a base de quase todos os ataques de memória. Se você controla um ponteiro, você controla onde o programa lê ou escreve."
      },
      {
        type: "tip",
        content: "No Ghidra, você pode clicar com o botão direito em um valor e escolher 'Convert to Pointer' para ver para onde ele aponta no binário."
      }
    ]
  },
  {
    slug: "casting-tipos",
    section: "decompilador",
    title: "Casting de Tipos no Pseudo-Código",
    difficulty: "intermediario",
    subtitle: "Forçando o encaixe dos dados",
    intro: "O 'Casting' é quando dizemos ao compilador: 'Eu sei que este dado parece um X, mas trate-o como um Y'. No decompilador do Ghidra, você verá muitos castings como `(int)`, `(char *)` ou o feio `(undefined4 *)`. Isso acontece porque o Assembly não tem tipos, apenas tamanhos. Se o código move 4 bytes de um ponteiro para um registrador e depois usa esse registrador como um número, o Ghidra precisa fazer o casting para que o código em C faça sentido. Muitas vezes, esses castings aparecem porque o tipo da variável original está errado. Se você corrigir o tipo da variável local, muitos castings 'poluentes' desaparecem, deixando o código muito mais limpo e próximo do original.",
    codes: [
      {
        lang: "c",
        label: "Limpando Castings",
        code: "// Ghidra Poluído:\nlong local_10;\nlocal_10 = 0x401234;\n*(int *)(local_10 + 4) = 0;\n\n// Após mudar local_10 para 'int *':\nint *local_10;\nlocal_10 = (int *)0x401234;\nlocal_10[1] = 0; // Bem melhor!"
      }
    ],
    points: [
      "Casting transforma a interpretação de um dado sem mudar seus bits",
      "Comum em operações de aritmética de ponteiros",
      "Aparece muito quando o Ghidra usa tipos genéricos como 'undefined'",
      "Excesso de casting é um sinal de que você precisa definir tipos melhores",
      "Casting para (void *) indica um ponteiro genérico",
      "O decompilador usa castings explícitos para garantir que o código seja 'válido'"
    ],
    alerts: [
      {
        type: "warning",
        content: "Casting de um tipo maior para um menor (ex: long para int) pode resultar em perda de dados se o valor original for muito grande."
      },
      {
        type: "success",
        content: "Ao ver um casting para um tipo complexo, geralmente é uma pista de que ali existe uma struct ou um objeto de classe."
      }
    ]
  },
  {
    slug: "inline-funcoes",
    section: "decompilador",
    title: "Funções Inline no Decompilador",
    difficulty: "intermediario",
    subtitle: "O código que 'se escondeu' dentro de outro",
    intro: "Às vezes, por questão de performance, o compilador decide não criar uma função separada com um `CALL`. Em vez disso, ele copia e cola o código da função diretamente dentro de quem a chamou. Isso é chamado de 'Inlining'. No decompilador, isso pode ser confuso: você verá o código de um `strlen` ou `memcpy` misturado com a lógica da sua função principal, sem nenhuma chamada visível. O Ghidra tenta reconhecer esses padrões, mas nem sempre consegue dar um nome a eles. Funções pequenas de utilidade e macros do C++ são os candidatos mais comuns para inlining. Se você vir um loop estranho manipulando bytes um por um logo após uma string, pode ser um `strcpy` inline.",
    codes: [
      {
        lang: "c",
        label: "Exemplo de strcpy inline",
        code: "char *src = \"hello\";\nchar dst[10];\n// Em vez de call strcpy, você verá:\ndst[0] = src[0];\ndst[1] = src[1];\ndst[2] = src[2];\n// ... etc"
      }
    ],
    points: [
      "Inline evita o custo de criar um novo Stack Frame e fazer o CALL",
      "Comum em funções muito curtas ou críticas para performance",
      "Dificulta o RE pois 'polui' a função principal com detalhes de baixo nível",
      "Funções de string (memset, memcpy) são frequentemente inlined por otimização",
      "Macros (#define) sempre aparecem como inline",
      "Identificar inlines ajuda a ignorar detalhes irrelevantes e focar na lógica central"
    ],
    alerts: [
      {
        type: "info",
        content: "Em C++, o uso de 'templates' frequentemente resulta em muito código inlined."
      },
      {
        type: "tip",
        content: "Se você encontrar um trecho de código repetido em várias funções, mas que não é uma chamada, provavelmente é uma função inline."
      }
    ]
  },
  {
    slug: "limitacoes-decompiler",
    section: "decompilador",
    title: "Limitações e Armadilhas do Decompilador",
    difficulty: "intermediario",
    subtitle: "Quando a máquina falha",
    intro: "O decompilador é uma ferramenta incrível, mas não é infalível. Ele é como um tradutor automático: funciona bem para textos simples, mas se perde em poesias complexas ou gírias. Código ofuscado (feito para ser difícil de ler), código auto-modificável (que muda seus próprios bits enquanto roda) ou otimizações extremas podem fazer o decompilador gerar um código que não faz sentido nenhum ou que esconde partes importantes da lógica. Além disso, o Ghidra pode 'comer' instruções que ele acha que não fazem nada, mas que são importantes para anti-debugging. A regra de ouro é: se o Decompiler parecer estranho demais, a verdade absoluta está no Assembly (Listing View).",
    codes: [
      {
        lang: "assembly",
        label: "Opa! O Decompiler sumiu com isso",
        code: "xor eax, eax\njz verdadeira_funcao          ; O decompiler pode achar que isso é um JMP direto\ndb 0x90, 0x90, 0x90          ; Lixo para confundir a análise"
      }
    ],
    points: [
      "O Decompiler pode simplificar demais e esconder truques maliciosos",
      "Não lida bem com código auto-modificável",
      "Otimizações de cauda (Tail Calls) podem parecer saltos perdidos",
      "Estruturas de exceção (try/catch) frequentemente ficam ilegíveis",
      "Sempre verifique o Assembly se a lógica decompilada não fizer sentido",
      "O output do Decompiler não pode (geralmente) ser recompilado sem muitos ajustes"
    ],
    alerts: [
      {
        type: "danger",
        content: "Malwares usam técnicas de 'Anti-Decompilation' especificamente para fazer o Ghidra travar ou gerar código lixo."
      },
      {
        type: "tip",
        content: "Se o Decompiler mostrar 'Low-level Error', tente analisar as opções de análise da função ou procure por instruções inválidas no Listing."
      }
    ]
  }
];
