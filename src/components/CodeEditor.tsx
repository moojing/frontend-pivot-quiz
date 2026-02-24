import { useState } from 'react';

interface Props {
  difficulty: 'basic' | 'advanced' | 'trap';
  onRun: (code: string) => void;
  isRunning: boolean;
}

const templates = {
  basic: `function pivot(input) {
  // 你的解法：將 group-based 轉成 id-based
  // 相同 group + id 要合併（加總）

  const result = new Map();

  // TODO: 實作你的邏輯

  return Array.from(result.values());
}`,
  advanced: `function pivotGeneric(input) {
  // 進階：處理多維度資料
  // value 不是單一數字，而是 { ggr, wagered } 等物件

  const result = new Map();

  // TODO: 實作你的邏輯

  return Array.from(result.values());
}`,
  trap: `function pivotLarge(input) {
  // 陷阱：10 萬筆資料
  // ❌ 避免 O(N²)：不要用 find/filter
  // ✅ 使用 Map：O(N) 單次掃描

  const result = new Map();

  // TODO: 實作你的邏輯

  return Array.from(result.values());
}`
};

export default function CodeEditor({ difficulty, onRun, isRunning }: Props) {
  const [code, setCode] = useState(templates[difficulty]);

  const handleRun = () => {
    onRun(code);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">你的解法</h3>
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isRunning ? '執行中...' : '▶️ 執行測試'}
        </button>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="flex-1 w-full p-4 font-mono text-sm bg-gray-900 text-gray-100 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        spellCheck={false}
      />

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          💡 <strong>提示：</strong>使用 Map 來建立 id → metrics 的索引，單次掃描 O(N)
        </p>
      </div>
    </div>
  );
}
