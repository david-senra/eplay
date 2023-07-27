export const getTotalPrice = (items: Jogo[]) => {
  return items.reduce((acumulador, valorAtual) => {
    return (acumulador += valorAtual.prices.current
      ? valorAtual.prices.current
      : 0)
  }, 0)
}

export const getTotalPricePedido = (items: TipoProdutoCheckout[]) => {
  return items.reduce((acumulador, valorAtual) => {
    return (acumulador += valorAtual.price ? valorAtual.price : 0)
  }, 0)
}

export const formataPreco = (preco = 0) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(preco)
}
