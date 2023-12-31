import Providers from "@/providers";
import "./globals.css";
import { Poppins } from "next/font/google";
import Toaster from "@/components/Shared/Toaster/Toaster";
import logo from "@/assets/icons/hatmartLogo.svg";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "HatMat",
  description: "Generated by create next app",
  icons: {
    icon: ["/logo-favicon.png?v=4", "@/assets/icons/hatmartLogo.svg"],
    apple: ["/logo-favicon.png?v=4"],
    shortcut: ["/logo-favicon.png"],
  },
  manifest: "/site.webmanifest",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className="transition-all">
      <Providers>
        <body
          className={`${poppins.className} scrollbar select-none dark:text-white `}
        >
          {children}
          <Toaster />
        </body>
      </Providers>
    </html>
  );
};
export default RootLayout;
