import type { TestCase, PivotInput, PivotOutput } from '../types/pivot';

export const challengeTestCases: TestCase<PivotInput[], PivotOutput[]>[] = [
  {
    name: 'Case 1: Multi-field Metrics',
    description: 'Each row contains a metric object such as { ggr, wagered }, and each group appears once across at least three groups.',
    input: [
      {
        group: "A",
        rows: [
          { id: "x", data: { ggr: 10, wagered: 50 } },
          { id: "y", data: { ggr: 20, wagered: 100 } }
        ]
      },
      {
        group: "B",
        rows: [
          { id: "x", data: { ggr: 5, wagered: 25 } }
        ]
      },
      {
        group: "C",
        rows: [
          { id: "x", data: { ggr: 2, wagered: 10 } },
          { id: "z", data: { ggr: 7, wagered: 30 } }
        ]
      }
    ],
    expected: [
      {
        id: "x",
        metrics: {
          A: { ggr: 10, wagered: 50 },
          B: { ggr: 5, wagered: 25 },
          C: { ggr: 2, wagered: 10 }
        }
      },
      {
        id: "y",
        metrics: {
          A: { ggr: 20, wagered: 100 }
        }
      },
      {
        id: "z",
        metrics: {
          C: { ggr: 7, wagered: 30 }
        }
      }
    ]
  }
];
