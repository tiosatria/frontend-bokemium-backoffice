import Layout from "@/components/Layout";
import {
  Anchor,
  Box,
  Button,
  Card,
  Center,
  LoadingOverlay,
  Text,
  TextInput,
} from "@mantine/core";
import Image from "next/image";
import { hasLength, useForm } from "@mantine/form";
import logo from "../../public/logo-no-background.webp";
import { AdminLogin } from "../../api/objects/AdminLogin";
import { FaCheck, FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { RootState } from "@/store/reducers";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { login } from "@/store/actions/authActions";

export default function Auth() {

  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading,setLoading] = useState<boolean>(false);

  const form = useForm<AdminLogin>({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: hasLength(
        { min: 6, max: 45 },
        "Username must be more than 6 characters and less than 45"
      ),
      password: hasLength(
        { min: 6, max: 45 },
        "Password must be more than 6 characters and less than 45"
      ),
    },
  });

  const handleLogin = async (form:AdminLogin) => {
   try {
    setLoading(true)
    await login(form)(dispatch)
    notifications.show({title:"Login Success",message:"Welcome back!", color:"green"})
   } catch (error) {
    notifications.show({message:"we're having trouble signing you in"})
   }
   finally{
    setLoading(false)
   } 
  }

  useEffect(()=>{
    if (currentUser) {
      router.push("/");
    }
  },[currentUser])

  return (
    <Layout className="bg-white flex flex-col">
      <LoadingOverlay
      visible={loading}
      />
      <Card
        shadow="lg"
        padding="xl"
        withBorder
        className="flex flex-col my-auto mx-auto"
        w={450}
      >
        <Center p={10}>
          <Image src={logo} height={100} alt="bokemium logo" />
        </Center>
        <Center>
          <Text c={"dimmed"} size="sm" p={10}>
            Please enter credential to continue
          </Text>
        </Center>
        <form
          onSubmit={form.onSubmit(async (values) =>await handleLogin(values))}
        >
          <TextInput
            label="Username"
            placeholder="Enter username"
            leftSection={<FaUser />}
            error={form.errors.username}
            key={form.key("username")}
            {...form.getInputProps("username")}
          />
          <TextInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            leftSection={<FaLock />}
            key={form.key("password")}
            error={form.errors.password}
            {...form.getInputProps("password")}
          />
          <div className="flex flex-col">
            <Center p={5}>
              <Anchor
                className="mx-auto"
                size="sm"
                onClick={() =>
                  notifications.show({
                    title: "Forgot your password?",
                    message: "Please let your supervisor know",
                  })
                }
              >
                Forgot Password?
              </Anchor>
            </Center>
            <Button type="submit" color="bright-pink" className="mt-2">
              Login
            </Button>
          </div>
        </form>
      </Card>
    </Layout>
  );
}
