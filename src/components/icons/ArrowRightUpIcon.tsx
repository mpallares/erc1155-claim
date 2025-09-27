interface ArrowRightUpIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export function ArrowRightUpIcon({ width = 16, height = 16, className }: ArrowRightUpIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5.33337 10.6667L10.6667 5.33333"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.33337 5.33333H10.6667V10.6667"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}