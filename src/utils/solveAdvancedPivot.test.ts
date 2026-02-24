import { describe, expect, it } from 'vitest';
import type { AdvancedInput, AdvancedOutput } from '../types/pivot';
import { pivotTableData } from './solveAdvancedPivot';

const advancedTestCases: {
  name: string;
  input: AdvancedInput[];
  expected: AdvancedOutput[];
}[] = [
  {
    name: 'Case 1: Multi-field Metrics',
    input: [
      {
        group: 'A',
        rows: [
          { id: 'x', data: { ggr: 10, wagered: 50 } },
          { id: 'y', data: { ggr: 20, wagered: 100 } }
        ]
      },
      {
        group: 'B',
        rows: [{ id: 'x', data: { ggr: 5, wagered: 25 } }]
      },
      {
        group: 'B',
        rows: [{ id: 'x', data: { ggr: 3, wagered: 15 } }]
      }
    ],
    expected: [
      {
        id: 'x',
        metrics: {
          A: { ggr: 10, wagered: 50 },
          B: { ggr: 8, wagered: 40 }
        }
      },
      {
        id: 'y',
        metrics: {
          A: { ggr: 20, wagered: 100 }
        }
      }
    ]
  }
];

describe('pivotTableData', () => {
  it('should throw Not implemented before completion', () => {
    expect(() =>
      pivotTableData([
        { group: 'A', rows: [{ id: 'x', data: { ggr: 1, wagered: 2 } }] }
      ])
    ).toThrowError('Not implemented');
  });

  it.skip.each(advancedTestCases)('challenge validation: $name', ({ input, expected }) => {
    expect(pivotTableData(input)).toEqual(expected);
  });
});
