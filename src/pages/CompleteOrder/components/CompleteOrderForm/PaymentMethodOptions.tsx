import { Bank, CreditCard, Money } from 'phosphor-react'
import { PaymentMethodInput } from '../PaymentMethodInput'
import { PaymentMethodOptionsContainer } from './styles'

import { useFormContext } from 'react-hook-form'
import { RegularText } from '../../../../components/Typography'

export const paymentMethods = {
  credit: {
    label: 'Cartão de Cŕedito',
    icon: <CreditCard size={16} />,
    id: 'creditButton',
  },
  debit: {
    label: 'Cartão de Débito',
    icon: <Bank size={16} />,
    id: 'debitButton',
  },
  money: {
    label: 'Dinheiro',
    icon: <Money size={16} />,
    id: 'moneyButton',
  },
}

export function PaymentMethodOptions() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const paymentMethodError = errors?.paymentMethod?.message as string

  return (
    <PaymentMethodOptionsContainer>
      {Object.entries(paymentMethods).map(([key, { label, icon, id }]) => (
        <PaymentMethodInput
          key={label}
          id={id}
          icon={icon}
          label={label}
          value={key}
          {...register('paymentMethod')}
        />
      ))}
      {paymentMethodError && <RegularText>{paymentMethodError}</RegularText>}
    </PaymentMethodOptionsContainer>
  )
}
