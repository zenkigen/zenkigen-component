import { Avatar } from '.';

export default {
  component: Avatar,
};

export function Base() {
  return (
    <div className="flex gap-2 flex-col">
      <div className="flex gap-2">
        <Avatar size="x-small" userId={1} name="全機現太郎" />
        <Avatar size="small" userId={1} name="全機現太郎" />
        <Avatar size="medium" userId={1} name="全機現太郎" />
        <Avatar size="large" userId={1} name="全機現太郎" />
        <Avatar size="x-large" userId={1} name="全機現太郎" />
      </div>
      <div className="flex gap-2">
        <Avatar size="medium" userId={1} name="全機現太郎" />
        <Avatar size="medium" userId={2} name="全機現太郎" />
        <Avatar size="medium" userId={3} name="全機現太郎" />
        <Avatar size="medium" userId={4} name="全機現太郎" />
        <Avatar size="medium" userId={5} name="全機現太郎" />
        <Avatar size="medium" userId={6} name="全機現太郎" />
        <Avatar size="medium" userId={7} name="全機現太郎" />
        <Avatar size="medium" userId={8} name="全機現太郎" />
        <Avatar size="medium" userId={9} name="全機現太郎" />
        <Avatar size="medium" userId={10} name="全機現太郎" />
      </div>
    </div>
  );
}
