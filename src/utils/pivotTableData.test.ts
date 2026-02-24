import { describe, expect, it } from 'vitest';
import type { PivotInput, PivotOutput } from '../types/pivot';
import { pivotTableData } from './pivotTableData';

const challengeCases: {
  name: string;
  input: PivotInput[];
  expected: PivotOutput[];
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

  it.each(challengeCases)('challenge validation: $name', ({ input, expected }) => {
    expect(pivotTableData(input)).toEqual(expected);
  });
});
