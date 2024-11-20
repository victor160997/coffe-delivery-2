import { test, expect } from '@playwright/test'

test('FE01 - CEP: Testar o valor mínimo válido no formato correto.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#cep').fill('00000-000')

  await page.locator('button[type="submit"]').click()

  const errorMessageFillCep = await page.locator('text=Informe o CEP').count()
  const errorMessageInvlidCep = await page
    .locator('text=CEP inválido, use o formato 00000-000')
    .count()

  expect(errorMessageFillCep).toBe(0)
  expect(errorMessageInvlidCep).toBe(0)
})

test('FE02 - CEP: Testar quando o campo está vazio.', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#cep').fill('')

  await page.locator('button[type="submit"]').click()

  const errorMessageFillCep = await page.locator('text=Informe o CEP').count()

  expect(errorMessageFillCep).toBe(1)
})

test('FE03 - CEP: Testar um CEP com menos dígitos do que o esperado.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#cep').fill('12345')

  await page.locator('button[type="submit"]').click()

  const errorMessageInvalidCep = await page
    .locator('text=CEP inválido, use o formato 00000-000')
    .count()

  expect(errorMessageInvalidCep).toBe(1)
})

test('FE04 - CEP: Testar um CEP com mais dígitos do que o permitido.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#cep').fill('123456-789')

  await page.locator('button[type="submit"]').click()

  const errorMessageInvalidCep = await page
    .locator('text=CEP inválido, use o formato 00000-000')
    .count()

  expect(errorMessageInvalidCep).toBe(1)
})

test('FE05 - Rua: Testar o valor mínimo válido (uma letra).', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#rua').fill('A')

  await page.locator('button[type="submit"]').click()

  const errorMessageFillRua = await page.locator('text=Informe o Rua').count()

  expect(errorMessageFillRua).toBe(0)
})

test('FE06 - Rua: Testar o campo vazio para verificar a mensagem de erro.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#rua').fill('')

  await page.locator('button[type="submit"]').click()

  const errorMessageFillRua = await page.locator('text=Informe o Rua').count()

  expect(errorMessageFillRua).toBe(1)
})

test('FE07 - Rua: Testar o valor no limite máximo permitido.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#rua').fill('A'.repeat(150))

  await page.locator('button[type="submit"]').click()

  const errorMessageFillRua = await page
    .locator('text=O nome da rua é muito grande')
    .count()

  expect(errorMessageFillRua).toBe(0)
})

test('FE08 - Rua: Testar o valor excedendo o limite máximo.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#rua').fill('A'.repeat(151))

  await page.locator('button[type="submit"]').click()

  const errorMessageFillRua = await page
    .locator('text=O nome da rua é muito grande')
    .count()

  expect(errorMessageFillRua).toBe(1)
})

test('FE09 - Número: Testar o valor mínimo válido para o número.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#numero').fill('1')

  await page.locator('button[type="submit"]').click()

  const errorMessageFillNumero = await page
    .locator('text=Informe o Número')
    .count()

  expect(errorMessageFillNumero).toBe(0)
})

test('FE10 - Número: Testar o campo vazio para número.', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#numero').fill('')

  await page.locator('button[type="submit"]').click()

  const errorMessageFillNumero = await page
    .locator('text=Informe o Número')
    .count()

  expect(errorMessageFillNumero).toBe(1)
})

test('FE11 - Número: Testar o valor no limite máximo permitido.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#numero').fill('999999')

  await page.locator('button[type="submit"]').click()

  const errorMessageBigNumero = await page
    .locator('text=Número muito grande')
    .count()

  expect(errorMessageBigNumero).toBe(0)
})

test('FE12 - Número: Testar o valor acima do limite máximo permitido.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#numero').fill('1000000')

  await page.locator('button[type="submit"]').click()

  const errorMessageBigNumero = await page
    .locator('text=Número muito grande')
    .count()

  expect(errorMessageBigNumero).toBe(1)
})

test('FE13 - Complemento: Testar campo vazio, que é válido para complemento.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#complemento').fill('')

  await page.locator('button[type="submit"]').click()

  const errorMessageFillComplemento = await page
    .locator('text=Complemento muito grande')
    .count()

  expect(errorMessageFillComplemento).toBe(0)
})

test('FE14 - Complemento: Testar o valor no limite máximo permitido.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#complemento').fill('A'.repeat(150))

  await page.locator('button[type="submit"]').click()

  const errorMessageBigComplemento = await page
    .locator('text=Complemento muito grande')
    .count()

  expect(errorMessageBigComplemento).toBe(0)
})

test('FE15 - Complemento: Testar o valor acima do limite máximo permitido.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#complemento').fill('A'.repeat(151))

  await page.locator('button[type="submit"]').click()

  const errorMessageBigComplemento = await page
    .locator('text=Complemento muito grande')
    .count()

  expect(errorMessageBigComplemento).toBe(1)
})

test('FE16 - Bairro: Testar o valor mínimo válido para o bairro.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#bairro').fill('A')

  await page.locator('button[type="submit"]').click()

  const errorMessageFillBairro = await page
    .locator('text=Informe o Bairro')
    .count()

  expect(errorMessageFillBairro).toBe(0)
})

test('FE17 - Bairro: Testar o campo vazio para verificar a mensagem de erro.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#bairro').fill('')

  await page.locator('button[type="submit"]').click()

  const errorMessageFillBairro = await page
    .locator('text=Informe o Bairro')
    .count()

  expect(errorMessageFillBairro).toBe(1)
})

test('FE18 - Bairro: Testar o valor no limite máximo permitido.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#bairro').fill('A'.repeat(150))

  await page.locator('button[type="submit"]').click()

  const errorMessageBigBairro = await page
    .locator('text=Bairro muito grande')
    .count()

  expect(errorMessageBigBairro).toBe(0)
})

test('FE19 - Bairro: Testar o valor acima do limite máximo permitido.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#bairro').fill('A'.repeat(151))

  await page.locator('button[type="submit"]').click()

  const errorMessageBigBairro = await page
    .locator('text=Bairro muito grande')
    .count()

  expect(errorMessageBigBairro).toBe(1)
})

test('FE20 - Cidade: Testar o valor mínimo válido para a cidade.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#cidade').fill('A')

  await page.locator('button[type="submit"]').click()

  const errorMessageFillCidade = await page
    .locator('text=Informe a Cidade')
    .count()

  expect(errorMessageFillCidade).toBe(0)
})

test('FE21 - Cidade: Testar o campo vazio para verificar a mensagem de erro.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#cidade').fill('')

  await page.locator('button[type="submit"]').click()

  const errorMessageFillCidade = await page
    .locator('text=Informe a Cidade')
    .count()

  expect(errorMessageFillCidade).toBe(1)
})

test('FE22 - Cidade: Testar o valor no limite máximo permitido.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#cidade').fill('A'.repeat(150))

  await page.locator('button[type="submit"]').click()

  const errorMessageBigCidade = await page
    .locator('text=Cidade muito grande')
    .count()

  expect(errorMessageBigCidade).toBe(0)
})

test('FE23 - Cidade: Testar o valor acima do limite máximo permitido.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#cidade').fill('A'.repeat(151))

  await page.locator('button[type="submit"]').click()

  const errorMessageBigCidade = await page
    .locator('text=Cidade muito grande')
    .count()

  expect(errorMessageBigCidade).toBe(1)
})

test('FE24 - UF: Testar o valor mínimo válido para o UF.', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#uf').fill('SP')

  await page.locator('button[type="submit"]').click()

  const errorMessageFillUF = await page.locator('text=Informe a UF').count()

  expect(errorMessageFillUF).toBe(0)
})

test('FE25 - UF: Testar o campo vazio para verificar a mensagem de erro.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#uf').fill('')

  await page.locator('button[type="submit"]').click()

  const errorMessageFillUF = await page.locator('text=Informe a UF').count()

  expect(errorMessageFillUF).toBe(1)
})

test('FE26 - UF: Testar um valor no limite máximo permitido.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#uf').fill('RJ')

  await page.locator('button[type="submit"]').click()

  const errorMessageBigUF = await page.locator('text=UF muito grande').count()

  expect(errorMessageBigUF).toBe(0)
})

test('FE27 - UF: Testar um valor acima do limite máximo permitido.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  await page.locator('#uf').fill('RJS')

  await page.locator('button[type="submit"]').click()

  const errorMessageBigUF = await page.locator('text=UF muito grande').count()

  expect(errorMessageBigUF).toBe(1)
})
