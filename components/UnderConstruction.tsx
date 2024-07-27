import { Center, Text } from "@mantine/core";
import { IoIosConstruct } from "react-icons/io";

export const UnderConstruction = (): JSX.Element => {
  return (
    <div className="flex p-5 w-[calc(100vw-256px)] h-full justify-center justify-items-center">
        <div className="flex flex-col w-fit m-auto">
        <p className="">This Page is under construction</p>
        <IoIosConstruct size={256}/>
        </div>

    </div>
  );
};
