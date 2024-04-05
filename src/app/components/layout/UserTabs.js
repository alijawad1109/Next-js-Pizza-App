'use client'
import React from 'react'
import Link from "next/link";
import { usePathname } from 'next/navigation';

const UserTabs = ({isAdmin}) => {
  const path =usePathname()
  return (
    <div>
      <div className="flex gap-3 justify-center items-center">
              <Link href={"/profile"} className={path === '/profile' ? 'btn' : 'non-btn'}>
                Profile
              </Link>
          {isAdmin && (
            <div className="flex gap-3 items-center">
              <Link href={"/categories"} className={path === '/categories' ? 'btn' : 'non-btn'}>
                Categories
              </Link>
              <Link href={"/menu-items"} className={path.includes( '/menu-items') ? 'btn' : 'non-btn'}>
                Menu Items
              </Link>
              <Link href={"/users"} className={path.includes('/users' ) ? 'btn' : 'non-btn'}>
                Users
              </Link>
            </div>
          )}
              <Link href={"/orders"} className={path === '/orders' ? 'btn' : 'non-btn'}>
                Orders
              </Link>
        </div>

    </div>
  )
}

export default UserTabs
