import React from "react";

const WorkExperience = () => {
  return (
    <div className="w-full">
      <section className="mx-auto rounded-lg overflow-hidden">
        <div className="flex flex-wrap md:flex-nowrap">
          <div className="lg:w-1/2 w-full p-8 flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              30+ YEARS OF DELICIOUS PIZZA
            </h1>
            <p className="text-gray-600">
              In 1985, Cicis opened its doors for the very first time in Plano,
              Texas – and just like that, the Original home of all the pizza,
              pasta, salad, and desserts you can eat was born. For nearly four
              decades, Cicis has been committed to creating fun, family-friendly
              restaurants where guests can spend quality time together and enjoy
              all their favorites for one low price.
              <br />
              <br />
              Consistently adapting to meet the changing needs of its guests in
              recent years, Cicis put a stronger focus on its off-premise
              options with the launch of online ordering, and new menu items.
              Now, fans can easily order their favorites for pick-up or delivery
              at Cicis locations across the country, making it easier for guests
              to enjoy TBPVA™, wherever they want to!  TBPVA™, you ask?  The
              Best Pizza Value Anywhere!
              <br />
              <br />
              Today, the brand has more than 300 restaurants in 30-plus states
              and has been ranked by CNN Money as the No. 1 “Casual Dining Pizza
              Chain (for your money) in America,” named by Technomic as the No.
              2 “Most Kid-Friendly Chain as voted by Millennial Moms” and
              recognized by Nation’s Restaurant News among its Top 200
              Restaurant Chains and Franchise Times Top 400.
            </p>
          </div>
          <div className="lg:w-1/2 w-full h-96 md:h-auto bg-cover bg-center">
            <div className="flex justify-between gap-2">
                <img src="./story2.png" alt="" className="rounded-2xl" />
                <img src="./story3.png" alt="" className="rounded-2xl"/>
            </div>
            <div className="justify-between gap-2 mt-3 hidden md:inline-flex">
                <img src="./story4.png" alt="" className="rounded-2xl" />
                <img src="./story5.png" alt="" className="rounded-2xl"/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkExperience;
