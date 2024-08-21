import { test , expect} from 'playwright/test'
const Url = "https://chatter-six-kappa.vercel.app/personalization"
test('Personalizaton', async ({page})=>{
  await page.goto(Url);
  await expect(page).toHaveTitle(/Choose Your Fun On Chatter/);
})
test('Confirm Categories', async ({page})=>{
  await page.goto(Url);
  const cat = page.locator('.cat');
  const CodingCategory = page.getByRole('button',{name:/coding/i})
  await CodingCategory.click();
  await expect(cat).toHaveText("Choosen Categories: Coding")
})
