import type { Meta } from '@storybook/react';

import { Breadcrumb } from '.';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
};

export default meta;

const breadcrumbList = [
  { key: 1, label: 'ホーム', href: '/' },
  { key: 2, label: '2層目', href: '/about' },
  { key: 3, label: '3層目' },
  { key: 4, label: '4層目' },
];

export function Base() {
  return (
    <Breadcrumb>
      {breadcrumbList.map((item) => (
        <Breadcrumb.Item key={item.key}>
          {item.href != null ? <a href={item.href}>{item.label}</a> : item.label}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}
