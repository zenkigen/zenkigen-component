import type { Meta, StoryObj } from '@storybook/react-vite';
import { tokens } from '@zenkigen-inc/component-config';
import { IconButton } from '@zenkigen-inc/component-ui';
import { useState } from 'react';

const meta: Meta = {
  title: 'Tokens/Color',
};

const version = 1;

export default meta;
type Story = StoryObj;

function ColorItem({ colorKey, value }: { colorKey: string; value: string }) {
  const [isCopiedName, setCopiedName] = useState(false);
  const [isCopiedValue, setCopiedValue] = useState(false);

  const handleCopyName = async () => {
    try {
      await navigator.clipboard.writeText(colorKey);
      setCopiedName(true);
      setTimeout(() => setCopiedName(false), 2000);
    } catch {
      //
    }
  };

  const handleCopyValue = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(true);
      setTimeout(() => setCopiedValue(false), 2000);
    } catch {
      //
    }
  };

  return (
    <div className="flex shrink-0 flex-col gap-2">
      <div className="w-full" style={{ backgroundColor: value, height: 170 }} />
      <div className="flex flex-col gap-0 pr-1 text-left text-xs" style={{ minWidth: 170 }}>
        <div className="flex items-center">
          <div className="typography-label16bold">{colorKey}</div>
          <IconButton
            onClick={handleCopyName}
            size="small"
            title="カラー名をコピー"
            icon={isCopiedName ? 'check' : 'copy'}
            variant="text"
          />
        </div>
        <div className="flex items-center">
          <div className="typography-label14regular text-gray-500">{value}</div>
          <IconButton
            onClick={handleCopyValue}
            size="small"
            title="カラー値をコピー"
            icon={isCopiedValue ? 'check' : 'copy'}
            variant="text"
          />
        </div>
      </div>
      <div hidden>{version}</div>
    </div>
  );
}

export const UserColors: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>User Colors</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.user).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const TextColors: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Text Colors</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.tokens.text).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const LinkColors: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Link Colors</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.tokens.link).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const BorderColors: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Border Colors</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.tokens.border).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const BackgroundColors: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Background Colors</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.tokens.background).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const IconColors: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Icon Colors</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.tokens.icon).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const InteractiveColors: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Interactive Colors</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.tokens.interactive).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const FieldColors: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Field Colors</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.tokens.field).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const FocusColors: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Focus Colors</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.tokens.focus).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const HoverColors: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Hover Colors</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.tokens.hover).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const ActiveColors: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Active Colors</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.tokens.active).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const SelectedColors: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Selected Colors</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.tokens.selected).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const DisabledColors: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Disabled Colors</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.tokens.disabled).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const SupportColors: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Support Colors</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.tokens.support).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const BlueScale: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Blue Scale</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.colors.blue).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const GrayScale: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Gray Scale</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.colors.gray).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const RedScale: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Red Scale</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.colors.red).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const YellowScale: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Yellow Scale</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.colors.yellow).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const GreenScale: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Green Scale</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.colors.green).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const PurpleScale: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Purple Scale</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.colors.purple).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const BlueGreenScale: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Blue Green Scale</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.colors.blueGreen).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const BasicColors: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Basic Colors</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          <ColorItem colorKey="black" value={tokens.colors.black} />
          <ColorItem colorKey="white" value={tokens.colors.white} />
        </div>
      </div>
    </>
  ),
};
