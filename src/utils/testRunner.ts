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
      name: 'Compilation Error',
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
        error: passed ? undefined : `Output does not match expected value.\n\nActual:\n${JSON.stringify(result, null, 2)}\n\nExpected:\n${JSON.stringify(testCase.expected, null, 2)}`,
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
      name: 'Compilation Error',
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
        error: passed ? undefined : `Output does not match expected value.\n\nActual:\n${JSON.stringify(result, null, 2)}\n\nExpected:\n${JSON.stringify(testCase.expected, null, 2)}`,
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
      name: 'Compilation Error',
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
      name: 'Large Dataset Performance Test',
      passed,
      error: passed
        ? undefined
        : `Execution time is too high (${duration.toFixed(2)}ms), which may indicate an O(N²) approach.\n\nRecommendation: use Map-based indexing to avoid repeated lookups.`,
      time: duration
    };
  } catch (error) {
    const endTime = performance.now();
    return {
      name: 'Large Dataset Performance Test',
      passed: false,
      error: error instanceof Error ? error.message : String(error),
      time: endTime - startTime
    };
  }
}
