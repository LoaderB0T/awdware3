import { Page } from "@playwright/test";

export class NavHelper {
  constructor(private page: Page, private baseUrl: string) {}

  public async clickMenuItem(id: string) {
    const menuItem = await this.getMenuItem(id);
    await menuItem.click();
  }

  public async getMenuItem(id: string) {
    return this.page.locator(`awd-menu #menu-item-${id}`);
  }

  public async expectUrl(path: string) {
    await this.page.waitForURL(this.baseUrl + path);
  }
}
