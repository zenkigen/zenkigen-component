import clsx from 'clsx';

export const MinusIcon = () => {
  const svgClasses = clsx('z-10', 'absolute', 'h-5', 'w-5', 'fill-icon-iconOnColor', 'rounded-sm', 'hover:rounded-sm');

  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className={svgClasses}>
      <path d="M4.94723 10.5028H9.49726H10.5028H15.0528C15.3293 10.5028 15.5556 10.2766 15.5556 10C15.5556 9.72352 15.3293 9.49725 15.0528 9.49725H10.5028H9.49726H4.94723C4.67071 9.49725 4.44446 9.72352 4.44446 10C4.44446 10.2766 4.67071 10.5028 4.94723 10.5028Z" />
    </svg>
  );
};
