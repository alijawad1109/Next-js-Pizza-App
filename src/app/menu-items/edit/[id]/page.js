"use client";
import { useEffect, useState } from "react";
import UserTabs from "../../../components/layout/UserTabs";
import UserProfile from "../../../components/UserProfile";
import toast from "react-hot-toast";
import Link from "next/link";
import DeleteButton from '@/app/components/DeleteButton'
// import { redirect } from "next/dist/server/api-utils";
import { useParams, useRouter } from "next/navigation";
import MenuItemsPriceProps from "@/app/components/layout/MenuItemsPriceProps";
const page = () => {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [extraIngredientsPrices, setExtraIngredientsPrices] = useState([]);
  // const [redirectItems,setRedirectItems]=useState(false)
  const router = useRouter();
  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id); // Fix here
        if (item) {
          setImage(item.image);
          setCategoryName(item.name);
          setPrice(item.price);
          setDescription(item.description);
          setSizes(item.sizes);
          setExtraIngredientsPrices(item.extraIngredientsPrices);
        }
      });
    });
  }, []);

  UserProfile();
  // const {loading:categoriesLoading,data:categoriesData}= UserProfile();
  // if(categoriesLoading){
  //   return "Loading ....."
  // }
  // if(!categoriesData.admin){
  //   return "Not be authorized to visit this page."
  // }
  ;
  const handleCategory = (e) => {
    e.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = {
        name: categoryName,
        price: price,
        description: description,
        image: image,
        _id: id,
      };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const res = await fetch("/api/menu-items", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setCategoryName(" ");
      setEditedCategory(" ");
      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    });
    toast
      .promise(creationPromise, {
        loading: "Updated Category...",
        success: "Updated Successfully!",
        error: "Error in creating category...",
      })
      .then(() => {
        // Use router.push to redirect after successful category creation/update
        router.push("/menu-items/new");
      });
  };
  const handleDelete = async () => {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch(`/api/menu-items?_id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    })
    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error in deleting",
    }).then(() => {
      // Use router.push to redirect after successful category creation/update
      router.push("/menu-items");
    });
  };
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
              <input
                type="number"
                className="rounded-lg w-[300px] mt-2 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3"
                value={price}
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="text"
                className="rounded-lg mt-2 w-[300px] border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3"
                value={description}
                placeholder="desccription"
                onChange={(e) => setDescription(e.target.value)}
              />
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
          <button className="btn"   onClick={handleCategory}>
            Update
          </button>
          <DeleteButton label={" Delete this item"} onDelete={handleDelete}/>
        </form>
        <div className="flex flex-col">
          <h2 className="flex flex-col">
            Edit Category:
            {menuItems.length > 0 &&
              menuItems.map((e) => (
                <button
                  onClick={() => {
                    setEditedCategory(e);
                    setCategoryName(e.name);
                    setImage(e.image);
                    setPrice(e.price);
                    setDescription(e.description);
                  }}
                  className="rounded-lg w-[220px] border mt-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3"
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
                        <span className="text-gray-500 font-semibold">
                          Description:{" "}
                        </span>
                        {e.description}
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
