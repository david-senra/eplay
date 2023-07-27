import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import InputMask from 'react-input-mask'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { usePurchaseMutation } from '../../services/api'
import { RootReducer } from '../../store'
import { clear } from '../../store/reducers/cart'
import { addOrder } from '../../store/reducers/orders'
import Button from '../../components/Button'
import Card from '../../components/Card'
import boletoImg from '../../assets/images/boleto.svg'
import cartaoImg from '../../assets/images/cartao.svg'
import { getTotalPrice, formataPreco, getTotalPricePedido } from '../../utils'
import * as S from './styles'

const Checkout = () => {
  const { items } = useSelector((state: RootReducer) => state.cart)
  const { produtos } = useSelector((state: RootReducer) => state.orders)
  const [payWithCard, setPayWithCard] = useState(false)
  const [purchase, { data, isSuccess, isLoading }] = usePurchaseMutation()
  const [installments, setInstallments] = useState<InstallmentsType[]>([])
  const dispatch = useDispatch()

  const totalPrice = getTotalPrice(items)
  const ProdutosCheckOut: TipoProdutoCheckout[] = items.map((item) => ({
    id: item.id,
    price: item.prices.current as number,
    nome: item.name
  }))

  useEffect(() => {
    const calculateInstallments = () => {
      const installmentsArray: InstallmentsType[] = []
      for (let i = 1; i <= 6; i++) {
        installmentsArray.push({
          quantity: i,
          amount: totalPrice / i,
          formattedAmount: formataPreco(totalPrice / i)
        })
      }
      return installmentsArray
    }
    if (totalPrice > 0) setInstallments(calculateInstallments())
  }, [totalPrice])

  useEffect(() => {
    if (isSuccess) {
      dispatch(clear())
      window.scrollTo({ top: 180 })
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    window.scrollTo({ top: 180 })
  }, [])

  const form = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      cpf: '',
      deliveryEmail: '',
      confirmDeliveryEmail: '',
      cardOwner: '',
      cpfCardOwner: '',
      cardDisplayName: '',
      cardNumber: '',
      expireMonth: '',
      expireYear: '',
      cardCode: '',
      installments: 1
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(5, 'O nome deve ter pelo menos 5 caracteres')
        .required('Campo obrigatório'),
      email: Yup.string()
        .email('Por favor, insira um e-mail válido')
        .required('Campo obrigatório'),
      cpf: Yup.string()
        .min(14, 'O CPF deve ter 11 dígitos')
        .required('Campo obrigatório'),
      deliveryEmail: Yup.string()
        .email('Por favor, insira um e-mail válido')
        .required('Campo obrigatório'),
      confirmDeliveryEmail: Yup.string()
        .oneOf(
          [Yup.ref('deliveryEmail')],
          'Os e-mails informados precisam ser iguais!'
        )
        .required('Campo obrigatório'),

      cardOwner: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('Campo obrigatório') : schema
      ),
      cpfCardOwner: Yup.string().when((values, schema) =>
        payWithCard
          ? schema
              .required('Campo obrigatório')
              .min(14, 'O CPF deve ter 11 dígitos')
          : schema
      ),
      cardDisplayName: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('Campo obrigatório') : schema
      ),
      cardNumber: Yup.string().when((values, schema) =>
        payWithCard
          ? schema
              .required('Campo obrigatório')
              .min(19, 'Cartão incompleto. Preencha todos os dígitos.')
          : schema
      ),
      expireMonth: Yup.number().when((values, schema) =>
        payWithCard
          ? schema
              .required('Campo obrigatório')
              .max(12, 'Insira um mês válido')
              .min(1, 'Insira um mês válido')
          : schema
      ),
      expireYear: Yup.number().when((values, schema) =>
        payWithCard
          ? schema
              .min(2024, 'Insira um ano válido')
              .max(2050, 'Insira um ano válido')
              .required('O campo é obrigatório')
          : schema
      ),
      cardCode: Yup.string().when((values, schema) =>
        payWithCard
          ? schema.required('Campo obrigatório').min(3, 'Código inválido')
          : schema
      ),
      installments: Yup.number().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      )
    }),
    onSubmit: (values) => {
      purchase({
        billing: {
          document: values.cpf,
          name: values.fullName,
          email: values.email
        },
        delivery: {
          email: values.deliveryEmail
        },
        payment: {
          installments: values.installments,
          card: {
            active: payWithCard,
            owner: {
              name: values.cardOwner,
              document: values.cpfCardOwner
            },
            name: values.cardDisplayName,
            number: values.cardNumber,
            expires: {
              month: Number(values.expireMonth),
              year: Number(values.expireYear)
            },
            code: Number(values.cardCode)
          }
        },
        products: ProdutosCheckOut.map((item) => ({
          id: item.id,
          price: item.price
        }))
      })
        .unwrap()
        .then(() => dispatch(addOrder(ProdutosCheckOut)))
      // .catch((error) => error && console.error('rejected', error)) - ação após erro - mesma lógica acima
    }
  })

  useEffect(() => {
    const el = document.querySelector('.error')
    const elm = el && el.closest('.card-inputs')
    elm &&
      elm.scrollIntoView({
        behavior: 'smooth'
      })
  }, [form.isSubmitting])

  const payCard = () => {
    setPayWithCard(true)
  }

  const payBoleto = () => {
    setPayWithCard(false)
    form.values.cardNumber = ''
    form.values.cardOwner = ''
    form.values.cpfCardOwner = ''
    form.values.cardDisplayName = ''
    form.values.expireMonth = ''
    form.values.expireYear = ''
    form.values.installments = 1
  }

  const getErrorMessage = (fieldName: string, message?: string) => {
    const isInvalid: boolean = fieldName in form.errors
    const isAttempted: boolean = form.submitCount > 0
    const hasError = isInvalid && isAttempted
    return hasError ? message : ''
  }

  const checkInputhasError = (fieldName: string) => {
    const isInvalid: boolean = fieldName in form.errors
    const isAttempted: boolean = form.submitCount > 0
    const hasError = isInvalid && isAttempted
    return hasError
  }

  const checkGeneralError = () => {
    const isAttempted: boolean = form.submitCount > 0
    const formInvalid = payWithCard
      ? !form.isValid
      : 'cpf' in form.errors ||
        'fullName' in form.errors ||
        'email' in form.errors ||
        'deliveryEmail' in form.errors ||
        'confirmDeliveryEmail' in form.errors
    return isAttempted && formInvalid
  }

  if (items.length === 0 && !isSuccess) {
    return <Navigate to="/" />
  }

  return (
    <div className="container" id="principal">
      {isSuccess && data ? (
        <Card title="Muito Obrigado">
          <>
            <p>
              É com satisfação que informamos que recebemos seu pedido com
              sucesso! <br />
            </p>
            {!payWithCard && (
              <p className="margin-top">
                Como você optou por pagamento via boleto bancário, lembre-se de
                que a confirmação pode levar até 3 dias úteis.
                <br /> Após a aprovação do pagamento, enviaremos um e-mail
                contendo o código de ativação do jogo.
              </p>
            )}
            {payWithCard && (
              <p className="margin-top">
                Como você optou pelo pagamento com cartão de crédito, a
                liberação do código de ativação ocorrerá somente após a
                aprovação da transação pela operadora do cartão.
                <br /> Você receberá o código no e-mail cadastrado em nossa
                loja.
              </p>
            )}
            <p className="margin-top">
              Pedimos que verifique sua caixa de entrada e a pasta de spam para
              garantir que receba nossa comunicação.
              <br /> Caso tenha alguma dúvida ou necessite de mais informações,
              por favor, entre em contato conosco através dos nossos canais de
              atendimento ao cliente.
            </p>
            <p className="margin-top">
              Agradecemos por escolher a EPLAY e esperamos que desfrute do seu
              jogo!
            </p>
            <S.TituloCompra>Detalhes da sua Compra:</S.TituloCompra>
            <S.DivPedido>
              <S.DivNumeroProduto>
                <p>Número do pedido:</p>
                <S.TextoPedido>{data.orderId}</S.TextoPedido>
              </S.DivNumeroProduto>
              <S.DivFormaPagamento>
                <p>Forma de pagamento:</p>
                <S.TextoPedido>
                  {payWithCard ? 'Cartão de crédito' : 'Boleto Bancário'}
                </S.TextoPedido>
              </S.DivFormaPagamento>
              <S.DivTextoProdutos>
                <p>Produtos:</p>
              </S.DivTextoProdutos>
              <S.DivListaProdutos>
                {produtos.map((produto) => (
                  <S.DivProduto key={produto.id}>
                    <p>{produto.nome}</p>
                    <span>{formataPreco(produto.price)}</span>
                  </S.DivProduto>
                ))}
              </S.DivListaProdutos>
              <S.DivPrecoFinal>
                <S.TextoPrecoFinal>Valor Total:</S.TextoPrecoFinal>
                <S.ValorPrecoFinal>
                  {formataPreco(getTotalPricePedido(produtos))}
                </S.ValorPrecoFinal>
              </S.DivPrecoFinal>
            </S.DivPedido>
          </>
        </Card>
      ) : (
        <form className="container" onSubmit={form.handleSubmit}>
          <Card className="card-inputs" title="Dados de Cobrança">
            <>
              <S.Row>
                <S.InputGroup maxWidth="309.333px">
                  <label htmlFor="fullName">Nome Completo</label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={form.values.fullName}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={checkInputhasError('fullName') ? 'error' : ''}
                  />
                  <S.ErroMensagem>
                    {getErrorMessage('fullName', form.errors.fullName)}
                  </S.ErroMensagem>
                </S.InputGroup>
                <S.InputGroup maxWidth="309.333px">
                  <label htmlFor="email">E-mail</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.values.email}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={checkInputhasError('email') ? 'error' : ''}
                  />
                  <S.ErroMensagem>
                    {getErrorMessage('email', form.errors.email)}
                  </S.ErroMensagem>
                </S.InputGroup>
                <S.InputGroup maxWidth="309.333px">
                  <label htmlFor="cpf">CPF</label>
                  <InputMask
                    id="cpf"
                    type="text"
                    name="cpf"
                    value={form.values.cpf}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={checkInputhasError('cpf') ? 'error' : ''}
                    mask="999.999.999-99"
                    maskChar={''}
                  />
                  <S.ErroMensagem>
                    {getErrorMessage('cpf', form.errors.cpf)}
                  </S.ErroMensagem>
                </S.InputGroup>
              </S.Row>
              <S.DivEntrega className="card-inputs">
                <h3 className="card-inputs">
                  Dados de entrega - conteúdo digital
                </h3>
                <S.Row>
                  <S.InputGroup maxWidth="309.333px">
                    <label htmlFor="deliveryEmail">E-mail</label>
                    <input
                      id="deliveryEmail"
                      type="email"
                      name="deliveryEmail"
                      value={form.values.deliveryEmail}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={
                        checkInputhasError('deliveryEmail') ? 'error' : ''
                      }
                    />
                    <S.ErroMensagem>
                      {getErrorMessage(
                        'deliveryEmail',
                        form.errors.deliveryEmail
                      )}
                    </S.ErroMensagem>
                  </S.InputGroup>
                  <S.InputGroup maxWidth="309.333px">
                    <label htmlFor="confirmDeliveryEmail">
                      Confirme o e-mail
                    </label>
                    <input
                      id="confirmDeliveryEmail"
                      type="email"
                      name="confirmDeliveryEmail"
                      value={form.values.confirmDeliveryEmail}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={
                        checkInputhasError('confirmDeliveryEmail')
                          ? 'error'
                          : ''
                      }
                    />
                    <S.ErroMensagem>
                      {getErrorMessage(
                        'confirmDeliveryEmail',
                        form.errors.confirmDeliveryEmail
                      )}
                    </S.ErroMensagem>
                  </S.InputGroup>
                </S.Row>
              </S.DivEntrega>
            </>
          </Card>
          <Card className="card-inputs" title="Pagamento">
            <>
              <S.DivTabButton>
                <S.TabButton
                  type="button"
                  isActive={!payWithCard}
                  onClick={() => payBoleto()}
                >
                  <img src={boletoImg} alt="pagar por boleto" />
                  Boleto bancário
                </S.TabButton>
                <S.TabButton
                  type="button"
                  isActive={payWithCard}
                  onClick={() => payCard()}
                >
                  <img src={cartaoImg} alt="pagar por cartão" />
                  Cartão de crédito
                </S.TabButton>
              </S.DivTabButton>
              <div className="margin-top">
                {payWithCard ? (
                  <>
                    <S.Row>
                      <S.InputGroup maxWidth="458.4px">
                        <label htmlFor="cardOwner">
                          Nome do titular do cartão
                        </label>
                        <input
                          id="cardOwner"
                          type="text"
                          name="cardOwner"
                          value={form.values.cardOwner}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputhasError('cardOwner') ? 'error' : ''
                          }
                        />
                        <S.ErroMensagem>
                          {getErrorMessage('cardOwner', form.errors.cardOwner)}
                        </S.ErroMensagem>
                      </S.InputGroup>
                      <S.InputGroup maxWidth="458.4px">
                        <label htmlFor="cpfCardOwner">
                          CPF do titular do cartão
                        </label>
                        <InputMask
                          id="cpfCardOwner"
                          type="text"
                          name="cpfCardOwner"
                          value={form.values.cpfCardOwner}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputhasError('cpfCardOwner') ? 'error' : ''
                          }
                          mask="999.999.999-99"
                          maskChar={''}
                        />
                        <S.ErroMensagem>
                          {getErrorMessage(
                            'cpfCardOwner',
                            form.errors.cpfCardOwner
                          )}
                        </S.ErroMensagem>
                      </S.InputGroup>
                    </S.Row>
                    <S.Row marginTop="10px">
                      <S.InputGroup maxWidth="275.4px">
                        <label htmlFor="cardDisplayName">Nome no cartão</label>
                        <input
                          id="cardDisplayName"
                          type="text"
                          name="cardDisplayName"
                          value={form.values.cardDisplayName}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputhasError('cardDisplayName') ? 'error' : ''
                          }
                        />
                        <S.ErroMensagem>
                          {getErrorMessage(
                            'cardDisplayName',
                            form.errors.cardDisplayName
                          )}
                        </S.ErroMensagem>
                      </S.InputGroup>
                      <S.InputGroup maxWidth="215.4px">
                        <label htmlFor="cardNumber">Número do cartão</label>
                        <InputMask
                          id="cardNumber"
                          type="text"
                          name="cardNumber"
                          value={form.values.cardNumber}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputhasError('cardNumber') ? 'error' : ''
                          }
                          mask="9999 9999 9999 9999"
                          maskChar={''}
                        />
                        <S.ErroMensagem>
                          {getErrorMessage(
                            'cardNumber',
                            form.errors.cardNumber
                          )}
                        </S.ErroMensagem>
                      </S.InputGroup>
                      <S.InputGroup maxWidth="123px">
                        <label htmlFor="expireMonth">Mês do vencimento</label>
                        <InputMask
                          id="expireMonth"
                          type="text"
                          name="expireMonth"
                          value={form.values.expireMonth}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputhasError('expireMonth') ? 'error' : ''
                          }
                          mask="99"
                          maskChar={''}
                        />
                        <S.ErroMensagem>
                          {getErrorMessage(
                            'expireMonth',
                            form.errors.expireMonth
                          )}
                        </S.ErroMensagem>
                      </S.InputGroup>
                      <S.InputGroup maxWidth="123px">
                        <label htmlFor="expireYear">Ano do vencimento</label>
                        <InputMask
                          id="expireYear"
                          type="text"
                          name="expireYear"
                          value={form.values.expireYear}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputhasError('expireYear') ? 'error' : ''
                          }
                          mask="9999"
                          maskChar={''}
                        />
                        <S.ErroMensagem>
                          {getErrorMessage(
                            'expireYear',
                            form.errors.expireYear
                          )}
                        </S.ErroMensagem>
                      </S.InputGroup>
                      <S.InputGroup maxWidth="108px">
                        <label htmlFor="cardCode">CVV</label>
                        <InputMask
                          id="cardCode"
                          type="text"
                          name="cardCode"
                          value={form.values.cardCode}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputhasError('cardCode') ? 'error' : ''
                          }
                          mask="999"
                          maskChar={''}
                        />
                        <S.ErroMensagem>
                          {getErrorMessage('cardCode', form.errors.cardCode)}
                        </S.ErroMensagem>
                      </S.InputGroup>
                    </S.Row>
                    <S.Row marginTop="10px">
                      <S.InputGroup maxWidth="150px">
                        <label htmlFor="installments">Parcelamento</label>
                        <select
                          id="installments"
                          name="installments"
                          value={form.values.installments}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputhasError('installments') ? 'error' : ''
                          }
                        >
                          {installments.map((parcelas) => (
                            <option
                              value={parcelas.quantity}
                              key={parcelas.quantity}
                            >
                              {parcelas.quantity}x de {parcelas.formattedAmount}
                            </option>
                          ))}
                        </select>
                        <S.ErroMensagem>
                          {getErrorMessage(
                            'installments',
                            form.errors.installments
                          )}
                        </S.ErroMensagem>
                      </S.InputGroup>
                    </S.Row>
                  </>
                ) : (
                  <p>
                    Ao optar por essa forma de pagamento, é importante lembrar
                    que a confirmação pode levar até 3 dias úteis, devido aos
                    prazos estabelecidos pelas instituições financeiras.
                    Portanto, a liberação do código de ativação do jogo
                    adquirido ocorrerá somente após a aprovação do pagamento do
                    boleto.
                  </p>
                )}
              </div>
            </>
          </Card>
          <S.DivButtonFinal>
            <Button
              tipo="submit"
              title="Clique aqui para finalizar a compra"
              disabled={isLoading}
              classe={isLoading ? 'is-loading' : ''}
            >
              Finalizar Compra
            </Button>
          </S.DivButtonFinal>
          <S.ErroMensagemGeral className={isLoading ? 'is-loading' : ''}>
            {checkGeneralError()
              ? 'Por favor, corrija os erros presentes no formulário e tente novamente'
              : isLoading
              ? 'Finalizando compra...'
              : ''}
          </S.ErroMensagemGeral>
        </form>
      )}
    </div>
  )
}

export default Checkout
