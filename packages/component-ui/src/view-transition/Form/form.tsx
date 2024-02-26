import React, { useEffect, useState } from 'react';

import type { SelectOption } from '../../select';
import { Select } from '../../select';
import { TextInput } from '../../text-input';

type KeyValue = { [key: string]: string };
const easeTypes: KeyValue = {
  linear: 'cubic-bezier(0.0, 0.0, 1.0, 1.0)',
  '▼ easeOut': 'cubic-bezier(0.39, 0.575, 0.565, 1)',
  easeOutSine: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
  easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  easeOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  easeOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
  easeOutExpo: 'cubic-bezier(0.19, 1, 0.22, 1)',
  easeOutCirc: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
  '▼ easeIn': 'cubic-bezier(0.47, 0, 0.745, 0.715)',
  easeInSine: 'cubic-bezier(0.47, 0, 0.745, 0.715)',
  easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  easeInQuart: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
  easeInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
  easeInExpo: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
  easeInCirc: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
  '▼ easeInOut': 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
  easeInOutSine: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
  easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  easeinOutQuart: 'cubic-bezier(0.77, 0, 0.175, 1)',
  easeInOutQuint: 'cubic-bezier(0.86, 0, 0.07, 1)',
  easeInOutExpo: 'cubic-bezier(1, 0, 0, 1)',
  easeInOutCirc: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
  '▼ easeXXBack': 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  easeInBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  easeInOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

export const easeTypesOptionsList: SelectOption[] = [];
let i = 0;
for (const key in easeTypes) {
  const value = easeTypes[key]!;
  easeTypesOptionsList.push({ id: (i++).toString(), label: key, value: value });
}

type Props = {
  valueLabel?: string;
  value?: string;
  option?: SelectOption;
  onChangeValue: (value: string) => void;
  onChangeSelectOption: (option: SelectOption) => void;
};

export function Form({ valueLabel, value, option, onChangeValue, onChangeSelectOption }: Props) {
  const [optionList, setOptionList] = useState<SelectOption[]>([]);

  useEffect(() => {
    setOptionList(easeTypesOptionsList);
  }, []);

  return (
    <>
      <div className="flex w-full">
        <div className="basis-1/2">{valueLabel}</div>
        <div className="basis-1/2">
          <TextInput onChange={(event) => onChangeValue(event.target.value)} value={value ?? ''}></TextInput>
        </div>
      </div>
      <div>
        <Select
          size="small"
          variant="outline"
          placeholder="選択"
          optionListMaxHeight="250px"
          selectedOption={option ? option : optionList[0]}
          onChange={(option) => {
            if (option) onChangeSelectOption(option);
          }}
        >
          {optionList.map((option) => (
            <Select.Option key={option.id} option={option} />
          ))}
        </Select>
      </div>
    </>
  );
}
