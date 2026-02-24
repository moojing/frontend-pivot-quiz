export interface BasicInput {
  group: string;
  rows: { id: string; value: number }[];
}

export interface BasicOutput {
  id: string;
  metrics: Record<string, number>;
}

export interface PivotInput {
  group: string;
  rows: { id: string; data: Record<string, number> }[];
}

export interface PivotOutput {
  id: string;
  metrics: Record<string, Record<string, number>>;
}

export type BasicSolution = (input: BasicInput[]) => BasicOutput[];
export type PivotSolution = (input: PivotInput[]) => PivotOutput[];

export interface TestCase<I, O> {
  name: string;
  input: I;
  expected: O;
  description: string;
}

export interface DifficultyLevel {
  id: 'basic' | 'core' | 'trap';
  title: string;
  description: string;
  timeLimit: string;
  concepts: string[];
}
