import { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "o-que-e-assembly",
    section: "assembly-x86",
    title: "O que é Assembly?",
    difficulty: "iniciante",
    subtitle: "A linguagem do coração do processador",
    intro: "Imagine que você está tentando explicar para um robô exatamente como fritar um ovo. Você não pode simplesmente dizer 'frite o ovo'; você precisa dizer 'estenda o braço', 'feche a pinça', 'suba 10 centímetros'. O Assembly é exatamente isso para o computador. Enquanto linguagens como C ou Python são como conversas formais ou manuais de instrução de alto nível, o Assembly é como falar diretamente no ouvido do processador, sussurrando ordens em sua língua nativa. É a representação legível por humanos dos códigos binários (0s e 1s) que a CPU realmente executa. Cada instrução Assembly corresponde a uma operação física que o silício do seu computador realiza. No mundo da engenharia reversa, entender Assembly é como ter visão de raio-X: você para de ver o que o programador queria fazer e começa a ver o que o computador está realmente fazendo. Dominar o x86 e o x64 é fundamental, pois essa arquitetura alimenta a vasta maioria dos desktops e servidores onde softwares complexos e malwares operam.",
    codes: [
      {
        lang: "assembly",
        label: "Exemplo básico de Assembly x64",
        code: "mov rax, 1          ; Coloca o número 1 no registrador RAX\nadd rax, 2          ; Soma 2 ao valor que já estava em RAX (agora é 3)\nret                 ; Retorna da função com o resultado em RAX"
      }
    ],
    points: [
      "Linguagem de mais baixo nível legível por humanos",
      "Mapeamento direto (quase 1:1) com opcodes binários",
      "Essencial para entender como o software interage com o hardware",
      "x86 (32-bits) e x64 (64-bits) são as arquiteturas dominantes em PCs",
      "Diferente do ARM (mobile), x86 usa um conjunto complexo de instruções (CISC)",
      "No Ghidra, o Assembly é o que você vê na 'Listing View'"
    ],
    alerts: [
      {
        type: "info",
        content: "Cada arquitetura (ARM, MIPS, x86) tem seu próprio Assembly. Se você aprender um, os outros ficam muito mais fáceis!"
      },
      {
        type: "tip",
        content: "O Ghidra facilita sua vida transformando o Assembly em C no Decompilador, mas o Assembly nunca mente."
      }
    ]
  },
  {
    slug: "registradores",
    section: "assembly-x86",
    title: "Registradores: As Gavetas do Processador",
    difficulty: "iniciante",
    subtitle: "Onde o processador guarda o que está usando agora",
    intro: "Pense na CPU como um mestre de obras em sua bancada de trabalho. A memória RAM é como um enorme armário no fundo da oficina: cabe muita coisa, mas demora para buscar. Já os registradores são as gavetas pequenas e rápidas integradas à própria bancada. O processador só consegue fazer contas ou tomar decisões com dados que estão dentro dessas 'gavetas'. Em x64, temos registradores de propósito geral como RAX (usado para retornos e acumulador), RBX, RCX (contador) e RDX. Além desses, temos os 'especialistas': RSP (o ponteiro da pilha, que sempre sabe onde está o topo), RBP (base da pilha) e o famosíssimo RIP (Instruction Pointer), que é como o dedo do mestre de obras apontando para qual linha do manual ele deve ler a seguir. Uma curiosidade mágica é a 'retrocompatibilidade': o EAX é a metade de 32 bits do RAX, o AX é a metade de 16 bits do EAX, e o AL é a parte de 8 bits. É como se uma gaveta grande tivesse divisórias internas que você pode acessar individualmente.",
    codes: [
      {
        lang: "assembly",
        label: "Hierarquia de Registradores",
        code: "mov rax, 0x1122334455667788 ; Preenche todos os 64 bits de RAX\nmov eax, 0x99aabbcc         ; Altera os 32 bits inferiores de RAX (limpa o topo em x64)\nmov ax, 0x4455              ; Altera apenas os 16 bits inferiores\nmov al, 0xff                ; Altera apenas os 8 bits inferiores"
      },
      {
        lang: "assembly",
        label: "Registradores de Controle no Ghidra",
        code: "push rbp                    ; Salva o ponteiro da base da função anterior\nmov rbp, rsp                ; Define a base da função atual como o topo atual\nlea rax, [rip + 0x20]       ; Carrega um endereço relativo à instrução atual"
      }
    ],
    points: [
      "RAX, RBX, RCX, RDX: Registradores de uso geral",
      "RSI e RDI: Frequentemente usados em operações de string e memória",
      "RSP (Stack Pointer): Aponta para o topo da 'pilha de panquecas'",
      "RBP (Base Pointer): Ajuda a localizar variáveis locais",
      "RIP (Instruction Pointer): Guarda o endereço da próxima instrução",
      "Sub-registradores (EAX, AX, AL) permitem acessar frações do dado de 64 bits",
      "R8 até R15: Registradores extras adicionados na arquitetura x64",
      "Registradores são voláteis e extremamente rápidos"
    ],
    alerts: [
      {
        type: "warning",
        content: "Em x64, escrever em um registrador de 32 bits (como EAX) automaticamente zera os 32 bits superiores do seu equivalente de 64 bits (RAX)."
      },
      {
        type: "tip",
        content: "No Ghidra, você pode passar o mouse sobre um registrador para ver seu valor atual durante uma emulação ou depuração."
      }
    ]
  },
  {
    slug: "instrucoes-basicas",
    section: "assembly-x86",
    title: "As Instruções Mais Comuns do x86",
    difficulty: "iniciante",
    subtitle: "O vocabulário básico da CPU",
    intro: "Aprender as instruções do x86 é como aprender os verbos de uma nova língua. A boa notícia é que, embora existam centenas, você usará cerca de 20 em 90% do tempo. A estrutura é simples: um Verbo (Opcode) e os Objetos (Operandos). No Ghidra, usamos por padrão a sintaxe Intel, que funciona como 'Ação Destino, Fonte'. Por exemplo, `MOV EAX, 10` significa 'Mova para EAX o valor 10'. Temos os verbos de movimento (MOV), os matemáticos (ADD, SUB, INC, DEC) e os lógicos (AND, OR, XOR, NOT). O XOR é uma figurinha carimbada em engenharia reversa: quando você vê `XOR EAX, EAX`, não pense que é uma conta complexa; é apenas o jeito mais rápido e eficiente que o compilador encontrou para dizer 'zere o registrador EAX'.",
    codes: [
      {
        lang: "assembly",
        label: "Sintaxe Intel vs AT&T",
        code: "; Intel (Ghidra Default): Verbo Destino, Fonte\nmov eax, 1                  ; EAX = 1\n\n; AT&T (Linux/GCC): Verbo Fonte, Destino\nmovl $1, %eax               ; EAX = 1"
      },
      {
        lang: "assembly",
        label: "Operações Comuns",
        code: "inc ecx                     ; ECX = ECX + 1 (Incremento)\ndec edx                     ; EDX = EDX - 1 (Decremento)\nadd rax, rbx                ; RAX = RAX + RBX\nxor eax, eax                ; EAX = 0 (Trick comum de otimização)"
      }
    ],
    points: [
      "Opcode: O código da operação (ex: MOV, ADD)",
      "Operandos: O que será afetado (Registradores, Memória ou Valores Fixos)",
      "Sintaxe Intel: O destino vem primeiro",
      "MOV: Cópia de dados (não é um 'mover' que deleta a fonte, é um 'copiar')",
      "XOR EAX, EAX: Método padrão para zerar um registrador",
      "LEA: Load Effective Address (calcula endereços sem acessar a memória)",
      "NOP: No Operation (não faz nada, gasta um ciclo de clock)"
    ],
    alerts: [
      {
        type: "info",
        content: "O Ghidra permite trocar entre Intel e AT&T nas opções, mas a comunidade de RE usa quase exclusivamente Intel."
      },
      {
        type: "success",
        content: "Muitas instruções têm tamanhos diferentes. 'MOV EAX, 1' ocupa menos bytes no binário que 'MOV RAX, 1'."
      }
    ]
  },
  {
    slug: "mov-e-aritmetica",
    section: "assembly-x86",
    title: "MOV e Aritmética: Movendo Dados e Calculando",
    difficulty: "iniciante",
    subtitle: "A dança dos dados e os cálculos matemáticos",
    intro: "A instrução MOV é a operária mais dedicada do processador. Ela está em todo lugar, movendo dados de uma 'gaveta' (registrador) para outra ou entre a bancada e o armário (memória). Mas cuidado: você não pode mover dados diretamente de um endereço de memória para outro em uma única instrução x86; você precisa passar por um registrador primeiro. É como se você não pudesse passar um prato de uma mesa para outra sem segurá-lo nas mãos por um segundo. Já a parte aritmética envolve ADD e SUB para somas simples, e as versões mais 'pesadas' IMUL (multiplicação) e IDIV (divisão). No RE, entender como esses cálculos são feitos ajuda a reconstruir fórmulas matemáticas ou algoritmos de criptografia que o programador original escreveu.",
    codes: [
      {
        lang: "assembly",
        label: "Modos de Endereçamento",
        code: "mov eax, [rbx]              ; Move para EAX o que está no endereço apontado por RBX\nmov eax, [rbp - 0x10]       ; Move para EAX uma variável local na pilha\nmov eax, [rcx + rdx*4]      ; Acessa um array: base RCX, índice RDX, elemento de 4 bytes"
      },
      {
        lang: "assembly",
        label: "Função de Soma Simples",
        code: "mov eax, edi                ; EDI contém o primeiro argumento (x64 Linux)\nadd eax, esi                ; ESI contém o segundo argumento\nret                         ; Retorna o resultado em EAX"
      }
    ],
    points: [
      "MOV r64, r64: Copia entre registradores",
      "MOV r64, [mem]: Lê da memória (Dereference)",
      "MOV [mem], r64: Escreve na memória",
      "IMUL/IDIV: Lidam com números com sinal (Signed)",
      "Endereçamento complexo: [base + index*scale + disp]",
      "O processador faz contas binárias, mas o Ghidra pode mostrar em Hex ou Decimal"
    ],
    alerts: [
      {
        type: "danger",
        content: "Divisão por zero em IDIV causa um crash imediato do programa no Windows e Linux."
      },
      {
        type: "tip",
        content: "Se vir 'LEA RAX, [RBP + -0x8]', o Ghidra está te mostrando um cálculo de endereço, não um acesso à memória."
      }
    ]
  },
  {
    slug: "pilha-stack",
    section: "assembly-x86",
    title: "A Pilha (Stack): Como o Programa Organiza Tudo",
    difficulty: "iniciante",
    subtitle: "Uma pilha de pratos de endereços de memória",
    intro: "A Pilha (ou Stack) é a estrutura de dados mais importante para entender o fluxo de um programa. Imagine uma pilha de pratos de panquecas brasileiras: você sempre coloca uma nova panqueca no topo e sempre retira a que está por cima. Se você tentar tirar uma do meio, tudo desmorona. No computador, a pilha funciona assim, mas com uma pegadinha: ela cresce 'para baixo'. Quando você adiciona algo (instrução PUSH), o endereço de memória diminui. Quando você remove (instrução POP), o endereço aumenta. A pilha é usada para guardar variáveis locais, endereços de retorno de funções e, às vezes, passar argumentos. O registrador RSP é o 'vigilante do topo': ele sempre aponta para a panqueca mais fresca.",
    codes: [
      {
        lang: "assembly",
        label: "Operações de Pilha",
        code: "push rax                    ; Diminui RSP por 8 e copia RAX para o topo\npush 0x123                  ; Coloca um valor fixo na pilha\npop rbx                     ; Copia o valor do topo para RBX e aumenta RSP por 8"
      },
      {
        lang: "assembly",
        label: "O 'Prólogo' de uma função",
        code: "push rbp                    ; Salva o ponteiro base da função pai\nmov rbp, rsp                ; O topo atual vira a nova base para esta função\nsub rsp, 0x20               ; Abre espaço para 32 bytes de variáveis locais"
      }
    ],
    points: [
      "LIFO: Last-In, First-Out (Último a entrar, primeiro a sair)",
      "Cresce para endereços menores (Downwards)",
      "RSP (Stack Pointer): Aponta para o endereço do topo atual",
      "PUSH: Insere dados e decrementa o RSP",
      "POP: Remove dados e incrementa o RSP",
      "Stack Frame: O pedaço da pilha que pertence a uma função específica",
      "Variáveis locais são acessadas como offsets de RBP ou RSP (ex: [rbp-4])"
    ],
    alerts: [
      {
        type: "info",
        content: "A pilha é onde os famosos 'Stack-based Buffer Overflows' acontecem quando um programa escreve demais e estoura o espaço reservado."
      },
      {
        type: "warning",
        content: "Sempre que houver um PUSH, deve haver um POP equivalente antes da função terminar, ou o programa vai saltar para o lugar errado!"
      }
    ]
  },
  {
    slug: "call-ret",
    section: "assembly-x86",
    title: "CALL e RET: Como Funções São Chamadas",
    difficulty: "iniciante",
    subtitle: "Indo e voltando nas tarefas do programa",
    intro: "O computador executa instruções uma após a outra, como uma receita de bolo. Mas e se a receita disser 'agora faça a cobertura conforme a página 50'? Você precisa marcar onde parou na página atual, ir para a 50, terminar a cobertura e depois saber voltar exatamente para onde estava. O CALL faz exatamente isso: ele salva o endereço da próxima instrução na Pilha (o endereço de retorno) e pula para o endereço da função. Quando a função termina, ela usa o RET, que olha para o topo da pilha, pega aquele endereço salvo e pula de volta. Se alguém (um hacker, talvez?) conseguir mudar esse endereço na pilha enquanto a função está rodando, ele consegue 'sequestrar' o fluxo do programa para onde ele quiser.",
    codes: [
      {
        lang: "assembly",
        label: "Fluxo de Chamada",
        code: "; No chamador:\ncall 0x401234               ; Salva endereço atual na pilha e pula para 0x401234\n\n; Na função chamada (0x401234):\npush rbp                    ; Prólogo...\n... código ...\npop rbp                     ; Epílogo...\nret                         ; Pega endereço da pilha e pula de volta"
      }
    ],
    points: [
      "CALL: Salva RIP na pilha e desvia a execução",
      "RET: Retira o topo da pilha e coloca no RIP",
      "Endereço de Retorno: A bússola que guia o programa de volta para casa",
      "O par CALL/RET é a base de toda a modularidade em software",
      "Corromper o endereço de retorno na pilha é uma técnica clássica de exploit",
      "No Ghidra, o 'Function Graph' mostra essas chamadas como setas entre blocos"
    ],
    alerts: [
      {
        type: "danger",
        content: "Se a pilha estiver desalinhada (um PUSH a mais que não teve POP), o RET vai falhar miseravelmente, tentando saltar para um dado qualquer como se fosse código."
      },
      {
        type: "tip",
        content: "Em x64, antes de um CALL, você verá argumentos sendo colocados em registradores como RCX, RDX ou RDI dependendo do sistema operacional."
      }
    ]
  },
  {
    slug: "jumps-condicionais",
    section: "assembly-x86",
    title: "Saltos Condicionais: JMP, JE, JNE, JZ...",
    difficulty: "iniciante",
    subtitle: "As encruzilhadas do código",
    intro: "Imagine que você está dirigindo e chega em um cruzamento: 'Se o sinal estiver verde, siga em frente; se estiver vermelho, pare'. Na CPU, isso é feito em dois passos. Primeiro, ela faz uma comparação (instrução CMP ou TEST), que não muda nada nos dados, mas levanta pequenas 'bandeiras' (Flags) no processador. Depois, vem um salto condicional (Jcc). O JMP é o rebelde incondicional: ele pula sempre, não importa o quê. Já o JE (Jump if Equal) só pula se a comparação anterior deu igual. O JNE (Jump if Not Equal) pula se deu diferente. É assim que os blocos `if-else` e `switch` do C e do Java se transformam em realidade física no processador.",
    codes: [
      {
        lang: "c",
        label: "Código em C",
        code: "if (a == 10) {\n    fazer_algo();\n} else {\n    outra_coisa();\n}"
      },
      {
        lang: "assembly",
        label: "Assembly Equivalente",
        code: "cmp eax, 10                 ; Compara EAX com 10\njne bloco_else              ; Se NÃO for igual, pula para o else\ncall fazer_algo             ; Se chegou aqui, era igual\njmp fim                     ; Pula o else para não executar os dois\nbloco_else:\ncall outra_coisa\nfim:"
      }
    ],
    points: [
      "JMP: Salto incondicional (sempre pula)",
      "JE/JZ: Pula se igual / zero",
      "JNE/JNZ: Pula se diferente / não zero",
      "JG/JL: Pula se maior / menor (com sinal)",
      "JA/JB: Pula se acima / abaixo (sem sinal)",
      "CMP: Compara subtraindo internamente e ajustando flags",
      "TEST: Compara usando lógica AND (comum para checar se algo é nulo)"
    ],
    alerts: [
      {
        type: "info",
        content: "No Ghidra, o Function Graph desenha setas VERDES para saltos que acontecem (condição verdadeira) e VERMELHAS para saltos que não acontecem."
      },
      {
        type: "success",
        content: "Aprender a ler saltos é 50% do trabalho de entender a lógica de um crackme ou malware."
      }
    ]
  },
  {
    slug: "loops-em-assembly",
    section: "assembly-x86",
    title: "Loops em Assembly: FOR e WHILE Revelados",
    difficulty: "iniciante",
    subtitle: "Fazendo a mesma coisa, de novo e de novo",
    intro: "Um loop nada mais é do que um salto condicional que aponta para 'trás', para uma instrução que já foi executada. Em C, temos `for`, `while` e `do-while`, mas para a CPU, todos eles parecem muito parecidos. Geralmente existe um contador (como o famoso `i`), uma comparação no início ou no fim, e um salto de volta para o topo do bloco. O Ghidra é excelente em mostrar isso visualmente: no gráfico de funções, um loop aparece como um ciclo de setas que volta para um bloco superior. Embora exista uma instrução chamada `LOOP` no x86, os compiladores modernos quase nunca a usam porque ela é lenta; eles preferem a combinação de `DEC ECX` + `JNZ` (decrementar e pular se não for zero).",
    codes: [
      {
        lang: "c",
        label: "Loop For em C",
        code: "for (int i = 0; i < 5; i++) {\n    print(i);\n}"
      },
      {
        lang: "assembly",
        label: "Loop For em Assembly",
        code: "xor ecx, ecx                ; i = 0\ntopo_loop:\ncmp ecx, 5                  ; i < 5?\njge fim_loop                ; Se i >= 5, sai do loop\npush rcx                    ; Salva contador (print pode mudar ele)\ncall print                  ; Chama corpo do loop\npop rcx                     ; Restaura contador\ninc ecx                     ; i++\njmp topo_loop               ; Volta para o teste\nfim_loop:"
      }
    ],
    points: [
      "Loops são compostos por: Inicialização, Teste, Corpo e Incremento",
      "Um 'while' testa no início; um 'do-while' testa no fim",
      "Visualmente, loops formam 'laços' no grafo do Ghidra",
      "O registrador RCX é historicamente o contador (C de Count)",
      "Loops infinitos são apenas um JMP apontando para si mesmo",
      "Otimizações de compilador podem 'desenrolar' (unroll) loops pequenos"
    ],
    alerts: [
      {
        type: "tip",
        content: "Ao analisar um loop no Ghidra, identifique primeiro o 'Contador' e o 'Limite' para entender quantas vezes ele roda."
      },
      {
        type: "info",
        content: "Compiladores modernos podem transformar loops complexos em instruções vetoriais (SSE/AVX) que processam vários dados de uma vez!"
      }
    ]
  },
  {
    slug: "convencoes-chamada",
    section: "assembly-x86",
    title: "Convenções de Chamada: Quem Passa o Quê?",
    difficulty: "intermediario",
    subtitle: "O contrato social entre funções",
    intro: "Imagine que você vai contratar um serviço. Existe um acordo: 'Eu deixo as ferramentas na caixa azul e você me entrega o resultado na caixa vermelha'. Se cada um usar uma cor diferente, nada funciona. As Convenções de Chamada (Calling Conventions) são esse acordo para funções. No x64, a bagunça diminuiu, mas ainda temos dois mundos: no Windows, os primeiros 4 argumentos vão para RCX, RDX, R8 e R9. No Linux/Mac, os 6 primeiros vão para RDI, RSI, RDX, RCX, R8 e R9. O resultado (retorno) da função quase sempre volta na gaveta RAX. Entender isso é vital no Ghidra, porque quando você vê uma função ser chamada, você precisa saber em quais registradores olhar para descobrir quais dados estão sendo passados para ela.",
    codes: [
      {
        lang: "assembly",
        label: "Chamada no Windows (x64 Microsoft)",
        code: "mov rcx, 1                  ; Argumento 1\nmov rdx, 2                  ; Argumento 2\nmov r8, 3                   ; Argumento 3\nmov r9, 4                   ; Argumento 4\ncall minha_funcao"
      },
      {
        lang: "assembly",
        label: "Chamada no Linux (x64 System V)",
        code: "mov rdi, 1                  ; Argumento 1\nmov rsi, 2                  ; Argumento 2\nmov rdx, 3                  ; Argumento 3\nmov rcx, 4                  ; Argumento 4\nmov r8, 5\nmov r9, 6\ncall minha_funcao"
      }
    ],
    points: [
      "x64 Windows: RCX, RDX, R8, R9",
      "x64 Linux: RDI, RSI, RDX, RCX, R8, R9",
      "RAX: O padrão universal para valores de retorno",
      "Shadow Space: O Windows reserva 32 bytes na pilha mesmo se usar registradores",
      "Caller-saved vs Callee-saved: Quais registradores a função tem que devolver limpos",
      "O Ghidra tenta identificar a convenção automaticamente (ex: __stdcall, __fastcall)"
    ],
    alerts: [
      {
        type: "warning",
        content: "Em 32 bits (x86), a maioria das convenções passava TUDO pela pilha. É muito mais trabalhoso de ler!"
      },
      {
        type: "tip",
        content: "No Decompilador do Ghidra, você pode clicar com o botão direito na função e em 'Edit Function Signature' para corrigir a convenção se ele errar."
      }
    ]
  },
  {
    slug: "flags-registrador",
    section: "assembly-x86",
    title: "O Registrador de Flags: EFLAGS e RFLAGS",
    difficulty: "intermediario",
    subtitle: "O painel de luzes de aviso do processador",
    intro: "O registrador de Flags é como o painel de um carro. Ele não guarda números para você usar, mas sim pequenas luzes (bits) que acendem ou apagam dependendo do resultado da última conta. As mais famosas são: ZF (Zero Flag), que acende se o resultado foi zero; SF (Sign Flag), se o resultado foi negativo; e CF (Carry Flag), se houve um 'vai um' na conta. Instruções como `TEST EAX, EAX` são usadas apenas para acender a ZF se EAX for zero. O processador não sabe o que é um 'if', ele só sabe 'pule se a luz ZF estiver acesa'. Dominar as flags permite que você entenda condições complexas que o decompilador às vezes simplifica demais.",
    codes: [
      {
        lang: "assembly",
        label: "Flags em Ação",
        code: "cmp eax, ebx                ; Internamente faz EAX - EBX\n; Se EAX == EBX, o resultado é 0 -> ZF (Zero Flag) = 1\n; Se EAX < EBX, o resultado é negativo -> SF (Sign Flag) = 1\n\ntest eax, eax               ; Faz EAX AND EAX\n; Se EAX for 0, o resultado é 0 -> ZF = 1\njz endereco_nulo            ; Pula se a Zero Flag estiver ligada"
      }
    ],
    points: [
      "ZF (Zero Flag): Ligada se o resultado deu zero",
      "CF (Carry Flag): Ligada se houve transporte (unsigned overflow)",
      "SF (Sign Flag): Ligada se o bit mais significativo é 1 (negativo)",
      "OF (Overflow Flag): Ligada se houve erro em conta com sinal",
      "CMP e TEST: As principais instruções que afetam flags",
      "Flags determinam se um salto condicional (Jcc) será tomado ou não"
    ],
    alerts: [
      {
        type: "info",
        content: "O Ghidra mostra o estado das flags na janela de 'Registers' se você estiver usando o Emulator (Ghidra 10+)."
      },
      {
        type: "tip",
        content: "Muitos malwares usam manipulação direta de flags (ex: instruções LAHF/SAHF) para dificultar a análise automática."
      }
    ]
  },
  {
    slug: "memoria-enderecos",
    section: "assembly-x86",
    title: "Memória e Endereçamento",
    difficulty: "intermediario",
    subtitle: "Como o processador localiza os dados no armário",
    intro: "A memória RAM não é um caos, é um bairro planejado. Temos a seção `.text` (onde fica o código, só para leitura), `.data` (variáveis globais já iniciadas), `.bss` (variáveis globais zeradas) e, claro, o Heap e a Stack. Para acessar qualquer dado, a CPU usa um endereço. No x86, temos um modo de endereçamento super potente que permite calcular um endereço 'na hora' usando uma base, um índice, um multiplicador e um deslocamento: `[base + index * scale + displacement]`. Quando você vê no Ghidra algo como `MOV EAX, [RBP + -0x8]`, ele está acessando uma gaveta específica na pilha (Stack Frame) da função atual.",
    codes: [
      {
        lang: "assembly",
        label: "Acessando um Array",
        code: "; Suponha que RAX aponte para o início de um array de ints (4 bytes cada)\n; Queremos acessar o terceiro elemento (índice 2)\nmov ebx, 2\nmov ecx, [rax + rbx * 4]    ; ECX = array[2]"
      },
      {
        lang: "assembly",
        label: "Endereçamento relativo ao RIP",
        code: "lea rax, [rip + 0x1234]     ; Muito comum em x64 para códigos independentes de posição (PIC)"
      }
    ],
    points: [
      "Seção .text: Sagrada, apenas para execução (Código)",
      "Seção .data/.bss: Onde vivem as globais",
      "Ponteiros: Apenas registradores guardando um número que é um endereço",
      "Endianness: No x86, o byte menos significativo vem primeiro (Little Endian)",
      "Dereferencing: O ato de usar colchetes [] para ler o valor no endereço",
      "Alignment: O processador prefere endereços múltiplos de 4 ou 8"
    ],
    alerts: [
      {
        type: "danger",
        content: "Tentar escrever na seção .text ou ler de um endereço inválido (NULL) gera o famoso Segmentation Fault ou Access Violation."
      },
      {
        type: "info",
        content: "Em x64, quase todos os acessos a variáveis globais são feitos via 'RIP-relative addressing' para facilitar o ASLR (Randomização de Endereço)."
      }
    ]
  },
  {
    slug: "leitura-assembly",
    section: "assembly-x86",
    title: "Como Ler Assembly no Ghidra: Método Prático",
    difficulty: "iniciante",
    subtitle: "A arte de traduzir o silício em pensamento",
    intro: "Ler Assembly não é ler de cima para baixo como um livro de romance. É mais como resolver um quebra-cabeça ou seguir pistas em uma cena de crime. O método ideal no Ghidra é o 'Top-Down Dinâmico'. Primeiro, olhe para o grafo da função para entender o esqueleto (os 'ifs' e 'loops'). Depois, identifique o Prólogo e o Epílogo para saber quanto espaço a função reservou. A pista de ouro são as chamadas de funções conhecidas (como `printf`, `malloc`, `RegOpenKeyEx`). Se você vê uma função ser chamada, os dados movidos para os registradores logo acima são os argumentos. Vá renomeando as variáveis locais (clicando em `local_10` e apertando 'L') conforme descobre o que elas fazem. Se uma variável é comparada com 10 e depois usada em um loop, talvez ela se chame `contador_itens`.",
    codes: [
      {
        lang: "assembly",
        label: "Analisando uma Função Desconhecida",
        code: "; 1. Identifique o fluxo (tem um jump condicional?)\nCMP DWORD PTR [RBP - 0x4], 0x42\nJNE erro\n\n; 2. Identifique constantes (0x42 é 66 em decimal, ou 'B' em ASCII)\n\n; 3. Renomeie no Ghidra!\n; [RBP - 0x4] -> var_input\n; erro -> bloco_saida_invalida"
      }
    ],
    points: [
      "Use o Function Graph para ver a lógica macro",
      "Identifique strings e constantes: elas dão o contexto",
      "Siga o rastro dos argumentos (RDI, RSI, RCX...)",
      "Renomeie TUDO: não deixe 'local_28' se você sabe que é 'senha_usuario'",
      "Use 'Cross References' (X) para ver quem chama essa função",
      "Não tente entender cada instrução individual de primeira; foque no objetivo do bloco"
    ],
    alerts: [
      {
        type: "success",
        content: "A tecla 'L' no Ghidra para renomear variáveis é sua melhor amiga. Use-a sem moderação!"
      },
      {
        type: "tip",
        content: "O Decompilador e o Listing (Assembly) devem ser lidos juntos. Se o Decompilador parecer confuso, o Assembly revelará a verdade."
      }
    ]
  }
];
