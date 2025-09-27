interface MenuIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export function MenuIcon({ width = 10, height = 18, className }: MenuIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0 17.3572H9.38889V15.5924H0V17.3572ZM0.0289781 2.69338H9.244V0.928589H0.0289781V2.69338ZM0.869342 9.88088H8.46159V8.11609H0.869342V9.88088Z"
        fill="currentColor"
      />
    </svg>
  );
}