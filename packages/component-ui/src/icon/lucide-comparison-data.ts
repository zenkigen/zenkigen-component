/*
 * NOTE: このファイルは docs/wip/feature/gen-storybook-comparison-data.cjs による自動生成物です。
 * 手で編集しないこと。マッピングは lucide-icon-mapping.data.cjs（single source）を編集して再生成する。
 *
 * lucide 由来の SVG（ISC License, https://lucide.dev）を data URI として埋め込んでいます。
 * これは lucide 置き換え検討のための一時的な Storybook 比較資料であり、マージ対象ではありません。
 */

export type IconComparisonStatus = 'replace' | 'ask' | 'keep';

export type IconComparisonEntry = {
  name: string;
  status: IconComparisonStatus;
  note: string;
  candidates: string[];
  /** 現行アイコンが accentColor（2色）指定に対応するか */
  hasAccent: boolean;
};

export const lucideVersion = '1.25.0';

export const iconComparisonEntries: IconComparisonEntry[] = [
  {
    name: 'add',
    status: 'replace',
    note: '素の＋記号',
    candidates: ['plus'],
    hasAccent: false,
  },
  {
    name: 'ai',
    status: 'ask',
    note: '独自の 4 芒星。近似置換か独自維持か',
    candidates: ['sparkles', 'sparkle'],
    hasAccent: false,
  },
  {
    name: 'ai-agent',
    status: 'ask',
    note: 'accent 対応。lucide は bot が近いが人物＋AI バッジ表現は無し。置換で accentColor 無効化',
    candidates: ['bot'],
    hasAccent: true,
  },
  {
    name: 'angle-down',
    status: 'replace',
    note: '',
    candidates: ['chevron-down'],
    hasAccent: false,
  },
  {
    name: 'angle-left',
    status: 'replace',
    note: '',
    candidates: ['chevron-left'],
    hasAccent: false,
  },
  {
    name: 'angle-right',
    status: 'replace',
    note: '',
    candidates: ['chevron-right'],
    hasAccent: false,
  },
  {
    name: 'angle-small-down',
    status: 'replace',
    note: 'angle-down と同一化',
    candidates: ['chevron-down'],
    hasAccent: false,
  },
  {
    name: 'angle-small-up',
    status: 'replace',
    note: 'angle-up と同一化',
    candidates: ['chevron-up'],
    hasAccent: false,
  },
  {
    name: 'angle-up',
    status: 'replace',
    note: '',
    candidates: ['chevron-up'],
    hasAccent: false,
  },
  {
    name: 'arrow-down',
    status: 'replace',
    note: '',
    candidates: ['arrow-down'],
    hasAccent: false,
  },
  {
    name: 'arrow-left',
    status: 'replace',
    note: '',
    candidates: ['arrow-left'],
    hasAccent: false,
  },
  {
    name: 'arrow-right',
    status: 'replace',
    note: '',
    candidates: ['arrow-right'],
    hasAccent: false,
  },
  {
    name: 'arrow-up',
    status: 'replace',
    note: '',
    candidates: ['arrow-up'],
    hasAccent: false,
  },
  {
    name: 'attachment',
    status: 'replace',
    note: '',
    candidates: ['paperclip'],
    hasAccent: false,
  },
  {
    name: 'attention',
    status: 'ask',
    note: '論点A: 状態アイコン。塗り円＋！',
    candidates: ['circle-alert'],
    hasAccent: false,
  },
  {
    name: 'background-blur-strong',
    status: 'keep',
    note: 'AV ドメイン固有',
    candidates: [],
    hasAccent: false,
  },
  {
    name: 'background-blur-weak',
    status: 'keep',
    note: 'AV ドメイン固有',
    candidates: [],
    hasAccent: false,
  },
  {
    name: 'beginner',
    status: 'keep',
    note: '初心者マーク（日本固有）',
    candidates: [],
    hasAccent: false,
  },
  {
    name: 'block',
    status: 'replace',
    note: '',
    candidates: ['ban'],
    hasAccent: false,
  },
  {
    name: 'bookmark',
    status: 'replace',
    note: '',
    candidates: ['bookmark'],
    hasAccent: false,
  },
  {
    name: 'building',
    status: 'replace',
    note: '',
    candidates: ['building'],
    hasAccent: false,
  },
  {
    name: 'calendar',
    status: 'ask',
    note: 'calendar 系 4 種が accent 維持のためファミリー混在の判断',
    candidates: ['calendar'],
    hasAccent: false,
  },
  {
    name: 'calendar-attention',
    status: 'keep',
    note: 'accent 対応。lucide に calendar＋！ 相当なし',
    candidates: [],
    hasAccent: true,
  },
  {
    name: 'calendar-check',
    status: 'ask',
    note: 'accent 対応。lucide に calendar-check あり。置換で accentColor 無効化',
    candidates: ['calendar-check'],
    hasAccent: true,
  },
  {
    name: 'calendar-draft',
    status: 'ask',
    note: 'lucide に calendar+ペン無し。独自維持寄り',
    candidates: [],
    hasAccent: false,
  },
  {
    name: 'calendar-minus',
    status: 'ask',
    note: 'accent 対応。lucide に calendar-minus あり。置換で accentColor 無効化',
    candidates: ['calendar-minus'],
    hasAccent: true,
  },
  {
    name: 'calendar-today',
    status: 'ask',
    note: 'accent 対応。lucide calendar-days が近い。置換で accentColor 無効化',
    candidates: ['calendar-days', 'calendar-1'],
    hasAccent: true,
  },
  {
    name: 'caret-down',
    status: 'ask',
    note: '論点D: 塗り三角。独自維持推奨',
    candidates: ['chevron-down', 'triangle'],
    hasAccent: false,
  },
  {
    name: 'caret-right',
    status: 'ask',
    note: '論点D: 塗り三角。独自維持推奨',
    candidates: ['chevron-right', 'play'],
    hasAccent: false,
  },
  {
    name: 'catch',
    status: 'keep',
    note: 'ドメイン固有（塗りボール）',
    candidates: [],
    hasAccent: false,
  },
  {
    name: 'chart-bar',
    status: 'replace',
    note: 'lucide の chart-bar は横棒なので注意',
    candidates: ['chart-column'],
    hasAccent: false,
  },
  {
    name: 'chart-line',
    status: 'replace',
    note: '',
    candidates: ['chart-line'],
    hasAccent: false,
  },
  {
    name: 'check',
    status: 'replace',
    note: '',
    candidates: ['check'],
    hasAccent: false,
  },
  {
    name: 'circle',
    status: 'replace',
    note: '',
    candidates: ['circle'],
    hasAccent: false,
  },
  {
    name: 'close',
    status: 'replace',
    note: '',
    candidates: ['x'],
    hasAccent: false,
  },
  {
    name: 'collapse-content',
    status: 'replace',
    note: '',
    candidates: ['minimize-2'],
    hasAccent: false,
  },
  {
    name: 'comment',
    status: 'replace',
    note: '',
    candidates: ['message-circle', 'message-square'],
    hasAccent: false,
  },
  {
    name: 'contract',
    status: 'replace',
    note: '',
    candidates: ['shrink', 'minimize-2'],
    hasAccent: false,
  },
  {
    name: 'copy',
    status: 'replace',
    note: '',
    candidates: ['copy'],
    hasAccent: false,
  },
  {
    name: 'delete',
    status: 'replace',
    note: '',
    candidates: ['trash-2'],
    hasAccent: false,
  },
  {
    name: 'display',
    status: 'replace',
    note: '',
    candidates: ['monitor'],
    hasAccent: false,
  },
  {
    name: 'document',
    status: 'replace',
    note: '',
    candidates: ['file-text'],
    hasAccent: false,
  },
  {
    name: 'document-edit',
    status: 'replace',
    note: '',
    candidates: ['file-pen-line', 'file-pen'],
    hasAccent: false,
  },
  {
    name: 'documents',
    status: 'replace',
    note: '現行 3 枚重ね → lucide 2 枚',
    candidates: ['files'],
    hasAccent: false,
  },
  {
    name: 'double-circle',
    status: 'ask',
    note: '◎ 記号。意味を守るなら独自維持',
    candidates: ['target'],
    hasAccent: false,
  },
  {
    name: 'download',
    status: 'replace',
    note: '',
    candidates: ['download'],
    hasAccent: false,
  },
  {
    name: 'download-document',
    status: 'replace',
    note: '',
    candidates: ['file-down'],
    hasAccent: false,
  },
  {
    name: 'edit',
    status: 'replace',
    note: '',
    candidates: ['pencil'],
    hasAccent: false,
  },
  {
    name: 'email',
    status: 'replace',
    note: '',
    candidates: ['mail'],
    hasAccent: false,
  },
  {
    name: 'exit',
    status: 'replace',
    note: '',
    candidates: ['log-out'],
    hasAccent: false,
  },
  {
    name: 'expand',
    status: 'replace',
    note: '',
    candidates: ['expand', 'maximize-2'],
    hasAccent: false,
  },
  {
    name: 'expand-content',
    status: 'replace',
    note: '',
    candidates: ['maximize-2'],
    hasAccent: false,
  },
  {
    name: 'external-link',
    status: 'replace',
    note: '',
    candidates: ['external-link'],
    hasAccent: false,
  },
  {
    name: 'feedback',
    status: 'ask',
    note: '',
    candidates: ['message-circle-more', 'message-square-more'],
    hasAccent: false,
  },
  {
    name: 'filter',
    status: 'replace',
    note: '現行は線 3 本型（漏斗ではない）',
    candidates: ['list-filter'],
    hasAccent: false,
  },
  {
    name: 'flag',
    status: 'replace',
    note: '',
    candidates: ['flag'],
    hasAccent: false,
  },
  {
    name: 'global',
    status: 'replace',
    note: '',
    candidates: ['globe'],
    hasAccent: false,
  },
  {
    name: 'graph-line',
    status: 'replace',
    note: '現行は面塗りエリアチャート',
    candidates: ['chart-area', 'chart-line'],
    hasAccent: false,
  },
  {
    name: 'guide',
    status: 'replace',
    note: '',
    candidates: ['navigation', 'send'],
    hasAccent: false,
  },
  {
    name: 'hamburger',
    status: 'replace',
    note: '',
    candidates: ['menu'],
    hasAccent: false,
  },
  {
    name: 'hamburger-close',
    status: 'replace',
    note: '',
    candidates: ['chevrons-left'],
    hasAccent: false,
  },
  {
    name: 'hamburger-open',
    status: 'replace',
    note: '',
    candidates: ['chevrons-right'],
    hasAccent: false,
  },
  {
    name: 'handle',
    status: 'replace',
    note: '',
    candidates: ['grip-vertical'],
    hasAccent: false,
  },
  {
    name: 'harutaka',
    status: 'keep',
    note: 'ブランドロゴ',
    candidates: [],
    hasAccent: false,
  },
  {
    name: 'help',
    status: 'replace',
    note: '',
    candidates: ['circle-help'],
    hasAccent: false,
  },
  {
    name: 'hint',
    status: 'replace',
    note: '',
    candidates: ['lightbulb'],
    hasAccent: false,
  },
  {
    name: 'home',
    status: 'replace',
    note: '',
    candidates: ['house'],
    hasAccent: false,
  },
  {
    name: 'image',
    status: 'replace',
    note: '',
    candidates: ['image'],
    hasAccent: false,
  },
  {
    name: 'information',
    status: 'replace',
    note: '',
    candidates: ['info'],
    hasAccent: false,
  },
  {
    name: 'information-filled',
    status: 'ask',
    note: '論点A: 状態アイコン。置換で information と同一化',
    candidates: ['info'],
    hasAccent: false,
  },
  {
    name: 'input-delete',
    status: 'replace',
    note: 'filled→線画',
    candidates: ['circle-x'],
    hasAccent: false,
  },
  {
    name: 'link',
    status: 'replace',
    note: '',
    candidates: ['link'],
    hasAccent: false,
  },
  {
    name: 'list',
    status: 'replace',
    note: '',
    candidates: ['list'],
    hasAccent: false,
  },
  {
    name: 'live-background',
    status: 'keep',
    note: 'AV ドメイン固有',
    candidates: [],
    hasAccent: false,
  },
  {
    name: 'logout',
    status: 'replace',
    note: 'exit と同一化（現行は鏡像）',
    candidates: ['log-out'],
    hasAccent: false,
  },
  {
    name: 'main-view',
    status: 'keep',
    note: 'AV ドメイン固有',
    candidates: [],
    hasAccent: false,
  },
  {
    name: 'message-text',
    status: 'replace',
    note: '',
    candidates: ['messages-square'],
    hasAccent: false,
  },
  {
    name: 'mic',
    status: 'ask',
    note: 'accent（ミュート2色）対応。lucide に mic あり。置換で accentColor 無効化',
    candidates: ['mic'],
    hasAccent: true,
  },
  {
    name: 'mic-off',
    status: 'ask',
    note: 'mic ファミリー。lucide に mic-off あり',
    candidates: ['mic-off'],
    hasAccent: false,
  },
  {
    name: 'minus',
    status: 'replace',
    note: '現行は塗り円バッジ。filled→線画',
    candidates: ['circle-minus'],
    hasAccent: false,
  },
  {
    name: 'more',
    status: 'replace',
    note: '',
    candidates: ['ellipsis'],
    hasAccent: false,
  },
  {
    name: 'movie',
    status: 'replace',
    note: '',
    candidates: ['film'],
    hasAccent: false,
  },
  {
    name: 'network',
    status: 'replace',
    note: '',
    candidates: ['waypoints'],
    hasAccent: false,
  },
  {
    name: 'notification',
    status: 'replace',
    note: '',
    candidates: ['bell'],
    hasAccent: false,
  },
  {
    name: 'pause',
    status: 'replace',
    note: '塗りバー→線画',
    candidates: ['pause'],
    hasAccent: false,
  },
  {
    name: 'pdf',
    status: 'keep',
    note: '「PDF」文字入り。lucide に相当なし',
    candidates: [],
    hasAccent: false,
  },
  {
    name: 'picture-in-picture',
    status: 'replace',
    note: '',
    candidates: ['picture-in-picture-2'],
    hasAccent: false,
  },
  {
    name: 'play',
    status: 'replace',
    note: '',
    candidates: ['play'],
    hasAccent: false,
  },
  {
    name: 'play-filled',
    status: 'ask',
    note: '論点D: 独自維持推奨（play との描き分け）',
    candidates: ['play'],
    hasAccent: false,
  },
  {
    name: 'plus',
    status: 'replace',
    note: '現行は塗り円バッジ。filled→線画',
    candidates: ['circle-plus'],
    hasAccent: false,
  },
  {
    name: 'presentation',
    status: 'replace',
    note: '',
    candidates: ['presentation'],
    hasAccent: false,
  },
  {
    name: 'questionnaire',
    status: 'replace',
    note: '',
    candidates: ['clipboard-list'],
    hasAccent: false,
  },
  {
    name: 'record',
    status: 'replace',
    note: '中心の塗り面積は小さくなる',
    candidates: ['circle-dot'],
    hasAccent: false,
  },
  {
    name: 'reload',
    status: 'replace',
    note: '',
    candidates: ['rotate-cw'],
    hasAccent: false,
  },
  {
    name: 'remove',
    status: 'replace',
    note: '現行は素の−線',
    candidates: ['minus'],
    hasAccent: false,
  },
  {
    name: 'repeat',
    status: 'replace',
    note: '',
    candidates: ['repeat'],
    hasAccent: false,
  },
  {
    name: 'score',
    status: 'ask',
    note: 'ドメイン固有性が高ければ独自維持',
    candidates: ['file-check'],
    hasAccent: false,
  },
  {
    name: 'screen-share',
    status: 'replace',
    note: '',
    candidates: ['monitor-up'],
    hasAccent: false,
  },
  {
    name: 'search',
    status: 'replace',
    note: '',
    candidates: ['search'],
    hasAccent: false,
  },
  {
    name: 'security',
    status: 'replace',
    note: '現行は南京錠（盾ではない）',
    candidates: ['lock'],
    hasAccent: false,
  },
  {
    name: 'send',
    status: 'replace',
    note: 'filled→線画',
    candidates: ['send'],
    hasAccent: false,
  },
  {
    name: 'setting',
    status: 'replace',
    note: '',
    candidates: ['settings'],
    hasAccent: false,
  },
  {
    name: 'share',
    status: 'replace',
    note: '',
    candidates: ['share-2'],
    hasAccent: false,
  },
  {
    name: 'shuffle',
    status: 'replace',
    note: '',
    candidates: ['shuffle'],
    hasAccent: false,
  },
  {
    name: 'sidebar',
    status: 'replace',
    note: '',
    candidates: ['panel-left'],
    hasAccent: false,
  },
  {
    name: 'signal',
    status: 'ask',
    note: 'signal ファミリー。lucide に signal あり',
    candidates: ['signal'],
    hasAccent: false,
  },
  {
    name: 'signal-low',
    status: 'ask',
    note: 'accent 対応。lucide に signal-low あり。置換で accentColor 無効化',
    candidates: ['signal-low'],
    hasAccent: true,
  },
  {
    name: 'signal-off',
    status: 'ask',
    note: 'accent 対応。lucide は signal-zero（signal-off 相当）。置換で accentColor 無効化',
    candidates: ['signal-zero'],
    hasAccent: true,
  },
  {
    name: 'slider-editing',
    status: 'replace',
    note: '',
    candidates: ['sliders-horizontal'],
    hasAccent: false,
  },
  {
    name: 'sort',
    status: 'replace',
    note: '',
    candidates: ['arrow-up-down'],
    hasAccent: false,
  },
  {
    name: 'sort-down',
    status: 'replace',
    note: '確信度低。方向は要再確認',
    candidates: ['arrow-down-wide-narrow'],
    hasAccent: false,
  },
  {
    name: 'sort-up',
    status: 'replace',
    note: '確信度低。方向は要再確認',
    candidates: ['arrow-up-narrow-wide'],
    hasAccent: false,
  },
  {
    name: 'sparkle',
    status: 'replace',
    note: '',
    candidates: ['sparkles'],
    hasAccent: false,
  },
  {
    name: 'stamp',
    status: 'replace',
    note: '',
    candidates: ['stamp'],
    hasAccent: false,
  },
  {
    name: 'star',
    status: 'replace',
    note: '',
    candidates: ['star'],
    hasAccent: false,
  },
  {
    name: 'star-filled',
    status: 'ask',
    note: '論点D: EvaluationStar 依存。独自維持を強く推奨',
    candidates: ['star'],
    hasAccent: false,
  },
  {
    name: 'success-filled',
    status: 'ask',
    note: '論点A: 状態アイコン。塗り円＋✓',
    candidates: ['circle-check'],
    hasAccent: false,
  },
  {
    name: 'superadmin',
    status: 'ask',
    note: 'lucide shield-check が近い（盾＋チェック）',
    candidates: ['shield-check', 'badge-check'],
    hasAccent: false,
  },
  {
    name: 'table',
    status: 'replace',
    note: '',
    candidates: ['table'],
    hasAccent: false,
  },
  {
    name: 'table-download',
    status: 'ask',
    note: '複合表現は lucide に無し。独自維持寄り',
    candidates: [],
    hasAccent: false,
  },
  {
    name: 'table-upload',
    status: 'ask',
    note: '同上',
    candidates: [],
    hasAccent: false,
  },
  {
    name: 'timer',
    status: 'replace',
    note: '',
    candidates: ['timer'],
    hasAccent: false,
  },
  {
    name: 'transcription',
    status: 'keep',
    note: 'AV ドメイン固有',
    candidates: [],
    hasAccent: false,
  },
  {
    name: 'triangle',
    status: 'replace',
    note: '',
    candidates: ['triangle'],
    hasAccent: false,
  },
  {
    name: 'upload',
    status: 'replace',
    note: '',
    candidates: ['upload'],
    hasAccent: false,
  },
  {
    name: 'upload-document',
    status: 'replace',
    note: '',
    candidates: ['file-up'],
    hasAccent: false,
  },
  {
    name: 'upload-document-success',
    status: 'replace',
    note: '',
    candidates: ['file-check'],
    hasAccent: false,
  },
  {
    name: 'user',
    status: 'ask',
    note: 'user 系 5 種の描き分け全体で判断',
    candidates: ['user'],
    hasAccent: false,
  },
  {
    name: 'user-add',
    status: 'replace',
    note: '',
    candidates: ['user-plus'],
    hasAccent: false,
  },
  {
    name: 'user-group',
    status: 'ask',
    note: 'user-multi との描き分け',
    candidates: ['users-round'],
    hasAccent: false,
  },
  {
    name: 'user-line',
    status: 'ask',
    note: '現行は塗り円アバター',
    candidates: ['circle-user-round'],
    hasAccent: false,
  },
  {
    name: 'user-multi',
    status: 'ask',
    note: '現行 3 人像 → lucide 2 人',
    candidates: ['users'],
    hasAccent: false,
  },
  {
    name: 'user-one',
    status: 'ask',
    note: 'Avatar フォールバックで使用',
    candidates: ['user-round'],
    hasAccent: false,
  },
  {
    name: 'user-remove',
    status: 'replace',
    note: '',
    candidates: ['user-minus'],
    hasAccent: false,
  },
  {
    name: 'user-verified',
    status: 'replace',
    note: '',
    candidates: ['user-check'],
    hasAccent: false,
  },
  {
    name: 'video',
    status: 'ask',
    note: '論点C: mic（維持）との混在判断',
    candidates: ['video'],
    hasAccent: false,
  },
  {
    name: 'video-off',
    status: 'ask',
    note: '論点C',
    candidates: ['video-off'],
    hasAccent: false,
  },
  {
    name: 'visibility',
    status: 'replace',
    note: '',
    candidates: ['eye'],
    hasAccent: false,
  },
  {
    name: 'visibility-off',
    status: 'replace',
    note: '',
    candidates: ['eye-off'],
    hasAccent: false,
  },
  {
    name: 'volume',
    status: 'ask',
    note: 'volume ファミリー。lucide volume-2 が相当',
    candidates: ['volume-2', 'volume-1'],
    hasAccent: false,
  },
  {
    name: 'volume-off',
    status: 'ask',
    note: 'accent 対応。lucide に volume-off あり。置換で accentColor 無効化',
    candidates: ['volume-off', 'volume-x'],
    hasAccent: true,
  },
  {
    name: 'warning',
    status: 'ask',
    note: '論点A: 状態アイコン。塗り三角＋！',
    candidates: ['triangle-alert'],
    hasAccent: false,
  },
];

/** lucide 候補名 → 生 SVG マークアップ（currentColor は icon01 #5c6366 に固定済み。stroke-width は差し替え可能なよう保持） */
export const lucideSvgMarkup: Record<string, string> = {
  'arrow-down':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-arrow-down" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M12 5v14" /> <path d="m19 12-7 7-7-7" /> </svg>',
  'arrow-down-wide-narrow':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-arrow-down-wide-narrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m3 16 4 4 4-4" /> <path d="M7 20V4" /> <path d="M11 4h10" /> <path d="M11 8h7" /> <path d="M11 12h4" /> </svg>',
  'arrow-left':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-arrow-left" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m12 19-7-7 7-7" /> <path d="M19 12H5" /> </svg>',
  'arrow-right':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-arrow-right" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M5 12h14" /> <path d="m12 5 7 7-7 7" /> </svg>',
  'arrow-up':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-arrow-up" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m5 12 7-7 7 7" /> <path d="M12 19V5" /> </svg>',
  'arrow-up-down':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-arrow-up-down" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m21 16-4 4-4-4" /> <path d="M17 20V4" /> <path d="m3 8 4-4 4 4" /> <path d="M7 4v16" /> </svg>',
  'arrow-up-narrow-wide':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-arrow-up-narrow-wide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m3 8 4-4 4 4" /> <path d="M7 4v16" /> <path d="M11 12h4" /> <path d="M11 16h7" /> <path d="M11 20h10" /> </svg>',
  'badge-check':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-badge-check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /> <path d="m9 12 2 2 4-4" /> </svg>',
  ban: '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-ban" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10" /> <path d="M4.929 4.929 19.07 19.071" /> </svg>',
  bell: '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-bell" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M10.268 21a2 2 0 0 0 3.464 0" /> <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" /> </svg>',
  bookmark:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-bookmark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" /> </svg>',
  bot: '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-bot" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M12 8V4H8" /> <rect width="16" height="12" x="4" y="8" rx="2" /> <path d="M2 14h2" /> <path d="M20 14h2" /> <path d="M15 13v2" /> <path d="M9 13v2" /> </svg>',
  building:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-building" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M12 10h.01" /> <path d="M12 14h.01" /> <path d="M12 6h.01" /> <path d="M16 10h.01" /> <path d="M16 14h.01" /> <path d="M16 6h.01" /> <path d="M8 10h.01" /> <path d="M8 14h.01" /> <path d="M8 6h.01" /> <path d="M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" /> <rect x="4" y="2" width="16" height="20" rx="2" /> </svg>',
  calendar:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-calendar" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M8 2v4" /> <path d="M16 2v4" /> <rect width="18" height="18" x="3" y="4" rx="2" /> <path d="M3 10h18" /> </svg>',
  'calendar-1':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-calendar-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M11 14h1v4" /> <path d="M16 2v4" /> <path d="M3 10h18" /> <path d="M8 2v4" /> <rect x="3" y="4" width="18" height="18" rx="2" /> </svg>',
  'calendar-check':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-calendar-check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M8 2v4" /> <path d="M16 2v4" /> <rect width="18" height="18" x="3" y="4" rx="2" /> <path d="M3 10h18" /> <path d="m9 16 2 2 4-4" /> </svg>',
  'calendar-days':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-calendar-days" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M8 2v4" /> <path d="M16 2v4" /> <rect width="18" height="18" x="3" y="4" rx="2" /> <path d="M3 10h18" /> <path d="M8 14h.01" /> <path d="M12 14h.01" /> <path d="M16 14h.01" /> <path d="M8 18h.01" /> <path d="M12 18h.01" /> <path d="M16 18h.01" /> </svg>',
  'calendar-minus':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-calendar-minus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M16 19h6" /> <path d="M16 2v4" /> <path d="M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5" /> <path d="M3 10h18" /> <path d="M8 2v4" /> </svg>',
  'chart-area':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-chart-area" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M3 3v16a2 2 0 0 0 2 2h16" /> <path d="M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z" /> </svg>',
  'chart-column':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-chart-column" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M3 3v16a2 2 0 0 0 2 2h16" /> <path d="M18 17V9" /> <path d="M13 17V5" /> <path d="M8 17v-3" /> </svg>',
  'chart-line':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-chart-line" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M3 3v16a2 2 0 0 0 2 2h16" /> <path d="m19 9-5 5-4-4-3 3" /> </svg>',
  check:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M20 6 9 17l-5-5" /> </svg>',
  'chevron-down':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-chevron-down" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m6 9 6 6 6-6" /> </svg>',
  'chevron-left':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-chevron-left" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m15 18-6-6 6-6" /> </svg>',
  'chevron-right':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-chevron-right" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m9 18 6-6-6-6" /> </svg>',
  'chevron-up':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-chevron-up" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m18 15-6-6-6 6" /> </svg>',
  'chevrons-left':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-chevrons-left" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m11 17-5-5 5-5" /> <path d="m18 17-5-5 5-5" /> </svg>',
  'chevrons-right':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-chevrons-right" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m6 17 5-5-5-5" /> <path d="m13 17 5-5-5-5" /> </svg>',
  circle:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-circle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10" /> </svg>',
  'circle-alert':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-circle-alert" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10" /> <line x1="12" x2="12" y1="8" y2="12" /> <line x1="12" x2="12.01" y1="16" y2="16" /> </svg>',
  'circle-check':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-circle-check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10" /> <path d="m9 12 2 2 4-4" /> </svg>',
  'circle-dot':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-circle-dot" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10" /> <circle cx="12" cy="12" r="1" /> </svg>',
  'circle-help':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-circle-help" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10" /> <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /> <path d="M12 17h.01" /> </svg>',
  'circle-minus':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-circle-minus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10" /> <path d="M8 12h8" /> </svg>',
  'circle-plus':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-circle-plus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10" /> <path d="M8 12h8" /> <path d="M12 8v8" /> </svg>',
  'circle-user-round':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-circle-user-round" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M17.925 20.056a6 6 0 0 0-11.851.001" /> <circle cx="12" cy="11" r="4" /> <circle cx="12" cy="12" r="10" /> </svg>',
  'circle-x':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-circle-x" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10" /> <path d="m15 9-6 6" /> <path d="m9 9 6 6" /> </svg>',
  'clipboard-list':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-clipboard-list" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <rect width="8" height="4" x="8" y="2" rx="1" ry="1" /> <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /> <path d="M12 11h4" /> <path d="M12 16h4" /> <path d="M8 11h.01" /> <path d="M8 16h.01" /> </svg>',
  copy: '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-copy" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <rect width="14" height="14" x="8" y="8" rx="2" ry="2" /> <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /> </svg>',
  download:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-download" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M12 15V3" /> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /> <path d="m7 10 5 5 5-5" /> </svg>',
  ellipsis:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-ellipsis" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="1" /> <circle cx="19" cy="12" r="1" /> <circle cx="5" cy="12" r="1" /> </svg>',
  expand:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-expand" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m15 15 6 6" /> <path d="m15 9 6-6" /> <path d="M21 16v5h-5" /> <path d="M21 8V3h-5" /> <path d="M3 16v5h5" /> <path d="m3 21 6-6" /> <path d="M3 8V3h5" /> <path d="M9 9 3 3" /> </svg>',
  'external-link':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-external-link" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M15 3h6v6" /> <path d="M10 14 21 3" /> <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /> </svg>',
  eye: '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-eye" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /> <circle cx="12" cy="12" r="3" /> </svg>',
  'eye-off':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-eye-off" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" /> <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" /> <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" /> <path d="m2 2 20 20" /> </svg>',
  'file-check':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-file-check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /> <path d="M14 2v5a1 1 0 0 0 1 1h5" /> <path d="m9 15 2 2 4-4" /> </svg>',
  'file-down':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-file-down" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /> <path d="M14 2v5a1 1 0 0 0 1 1h5" /> <path d="M12 18v-6" /> <path d="m9 15 3 3 3-3" /> </svg>',
  'file-pen':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-file-pen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M12.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v9.34" /> <path d="M14 2v5a1 1 0 0 0 1 1h5" /> <path d="M10.378 12.622a1 1 0 0 1 3 3.003L8.36 20.637a2 2 0 0 1-.854.506l-2.867.837a.5.5 0 0 1-.62-.62l.836-2.869a2 2 0 0 1 .506-.853z" /> </svg>',
  'file-pen-line':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-file-pen-line" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M14.364 13.634a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 0 0-3.004-3.004z" /> <path d="M14.487 7.858A1 1 0 0 1 14 7V2" /> <path d="M20 19.645V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l2.516 2.516" /> <path d="M8 18h1" /> </svg>',
  'file-text':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-file-text" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /> <path d="M14 2v5a1 1 0 0 0 1 1h5" /> <path d="M10 9H8" /> <path d="M16 13H8" /> <path d="M16 17H8" /> </svg>',
  'file-up':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-file-up" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /> <path d="M14 2v5a1 1 0 0 0 1 1h5" /> <path d="M12 12v6" /> <path d="m15 15-3-3-3 3" /> </svg>',
  files:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-files" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" /> <path d="M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z" /> <path d="M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1" /> </svg>',
  film: '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-film" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <rect width="18" height="18" x="3" y="3" rx="2" /> <path d="M7 3v18" /> <path d="M3 7.5h4" /> <path d="M3 12h18" /> <path d="M3 16.5h4" /> <path d="M17 3v18" /> <path d="M17 7.5h4" /> <path d="M17 16.5h4" /> </svg>',
  flag: '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-flag" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528" /> </svg>',
  globe:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-globe" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10" /> <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /> <path d="M2 12h20" /> </svg>',
  'grip-vertical':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-grip-vertical" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="9" cy="12" r="1" /> <circle cx="9" cy="5" r="1" /> <circle cx="9" cy="19" r="1" /> <circle cx="15" cy="12" r="1" /> <circle cx="15" cy="5" r="1" /> <circle cx="15" cy="19" r="1" /> </svg>',
  house:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-house" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /> <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /> </svg>',
  image:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-image" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <rect width="18" height="18" x="3" y="3" rx="2" ry="2" /> <circle cx="9" cy="9" r="2" /> <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /> </svg>',
  info: '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-info" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10" /> <path d="M12 16v-4" /> <path d="M12 8h.01" /> </svg>',
  lightbulb:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-lightbulb" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /> <path d="M9 18h6" /> <path d="M10 22h4" /> </svg>',
  link: '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-link" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /> <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /> </svg>',
  list: '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-list" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M3 5h.01" /> <path d="M3 12h.01" /> <path d="M3 19h.01" /> <path d="M8 5h13" /> <path d="M8 12h13" /> <path d="M8 19h13" /> </svg>',
  'list-filter':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-list-filter" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M2 5h20" /> <path d="M6 12h12" /> <path d="M9 19h6" /> </svg>',
  lock: '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-lock" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /> <path d="M7 11V7a5 5 0 0 1 10 0v4" /> </svg>',
  'log-out':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-log-out" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m16 17 5-5-5-5" /> <path d="M21 12H9" /> <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /> </svg>',
  mail: '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-mail" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /> <rect x="2" y="4" width="20" height="16" rx="2" /> </svg>',
  'maximize-2':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-maximize-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M15 3h6v6" /> <path d="m21 3-7 7" /> <path d="m3 21 7-7" /> <path d="M9 21H3v-6" /> </svg>',
  menu: '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-menu" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M4 5h16" /> <path d="M4 12h16" /> <path d="M4 19h16" /> </svg>',
  'message-circle':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-message-circle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" /> </svg>',
  'message-circle-more':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-message-circle-more" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" /> <path d="M8 12h.01" /> <path d="M12 12h.01" /> <path d="M16 12h.01" /> </svg>',
  'message-square':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-message-square" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" /> </svg>',
  'message-square-more':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-message-square-more" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" /> <path d="M12 11h.01" /> <path d="M16 11h.01" /> <path d="M8 11h.01" /> </svg>',
  'messages-square':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-messages-square" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /> <path d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1" /> </svg>',
  mic: '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-mic" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M12 19v3" /> <path d="M19 10v2a7 7 0 0 1-14 0v-2" /> <rect x="9" y="2" width="6" height="13" rx="3" /> </svg>',
  'mic-off':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-mic-off" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M12 19v3" /> <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" /> <path d="M16.95 16.95A7 7 0 0 1 5 12v-2" /> <path d="M18.89 13.23A7 7 0 0 0 19 12v-2" /> <path d="m2 2 20 20" /> <path d="M9 9v3a3 3 0 0 0 5.12 2.12" /> </svg>',
  'minimize-2':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-minimize-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m14 10 7-7" /> <path d="M20 10h-6V4" /> <path d="m3 21 7-7" /> <path d="M4 14h6v6" /> </svg>',
  minus:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-minus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M5 12h14" /> </svg>',
  monitor:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-monitor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <rect width="20" height="14" x="2" y="3" rx="2" /> <line x1="8" x2="16" y1="21" y2="21" /> <line x1="12" x2="12" y1="17" y2="21" /> </svg>',
  'monitor-up':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-monitor-up" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m9 10 3-3 3 3" /> <path d="M12 13V7" /> <rect width="20" height="14" x="2" y="3" rx="2" /> <path d="M12 17v4" /> <path d="M8 21h8" /> </svg>',
  navigation:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-navigation" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <polygon points="3 11 22 2 13 21 11 13 3 11" /> </svg>',
  'panel-left':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-panel-left" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <rect width="18" height="18" x="3" y="3" rx="2" /> <path d="M9 3v18" /> </svg>',
  paperclip:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-paperclip" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" /> </svg>',
  pause:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-pause" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <rect x="14" y="3" width="5" height="18" rx="1" /> <rect x="5" y="3" width="5" height="18" rx="1" /> </svg>',
  pencil:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-pencil" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /> <path d="m15 5 4 4" /> </svg>',
  'picture-in-picture-2':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-picture-in-picture-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4" /> <rect width="10" height="7" x="12" y="13" rx="2" /> </svg>',
  play: '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-play" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" /> </svg>',
  plus: '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-plus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M5 12h14" /> <path d="M12 5v14" /> </svg>',
  presentation:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-presentation" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M2 3h20" /> <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" /> <path d="m7 21 5-5 5 5" /> </svg>',
  repeat:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-repeat" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m17 2 4 4-4 4" /> <path d="M3 11v-1a4 4 0 0 1 4-4h14" /> <path d="m7 22-4-4 4-4" /> <path d="M21 13v1a4 4 0 0 1-4 4H3" /> </svg>',
  'rotate-cw':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-rotate-cw" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" /> <path d="M21 3v5h-5" /> </svg>',
  search:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-search" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m21 21-4.34-4.34" /> <circle cx="11" cy="11" r="8" /> </svg>',
  send: '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-send" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /> <path d="m21.854 2.147-10.94 10.939" /> </svg>',
  settings:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-settings" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" /> <circle cx="12" cy="12" r="3" /> </svg>',
  'share-2':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-share-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="18" cy="5" r="3" /> <circle cx="6" cy="12" r="3" /> <circle cx="18" cy="19" r="3" /> <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /> <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /> </svg>',
  'shield-check':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-shield-check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /> <path d="m9 12 2 2 4-4" /> </svg>',
  shrink:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-shrink" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m15 15 6 6m-6-6v4.8m0-4.8h4.8" /> <path d="M9 19.8V15m0 0H4.2M9 15l-6 6" /> <path d="M15 4.2V9m0 0h4.8M15 9l6-6" /> <path d="M9 4.2V9m0 0H4.2M9 9 3 3" /> </svg>',
  shuffle:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-shuffle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m18 14 4 4-4 4" /> <path d="m18 2 4 4-4 4" /> <path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22" /> <path d="M2 6h1.972a4 4 0 0 1 3.6 2.2" /> <path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" /> </svg>',
  signal:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-signal" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M2 20h.01" /> <path d="M7 20v-4" /> <path d="M12 20v-8" /> <path d="M17 20V8" /> <path d="M22 4v16" /> </svg>',
  'signal-low':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-signal-low" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M2 20h.01" /> <path d="M7 20v-4" /> </svg>',
  'signal-zero':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-signal-zero" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M2 20h.01" /> </svg>',
  'sliders-horizontal':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-sliders-horizontal" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M10 5H3" /> <path d="M12 19H3" /> <path d="M14 3v4" /> <path d="M16 17v4" /> <path d="M21 12h-9" /> <path d="M21 19h-5" /> <path d="M21 5h-7" /> <path d="M8 10v4" /> <path d="M8 12H3" /> </svg>',
  sparkle:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-sparkle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" /> </svg>',
  sparkles:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-sparkles" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" /> <path d="M20 2v4" /> <path d="M22 4h-4" /> <circle cx="4" cy="20" r="2" /> </svg>',
  stamp:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-stamp" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-6 0c0 2 1 2 1 3.5V13" /> <path d="M20 15.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1z" /> <path d="M5 22h14" /> </svg>',
  star: '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-star" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /> </svg>',
  table:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-table" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M12 3v18" /> <rect width="18" height="18" x="3" y="3" rx="2" /> <path d="M3 9h18" /> <path d="M3 15h18" /> </svg>',
  target:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-target" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10" /> <circle cx="12" cy="12" r="6" /> <circle cx="12" cy="12" r="2" /> </svg>',
  timer:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-timer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <line x1="10" x2="14" y1="2" y2="2" /> <line x1="12" x2="15" y1="14" y2="11" /> <circle cx="12" cy="14" r="8" /> </svg>',
  'trash-2':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-trash-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M10 11v6" /> <path d="M14 11v6" /> <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /> <path d="M3 6h18" /> <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /> </svg>',
  triangle:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-triangle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /> </svg>',
  'triangle-alert':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-triangle-alert" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /> <path d="M12 9v4" /> <path d="M12 17h.01" /> </svg>',
  upload:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-upload" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M12 3v12" /> <path d="m17 8-5-5-5 5" /> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /> </svg>',
  user: '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-user" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /> <circle cx="12" cy="7" r="4" /> </svg>',
  'user-check':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-user-check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m16 11 2 2 4-4" /> <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /> <circle cx="9" cy="7" r="4" /> </svg>',
  'user-minus':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-user-minus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /> <circle cx="9" cy="7" r="4" /> <line x1="22" x2="16" y1="11" y2="11" /> </svg>',
  'user-plus':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-user-plus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /> <circle cx="9" cy="7" r="4" /> <line x1="19" x2="19" y1="8" y2="14" /> <line x1="22" x2="16" y1="11" y2="11" /> </svg>',
  'user-round':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-user-round" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="8" r="5" /> <path d="M20 21a8 8 0 0 0-16 0" /> </svg>',
  users:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-users" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /> <path d="M16 3.128a4 4 0 0 1 0 7.744" /> <path d="M22 21v-2a4 4 0 0 0-3-3.87" /> <circle cx="9" cy="7" r="4" /> </svg>',
  'users-round':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-users-round" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M18 21a8 8 0 0 0-16 0" /> <circle cx="10" cy="8" r="5" /> <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" /> </svg>',
  video:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-video" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" /> <rect x="2" y="6" width="14" height="12" rx="2" /> </svg>',
  'video-off':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-video-off" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196" /> <path d="M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" /> <path d="m2 2 20 20" /> </svg>',
  'volume-1':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-volume-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" /> <path d="M16 9a5 5 0 0 1 0 6" /> </svg>',
  'volume-2':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-volume-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" /> <path d="M16 9a5 5 0 0 1 0 6" /> <path d="M19.364 18.364a9 9 0 0 0 0-12.728" /> </svg>',
  'volume-off':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-volume-off" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M16 9a5 5 0 0 1 .95 2.293" /> <path d="M19.364 5.636a9 9 0 0 1 1.889 9.96" /> <path d="m2 2 20 20" /> <path d="m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11" /> <path d="M9.828 4.172A.686.686 0 0 1 11 4.657v.686" /> </svg>',
  'volume-x':
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-volume-x" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" /> <line x1="22" x2="16" y1="9" y2="15" /> <line x1="16" x2="22" y1="9" y2="15" /> </svg>',
  waypoints:
    '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-waypoints" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m10.586 5.414-5.172 5.172" /> <path d="m18.586 13.414-5.172 5.172" /> <path d="M6 12h12" /> <circle cx="12" cy="20" r="2" /> <circle cx="12" cy="4" r="2" /> <circle cx="20" cy="12" r="2" /> <circle cx="4" cy="12" r="2" /> </svg>',
  x: '<!-- @license lucide-static v1.25.0 - ISC --> <svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5c6366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M18 6 6 18" /> <path d="m6 6 12 12" /> </svg>',
};
