interface Props {
  onRun: () => void;
  isRunning: boolean;
}

export default function CodeEditor({ onRun, isRunning }: Props) {
  const handleRun = () => onRun();

  return (
    <div className="flex flex-col h-full justify-center">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Validation</h3>
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isRunning ? 'Running...' : 'Run Tests'}
        </button>
      </div>
      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-sm text-gray-700">
          Implement your logic in <code className="px-2 py-1 bg-gray-100 rounded text-sm">src/utils/pivotTableData.ts</code>, then run tests to verify.
        </p>
      </div>
    </div>
  );
}
