"use client";

import { FC, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import "../../styles/sidebar.css";
import { MenuList } from "./menu-list";

const Sidebar: FC<any> = (props) => {
  const [openSidebar, setOpenSidebar] = useState(true);

  const renderSidebar = () => (
    <article
      className={`sidebar flex flex-0  absolute ${
        openSidebar ? "w-72" : "w-20"
      } duration-100 relative justify-center items-start`}
    >
      <button
        className="btn bg-transparent rounded-full absolute right-4 mt-5"
        onClick={() => setOpenSidebar(!openSidebar)}
      >
        {openSidebar ? <IoMdClose /> : <GiHamburgerMenu />}
      </button>
      <section
        className={`flex items-center ${
          openSidebar ? "justify-start" : "justify-center -mt-40"
        } rounded-md`}
      >
        <MenuList openSidebar={openSidebar} />
      </section>
    </article>
  );

  return renderSidebar();
};

export default Sidebar;
