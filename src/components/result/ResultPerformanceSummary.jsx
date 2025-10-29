import React from 'react';
import ResultCard from '@/components/result/ResultCard';
import ResultStatItem from './ResultStatItem';
import ResultAccuracyBar from './ResultAccuracyBar';
import { FaBullseye, FaCheckCircle, FaTimesCircle, FaQuestionCircle } from 'react-icons/fa';

const ResultPerformanceSummary = ({ analysis }) => {
  return (
    <ResultCard
      title="Performance Summary"
      icon={FaBullseye}
      iconBgColor="bg-green-100 dark:bg-green-900/50"
      iconColor="text-green-600 dark:text-green-400"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ResultStatItem
            icon={FaCheckCircle}
            value={analysis.overall.correct}
            label="Correct Answers"
            color="text-green-500"
            subtext={`${((analysis.overall.correct / analysis.overall.totalQuestions) * 100).toFixed(0)}% of total`}
          />
          <ResultStatItem
            icon={FaTimesCircle}
            value={analysis.overall.incorrect}
            label="Incorrect Answers"
            color="text-red-500"
            subtext={`${((analysis.overall.incorrect / analysis.overall.totalQuestions) * 100).toFixed(0)}% of total`}
          />
          <ResultStatItem
            icon={FaQuestionCircle}
            value={analysis.overall.unanswered}
            label="Unanswered"
            color="text-orange-500"
            subtext={`${((analysis.overall.unanswered / analysis.overall.totalQuestions) * 100).toFixed(0)}% of total`}
          />
        </div>
        <ResultAccuracyBar
          accuracy={analysis.overall.accuracy}
          label="Overall Accuracy"
        />
      </div>
    </ResultCard>
  );
};

export default ResultPerformanceSummary;
