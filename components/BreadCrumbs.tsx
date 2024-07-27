import { RootState } from "@/store/reducers";
import { Anchor, Breadcrumbs, Text } from "@mantine/core";
import { useSelector } from "react-redux";

export const BreadCrumbs = ({}): JSX.Element => {
  const { activePath } = useSelector((state: RootState) => state.general);

  const items = activePath
    .split("/")
    .map((e, i) => <Anchor key={i}>{e}</Anchor>);
    
  return (
    activePath!="/" ? 
    <div className="flex flex-col p-2 shadow-md rounded">
        <Text size="xs" mb={4}>You are here</Text>
      <Breadcrumbs>{items}</Breadcrumbs>
    </div>
    : <></>
  );
};
