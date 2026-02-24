import type { BasicInput, BasicOutput, AdvancedInput, AdvancedOutput } from '../types/pivot';

export interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
  time?: number;
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;

  const aKeys = Object.keys(a as object).sort();
  const bKeys = Object.keys(b as object).sort();

  if (aKeys.length !== bKeys.length) return false;
  if (aKeys.some((key, i) => key !== bKeys[i])) return false;

  return aKeys.every(key =>
    deepEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])
  );
}

function compareArrays<T>(actual: T[], expected: T[]): boolean {
  if (actual.length !== expected.length) return false;

  const sortedActual = [...actual].sort((a, b) => {
    const aId = (a as { id: string }).id;
    const bId = (b as { id: string }).id;
    return aId.localeCompare(bId);
  });

  const sortedExpected = [...expected].sort((a, b) => {
    const aId = (a as { id: string }).id;
    const bId = (b as { id: string }).id;
    return aId.localeCompare(bId);
  });

  return sortedActual.every((item, i) => deepEqual(item, sortedExpected[i]));
}

export function runBasicTests(
  userFunction: string,
  testCases: { name: string; input: BasicInput[]; expected: BasicOutput[]; description: string }[]
): TestResult[] {
  const results: TestResult[] = [];

  let fn: (input: BasicInput[]) => BasicOutput[];
  try {
    fn = new Function('return ' + userFunction)();
  } catch (error) {
    return [{
      name: '編譯錯誤',
      passed: false,
      error: error instanceof Error ? error.message : String(error)
    }];
  }

  for (const testCase of testCases) {
    const startTime = performance.now();
    try {
      const result = fn(testCase.input);
      const endTime = performance.now();

      const passed = compareArrays(result, testCase.expected);

      results.push({
        name: testCase.name,
        passed,
        error: passed ? undefined : `輸出不符合預期\n\n實際輸出: ${JSON.stringify(result, null, 2)}\n\n預期輸出: ${JSON.stringify(testCase.expected, null, 2)}`,
        time: endTime - startTime
      });
    } catch (error) {
      const endTime = performance.now();
      results.push({
        name: testCase.name,
        passed: false,
        error: error instanceof Error ? error.message : String(error),
        time: endTime - startTime
      });
    }
  }

  return results;
}

export function runAdvancedTests(
  userFunction: string,
  testCases: { name: string; input: AdvancedInput[]; expected: AdvancedOutput[]; description: string }[]
): TestResult[] {
  const results: TestResult[] = [];

  let fn: (input: AdvancedInput[]) => AdvancedOutput[];
  try {
    fn = new Function('return ' + userFunction)();
  } catch (error) {
    return [{
      name: '編譯錯誤',
      passed: false,
      error: error instanceof Error ? error.message : String(error)
    }];
  }

  for (const testCase of testCases) {
    const startTime = performance.now();
    try {
      const result = fn(testCase.input);
      const endTime = performance.now();

      const passed = compareArrays(result, testCase.expected);

      results.push({
        name: testCase.name,
        passed,
        error: passed ? undefined : `輸出不符合預期\n\n實際輸出: ${JSON.stringify(result, null, 2)}\n\n預期輸出: ${JSON.stringify(testCase.expected, null, 2)}`,
        time: endTime - startTime
      });
    } catch (error) {
      const endTime = performance.now();
      results.push({
        name: testCase.name,
        passed: false,
        error: error instanceof Error ? error.message : String(error),
        time: endTime - startTime
      });
    }
  }

  return results;
}

export function runTrapTest(
  userFunction: string,
  input: BasicInput[]
): TestResult {
  let fn: (input: BasicInput[]) => BasicOutput[];
  try {
    fn = new Function('return ' + userFunction)();
  } catch (error) {
    return {
      name: '編譯錯誤',
      passed: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }

  const startTime = performance.now();
  try {
    fn(input);
    const endTime = performance.now();
    const duration = endTime - startTime;

    const passed = duration < 100;

    return {
      name: '10 萬筆資料效能測試',
      passed,
      error: passed
        ? undefined
        : `執行時間過長（${duration.toFixed(2)}ms），可能是 O(N²) 解法。\n\n建議：使用 Map 來避免重複查找。`,
      time: duration
    };
  } catch (error) {
    const endTime = performance.now();
    return {
      name: '10 萬筆資料效能測試',
      passed: false,
      error: error instanceof Error ? error.message : String(error),
      time: endTime - startTime
    };
  }
}
