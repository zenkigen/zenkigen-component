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
import clsx from 'clsx';
import { useState } from 'react';

import { Toggle } from '../toggle';
import { Tooltip } from '../tooltip';
import { Icon } from '.';
import type { IconComparisonEntry, IconComparisonStatus } from './lucide-comparison-data';
import {
  iconComparisonEntries,
  issueLabels,
  lucideSvgMarkup,
  lucideVersion,
  tagLabels,
} from './lucide-comparison-data';

// アイコンの占有領域を可視化する着色クラス（トグルで ON/OFF）
const BOUNDS_CLASS = 'bg-blue-blue10 outline outline-1 outline-blue-blue50';

// accentColor 対応アイコンの accent 部分に当てる色。lucide 置換で失われる 2 色表現を可視化する。
// 「accent 対応」バッジのドットと同色にして対応が読み取れるようにしている。
const ACCENT_COLOR = 'supportError' as const;

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

// lucide の線の太さ（stroke-width）。サイズごとに個別指定できる。
// 初期値は実装計画のサイズ別 stroke-width 案（lucide 既定 2 を medium とし、小サイズは太く・大サイズは細く）。
type StrokeWidths = Record<IconSize, number>;
const INITIAL_STROKE_WIDTHS: StrokeWidths = {
  'x-small': 2.5,
  small: 2.25,
  medium: 2,
  large: 1.75,
  'x-large': 1.5,
};

function buildLucideUri(markup: string, strokeWidth: number) {
  const withStroke = markup.replace(/stroke-width="[^"]*"/, `stroke-width="${strokeWidth}"`);

  return `data:image/svg+xml;utf8,${encodeURIComponent(withStroke)}`;
}

/** 入力欄の値を stroke-width として解釈する。不正値・空欄は null（呼び出し側で初期値に戻す）。 */
function parseStrokeWidth(raw: string) {
  const value = Number.parseFloat(raw);

  return Number.isFinite(value) && value > 0 ? value : null;
}

type Filter = 'all' | IconComparisonStatus;

const COUNTS: Record<Filter, number> = {
  all: iconComparisonEntries.length,
  replace: iconComparisonEntries.filter((entry) => entry.status === 'replace').length,
  ask: iconComparisonEntries.filter((entry) => entry.status === 'ask').length,
  keep: iconComparisonEntries.filter((entry) => entry.status === 'keep').length,
};

/** 全アイコン数に対する割合（小数第 1 位）。「lucide にどれだけ置き換わるか」を読み取れるようにする。 */
function formatPercent(count: number) {
  return `${((count / COUNTS.all) * 100).toFixed(1)}%`;
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: `すべて (${COUNTS.all})` },
  { value: 'replace', label: `置換 (${COUNTS.replace} / ${formatPercent(COUNTS.replace)})` },
  { value: 'ask', label: `要相談 (${COUNTS.ask} / ${formatPercent(COUNTS.ask)})` },
  { value: 'keep', label: `独自維持 (${COUNTS.keep} / ${formatPercent(COUNTS.keep)})` },
];

// カテゴリタグ・論点タグ。データ側のラベル定義の順序どおりに並べる（1 アイコンが複数持つ）
const TAG_KEYS = Object.keys(tagLabels);
const ISSUE_KEYS = Object.keys(issueLabels);

function countBy(key: 'tags' | 'issues', value: string) {
  return iconComparisonEntries.filter((entry) => entry[key].includes(value)).length;
}

const TAG_COUNTS: Record<string, number> = Object.fromEntries(TAG_KEYS.map((t) => [t, countBy('tags', t)]));
const ISSUE_COUNTS: Record<string, number> = Object.fromEntries(ISSUE_KEYS.map((i) => [i, countBy('issues', i)]));

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

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

/** 採用セルの強調。領域着色トグル（BOUNDS_CLASS）と色が混ざらないよう背景ではなく枠線で示す。 */
const ADOPTED_CELL_CLASS = 'outline outline-2 -outline-offset-2 outline-interactive01';

/**
 * 置換が確定したときに実際に使われるアイコン。
 * 「要相談」は結論が出るまで現行アイコンを使うため、「独自維持」と同じく現行セルに「維持」を出す。
 * 空文字は「チェックマークのみのバッジ」を意味する（lucide 提案の採用はチェックだけで足りる）。
 */
function resolveAdoptedLabels(entry: IconComparisonEntry) {
  if (entry.status === 'replace') {
    return { current: null, firstCandidate: '' };
  }

  return { current: '維持', firstCandidate: null };
}

function AdoptedBadge({ label }: { label: string }) {
  const hasText = label !== '';

  return (
    <span
      className={clsx(
        'typography-label11bold inline-flex items-center rounded-full bg-interactive01 text-textOnColor',
        hasText ? 'gap-0.5 py-0.5 pl-1 pr-2' : 'p-0.5',
      )}
    >
      <Icon name="check" size="x-small" color="iconOnColor" />
      {hasText && label}
    </span>
  );
}

/**
 * 採用バッジの帯。横並びのセル同士でアイコンの縦位置がずれないよう、
 * バッジが無いセルでも同じ高さの空帯を必ず描画する。
 */
function AdoptedBadgeSlot({ label }: { label: string | null }) {
  return (
    <div className="mb-1 flex h-5 items-center justify-center">{label !== null && <AdoptedBadge label={label} />}</div>
  );
}

function CurrentCell({
  name,
  showBounds,
  adoptedLabel,
  hasAccent,
}: {
  name: string;
  showBounds: boolean;
  adoptedLabel: string | null;
  hasAccent: boolean;
}) {
  return (
    <td
      className={clsx('border border-gray-200 p-2 text-center align-middle', {
        [ADOPTED_CELL_CLASS]: adoptedLabel !== null,
      })}
    >
      <AdoptedBadgeSlot label={adoptedLabel} />
      <div className="flex items-center justify-center gap-3">
        {ICON_SIZES.map((size) => (
          <Icon
            key={size}
            name={name as IconName}
            size={size}
            color="icon01"
            {...(hasAccent ? { accentColor: ACCENT_COLOR } : {})}
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
  adoptedLabel,
}: {
  name: string;
  strokeWidths: StrokeWidths;
  showBounds: boolean;
  adoptedLabel: string | null;
}) {
  return (
    <td
      className={clsx('border border-gray-200 px-3 py-2 text-center align-middle', {
        [ADOPTED_CELL_CLASS]: adoptedLabel !== null,
      })}
    >
      <AdoptedBadgeSlot label={adoptedLabel} />
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

function AccentBadge() {
  return (
    <span
      className="typography-body12regular inline-flex items-center gap-1 rounded-full bg-blue-blue10 px-2 py-0.5 text-blue-blue100"
      title="accentColor（2色）指定に対応するアイコン。現行セルでは accent 部分を supportError で着色している。lucide 置換ではこの 2 色表現が無効化する"
    >
      <span className="inline-flex items-center gap-px">
        <span className="size-2 rounded-full bg-icon02" />
        <span className="size-2 rounded-full bg-supportError" />
      </span>
      accent 対応
    </span>
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
  const adoptedLabels = resolveAdoptedLabels(entry);

  return (
    <tr>
      <td className="typography-body12regular border border-gray-200 p-2 text-right align-middle text-text02">
        {index + 1}
      </td>
      <td className="w-52 border border-gray-200 px-3 py-2 align-middle">
        <div className="typography-body14bold">{entry.name}</div>
        <div className="mt-1 flex flex-wrap items-center gap-1">
          {entry.tags.map((tag) => (
            <span key={tag} className="typography-label11regular rounded bg-uiBackground02 px-1.5 py-px text-text02">
              {tagLabels[tag] ?? tag}
            </span>
          ))}
          {entry.issues.map((issue) => (
            <Tooltip key={issue} content={issueLabels[issue] ?? issue} maxWidth={280}>
              <span className="typography-label11bold cursor-help rounded bg-blue-blue10 px-1.5 py-px text-blue-blue100">
                論点 {issue}
              </span>
            </Tooltip>
          ))}
        </div>
        {entry.hasAccent && (
          <div className="mt-1">
            <AccentBadge />
          </div>
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
      <CurrentCell
        name={entry.name}
        showBounds={showBounds}
        adoptedLabel={adoptedLabels.current}
        hasAccent={entry.hasAccent}
      />
      {entry.candidates.map((candidate, candidateIndex) => (
        <CandidateCell
          key={candidate}
          name={candidate}
          strokeWidths={strokeWidths}
          showBounds={showBounds}
          adoptedLabel={candidateIndex === 0 ? adoptedLabels.firstCandidate : null}
        />
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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [strokeWidths, setStrokeWidths] = useState<StrokeWidths>(INITIAL_STROKE_WIDTHS);
  const [isBoundsColored, setIsBoundsColored] = useState(false);

  // 判定・カテゴリタグ・論点は AND で絞り込む。タグ／論点を複数選んだ場合はそれぞれ OR
  const entries = iconComparisonEntries.filter((entry) => {
    if (filter !== 'all' && entry.status !== filter) {
      return false;
    }
    if (selectedTags.length > 0 && !selectedTags.some((tag) => entry.tags.includes(tag))) {
      return false;
    }

    return selectedIssues.length === 0 || selectedIssues.some((issue) => entry.issues.includes(issue));
  });
  const isFiltered = filter !== 'all' || selectedTags.length > 0 || selectedIssues.length > 0;
  const resetFilters = () => {
    setFilter('all');
    setSelectedTags([]);
    setSelectedIssues([]);
  };

  const bulkValue = ICON_SIZES.every((size) => strokeWidths[size] === strokeWidths['x-small'])
    ? strokeWidths['x-small']
    : null;
  const handleBulkStrokeChange = (raw: string) => {
    const value = parseStrokeWidth(raw);
    if (value == null) {
      setStrokeWidths(INITIAL_STROKE_WIDTHS);

      return;
    }
    setStrokeWidths({ 'x-small': value, small: value, medium: value, large: value, 'x-large': value });
  };
  const handleSizeStrokeChange = (size: IconSize, raw: string) =>
    setStrokeWidths((prev) => ({ ...prev, [size]: parseStrokeWidth(raw) ?? INITIAL_STROKE_WIDTHS[size] }));

  return (
    <div className="p-4">
      <div className="typography-body12regular mb-3 text-text02">
        現行 zenkigen（fill 系）と lucide {lucideVersion}（stroke 系）の比較。各セルは左から x-small 12 / small 16 /
        medium 24 / large 32 / x-large 40（px）の全 5 サイズ。判定バッジ横の情報アイコンにマウスを乗せると備考を表示。
      </div>
      <div className="typography-body12regular mb-3 flex flex-wrap items-center gap-2 text-text02">
        <AdoptedBadge label="" />
        <span>= これにする（lucide 提案を採用）</span>
        <AdoptedBadge label="維持" />
        <span>
          = 現行アイコンを維持（「独自維持」と、結論が出るまでは現行を使う「要相談」）。青枠のセルが採用対象。
        </span>
      </div>
      <div className="typography-body12regular mb-3 flex flex-wrap items-center gap-2 text-text02">
        <AccentBadge />
        <span>
          = accentColor（2色）対応アイコン。現行セルは accent 部分を supportError で着色している（lucide 置換ではこの 2
          色表現が無効化する）。
        </span>
      </div>
      <div className="mb-3 flex flex-wrap items-end gap-4 rounded border border-gray-200 bg-uiBackground02 p-3">
        <div className="flex items-center gap-1 self-center">
          <div className="typography-body13bold">lucide 線の太さ（stroke-width）</div>
          <Tooltip content="既定はサイズ別（小さいほど太く）。値が混在している間、一括欄は空表示になる" maxWidth={280}>
            <span className="flex cursor-help items-center">
              <Icon name="information" size="small" color="icon02" />
            </span>
          </Tooltip>
        </div>
        <label className="typography-body12regular flex flex-col gap-1">
          <span className="text-text02">一括</span>
          <input
            type="number"
            min={0.25}
            max={6}
            step={0.25}
            value={bulkValue ?? ''}
            placeholder="混在"
            onChange={(event) => handleBulkStrokeChange(event.target.value)}
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
              onChange={(event) => handleSizeStrokeChange(size, event.target.value)}
              className="w-20 rounded border border-uiBorder02 bg-uiBackground01 px-2 py-1"
            />
          </label>
        ))}
        <button
          type="button"
          onClick={() => setStrokeWidths(INITIAL_STROKE_WIDTHS)}
          className="typography-body13regular self-center rounded border border-uiBorder02 bg-uiBackground01 px-3 py-1"
        >
          既定値に戻す
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
      <div className="sticky top-0 z-10 mb-3 flex flex-col gap-2 border-b border-gray-200 bg-uiBackground01 py-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="typography-body12regular w-20 shrink-0 text-text02">判定</span>
          {FILTERS.map(({ value, label }) => {
            const isActive = filter === value;

            return (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={clsx(
                  'typography-body13regular rounded border px-3 py-1',
                  isActive
                    ? 'border-interactive01 bg-interactive01 text-textOnColor'
                    : 'border-uiBorder02 bg-uiBackground01 text-text01',
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="typography-body12regular w-20 shrink-0 text-text02">カテゴリ</span>
          {TAG_KEYS.map((tag) => {
            const isActive = selectedTags.includes(tag);

            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTags((prev) => toggleValue(prev, tag))}
                className={clsx(
                  'typography-body12regular rounded-full border px-2.5 py-0.5',
                  isActive
                    ? 'border-interactive01 bg-interactive01 text-textOnColor'
                    : 'border-uiBorder02 bg-uiBackground01 text-text01',
                )}
              >
                {tagLabels[tag]} ({TAG_COUNTS[tag]})
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="typography-body12regular w-20 shrink-0 text-text02">論点</span>
          {ISSUE_KEYS.map((issue) => {
            const isActive = selectedIssues.includes(issue);

            return (
              <Tooltip key={issue} content={issueLabels[issue] ?? issue} maxWidth={280}>
                <button
                  type="button"
                  onClick={() => setSelectedIssues((prev) => toggleValue(prev, issue))}
                  className={clsx(
                    'typography-body12regular rounded-full border px-2.5 py-0.5',
                    isActive
                      ? 'border-interactive01 bg-interactive01 text-textOnColor'
                      : 'border-uiBorder02 bg-uiBackground01 text-text01',
                  )}
                >
                  論点 {issue} ({ISSUE_COUNTS[issue]})
                </button>
              </Tooltip>
            );
          })}
          <span className="typography-body12regular ml-2 text-text02">
            表示中 {entries.length} / {COUNTS.all} 件
          </span>
          {isFiltered && (
            <button
              type="button"
              onClick={resetFilters}
              className="typography-body12regular rounded border border-uiBorder02 bg-uiBackground01 px-2 py-0.5 text-text01"
            >
              絞り込みを解除
            </button>
          )}
        </div>
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
