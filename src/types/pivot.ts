export interface BasicInput {
  group: string;
  rows: { id: string; value: number }[];
}

export interface BasicOutput {
  id: string;
  metrics: Record<string, number>;
}

export interface AdvancedInput {
  group: string;
  rows: { id: string; data: Record<string, number> }[];
}

export interface AdvancedOutput {
  id: string;
  metrics: Record<string, Record<string, number>>;
}

export type BasicSolution = (input: BasicInput[]) => BasicOutput[];
export type AdvancedSolution = (input: AdvancedInput[]) => AdvancedOutput[];

export interface TestCase<I, O> {
  name: string;
  input: I;
  expected: O;
  description: string;
}

export interface DifficultyLevel {
  id: 'basic' | 'advanced' | 'trap';
  title: string;
  description: string;
  timeLimit: string;
  concepts: string[];
}
