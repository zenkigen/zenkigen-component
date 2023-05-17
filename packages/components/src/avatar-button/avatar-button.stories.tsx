import { AvatarButton } from '.';

export default { component: AvatarButton };
export function Base() {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}
      >
        <AvatarButton size="x-small" userId={1} lastName="全機現" firstName="太郎" />
        <AvatarButton size="x-small" userId={1} lastName="全機現" firstName="太郎" isDisabled />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <AvatarButton size="small" userId={1} lastName="全機現" firstName="太郎" />
        <AvatarButton size="small" userId={1} lastName="全機現" firstName="太郎" isDisabled />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <AvatarButton size="medium" userId={1} lastName="全機現" firstName="太郎" />
        <AvatarButton size="medium" userId={1} lastName="全機現" firstName="太郎" isDisabled />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <AvatarButton size="large" userId={1} lastName="全機現" firstName="太郎" />
        <AvatarButton size="large" userId={1} lastName="全機現" firstName="太郎" isDisabled />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <AvatarButton size="x-large" userId={1} lastName="全機現" firstName="太郎" />
        <AvatarButton size="x-large" userId={1} lastName="全機現" firstName="太郎" isDisabled />
      </div>
    </div>
  );
}
