import { FC, ReactNode } from "react";
import Sidebar from "../components/sidebar";
import { Footer } from "../components/footer/footer";
import { Header } from "../components/header/header";

type UserListLayoutProps = {
  children: ReactNode;
};

const UserListLayout: FC<UserListLayoutProps> = (props) => {
  return (
    <div className="">
      <Header />
      <div className="flex m-auto h-screen justify-start">
        <Sidebar />
        {props.children}
      </div>
      <Footer />
    </div>
  );
};

export default UserListLayout;
