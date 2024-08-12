import { test, expect } from '@playwright/test';

test('landing page has correct title', async ({page})=>{
  await page.goto('https://chatter-six-kappa.vercel.app');
  await expect(page).toHaveTitle(/Chatter/)
})
test('Expect Who Are You link to take user to sign Up Page', async ({page})=>{
  await page.goto('https://chatter-six-kappa.vercel.app');
  await page.locator('.signUp').click()
  await expect(page).toHaveURL('https://chatter-six-kappa.vercel.app/signUp')
})
test('My Image Designs should be present and not less than 6', async ({page})=>{
  await page.goto('https://chatter-six-kappa.vercel.app');
  const HeroSection = page.locator('#hero')
  await expect(HeroSection).toBeVisible()
  await expect(HeroSection.locator('img')).toHaveCount(6)
})

