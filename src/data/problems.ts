import type { TestCase, BasicInput, BasicOutput, AdvancedInput, AdvancedOutput, DifficultyLevel } from '../types/pivot';

export const difficulties: DifficultyLevel[] = [
  {
    id: 'basic',
    title: '基礎版：Pivot with Merge',
    description: '將 group-based 資料轉換成 id-based，並合併重複的 group',
    timeLimit: '15 分鐘',
    concepts: ['Hash Map', 'Single Pass O(N)', 'Aggregation']
  },
  {
    id: 'advanced',
    title: '進階版：Generic Pivot',
    description: '處理多維度資料，支援任意欄位的 pivot',
    timeLimit: '20 分鐘',
    concepts: ['Generic Types', 'Nested Objects', 'Deep Merge']
  },
  {
    id: 'trap',
    title: '陷阱版：Large Dataset',
    description: '10 萬筆資料，測試是否會寫出 O(N²) 解法',
    timeLimit: '15 分鐘',
    concepts: ['Time Complexity', 'Space Complexity', 'Performance']
  }
];

export const basicTestCases: TestCase<BasicInput[], BasicOutput[]>[] = [
  {
    name: '範例 1：基本 pivot',
    description: '單一 group，多個 id',
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
    name: '範例 2：重複 group 需要 merge',
    description: '相同 group 出現多次，需要加總',
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
    name: '範例 3：完整混合',
    description: '多個 group，多個 id，有重複需要合併',
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

export const advancedTestCases: TestCase<AdvancedInput[], AdvancedOutput[]>[] = [
  {
    name: '進階 1：多欄位資料',
    description: 'value 不是單一數字，而是 { ggr, wagered } 物件',
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
  name: '陷阱：10 萬筆資料',
  description: '測試時間複雜度，O(N²) 會超時',
  input: Array.from({ length: 1000 }, (_, i) => ({
    group: `G${i % 100}`,
    rows: Array.from({ length: 100 }, (_, j) => ({
      id: `id${j}`,
      value: Math.floor(Math.random() * 100)
    }))
  })),
  expected: []
};
