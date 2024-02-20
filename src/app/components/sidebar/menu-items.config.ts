import { RiMicroscopeLine } from "react-icons/ri";
import { LiaHomeSolid } from "react-icons/lia";
import { FiBookOpen } from "react-icons/fi";
import { GoMortarBoard } from "react-icons/go";
import { FaRegCalendar, FaRegFolderOpen } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { AiOutlineSetting } from "react-icons/ai";
import { MenuItem } from "@/types/menu.type";

export const menuItems: MenuItem[] = [
  {
    title: "Home",
    icon: LiaHomeSolid,
  },
  {
    title: "Syllabus",
    submenu: true,
    icon: FiBookOpen,
    submenuItems: [
      { title: "View syllabus", path: "" },
      { title: "Create syllabus", path: "" },
    ],
  },
  {
    title: "Training program",
    icon: RiMicroscopeLine,
  },
  {
    title: "Class",
    submenu: true,
    icon: GoMortarBoard,
    submenuItems: [
      { title: "View class", path: "" },
      { title: "Create class", path: "" },
    ],
  },
  {
    title: "Training calendar",
    icon: FaRegCalendar,
  },
  {
    title: "User management",
    submenu: true,
    icon: LuUsers,
    submenuItems: [
      { title: "User list", path: "/users" },
      { title: "User permission", path: "" },
    ],
  },
  {
    title: "Learning materials",
    icon: FaRegFolderOpen,
  },
  {
    title: "Setting",
    submenu: true,
    icon: AiOutlineSetting,
    submenuItems: [{ title: "Calendar", path: "" }],
  },
];
