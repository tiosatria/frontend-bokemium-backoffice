import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });


const Layout = ({children, className}:{children: React.ReactNode, className?: string}): JSX.Element => {

  return (
    <main>
    <div className={`relative min-h-screen ${inter.className} ${className}`}>
      {children}
    </div>
    </main>
  );
};

export default Layout;
