import type { TestCase, BasicInput, BasicOutput, PivotInput, PivotOutput, DifficultyLevel } from '../types/pivot';

export const difficulties: DifficultyLevel[] = [
  {
    id: 'basic',
    title: 'Basic: Pivot with Merge',
    description: 'Transform group-based input into id-based records and merge duplicate groups.',
    timeLimit: '15 minutes',
    concepts: ['Hash Map', 'Single Pass O(N)', 'Aggregation']
  },
  {
    id: 'core',
    title: 'Generic Pivot',
    description: 'Transform multi-field metrics with a reusable pivot approach.',
    timeLimit: '20 minutes',
    concepts: ['Generic Types', 'Nested Objects', 'Deep Merge']
  },
  {
    id: 'trap',
    title: 'Performance: Large Dataset',
    description: 'Stress test with 100,000 records to detect O(N²) implementations.',
    timeLimit: '15 minutes',
    concepts: ['Time Complexity', 'Space Complexity', 'Performance']
  }
];

export const basicTestCases: TestCase<BasicInput[], BasicOutput[]>[] = [
  {
    name: 'Example 1: Basic Pivot',
    description: 'Single group with multiple ids.',
    input: [
      {
        group: "A",
        rows: [
          { id: "x", value: 10 },
          { id: "y", value: 20 }
        ]
      }
    ],
    expected: [
      {
        id: "x",
        metrics: { A: 10 }
      },
      {
        id: "y",
        metrics: { A: 20 }
      }
    ]
  },
  {
    name: 'Example 2: Merge Duplicate Group Entries',
    description: 'The same group appears multiple times and must be aggregated.',
    input: [
      {
        group: "B",
        rows: [{ id: "x", value: 5 }]
      },
      {
        group: "B",
        rows: [{ id: "x", value: 3 }]
      }
    ],
    expected: [
      {
        id: "x",
        metrics: { B: 8 }
      }
    ]
  },
  {
    name: 'Example 3: Mixed Complete Case',
    description: 'Multiple groups and ids with duplicated entries requiring merge.',
    input: [
      {
        group: "A",
        rows: [
          { id: "x", value: 10 },
          { id: "y", value: 20 }
        ]
      },
      {
        group: "B",
        rows: [
          { id: "x", value: 5 },
          { id: "z", value: 8 }
        ]
      },
      {
        group: "B",
        rows: [{ id: "x", value: 3 }]
      }
    ],
    expected: [
      {
        id: "x",
        metrics: { A: 10, B: 8 }
      },
      {
        id: "y",
        metrics: { A: 20 }
      },
      {
        id: "z",
        metrics: { B: 8 }
      }
    ]
  }
];

export const challengeTestCases: TestCase<PivotInput[], PivotOutput[]>[] = [
  {
    name: 'Case 1: Multi-field Metrics',
    description: 'Each row contains a metric object such as { ggr, wagered } instead of a single value.',
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
        group: "B",
        rows: [
          { id: "x", data: { ggr: 3, wagered: 15 } }
        ]
      }
    ],
    expected: [
      {
        id: "x",
        metrics: {
          A: { ggr: 10, wagered: 50 },
          B: { ggr: 8, wagered: 40 }
        }
      },
      {
        id: "y",
        metrics: {
          A: { ggr: 20, wagered: 100 }
        }
      }
    ]
  }
];

export const trapTestCase: TestCase<BasicInput[], BasicOutput[]> = {
  name: 'Performance Trap: 100,000 Records',
  description: 'Validates time complexity; O(N²) implementations should time out.',
  input: Array.from({ length: 1000 }, (_, i) => ({
    group: `G${i % 100}`,
    rows: Array.from({ length: 100 }, (_, j) => ({
      id: `id${j}`,
      value: Math.floor(Math.random() * 100)
    }))
  })),
  expected: []
};
