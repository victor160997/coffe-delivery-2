import { test, expect } from '@playwright/test'

test('HW01 - Teste end-to-end de um pedido completo', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await page
    .locator('div:nth-child(2) > .sc-iqcoie > .sc-crXcEl > button')
    .click()
  await page.getByRole('button', { name: '1' }).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('.sc-iIPllB').first().click()
  await page.getByPlaceholder('CEP').fill('36060-390')
  await page.getByPlaceholder('Rua').click()
  await page.getByPlaceholder('Rua').press('CapsLock')
  await page.getByPlaceholder('Rua').fill('H')
  await page.getByPlaceholder('Rua').press('CapsLock')
  await page.getByPlaceholder('Rua').fill('Henrique ')
  await page.getByPlaceholder('Rua').press('CapsLock')
  await page.getByPlaceholder('Rua').fill('Henrique M')
  await page.getByPlaceholder('Rua').press('CapsLock')
  await page.getByPlaceholder('Rua').fill('Henrique MIranda ')
  await page.getByPlaceholder('Rua').press('CapsLock')
  await page.getByPlaceholder('Rua').fill('Henrique MIranda S')
  await page.getByPlaceholder('Rua').press('CapsLock')
  await page.getByPlaceholder('Rua').fill('Henrique MIranda Sa')
  await page.getByPlaceholder('Número').click()
  await page.getByPlaceholder('Número').fill('20')
  await page.getByPlaceholder('Complemento').click()
  await page.getByPlaceholder('Complemento').press('CapsLock')
  await page.getByPlaceholder('Complemento').fill('B')
  await page.getByPlaceholder('Complemento').press('CapsLock')
  await page.getByPlaceholder('Complemento').fill('Bom ')
  await page.getByPlaceholder('Complemento').press('CapsLock')
  await page.getByPlaceholder('Complemento').fill('Bom J')
  await page.getByPlaceholder('Complemento').press('CapsLock')
  await page.getByPlaceholder('Complemento').fill('Bom Jardim')
  await page.getByPlaceholder('Bairro').click()
  await page.getByPlaceholder('Bairro').press('CapsLock')
  await page.getByPlaceholder('Bairro').fill('L')
  await page.getByPlaceholder('Bairro').press('CapsLock')
  await page.getByPlaceholder('Bairro').fill('Linhares')
  await page.getByPlaceholder('Cidade').click()
  await page.getByPlaceholder('Cidade').press('CapsLock')
  await page.getByPlaceholder('Cidade').fill('C')
  await page.getByPlaceholder('Cidade').press('CapsLock')
  await page.getByPlaceholder('Cidade').fill('')
  await page.getByPlaceholder('Cidade').press('CapsLock')
  await page.getByPlaceholder('Cidade').fill('J')
  await page.getByPlaceholder('Cidade').press('CapsLock')
  await page.getByPlaceholder('Cidade').fill('Juis de ')
  await page.getByPlaceholder('Cidade').press('CapsLock')
  await page.getByPlaceholder('Cidade').fill('Juis de F')
  await page.getByPlaceholder('Cidade').press('CapsLock')
  await page.getByPlaceholder('Cidade').fill('Juis de FOra')
  await page.getByPlaceholder('UF').click()
  await page.getByPlaceholder('UF').press('CapsLock')
  await page.getByPlaceholder('UF').fill('MG')
  await page.getByText('Cartão de Débito').dblclick()
  await page.getByRole('button', { name: 'Confirmar pedido' }).click()

  // const finalValue = page.locator('#totalCart')
  // const deliveryValue = page.locator('#deliveryValue')
  // const discountValue = page.locator('#discountValue')

  // await expect(finalValue).toHaveText('R$ 44,60')
  // await expect(deliveryValue).toHaveText('R$ 5,00')
  // await expect(discountValue).not.toBeVisible()

  await expect(page).toHaveURL('http://localhost:5173/orderConfirmed')
})
