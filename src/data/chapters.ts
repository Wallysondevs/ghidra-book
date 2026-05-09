// Agregador — cada trilha vive em sections/<id>.ts
import type { Chapter, Section } from "./types";
import { chapters as s0 } from "./sections/boas-vindas";
import { chapters as s1 } from "./sections/instalacao";
import { chapters as s2 } from "./sections/interface";
import { chapters as s3 } from "./sections/binarios";
import { chapters as s4 } from "./sections/assembly-x86";
import { chapters as s5 } from "./sections/decompilador";
import { chapters as s6 } from "./sections/funcoes-tipos";
import { chapters as s7 } from "./sections/controle-fluxo";
import { chapters as s8 } from "./sections/scripting";
import { chapters as s9 } from "./sections/malware";
import { chapters as s10 } from "./sections/ctf-pratico";
import { chapters as s11 } from "./sections/referencias";

export type { Chapter, Section, Difficulty, AlertType, CodeSample, AlertSpec } from "./types";

export const sections: Section[] = [
  {
    id: "boas-vindas",
    icon: "BookOpen",
    label: "Boas-vindas ao Reverse Engineering",
    chapterSlugs: [
      "bem-vindo-ao-re",
      "o-que-e-ghidra",
      "historia-re",
      "onde-ghidra-e-usado",
      "como-usar-este-livro",
    ],
  },
  {
    id: "instalacao",
    icon: "Terminal",
    label: "Instalação e Configuração",
    chapterSlugs: [
      "pre-requisitos",
      "instalando-java",
      "baixando-ghidra",
      "primeira-execucao",
      "criando-projeto",
      "importando-binario",
      "configuracoes-basicas",
      "plugins-uteis",
      "usando-no-terminal",
    ],
  },
  {
    id: "interface",
    icon: "Layout",
    label: "Interface e Navegação",
    chapterSlugs: [
      "visao-geral-interface",
      "code-browser",
      "function-graph",
      "decompiler-window",
      "symbol-tree",
      "listing-view",
      "cross-references",
      "console-log-ghidra",
    ],
  },
  {
    id: "binarios",
    icon: "FileCode2",
    label: "Entendendo Binários",
    chapterSlugs: [
      "o-que-e-binario",
      "formatos-elf-pe",
      "secoes-binarios",
      "tabelas-simbolos",
      "strings-em-binarios",
      "endianness",
      "bibliotecas-dinamicas",
      "entrypoints",
      "analise-importacoes",
      "exportacoes",
    ],
  },
  {
    id: "assembly-x86",
    icon: "Cpu",
    label: "Assembly x86/x64 para Iniciantes",
    chapterSlugs: [
      "o-que-e-assembly",
      "registradores",
      "instrucoes-basicas",
      "mov-e-aritmetica",
      "pilha-stack",
      "call-ret",
      "jumps-condicionais",
      "loops-em-assembly",
      "convencoes-chamada",
      "flags-registrador",
      "memoria-enderecos",
      "leitura-assembly",
    ],
  },
  {
    id: "decompilador",
    icon: "Braces",
    label: "O Decompilador do Ghidra",
    chapterSlugs: [
      "como-funciona-decompiler",
      "lendo-pseudo-codigo",
      "variaveis-locais",
      "parametros-funcao",
      "tipos-de-retorno",
      "structs-no-decompiler",
      "ponteiros-decompiler",
      "casting-tipos",
      "inline-funcoes",
      "limitacoes-decompiler",
    ],
  },
  {
    id: "funcoes-tipos",
    icon: "FunctionSquare",
    label: "Funções, Variáveis e Tipos",
    chapterSlugs: [
      "identificando-funcoes",
      "renomear-funcoes",
      "tipos-primitivos",
      "arrays-ghidra",
      "structs-definicao",
      "enums-ghidra",
      "typedef-ghidra",
      "ponteiros-funcao",
      "heranca-c-patterns",
      "propagacao-tipos",
    ],
  },
  {
    id: "controle-fluxo",
    icon: "GitBranch",
    label: "Estruturas de Controle em Assembly",
    chapterSlugs: [
      "if-else-assembly",
      "switch-case-re",
      "for-loop-re",
      "while-loop-re",
      "do-while-re",
      "funcoes-recursivas-re",
      "loops-aninhados-re",
      "goto-patterns",
      "exception-handling-re",
      "ternario-condicional-re",
    ],
  },
  {
    id: "scripting",
    icon: "Code2",
    label: "Scripts e Automação",
    chapterSlugs: [
      "introducao-scripting",
      "ghidra-script-api",
      "seu-primeiro-script-java",
      "ghidrapy-python",
      "automatizar-renomear",
      "busca-pattern-matching",
      "analise-em-batch",
      "exportando-dados",
      "headless-mode",
      "scripts-da-comunidade",
    ],
  },
  {
    id: "malware",
    icon: "ShieldAlert",
    label: "Análise de Malware: Primeiros Passos",
    chapterSlugs: [
      "etica-e-seguranca",
      "conceitos-malware",
      "strings-maliciosas",
      "imports-suspeitos",
      "anti-debug",
      "ofuscacao",
      "packer-analise",
      "networking-codigo",
      "persistencia-re",
      "relatorio-analise",
    ],
  },
  {
    id: "ctf-pratico",
    icon: "Trophy",
    label: "CTF e Casos Práticos",
    chapterSlugs: [
      "o-que-e-ctf",
      "categorias-re-ctf",
      "seu-primeiro-crackme",
      "validacao-serial",
      "decifrando-strings",
      "algoritmos-simples",
      "xor-encoding",
      "checagem-senha",
      "patching-binario",
      "escrevendo-keygen",
    ],
  },
  {
    id: "referencias",
    icon: "Star",
    label: "Referências e Próximos Passos",
    chapterSlugs: [
      "recursos-comunidade",
      "livros-recomendados",
      "ferramentas-complementares",
      "certificacoes-re",
      "proximo-nivel",
    ],
  },
];

const allChapters: Chapter[] = [
  ...s0,
  ...s1,
  ...s2,
  ...s3,
  ...s4,
  ...s5,
  ...s6,
  ...s7,
  ...s8,
  ...s9,
  ...s10,
  ...s11,
];

export const chapterMap: Record<string, Chapter> = Object.fromEntries(
  allChapters.map((c) => [c.slug, c])
);

export const chapters = allChapters;
