import { useState } from 'react';

import { Tab } from '.';

export default {
  component: Tab,
};

export function Base() {
  const [selectedTab, setSelectedTab] = useState('tab1');

  return (
    <Tab>
      <Tab.Item id="tab1" isSelected={selectedTab === 'tab1'} onClick={setSelectedTab}>
        タブラベル
      </Tab.Item>
      <Tab.Item id="tab2" isSelected={selectedTab === 'tab2'} onClick={setSelectedTab}>
        タブラベル
      </Tab.Item>
      <Tab.Item id="tab3" isDisabled onClick={setSelectedTab}>
        タブラベル
      </Tab.Item>
    </Tab>
  );
}
