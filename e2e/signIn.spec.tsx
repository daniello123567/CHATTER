import {test, expect} from 'playwright/test'
const Url = 'https://chatter-six-kappa.vercel.app/signIn'
test('Sign In title', async ({page})=>{
  await page.goto(`${Url}`);
  await expect(page).toHaveTitle("sign in TO CHATTER")
})
test('Redirect to feeds after sucessful signIn', async ({page})=>{
  await page.goto(Url);
  const continueBtn = page.locator('.cl-formButtonPrimary');
  const inputEmail = page.locator('.cl-input__identifier');
   await inputEmail.fill('test_user102');
  await continueBtn.click();
  await expect(page).toHaveURL("https://chatter-six-kappa.vercel.app/signIn/factor-one")
})
