import { Icon } from '../icon';

import { Button } from '.';

export default { component: Button };
export const Base = { args: { children: 'ボタンラベル' } };
export const HasBeforeIcon = { args: { before: <Icon name="add" />, children: 'ボタンラベル' } };
export const HasAfterIcon = { args: { after: <Icon name="add" />, children: 'ボタンラベル' } };
export const IconOnly = { args: { after: <Icon name="add" /> } };
