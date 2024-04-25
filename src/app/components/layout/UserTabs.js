'use client';
import React from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';

const UserTabs = ({ isAdmin }) => {
  const path = usePathname();

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap gap-3 justify-center items-center text-center">
        <Link href={"/profile"} className={`${path === '/profile' ? 'btn' : 'non-btn'} py-2 px-4`}>
          Profile
        </Link>
        {isAdmin && (
          <>
            <Link href={"/categories"} className={`${path === '/categories' ? 'btn' : 'non-btn'} py-2 px-4`}>
              Categories
            </Link>
            <Link href={"/menu-items"} className={`${path.includes('/menu-items') ? 'btn' : 'non-btn'} py-2 px-4`}>
              Menu Items
            </Link>
            <Link href={"/users"} className={`${path.includes('/users') ? 'btn' : 'non-btn'} py-2 px-4`}>
              Users
            </Link>
          </>
        )}
        <Link href={"/orders"} className={`${path === '/orders' ? 'btn' : 'non-btn'} py-2 px-4`}>
          Orders
        </Link>
      </div>
    </div>
  );
};

export default UserTabs;
