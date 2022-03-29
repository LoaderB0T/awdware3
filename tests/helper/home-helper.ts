import { expect, Page } from '@playwright/test';

export class HomeHelper {
  constructor(private page: Page, private baseUrl: string) {}

  public async canSkipTyping() {
    await expect(this.page.locator('.action-icon.skip')).toBeVisible();
  }

  public async skipTyping() {
    await this.canSkipTyping();
    await this.page.locator('.action-icon.skip').click();
  }

  public async restartTyping() {
    await this.page.locator('.action-icon.restart').click();
  }
}
