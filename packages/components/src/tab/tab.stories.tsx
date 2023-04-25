import { TabItem } from './tab-item';

import { Tab } from '.';

export default {
  component: Tab,
};

export function Base() {
  return (
    <Tab>
      <TabItem isSelected>タブラベル</TabItem>
      <TabItem>タブラベル</TabItem>
      <TabItem isDisabled>タブラベル</TabItem>
    </Tab>
  );
}
