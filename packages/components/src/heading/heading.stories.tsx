import { Button } from '../button';
import { Icon } from '../icon';

import { Heading } from '.';

export default {
  component: Heading,
};

export function Base() {
  return (
    <div style={{ display: 'grid', gap: '30px' }}>
      <Heading
        level={1}
        before={<Icon name="chart-bar" size="huge" />}
        after={<Icon name="information" size="large" />}
      >
        タイトル
      </Heading>
      <Heading
        level={2}
        before={<Icon name="chart-bar" size="huge" />}
        after={<Icon name="information" size="large" />}
      >
        タイトル
      </Heading>
      <Heading level={3} before={<Icon name="chart-bar" size="huge" />} after={<Icon name="information" />}>
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
      <Heading
        level={2}
        before={<Icon name="chart-bar" size="huge" />}
        after={
          <Button variant="outline" before={<Icon name="add" size="medium" />}>
            追加ボタン
          </Button>
        }
      >
        <div className="mr-auto">タイトル</div>
      </Heading>
    </div>
  );
}
