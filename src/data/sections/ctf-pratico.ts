import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    slug: "o-que-e-ctf",
    section: "ctf-pratico",
    title: "O que é CTF e por que Praticar?",
    difficulty: "iniciante",
    subtitle: "A gincana hacker que vai acelerar seu aprendizado",
    intro: "Imagine uma gincana de colégio, mas em vez de corrida de saco ou cabo de guerra, você precisa invadir um servidor, quebrar uma senha criptografada ou descobrir como um programa 'secreto' funciona. Isso é um CTF (Capture The Flag). No mundo da segurança da informação, essas competições são o campo de treinamento definitivo. O objetivo é encontrar uma 'flag' (geralmente uma string no formato `flag{alguma_coisa}`) que prova que você resolveu o desafio. Participar de CTFs é como jogar futebol na várzea antes de ir para o profissional: é onde você ganha 'casca', aprende a lidar com situações reais e, principalmente, desenvolve o raciocínio investigativo que nenhum curso teórico consegue ensinar sozinho. Para quem quer aprender Ghidra e Engenharia Reversa, os desafios da categoria 'Rev' são o seu parque de diversões particular.",
    codes: [
      {
        lang: "text",
        code: "picoCTF{r3v3rs1ng_1s_fun_a7b2c9}\nHTB{w3lc0m3_t0_th3_m4ch1n3}\nCTF-BR{parabens_voce_achou_a_bandeira}",
        label: "Exemplos de formatos comuns de Flags"
      }
    ],
    points: [
      "CTF significa Capture The Flag (Capture a Bandeira)",
      "A 'flag' é a prova de que você resolveu o desafio",
      "Categorias principais: Rev (Reversing), Pwn (Exploitation), Web, Crypto e Forensics",
      "PicoCTF é a melhor plataforma para quem está começando do zero",
      "HackTheBox oferece desafios mais realistas e complexos",
      "CTFtime.org é o calendário mundial das competições",
      "O aprendizado é baseado em 'hands-on' (mão na massa)",
      "Desenvolve o pensamento 'fora da caixa' e a persistência"
    ],
    alerts: [
      {
        type: "info",
        content: "Não se sinta mal se não conseguir resolver nada no começo. CTFs são feitos para serem desafiadores e a curva de aprendizado inicial é íngreme."
      },
      {
        type: "tip",
        content: "O segredo de um bom competidor não é saber tudo, mas saber pesquisar no Google melhor que os outros."
      }
    ]
  },
  {
    slug: "categorias-re-ctf",
    section: "ctf-pratico",
    title: "A Categoria Reversing nos CTFs",
    difficulty: "iniciante",
    subtitle: "Entendendo o seu adversário: o binário",
    intro: "Na categoria de Reverse Engineering (ou simplesmente 'Rev'), o desafio é quase sempre um arquivo executável que você não tem o código-fonte. Sua missão é descobrir como ele funciona para extrair a flag. Pode ser um simples verificador de senha onde a flag é a própria senha, ou um algoritmo complexo que gera a flag em memória. É como receber um relógio suíço quebrado e ter que entender cada engrenagem interna para fazê-lo despertar. Antes de abrir o Ghidra, um bom 'reverser' usa ferramentas de reconhecimento. É o famoso 'tapa na cara' do binário para ver se ele entrega algo fácil. Se você for direto para o Ghidra sem olhar as strings ou as importações, pode estar perdendo uma solução de 10 segundos para um problema que levaria 10 minutos.",
    codes: [
      {
        lang: "bash",
        code: "# Verifica o tipo do arquivo (ELF, PE, Mach-O, etc)\nfile desafio_rev\n\n# Extrai todas as sequências de texto legíveis do binário\nstrings desafio_rev | grep -i \"flag\"\n\n# Rastreia as chamadas de biblioteca do sistema\nltrace ./desafio_rev\n\n# Rastreia as chamadas de sistema (leitura de arquivos, rede, etc)\nstrace ./desafio_rev",
        label: "Ferramentas essenciais de linha de comando"
      }
    ],
    points: [
      "O objetivo em 'Rev' é entender a lógica para obter a flag",
      "Sempre comece pelo comando 'file' para saber a arquitetura",
      "O comando 'strings' pode revelar a flag diretamente em desafios simples",
      "ltrace e strace mostram o comportamento dinâmico básico",
      "Identifique o Entry Point e a função 'main' no Ghidra",
      "Analise as importações (Symbol Tree) para ver o que o programa faz (ex: ler arquivos, rede)",
      "Observe mensagens de erro como 'Wrong Password' para localizar a lógica de validação",
      "A paciência é sua maior aliada na análise de código ofuscado"
    ],
    alerts: [
      {
        type: "warning",
        content: "Cuidado ao executar binários de CTF diretamente na sua máquina host. Use sempre uma máquina virtual ou ambiente isolado (Sandbox)."
      },
      {
        type: "success",
        content: "Muitas vezes, a flag está 'escondida à vista de todos' em strings simples. Nunca pule essa etapa!"
      }
    ]
  },
  {
    slug: "seu-primeiro-crackme",
    section: "ctf-pratico",
    title: "Seu Primeiro Crackme",
    difficulty: "iniciante",
    subtitle: "Abrindo a caixa preta passo a passo",
    intro: "Um 'Crackme' é um pequeno programa criado especificamente para ser quebrado. É o 'Hello World' da engenharia reversa. Geralmente, ele pede uma senha e te dá um parabéns se você acertar. No Ghidra, o processo de resolver um crackme segue um ritual: importar o arquivo, rodar a análise automática e mergulhar no Decompiler. A grande sacada é encontrar onde a entrada do usuário (geralmente via `scanf` ou `fgets`) é comparada com a senha correta. Se o programa usa `strcmp`, a vida é bela, pois você pode ver a senha real comparada em memória. Se ele faz algo mais complexo, você terá que seguir o fluxo dos dados, vendo como cada caractere que você digita é transformado até o veredito final. É como seguir o rastro de migalhas de pão na floresta.",
    codes: [
      {
        lang: "c",
        code: "// O código fonte original (que você não tem no CTF)\nint main() {\n    char input[20];\n    printf(\"Digite a senha: \");\n    scanf(\"%19s\", input);\n    if (strcmp(input, \"picoCTF{f4cil_demais}\") == 0) {\n        printf(\"Acesso concedido!\\n\");\n    } else {\n        printf(\"Tente novamente...\\n\");\n    }\n    return 0;\n}",
        label: "Código C de um Crackme simples"
      },
      {
        lang: "assembly",
        code: "; Como o Ghidra mostra no Listing View\nCALL strcmp               ; Chama a função de comparação\nTEST EAX, EAX             ; Verifica se o resultado é 0 (iguais)\nJZ LAB_00101234           ; Se for zero, pula para 'Acesso concedido'\nLEA RDI, [string_tente]   ; Se não, carrega 'Tente novamente'\nCALL puts",
        label: "Assembly correspondente à verificação"
      }
    ],
    points: [
      "Importe o binário e aceite a análise padrão do Ghidra",
      "Localize a função 'main' através da Symbol Tree",
      "Procure por funções de entrada de dados como scanf, gets ou fgets",
      "Identifique a função de comparação, comumente 'strcmp' ou 'memcmp'",
      "No Decompiler, veja quais strings fixas estão sendo usadas",
      "Entenda que 'JZ' (Jump if Zero) ou 'JE' (Jump if Equal) decidem o sucesso",
      "A flag costuma estar hardcoded em desafios de nível iniciante",
      "Use o 'Search -> Strings' para mapear todas as mensagens do programa"
    ],
    alerts: [
      {
        type: "tip",
        content: "Se o binário for 'stripped' (sem símbolos), a função main não terá nome. Procure por ela dentro da função 'entry'."
      },
      {
        type: "info",
        content: "O Ghidra facilita muito a vida transformando o Assembly em algo que parece C no painel da direita (Decompiler)."
      }
    ]
  },
  {
    slug: "validacao-serial",
    section: "ctf-pratico",
    title: "Quebrando Validação de Serial",
    difficulty: "iniciante",
    subtitle: "Quando a senha não é uma string estática",
    intro: "Nem sempre a senha está escrita bonitinha no binário. Muitas vezes, o programa pede um 'Serial' e executa uma conta matemática para verificar se ele é válido. É como o algoritmo do CPF ou de um cartão de crédito: não existe uma lista de CPFs válidos dentro do sistema, mas sim uma regra (checksum) que diz se aquele número faz sentido. Em CTFs, você encontrará validações que somam os valores ASCII dos caracteres, fazem operações de XOR ou verificam se o número é divisível por algo. O truque aqui é identificar o loop que percorre sua entrada e as operações aritméticas (ADD, SUB, XOR, IMUL) que acontecem lá dentro. Se você entender a regra, pode criar seu próprio serial ou, de forma mais bruta, fazer um 'patch' no binário para aceitar qualquer porcaria que você digitar.",
    codes: [
      {
        lang: "c",
        code: "// Exemplo de validação por soma simples\nint check_serial(char *s) {\n    int sum = 0;\n    for(int i=0; s[i] != 0; i++) sum += s[i];\n    if (sum == 1337) return 1; // Sucesso!\n    return 0;\n}",
        label: "Lógica de validação baseada em soma (Checksum)"
      },
      {
        lang: "assembly",
        code: "MOVSX EAX, byte ptr [RBP + RAX] ; Pega caractere do serial\nADD [RBP + local_sum], EAX      ; Soma ao total acumulado\n... \nCMP [RBP + local_sum], 0x539    ; Compara total com 1337 (0x539)\nJNE failure_branch              ; Se não for igual, tchau!",
        label: "Assembly da soma e comparação final"
      }
    ],
    points: [
      "Seriais são validados por algoritmos, não por comparação direta",
      "Identifique loops (instruções JMP voltando para trás) que processam a string",
      "Observe constantes mágicas sendo usadas em comparações (ex: 0x539 para 1337)",
      "Entenda operações bit a bit: XOR é extremamente comum em seriais",
      "O algoritmo de Luhn é um padrão clássico para validar números de cartão",
      "A técnica de 'Patching' pode inverter a lógica (mudar JNE para JE)",
      "Use o Ghidra para renomear variáveis como 'soma_acumulada' para facilitar",
      "Trace o fluxo de dados (Data Flow) da entrada até a comparação final"
    ],
    alerts: [
      {
        type: "danger",
        content: "Fazer patch resolve o desafio localmente, mas em CTFs online você geralmente precisa enviar a entrada correta (o Serial) para o servidor."
      },
      {
        type: "tip",
        content: "Muitas vezes, é mais rápido escrever um script pequeno em Python para encontrar um serial que satisfaça a conta do que tentar inverter a matemática na mão."
      }
    ]
  },
  {
    slug: "decifrando-strings",
    section: "ctf-pratico",
    title: "Decifrando Strings Escondidas",
    difficulty: "intermediario",
    subtitle: "A arte de ler o que foi feito para ser invisível",
    intro: "Autores de desafios de CTF amam esconder strings. Se você rodar `strings` e não achar nada que pareça uma flag ou mensagem útil, parabéns: o binário está usando ofuscação de strings. O método mais comum é guardar a string cifrada e descriptografá-la apenas em tempo de execução, na memória RAM. É como um espião que carrega uma mensagem codificada e só usa a chave para ler quando chega no esconderijo. No Ghidra, você verá chamadas para funções que parecem processar blocos de dados estranhos antes de usá-los em um `printf`. O segredo é identificar esses dados 'sujos' na seção `.data` ou `.rodata` e entender qual transformação eles sofrem. Quase sempre é um XOR simples ou uma variação de Base64.",
    codes: [
      {
        lang: "python",
        code: "# Script para decifrar XOR simples em Python\nencoded = [0x1a, 0x12, 0x17, 0x11, 0x03, 0x5a, 0x32]\nkey = 0x42\ndecoded = \"\".join([chr(b ^ key) for b in encoded])\nprint(f\"Flag: {decoded}\")",
        label: "Script Python para extração manual"
      },
      {
        lang: "c",
        code: "// No Ghidra, você verá algo assim:\nfor (i = 0; i < 7; i++) {\n  secret_buffer[i] = encrypted_data[i] ^ 0x42;\n}\nputs(secret_buffer);",
        label: "Pseudo-C do Ghidra mostrando descriptografia em runtime"
      }
    ],
    points: [
      "Strings 'sumidas' no binário indicam cifragem em tempo de execução",
      "XOR com chave fixa é a técnica de ofuscação nº 1 em CTFs",
      "Procure por funções que são chamadas logo no início da 'main'",
      "Base64 customizado (alfabeto alterado) é uma armadilha comum",
      "A tabela ASCII é sua bússola: valores entre 32 e 126 são texto legível",
      "Use o Ghidra Scripting para automatizar a decodificação de grandes blocos",
      "Identifique o array de dados cifrados clicando nas referências de memória",
      "O algoritmo de ROT13 é o 'nível zero' de cifra de strings"
    ],
    alerts: [
      {
        type: "info",
        content: "O Ghidra permite que você execute scripts Python (Jython) diretamente sobre o binário para decifrar essas strings sem sair da ferramenta."
      },
      {
        type: "warning",
        content: "Se a string for decifrada no 'heap' (usando malloc), você precisará de um debugger (GDB) para vê-la pronta na memória."
      }
    ]
  },
  {
    slug: "algoritmos-simples",
    section: "ctf-pratico",
    title: "Reconhecendo Algoritmos Simples por Padrão",
    difficulty: "intermediario",
    subtitle: "Treinando o olho para detectar padrões matemáticos",
    intro: "Um mestre em engenharia reversa não lê cada instrução assembly; ele reconhece 'vultos' de algoritmos conhecidos. É como reconhecer uma música logo nos primeiros acordes. Se você vê um loop com um XOR e uma tabela de 256 valores (0x100), as chances de ser um CRC32 ou um RC4 são altíssimas. Se você vê constantes estranhas como `0x67452301`, você não precisa analisar a lógica: seu cérebro deve gritar 'MD5!'. Reconhecer esses padrões economiza horas de trabalho braçal. No CTF, os autores raramente inventam a roda do zero (a menos que seja um desafio de criptografia pesada); eles costumam usar implementações padrão de algoritmos famosos com pequenas modificações para te confundir.",
    codes: [
      {
        lang: "c",
        code: "// Constantes mágicas do MD5\n// Se vir isso no Ghidra, é MD5!\nunsigned int a = 0x67452301;\nunsigned int b = 0xefcdab89;\nunsigned int c = 0x98badcfe;\nunsigned int d = 0x10325476;",
        label: "Constantes de inicialização do MD5"
      },
      {
        lang: "c",
        code: "// Pattern de S-Box do AES (pedaço)\n// 0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5...\n// Uma tabela de 256 bytes com esses valores grita 'AES'",
        label: "Valores típicos de uma S-Box de AES"
      }
    ],
    points: [
      "Algoritmos criptográficos possuem 'assinaturas' de constantes",
      "0x67452301 é o início clássico do MD5 e SHA-1",
      "CRC32 usa tabelas de 256 entradas para agilizar o cálculo",
      "O algoritmo TEA (Tiny Encryption Algorithm) usa a constante 0x9e3779b9",
      "Procure por tabelas de substituição (S-Boxes) para identificar AES",
      "O uso intensivo de operações de rotação (ROL, ROR) sugere hashes ou cifras",
      "Base64 usa o alfabeto 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'",
      "Use plugins do Ghidra como o 'FindCrypt' para buscar essas constantes automaticamente"
    ],
    alerts: [
      {
        type: "success",
        content: "Sempre pesquise no Google por constantes hexadecimais longas que você encontrar. Elas costumam levar direto ao nome do algoritmo no Stack Overflow."
      },
      {
        type: "info",
        content: "Às vezes o autor muda uma constante para o 'FindCrypt' não pegar. Fique atento à estrutura do loop!"
      }
    ]
  },
  {
    slug: "xor-encoding",
    section: "ctf-pratico",
    title: "XOR Encoding: O Favorito dos CTFs",
    difficulty: "iniciante",
    subtitle: "A ferramenta multiuso da ofuscação",
    intro: "Se existisse um 'canivete suíço' na engenharia reversa, ele seria o XOR. O motivo é simples: o XOR é reversível. Se você faz `A ^ B = C`, então `C ^ B = A`. Isso significa que o mesmo código que cifra pode descriptografar. Em CTFs, o XOR aparece em todo lugar: desde chaves simples de 1 byte até chaves rotativas complexas. A beleza (e a fraqueza) do XOR de 1 byte é que existem apenas 256 chaves possíveis. Um computador pode testar todas em milissegundos (brute force). Mesmo se a chave for maior, se você souber parte do texto original (como o prefixo `picoCTF{`), você consegue extrair a chave fazendo um XOR do texto cifrado com o que você já conhece. É a técnica do 'Known Plaintext Attack'.",
    codes: [
      {
        lang: "python",
        code: "# Brute force de XOR de 1 byte\ncifrado = bytes.fromhex(\"1d1a121d1b541315111c\")\nfor key in range(256):\n    tentativa = \"\".join([chr(b ^ key) for b in cifrado])\n    if \"flag\" in tentativa.lower():\n        print(f\"Chave {key}: {tentativa}\")",
        label: "Brute force simples em Python"
      },
      {
        lang: "text",
        code: "Original:  48 45 4c 4c 4f (HELLO)\nChave:     41 41 41 41 41 (AAAAA)\nXOR Result: 09 04 0d 0d 0e",
        label: "Exemplo visual da operação XOR"
      }
    ],
    points: [
      "XOR é a operação lógica `^` (OU exclusivo)",
      "É auto-reversível: aplicar a mesma chave duas vezes volta ao original",
      "XOR com 0 não altera o valor",
      "XOR de um valor com ele mesmo resulta em 0",
      "Ataque de Brute Force é eficiente para chaves de 1 ou 2 bytes",
      "Rolling XOR: a chave muda a cada byte (ex: `key = (key + 1) % 256`)",
      "Análise de frequência ajuda a quebrar XOR se o texto for longo",
      "Em binários, o XOR é frequentemente usado para 'zerar' registradores (`XOR EAX, EAX`)"
    ],
    alerts: [
      {
        type: "tip",
        content: "Se você vir algo como `buffer[i] ^ i`, é um XOR onde a chave é a posição do caractere. Muito comum em CTFs!"
      },
      {
        type: "success",
        content: "A ferramenta online CyberChef é excelente para testar variações de XOR rapidamente."
      }
    ]
  },
  {
    slug: "checagem-senha",
    section: "ctf-pratico",
    title: "Anatomia de uma Checagem de Senha",
    difficulty: "intermediario",
    subtitle: "Rastreando o momento da verdade",
    intro: "Toda verificação de senha tem um 'ponto de decisão'. É aquele momento dramático onde o programa decide se você é um hacker de elite ou um 'noob'. No Ghidra, seu trabalho é encontrar esse cruzamento. Geralmente, existe uma variável que atua como uma 'flag de erro' (não confunda com a flag do CTF). Ela começa como 0 e, se qualquer caractere da sua senha estiver errado, ela vira 1. No final, o programa checa: 'Se a flag for 0, ganha; se for 1, perde'. Entender essa estrutura permite que você ignore toda a matemática complexa no meio e foque apenas em como manter essa variável em 0. Às vezes, o programa checa byte a byte e sai no primeiro erro (curto-circuito), o que permite ataques de tempo, mas isso já é assunto para outro capítulo.",
    codes: [
      {
        lang: "c",
        code: "// Estrutura clássica de verificação\nint check(char *input) {\n    int bad = 0;\n    if (input[0] != 'p') bad = 1;\n    if (input[1] != 'i') bad = 1;\n    if (input[2] != 'c') bad = 1;\n    // ... \n    return bad == 0;\n}",
        label: "Lógica de verificação byte a byte"
      },
      {
        lang: "assembly",
        code: "TEST AL, AL       ; Verifica resultado da comparação\nSETZ DL            ; Define DL como 1 se forem iguais\nAND CL, DL         ; Acumula o sucesso em CL\n... \nCMP CL, 0x1        ; No final, verifica se tudo deu certo",
        label: "Assembly otimizado de verificação"
      }
    ],
    points: [
      "Localize mensagens de erro ('Access Denied') e veja quem as chama",
      "Procure por instruções CMP (Compare) seguidas de saltos condicionais (JZ/JNZ)",
      "Variáveis de controle costumam ser limpas logo no início da função",
      "Verificações podem ser feitas em 'chunks' (4 ou 8 bytes por vez usando registradores largos)",
      "O Decompiler do Ghidra pode esconder verificações dentro de ternários `a == b ? 1 : 0`",
      "Observe se o programa usa hashes (como SHA256) em vez de comparar texto puro",
      "Identifique funções de 'anti-tampering' que tentam detectar se você está debugando",
      "O 'Graph View' é perfeito para visualizar os blocos de Sucesso vs. Falha"
    ],
    alerts: [
      {
        type: "info",
        content: "Em desafios reais, a senha pode ser construída dinamicamente. Use a ferramenta 'References to...' para ver onde cada parte da senha é gerada."
      },
      {
        type: "warning",
        content: "Se o binário usar `memcmp` ou `strcmp`, você pode ver os argumentos no stack ou registradores durante a execução."
      }
    ]
  },
  {
    slug: "patching-binario",
    section: "ctf-pratico",
    title: "Patching: Modificando o Binário para Ganhar",
    difficulty: "intermediario",
    subtitle: "A força bruta elegante: se a porta está trancada, troque a fechadura",
    intro: "Por que gastar horas tentando descobrir a senha se você pode simplesmente dizer ao programa que 'qualquer senha está correta'? Isso é Patching. É como se você estivesse editando o DNA do programa para mudar o comportamento dele. No Ghidra, isso é incrivelmente poderoso. Se você encontrar um salto condicional `JNZ` (Jump if Not Zero) que te leva para a mensagem de erro, você pode transformá-lo em um `JZ` (Jump if Zero) ou, melhor ainda, em uma série de `NOPs` (No Operation - instrução 0x90). O `NOP` é como o comando 'siga em frente' para o processador; ele não faz nada e passa para a próxima instrução. É a técnica preferida para desativar verificações de segurança, proteções de licença ou até remover mensagens chatas.",
    codes: [
      {
        lang: "assembly",
        code: "; Antes do Patch\nCMP EAX, 0x1\nJNE failure_branch    ; Pula para o erro se não for 1\n\n; Depois do Patch (Inversão)\nCMP EAX, 0x1\nJE failure_branch     ; Agora o erro acontece se você ACERTAR!\n\n; Depois do Patch (NOP Sled)\nNOP                   ; Não faz nada\nNOP                   ; Não faz nada\n; O código simplesmente 'escorrega' para a vitória",
        label: "Exemplos de Patching em Assembly"
      }
    ],
    points: [
      "Patching consiste em alterar os bytes do arquivo executável",
      "NOP (0x90) é a instrução mais usada para anular verificações",
      "No Ghidra: Clique direito na instrução -> Patch Instruction",
      "Inverter Jumps (JZ <-> JNZ, JE <-> JNE) é o truque mais comum",
      "Sempre verifique o tamanho das instruções ao fazer patch para não corromper o resto",
      "Para salvar as alterações: File -> Export Program -> Original File",
      "Patching é útil para contornar proteções anti-debugger e anti-VM",
      "Lembre-se: o patch muda o binário local, mas você ainda precisa da flag real no servidor do CTF"
    ],
    alerts: [
      {
        type: "danger",
        content: "Cuidado ao deletar instruções. Se você mudar o tamanho de uma função, todos os saltos (jumps) que apontam para depois dela podem quebrar."
      },
      {
        type: "tip",
        content: "Use o patch para 'pular' funções de delay ou verificações que consomem muito tempo durante seus testes."
      }
    ]
  },
  {
    slug: "escrevendo-keygen",
    section: "ctf-pratico",
    title: "Escrevendo um Keygen",
    difficulty: "intermediario",
    subtitle: "Tornando-se o mestre das chaves",
    intro: "O nível final do desafio de Reverse Engineering não é apenas achar a senha, mas entender o algoritmo tão bem que você consegue gerar infinitas senhas válidas. Um 'Keygen' (Key Generator) é um programa que você escreve para automatizar a criação de seriais. Isso prova que você dominou completamente a lógica do alvo. O processo é como uma engenharia reversa de uma receita de bolo: você prova o bolo (o binário), identifica os ingredientes (as operações matemáticas) e depois escreve sua própria receita para fazer o mesmo bolo em casa. Em CTFs, escrever um keygen em Python é uma habilidade essencial, pois muitos desafios exigem que você forneça centenas de seriais válidos em poucos segundos através de uma conexão de rede.",
    codes: [
      {
        lang: "python",
        code: "import random\nimport string\n\ndef generate_serial():\n    # O binário exige que a soma dos caracteres seja 500\n    prefix = \"FLAG-\"\n    current_sum = sum(ord(c) for c in prefix)\n    suffix = \"\"\n    while current_sum < 500:\n        char = random.choice(string.ascii_uppercase)\n        if current_sum + ord(char) <= 500:\n            suffix += char\n            current_sum += ord(char)\n    return prefix + suffix.ljust(10, 'A') # Padding",
        label: "Exemplo de Keygen simples em Python"
      }
    ],
    points: [
      "Entenda o algoritmo de validação de ponta a ponta no Ghidra",
      "Identifique quais partes do serial são fixas e quais são variáveis",
      "Reimplemente a lógica de cálculo em uma linguagem de script (Python é ideal)",
      "Use bibliotecas como 'z3-solver' para resolver equações matemáticas complexas automaticamente",
      "Teste seu keygen contra o binário original antes de tentar no servidor do CTF",
      "Keygens são úteis para desafios de 'fuzzing' ou onde múltiplas entradas são necessárias",
      "Aprenda a manipular bytes e tipos de dados (int 32 bits, unsigned char) no Python",
      "O objetivo é transformar a 'caixa preta' em uma fórmula matemática aberta"
    ],
    alerts: [
      {
        type: "success",
        content: "Dominar o 'z3-solver' é o 'superpoder' que separa os iniciantes dos profissionais em desafios de keygen."
      },
      {
        type: "info",
        content: "Muitos keygens de CTF envolvem reverter operações de XOR e bit-shifting que parecem aleatórias, mas são determinísticas."
      }
    ]
  }
];
