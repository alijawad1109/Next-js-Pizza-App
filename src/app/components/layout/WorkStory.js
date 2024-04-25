import React from "react";

const WorkStory = () => {
  return (
    <div>
      <section class="max-w-6xl mt-8 mx-auto rounded-lg overflow-hidden bg-white shadow-lg mb-8">
        <div class="flex flex-wrap md:flex-nowrap">
          <div class="w-full md:w-1/2 h-96 md:h-[400px] bg-cover bg-center">
            <img
              src="/story6.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div class="w-full md:w-1/2 p-8 flex flex-col justify-center bg-hero-pattern text-white">
            <h1 class="text-2xl font-bold text-white mb-4">WORK WITH US!</h1>
            <p class="text-white">
              We’re hiring part-time and full-time roles at Cicis! Find a job
              that fits you, whether you prefer working behind the scenes
              crafting our delicious pizzas or live for the fast-paced action on
              the buffet. Get to know the benefits of joining our friendly Cicis
              team and apply today.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkStory;
