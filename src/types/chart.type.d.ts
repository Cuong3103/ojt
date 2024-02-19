export type DatasetChart = {
  label: string;
  data: Array<any>;
  fill?: boolean;
  borderColor?: string;
  tension?: number;
  backgroundColor?: Array<string>;
  hoverOffset?: number;
};

export type ChartType = {
  labels: Array<string>;
  datasets: DatasetChart[];
};
