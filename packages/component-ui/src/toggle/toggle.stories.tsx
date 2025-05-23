import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Toggle } from '.';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Component: Story = {
  args: {
    id: 'switch-01',
    size: 'medium',
    label: 'label',
    isChecked: false,
    isDisabled: false,
  },
  parameters: {
    chromatic: { disable: true },
  },
};

const ToggleStoryBasic = () => {
  const [isOn1, setIsOn1] = useState(false);
  const [isOn2, setIsOn2] = useState(false);

  return (
    <div style={{ margin: '30px', display: 'grid', rowGap: '30px' }}>
      <div style={{ display: 'flex', columnGap: '30px' }}>
        <Toggle
          id="switch-01"
          size="small"
          label="ラベル1"
          isChecked={isOn1}
          onChange={() => setIsOn1((prev) => !prev)}
        />
        <Toggle
          id="switch-01"
          size="small"
          label="ラベル1"
          isChecked={isOn1}
          onChange={() => setIsOn1((prev) => !prev)}
          isDisabled
        />
      </div>
      <div style={{ display: 'flex', columnGap: '30px' }}>
        <Toggle
          id="switch-02"
          size="medium"
          label="ラベル2"
          isChecked={isOn2}
          onChange={() => setIsOn2((prev) => !prev)}
        />
        <Toggle
          id="switch-02"
          size="medium"
          label="ラベル2"
          isChecked={isOn2}
          onChange={() => setIsOn2((prev) => !prev)}
          isDisabled
        />
      </div>
      <div style={{ display: 'flex', columnGap: '30px' }}>
        <Toggle
          id="switch-01"
          size="small"
          label="ラベル1"
          labelPosition="left"
          isChecked={isOn1}
          onChange={() => setIsOn1((prev) => !prev)}
        />
        <Toggle
          id="switch-01"
          size="small"
          label="ラベル1"
          labelPosition="left"
          isChecked={isOn1}
          onChange={() => setIsOn1((prev) => !prev)}
          isDisabled
        />
      </div>
      <div style={{ display: 'flex', columnGap: '30px' }}>
        <Toggle
          id="switch-02"
          size="medium"
          label="ラベル2"
          labelPosition="left"
          isChecked={isOn2}
          onChange={() => setIsOn2((prev) => !prev)}
        />
        <Toggle
          id="switch-02"
          size="medium"
          label="ラベル2"
          labelPosition="left"
          isChecked={isOn2}
          onChange={() => setIsOn2((prev) => !prev)}
          isDisabled
        />
      </div>
      <hr />
      <div style={{ display: 'flex', columnGap: '30px' }}>
        <Toggle
          id="switch-02"
          size="large"
          label="ラベル2"
          isChecked={isOn2}
          onChange={() => setIsOn2((prev) => !prev)}
        />
        <Toggle
          id="switch-02"
          size="large"
          label="ラベル2"
          isChecked={isOn2}
          onChange={() => setIsOn2((prev) => !prev)}
          isDisabled
        />
      </div>
      <div style={{ display: 'flex', columnGap: '30px' }}>
        <Toggle
          id="switch-02"
          size="large"
          label="ラベル2"
          labelPosition="left"
          isChecked={isOn2}
          onChange={() => setIsOn2((prev) => !prev)}
        />
        <Toggle
          id="switch-02"
          size="large"
          label="ラベル2"
          labelPosition="left"
          isChecked={isOn2}
          onChange={() => setIsOn2((prev) => !prev)}
          isDisabled
        />
      </div>
    </div>
  );
};

export const Base: Story = {
  render: () => <ToggleStoryBasic />,
};
