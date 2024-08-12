import { test , expect} from 'playwright/test'
const Url = "https://chatter-six-kappa.vercel.app/personalization"
test('Personalizaton', async ({page})=>{
  await page.goto(Url);
  expect(page).toHaveTitle(/Choose Your Fun On Chatter/);
})
test('Confirm Categories and Redirect', async ({page})=>{
  await page.goto(Url);
  const DoneBtn = page.locator('.doneBtn');
  const CodingCategory = page.getByRole('button',{name:/coding/i})
  await CodingCategory.click();
  await DoneBtn.click()
  expect(page).toHaveURL('http://localhost:3000/feed')
})
