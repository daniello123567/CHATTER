import {test,expect} from 'playwright/test'

test('Sign Up Auth', async ({page})=>{
  page.goto('http://localhost:3000/signUp')
})
