---
to: src/components/<%= component_name %>/<%= component_name %>.stories.tsx
---
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { <%= h.changeCase.pascal(component_name) %> } from './<%= h.changeCase.pascal(component_name) %>';

export default {
  title: '<%= h.changeCase.pascal(component_name) %>',
  component: <%= h.changeCase.pascal(component_name) %>,
  argTypes: {},
} as ComponentMeta<typeof <%= h.changeCase.pascal(component_name) %>>;

const Template: ComponentStory<typeof <%= h.changeCase.pascal(component_name) %>> = (args) => <<%= h.changeCase.pascal(component_name) %> {...args} />;

export const Base = Template.bind({});

Base.args = {};
