import { byMonths } from "@/helpers/calendar";
import { Chart } from "@/types/chart.type";

export const chart = (props: Chart) => {
  return {
    labels: props.labels,
    datasets: props.datasets,
  };
};
