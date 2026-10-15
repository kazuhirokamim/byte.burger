---
numero: 4
titulo: Arquitetura PWA Local-First com Persistência em Web Storage e Suíte Vitest
status: proposto
data: 2026-10-15
autores: ["Philip Kazuhiro", "Maestro Tear"]
aplica_a: ["src/**"]
tags: ["architecture", "pwa", "local-first", "vitest"]
---

# ADR-004: Arquitetura PWA Local-First com Persistência em Web Storage e Suíte Vitest

## Contexto

No diagnóstico pericial do `byte.burger`, identificou-se que o aplicativo operava com amnésia completa de estado: ao recarregar a página (F5), os itens do carrinho e o progresso da gamificação eram perdidos. Além disso, o resgate de recompensas não debitava pontos reais e o avanço de missões não alterava o XP da conta. O projeto necessita de persistência confiável e suíte de testes unitários sem custos de infraestrutura remota.

## Decisão

No contexto de evolução do aplicativo byte.burger, enfrentando a amnésia de estado no refresh da página e ausência de testes, decidimos por uma arquitetura PWA local-first com localStorage e Vitest, para alcançar persistência de dados e confiabilidade nos builds, aceitando as limitações de armazenamento local.

### Consequências

### Positivas
- Carrinho de compras, pontos, XP acumulado e histórico de pedidos sobrevivem ao fechamento da aba ou reinicialização do navegador.
- A experiência de gamificação se torna interativa e real: resgatar recompensas gasta pontos e fazer pedidos sobe a patente do dev.
- Resolução definitiva de erros de build em ambientes Linux por meio da normalização de casing e tooling.
- Cobertura de testes automatizados superior a 80% nas funções utilitárias e regras de negócio do carrinho.

### Negativas
- Limite de armazenamento padrão do localStorage no navegador (aproximadamente 5 MB), o que é suficiente para o escopo do app mas impõe teto de registros históricos.
- Ausência de sincronização em nuvem entre múltiplos dispositivos do mesmo usuário sem backend ativo.

### Neutras/Riscos Mitigados
- Os pedidos continuam sem despacho para uma impressora física de cozinha, o que é mitigado por se tratar de um showcase de portfólio neste ciclo.
- A migração futura para SQLite WASM ou backend real com Go poderá ser feita reaproveitando as mesmas interfaces tipadas do `UserContext`.
