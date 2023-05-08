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
    <div className={wrapperClasses} style={{ height }}>
      <svg className={svgClasses} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle className="stroke-border-uiBorder01" cx="16" cy="16" r="14" strokeWidth="3" fill="none" />
        <circle
          className="animate-circular-move stroke-interactive-interactive01"
          style={{ strokeDasharray: '80px 200px', strokeDashoffset: '0px', transformOrigin: 'center center' }}
          cx="16"
          cy="16"
          r="14"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
        />
      </svg>
    </div>
  );
}
