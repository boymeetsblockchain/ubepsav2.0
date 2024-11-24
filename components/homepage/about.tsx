import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { prata } from "@/font";
import Link from "next/link";

export const AboutSection = async () => {
  // Save user to the database if available

  return (
    <div
      className={cn(
        "relative h-[500px] md:h-[600px] lg:h-[700px] bg-center bg-cover flex items-center justify-center",
        prata.className
      )}
      style={{ backgroundImage: 'url("/about.jpg")' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-4 md:px-8 lg:px-12">
        <h1
          className={cn(
            "text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          )}
        >
          History of UBEPSA.
        </h1>
        <h2
          className={cn(
            "text-base md:text-xl lg:text-2xL text-white text-left font-medium mb-6"
          )}
        >
          Like every other associations, the University of Benin Physiotherapy
          Association aka UBEPSA, has had its ups, downs share of glory and not
          so glory. But a major landmark in its history is its Origin. The
          Association stands to build a community of Physiotherapy students in
          Uniben, fostering internal relationships, structure and order amongst
          the students. It's Idea of an association is a "Big Family" composed
          of an Administrative body and its members.
        </h2>

        {/* CTA Button */}
        <Button className="bg-ubepsa text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-white hover:text-ubepsa hover:border-ubepsa dark:bg-[#0C4860] dark:hover:bg-[#0C4860] dark:hover:text-white border border-transparent">
          <Link href={"/about"}>Read More</Link>
        </Button>
      </div>
    </div>
  );
};
