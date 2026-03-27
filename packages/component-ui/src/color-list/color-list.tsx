import React from 'react';

import { useColorList } from '../hooks/use-color-list';

type Props = {
  members: number;
  saturation: number;
  brightness: number;
  className?: string;
};

export const ColorList = ({ members, saturation, brightness }: Props) => {
  const [sortedColors] = useColorList({ members, saturation, brightness });

  return (
    <div className="flex flex-wrap gap-10">
      {sortedColors?.map((item) => (
        <div key={item.id} className="flex flex-col items-center gap-2">
          <div className="size-10 rounded-full" style={{ backgroundColor: item.color }}></div>
          <div className="text-xs text-gray-500">{item.color}</div>
        </div>
      ))}
    </div>
  );
};
