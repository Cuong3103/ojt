import { MenuItem } from "@/types/menu.type";
import { AiOutlineSetting } from "react-icons/ai";
import { FaRegCalendar, FaRegFolderOpen } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { GoMortarBoard } from "react-icons/go";
import { LiaHomeSolid } from "react-icons/lia";
import { LuUsers } from "react-icons/lu";
import { RiMicroscopeLine } from "react-icons/ri";

export const menuItems: MenuItem[] = [
  {
    title: "Home",
    icon: LiaHomeSolid,
    path: "/dashboard",
  },
  {
    title: "Syllabus",
    submenu: true,
    icon: FiBookOpen,
    submenuItems: [
      { title: "View syllabus", path: "/syllabuses" },
      { title: "Create syllabus", path: "/syllabuses/create" },
    ],
  },
  {
    title: "Training program",
    submenu: true,
    icon: RiMicroscopeLine,
    submenuItems: [
      {
        title: "View training program",
        path: "/training-programs",
      },
      {
        title: "Create training program",
        path: "/training-programs/create",
      },
    ],
  },
  {
    title: "Class",
    submenu: true,
    icon: GoMortarBoard,
    submenuItems: [
      { title: "View class", path: "/classes" },
      { title: "Create class", path: "/classes/create" },
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
    submenuItems: [
      { title: "Edit profile", path: "/profile" },
      { title: "Calendar", path: "" },
    ],
  },
];
