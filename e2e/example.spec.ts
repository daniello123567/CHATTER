import { test, expect } from '@playwright/test';

test('landing page has correct title', async ({page})=>{
  await page.goto('https://chatter-six-kappa.vercel.app');
  await expect(page).toHaveTitle(/Chatter/)
})
test('Expect Who Are You to link to the sign Up Page', async ({page})=>{
  await page.goto('https://chatter-six-kappa.vercel.app');
  await page.getByRole('link',{name:/Who are you/}).click();
  await expect(page).toHaveURL('https://chatter-six-kappa.vercel.app/signUp')
})
test('My Image Designs should be present', async ({page})=>{
  await page.goto('https://chatter-six-kappa.vercel.app');
  await expect(page.locator('#hero')).toBeVisible()
})
