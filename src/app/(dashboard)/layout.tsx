import { getSession } from "@/utils/authenticationHelper";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";
import { Footer } from "../components/footer/footer";
import { Header } from "../components/header/header";
import Sidebar from "../components/sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout: FC<DashboardLayoutProps> = async (props) => {
  const session = await getSession();

  if (!session) {
    return redirect("/login");
  } else {
    return (
      <div className="">
        <Header />
        <div className="flex m-auto h-screen justify-start ">
          <Sidebar />
          {props.children}
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
};

export default DashboardLayout;
