import { useState } from 'react';
import Button from './ui/Button';
import Rating from './ui/Rating';
import { PerformanceReview } from '@/types';

interface FeedbackFormProps {
  employeeId: number;
  onSubmit: (feedback: PerformanceReview) => void;
}

interface FormErrors {
  rating?: string;
  feedback?: string;
}

export default function FeedbackForm({ employeeId, onSubmit }: FeedbackFormProps) {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (rating === 0) {
      newErrors.rating = 'Please provide a rating.';
    }
    if (!feedbackText.trim()) {
      newErrors.feedback = 'Feedback text is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const newFeedback: PerformanceReview = {
      date: new Date().toISOString(),
      rating: rating,
      feedback: feedbackText.trim(),
    };

    onSubmit(newFeedback);

    // Clear form after submission
    setRating(0);
    setFeedbackText('');
    setErrors({}); // Clear errors on successful submission
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
          Rating
        </label>
        <div className="flex items-center">
          <Rating value={rating} onRating={(value) => setRating(value)} max={5} size="md" />
          {errors.rating && (
            <p className="ml-3 text-sm text-red-600">{errors.rating}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="feedbackText" className="block text-sm font-medium text-gray-700">
          Feedback
        </label>
        <textarea
          id="feedbackText"
          rows={4}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-gray-900 ${
            errors.feedback ? 'border-red-300' : ''
          }`}
          value={feedbackText}
          onChange={(e) => {
            setFeedbackText(e.target.value);
            if (errors.feedback) setErrors(prev => ({ ...prev, feedback: '' }));
          }}
        ></textarea>
        {errors.feedback && (
          <p className="mt-1 text-sm text-red-600">{errors.feedback}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant="primary" isLoading={isSubmitting} disabled={isSubmitting}>
          Submit Feedback
        </Button>
      </div>
    </form>
  );
} 