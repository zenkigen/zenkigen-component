import { Rating } from './rating';

export default {
  component: Rating,
};

export const Base = {
  render: ({ ...args }) => <Rating value={3} size="regular" />,
};
