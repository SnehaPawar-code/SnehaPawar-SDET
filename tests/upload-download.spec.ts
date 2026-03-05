import path from 'path';
import { test, expect } from '@playwright/test';

test('Download file from page', async ({ page }) => {
  await page.goto('https://demoqa.com/upload-download');

  const downloadButton = page.locator('#downloadButton');
  await expect(downloadButton).toBeVisible();
  await expect(downloadButton).toHaveAttribute('download', 'sampleFile.jpeg');
  await expect(downloadButton).toHaveAttribute(
    'href',
    /^data:image\/jpeg;base64,/,
  );
});

test('Upload file and verify', async ({ page }) => {
  await page.goto('https://demoqa.com/upload-download');

  const filePath = path.join(
    process.cwd(),
    'tests/test-data',
    'simplefile.txt',
  );

  await page.locator('#uploadFile').setInputFiles(filePath);

  const uploadedPath = page.locator('#uploadedFilePath');
  await expect(uploadedPath).toBeVisible();
  await expect(uploadedPath).toContainText('simplefile.txt');

  await page.locator('#uploadFile').setInputFiles([]);
});
