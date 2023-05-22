import type { Meta, StoryObj } from '@storybook/react';

import { TableContainer, TableRowContainer, TableHeading, TableCell } from '.';

const meta: Meta<typeof TableContainer> = {
  component: TableContainer,
};

export default meta;
type Story = StoryObj<typeof TableContainer>;

const TableStoryBasic = () => {
  return (
    <div className="flex items-center">
      <TableContainer rows="repeat(4, 1fr)" columns="repeat(4, 1fr)">
        <TableRowContainer>
          <TableHeading>項目1</TableHeading>
          <TableHeading>項目2</TableHeading>
          <TableHeading>項目3</TableHeading>
          <TableHeading>項目4</TableHeading>
        </TableRowContainer>
        <TableRowContainer>
          <TableCell>アイテム1</TableCell>
          <TableCell>アイテム2</TableCell>
          <TableCell>アイテム3</TableCell>
          <TableCell>アイテム4</TableCell>
        </TableRowContainer>
        <TableRowContainer>
          <TableCell>アイテム1</TableCell>
          <TableCell>アイテム2</TableCell>
          <TableCell>アイテム3</TableCell>
          <TableCell>アイテム4</TableCell>
        </TableRowContainer>
        <TableRowContainer>
          <TableCell>アイテム1</TableCell>
          <TableCell>アイテム2</TableCell>
          <TableCell>アイテム3</TableCell>
          <TableCell>アイテム4</TableCell>
        </TableRowContainer>
      </TableContainer>
    </div>
  );
};

export const Base: Story = {
  render: () => <TableStoryBasic />,
};
