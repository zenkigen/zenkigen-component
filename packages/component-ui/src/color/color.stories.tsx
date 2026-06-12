import type { Meta, StoryObj } from '@storybook/react-vite';
import { tokens } from '@zenkigen-inc/component-config';
import { IconButton } from '@zenkigen-inc/component-ui';
import { useState } from 'react';

const meta: Meta = {
  title: 'Tokens/Color',
};

const version = 2;

export default meta;
type Story = StoryObj;

// --- カラートークン棚卸し（docs/research/color-token-consolidation.md）の確認用マーキング。棚卸し完了後に削除予定 ---

// TRUE DEAD 16: library・利用側ともに実装で未使用 → 削除候補（赤✕）
const deletionCandidates = new Set([
  'link02',
  'hoverLink01',
  'hoverLink02',
  'activeLink01',
  'disabledLink01',
  'disabledLink02',
  'fieldInput',
  'fieldSearch',
  'interactiveBg01',
  'hover02Background',
  'hoverSelectedUi',
  'selectedUiGray',
  'selectedUiOnColor',
  'backgroundOverlayGray',
  'interactive03',
  'disabled04',
]);

// Tier 2 (24): library 実装でのみ使用 → 集約（統合）候補（橙△）。統合可否はデザイン意図の個別判断
const consolidationCandidates = new Set([
  'uiBorder03',
  'uiBorder04',
  'uiBackgroundWarning',
  'uiBackgroundTooltip',
  'interactive04',
  'focus',
  'hoverUi02',
  'hoverUiBorder',
  'hoverError',
  'hoverGray',
  'hoverInput',
  'hoverUiError',
  'active01',
  'active02',
  'activeLink02',
  'activeInput',
  'activeUiError',
  'disabledOn',
  'disabled02',
  'supportErrorLight',
  'supportSuccessLight',
  'supportWarningLight',
  'supportInfoLight',
  'supportDangerLight',
]);

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

  const isDeletionCandidate = deletionCandidates.has(colorKey);
  const isConsolidationCandidate = consolidationCandidates.has(colorKey);

  return (
    <div className="flex shrink-0 flex-col gap-2">
      <div className="relative w-full" style={{ height: 170 }}>
        <div className="size-full" style={{ backgroundColor: value }} />
        {isDeletionCandidate && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
          >
            <span style={{ color: '#d92b57', fontSize: 120, fontWeight: 'bold', lineHeight: 1 }}>✕</span>
          </div>
        )}
        {isConsolidationCandidate && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
          >
            <span style={{ color: '#d97706', fontSize: 100, fontWeight: 'bold', lineHeight: 1 }}>△</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-0 pr-1 text-left text-xs" style={{ minWidth: 170 }}>
        {isDeletionCandidate && <div style={{ color: '#d92b57', fontWeight: 'bold' }}>✕ 削除候補（未使用）</div>}
        {isConsolidationCandidate && (
          <div style={{ color: '#d97706', fontWeight: 'bold' }}>△ 統合候補（lib のみ使用）</div>
        )}
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

export const PrimitiveColors: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Primitive/Colors</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          <ColorItem colorKey="black" value={tokens.colors.black} />
          <ColorItem colorKey="white" value={tokens.colors.white} />
        </div>
      </div>
    </>
  ),
};

export const PrimitiveColorsBlue: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Primitive/Colors/Blue</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.colors.blue).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const PrimitiveColorsGray: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Primitive/Colors/Gray</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.colors.gray).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const PrimitiveColorsRed: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Primitive/Colors/Red</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.colors.red).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const PrimitiveColorsYellow: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Primitive/Colors/Yellow</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.colors.yellow).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const PrimitiveColorsGreen: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Primitive/Colors/Green</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.colors.green).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const PrimitiveColorsPurple: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Primitive/Colors/Purple</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.colors.purple).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const PrimitiveColorsBlueGreen: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Primitive/Colors/BlueGreen</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.colors.blueGreen).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const SemanticText: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Semantic/Text</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.tokens.text).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const SemanticLink: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Semantic/Link</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.tokens.link).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const SemanticBorder: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Semantic/Border</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.tokens.border).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const SemanticBackground: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Semantic/Background</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.tokens.background).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const SemanticIcon: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Semantic/Icon</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.tokens.icon).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const SemanticInteractive: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Semantic/Interactive</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.tokens.interactive).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const SemanticField: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Semantic/Field</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.tokens.field).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const SemanticFocus: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Semantic/Focus</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.tokens.focus).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const SemanticHover: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Semantic/Hover</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.tokens.hover).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const SemanticActive: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Semantic/Active</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.tokens.active).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const SemanticSelected: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Semantic/Selected</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.tokens.selected).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const SemanticSupport: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Semantic/Support</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.tokens.support).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const SemanticUser: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <div style={{ fontSize: 24 }}>Semantic/User</div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {Object.entries(tokens.user).map(([key, value]) => (
            <ColorItem key={key} colorKey={key} value={value} />
          ))}
        </div>
      </div>
    </>
  ),
};

export const SemanticDisabled: Story = {
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
