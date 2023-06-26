import { Avatar } from '.';

export default {
  component: Avatar,
};

export function Base() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Avatar size="x-small" userId={1} lastName="全機現" firstName="太郎" />
        <Avatar size="small" userId={1} lastName="全機現" firstName="太郎" />
        <Avatar size="medium" userId={1} lastName="全機現" firstName="太郎" />
        <Avatar size="large" userId={1} lastName="全機現" firstName="太郎" />
        <Avatar size="x-large" userId={1} lastName="全機現" firstName="太郎" />
      </div>
      <div className="flex gap-2">
        <Avatar size="medium" userId={1} lastName="全機現" firstName="太郎" />
        <Avatar size="medium" userId={2} lastName="全機現" firstName="太郎" />
        <Avatar size="medium" userId={3} lastName="全機現" firstName="太郎" />
        <Avatar size="medium" userId={4} lastName="全機現" firstName="太郎" />
        <Avatar size="medium" userId={5} lastName="全機現" firstName="太郎" />
        <Avatar size="medium" userId={6} lastName="全機現" firstName="太郎" />
        <Avatar size="medium" userId={7} lastName="全機現" firstName="太郎" />
        <Avatar size="medium" userId={8} lastName="全機現" firstName="太郎" />
        <Avatar size="medium" userId={9} lastName="全機現" firstName="太郎" />
        <Avatar size="medium" userId={10} lastName="全機現" firstName="太郎" />
        <Avatar size="medium" lastName="全機現" firstName="太郎" />
      </div>
      <div className="flex gap-2">
        <Avatar size="medium" userId={1} lastName="Smith" firstName="John" />
      </div>
    </div>
  );
}
