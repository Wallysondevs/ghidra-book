import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "if-else-assembly",
    section: "controle-fluxo",
    title: "If/Else em Assembly: Desmontando Decisões",
    difficulty: "iniciante",
    subtitle: "Entendendo como o processador escolhe caminhos",
    intro: "No nível do código fonte, um 'if' parece uma escolha simples. No nível do processador, é uma manobra de precisão. Imagine que você está dirigindo e chega a uma bifurcação: se o sinal estiver verde, você segue reto; se estiver vermelho, você vira à direita. No assembly, isso é feito em duas etapas. Primeiro, o processador compara dois valores (instrução CMP), o que altera as 'flags' de estado. Depois, ele executa um 'salto condicional' (instruções Jcc como JZ, JNZ, JG). Se a condição for atendida, o processador pula para um novo endereço; se não, ele apenas continua para a próxima linha. No Function Graph do Ghidra, isso é visualizado de forma belíssima: blocos com duas saídas, onde a linha verde geralmente representa o caminho 'verdadeiro' e a vermelha o 'falso'. Entender essa estrutura é a chave para ler o fluxo de qualquer programa.",
    codes: [
      {
        lang: "c",
        code: "if (a == 42) {\n    printf(\"Acertou!\");\n} else {\n    printf(\"Errou!\");\n}",
        label: "Lógica em C"
      },
      {
        lang: "asm",
        code: "CMP EAX, 0x2a      ; Compara EAX com 42 (0x2a)\nJZ label_true      ; Se for igual (Zero Flag set), pula para o bloco 'then'\n; Bloco Else começa aqui\nMOV RDX, str_errou\nCALL printf\nJMP label_end      ; Pula o bloco 'then'\nlabel_true:\nMOV RDX, str_acertou\nCALL printf\nlabel_end:",
        label: "Tradução para Assembly x64"
      }
    ],
    points: [
      "Instruções CMP subtraem operandos apenas para atualizar as Flags.",
      "Jcc (Jump Conditional) decide o caminho baseado nas Flags.",
      "JZ/JE pula se for igual; JNZ/JNE pula se for diferente.",
      "O Function Graph do Ghidra usa cores para indicar o resultado dos testes.",
      "Muitos 'if's seguidos podem indicar uma estrutura de decisão complexa.",
      "O compilador pode inverter a lógica do 'if' para otimizar o código.",
      "Saltos incondicionais (JMP) são usados para pular o bloco 'else' após o 'then'."
    ],
    alerts: [
      {
        type: "info",
        content: "No Ghidra, o caminho 'verde' no grafo é o caminho tomado se o salto condicional for seguido."
      },
      {
        type: "tip",
        content: "Se você vir um TEST EAX, EAX seguido de JZ, o código está checando se EAX é zero ou nulo."
      }
    ]
  },
  {
    slug: "switch-case-re",
    section: "controle-fluxo",
    title: "Switch/Case: Tabelas de Jump",
    difficulty: "iniciante",
    subtitle: "Como o compilador lida com múltiplas escolhas",
    intro: "Quando um programa tem muitas opções (como um menu ou um processador de comandos), usar vários 'if/else' seria muito lento. O compilador então usa uma 'Jump Table' (Tabela de Salto). Imagine um elevador: em vez de parar em cada andar e perguntar 'é aqui?', você aperta o botão '8' e ele vai direto para o oitavo andar. A Jump Table é um array de endereços de memória. O processador pega o valor da variável, multiplica pelo tamanho do endereço (4 ou 8 bytes) e pula diretamente para o código correto. No Ghidra, isso aparece como uma instrução JMP seguida de um cálculo aritmético complexo. Identificar essas tabelas é essencial para entender grandes máquinas de estado em binários.",
    codes: [
      {
        lang: "asm",
        code: "CMP EAX, 0x5       ; Checa se o valor está dentro do limite do switch\nJA label_default   ; Se for maior que 5, vai para o default\nMOV RAX, qword ptr [RAX*8 + 0x401230] ; Busca endereço na tabela\nJMP RAX            ; Pula para o caso escolhido",
        label: "Jump Table em Assembly"
      },
      {
        lang: "c",
        code: "switch(val) {\n    case 1: op1(); break;\n    case 2: op2(); break;\n    default: op_def();\n}",
        label: "Representação em C"
      }
    ],
    points: [
      "Switches pequenos (2-3 casos) costumam virar if/else comuns.",
      "Switches grandes usam tabelas de endereços para performance O(1).",
      "Existe quase sempre uma checagem de limite (bound check) antes do salto.",
      "O Ghidra geralmente identifica Jump Tables automaticamente.",
      "Se o Ghidra falhar, você verá um salto para um registrador desconhecido.",
      "Você pode ajudar o Ghidra definindo a tabela de dados como um array de endereços.",
      "Casos que 'caem' no próximo (fall-through) não possuem JMP ou RET ao final do bloco."
    ],
    alerts: [
      {
        type: "warning",
        content: "Tabelas de salto podem ser esparsas, contendo endereços nulos ou para o bloco padrão para valores inexistentes."
      }
    ]
  },
  {
    slug: "for-loop-re",
    section: "controle-fluxo",
    title: "O Loop FOR em Assembly",
    difficulty: "iniciante",
    subtitle: "Contadores, condições e incrementos no binário",
    intro: "O loop 'for' é o operário padrão da programação. Ele tem um começo definido, um fim planejado e um passo constante. No assembly, ele se quebra em quatro partes espalhadas. A inicialização (i=0) acontece antes do loop. A condição (i < 10) é um CMP+Jcc no topo ou no fundo. O corpo do loop vem em seguida, e o incremento (i++) geralmente é a última instrução antes de um JMP de volta para o topo. É como um corredor de atletismo que precisa passar pela marca de largada a cada volta. O compilador às vezes faz 'Loop Unrolling', que é basicamente escrever o código do loop várias vezes seguidas para evitar o gasto de tempo com os saltos, tornando o código maior porém mais rápido.",
    codes: [
      {
        lang: "asm",
        code: "XOR ECX, ECX       ; i = 0 (Inicialização)\nloop_start:\nCMP ECX, 0xA       ; i < 10?\nJGE loop_end       ; Se maior ou igual, sai do loop\n; ... corpo do loop ...\nINC ECX            ; i++ (Incremento)\nJMP loop_start     ; Volta para o teste\nloop_end:",
        label: "Estrutura básica de um loop FOR"
      }
    ],
    points: [
      "A inicialização geralmente usa XOR para zerar registradores.",
      "O incremento (INC ou ADD) é crucial para evitar loops infinitos.",
      "Muitos loops FOR contam de trás para frente (i--) para otimizar o teste de zero.",
      "Loop Unrolling transforma loops pequenos em código linear.",
      "O Ghidra mostra loops como ciclos (setas voltando para cima) no grafo.",
      "Registradores como ECX são historicamente usados como contadores (Count).",
      "O Decompilador tenta reconstruir a sintaxe 'for(;;)' sempre que possível."
    ],
    alerts: [
      {
        type: "tip",
        content: "Se vir um registrador sendo comparado consigo mesmo (XOR EAX, EAX) antes de um loop, ele está sendo inicializado com zero."
      }
    ]
  },
  {
    slug: "while-loop-re",
    section: "controle-fluxo",
    title: "O Loop WHILE em Assembly",
    difficulty: "iniciante",
    subtitle: "Enquanto a verdade durar, o código rodará",
    intro: "O loop 'while' é mais imprevisível que o 'for'. Ele não tem necessariamente um contador; ele depende de uma condição que pode vir de qualquer lugar: um sensor, um arquivo ou a entrada de um usuário. Em assembly, a maior característica do 'while' é que o teste é feito ANTES de qualquer execução do corpo. Se a condição for falsa logo de cara, o corpo nunca é executado. No grafo do Ghidra, você verá uma seta que pula todo o bloco de código logo no início. É como um segurança de balada que checa sua identidade antes mesmo de você entrar: se não tiver o documento, nem pisa no salão.",
    codes: [
      {
        lang: "asm",
        code: "while_start:\nCALL check_condition\nTEST AL, AL\nJZ while_end       ; Se AL for 0 (falso), sai\n; ... corpo do loop ...\nJMP while_start    ; Volta para testar novamente\nwhile_end:",
        label: "While padrão (teste no topo)"
      }
    ],
    points: [
      "O teste ocorre no início do ciclo.",
      "Pode ser executado zero vezes se a condição inicial for falsa.",
      "Muitas vezes usado para ler streams de dados ou buffers de rede.",
      "Loops 'while(1)' ou 'while(true)' aparecem como JMP incondicionais no final do bloco.",
      "Instruções BREAK dentro do while geram saltos extras para fora do ciclo.",
      "CONTINUE gera um salto para o ponto de re-avaliação da condição.",
      "No Decompilador, variáveis de controle de while podem ser complexas."
    ],
    alerts: [
      {
        type: "info",
        content: "O Decompilador do Ghidra às vezes transforma 'while' em 'for' se encontrar um padrão de incremento claro."
      }
    ]
  },
  {
    slug: "do-while-re",
    section: "controle-fluxo",
    title: "O Loop DO-WHILE em Assembly",
    difficulty: "iniciante",
    subtitle: "Execute primeiro, pergunte depois",
    intro: "O 'do-while' é o preferido dos compiladores por uma questão de eficiência. Ao contrário do 'while' tradicional, ele executa o corpo pelo menos uma vez antes de testar a condição. No nível do processador, isso economiza um salto (JMP) inicial, tornando o fluxo de execução mais 'quente' no cache. Muitos loops 'for' escritos por programadores acabam sendo transformados em 'do-while' pelo compilador se ele conseguir provar que a primeira iteração sempre vai acontecer. No grafo do Ghidra, ele é visualizado como um bloco único ou sequência de blocos que termina com um salto condicional voltando para o início. É o estilo 'atira primeiro, pergunta depois' do controle de fluxo.",
    codes: [
      {
        lang: "asm",
        code: "loop_body:\n; ... código executado pelo menos uma vez ...\nCALL check_status\nCMP EAX, 1\nJE loop_body       ; Se status for 1, volta para o início\n; Segue para o resto do código",
        label: "Estrutura enxuta do Do-While"
      }
    ],
    points: [
      "Garantido executar pelo menos uma vez.",
      "Mais eficiente em assembly (menos saltos incondicionais).",
      "O teste de condição fica no final do bloco.",
      "Compiladores modernos convertem 'for' e 'while' para esta forma via otimização.",
      "No Decompilador, aparece com a palavra-chave 'do { ... } while (...);'.",
      "É comum em rotinas de processamento de strings (strlen, strcpy).",
      "Fácil de identificar no grafo por ser um ciclo com o teste na base."
    ],
    alerts: [
      {
        type: "success",
        content: "Entender que o compilador prefere do-while ajuda você a não se confundir quando o código assembly parecer ligeiramente diferente do código C original."
      }
    ]
  },
  {
    slug: "funcoes-recursivas-re",
    section: "controle-fluxo",
    title: "Recursão em Assembly",
    difficulty: "intermediario",
    subtitle: "O espelho infinito da execução",
    intro: "Recursão é quando uma função chama a si mesma para resolver um problema menor. Embora pareça mágica no C, no assembly é apenas mais um 'CALL' para o mesmo endereço de memória onde estamos agora. O segredo (e o perigo) está na pilha (stack). A cada chamada, um novo endereço de retorno e novas variáveis locais são empilhados. Se a recursão for profunda demais, a pilha explode (Stack Overflow). Analisar recursão no Ghidra exige atenção redobrada à 'condição de parada'. Sem ela, o código entra em um loop infinito que consome toda a memória. No Function Graph, você verá uma seta de CALL voltando para o topo da própria função, criando uma espécie de auto-alimentação.",
    codes: [
      {
        lang: "asm",
        code: "fibonacci:\nCMP RCX, 2\nJGE calc_fib       ; Se N >= 2, continua recursão\nMOV RAX, RCX       ; Caso base: retorna N\nRET\ncalc_fib:\nPUSH RCX           ; Salva N atual\nDEC RCX\nCALL fibonacci     ; Chama fibonacci(N-1)\n; ... soma resultados ...",
        label: "Fibonacci recursivo simplificado"
      }
    ],
    points: [
      "Recursão gera múltiplos frames de pilha para a mesma função.",
      "O 'Caso Base' é a instrução que permite a função retornar sem se chamar de novo.",
      "No Ghidra, procure por CALLs para o próprio endereço da função.",
      "Recursão de cauda (Tail Recursion) pode ser otimizada pelo compilador para um JMP comum.",
      "Problemas como cálculo de fatorial e navegação em árvores usam muito esse padrão.",
      "Análise de recursão é mais fácil no Decompilador que no Assembly bruto.",
      "Cuidado com o uso excessivo de registradores; a pilha é quem salva o estado."
    ],
    alerts: [
      {
        type: "danger",
        content: "Em análise de malware, recursão pode ser usada propositalmente para exaurir recursos ou dificultar a análise de certas ferramentas."
      }
    ]
  },
  {
    slug: "loops-aninhados-re",
    section: "controle-fluxo",
    title: "Loops Aninhados e Complexidade",
    difficulty: "intermediario",
    subtitle: "Processando matrizes e dados multidimensionais",
    intro: "Um loop dentro de outro loop. Se o loop externo roda 10 vezes e o interno também 10, o código no coração do ninho roda 100 vezes. Esse padrão é clássico para processar imagens (pixels em X e Y) ou matrizes matemáticas. No assembly, isso se manifesta como múltiplos contadores (geralmente em registradores diferentes como ECX e EDX) e vários níveis de saltos. Visualmente no Ghidra, o grafo começa a ficar 'profundo', com ciclos dentro de ciclos. Identificar qual registrador controla qual nível é o grande desafio. Se você perder o fio da meada, pode achar que o código está fazendo algo muito mais complexo do que uma simples varredura de tabela.",
    codes: [
      {
        lang: "c",
        code: "for(int i=0; i<rows; i++) {\n    for(int j=0; j<cols; j++) {\n        matrix[i][j] = 0;\n    }\n}",
        label: "Matriz em C"
      },
      {
        lang: "asm",
        code: "outer_loop:\n; ... setup inner ...\ninner_loop:\n; ... process matrix[i][j] ...\nINC EDX            ; Incrementa J\nCMP EDX, [cols]\nJL inner_loop      ; Loop interno\nINC ECX            ; Incrementa I\nCMP ECX, [rows]\nJL outer_loop      ; Loop externo",
        label: "Assembly de loops aninhados"
      }
    ],
    points: [
      "Cada nível de aninhamento costuma usar um registrador contador diferente.",
      "A complexidade de tempo cresce exponencialmente (O(n^2), O(n^3)).",
      "O Function Graph mostra estruturas circulares aninhadas.",
      "Comum em algoritmos de criptografia e processamento gráfico.",
      "O Decompilador costuma ser excelente em desembaraçar esses loops.",
      "Preste atenção em como o índice final é calculado: base + (i * largura) + j.",
      "Otimizações podem 'achatar' dois loops em um só se a memória for contígua."
    ],
    alerts: [
      {
        type: "tip",
        content: "Se encontrar três níveis de loops ou mais, você provavelmente está analisando um algoritmo de álgebra linear ou processamento de arquivos pesados."
      }
    ]
  },
  {
    slug: "goto-patterns",
    section: "controle-fluxo",
    title: "GOTO e Spaghetti Code no Assembly",
    difficulty: "intermediario",
    subtitle: "Lidando com fluxos não estruturados",
    intro: "Na faculdade, dizem que 'GOTO é mau'. No assembly, GOTO (instrução JMP) é a única forma de vida. Toda estrutura bonita que criamos (if, for, while) é, na verdade, um conjunto de GOTOs disfarçados. O problema surge quando o programador usa GOTO deliberadamente no C, ou quando o compilador gera um código 'espaguete' para otimizar espaço. Isso cria fluxos que entram e saem de blocos de forma não convencional. O decompilador do Ghidra tenta ao máximo 'estruturar' esse caos usando 'if' e 'while', mas às vezes ele desiste e coloca um rótulo 'goto' no pseudo-código. Ver um 'goto' no decompilador é um sinal de que o fluxo de controle é incomum ou que o código foi ofuscado.",
    codes: [
      {
        lang: "c",
        code: "if (error) goto cleanup;\n// ...\ncleanup:\nfree(ptr);\nreturn;",
        label: "Padrão comum de GOTO para limpeza"
      }
    ],
    points: [
      "Assembly é intrinsecamente não-estruturado.",
      "O Decompilador usa algoritmos de 'structuring' para criar o pseudo-C.",
      "GOTOs no Decompilador indicam que a lógica não se encaixa em padrões C padrão.",
      "Comum em rotinas de tratamento de erro e máquinas de estado manuais.",
      "Ofuscadores de código (Obfuscators) amam criar espaguete para confundir analistas.",
      "No Listing View, procure por saltos que entram no meio de outros blocos lógicos.",
      "A presença de muitos rótulos (labels) no assembly sugere código complexo."
    ],
    alerts: [
      {
        type: "warning",
        content: "Se o decompilador mostrar um código muito feio com muitos gotos, tente mudar o 'Control Flow' manualmente no grafo para ajudar o Ghidra a entender."
      }
    ]
  },
  {
    slug: "exception-handling-re",
    section: "controle-fluxo",
    title: "Tratamento de Exceções em Assembly",
    difficulty: "intermediario",
    subtitle: "O caminho invisível do Try/Catch",
    intro: "Exceções são como saídas de emergência em um prédio: você não as usa no dia a dia, mas elas estão lá se algo pegar fogo. Em C++ ou no Windows (SEH), quando um erro acontece, o processador não segue o próximo JMP; ele consulta uma tabela especial para saber quem pode 'tratar' aquele erro. No binário, isso não aparece como instruções CALL normais, mas como metadados em seções especiais (como .pdata ou .xdata). No Windows, você verá manipulações do registrador FS:[0] ou GS:[0]. O Ghidra tenta mapear esses tratadores de exceção, mas eles costumam ser o aspecto mais difícil da engenharia reversa estática porque o fluxo é 'invisível' no fluxo de instruções normal.",
    codes: [
      {
        lang: "asm",
        code: "MOV EAX, FS:[0]    ; Pega o início da cadeia de exceções (Windows x86)\nPUSH handler_addr  ; Coloca o novo tratador na pilha\nMOV FS:[0], ESP    ; Atualiza a cadeia",
        label: "Setup de SEH manual em x86"
      }
    ],
    points: [
      "Exceções permitem desviar o fluxo sem usar JMPs explícitos.",
      "Windows usa SEH (Structured Exception Handling).",
      "C++ usa tabelas de 'unwind' para limpar a pilha durante uma exceção.",
      "As tabelas de exceção ficam em seções de dados, não na seção de código (.text).",
      "O Ghidra mostra 'Exception Handlers' na aba de propriedades da função.",
      "Malwares usam exceções para enganar debuggers (Anti-Debugging).",
      "Identificar o bloco 'catch' ajuda a entender como o programa lida com erros críticos."
    ],
    alerts: [
      {
        type: "danger",
        content: "Ignorar o fluxo de exceções pode fazer você perder partes cruciais da lógica de segurança de um software."
      }
    ]
  },
  {
    slug: "ternario-condicional-re",
    section: "controle-fluxo",
    title: "O Operador Ternário e CMOVcc",
    difficulty: "intermediario",
    subtitle: "Decisões sem saltos: a mágica do CMOV",
    intro: "Programadores amam o ternário: 'x = (a > b) ? a : b;'. É curto e elegante. Compiladores modernos amam ainda mais, mas por outro motivo: performance. Saltos (Jcc) são ruins para os processadores modernos porque eles tentam prever o futuro (Branch Prediction). Se o processador errar o salto, ele perde ciclos de clock limpando a fila. Para evitar isso, surgiu a instrução CMOVcc (Conditional Move). Ela faz a escolha sem pular para lugar nenhum! O processador calcula ambos os valores e 'move' o correto para o destino baseado em uma flag. No Ghidra, se você vir um CMOVG ou CMOVNE, saiba que está vendo uma decisão super eficiente acontecendo 'em linha'.",
    codes: [
      {
        lang: "asm",
        code: "CMP EAX, EBX\nCMOVG EAX, EBX     ; Se EAX > EBX, move EBX para EAX\n                   ; Sem Jumps! O fluxo continua reto.",
        label: "Uso de CMOV para achar o menor valor"
      }
    ],
    points: [
      "CMOVcc (Conditional Move) evita o custo de branch misprediction.",
      "Não gera novos blocos no Function Graph (o fluxo é linear).",
      "Muito comum em códigos otimizados para processadores modernos.",
      "O Decompilador traduz isso de volta para 'if' ou para o operador '?:'.",
      "Existem variantes para quase todas as condições: CMOVE, CMOVZ, CMOVS, etc.",
      "É um padrão comum em implementações de 'min' e 'max'.",
      "Ajuda a manter o código compacto e rápido."
    ],
    alerts: [
      {
        type: "info",
        content: "Nem todos os binários antigos têm CMOV; ele foi introduzido no Pentium Pro. Binários para sistemas embarcados simples ainda usam apenas Jcc."
      }
    ]
  }
];
