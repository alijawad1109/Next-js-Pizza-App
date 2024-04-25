import React from 'react';

const OwnerStory = () => {
  return (
    <div>
      <section className="mt-8 mb-8 mx-auto overflow-hidden bg-white shadow-lg relative clip-wave">
        <div className="flex flex-wrap md:flex-nowrap">
          <div className="w-full md:w-1/2 h-96 md:h-[400px] bg-cover bg-center">
            <img
              src="/story7.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-hero-pattern text-white">
            <h1 className="text-5xl font-bold text-white mb-4 text-center">OWN A CICIS PIZZA</h1>
            <p className="text-white lg:ml-10">
              Here, we’re all about the pizzabilites. See what you can achieve by opening your own Cicis Pizza. Learn what makes us one of the best pizza franchise opportunities and how you can join as a Cicis franchisee.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OwnerStory;
