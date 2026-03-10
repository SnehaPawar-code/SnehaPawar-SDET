import { Page, Locator, expect } from '@playwright/test';

export class DataTablePage {
  readonly page: Page;
  readonly table: Locator;
  readonly searchInput: Locator;
  readonly headerCells: Locator;
  readonly bodyRows: Locator;
  readonly infoText: Locator;
  readonly emptyMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.table = page.locator('#example');
    this.searchInput = page.locator('input[type="search"]');
    this.headerCells = this.table.locator('thead th');
    this.bodyRows = this.table.locator('tbody tr');
    this.infoText = page.locator('#example_info');
    this.emptyMessage = this.table.locator('tbody');
  }

  async navigate(): Promise<void> {
    await this.page.goto(
      'https://datatables.net/examples/basic_init/alt_pagination.html',
    );
    // Dismiss cookie consent if present
    const cookieBtn = this.page.locator('button', {
      hasText: /accept|got it|agree|allow/i,
    });
    if (await cookieBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await cookieBtn.click();
    }
    await this.table.scrollIntoViewIfNeeded();
  }

  async search(text: string): Promise<void> {
    await this.searchInput.scrollIntoViewIfNeeded();
    await this.searchInput.fill(text);
  }

  async clearSearch(): Promise<void> {
    await this.searchInput.fill('');
  }

  async sortByColumn(columnName: string): Promise<void> {
    const header = this.headerCells.filter({ hasText: columnName });
    const currentSort = await header.getAttribute('aria-sort');
    await header.click({ force: true });
    // Wait for sort direction to actually change
    await expect(header).not.toHaveAttribute('aria-sort', currentSort ?? '');
  }

  async getSortDirection(columnName: string): Promise<'asc' | 'desc' | null> {
    const header = this.headerCells.filter({ hasText: columnName });
    const ariaSort = await header.getAttribute('aria-sort');
    if (ariaSort === 'ascending') return 'asc';
    if (ariaSort === 'descending') return 'desc';
    const className = (await header.getAttribute('class')) ?? '';
    if (className.includes('asc')) return 'asc';
    if (className.includes('desc')) return 'desc';
    return null;
  }

  async getColumnValues(columnIndex: number): Promise<string[]> {
    const cells = this.bodyRows.locator(`td:nth-child(${columnIndex + 1})`);
    return cells.allTextContents();
  }

  async getColumnValuesByName(columnName: string): Promise<string[]> {
    const headers = await this.headerCells.allTextContents();
    const index = headers.findIndex(
      (h) => h.trim().toLowerCase() === columnName.trim().toLowerCase(),
    );
    if (index === -1) throw new Error(`Column "${columnName}" not found`);
    return this.getColumnValues(index);
  }

  async getVisibleRowCount(): Promise<number> {
    return this.bodyRows.count();
  }

  async getRowData(rowIndex: number): Promise<string[]> {
    const cells = this.bodyRows.nth(rowIndex).locator('td');
    return cells.allTextContents();
  }

  async getInfoText(): Promise<string> {
    return this.infoText.innerText();
  }

  async assertAllRowsContain(text: string): Promise<void> {
    const rowCount = await this.getVisibleRowCount();
    for (let i = 0; i < rowCount; i++) {
      await expect(this.bodyRows.nth(i)).toContainText(text, {
        ignoreCase: true,
      });
    }
  }
}
