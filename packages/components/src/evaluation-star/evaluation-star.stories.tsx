import { action } from '@storybook/addon-actions';

import { EvaluationStar } from './evaluation-star';

export default {
  component: EvaluationStar,
};

export const Base = {
  render: ({ ...args }) => <EvaluationStar value={3} size="large" onChangeRating={action('評価変更')} {...args} />,
};
