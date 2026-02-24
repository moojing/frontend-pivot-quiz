import type { DifficultyLevel } from '../types/pivot';

interface Props {
  difficulty: DifficultyLevel;
  isSelected: boolean;
  onSelect: () => void;
}

export default function ProblemCard({ difficulty, isSelected, onSelect }: Props) {
  const colors = {
    basic: 'border-green-500 bg-green-50',
    advanced: 'border-orange-500 bg-orange-50',
    trap: 'border-red-500 bg-red-50'
  };

  const textColors = {
    basic: 'text-green-900',
    advanced: 'text-orange-900',
    trap: 'text-red-900'
  };

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-6 rounded-lg border-2 transition-all ${
        isSelected
          ? `${colors[difficulty.id]} border-opacity-100 shadow-lg`
          : 'border-gray-200 hover:border-gray-300 bg-white'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className={`text-xl font-semibold ${isSelected ? textColors[difficulty.id] : 'text-gray-900'}`}>
          {difficulty.title}
        </h3>
        <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
          ⏱️ {difficulty.timeLimit}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4">
        {difficulty.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {difficulty.concepts.map(concept => (
          <span
            key={concept}
            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
          >
            {concept}
          </span>
        ))}
      </div>
    </button>
  );
}
