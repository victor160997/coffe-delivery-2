import { useEffect, useState } from 'react'
import { Button } from '../../../../components/Button'
import { RegularText } from '../../../../components/Typography'
import { useCart } from '../../../../hooks/useCart'
import { formatMoney } from '../../../../utils/formatMoney'
import { ConfirmationSectionContainer } from './styles'

export function ConfirmationSection() {
  const { cartItemsTotal, cartQuantity } = useCart()
  const [discount, setDiscount] = useState<string | null>(null)
  const [deliveryPrice, setDeliveryPrice] = useState<number>(10)
  const [cartTotal, setCartTotal] = useState<number>(0)

  useEffect(() => {
    setDiscount(null)
    let newDeliveryPrice = 10

    if (cartItemsTotal >= 30) {
      newDeliveryPrice = 5
    }

    if (cartItemsTotal >= 50) {
      newDeliveryPrice = 0
    }

    setDeliveryPrice(newDeliveryPrice)

    let newCartTotal = newDeliveryPrice + cartItemsTotal

    if (newCartTotal >= 100 && newCartTotal < 150) {
      newCartTotal = cartItemsTotal * 0.95
      setDiscount('5%')
    }

    if (newCartTotal >= 150) {
      newCartTotal = cartItemsTotal * 0.9
      setDiscount('10%')
    }

    setCartTotal(newCartTotal)
  }, [cartItemsTotal])

  const formattedItemsTotal = formatMoney(cartItemsTotal)
  const formattedDeliveryPrice = formatMoney(deliveryPrice)
  const formattedCartTotal = formatMoney(cartTotal)

  return (
    <ConfirmationSectionContainer>
      <div>
        <RegularText size="s">Total de itens</RegularText>
        <RegularText size="s">R$ {formattedItemsTotal}</RegularText>
      </div>
      <div>
        <RegularText size="s">Entrega</RegularText>
        <RegularText size="s" id="deliveryValue">
          R$ {formattedDeliveryPrice}
        </RegularText>
      </div>
      {discount && (
        <div>
          <RegularText size="s">Desconto</RegularText>
          <RegularText size="s" id="discountValue">
            - {discount}
          </RegularText>
        </div>
      )}
      <div>
        <RegularText weight="700" color="subtitle" size="l">
          Total
        </RegularText>
        <RegularText weight="700" color="subtitle" size="l" id="totalCart">
          R$ {formattedCartTotal}
        </RegularText>
      </div>

      <Button
        text="Confirmar pedido"
        disabled={cartQuantity <= 0}
        type="submit"
      />
    </ConfirmationSectionContainer>
  )
}
