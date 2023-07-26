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
      <div className="mb-6">
        <Checkbox
          id="1"
          label="Checkbox"
          onChange={handleCheckbox}
          isIndeterminate={isIndeterminate}
          isChecked={isCheck}
          color="default"
        />
      </div>
      <div className="mb-6">
        <Checkbox
          id="2"
          label="Switch to indeterminate"
          onChange={handleIndeterminateCheckbox}
          isChecked={isIndeterminate}
          color="default"
        />
      </div>
      <div className="mb-6">
        <Checkbox
          id="1"
          label="Checkbox"
          onChange={handleCheckbox}
          isIndeterminate={isIndeterminate}
          isChecked={isCheck}
          color="gray"
        />
      </div>
      <div className="mb-6">
        <Checkbox
          id="2"
          label="Switch to indeterminate"
          onChange={handleIndeterminateCheckbox}
          isChecked={isIndeterminate}
          color="gray"
        />
      </div>
      <div className="mb-6">
        <Checkbox
          id="1"
          label="Checkbox"
          onChange={handleCheckbox}
          isIndeterminate={isIndeterminate}
          isChecked={isCheck}
          color="error"
        />
      </div>
      <div className="mb-6">
        <Checkbox
          id="2"
          label="Switch to indeterminate"
          onChange={handleIndeterminateCheckbox}
          isChecked={isIndeterminate}
          color="error"
        />
      </div>
      <div className="mb-6">
        <Checkbox
          id="1"
          label="Checkbox"
          onChange={handleCheckbox}
          isIndeterminate={isIndeterminate}
          isChecked={isCheck}
          isDisabled
        />
      </div>
      <div className="mb-6">
        <Checkbox
          id="2"
          label="Switch to indeterminate"
          onChange={handleIndeterminateCheckbox}
          isChecked={isIndeterminate}
          isDisabled
        />
      </div>
    </ul>
  );
}
