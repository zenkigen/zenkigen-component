import { SelectOption } from './select';

import { Select } from '.';

export default {
  component: Select,
};

export function Base() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '80px', marginBottom: '200px' }}>
        <Select size="small" variant="outline" options={optionsList1} />
        <Select size="small-medium" variant="outline" options={optionsList1} />
        <Select size="medium" variant="outline" options={optionsList1} />
        <Select size="large" variant="outline" options={optionsList1} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
        <Select size="small" variant="text" options={optionsList1} />
        <Select size="small-medium" variant="text" options={optionsList1} />
        <Select size="medium" variant="text" options={optionsList1} />
        <Select size="large" variant="text" options={optionsList1} />
      </div>
    </div>
  );
}

const optionsList1 = [
  { id: '1', value: '発話比率', icon: 'add' },
  { id: '2', value: '体の向き', icon: 'add' },
  { id: '3', value: '笑顔度', icon: 'add' },
] as SelectOption[];
