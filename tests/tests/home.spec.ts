import { test } from '@playwright/test';
import { NavHelper, HomeHelper } from '@awdware/test/helper';

let nav: NavHelper;
let home: HomeHelper;

test.beforeEach(async ({ page, baseURL }) => {
  nav = new NavHelper(page, baseURL);
  home = new HomeHelper(page, baseURL);
  await page.goto(baseURL);
});

test.describe('Home Module', () => {
  test('should initially navigate to home', async () => {
    await nav.expectUrl('/home');
  });

  test('can skip and restart typing', async () => {
    await home.skipTyping();
    await home.restartTyping();
    await home.canSkipTyping();
  });

  test('should navigate to about', async () => {
    await nav.clickMenuItem('about');
    await nav.expectUrl('/home/about');
  });
});
