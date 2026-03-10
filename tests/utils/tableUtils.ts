import { expect } from '@playwright/test';

export function assertSortedAsc(values: string[]): void {
  for (let i = 1; i < values.length; i++) {
    const result = values[i].localeCompare(values[i - 1], undefined, {
      sensitivity: 'base',
    });
    expect(result).toBeGreaterThanOrEqual(0);
  }
}

export function assertSortedDesc(values: string[]): void {
  for (let i = 1; i < values.length; i++) {
    const result = values[i].localeCompare(values[i - 1], undefined, {
      sensitivity: 'base',
    });
    expect(result).toBeLessThanOrEqual(0);
  }
}

export function assertNumericSortedAsc(values: string[]): void {
  const numbers = values.map(Number);
  for (let i = 1; i < numbers.length; i++) {
    expect(numbers[i]).toBeGreaterThanOrEqual(numbers[i - 1]);
  }
}

export function assertNumericSortedDesc(values: string[]): void {
  const numbers = values.map(Number);
  for (let i = 1; i < numbers.length; i++) {
    expect(numbers[i]).toBeLessThanOrEqual(numbers[i - 1]);
  }
}
