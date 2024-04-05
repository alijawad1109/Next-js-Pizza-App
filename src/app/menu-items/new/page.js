'use client'
import MenuItemsPriceProps from '@/app/components/layout/MenuItemsPriceProps';
import UserTabs from '@/app/components/layout/UserTabs';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [categoryName, setCategoryName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [menuItems, setMenuItems] = useState([]);
    const [editedCategory, setEditedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
      }, []);
    async function fetchCategories() {
        const res = await fetch("/api/menu-items");
      if (res.ok) {
        const data = await res.json();
        setMenuItems(data);
      } else {
        // Handle errors or unexpected responses
        console.error("Failed to fetch categories");
      }
      
      }
  return (
    <div>
          <UserTabs isAdmin={true} />
      <div className="text-center my-6">
      <Link href={'/menu-items'} className="rounded-lg mt-3 w-[300px] border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3">Go to Add A Menu Items </Link>
      </div>
      <div className='flex flex-wrap justify-center gap-4'>
       {menuItems.length > 0 &&
              menuItems.map((e) => (
                <button className="rounded-lg gap-4  border mt-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3">
                <Link href={'/menu-items/edit/' +e._id}>
                <div>Edit this</div>
                  <div className="flex flex-col">
                  <div className='flex items-center'>
                  <img src={e.image} alt="" className="w-[200px] rounded-lg h-[150px]" />
                  </div>
                  <div className="flex flex-col justify-start items-start mt-3 text-gray-400">
                  <div className="flex gap-4">
                  </div>
                  <p><span className="text-gray-500 font-semibold">Name: </span>{e.name}</p>
                  <p><span className="text-gray-500 font-semibold">Price:$</span>  {e.price}</p>
                  <p><span className="text-gray-500 font-semibold">Description: </span><span className='w-[200px] line-clamp-2'>{e.description}</span> </p>
                  </div>
                  </div>
                </Link>
                </button>
              ))}
      </div>
    </div>
  )
}

export default page
