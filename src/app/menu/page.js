"use client";
import React, { useEffect, useState } from "react";
import SectionHeader from "../components/layout/SectionHeader";
import MenuItems from "../components/menu/MenuItems";
const page = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuIitems] = useState([]);
  useEffect(() => {
    fetch("/api/categories").then((res) =>
      res.json().then((categories) => setCategories(categories))
    );
    fetch("/api/menu-items").then((res) =>
      res.json().then((menuItems) => setMenuIitems(menuItems))
    );
  }, []);
  return (
    <div>
      {categories.length > 0 &&
        categories.map((c) => (
          <div>
            <div className="text-center">
              <SectionHeader mainHeader={c.name} />
            </div>
            <div className="">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-4">
                {menuItems
                  .filter((item) => item.category === c._id)
                  .map((item) => (
                    <MenuItems {...item} />
                  ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default page;
