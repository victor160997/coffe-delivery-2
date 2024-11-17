/* eslint-disable no-unused-vars */
import { CompleteOrderForm } from './components/CompleteOrderForm'
import { SelectedCoffees } from './components/SelectedCoffees'
import { CompleteOrderContainer } from './styles'
import { useForm, FormProvider } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

enum PaymentMethods {
  credit = 'credit',
  debit = 'debit',
  money = 'money',
}

const confirmOrderFormValidationSchema = zod.object({
  cep: zod
    .string()
    .min(1, 'Informe o CEP')
    .regex(/^\d{5}-\d{3}$/, 'CEP inválido, use o formato 00000-000'),
  street: zod
    .string()
    .min(1, 'Informe o Rua')
    .max(150, 'O nome da rua é muito grande'),
  number: zod.string().min(1, 'Informe o Número').max(6, 'Número muito grande'),
  complement: zod.string().max(150, 'Complemento muito grande'),
  district: zod
    .string()
    .min(1, 'Informe o Bairro')
    .max(150, 'Bairro muito grande'),
  city: zod.string().min(1, 'Informe a Cidade').max(150, 'Cidade muito grande'),
  uf: zod.string().min(1, 'Informe a UF').max(2, 'UF muito grande'),
  paymentMethod: zod.nativeEnum(PaymentMethods, {
    errorMap: () => {
      return { message: 'Informe o método de pagamento' }
    },
  }),
})

export type OrderData = zod.infer<typeof confirmOrderFormValidationSchema>

type ConfirmOrderFormData = OrderData

export function CompleteOrderPage() {
  const confirmOrderForm = useForm<ConfirmOrderFormData>({
    resolver: zodResolver(confirmOrderFormValidationSchema),
    defaultValues: {
      paymentMethod: undefined,
    },
  })

  const { handleSubmit } = confirmOrderForm

  const navigate = useNavigate()
  const { cleanCart } = useCart()

  function handleConfirmOrder(data: ConfirmOrderFormData) {
    navigate('/orderConfirmed', {
      state: data,
    })
    cleanCart()
  }

  return (
    <FormProvider {...confirmOrderForm}>
      <CompleteOrderContainer
        className="container"
        onSubmit={handleSubmit(handleConfirmOrder)}
      >
        <CompleteOrderForm />
        <SelectedCoffees />
      </CompleteOrderContainer>
    </FormProvider>
  )
}
