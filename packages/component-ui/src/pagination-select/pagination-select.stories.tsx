import { useState } from 'react';

import { PaginationSelect } from '.';

export default {
  component: PaginationSelect,
};

export function Base() {
  const total = 127;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const total2 = 1234;
  const [currentPage2, setCurrentPage2] = useState<number>(1);

  return (
    <>
      <div>{total}件、10件づつの場合：</div>
      <br />
      <PaginationSelect
        total={total}
        currentPage={currentPage}
        pageLimit={10}
        countLabel="人"
        onChange={(value) => setCurrentPage(value)}
      ></PaginationSelect>
      <br />
      <hr />
      <div>{total2}件、100件づつの場合：</div>
      <br />
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px' }}>
        <div>結果：{total2}人</div>
        <div>
          <PaginationSelect
            total={total2}
            currentPage={currentPage2}
            pageLimit={100}
            countLabel="人"
            onChange={(value) => setCurrentPage2(value)}
          ></PaginationSelect>
        </div>
      </div>
    </>
  );
}
