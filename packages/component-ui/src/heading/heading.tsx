import type { ReactNode } from 'react';

import { typography } from '@zenkigen-inc/component-theme';
import { clsx } from 'clsx';

type Level = 1 | 2 | 3 | 4 | 5;

type Props = {
  /** DOMの見出しレベル（`<h1>`〜`<h5>`）を指定する */
  level: Level;
  /** 見出しテキストの前に配置するアイコンやアバターなど */
  before?: ReactNode;
  /** 見出しテキストの後に配置する補助アクションやラベル */
  after?: ReactNode;
  /** 表示する見出しコンテンツ */
  children?: ReactNode;
};

export function Heading(props: Props) {
  const TagName = `h${props.level}` as const;

  const classes = clsx(
    'flex',
    'items-center',
    'text-text-text01',
    typography.heading[TagName],
    { 'gap-2': props.level === 1 },
    { 'gap-1': props.level > 1 },
  );

  return (
    <TagName className={classes}>
      {props.before}
      {props.children}
      {props.after}
    </TagName>
  );
}
