import { typography } from '@zenkigen/component-theme';
import { clsx } from 'clsx';

import { Avatar } from '../avatar';
import { Button } from '../button';
import { Icon } from '../icon';

import { Heading } from '.';

export default {
  component: Heading,
};

export function Base() {
  return (
    <div style={{ display: 'grid', gap: '30px' }}>
      <Heading level={1} before={<Icon name="chart-bar" size="x-large" />} after={<Icon name="information" />}>
        タイトル
      </Heading>
      <Heading level={2} before={<Icon name="chart-bar" size="large" />} after={<Icon name="information" />}>
        タイトル
      </Heading>
      <Heading
        level={3}
        before={<Icon name="chart-bar" size="large" />}
        after={<Icon name="information" size="small" />}
      >
        タイトル
      </Heading>
      <Heading
        level={4}
        before={<Icon name="chart-bar" size="small" />}
        after={<Icon name="information" size="small" />}
      >
        タイトル
      </Heading>
      <Heading
        level={5}
        before={<Icon name="chart-bar" size="small" />}
        after={<Icon name="information" size="small" />}
      >
        タイトル
      </Heading>
      <Heading level={3}>タイトル</Heading>
      <Heading
        level={2}
        before={<Icon name="chart-bar" size="large" />}
        after={
          <Button variant="outline" before={<Icon name="add" size="medium" />}>
            追加ボタン
          </Button>
        }
      >
        <div className="mr-auto">タイトル</div>
      </Heading>
      <Heading level={2} before={<Avatar size="small" userId={1} lastName="全機現" firstName="太郎" />}>
        <div className="flex items-end gap-1">
          全機現太郎<span className={clsx(typography.label.label1bold, 'mb-1')}>さん</span>
        </div>
      </Heading>
    </div>
  );
}
