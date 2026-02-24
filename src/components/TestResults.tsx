interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
  time?: number;
}

interface Props {
  results: TestResult[];
  totalTime?: number;
}

export default function TestResults({ results, totalTime }: Props) {
  if (results.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <p>點擊「執行測試」來驗證你的解法</p>
        </div>
      </div>
    );
  }

  const passedCount = results.filter(r => r.passed).length;
  const allPassed = passedCount === results.length;

  return (
    <div className="space-y-4">
      <div className={`p-4 rounded-lg ${allPassed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">
            {allPassed ? '✅ 全部通過！' : `❌ ${passedCount}/${results.length} 通過`}
          </span>
          {totalTime !== undefined && (
            <span className="text-sm text-gray-600">
              總執行時間: {totalTime.toFixed(2)}ms
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {results.map((result, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${
              result.passed
                ? 'bg-white border-green-200'
                : 'bg-red-50 border-red-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">
                    {result.passed ? '✅' : '❌'}
                  </span>
                  <span className="font-medium text-gray-900">
                    {result.name}
                  </span>
                </div>
                {result.error && (
                  <pre className="mt-2 p-3 bg-red-100 text-red-800 text-sm rounded overflow-x-auto">
                    {result.error}
                  </pre>
                )}
              </div>
              {result.time !== undefined && (
                <span className="text-xs text-gray-500 ml-4">
                  {result.time.toFixed(2)}ms
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {allPassed && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">🎉 恭喜完成！</h4>
          <p className="text-sm text-blue-800">
            你已經掌握了 pivot + merge 的核心概念。可以嘗試其他難度或優化你的解法。
          </p>
        </div>
      )}
    </div>
  );
}
