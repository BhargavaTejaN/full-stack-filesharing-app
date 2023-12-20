"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from 'next/navigation';

import { menuList } from "@/constants/constants";

const SideNav = () => {
  const pathname = usePathname();

  const defaultActiveTab = menuList.find((item) => item.path === pathname);
  const [activeIndex, setActiveIndex] = useState(defaultActiveTab ? defaultActiveTab.name : menuList[1].name);

  useEffect(() => {
    const activeTab = menuList.find((item) => item.path === pathname);
    if(activeTab){
      setActiveIndex(activeTab.name);
    }
  },[pathname])

  return (
    <div className="shadow-sm border-r h-full">
      <div className="p-5 border-b">
        <Image src="/logo.svg" width={150} height={100} alt="logo" />
      </div>
      <div className="flex flex-col float-left w-full">
        {menuList.map((each) => (
          <Link
            href={each.path}
            onClick={() => setActiveIndex(each.name)}
            className={`${
              activeIndex === each.name ? "bg-blue-50 text-primary" : "null"
            } flex gap-2 p-4 px-6 hover:bg-gray-200 w-full text-gray-600`}
            key={each.id}
          >
            <each.icon />
            <h2>{each.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
