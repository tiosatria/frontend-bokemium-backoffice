import Image from "next/image";
import Layout from "@/components/Layout";
import { Header } from "@/components/Header";
import { AdminShell } from "@/components/AdminShell";

export default function Dashboard() {
  
  return(
    <AdminShell>
      <div className="flex flex-col p-2">
      <p className="font-bold">Main Content</p>
      </div>
    </AdminShell>
  )
}
