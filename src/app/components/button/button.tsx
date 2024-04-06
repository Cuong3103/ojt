import { FC, ReactNode } from "react";

type ButtonProps = {
  title: string;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Button: FC<ButtonProps> = ({
  className,
  title,
  icon,
  onClick,
}) => {
  return (
    <div>
      <button
        className={`flex items-center px-6 font-bold duration-300 text-sm rounded-lg ${className}`}
        onClick={onClick}
      >
        {icon && <div className="mr-[5px]">{icon}</div>}
        {title}
      </button>
    </div>
  );
};

export default Button;
