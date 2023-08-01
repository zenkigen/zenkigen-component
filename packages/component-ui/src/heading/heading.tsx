import { ReactNode } from 'react';

import { typography } from '@zenkigen-inc/component-theme';
import { clsx } from 'clsx';

type Level = 1 | 2 | 3 | 4 | 5;

type Props = {
  level: Level;
  before?: ReactNode;
  after?: ReactNode;
  children?: ReactNode;
};

export function Heading(props: Props) {
  const TagName = `h${props.level}` as const;

  const classes = clsx(
    'flex',
    'items-center',
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
