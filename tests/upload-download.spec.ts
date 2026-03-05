import path from 'path';
import { test, expect } from '@playwright/test';
import pino from 'pino';

const step = pino({ name: 'upload-download-tests' });

test('Download file from page', async ({ page }) => {
  step.info('Step 1: Navigate to upload-download page');
  await page.goto('https://demoqa.com/upload-download');

  step.info('Step 2: Verify download button is visible');
  const downloadButton = page.locator('#downloadButton');
  await expect(downloadButton).toBeVisible();

  step.info('Step 3: Verify download button has correct file name');
  await expect(downloadButton).toHaveAttribute('download', 'sampleFile.jpeg');

  step.info('Step 4: Verify download button has base64 jpeg href');
  await expect(downloadButton).toHaveAttribute(
    'href',
    /^data:image\/jpeg;base64,/,
  );
});

test('Upload file and verify', async ({ page }) => {
  step.info('Step 1: Navigate to upload-download page');
  await page.goto('https://demoqa.com/upload-download');

  step.info('Step 2: Upload simplefile.txt');
  const filePath = path.join(
    process.cwd(),
    'tests/test-data',
    'simplefile.txt',
  );
  await page.locator('#uploadFile').setInputFiles(filePath);

  step.info('Step 3: Verify uploaded file path is visible');
  const uploadedPath = page.locator('#uploadedFilePath');
  await expect(uploadedPath).toBeVisible();

  step.info('Step 4: Verify uploaded file name is correct');
  await expect(uploadedPath).toContainText('simplefile.txt');

  step.info('Step 5: Clear uploaded file');
  await page.locator('#uploadFile').setInputFiles([]);
});
