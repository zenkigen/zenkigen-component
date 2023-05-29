import { action } from '@storybook/addon-actions';

import { Rating } from './rating';

export default {
  component: Rating,
};

export const Base = {
  render: ({ ...args }) => <Rating value={3} size="large" onChangeRating={action('評価変更')} {...args} />,
};
