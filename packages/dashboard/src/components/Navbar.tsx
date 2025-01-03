import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { Input } from "./Fields";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { BellAlertIcon as BellAlertIconOutline,
  UserIcon, ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import {
  BellAlertIcon as BellAlertIconSolid
} from "@heroicons/react/24/solid";
import userImage from "../assets/userImage.png";
import Button from "./Button";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem } from "./Dropdown";

const Navbar: React.FC = () => {
  //   const pagesRoutes = [ {name:"Post", page: "/post"}, {name:"Post", page: "/post"}, "/profile"];

  return (
    <nav className="bg-neutral-900 p-4 border-b border-gray-600">
      <ul className="flex justify-between space-x-4">
        <li>
          <NavLink to="/">
            <h1 className="text-white text-4xl font-bold">Your.Thougths</h1>
          </NavLink>
        </li>
        <li>
          <Input
            type="text"
            Icon={MagnifyingGlassIcon}
            name="search"
            placeholder="Search..."
          />
        </li>
        <div className="flex justify-between items-center gap-4">
          <li>
            <NavLink
              to="/newpost"
              className={() => clsx("text-base font-medium w-full")}>
              {({ isActive }) => (
                <Button
                  size="md"
                  variant="dark"
                  className={`rounded-full ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}>
                  New Post
                </Button>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/notification">
              {({ isActive }) => (
                <Button
                  size="md"
                  variant="dark"
                  className={`rounded-full ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                  Icon={isActive ? BellAlertIconSolid : BellAlertIconOutline}
                ></Button>
              )}
            </NavLink>
          </li>
          <li>
            {/* <NavLink
              to="/profile"
              className={({ isActive }) =>
                clsx(
                  "text-white px-3 py-2 rounded-md text-sm font-medium",
                  isActive ? "bg-gray-900" : "hover:bg-gray-700"
                )
              }
            >
              Profile
            </NavLink> */}
            {/* <Root>
              <Trigger asChild>
                <Button
                  size="md"
                  variant="dark"
                  className="rounded-full p-1"
                >
                  <img src={userImage} alt="profile" className="w-8 h-8 rounded-full" />
                </Button>
              </Trigger>
              <Portal>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </NavLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <NavLink to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </NavLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <NavLink to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Logout
                    </NavLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </Portal>
            </Root> */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button size="md" variant="dark" className="rounded-full p-1">
                  <img
                    src={userImage}
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                  />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                      <UserIcon className="h-5 w-5" />
                      <NavLink to="/profile/1">
                        Profile
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                    <ArrowLeftEndOnRectangleIcon className="h-5 w-5" />
                    <NavLink to="/auth/login">
                        Logout
                      </NavLink>
                    </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
