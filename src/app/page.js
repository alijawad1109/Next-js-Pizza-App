import Image from "next/image";
import Hero from "./components/layout/Hero";
import SectionHeader from "./components/layout/SectionHeader";
import HomeMenu from "./components/layout/HomeMenu";
import Footer from "./components/layout/Footer";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center" id="contact">
        <SectionHeader subHeader={"Don't hesitate"} mainHeader={"Contact Us"}  />
        <a
          href="+92 3164944176"
          className="text-4xl text-gray-500 underline hover:text-gray-600"
        >
          +111 786 9898
        </a>
      </section>
      <section className="text-center my-4" id="about">
      <Link href={'/our-story'}>
        <SectionHeader subHeader={"Our Story"} mainHeader={"About Us"} />
      </Link>
        <div className="flex-col gap-4 max-w-md mx-auto">
          <p className="text-gray-500 text-sm">
          Here’s a cozy invitation for all the food lovers out there! Curious about how a passion for authentic flavors and a dream mixed with mozzarella and marinara became your favorite pizza spot? Visit our 'Our Story' page to unravel the full saga behind the slices. From our humble beginnings to becoming a community favorite, every step in our journey is a piece of our heart that we can’t wait to share with you. So, let's connect over a pie and stories that are just as warm. Click through to see how a simple love for pizza baked into something so much more. See you there!
          </p>
        </div>
      </section>
      <Footer/>
    </>
  );
}
