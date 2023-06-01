import { action } from '@storybook/addon-actions';

import { Toast } from '.';

export default {
  component: Toast,
};

export function Base() {
  return (
    <div className="flex flex-col gap-2">
      <Toast state="success" onClickClose={action('閉じる')} width="475px">
        テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
      </Toast>
      <Toast state="error" onClickClose={action('閉じる')} width="475px">
        テキスト
      </Toast>
      <Toast state="warning" onClickClose={action('閉じる')} width="475px">
        テキスト
      </Toast>
      <Toast state="information" onClickClose={action('閉じる')}>
        テキスト
      </Toast>
      <Toast state="success" onClickClose={action('閉じる')}>
        テキスト
      </Toast>
      <Toast state="error" onClickClose={action('閉じる')}>
        テキスト
      </Toast>
      <Toast state="warning" onClickClose={action('閉じる')}>
        テキスト
      </Toast>
      <Toast state="information" onClickClose={action('閉じる')}>
        テキスト
      </Toast>
    </div>
  );
}
