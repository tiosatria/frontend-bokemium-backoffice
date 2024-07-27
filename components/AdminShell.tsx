import { useDispatch, useSelector } from "react-redux";
import { Header } from "./Header";
import Layout from "./Layout";
import { RootState } from "@/store/reducers";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Navlink } from "./Navlink";
import { setActivePath } from "@/store/actions/generalActions";
import { BreadCrumbs } from "./BreadCrumbs";

export const AdminShell = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element => {

  const { currentUser } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const dispatch = useDispatch()

  // useEffect(() => {
  //   if (!currentUser) router.push("/auth");
  // }, [currentUser]);

  useEffect(()=>{
    setActivePath(router.pathname)(dispatch)
  },[router])

  return (
    <Layout className="bg-white">
      <Header />
      <div className="flex">
        <Navlink />
        <div className="flex flex-col">
        {/* <BreadCrumbs/> */}
        {children}
        </div>
      </div>
    </Layout>
  );
};
