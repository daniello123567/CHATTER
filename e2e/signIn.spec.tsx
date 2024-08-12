import {test, expect} from 'playwright/test'
import { randomUserNamesoTestdoesntCrashWithUserNameALreadyTaken } from './signup.spec';
const Url = 'http://localhost:3000/signIn'
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
  await expect(page).toHaveURL("http://localhost:3000/signIn/factor-one")
})
