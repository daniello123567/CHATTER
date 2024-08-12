import {test,expect} from 'playwright/test'
test('Single Article view', async ({page})=>{
  const url = 'https://chatter-six-kappa.vercel.app/article/19f5bceb-491f-41ef-aacb-4bae6ed137c1'
  await page.goto(url);
  await expect(page.getByText(/Coding is Life. Read Javascript. By daniel/)).toBeVisible();
  await expect(page).toHaveTitle(/Coding is Life. Read Javascript/);
})
