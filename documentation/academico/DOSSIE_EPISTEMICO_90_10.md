# 🪐 DOSSIÊ EPISTÊMICO 90/10 & REGISTRO DE DECISÕES ARQUITETURAIS (ADRs)
## Engenharia Reversa dos Invariantes Fundamentais do `byte.burger`

**Projeto:** `byte.burger`  
**Autor Original:** Philip Kazuhiro (Kazu) — [github.com/kazuhirokamim](https://github.com/kazuhirokamim)  
**Curadoria Epistêmica:** Swarm Noesis Ouroboros v3.0 & Tear Architecture  
**Padrão de Registro:** MADR 4.0 (Markdown Architectural Decision Records) + Princípio de Pareto Epistêmico 90/10  

---

## 🏛️ 1. O NÚCLEO 90/10: OS 10% QUE GOVERNAM O SISTEMA

No arcabouço epistemológico do Noesis, 90% das telas, botões, modais e estilos de uma aplicação são derivados diretos de apenas **10% de axiomas matemáticos e invariantes atômicos de domínio**. No `byte.burger`, esses 10% são constituídos por **três invariantes estritas**:

### Invariante 1: A Chave Canônica de Comutação do Carrinho
Qualquer combinação de produto com acompanhamentos deve ser agrupada deterministicamente, independente da ordem em que o usuário selecionou os adicionais.
$$\mathcal{K} = \text{id}_{\text{item}} \,\|\, \text{sort}\left( [\text{id}_{a_1}, \text{id}_{a_2}, \dots] \right)$$
*Código-fonte primário (`src/store/cart.tsx`, linha 65):*
```ts
const key = `${item.id}|${addons.map((a) => a.id).sort().join(',')}`;
```

### Invariante 2: A Função Bijetora de Recompensa de Experiência
Tanto o item base quanto cada adicional individual carregam uma recompensa de XP atômica. O XP total da linha é estritamente proporcional à quantidade pedida.
$$\text{XP}_{\text{linha}} = \left( \text{xp}(I) + \sum_{a \in A} \text{xp}(a) \right) \times Q$$
*Código-fonte primário (`src/store/cart.tsx`, linha 78 e 109):*
```ts
const xp = (item.xpReward + addons.reduce((s, a) => s + a.xpReward, 0)) * qty;
```

### Invariante 3: A Partição Monotônica de Carreira
O nível de um usuário no ecossistema é calculado em tempo de execução através do piso da faixa de XP atingida:
$$\mathcal{L}(\text{XP}) = \operatorname{argmax}_{l \in \text{LEVELS}} \{ l.\text{minXp} \le \text{XP} \}$$
*Código-fonte primário (`src/data/menu.ts`, linhas 63-69):*
```ts
export function getLevelForXp(xp: number): Level {
  let current = LEVELS[0];
  for (const l of LEVELS) {
    if (xp >= l.minXp) current = l;
  }
  return current;
}
```

---

## 📜 2. REGISTRO DE DECISÕES ARQUITETURAIS RETROATIVAS (ADR - MADR 4.0)

---

### ADR-001: Adoção de Single Page Application (SPA) com React 18 e Vite

- **Status:** Ratificado (Retroativo)
- **Data da Decisão:** Junho de 2025 / Revisão Outubro de 2026
- **Decisores:** Philip Kazuhiro (Kazu)

#### Contexto e Declaração do Problema
Era necessário criar uma interface rica, interativa e fluida para uma hamburgueria conceitual focada no público de desenvolvimento de software, com ênfase em transições de tela instantâneas e microinterações de gamificação a 60 quadros por segundo. Avaliou-se se a aplicação deveria utilizar Server-Side Rendering (Next.js / Remix) ou uma Single Page Application tradicional empacotada por Vite.

#### Opções Consideradas
1. **Opção 1 (Recomendada / Adotada):** SPA puro com **React 18 + Vite + TypeScript**.
2. **Opção 2:** Framework SSR com **Next.js (App Router)**.
3. **Opção 3:** Multi-Page Application tradicional com HTML estático e Vanilla JS.

#### Consequências e Avaliação Positiva/Negativa
- **Boa:** Build extremamente veloz ($< 500\text{ms}$ com esbuild/Rollup via Vite), hot-module-replacement (HMR) instantâneo durante o desenvolvimento.
- **Boa:** Custo de hospedagem nulo: compila para assets estáticos puros (`dist/`), podendo rodar em Cloudflare Pages, GitHub Pages ou Vercel.
- **Neutra:** Roteamento controlado via estado interno (`useState<Page>`), sem histórico de URL profundo na primeira versão.
- **Ruim:** SEO indexável de páginas individuais secundárias é limitado em comparação ao SSR (não crítico para um MVP de prototipagem e portfólio).

---

### ADR-002: Design System Tokenizado via Tailwind CSS com Paleta Ember/Ink

- **Status:** Ratificado (Retroativo)
- **Data da Decisão:** Junho de 2025 / Revisão Outubro de 2026
- **Decisores:** Philip Kazuhiro (Kazu)

#### Contexto e Declaração do Problema
O apelo estético para a comunidade de desenvolvedores exigia uma atmosfera inspirada em interfaces de terminais escuros, paletas de código e elementos de alta intensidade visual (neon, glowing badges e estética *dark mode* refinada). A customização precisava ser ágil e de fácil manutenção sem sobrecarregar o CSS com arquivos soltos desorganizados.

#### Opções Consideradas
1. **Opção 1 (Recomendada / Adotada):** **Tailwind CSS 3.4** com tokens semânticos estendidos no `tailwind.config.js`.
2. **Opção 2:** CSS-in-JS via Styled Components ou Emotion.
3. **Opção 3:** Frameworks de componentes pré-moldados (Chakra UI ou Material UI).

#### Consequências e Avaliação Positiva/Negativa
- **Boa:** Zero *runtime overhead* de CSS: o compilador do Tailwind purga classes não utilizadas, mantendo o arquivo CSS resultante abaixo de $15\text{ KB}$.
- **Boa:** Tokens de cor semânticos (`ink` para tons escuros de fundo, `ember` para laranjas de brasas/churrasqueira, e `level.*` para cada cargo de carreira) permitem alterações visuais globais com uma única alteração no arquivo de configuração.
- **Neutra:** As classes de utilitário ficam densas no JSX, o que foi mitigado com a criação de classes utilitárias semânticas em `@layer components` (`.btn-primary`, `.glass`, `.card`, `.chip`).

---

### ADR-003: Gerenciamento de Estado Centralizado Volátil via React Context API

- **Status:** Ratificado (Retroativo)
- **Data da Decisão:** Junho de 2025 / Revisão Outubro de 2026
- **Decisores:** Philip Kazuhiro (Kazu)

#### Contexto e Declaração do Problema
A aplicação precisava coordenar o estado de três fluxos concorrentes: itens no carrinho de compras, gatilho do painel lateral *drawer*, e uma fila de notificações com auto-dismiss (*ToastHost*). Deveria ser decidido o padrão de gerenciamento de estado para orquestrar essas mutações sem gerar complexidade desnecessária.

#### Opções Consideradas
1. **Opção 1 (Recomendada / Adotada):** **React Context nativo (`CartProvider`)** encapsulando carrinho e toasts.
2. **Opção 2:** Biblioteca de gerenciamento externo de estado (Zustand ou Redux Toolkit).
3. **Opção 3:** Elevação de estado manual (*Lifting State Up*) via props através do componente `App`.

#### Consequências e Avaliação Positiva/Negativa
- **Boa:** Zero dependências externas adicionais no `package.json`. API limpa e tipada com `useCart()`.
- **Boa:** Funções utilitárias imutáveis usando a forma funcional `setLines((prev) => ...)`, prevenindo condições de corrida na renderização.
- **Neutra:** Como o carrinho e os toasts residem no mesmo contexto, disparos de toasts acionam re-render nos consumidores do carrinho (custo aceitável dado o número reduzido de nós na árvore).
- **Ruim:** Estado estritamente volátil: atualização da página pelo usuário (F5) reinicia o carrinho e os toasts. O próximo ciclo evolutivo prevê desacoplamento e sincronização com `localStorage`.

---

*Dossiê compilado e chancelado sob rigor de engenharia.*
