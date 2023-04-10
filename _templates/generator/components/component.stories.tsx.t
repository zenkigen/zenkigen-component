---
to: src/components/<%= component_name %>/<%= component_name %>.stories.tsx
---
import { <%= h.changeCase.pascal(component_name) %> } from '.';

export default {
  component: <%= h.changeCase.pascal(component_name) %>,
};

export const Base = { args: {} };
