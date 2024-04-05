import Image from "next/image";
import Hero from "./components/layout/Hero";
import SectionHeader from "./components/layout/SectionHeader";
import HomeMenu from "./components/layout/HomeMenu";
export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-4" id="about">
        <SectionHeader subHeader={"Our Story"} mainHeader={"About Us"} />
        <div className="flex-col gap-4 max-w-md mx-auto">
          <p className="text-gray-500 text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Dignissimos, incidunt. Magni odio sequi suscipit veritatis magnam
            asperiores sed. Voluptates quaerat illum sint cupiditate ipsa
            laborum corrupti vitae harum at laudantium!{" "}
          </p>
          <p className="text-gray-500 text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Dignissimos, incidunt. Magni odio sequi suscipit veritatis magnam
            asperiores sed. Voluptates quaerat illum sint cupiditate ipsa
            laborum corrupti vitae harum at laudantium!{" "}
          </p>
        </div>
      </section>
      <section className="text-center" id="contact">
        <SectionHeader subHeader={"Don't hesitate"} mainHeader={"Contact Us"}  />
        <a
          href="+92 3164944176"
          className="text-4xl text-gray-500 underline hover:text-gray-600"
        >
          +92 3164944176
        </a>
      </section>
    </>
  );
}
