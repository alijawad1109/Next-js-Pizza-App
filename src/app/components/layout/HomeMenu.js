"use client";
import React, { useEffect, useState } from "react";
import MenuItems from "../menu/MenuItems";
import SectionHeader from "./SectionHeader";

const HomeMenu = () => {
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    fetch("/api/menu-items").then(res =>
      res.json().then((menuItems) => {
        const bestSellers = menuItems;
        console.log(bestSellers);
        setBestSellers(bestSellers);
      })
    );
  }, []);
  return (
    <section>
      <div>
        <div className="absolute h-48 w-28 left-0">
          <img src="./sallad1.png" alt="" className="w-full h-full" />
        </div>
        <div className="absolute h-48 w-28 right-0">
          <img src="./sallad2.png" alt="" className="w-full h-full" />
        </div>
      </div>
      <SectionHeader subHeader={"Check Out"} mainHeader={"Our Best Sellers"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {bestSellers?.length > 0 &&
          bestSellers.map((item) => <MenuItems key={item._id} {...item} />)}
      </div>
    </section>
  );
};

export default HomeMenu;
