import { useEffect } from 'react';

import { Icon } from '../icon';
import { easeTypesOptionsList } from '../view-transition/Form/form';
import { useViewTransition, ViewTransitionProvider } from '../view-transition/view-transition-provider';
import { Button } from '.';

export default {
  component: Button,
  decorators: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Story: any) => (
      <ViewTransitionProvider>
        <Story />
      </ViewTransitionProvider>
    ),
  ],
};

export function Base() {
  return (
    <div>
      <ButtonList />
    </div>
  );
}

export function TransitionTest() {
  const { dispatch } = useViewTransition();

  useEffect(() => {
    dispatch({
      type: 'Reset',
      payload: {
        count: 2,
        list: [
          {
            valueLabel: 'MouseOn：単位ms',
            value: '70',
            option: easeTypesOptionsList[8],
          },
          {
            valueLabel: 'MouseOut：単位ms',
            value: '70',
            option: easeTypesOptionsList[8],
          },
        ],
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ButtonList />
    </div>
  );
}

function ButtonList() {
  return (
    <div>
      <div className="mt-2 flex items-center gap-2">
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
        <Button size="small" before={<Icon name="add" size="small" />} isSelected>
          ボタンラベル
        </Button>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <Button>ボタンラベル</Button>
        <Button before={<Icon name="add" size="small" />}>ボタンラベル</Button>
        <Button after={<Icon name="add" size="small" />}>ボタンラベル</Button>
        <Button isDisabled>ボタンラベル</Button>
        <Button before={<Icon name="add" size="small" />} isSelected>
          ボタンラベル
        </Button>
      </div>
      <div className="mt-2 flex items-center gap-2">
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
        <Button size="large" before={<Icon name="add" size="medium" />} isSelected>
          ボタンラベル
        </Button>
      </div>
      <div className="mt-2 flex items-center gap-2">
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
        <Button size="small" variant="fillDanger" before={<Icon name="add" size="small" />} isSelected>
          ボタンラベル
        </Button>
      </div>
      <div className="mt-2 flex items-center gap-2">
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
        <Button variant="fillDanger" before={<Icon name="add" size="small" />} isSelected>
          ボタンラベル
        </Button>
      </div>
      <div className="mt-2 flex items-center gap-2">
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
        <Button size="large" variant="fillDanger" before={<Icon name="add" size="small" />} isSelected>
          ボタンラベル
        </Button>
      </div>
      <div className="mt-2 flex items-center gap-2">
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
        <Button variant="outline" size="small" before={<Icon name="add" size="small" />} isSelected>
          ボタンラベル
        </Button>
      </div>
      <div className="mt-2 flex items-center gap-2">
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
        <Button variant="outline" before={<Icon name="add" size="small" />} isSelected>
          ボタンラベル
        </Button>
      </div>
      <div className="mt-2 flex items-center gap-2">
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
        <Button variant="outline" size="large" before={<Icon name="add" size="small" />} isSelected>
          ボタンラベル
        </Button>
      </div>
      <div className="mt-2 flex items-center gap-2">
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
        <Button variant="text" size="small" before={<Icon name="add" size="small" />} isSelected>
          ボタンラベル
        </Button>
      </div>
      <div className="mt-2 flex items-center gap-2">
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
        <Button variant="text" before={<Icon name="add" size="small" />} isSelected>
          ボタンラベル
        </Button>
      </div>
      <div className="mt-2 flex items-center gap-2">
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
        <Button variant="text" size="large" before={<Icon name="add" size="small" />} isSelected>
          ボタンラベル
        </Button>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <Button elementAs="button" width={300} borderRadius={9999}>
          ボタンラベル
        </Button>
        <Button elementAs="button" type="submit" width={300} borderRadius={9999}>
          ボタンラベル
        </Button>
        <Button elementAs="a" width={300} borderRadius={9999} href="">
          ボタンラベル
        </Button>
      </div>
    </div>
  );
}
