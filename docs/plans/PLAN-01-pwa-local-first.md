# 📋 PLAN-01: Transformação PWA Local-First, Higienização de Tooling & Suíte Vitest

**Issue:** #01  
**Slug:** `pwa-local-first`  
**Status:** Proposto  
**Data:** 15 de Outubro de 2026  
**Autor:** Philip Kazuhiro (Kazu) / Maestro Tear & Noesis  
**Branch:** `feature/01-pwa-local-first`  
**Requisitos Reunidos em:** `respostas/01.md`  

---

## Metadados SDD
- **versao_plano:** 2.0
- **tipo:** feature
- **blast_radius:** medio
- **orcamento_tokens:** 35000

---

## Contexto & Problema
O repositório `byte.burger` possui alta fidelidade visual e design system expressivo, mas opera em modo estritamente demonstrativo com amnésia de estado no refresh da página (F5), 0% de testes automatizados, anomalias de nomenclatura em arquivos de build (`vit.config.ts`, `tsconfig.app.js`) e incompatibilidade de casing de arquivos que inviabiliza o build em servidores Linux/CI. É necessário transformar a aplicação em uma PWA Local-First com persistência soberana e suíte de testes unitários.

---

## Não-Objetivos / Fora de Escopo
- Não implementar backend próprio ou servidor Node/Go neste ciclo (a aplicação permanecerá 100% client-side / serverless).
- Não integrar gateways de pagamento reais com transações bancárias (o checkout permanecerá simulado, mas gravando pedidos localmente).
- Não alterar a identidade visual ou paleta de cores central (ember/ink/level) do Tailwind CSS.

---

## Requisitos EARS

| ID | Tipo | Texto |
| :--- | :--- | :--- |
| REQ-01 | Ubiquitous | O sistema deve compilar sem erros em ambientes Linux e passar no comando de typecheck. |
| REQ-02 | Event | Quando o usuário atualizar a página (F5), o sistema deve restaurar o carrinho, XP e pontos persistidos no localStorage. |
| REQ-03 | Event | Quando o usuário finalizar o pedido no carrinho, o sistema deve creditar o XP no perfil do usuário e registrar a compra no histórico. |
| REQ-04 | Event | Quando o usuário resgatar uma recompensa, o sistema deve debitar os pontos correspondentes do saldo do perfil. |
| REQ-05 | State | Enquanto um modal ou carrinho estiver aberto, o sistema deve capturar a tecla Escape e fechar a interface correspondente. |
| REQ-06 | Ubiquitous | A suíte de testes automatizados com Vitest deve cobrir utilitários de formatação e regras de carrinho com cobertura superior a 80%. |

---

## Orçamentos Não-Funcionais
- **Cobertura de Testes:** Superior a 80% nas funções utilitárias e regras do carrinho.
- **Tamanho do Bundle de Produção:** Máximo de 200 KB gzipped para o bundle JavaScript principal.
- **Tempo de Build:** Inferior a 5 segundos em `npm run build`.
- **Taxa de Quadros (FPS):** Mínimo de 60 FPS durante animações de toasts e transições do carrinho.

---

## Hotspots Compartilhados
- `src/App.tsx` (orquestrador de estado e layout raiz compartilhado entre todas as telas)
- `src/store/cart.tsx` (gerenciador global de carrinho e toasts)
- `package.json` (manifesto de dependências e scripts)

---

## T1 — Higienização de Tooling, Casing & Dependências
- **Agent:** tear-frontend
- **model:** inherit
- **effort:** baixo
- **tempo:** 15m
- **Depends-on:** nenhum
- **Requisitos:** REQ-01

Renomear `vit.config.ts` para `vite.config.ts`, `tsconfig.app.js` para `tsconfig.app.json`, remover `@supabase/supabase-js` do `package.json` e normalizar o casing de `NavBar.tsx`, `Toasthost.tsx`, `home.tsx`, `menu.tsx` e `loyality.tsx`.

---

## T2 — Acessibilidade WCAG 2.1 AA & Otimização de Fontes
- **Agent:** tear-frontend
- **model:** inherit
- **effort:** baixo
- **tempo:** 20m
- **Depends-on:** T1
- **Requisitos:** REQ-05

Mover fontes do `src/index.css` para `<link rel="preconnect">` no `index.html`. Implementar listeners da tecla `Escape` no `CartDrawer` e `ProductModal`, adicionando `aria-label="Fechar"` e atributos `aria-modal="true"`.

---

## T3 — Motor Reativo de Gamificação & Persistência Local-First
- **Agent:** tear-frontend
- **model:** inherit
- **effort:** medio
- **tempo:** 35m
- **Depends-on:** T1
- **Requisitos:** REQ-02, REQ-03, REQ-04

Criar `UserContext` e `UserProvider` com sincronização bidirecional no `localStorage`. Conectar o checkout para creditar XP real e salvar pedidos no histórico. Conectar o resgate de recompensas para debitar pontos do saldo. Sincronizar o cálculo de percentual de XP entre Home e Loyalty.

---

## T4 — Suíte de Testes Automatizados com Vitest (TDD)
- **Agent:** tear-qa
- **model:** inherit
- **effort:** medio
- **tempo:** 30m
- **Depends-on:** T1
- **Requisitos:** REQ-06

Configurar Vitest e Testing Library. Criar testes unitários para `src/lib/format.test.ts`, `src/data/menu.test.ts` e `src/store/cart.test.tsx` com cenários felizes, casos de borda e tratamento de erros.

---

## Matriz de Rastreabilidade

| Requisito | Tarefa | Teste |
| :--- | :--- | :--- |
| REQ-01 | T1 | src/lib/format.test.ts |
| REQ-02 | T3 | src/store/cart.test.tsx |
| REQ-03 | T3 | src/store/cart.test.tsx |
| REQ-04 | T3 | src/store/cart.test.tsx |
| REQ-05 | T2 | src/store/cart.test.tsx |
| REQ-06 | T4 | src/data/menu.test.ts |

---

## Emendas
Nenhuma emenda registrada até o momento.
