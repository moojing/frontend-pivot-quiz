import { useState } from 'react';
import ProblemDescription from './components/ProblemDescription';
import CodeEditor from './components/CodeEditor';
import TestResults from './components/TestResults';
import { challengeTestCases } from './data/problems';
import { runCaseTests, type TestResult } from './utils/testRunner';
import './App.css';

function App() {
  const difficulty = 'core' as const;
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [totalTime, setTotalTime] = useState<number>();

  const handleRun = (code: string) => {
    setIsRunning(true);
    setTestResults([]);
    setTotalTime(undefined);

    setTimeout(() => {
      const startTime = performance.now();
      let results: TestResult[] = [];

      try {
        results = runCaseTests(code, challengeTestCases);
      } catch (error) {
        results = [{
          name: 'Execution Error',
          passed: false,
          error: error instanceof Error ? error.message : String(error)
        }];
      }

      const endTime = performance.now();
      setTotalTime(endTime - startTime);
      setTestResults(results);
      setIsRunning(false);
    }, 100);
  };

  const currentTestCases = challengeTestCases;

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <h1 className="app-title">Pivot + Merge Practice</h1>
          <p className="app-subtitle">
            A data transformation exercise that converts group-based input into id-based records.
          </p>
        </div>
      </header>

      <main className="app-main">
        <section className="panel intro-panel">
          <h2>Practice Task</h2>
          <p>Focus on building a clear and reliable generic pivot transformation.</p>
        </section>

        <div className="panel-grid">
          <section className="panel">
            <ProblemDescription
              difficulty={difficulty}
              testCases={currentTestCases}
            />
          </section>

          <section className="panel panel-editor">
            <CodeEditor
              difficulty={difficulty}
              onRun={handleRun}
              isRunning={isRunning}
            />
          </section>
        </div>

        <section className="panel results-panel">
          <h2>Test Results</h2>
          <TestResults results={testResults} totalTime={totalTime} />
        </section>

        <section className="panel followup-panel">
          <h3>Discussion Prompts</h3>
          <div>
            <p><strong>1. Time Complexity:</strong> Is your solution O(N) or O(N²), and why?</p>
            <p><strong>2. Space Complexity:</strong> How much additional memory does your approach require?</p>
            <p><strong>3. Generic Design:</strong> How would you support an arbitrary set of pivot fields?</p>
            <p><strong>4. Ordering Guarantees:</strong> How would you preserve the original group order?</p>
            <p><strong>5. Abstraction:</strong> Can this be extracted into a reusable utility?</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
