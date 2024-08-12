import { test , expect} from 'playwright/test'
const Url = "https://chatter-six-kappa.vercel.app/personalization"
test('Personalizaton', async ({page})=>{
  await page.goto(Url);
  expect(page).toHaveTitle(/Choose Your Fun On Chatter/);
})
test('Confirm Categories and Redirect', async ({page})=>{
  await page.goto(Url);
  const cat = page.locator('.cat');
  const CodingCategory = page.getByRole('button',{name:/coding/i})
  await CodingCategory.click();
  expect(cat).toHaveText(/coding/)
 expect(page.getByText(/coding/)).toHaveCount(2)
})
