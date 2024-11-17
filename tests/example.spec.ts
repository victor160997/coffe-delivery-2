import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Coffee Delivery/)
})

test('VF01 - Valor abaixo de R$ 30,00. Entrega padrão.', async ({ page }) => {
  await page.goto('http://localhost:5173')

  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()

  const finalValue = page.locator('#totalCart')
  const deliveryValue = page.locator('#deliveryValue')
  const discountValue = page.locator('#discountValue')

  await expect(finalValue).toHaveText('R$ 19,90')
  await expect(deliveryValue).toHaveText('R$ 10,00')
  await expect(discountValue).not.toBeVisible()
})

test('VF02 - Valor abaixo de R$ 30,00. Entrega padrão.', async ({ page }) => {
  await page.goto('http://localhost:5173')

  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()
  await page.locator('form').getByRole('button').nth(1).click()

  const finalValue = page.locator('#totalCart')
  const deliveryValue = page.locator('#deliveryValue')
  const discountValue = page.locator('#discountValue')

  await expect(finalValue).toHaveText('R$ 29,80')
  await expect(deliveryValue).toHaveText('R$ 10,00')
  await expect(discountValue).not.toBeVisible()
})

test('VF03 - Valor próximo do limite para entrega reduzida.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173')

  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()

  const finalValue = page.locator('#totalCart')
  const deliveryValue = page.locator('#deliveryValue')
  const discountValue = page.locator('#discountValue')

  await expect(finalValue).toHaveText('R$ 39,70')
  await expect(deliveryValue).toHaveText('R$ 10,00')
  await expect(discountValue).not.toBeVisible()
})

test('VF04 - Valor entre R$ 30,00 e R$ 49,99. Entrega reduzida.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173')

  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()

  const finalValue = page.locator('#totalCart')
  const deliveryValue = page.locator('#deliveryValue')
  const discountValue = page.locator('#discountValue')

  await expect(finalValue).toHaveText('R$ 44,60')
  await expect(deliveryValue).toHaveText('R$ 5,00')
  await expect(discountValue).not.toBeVisible()
})

test('VF05 - Valor máximo para entrega reduzida.', async ({ page }) => {
  await page.goto('http://localhost:5173')

  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()

  const finalValue = page.locator('#totalCart')
  const deliveryValue = page.locator('#deliveryValue')
  const discountValue = page.locator('#discountValue')

  await expect(finalValue).toHaveText('R$ 54,50')
  await expect(deliveryValue).toHaveText('R$ 5,00')
  await expect(discountValue).not.toBeVisible()
})

test('VF06 - Entrega gratuita para valor de R$ 50,00 ou mais.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173')

  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()

  const finalValue = page.locator('#totalCart')
  const deliveryValue = page.locator('#deliveryValue')
  const discountValue = page.locator('#discountValue')

  await expect(finalValue).toHaveText('R$ 59,40')
  await expect(deliveryValue).toHaveText('R$ 0,00')
  await expect(discountValue).not.toBeVisible()
})

test('VF07 - Entrega gratuita. Valor abaixo do limite de desconto.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173')

  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()

  const finalValue = page.locator('#totalCart')
  const deliveryValue = page.locator('#deliveryValue')
  const discountValue = page.locator('#discountValue')

  await expect(finalValue).toHaveText('R$ 79,20')
  await expect(deliveryValue).toHaveText('R$ 0,00')
  await expect(discountValue).not.toBeVisible()
})

test('VF08 - Entrega gratuita. Valor abaixo do limite de desconto.', async ({
  page,
}) => {
  await page.goto('http://localhost:5173')

  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()

  const finalValue = page.locator('#totalCart')
  const deliveryValue = page.locator('#deliveryValue')
  const discountValue = page.locator('#discountValue')

  await expect(finalValue).toHaveText('R$ 99,00')
  await expect(deliveryValue).toHaveText('R$ 0,00')
  await expect(discountValue).not.toBeVisible()
})

test('VF09 - Aplicação de 5% de desconto (primeiro nível).', async ({
  page,
}) => {
  await page.goto('http://localhost:5173')

  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()

  const finalValue = page.locator('#totalCart')
  const deliveryValue = page.locator('#deliveryValue')
  const discountValue = page.locator('#discountValue')

  await expect(finalValue).toHaveText('R$ 103,455')
  await expect(deliveryValue).toHaveText('R$ 0,00')
  await expect(discountValue).toHaveText('- 5%')
})

test('VF10 - Valor máximo para 5% de desconto.', async ({ page }) => {
  await page.goto('http://localhost:5173')

  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()

  const finalValue = page.locator('#totalCart')
  const deliveryValue = page.locator('#deliveryValue')
  const discountValue = page.locator('#discountValue')

  await expect(finalValue).toHaveText('R$ 141,075')
  await expect(deliveryValue).toHaveText('R$ 0,00')
  await expect(discountValue).toHaveText('- 5%')
})

test('VF11 - Aplicação de 10% de desconto (segundo nível).', async ({
  page,
}) => {
  await page.goto('http://localhost:5173')

  await page.goto('http://localhost:5173/')
  await page.locator('button:nth-child(3)').first().click()
  await page.locator('.sc-jSMfEi').first().click()
  await page.locator('.sc-crXcEl > button').first().click()
  await page.getByRole('button', { name: '1' }).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()
  await page.locator('form').getByRole('button').nth(1).click()

  const finalValue = page.locator('#totalCart')
  const deliveryValue = page.locator('#deliveryValue')
  const discountValue = page.locator('#discountValue')

  await expect(finalValue).toHaveText('R$ 142,56')
  await expect(deliveryValue).toHaveText('R$ 0,00')
  await expect(discountValue).toHaveText('- 10%')
})
