import { useCallback, useState } from 'react';

import { Checkbox } from './checkbox';

export default {
  component: Checkbox,
};
export function Base() {
  const [isCheck, setCheck] = useState(false);

  const [isIndeterminate, setIndeterminate] = useState(false);

  const handleCheckbox = useCallback(() => {
    setCheck((state) => (isIndeterminate ? false : !state));
    setIndeterminate(false);
  }, [isIndeterminate]);

  const handleIndeterminateCheckbox = useCallback(() => {
    setIndeterminate(!isIndeterminate);
  }, [isIndeterminate]);

  return (
    <ul>
      <div
        style={{
          marginBottom: '24px',
        }}
      >
        <Checkbox
          id="1"
          label="Checkbox"
          handleOnChange={handleCheckbox}
          isIndeterminate={isIndeterminate}
          isChecked={isCheck}
          color="default"
        />
      </div>
      <div
        style={{
          marginBottom: '24px',
        }}
      >
        <Checkbox
          id="2"
          label="Switch to indeterminate"
          handleOnChange={handleIndeterminateCheckbox}
          isChecked={isIndeterminate}
          color="default"
        />
      </div>
    </ul>
  );
}
