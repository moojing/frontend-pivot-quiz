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
        group: 'C',
        rows: [
          { id: 'x', data: { ggr: 2, wagered: 10 } },
          { id: 'z', data: { ggr: 7, wagered: 30 } }
        ]
      }
    ],
    expected: [
      {
        id: 'x',
        metrics: {
          A: { ggr: 10, wagered: 50 },
          B: { ggr: 5, wagered: 25 },
          C: { ggr: 2, wagered: 10 }
        }
      },
      {
        id: 'y',
        metrics: {
          A: { ggr: 20, wagered: 100 }
        }
      },
      {
        id: 'z',
        metrics: {
          C: { ggr: 7, wagered: 30 }
        }
      }
    ]
  }
];

describe('pivotTableData', () => {
  it.each(challengeCases)('challenge validation: $name', ({ input, expected }) => {
    expect(pivotTableData(input)).toEqual(expected);
  });
});
