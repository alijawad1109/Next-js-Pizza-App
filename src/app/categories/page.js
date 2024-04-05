"use client";
import { useEffect, useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import {UserProfile} from "../components/UserProfile";
import toast from "react-hot-toast";
import Trash from "../components/icons/Trash";
import Edit from "../components/icons/Edit";
import DeleteButton from "../components/DeleteButton";

const page = () => {
  const [categoryName, setCategoryName] = useState(" ");
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);
  useEffect(() => {
    fetchCategories();
  }, []);
  async function fetchCategories() {
    const res = await fetch("/api/categories");
    if (res.ok) {
      const data = await res.json();
      setCategories(data);
    } else {
      // Handle errors or unexpected responses
      console.error("Failed to fetch categories");
    }
  }
  UserProfile();
  const {loading:categoriesLoading,data:categoriesData}= UserProfile();
  if(categoriesLoading){
    return "Loading ....."
  }
  if(!categoriesData.admin){
    return "Not be authorized to visit this page."
  }
  const handledelete = async (_id) =>{
    const promise = new Promise(async(resolve,reject)=>{
     const res =  await fetch('/api/categories?_id=' +_id,{
      method:"DELETE",
    });if(res.ok){
      resolve()
    }else{
      reject();
    }
    })
    await toast.promise(promise,{
      loading:"Deleting...",
      success:"Deleted",
      error:"Error in deleting"
    })
    fetchCategories();
  }
  const handleCategory = (e) => {
    e.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const res = await fetch("/api/categories", {
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
    toast.promise(creationPromise, {
      loading: editedCategory
        ? "Updated Category"
        : "Creating your category...",
      success: editedCategory ? "Updated Successfully!" : "Category created...",
      error: "Error in creating category...",
    });
  };
  return (
    <div>
      <UserTabs isAdmin={true} />
      <section className="max-w-xs mx-auto mt-8 ">
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
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
          </div>
          <div className=" flex gap-3">
          <button className="btn">
            {editedCategory ? "Update" : "Create"}
          </button>
          <button onClick={()=>{
            setEditedCategory(null);
            setCategoryName(' ')
          }} type="button">
           Cancel
          </button>
          </div>
        </form>
        <div className="flex flex-col">
          <h2 className="flex flex-col">
            Existing Category:
            {categories.length > 0 &&
              categories.map((e) => (
                <div className="rounded-lg border mt-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3 flex justify-between items-center">
                  <span> {e.name}</span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setEditedCategory(e);
                        setCategoryName(e.name);
                      }}
                    >
                      <Edit />
                    </button>
                    <DeleteButton label={'Del'} onDelete={() =>handledelete(e._id)}/>
                  </div>
                </div>
              ))}
          </h2>
        </div>
      </section>
    </div>
  );
};

export default page;
