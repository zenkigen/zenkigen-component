import { useCallback, useState } from 'react';

import { Checkbox } from './checkbox';

export default {
  component: Checkbox,
};

export function Base() {
  const [isCheck, setCheck] = useState(false);

  const [isIndeterminate, setIndeterminate] = useState(false);

  const handleCheckbox = useCallback(() => {
    setCheck((state) => !state);
  }, []);

  const handleIndeterminateCheckbox = useCallback(() => {
    setIndeterminate((state) => !state);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-10">
        <Checkbox
          id="1"
          label="Checkbox"
          onChange={handleCheckbox}
          isIndeterminate={isIndeterminate}
          isChecked={isCheck}
          color="default"
        />

        <Checkbox
          id="2"
          label="Switch to indeterminate"
          onChange={handleIndeterminateCheckbox}
          isChecked={isIndeterminate}
          color="default"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-10">
          <Checkbox id="1" label="Checkbox" />
          <Checkbox id="1" label="Checkbox" isChecked />
          <Checkbox id="2" label="Checkbox" isChecked isIndeterminate />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-10">
          <Checkbox id="1" label="Checkbox" color="gray" />
          <Checkbox id="1" label="Checkbox" isChecked color="gray" />
          <Checkbox id="2" label="Checkbox" isChecked isIndeterminate color="gray" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-10">
          <Checkbox id="1" label="Checkbox" color="error" />
          <Checkbox id="1" label="Checkbox" isChecked color="error" />
          <Checkbox id="2" label="Checkbox" isChecked isIndeterminate color="error" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-10">
          <Checkbox id="1" label="Checkbox" isDisabled />
          <Checkbox id="1" label="Checkbox" isChecked isDisabled />
          <Checkbox id="2" label="Checkbox" isChecked isIndeterminate isDisabled />
        </div>
      </div>

      <div className="flex gap-10">
        <Checkbox />
        <Checkbox isChecked />
        <Checkbox isChecked isIndeterminate />
      </div>
    </div>
  );
}
