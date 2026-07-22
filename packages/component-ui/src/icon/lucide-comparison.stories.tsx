/*
 * 【一時的な比較資料 / マージ対象外】
 * lucide 置き換え検討のための Storybook 比較ストーリー。
 * デザイナーが Chromatic 上で「現行 zenkigen アイコン（fill 系）」と
 * 「lucide 置換候補（stroke 系）」を突き合わせてレビューするためのもの。
 *
 * 元の HTML 比較シートと同じく、1 ストーリー内のフィルタボタンで
 * すべて / 置換 / 要相談 / 独自維持 を切り替える。
 *
 * データは docs/wip/feature/gen-storybook-comparison-data.cjs で自動生成した
 * lucide-comparison-data.ts（lucide SVG の生マークアップを同梱・外部依存ゼロ）を読み込む。
 * lucide の線の太さ（stroke-width）はストーリー内のコントロールで動的に差し替えて確認できる。
 * 判定・候補の single source は docs/wip/feature/lucide-icon-mapping.data.cjs。
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { IconName } from '@zenkigen-inc/component-icons';
import { useState } from 'react';

import { Toggle } from '../toggle';
import { Tooltip } from '../tooltip';
import { Icon } from '.';
import type { IconComparisonEntry, IconComparisonStatus } from './lucide-comparison-data';
import { iconComparisonEntries, lucideSvgMarkup, lucideVersion } from './lucide-comparison-data';

// アイコンの占有領域を可視化する着色クラス（トグルで ON/OFF）
const BOUNDS_CLASS = 'bg-blue-blue10 outline outline-1 outline-blue-blue50';

const STATUS_META: Record<IconComparisonStatus, { label: string; badgeClass: string }> = {
  replace: { label: '置換', badgeClass: 'bg-green-green10 text-green-green100' },
  ask: { label: '要相談', badgeClass: 'bg-red-red10 text-red-red100' },
  keep: { label: '独自維持', badgeClass: 'bg-yellow-yellow10 text-yellow-yellow100' },
};

const ICON_SIZES = ['x-small', 'small', 'medium', 'large', 'x-large'] as const;
type IconSize = (typeof ICON_SIZES)[number];

const LUCIDE_PX: Record<IconSize, number> = {
  'x-small': 12,
  small: 16,
  medium: 24,
  large: 32,
  'x-large': 40,
};

const MAX_CANDIDATES = Math.max(...iconComparisonEntries.map((entry) => entry.candidates.length));

// lucide の線の太さ（stroke-width）。lucide 既定は 2。サイズごとに個別指定できる。
const DEFAULT_STROKE_WIDTH = 2;
type StrokeWidths = Record<IconSize, number>;
const INITIAL_STROKE_WIDTHS: StrokeWidths = {
  'x-small': DEFAULT_STROKE_WIDTH,
  small: DEFAULT_STROKE_WIDTH,
  medium: DEFAULT_STROKE_WIDTH,
  large: DEFAULT_STROKE_WIDTH,
  'x-large': DEFAULT_STROKE_WIDTH,
};

function buildLucideUri(markup: string, strokeWidth: number) {
  const withStroke = markup.replace(/stroke-width="[^"]*"/, `stroke-width="${strokeWidth}"`);

  return `data:image/svg+xml;utf8,${encodeURIComponent(withStroke)}`;
}

function parseStrokeWidth(raw: string) {
  const value = Number.parseFloat(raw);

  return Number.isFinite(value) && value > 0 ? value : DEFAULT_STROKE_WIDTH;
}

type Filter = 'all' | IconComparisonStatus;

const COUNTS: Record<Filter, number> = {
  all: iconComparisonEntries.length,
  replace: iconComparisonEntries.filter((entry) => entry.status === 'replace').length,
  ask: iconComparisonEntries.filter((entry) => entry.status === 'ask').length,
  keep: iconComparisonEntries.filter((entry) => entry.status === 'keep').length,
};

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: `すべて (${COUNTS.all})` },
  { value: 'replace', label: `置換 (${COUNTS.replace})` },
  { value: 'ask', label: `要相談 (${COUNTS.ask})` },
  { value: 'keep', label: `独自維持 (${COUNTS.keep})` },
];

function LucideIcon({
  name,
  px,
  strokeWidth,
  showBounds,
}: {
  name: string;
  px: number;
  strokeWidth: number;
  showBounds: boolean;
}) {
  const markup = lucideSvgMarkup[name];
  if (markup == null) {
    return <span className="typography-body12regular text-supportError">（{name} 未取得）</span>;
  }

  return (
    <img
      src={buildLucideUri(markup, strokeWidth)}
      width={px}
      height={px}
      alt={`lucide ${name}`}
      className={showBounds ? BOUNDS_CLASS : ''}
    />
  );
}

function CurrentCell({ name, showBounds }: { name: string; showBounds: boolean }) {
  return (
    <td className="border border-gray-200 p-2 text-center align-middle">
      <div className="flex items-center justify-center gap-3">
        {ICON_SIZES.map((size) => (
          <Icon
            key={size}
            name={name as IconName}
            size={size}
            color="icon01"
            className={showBounds ? BOUNDS_CLASS : ''}
          />
        ))}
      </div>
      <div className="typography-body12regular mt-1 text-text02">{name}</div>
    </td>
  );
}

function CandidateCell({
  name,
  strokeWidths,
  showBounds,
}: {
  name: string;
  strokeWidths: StrokeWidths;
  showBounds: boolean;
}) {
  return (
    <td className="border border-gray-200 px-3 py-2 text-center align-middle">
      <div className="flex items-center justify-center gap-3">
        {ICON_SIZES.map((size) => (
          <LucideIcon
            key={size}
            name={name}
            px={LUCIDE_PX[size]}
            strokeWidth={strokeWidths[size]}
            showBounds={showBounds}
          />
        ))}
      </div>
      <div className="typography-body12regular mt-1">
        <a
          href={`https://lucide.dev/icons/${name}`}
          target="_blank"
          rel="noreferrer"
          className="text-text02 underline hover:text-text01"
        >
          {name}
        </a>
      </div>
    </td>
  );
}

function Row({
  entry,
  index,
  strokeWidths,
  showBounds,
}: {
  entry: IconComparisonEntry;
  index: number;
  strokeWidths: StrokeWidths;
  showBounds: boolean;
}) {
  const statusMeta = STATUS_META[entry.status];

  return (
    <tr>
      <td className="typography-body12regular border border-gray-200 p-2 text-right align-middle text-text02">
        {index + 1}
      </td>
      <td className="w-52 border border-gray-200 px-3 py-2 align-middle">
        <div className="typography-body14bold">{entry.name}</div>
        {entry.hasAccent && (
          <span
            className="typography-body12regular mt-1 inline-flex items-center gap-1 rounded-full bg-blue-blue10 px-2 py-0.5 text-blue-blue100"
            title="accentColor（2色）指定に対応するアイコン。lucide 置換で accentColor が無効化する"
          >
            <span className="inline-flex items-center gap-px">
              <span className="size-2 rounded-full bg-icon02" />
              <span className="size-2 rounded-full bg-supportError" />
            </span>
            accent 対応
          </span>
        )}
      </td>
      <td className="border border-gray-200 px-3 py-2 align-middle">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`typography-body12regular rounded-full px-2 py-0.5 ${statusMeta.badgeClass}`}>
            {statusMeta.label}
          </span>
          {entry.note !== '' && (
            <Tooltip content={entry.note} maxWidth={280}>
              <span className="flex cursor-help items-center">
                <Icon name="information" size="small" color="icon02" />
              </span>
            </Tooltip>
          )}
        </div>
      </td>
      <CurrentCell name={entry.name} showBounds={showBounds} />
      {entry.candidates.map((candidate) => (
        <CandidateCell key={candidate} name={candidate} strokeWidths={strokeWidths} showBounds={showBounds} />
      ))}
      {entry.candidates.length === 0 && (
        <td className="typography-body12regular border border-gray-200 px-3 py-2 align-middle text-text02">
          （lucide に該当なし）
        </td>
      )}
    </tr>
  );
}

function ComparisonSheet() {
  const [filter, setFilter] = useState<Filter>('all');
  const [strokeWidths, setStrokeWidths] = useState<StrokeWidths>(INITIAL_STROKE_WIDTHS);
  const [isBoundsColored, setIsBoundsColored] = useState(false);
  const entries = filter === 'all' ? iconComparisonEntries : iconComparisonEntries.filter((e) => e.status === filter);

  const bulkValue = ICON_SIZES.every((size) => strokeWidths[size] === strokeWidths['x-small'])
    ? strokeWidths['x-small']
    : null;
  const setAllStroke = (value: number) =>
    setStrokeWidths({ 'x-small': value, small: value, medium: value, large: value, 'x-large': value });
  const setOneStroke = (size: IconSize, value: number) => setStrokeWidths((prev) => ({ ...prev, [size]: value }));

  return (
    <div className="p-4">
      <div className="typography-body12regular mb-3 text-text02">
        現行 zenkigen（fill 系）と lucide {lucideVersion}（stroke 系）の比較。各セルは左から x-small 12 / small 16 /
        medium 24 / large 32 / x-large 40（px）の全 5 サイズ。判定バッジ横の情報アイコンにマウスを乗せると備考を表示。
      </div>
      <div className="mb-3 flex flex-wrap items-end gap-4 rounded border border-gray-200 bg-uiBackground02 p-3">
        <div className="typography-body13bold self-center">lucide 線の太さ（stroke-width）</div>
        <label className="typography-body12regular flex flex-col gap-1">
          <span className="text-text02">一括</span>
          <input
            type="number"
            min={0.25}
            max={6}
            step={0.25}
            value={bulkValue ?? ''}
            placeholder="混在"
            onChange={(event) => setAllStroke(parseStrokeWidth(event.target.value))}
            className="w-20 rounded border border-uiBorder02 bg-uiBackground01 px-2 py-1"
          />
        </label>
        <div className="self-center text-text02">|</div>
        {ICON_SIZES.map((size) => (
          <label key={size} className="typography-body12regular flex flex-col gap-1">
            <span className="text-text02">
              {size}（{LUCIDE_PX[size]}px）
            </span>
            <input
              type="number"
              min={0.25}
              max={6}
              step={0.25}
              value={strokeWidths[size]}
              onChange={(event) => setOneStroke(size, parseStrokeWidth(event.target.value))}
              className="w-20 rounded border border-uiBorder02 bg-uiBackground01 px-2 py-1"
            />
          </label>
        ))}
        <button
          type="button"
          onClick={() => setStrokeWidths(INITIAL_STROKE_WIDTHS)}
          className="typography-body13regular self-center rounded border border-uiBorder02 bg-uiBackground01 px-3 py-1"
        >
          リセット（2）
        </button>
        <div className="self-center border-l border-uiBorder02 pl-4">
          <Toggle
            id="show-icon-bounds"
            size="small"
            isChecked={isBoundsColored}
            onChange={() => setIsBoundsColored((prev) => !prev)}
            label="アイコン領域を着色"
          />
        </div>
      </div>
      <div className="sticky top-0 z-10 mb-3 flex flex-wrap gap-2 border-b border-gray-200 bg-uiBackground01 py-2">
        {FILTERS.map(({ value, label }) => {
          const isActive = filter === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`typography-body13regular rounded border px-3 py-1 ${
                isActive
                  ? 'border-interactive01 bg-interactive01 text-textOnColor'
                  : 'border-uiBorder02 bg-uiBackground01 text-text01'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <table className="border-collapse">
        <thead>
          <tr className="typography-body14bold">
            <th className="border border-gray-200 bg-uiBackground02 p-2 text-right align-middle">#</th>
            <th className="w-52 border border-gray-200 bg-uiBackground02 px-3 py-2 text-left align-middle">
              アイコン名
            </th>
            <th className="border border-gray-200 bg-uiBackground02 px-3 py-2 text-left align-middle">判定・備考</th>
            <th className="border border-gray-200 bg-uiBackground02 px-3 py-2 text-center align-middle">
              現行 zenkigen（fill）
            </th>
            <th
              colSpan={MAX_CANDIDATES}
              className="border border-gray-200 bg-uiBackground02 px-3 py-2 text-center align-middle"
            >
              lucide 候補（左＝提案 / 右＝代替）
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <Row
              key={entry.name}
              entry={entry}
              index={iconComparisonEntries.indexOf(entry)}
              strokeWidths={strokeWidths}
              showBounds={isBoundsColored}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const meta: Meta<typeof ComparisonSheet> = {
  title: 'WIP/Lucide Icon Comparison',
  component: ComparisonSheet,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ComparisonSheet>;

export const Comparison: Story = {
  name: 'lucide 置き換え比較',
  render: () => <ComparisonSheet />,
};
