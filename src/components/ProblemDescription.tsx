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
        <h3 className="text-xl font-bold text-gray-900 mb-3">Problem Statement</h3>

        {difficulty === 'basic' && (
          <div className="space-y-3 text-gray-700">
            <p>
              You are given an array grouped by a first-level key: <strong>group</strong>.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Outer <code className="px-2 py-1 bg-gray-100 rounded text-sm">group</code> becomes a column key.</li>
              <li>Inner <code className="px-2 py-1 bg-gray-100 rounded text-sm">id</code> becomes a row key.</li>
              <li>Duplicate <code className="px-2 py-1 bg-gray-100 rounded text-sm">group + id</code> pairs must be <strong>merged (summed)</strong>.</li>
            </ul>
          </div>
        )}

        {difficulty === 'advanced' && (
          <div className="space-y-3 text-gray-700">
            <p>
              The <code className="px-2 py-1 bg-gray-100 rounded text-sm">data</code> field is no longer a single number:
            </p>
            <pre className="p-3 bg-gray-100 rounded text-sm">
              {`{ id: "x", data: { ggr: 10, wagered: 50 } }`}
            </pre>
            <p>
              Design a <strong>generic</strong> pivot solution that supports arbitrary metric keys.
            </p>
          </div>
        )}

        {difficulty === 'trap' && (
          <div className="space-y-3 text-gray-700">
            <p>
              This dataset contains <strong>100,000 records</strong>.
            </p>
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="font-semibold text-red-900 mb-2">Performance Warning</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-red-800">
                <li>Using <code className="px-2 py-1 bg-red-100 rounded">find()</code> or <code className="px-2 py-1 bg-red-100 rounded">filter()</code> repeatedly can degrade to O(N²).</li>
                <li>Use <strong>Map</strong>-based indexing to keep the solution O(N).</li>
                <li>Target runtime: under <strong>100ms</strong>.</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Sample Tests</h3>
        <div className="space-y-4">
          {difficulty === 'trap' ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Large Dataset Test</h4>
              <p className="text-sm text-gray-600">
                1,000 groups x 100 ids = 100,000 records
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
        <h4 className="font-semibold text-blue-900 mb-2">Core Concept</h4>
        <p className="text-sm text-blue-800">
          This exercise is essentially <strong>matrix transpose + aggregation</strong>:
          convert a group-to-id structure into an id-to-group structure.
        </p>
      </div>
    </div>
  );
}
