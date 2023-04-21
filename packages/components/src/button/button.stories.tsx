import { Icon } from '../icon';

import { Button } from '.';

export default { component: Button };
export function Base() {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}
      >
        <Button size="small">ボタンラベル</Button>
        <Button size="small" before={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button size="small" after={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button size="small" isDisabled>
          ボタンラベル
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <Button>ボタンラベル</Button>
        <Button before={<Icon name="add" size="small" />}>ボタンラベル</Button>
        <Button after={<Icon name="add" size="small" />}>ボタンラベル</Button>
        <Button isDisabled>ボタンラベル</Button>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <Button size="large">ボタンラベル</Button>
        <Button size="large" before={<Icon name="add" size="large" />}>
          ボタンラベル
        </Button>
        <Button size="large" after={<Icon name="add" size="large" />}>
          ボタンラベル
        </Button>
        <Button size="large" isDisabled>
          ボタンラベル
        </Button>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <Button style="outline" size="small">
          ボタンラベル
        </Button>
        <Button style="outline" size="small" before={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button style="outline" size="small" after={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button style="outline" size="small" isDisabled>
          ボタンラベル
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <Button style="outline">ボタンラベル</Button>
        <Button style="outline" before={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button style="outline" after={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button style="outline" isDisabled>
          ボタンラベル
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <Button style="outline" size="large">
          ボタンラベル
        </Button>
        <Button style="outline" size="large" before={<Icon name="add" size="large" />}>
          ボタンラベル
        </Button>
        <Button style="outline" size="large" after={<Icon name="add" size="large" />}>
          ボタンラベル
        </Button>
        <Button style="outline" size="large" isDisabled>
          ボタンラベル
        </Button>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <Button style="text" size="small">
          ボタンラベル
        </Button>
        <Button style="text" size="small" before={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button style="text" size="small" after={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button style="text" size="small" isDisabled>
          ボタンラベル
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <Button style="text">ボタンラベル</Button>
        <Button style="text" before={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button style="text" after={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button style="text" isDisabled>
          ボタンラベル
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <Button style="text" size="large">
          ボタンラベル
        </Button>
        <Button style="text" size="large" before={<Icon name="add" size="large" />}>
          ボタンラベル
        </Button>
        <Button style="text" size="large" after={<Icon name="add" size="large" />}>
          ボタンラベル
        </Button>
        <Button style="text" size="large" isDisabled>
          ボタンラベル
        </Button>
      </div>
    </div>
  );
}
