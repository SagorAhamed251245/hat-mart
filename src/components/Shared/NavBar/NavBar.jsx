"use client";
import { afterLoginNavData, beforeLoginNavData } from "@/data/navData";
import Image from "next/image";

import NavLink from "./NavLink";

import userImage from "@/assets/icons/user.png";

import Link from "next/link";

import { HiOutlineShoppingBag } from "react-icons/hi";
import Search from "./Search";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-hot-toast";
import LogoSVG from "./LogoSVG";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SunSVG from "./SunSVG";
import MoonSvg from "./MoonSvg";
import useTheme from "@/hooks/useTheme";
import { useEffect } from "react";
import { startTransition } from "react";

const NavBar = () => {
  const { user, logout, cartItems, cartHooks } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { replace, refresh } = useRouter();

  const path = usePathname();
  console.log("🚀 ~ file: NavBar.jsx:29 ~ NavBar ~ path:", path);
  const searchParams = useSearchParams();
  let productId = searchParams.get("productId");
  console.log(
    "🚀 ~ file: NavBar.jsx:30 ~ NavBar ~ searchParams:",
    searchParams.get("productId")
  );
  const { uid, photoURL } = user || {};
  const li = uid ? afterLoginNavData : beforeLoginNavData;
  const handleLogout = async () => {
    const toastId = toast.loading("Loading...");
    try {
      // Call the `logout()` function from NextAuth.js
      await logout();

      // Make a POST request to the `/api/auth/logout` endpoint
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (res.status === 200) {
        if (
          path.includes("/dashboard") ||
          path.includes("/dashboard/myProfile") ||
          path.includes("/payment")
        ) {
          // Append the query parameters to the redirect URL
          replace(`/login?redirectUrl=${path}?${productId}`);
        }

        toast.success("Successfully logout!");

        startTransition(() => {
          refresh();
        });
      } else {
        toast.error("Failed to logout!");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    cartHooks();
  }, []);

  return (
    <>
      <nav className="shadow-md  z-10   bg-white dark:bg-transparent">
        <div className="navbar  lg:mb-2  lg:pt-5 px-5 md:px-10 lg:px-10  ">
          {/* Left-aligned section of the navbar */}
          <div className="navbar-start  h-10 ">
            <LogoSVG></LogoSVG>

            <Link
              href={"/"}
              className="h-24 md:flex hidden  justify-center item-center w-24 md:w-36"
            >
              <Image
                src="https://i.ibb.co/WtbFpmR/logo.png"
                className="object-cover  lg:w-36 md:w-32 w-20"
                height={144}
                width={144}
                alt="logo"
              />
            </Link>
          </div>

          {/* Center-aligned section of the navbar (visible on larger screens) */}
          <Search></Search>

          {/* Right-aligned section of the navbar */}
          <div className="navbar-end md:gap-5">
            {/* Button labeled "Button" */}
            <div className="hidden md:inline-block ">
              <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input
                  onChange={toggleTheme}
                  type="checkbox"
                  checked={theme === "dark"}
                />

                {/* sun icon */}

                <SunSVG />

                {/* moon icon */}

                <MoonSvg />
              </label>
            </div>

            {/* night */}
            <div className="hidden md:inline-block">
              <div className="flex relative items-center justify-center w-[35px] h-[35px]">
                <Link href={"/cart"}>
                  <HiOutlineShoppingBag className="text-[1.75rem] dark:text-white" />
                </Link>
                {cartItems?.length <= 0 ? (
                  ""
                ) : (
                  <Link
                    href={"/cart"}
                    className="absolute z-10 top-0 -right-2 bg-orange-400 h-6 w-6 rounded-full flex justify-center items-center text-sm font-semibold"
                  >
                    <span>{cartItems?.length}</span>
                  </Link>
                )}
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="avatar cursor-pointer  ">
                <div className="w-8 h-8 mt-1 shadow-lg rounded-full overflow-hidden">
                  <Image
                    src={photoURL || userImage}
                    className="object-cover w-full"
                    height={400}
                    width={600}
                    alt="User Logo"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3  p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 z-10"
              >
                <li>
                  {li.map(({ path, title }) => (
                    <NavLink key={title} href={path}>
                      {title}
                    </NavLink>
                  ))}
                </li>
                {uid && (
                  <li>
                    <Link
                      href={""}
                      className="dark:text-white"
                      onClick={() => handleLogout()}
                    >
                      LogOut
                    </Link>
                  </li>
                )}

                {/* for  small divice  */}
                <div className="md:hidden">
                  <label className="swap swap-rotate">
                    {/* this hidden checkbox controls the state */}
                    <input
                      onChange={toggleTheme}
                      type="checkbox"
                      checked={theme === "dark"}
                    />

                    {/* sun icon */}

                    <SunSVG />

                    {/* moon icon */}

                    <MoonSvg />
                  </label>
                </div>

                {/* night */}
                <div className="md:hidden ">
                  <div className="flex relative items-center justify-center w-[35px] h-[35px]">
                    <div className="flex relative items-center justify-center w-[35px] h-[35px]">
                      <Link href={"/cart"}>
                        <HiOutlineShoppingBag className="text-[1.75rem] dark:text-white" />
                      </Link>
                      {cartItems?.length <= 0 ? (
                        ""
                      ) : (
                        <Link
                          href={"/cart"}
                          className="absolute z-10 top-0 -right-2 bg-orange-400 h-6 w-6 rounded-full flex justify-center items-center text-sm font-semibold"
                        >
                          <span>{cartItems?.length}</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
        <hr />
      </nav>
    </>
  );
};

export default NavBar;
