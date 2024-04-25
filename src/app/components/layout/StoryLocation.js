import React from 'react'

const StoryLocation = () => {
  return (
    <div>
      <section class="w-full mt-8 mb-8 mx-auto overflow-hidden shadow-lg">
        <div class="flex flex-wrap md:flex-nowrap">
        <div class="w-full md:w-1/2 pl-[50px] p-8 flex flex-col justify-center items-start bg-hero-pattern text-white">
            <h1 class="font-bold text-white mb-2 text-center text-[80px]">Aj Pizza</h1>
            <p class="text-white w-96">
            Aj Pizza has given you a taste of the best of pizza and beyond since 1985. Get to know our story and brand history.
            </p>
          </div>
          <div class="w-full md:w-1/2 h-96 md:h-[400px] bg-cover bg-center">
            <img
              src="/Our Story Hero.png"
              alt=""
              className="w-full object-contain "
            />
          </div>


        </div>
      </section>

    </div>
  )
}
export default StoryLocation