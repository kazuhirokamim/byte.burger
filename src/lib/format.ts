export function formatBRL(n: number): string {
  return n.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatXP(n: number): string {
  return n.toLocaleString('pt-BR');
}
