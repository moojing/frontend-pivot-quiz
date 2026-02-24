import { useState } from 'react';
import ProblemCard from './components/ProblemCard';
import ProblemDescription from './components/ProblemDescription';
import CodeEditor from './components/CodeEditor';
import TestResults from './components/TestResults';
import { difficulties, basicTestCases, advancedTestCases, trapTestCase } from './data/problems';
import { runBasicTests, runAdvancedTests, runTrapTest, type TestResult } from './utils/testRunner';
import './App.css';

function App() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'basic' | 'advanced' | 'trap'>('basic');
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
        if (selectedDifficulty === 'basic') {
          results = runBasicTests(code, basicTestCases);
        } else if (selectedDifficulty === 'advanced') {
          results = runAdvancedTests(code, advancedTestCases);
        } else {
          results = [runTrapTest(code, trapTestCase.input)];
        }
      } catch (error) {
        results = [{
          name: '執行錯誤',
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

  const currentTestCases = selectedDifficulty === 'basic' ? basicTestCases :
                          selectedDifficulty === 'advanced' ? advancedTestCases :
                          [trapTestCase];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">LeetCode 風格：Pivot + Merge</h1>
          <p className="mt-2 text-gray-600">
            抽象化的演算法面試題：將 group-based 資料轉換成 id-based
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">選擇難度</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {difficulties.map(difficulty => (
              <ProblemCard
                key={difficulty.id}
                difficulty={difficulty}
                isSelected={selectedDifficulty === difficulty.id}
                onSelect={() => {
                  setSelectedDifficulty(difficulty.id);
                  setTestResults([]);
                  setTotalTime(undefined);
                }}
              />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <ProblemDescription
              difficulty={selectedDifficulty}
              testCases={currentTestCases}
            />
          </section>

          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col">
            <CodeEditor
              difficulty={selectedDifficulty}
              onRun={handleRun}
              isRunning={isRunning}
            />
          </section>
        </div>

        <section className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">測試結果</h2>
          <TestResults results={testResults} totalTime={totalTime} />
        </section>

        <section className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 面試追問建議</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>1️⃣ 時間複雜度分析：</strong>你的解法是 O(N) 還是 O(N²)？為什麼？</p>
            <p><strong>2️⃣ 空間複雜度：</strong>使用了多少額外空間？</p>
            <p><strong>3️⃣ 泛型化：</strong>如果要支援任意欄位的 pivot，怎麼改？</p>
            <p><strong>4️⃣ 排序保證：</strong>如果要保持 group 的原始順序，怎麼做？</p>
            <p><strong>5️⃣ 抽象能力：</strong>能否抽象成 reusable utility？</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
