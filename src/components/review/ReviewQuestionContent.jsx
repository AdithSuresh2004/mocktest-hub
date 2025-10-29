import React from 'react';
import FormattedContent from '@/components/common/FormattedContent';

const ReviewQuestionContent = ({ question }) => {
  return (
    <div className="mb-6">
      <FormattedContent
        text={question.question_text}
        className="text-xl leading-tight font-bold text-gray-900 dark:text-gray-100"
      />
      {(question.image ||
        question.image_url ||
        question.question_image) && (
        <div className="mt-4">
          <img
            src={
              question.image ||
              question.image_url ||
              question.question_image
            }
            alt="Question illustration"
            className="h-auto max-w-full rounded-lg border border-gray-300 dark:border-gray-600"
            draggable={false}
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewQuestionContent;
