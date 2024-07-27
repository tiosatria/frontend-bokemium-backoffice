import logo from "@public/logo-no-background.webp";
import Layout from "./Layout";
import Image from "next/image";
import { ActionIcon, Button, Menu, MenuDivider, Text, TextInput } from "@mantine/core";
import { FaBell, FaInfo, FaSearch, FaUser } from "react-icons/fa";
import { TopNavUserActionCard } from "./TopNavUserActionCard";
import { UserPayload } from "@/api/objects/UserPayload";
import { Spotlight, SpotlightActionData, spotlight } from "@mantine/spotlight";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { logout } from "@/store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reducers";

export const Header = (): JSX.Element => {
  const actions: SpotlightActionData[] = [
    {
      id: "home",
      label: "Home",
      description: "Get to home page",
      onClick: () => console.log("Home"),
    },
    {
      id: "dashboard",
      label: "Dashboard",
      description: "Get full information about current system status",
      onClick: () => console.log("Dashboard"),
    },
    {
      id: "documentation",
      label: "Documentation",
      description: "Visit documentation to lean more about all features",
      onClick: () => console.log("Documentation"),
    },
  ];

  const {currentUser}=useSelector((state:RootState)=>state.user)
  const dispatch = useDispatch()

  return (
    <div className="flex flex-col shadow-md">
      <div className="flex flex-row p-4 justify-between">
        <div className="hidden md:flex flex-row">
          <Image src={logo} alt="logo" width={50} />
          <p className="my-auto ml-4 font-bold">Admin Area</p>
        </div>
        <TextInput
          placeholder="Search Anything"
          leftSection={<FaSearch />}
          onClick={spotlight.open}
        ></TextInput>
        <div className="flex flex-row space-x-2">
        <ActionIcon className="" size={"lg"}>
            <FaBell/>
        </ActionIcon>
        <Menu shadow={"md"} width={200}>
          <Menu.Target>
            <Button
            leftSection={currentUser?.profilePic ? 
            <Image src={currentUser.profilePic} alt="user"/> : <FaUser/>}
            rightSection={<IoMdArrowDropdownCircle />}
            >
            {currentUser?.username}
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
          <Menu.Label>
            Account
          </Menu.Label>
          <Menu.Item leftSection={<FaInfo/>}>
            Information
          </Menu.Item>
          <Menu.Item 
          onClick={async ()=> await logout()(dispatch)}
          leftSection={<IoLogOut/>}>
            Logout
          </Menu.Item>
          <MenuDivider/>
          </Menu.Dropdown>
        </Menu>
        </div>
      </div>
      <Spotlight actions={actions} />
    </div>
  );
};
