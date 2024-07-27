import { Poppins } from "next/font/google";
import '../../src/app/globals.css'
import Sidebar, { MobileSidebar } from "@/components/sidebar/Sidebar";
import Navbar from "@/components/Navbar";
import { StateContextProvider } from "@/contexts/StateContext";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Profolo",
  description: "Apply job and get it",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans bg-sidebar custom-scrollbar`}
      >
        <StateContextProvider>
          <main className="flex w-full h-screen overflow-hidden">
            <section className="h-full w-[104px] bg-sidebar hidden lg:block">
              <Sidebar />
            </section>
            <section
              className="flex-1 bg-mainBg rounded-tl-3xl rounded-bl-3xl max-lg:rounded-none py-2 lg:px-8 px-2 overflow-y-auto"
              style={{ width: "calc(100vw - 104px)" }}
            >
              <section className="w-full bg-mainBg max-lg:z-20 max-lg:fixed max-lg:top-0 max-lg:px-2">
                <Navbar />
              </section>
              <section className="max-lg:pt-[100px] max-sm:pt-[120px] max-lg:pb-[80px]">
                {children}
              </section>
            </section>
            <footer className="w-full max-lg:fixed max-lg:block hidden max-lg:bottom-0 z-20">
              <MobileSidebar />
            </footer>
          </main>
        </StateContextProvider>
      </body>
    </html>
  );
}
