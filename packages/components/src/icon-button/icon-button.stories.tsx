import { IconButton } from '.';

export default { component: IconButton };
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
        <IconButton icon="add" size="small" />
        <IconButton icon="add" size="small" isDisabled />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <IconButton icon="add" size="medium" />
        <IconButton icon="add" size="medium" isDisabled />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <IconButton icon="add" size="large" />
        <IconButton icon="add" size="large" isDisabled />
      </div>

      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <IconButton variant="text" icon="add" size="small" />
        <IconButton variant="text" icon="add" size="small" isDisabled />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <IconButton variant="text" icon="add" size="medium" />
        <IconButton variant="text" icon="add" size="medium" isDisabled />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <IconButton variant="text" icon="add" size="large" />
        <IconButton variant="text" icon="add" size="large" isDisabled />
      </div>
    </div>
  );
}
