import { Breadcrumb } from '.';

export default { component: Breadcrumb };

export function Base() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <a href="/">ホーム</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="/about">2層目</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item isLast>3層目</Breadcrumb.Item>
    </Breadcrumb>
  );
}
