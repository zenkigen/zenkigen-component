import { Breadcrumb } from '.';

export default { component: Breadcrumb };

export function Base() {
  return (
    <Breadcrumb>
      <a href="/">ホーム</a>
      <a href="/about">2層目</a>
      3層目
    </Breadcrumb>
  );
}
