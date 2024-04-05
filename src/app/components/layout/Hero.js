import React from "react";
import Right from "../icons/Right";

const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center mt-4 px-4 lg:px-8">
      <div className="lg:w-[400px] md:w-[300px] w-full text-center lg:text-left">
        <h1 className="text-2xl lg:text-4xl font-semibold">
          Everything is better with a{" "}
          <span className="text-orange-600">Pizza</span>
        </h1>
        <p className="text-gray-400 my-4">
          Pizza is the missing piece that makes every day complete, a simple yet
          delicious joy in life.
        </p>
        <div className="flex justify-center lg:justify-start gap-4">
          <button className="btn flex gap-2 items-center">
            Order now
            <Right/>
          </button>
          <button>Learn more</button>
        </div>
      </div>
      <div className="mt-8 lg:mt-0 flex justify-center">
        <img
          src="./pizza.png"
          alt="Pizza"
          className="w-56 h-56 lg:w-72 lg:h-72 object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
