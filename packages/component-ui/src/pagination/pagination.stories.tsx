import { useState } from 'react';

import { Pagination } from '.';

export default {
  component: Pagination,
};

export function Base() {
  const [current, setCurrent] = useState(7);

  const handleClick = (value: number) => {
    setCurrent(value);
  };

  return (
    <div>
      <div className="mb-6">
        <Pagination
          current={current}
          total={10}
          onClick={(value) => {
            handleClick(value);
          }}
        />
      </div>
    </div>
  );
}
