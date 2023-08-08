import clsx from 'clsx';

type Props = {
  size?: 'small' | 'medium' | 'large';
  position?: 'fixed' | 'absolute' | 'static';
  height?: string;
};

export function Loading({ size = 'medium', position = 'fixed', height = '100%' }: Props) {
  const wrapperClasses = clsx(position, 'top-0', 'left-0', 'z-20', 'flex', 'items-center', 'justify-center', 'w-full');

  const svgClasses = clsx(
    size === 'small' && 'h-4 w-4',
    size === 'medium' && 'h-8 w-8',
    size === 'large' && 'h-16 w-16',
  );

  return (
    <>
      <div className={wrapperClasses} style={{ height }}>
        {size === 'small' && (
          <svg className={svgClasses} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle
              className="animate-circular-small-move stroke-interactive-interactive01"
              style={{ transformOrigin: 'center center' }}
              cx="8"
              cy="8"
              r="7"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        )}
        {size === 'medium' && (
          <svg className={svgClasses} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle
              className="animate-circular-medium-move stroke-interactive-interactive01"
              style={{ transformOrigin: 'center center' }}
              cx="16"
              cy="16"
              r="15"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        )}
        {size === 'large' && (
          <svg className={svgClasses} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle
              className="animate-circular-large-move stroke-interactive-interactive01"
              style={{ transformOrigin: 'center center' }}
              cx="32"
              cy="32"
              r="30"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
            />
          </svg>
        )}
      </div>
    </>
  );
}
