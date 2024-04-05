"use client";
import { useEffect, useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import {UserProfile} from "../components/UserProfile";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MenuItemsPriceProps from "../components/layout/MenuItemsPriceProps";

const page = () => {
  const [categoryName, setCategoryName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [extraIngredientsPrices, setExtraIngredientsPrices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const router = useRouter();
  useEffect(() => {
    async function fetchCategoriesData() {
      const response = await fetch("/api/categories"); // Adjust the API endpoint as needed
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    }
    fetchCategoriesData();
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

  // UserProfile();
  const {loading:categoriesLoading,data:categoriesData}= UserProfile();
  if(categoriesLoading){
    return "Loading ....."
  }
  if(!categoriesData.admin){
    return "Not be authorized to visit this page."
  }

  const handleCategory = (e) => {
    e.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = {
        name: categoryName,
        price: price,
        description: description,
        image: image,
        sizes: sizes,
        extraIngredientsPrices: extraIngredientsPrices,
        category: selectedCategory, // Include this line
      };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const res = await fetch("/api/menu-items", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setCategoryName(" ");
      fetchCategories();
      setEditedCategory(" ");
      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    });
    toast
      .promise(creationPromise, {
        loading: editedCategory
          ? "Updated Category"
          : "Creating your category...",
        success: editedCategory
          ? "Updated Successfully!"
          : "Category created...",
        error: "Error in creating category...",
      })
      .then(() => {
        // Use router.push to redirect after successful category creation/update
        router.push("/menu-items/new");
      });
  };
  // useEffect(() => {
  //   getCategories();
  // }, []);
  // const getCategories = async () => {
  //   await fetch("/api/categories").then((res) =>
  //     res.json().then((item) => {
  //       setItem(item);
  //     })
  //   );
  // };
  return (
    <div>
      <UserTabs isAdmin={true} />
      <div className="text-center mt-6">
        <Link
          href={"/menu-items/new"}
          className="rounded-lg mt-3 w-[300px] border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3"
        >
          Go to Visit Menu Items Page
        </Link>
      </div>
      <section className="max-w-[900px] mx-auto mt-8 ">
        <form
          className="flex flex-col gap-1 items-center"
          onSubmit={handleCategory}
        >
          <div className="flex gap-2">
            <div className="flex flex-col w-[300px]">
              <label>
                {editedCategory ? "Update Category" : "New Category Name"}{" "}
                {editedCategory && (
                  <>
                    {" "}
                    : <b>{editedCategory.name}</b>
                  </>
                )}
              </label>
              <input
                type="text"
                className="rounded-lg w-[300px] border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3"
                value={categoryName}
                placeholder="Item Name"
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <label>Price</label>
              <input
                type="number"
                className="rounded-lg w-[300px] mt-2 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3"
                value={price}
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
              <label>Description</label>
              <input
                type="text"
                className="rounded-lg mt-2 w-[300px] border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3"
                value={description}
                placeholder="desccription"
                onChange={(e) => setDescription(e.target.value)}
              />
              <label>Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-lg mt-2 w-[300px] border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3"
              >
                <option value="">Select a Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <label>Image</label>
              <input
                type="text"
                className="rounded-lg mt-2 w-[300px] border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3"
                value={image}
                placeholder="Image Address"
                onChange={(e) => setImage(e.target.value)}
              />
              <MenuItemsPriceProps
                name={"Sizes"}
                addLabel={"Add item size"}
                props={sizes}
                setProps={setSizes}
              />
              <MenuItemsPriceProps
                name={"Extra Ingredients"}
                addLabel={"Add Ingredients Prices"}
                props={extraIngredientsPrices}
                setProps={setExtraIngredientsPrices}
              />
            </div>
          </div>
          <button className="btn">
            {editedCategory ? "Update" : "Create"}
          </button>
        </form>
            Edit&nbsp;Category:
        <div className="flex">
          <h2 className="flex gap-4">
            {menuItems.length > 0 &&
              menuItems.map((e) => (
                <button
                  onClick={() => {
                    setEditedCategory(e);
                    setCategoryName(e.name);
                    setImage(e.image);
                    setPrice(e.price);
                    setDescription(e.description)
                  }}
                  className="rounded-lg p-2 border mt-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3"
                >
                  <div className="flex flex-col w-[250px]">
                    <img src={e.image} alt="" className="w-[200px] h-[150px]" />
                    <div className="flex flex-col justify-start items-start mt-3 text-gray-400">
                      <div className="flex gap-4"></div>
                      <p>
                        <span className="text-gray-500 font-semibold">
                          Name:{" "}
                        </span>
                        {e.name}
                      </p>
                      <p>
                        <span className="text-gray-500 font-semibold">
                          Price:$
                        </span>{" "}
                        {e.price}
                      </p>
                      <p>
                        <span className="text-gray-500 font-semibold ">
                          Description:{" "}
                        </span>
                        <span className="line-clamp-3 text-sm">
                        {e.description}
                        </span>
                      </p>
                    </div>
                  </div>
                </button>
              ))}
          </h2>
        </div>
      </section>
    </div>
  );
};

export default page;
