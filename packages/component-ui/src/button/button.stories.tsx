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
        <Button size="large" before={<Icon name="add" size="medium" />}>
          ボタンラベル
        </Button>
        <Button size="large" after={<Icon name="add" size="medium" />}>
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
        <Button size="small" variant="fillDanger">
          ボタンラベル
        </Button>
        <Button size="small" variant="fillDanger" before={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button size="small" variant="fillDanger" after={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button size="small" variant="fillDanger" isDisabled>
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
        <Button variant="fillDanger">ボタンラベル</Button>
        <Button variant="fillDanger" before={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button variant="fillDanger" after={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button variant="fillDanger" isDisabled>
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
        <Button size="large" variant="fillDanger">
          ボタンラベル
        </Button>
        <Button size="large" variant="fillDanger" before={<Icon name="add" size="medium" />}>
          ボタンラベル
        </Button>
        <Button size="large" variant="fillDanger" after={<Icon name="add" size="medium" />}>
          ボタンラベル
        </Button>
        <Button size="large" variant="fillDanger" isDisabled>
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
        <Button variant="outline" size="small">
          ボタンラベル
        </Button>
        <Button variant="outline" size="small" before={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button variant="outline" size="small" after={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button variant="outline" size="small" isDisabled>
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
        <Button variant="outline">ボタンラベル</Button>
        <Button variant="outline" before={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button variant="outline" after={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button variant="outline" isDisabled>
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
        <Button variant="outline" size="large">
          ボタンラベル
        </Button>
        <Button variant="outline" size="large" before={<Icon name="add" size="medium" />}>
          ボタンラベル
        </Button>
        <Button variant="outline" size="large" after={<Icon name="add" size="medium" />}>
          ボタンラベル
        </Button>
        <Button variant="outline" size="large" isDisabled>
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
        <Button variant="text" size="small">
          ボタンラベル
        </Button>
        <Button variant="text" size="small" before={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button variant="text" size="small" after={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button variant="text" size="small" isDisabled>
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
        <Button variant="text">ボタンラベル</Button>
        <Button variant="text" before={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button variant="text" after={<Icon name="add" size="small" />}>
          ボタンラベル
        </Button>
        <Button variant="text" isDisabled>
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
        <Button variant="text" size="large">
          ボタンラベル
        </Button>
        <Button variant="text" size="large" before={<Icon name="add" size="medium" />}>
          ボタンラベル
        </Button>
        <Button variant="text" size="large" after={<Icon name="add" size="medium" />}>
          ボタンラベル
        </Button>
        <Button variant="text" size="large" isDisabled>
          ボタンラベル
        </Button>
      </div>
    </div>
  );
}
