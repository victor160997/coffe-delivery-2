import { AddressFormContainer } from './styles'
import { useFormContext } from 'react-hook-form'
import { Input } from '../../../../components/Input'

interface ErrorsType {
  errors: {
    [key: string]: {
      message: string
    }
  }
}

export function AddressForm() {
  const { register, formState } = useFormContext()

  const { errors } = formState as unknown as ErrorsType

  return (
    <AddressFormContainer>
      <div className="row">
        <Input
          placeholder="CEP"
          type="text"
          className="cep"
          {...register('cep')}
          error={errors.cep?.message}
          id="cep"
          // pattern="\d{5}-\d{3}"
        />
      </div>
      <div className="row">
        <Input
          placeholder="Rua"
          className="street"
          {...register('street')}
          error={errors.street?.message}
          id="rua"
        />
      </div>
      <div className="row">
        <Input
          type="number"
          placeholder="Número"
          {...register('number')}
          error={errors.number?.message}
          id="numero"
        />
        <Input
          placeholder="Complemento"
          className="complement"
          {...register('complement')}
          error={errors.complement?.message}
          rightText="Opcional"
          id="complemento"
        />
      </div>
      <div className="row">
        <Input
          placeholder="Bairro"
          {...register('district')}
          error={errors.district?.message}
          id="bairro"
        />
        <Input
          placeholder="Cidade"
          className="city"
          {...register('city')}
          error={errors.city?.message}
          id="cidade"
        />
        <Input
          placeholder="UF"
          className="uf"
          {...register('uf')}
          error={errors.uf?.message}
          id="uf"
        />
      </div>
    </AddressFormContainer>
  )
}
