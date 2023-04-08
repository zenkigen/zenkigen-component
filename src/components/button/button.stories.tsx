import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './button';

export default {
  title: 'Button',
  component: Button,
  argTypes: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>{args.children}</Button>;

export const Base = Template.bind({});

Base.args = {
  children: 'ボタンラベル',
  disabled: false,
  isAnchor: false,
};
