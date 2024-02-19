import Pagination from "@/app/components/pagination";
import { FC } from "react";

type DashboardPageProps = {};

const DashboardPage: FC<DashboardPageProps> = (props) => {
  return (
    <>
      DASHBOARD
      <Pagination page={20} />
    </>
  );
};

export default DashboardPage;
