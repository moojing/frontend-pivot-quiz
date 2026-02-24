import type { TestCase, BasicInput, BasicOutput, AdvancedInput, AdvancedOutput } from '../types/pivot';

interface Props {
  difficulty: 'basic' | 'advanced' | 'trap';
  testCases: TestCase<unknown, unknown>[];
}

export default function ProblemDescription({ difficulty, testCases }: Props) {
  const renderBasicExample = (testCase: TestCase<BasicInput[], BasicOutput[]>) => (
    <div key={testCase.name} className="bg-gray-50 p-4 rounded-lg">
      <h4 className="font-semibold text-gray-900 mb-2">{testCase.name}</h4>
      <p className="text-sm text-gray-600 mb-3">{testCase.description}</p>

      <div className="space-y-3">
        <div>
          <span className="text-xs font-semibold text-gray-700 uppercase">Input:</span>
          <pre className="mt-1 p-3 bg-white border border-gray-200 rounded text-xs overflow-x-auto">
            {JSON.stringify(testCase.input, null, 2)}
          </pre>
        </div>

        <div>
          <span className="text-xs font-semibold text-gray-700 uppercase">Expected Output:</span>
          <pre className="mt-1 p-3 bg-white border border-gray-200 rounded text-xs overflow-x-auto">
            {JSON.stringify(testCase.expected, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );

  const renderAdvancedExample = (testCase: TestCase<AdvancedInput[], AdvancedOutput[]>) => (
    <div key={testCase.name} className="bg-gray-50 p-4 rounded-lg">
      <h4 className="font-semibold text-gray-900 mb-2">{testCase.name}</h4>
      <p className="text-sm text-gray-600 mb-3">{testCase.description}</p>

      <div className="space-y-3">
        <div>
          <span className="text-xs font-semibold text-gray-700 uppercase">Input:</span>
          <pre className="mt-1 p-3 bg-white border border-gray-200 rounded text-xs overflow-x-auto">
            {JSON.stringify(testCase.input, null, 2)}
          </pre>
        </div>

        <div>
          <span className="text-xs font-semibold text-gray-700 uppercase">Expected Output:</span>
          <pre className="mt-1 p-3 bg-white border border-gray-200 rounded text-xs overflow-x-auto">
            {JSON.stringify(testCase.expected, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">題目描述</h3>

        {difficulty === 'basic' && (
          <div className="space-y-3 text-gray-700">
            <p>
              給你一個陣列，表示資料被<strong>第一層 key（group）</strong>分組：
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>外層 <code className="px-2 py-1 bg-gray-100 rounded text-sm">group</code> → 要變成 column</li>
              <li>內層 <code className="px-2 py-1 bg-gray-100 rounded text-sm">id</code> → 要變成 row</li>
              <li>相同 <code className="px-2 py-1 bg-gray-100 rounded text-sm">group + id</code> 要<strong>合併（加總）</strong></li>
            </ul>
          </div>
        )}

        {difficulty === 'advanced' && (
          <div className="space-y-3 text-gray-700">
            <p>
              現在 <code className="px-2 py-1 bg-gray-100 rounded text-sm">value</code> 不是單一數字，而是：
            </p>
            <pre className="p-3 bg-gray-100 rounded text-sm">
              {`{ id: "x", data: { ggr: 10, wagered: 50 } }`}
            </pre>
            <p>
              你需要<strong>泛型化</strong>你的解法，支援任意欄位的 pivot。
            </p>
          </div>
        )}

        {difficulty === 'trap' && (
          <div className="space-y-3 text-gray-700">
            <p>
              這次資料量是 <strong>10 萬筆</strong>。
            </p>
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="font-semibold text-red-900 mb-2">⚠️ 陷阱警告</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-red-800">
                <li>如果使用 <code className="px-2 py-1 bg-red-100 rounded">find()</code> 或 <code className="px-2 py-1 bg-red-100 rounded">filter()</code>，會是 O(N²)</li>
                <li>必須使用 <strong>Map</strong> 建立索引，才能做到 O(N)</li>
                <li>目標：在 <strong>100ms</strong> 內完成</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">範例測試</h3>
        <div className="space-y-4">
          {difficulty === 'trap' ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">大數據測試</h4>
              <p className="text-sm text-gray-600">
                1,000 個 group × 100 個 id = 10 萬筆資料
              </p>
            </div>
          ) : difficulty === 'advanced' ? (
            testCases.map(tc => renderAdvancedExample(tc as TestCase<AdvancedInput[], AdvancedOutput[]>))
          ) : (
            testCases.map(tc => renderBasicExample(tc as TestCase<BasicInput[], BasicOutput[]>))
          )}
        </div>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">🎯 核心概念</h4>
        <p className="text-sm text-blue-800">
          這題本質是 <strong>Matrix Transpose + Aggregation</strong>：
          將 group → id 的結構，轉換成 id → group 的結構。
        </p>
      </div>
    </div>
  );
}
