import { WidgetTotalProps } from "@/types/widget-total.type";
import { FC } from "react";

export const WidgetTotal: FC<WidgetTotalProps> = ({
  icon,
  title,
  totalAmount,
}) => {
  return (
    <div className="flex w-80 h-32 shadow-xl justify-start m-auto rounded-2xl items-center">
      <article className="text-3xl rounded-full mx-8 p-3 bg-sky-300 shadow-xl">
        {icon({})}
      </article>
      <div className="flex flex-col">
        <h1 className="text-2xl">{title}</h1>
        {totalAmount}
      </div>
    </div>
  );
};
