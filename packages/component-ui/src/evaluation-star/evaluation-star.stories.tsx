import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { EvaluationStar } from './evaluation-star';

const meta: Meta<typeof EvaluationStar> = {
  component: EvaluationStar,
};
export default meta;
type Story = StoryObj<typeof EvaluationStar>;

export const Component: Story = {
  args: {
    size: 'medium',
    value: 3,
    isEditable: true,
  },
  render: (args) => (
    <div className="grid gap-y-8">
      <EvaluationStar {...args} />
    </div>
  ),
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
