import { Breadcrumb } from '.';

export default { component: Breadcrumb };

const breadcrumbList = [
  { key: 1, label: 'ホーム', href: '/' },
  { key: 2, label: '2層目', href: '/about' },
  { key: 3, label: '3層目' },
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
