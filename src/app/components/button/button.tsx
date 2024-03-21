import { ReactNode } from "react";

type ButtonProps = {
  title: string;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  title,
  icon,
  className,
  onClick,
}: ButtonProps) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`flex items-center w-fit duration-300 font-bold ${className}`}
      >
        {icon && <div className="mr-[5px]">{icon}</div>}
        {title}
      </button>
    </div>
  );
};

export default Button;
