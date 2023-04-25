import { useState } from 'react';

import { TabItem } from './tab-item';

import { Tab } from '.';

export default {
  component: Tab,
};

export function Base() {
  const [selectedTab, setSelectedTab] = useState('tab1');

  return (
    <Tab>
      <TabItem id="tab1" isSelected={selectedTab === 'tab1'} onClick={setSelectedTab}>
        タブラベル
      </TabItem>
      <TabItem id="tab2" isSelected={selectedTab === 'tab2'} onClick={setSelectedTab}>
        タブラベル
      </TabItem>
      <TabItem id="tab3" isDisabled onClick={setSelectedTab}>
        タブラベル
      </TabItem>
    </Tab>
  );
}
