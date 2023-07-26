import { useState } from 'react'
import Button from '../../components/Button'
import Card from '../../components/Card'
import * as S from './styles'
import boletoImg from '../../assets/images/boleto.svg'
import cartaoImg from '../../assets/images/cartao.svg'

const Checkout = () => {
  const [payWithCard, setPayWithCard] = useState(false)

  return (
    <div className="container">
      <Card title="Dados de Cobrança">
        <>
          <S.Row>
            <S.InputGroup>
              <label htmlFor="fullName">Nome Completo</label>
              <input id="fullName" type="text" />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="email">E-mail</label>
              <input id="email" type="email" />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="cpf">CPF</label>
              <input id="cpf" type="text" />
            </S.InputGroup>
          </S.Row>
          <h3 className="margin-top">Dados de entrega - conteúdo digital</h3>
          <S.Row>
            <S.InputGroup>
              <label htmlFor="confirmDeliveryEmail">Confirme o e-mail</label>
              <input id="confirmDeliveryEmail" type="email" />
            </S.InputGroup>
          </S.Row>
        </>
      </Card>
      <Card title="Pagamento">
        <>
          <S.TabButton
            isActive={!payWithCard}
            onClick={() => setPayWithCard(false)}
          >
            <img src={boletoImg} alt="pagar por boleto" />
            Boleto bancário
          </S.TabButton>
          <S.TabButton
            isActive={payWithCard}
            onClick={() => setPayWithCard(true)}
          >
            <img src={cartaoImg} alt="pagar por cartão" />
            Cartão de crédito
          </S.TabButton>
          <div className="margin-top">
            {payWithCard ? (
              <>
                <S.Row>
                  <S.InputGroup>
                    <label htmlFor="donoCartao">
                      Nome do titular do cartão
                    </label>
                    <input id="donoCartao" type="text" />
                  </S.InputGroup>
                  <S.InputGroup>
                    <label htmlFor="donoCpf">CPF do titular do cartão</label>
                    <input id="donoCpf" type="text" />
                  </S.InputGroup>
                </S.Row>
                <S.Row marginTop="24px">
                  <S.InputGroup>
                    <label htmlFor="nomeCartao">Nome no cartão</label>
                    <input id="nomeCartao" type="text" />
                  </S.InputGroup>
                  <S.InputGroup>
                    <label htmlFor="numeroCartao">Número do cartão</label>
                    <input id="numeroCartao" type="number" />
                  </S.InputGroup>
                  <S.InputGroup maxWidth="123px">
                    <label htmlFor="mesVencimento">Mês do vencimento</label>
                    <input id="mesVencimento" type="date" />
                  </S.InputGroup>
                  <S.InputGroup maxWidth="123px">
                    <label htmlFor="anoVencimento">Ano do vencimento</label>
                    <input id="anoVencimento" type="date" />
                  </S.InputGroup>
                  <S.InputGroup maxWidth="48px">
                    <label htmlFor="cvv">CVV</label>
                    <input id="cvv" type="number" />
                  </S.InputGroup>
                </S.Row>
                <S.Row marginTop="24px">
                  <S.InputGroup maxWidth="150px">
                    <label htmlFor="parcelamento">Parcelamento</label>
                    <select id="parcelamento">
                      <option>1x de R$300,00</option>
                      <option>2x de R$150,00</option>
                      <option>3x de R$100,00</option>
                    </select>
                  </S.InputGroup>
                </S.Row>
              </>
            ) : (
              <p>
                Ao optar por essa forma de pagamento, é importante lembrar que a
                confirmação pode levar até 3 dias úteis, devido aos prazos
                estabelecidos pelas instituições financeiras. Portanto, a
                liberação do código de ativação do jogo adquirido ocorrerá
                somente após a aprovação do pagamento do boleto.
              </p>
            )}
          </div>
        </>
      </Card>
      <Button tipo="button" title="Clique aqui para finalizar a compra">
        Finalizar compra
      </Button>
    </div>
  )
}

export default Checkout
