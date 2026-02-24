import { useState } from 'react';

interface Props {
  difficulty: 'basic' | 'advanced' | 'trap';
  onRun: (code: string) => void;
  isRunning: boolean;
}

const templates = {
  basic: `function pivot(input) {
  // Convert group-based data to id-based records.
  // Merge duplicate group + id pairs by summing values.

  const result = new Map();

  // TODO: Implement your logic.

  return Array.from(result.values());
}`,
  advanced: `function pivotData(input) {
  // Handle multi-field metric objects.
  // data is an object, e.g. { ggr, wagered }.

  const result = new Map();

  // TODO: Implement your logic.

  return Array.from(result.values());
}`,
  trap: `function pivotLarge(input) {
  // Large-scale input benchmark.
  // Avoid O(N²) operations such as repeated find/filter calls.
  // Use Map-based indexing for an O(N) single pass.

  const result = new Map();

  // TODO: Implement your logic.

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
        <h3 className="text-lg font-semibold text-gray-900">Your Solution</h3>
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isRunning ? 'Running...' : 'Run Tests'}
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
          <strong>Tip:</strong> Build an id-to-metrics index with Map in a single O(N) pass.
        </p>
      </div>
    </div>
  );
}
