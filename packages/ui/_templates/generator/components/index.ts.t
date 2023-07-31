---
to: src/<%= component_name %>/index.ts
---
export { <%= h.changeCase.pascal(component_name) %> } from './<%= component_name %>';
