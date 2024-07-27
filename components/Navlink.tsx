import { Burger, Center, NavLink, Text } from "@mantine/core";
import { FaBook, FaHome, FaMoneyBill, FaUser, FaWrench } from "react-icons/fa";
import { MdOutlinePermMedia, MdPayment, MdReport } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { GiNotebook } from "react-icons/gi";
import { MdManageAccounts } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { GrChannel } from "react-icons/gr";
import { VERSION_NUMBER } from "@/libs/constant";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import { setActivePath, toggleNavlink } from "@/store/actions/generalActions";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";

export interface IMenu {
  label: string;
  icon?: React.ReactNode;
  url: string;
  action?: void;
  childMenu?: IMenu[];
}

const ChildUser: IMenu[] = [
  { label: "Management", url: "/user/management", icon: <MdManageAccounts /> },
  {
    label: "Subscription",
    url: "/user/subscription",
    icon: <MdOutlineWorkspacePremium />,
  },
  { label: "Login Logs", url: "/user/login-logs", icon: <GiNotebook /> },
  { label: "Watch Logs", url: "/user/watch-logs", icon: <FiEye /> },
];

const ChildAdmin: IMenu[] = [
  { label: "Management", url: "/admin/management", icon: <MdManageAccounts /> },
  { label: "Login Logs", url: "/user/login-logs", icon: <GiNotebook /> },
];

const ChildContent: IMenu[] = [
  { label: "Add New Content", url: "/content/add", icon: <IoMdAdd /> },
  {
    label: "Management",
    url: "/content/management",
    icon: <MdManageAccounts />,
  },
];

const ChildPayment: IMenu[] = [
  { label: "Process Payment", url: "/payment/process", icon: <MdPayment /> },
  {
    label: "Payment Channel",
    url: "/payment/payment-channel",
    icon: <GrChannel />,
  },
];

const ChildSystem: IMenu[] = [
  { label: "Settings", url: "/system/settings", icon: <FaWrench /> },
];

const ChildReport: IMenu[] = [{ label: "", url: "", icon: <MdPayment /> }];

export const MenuNavs: IMenu[] = [
  { label: "Home", url: "/", icon: <FaHome /> },
  {
    label: "Content",
    url: "/content",
    icon: <MdOutlinePermMedia />,
    childMenu: ChildContent,
  },
  { label: "User", url: "/user", icon: <FaUser />, childMenu: ChildUser },
  {
    label: "Admin",
    url: "/admin",
    icon: <GrUserAdmin />,
    childMenu: ChildAdmin,
  },
  {
    label: "Payment",
    url: "/payment",
    icon: <FaMoneyBill />,
    childMenu: ChildPayment,
  },
  { label: "Report", url: "/report", icon: <FaBook /> },
  { label: "System", url: "/system", icon: <FaGear />, childMenu: ChildSystem },
];

export const Navlink = (): JSX.Element => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { navlinkOpen } = useSelector((state: RootState) => state.general)
  const { activePath } = useSelector((state: RootState) => state.general)

  const renderMenu = (menu: IMenu): JSX.Element => {
    return (
      <NavLink key={menu.url} label={menu.label} leftSection={menu.icon}
        active={menu.url == activePath}
        opened={menu.url == activePath}
        href="#"
        onClick={() => router.push(menu.url)}
      >
        {menu.childMenu && menu.childMenu.map(renderMenu)}
      </NavLink>
    );
  };

  const memoizedMenu = useMemo(() => MenuNavs.map(renderMenu)
    , [MenuNavs, activePath])

  return (
    <div className={`${!navlinkOpen && "!w-[50px]"} shadow-md p-2 h-[calc(100vh-77px)] flex flex-col justify-between w-64 transition-all duration-500 overflow-hidden`}>
      <div className="flex flex-col">
        <div className={`flex flex-row ${!navlinkOpen ? 'justify-end' : 'justify-between'}`}>
          {navlinkOpen && <div className="font-bold my-auto text-nowrap">Main Menu</div>}
          <Burger
            opened={navlinkOpen}
            onClick={() => { toggleNavlink()(dispatch) }}
            aria-label="Toggle navigation"
          />
        </div>
        {
          navlinkOpen &&
          <div className="flex flex-col flex-nowrap text-nowrap">{memoizedMenu}</div>
        }
      </div>
      {
        navlinkOpen &&
        <Center>
          <Text c={"dimmed"} className="text-nowrap">Version {VERSION_NUMBER}</Text>
        </Center>
      }
    </div>
  );
};
