"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar"
import { Button } from "@repo/ui/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu"
import { Sun, Moon, User as UserIcon, Settings, LogOut, ChevronRight } from 'lucide-react'
import { useTheme } from '@repo/ui/context/ThemeContext';
import { User } from "next-auth";
import { signOut } from "next-auth/react";

interface ProfileDropdownProps {
  user?: User | null;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user = null }) => {
  const { theme, toggleTheme } = useTheme();
  const darkTheme = theme === 'dark';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-12 w-12 p-0
            hover:bg-amber-900/20
            transition-all
            rounded-full
            group"
        >
          <Avatar className="h-12 w-12
            border-2 border-transparent
            group-hover:border-amber-500
            transition-all">
            <AvatarImage
              src={user?.image || "https://github.com/shadcn.png"}
              alt={user?.name || "User Profile"}
              className="object-cover"
            />
            <AvatarFallback className="
              bg-neutral-700
              text-neutral-300
              group-hover:bg-amber-900/30
              transition-all">
              {user?.name!.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-72
          bg-gradient-to-br
          from-neutral-900/95
          via-neutral-900/90
          to-neutral-950/95
          backdrop-blur-xl
          border-2
          border-amber-700/20
          rounded-2xl
          shadow-2xl
          overflow-hidden"
        align="end"
        forceMount
      >
        {/* User Profile Header */}
        <div className="
          px-4
          py-4
          border-b
          border-amber-700/20
          bg-gradient-to-r
          from-neutral-900/50
          to-amber-900/20">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12
              border-2
              border-transparent
              group-hover:border-amber-500">
              <AvatarImage
                src={user?.image || "https://github.com/shadcn.png"}
                alt={user?.name || "User Profile"}
                className="object-cover"
              />
              <AvatarFallback className="
                bg-neutral-700
                text-neutral-300
                group-hover:bg-amber-900/30">
                {user?.name!.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="
                text-sm
                font-semibold
                text-amber-100
                group-hover:text-white
                transition-colors">
                {user?.name}
              </p>
              <p className="
                text-xs
                text-amber-200/50
                truncate
                group-hover:text-amber-200/80
                transition-colors">
                {user?.email}
              </p>
            </div>
            <ChevronRight className="
              text-neutral-500
              w-5
              h-5
              group-hover:text-amber-500
              transition-colors" />
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          <DropdownMenuGroup>
            {[
              {
                icon: <UserIcon className="menu-icon" />,
                text: 'Profile',
                hoverClass: 'hover:text-amber-500'
              },
              {
                icon: <Settings className="menu-icon" />,
                text: 'Settings',
                hoverClass: 'hover:text-amber-500',
                badge: 'Coming soon'
              }
            ].map(({ icon, text, hoverClass, badge }) => (
              <DropdownMenuItem
                key={text}
                className={`
                  cursor-pointer
                  px-4
                  py-2.5
                  transition-all
                  group
                  relative
                  flex
                  items-center
                  hover:bg-amber-900/10
                  ${hoverClass}
                `}
              >
                {React.cloneElement(icon, {
                  className: `
                    mr-3
                    h-5
                    w-5
                    text-neutral-400
                    group-hover:text-amber-500
                    transition-colors
                  `
                })}
                <span className="
                  text-neutral-300
                  group-hover:text-amber-100
                  transition-colors
                  flex-grow
                ">
                  {text}
                </span>
                {badge && (
                  <span className="
                    absolute
                    right-4
                    text-xs
                    text-neutral-500
                    group-hover:text-amber-400
                  ">
                    {badge}
                  </span>
                )}
              </DropdownMenuItem>
            ))}
            {/* Dark Mode Toggle */}
            <DropdownMenuItem
              className="cursor-pointer px-4 py-2.5 transition-all group hover:bg-amber-900/10 flex items-center"
              onClick={toggleTheme}
            >
              {darkTheme ? (
                <Sun className="mr-3 h-5 w-5 text-amber-500 group-hover:text-yellow-400 transition-colors" />
              ) : (
                <Moon className="mr-3 h-5 w-5 text-neutral-400 group-hover:text-amber-500 transition-colors" />
              )}
              <span className="text-neutral-300 group-hover:text-amber-100 transition-colors flex-grow">
                {darkTheme ? "Light Mode" : "Dark Mode"}
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          {/* Logout Section */}
          <div className="border-t border-amber-700/20 mt-2">
            <DropdownMenuItem
              className="
                cursor-pointer
                px-4
                py-2.5
                transition-all
                group
                hover:bg-red-900/20
                text-red-400
                hover:text-red-500
                flex
                items-center"
              onClick={() => signOut({ callbackUrl: '/auth/login' })}
            >
              <LogOut className="
                mr-3
                h-5
                w-5
                text-red-400
                group-hover:text-red-500
                transition-colors" />
              <span>Log out</span>
            </DropdownMenuItem>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
