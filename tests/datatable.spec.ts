import { test, expect } from '@playwright/test';
import pino from 'pino';
import { DataTablePage } from './page-objects/dataTablePage';
import {
  assertNumericSortedAsc,
  assertNumericSortedDesc,
} from './utils/tableUtils';

const step = pino({ name: 'datatable-tests' });

let dataTable: DataTablePage;

test.beforeEach(async ({ page }) => {
  dataTable = new DataTablePage(page);
  await dataTable.navigate();
});

test('Search filters table rows correctly', async () => {
  step.info('Step 1: Search for "Tokyo"');
  await dataTable.search('Tokyo');

  step.info('Step 2: Verify all visible rows contain "Tokyo"');
  await dataTable.assertAllRowsContain('Tokyo');

  step.info('Step 3: Verify info text reflects filtered results');
  const info = await dataTable.getInfoText();
  expect(info).toContain('filtered');

  step.info('Step 4: Clear search and verify table resets');
  await dataTable.clearSearch();
  const rowCount = await dataTable.getVisibleRowCount();
  expect(rowCount).toBe(10);
});

test('Search with no results shows empty state', async () => {
  step.info('Step 1: Search for a non-existent value');
  await dataTable.search('xyznonexistent');

  step.info('Step 2: Verify no matching records message');
  await expect(dataTable.emptyMessage).toContainText(
    'No matching records found',
  );
});

test('Sort by Name column ascending', async () => {
  step.info('Step 1: Name column is already sorted ascending by default');

  step.info('Step 2: Verify Name column sort direction is ascending');
  const direction = await dataTable.getSortDirection('Name');
  expect(direction).toBe('asc');
});

test('Sort by Name column descending', async () => {
  step.info('Step 1: Click Name column to toggle to descending');
  await dataTable.sortByColumn('Name');

  step.info('Step 2: Verify Name column sort direction is descending');
  const direction = await dataTable.getSortDirection('Name');
  expect(direction).toBe('desc');
});

test('Sort by Age column ascending', async () => {
  step.info('Step 1: Click Age column to sort ascending');
  await dataTable.sortByColumn('Age');

  step.info('Step 2: Verify Age column is sorted ascending');
  const values = await dataTable.getColumnValuesByName('Age');
  assertNumericSortedAsc(values);
});

test('Sort by Age column descending', async () => {
  step.info('Step 1: Click Age column twice for descending sort');
  await dataTable.sortByColumn('Age');
  await dataTable.sortByColumn('Age');

  step.info('Step 2: Verify Age column is sorted descending');
  const values = await dataTable.getColumnValuesByName('Age');
  assertNumericSortedDesc(values);
});

test('Filter by search then sort results', async () => {
  step.info('Step 1: Search for "London"');
  await dataTable.search('London');

  step.info('Step 2: Verify filtered rows contain "London"');
  await dataTable.assertAllRowsContain('London');

  step.info('Step 3: Sort filtered results by Name descending');
  await dataTable.sortByColumn('Name');
  const direction = await dataTable.getSortDirection('Name');
  expect(direction).toBe('desc');

  step.info('Step 4: Verify rows still contain "London" after sorting');
  await dataTable.assertAllRowsContain('London');
});

test('Verify table column headers', async () => {
  step.info('Step 1: Verify all expected column headers are present');
  const headers = await dataTable.headerCells.allTextContents();
  expect(headers).toEqual([
    'Name',
    'Position',
    'Office',
    'Age',
    'Start date',
    'Salary',
  ]);
});

test('Verify row data structure', async () => {
  step.info('Step 1: Get first row data');
  const rowData = await dataTable.getRowData(0);

  step.info('Step 2: Verify row has 6 columns');
  expect(rowData).toHaveLength(6);
});
