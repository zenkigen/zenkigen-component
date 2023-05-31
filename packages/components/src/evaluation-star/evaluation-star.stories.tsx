import { action } from '@storybook/addon-actions';

import { EvaluationStar } from './evaluation-star';

export default {
  component: EvaluationStar,
};

export const Base = {
  render: () => (
    <div className="grid gap-y-8">
      <EvaluationStar value={3} size="medium" />
      <EvaluationStar value={3} size="medium" isEditable onChangeRating={action('評価変更')} />
      <EvaluationStar value={3} size="large" />
      <EvaluationStar value={3} size="large" isEditable onChangeRating={action('評価変更')} />
    </div>
  ),
};
