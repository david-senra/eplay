import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { usePurchaseMutation } from '../../services/api'
import { RootReducer } from '../../store'
import { reset } from '../../store/reducers/cart'
import Button from '../../components/Button'
import Card from '../../components/Card'
import boletoImg from '../../assets/images/boleto.svg'
import cartaoImg from '../../assets/images/cartao.svg'
import { getTotalPrice, formataPreco } from '../../utils'
import * as S from './styles'

type InstallmentsType = {
  quantity: number
  amount: number
  formattedAmount: string
}

const Checkout = () => {
  const { items } = useSelector((state: RootReducer) => state.cart)
  const [payWithCard, setPayWithCard] = useState(false)
  const [purchase, { data, isSuccess, isLoading }] = usePurchaseMutation()
  const [installments, setInstallments] = useState<InstallmentsType[]>([])

  const totalPrice = getTotalPrice(items)

  const dispatch = useDispatch()

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

  const SuccessReset = () => {
    dispatch(reset())
    window.scrollTo({ top: 0 })
  }

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
        .required('O campo é obrigatório'),
      email: Yup.string()
        .email('Por favor, insira um e-mail válido')
        .required('O campo é obrigatório'),
      cpf: Yup.string()
        .min(14, 'O campo precisa ter 14 caracteres')
        .max(14, 'O campo não pode ter mais de 14 caracteres')
        .required('O campo é obrigatório'),
      deliveryEmail: Yup.string()
        .email('Por favor, insira um e-mail válido')
        .required('O campo é obrigatório'),
      confirmDeliveryEmail: Yup.string()
        .oneOf(
          [Yup.ref('deliveryEmail')],
          'Os e-mails informados precisam ser iguais!'
        )
        .required('O campo é obrigatório'),

      cardOwner: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cpfCardOwner: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cardDisplayName: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cardNumber: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      expireMonth: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      expireYear: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cardCode: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('Campo obrigatório') : schema
      ),
      installments: Yup.string().when((values, schema) =>
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
          installments: 1,
          card: {
            active: payWithCard,
            owner: {
              name: values.cardOwner,
              document: values.cpfCardOwner
            },
            name: values.cardDisplayName,
            number: values.cardNumber,
            expires: {
              month: 1,
              year: 2023
            },
            code: Number(values.cardCode)
          }
        },
        products: items.map((item) => ({
          id: item.id,
          price: item.prices.current as number
        }))
      })
        .unwrap()
        .then((payload) => payload && SuccessReset())
        .catch((error) => error && console.error('rejected', error))
    }
  })

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
    <div className="container">
      {isSuccess && data ? (
        <Card title="Muito Obrigado">
          <>
            <p>
              É com satisfação que informamos que recebemos seu pedido com
              sucesso! <br />
              Abaixo estão os detalhes da sua compra:
              <br />
              Número do pedido: {data.orderId}
              <br /> Forma de pagamento:{' '}
              {payWithCard ? 'Cartão de crédito' : 'Boleto Bancário'}
            </p>
            <p className="margin-top">
              Caso tenha optado pelo pagamento via boleto bancário, lembre-se de
              que a confirmação pode levar até 3 dias úteis.
              <br /> Após a aprovação do pagamento, enviaremos um e-mail
              contendo o código de ativação do jogo.
            </p>
            <p className="margin-top">
              Se você optou pelo pagamento com cartão de crédito, a liberação do
              código de ativação ocorrerá após a aprovação da transação pela
              operadora do cartão.
              <br /> Você receberá o código no e-mail cadastrado em nossa loja.
            </p>
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
          </>
        </Card>
      ) : (
        <form className="container" onSubmit={form.handleSubmit}>
          <Card title="Dados de Cobrança">
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
                  <input
                    id="cpf"
                    type="text"
                    name="cpf"
                    value={form.values.cpf}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={checkInputhasError('cpf') ? 'error' : ''}
                  />
                  <S.ErroMensagem>
                    {getErrorMessage('cpf', form.errors.cpf)}
                  </S.ErroMensagem>
                </S.InputGroup>
              </S.Row>
              <h3 className="margin-top">
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
                      checkInputhasError('confirmDeliveryEmail') ? 'error' : ''
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
            </>
          </Card>
          <Card title="Pagamento">
            <>
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
                        <input
                          id="cpfCardOwner"
                          type="text"
                          name="cpfCardOwner"
                          value={form.values.cpfCardOwner}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputhasError('cpfCardOwner') ? 'error' : ''
                          }
                        />
                        <S.ErroMensagem>
                          {getErrorMessage(
                            'cpfCardOwner',
                            form.errors.cpfCardOwner
                          )}
                        </S.ErroMensagem>
                      </S.InputGroup>
                    </S.Row>
                    <S.Row marginTop="24px">
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
                      <S.InputGroup maxWidth="275.4px">
                        <label htmlFor="cardNumber">Número do cartão</label>
                        <input
                          id="cardNumber"
                          type="text"
                          name="cardNumber"
                          value={form.values.cardNumber}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputhasError('cardNumber') ? 'error' : ''
                          }
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
                        <input
                          id="expireMonth"
                          type="text"
                          name="expireMonth"
                          value={form.values.expireMonth}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputhasError('expireMonth') ? 'error' : ''
                          }
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
                        <input
                          id="expireYear"
                          type="text"
                          name="expireYear"
                          value={form.values.expireYear}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputhasError('expireYear') ? 'error' : ''
                          }
                        />
                        <S.ErroMensagem>
                          {getErrorMessage(
                            'expireYear',
                            form.errors.expireYear
                          )}
                        </S.ErroMensagem>
                      </S.InputGroup>
                      <S.InputGroup maxWidth="48px">
                        <label htmlFor="cardCode">CVV</label>
                        <input
                          id="cardCode"
                          type="text"
                          name="cardCode"
                          value={form.values.cardCode}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputhasError('cardCode') ? 'error' : ''
                          }
                        />
                        <S.ErroMensagem>
                          {getErrorMessage('cardCode', form.errors.cardCode)}
                        </S.ErroMensagem>
                      </S.InputGroup>
                    </S.Row>
                    <S.Row marginTop="24px">
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
                            <option key={parcelas.quantity}>
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
          <Button
            tipo="submit"
            title="Clique aqui para finalizar a compra"
            disabled={isLoading}
          >
            {isLoading ? 'Finalizando compra...' : 'Finalizar compra'}
          </Button>
          <S.ErroMensagemGeral>
            {checkGeneralError()
              ? 'Por favor, corrija os erros presentes no formulário e tente novamente'
              : ''}
          </S.ErroMensagemGeral>
        </form>
      )}
    </div>
  )
}

export default Checkout
