import {test,expect} from 'playwright/test';
const randomUserNamesoTestdoesntCrashWithUserNameALreadyTaken = `Daniel${Date.now()}`;

const Url = 'https://chatter-six-kappa.vercel.app'
test('Sign Up Auth', async ({page})=>{
  await page.goto(`${Url}/signUp`);
  await expect(page).toHaveURL(`${Url}/signUp`);
  await expect(page).toHaveTitle(/sign up to chatter/);
});
test('Take user to Choose Categories they like for personlized content After sign Up',async ({page})=>{
  const getMeThisElement = (element:string)=>{
     return page.locator(element)
  }
  const randomEmailsoTestdoesntCrashWithEmailALreadyTaken = `Daniel${Date.now()}-+clerk_test@example.com`;

  await page.goto(`${Url}/signUp`);
  const firstName = getMeThisElement('.cl-formFieldInput__firstName');
  const LastName = getMeThisElement('.cl-formFieldInput__lastName');
  const userName = getMeThisElement('.cl-input__username');
  const emailAdress = getMeThisElement('.cl-formFieldInput__emailAddress');
  const password = getMeThisElement('.cl-formFieldInput__password ');
  await firstName.fill('Daniel')
  await LastName.fill('Code')
  await userName.fill(randomUserNamesoTestdoesntCrashWithUserNameALreadyTaken)
  await emailAdress.fill(randomEmailsoTestdoesntCrashWithEmailALreadyTaken)
  await password.fill('Testuser101')
  await page.locator('.cl-formButtonPrimary').click();
  await expect(page).toHaveURL(`${Url}/personalization`)
});
export {randomUserNamesoTestdoesntCrashWithUserNameALreadyTaken}
