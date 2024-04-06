import { ReactNode } from "react";

type ButtonProps = {
  title: string;
  icon?: ReactNode;
  classCss?: string;
  handleClick?: () => void;
};

export const Button: FC<ButtonProps> = ({
  classCss,
  title,
  icon,
  handleClick,
}) => {
  return (
    <div>
      <button
        className={`flex items-center px-6 font-bold duration-300 text-sm rounded-lg ${classCss}`}
        onClick={handleClick}
      >
        {icon && <div className="mr-[5px]">{icon}</div>}
        {title}
      </button>
    </div>
  );
};

export default Button;
