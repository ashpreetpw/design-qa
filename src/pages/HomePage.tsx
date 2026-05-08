import { useState } from "react";
import StatusBar from "../components/StatusBar";
import TopNav from "../components/TopNav";
import ClassSelector from "../components/ClassSelector";
import CivilServicesBanner from "../components/CivilServicesBanner";
import CategoryChips from "../components/CategoryChips";
import TrendingCourses from "../components/TrendingCourses";
import WhatsNew from "../components/WhatsNew";
import FloatingCartBar from "../components/FloatingCartBar";
import CourseCard, { CourseCardProps } from "../components/CourseCard";
import CourseDetailsModal from "../components/CourseDetailsModal";
import DoubtBubble from "../components/DoubtBubble";

/**
 * Static list for the "All Courses" section. Defined here so each card can
 * be passed to the lifted modal handler with the right course payload.
 *
 * Each entry carries its own `image` so a future thumbnail-generation API
 * can populate a unique URL per course without any UI changes.
 */
const PLACEHOLDER_THUMB = "/assets/biology-crash-course.png";

const ALL_COURSES: CourseCardProps[] = [
  {
    image: PLACEHOLDER_THUMB,
    classTag: "Class 12",
    langBadge: "HINGLISH",
    title: "Lakshya JEE",
    batchName: "JEE 2026",
    startDate: "Starts on 20th May'25",
    price: "₹4,500",
    oldPrice: "₹6000",
    discount: "25% OFF",
    cta: "Buy Now",
    flagLine: "Includes infinite test series",
  },
  {
    image: PLACEHOLDER_THUMB,
    classTag: "UPSC CSE",
    langBadge: "HINDI",
    title: "Sankalp UPSC",
    batchName: "UPSC 2026",
    startDate: "Starts on 1st Jun'25",
    price: "₹10,999",
    oldPrice: "₹15000",
    discount: "26% OFF",
    cta: "Buy Now",
    flagLine: "Live Interactive Classes",
  },
  {
    image: PLACEHOLDER_THUMB,
    classTag: "Class 10",
    langBadge: "ENGLISH",
    title: "Udaan Fastrack",
    batchName: "Board Exams 2026",
    startDate: "Starts on 15th Mar'25",
    price: "₹2,499",
    discount: "Early Bird",
    cta: "Enroll Now",
    flagLine: "Complete Science & Math",
  },
];

/**
 * HomePage — mobile-only composition of the course-app home screen.
 * Outer gray page centers a 360px mobile frame; everything inside the
 * frame is the implementation of Figma node 3235-4269.
 *
 * Modal state lives here (lifted from TrendingCourses) so a single
 * CourseDetailsModal serves both the Trending and All Courses sections.
 */
export default function HomePage() {
  const [cartCount, setCartCount] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState<CourseCardProps | null>(
    null
  );

  const handleAddToCart = () => {
    setCartCount((c) => c + 1);
  };

  const handleCourseClick = (course: CourseCardProps) => {
    setSelectedCourse(course);
  };

  return (
    <div className="min-h-screen w-full bg-gray-200 flex justify-center">
      <div
        data-component="MobileFrame"
        className="relative w-[360px] min-h-screen bg-white shadow-card overflow-hidden"
      >
        {/* Gradient backdrop with glow for the header area */}
        <div className="absolute inset-x-0 top-0 h-[400px] pointer-events-none bg-gradient-to-b from-[#ade6c6] to-transparent to-[78%] overflow-hidden">
          <div className="absolute bottom-[60px] h-[334px] left-1/2 w-[644px] -translate-x-1/2 pointer-events-none">
            <img alt="" className="absolute inset-0 block max-w-none w-full h-full" src="/assets/glow.svg" />
          </div>
        </div>
        <div className="relative z-10">
          <StatusBar />
          <TopNav />
          <ClassSelector />
          <CivilServicesBanner />
          <CategoryChips />
        </div>

        <div className="relative z-10 bg-white">
          <TrendingCourses
            onAddToCart={handleAddToCart}
            onCourseClick={handleCourseClick}
          />
          <WhatsNew />
          <div id="all-courses" className="px-16 pt-16 pb-40 text-left">
            <h2 className="text-h3 font-semibold text-heading mb-12">All Courses</h2>
            <div className="flex flex-col gap-12">
              {ALL_COURSES.map((course, idx) => (
                <CourseCard
                  key={idx}
                  {...course}
                  onAddToCart={handleAddToCart}
                  onClick={() => handleCourseClick(course)}
                />
              ))}
            </div>
          </div>
        </div>

        <DoubtBubble />
      </div>

      {/* FloatingCartBar must live OUTSIDE the overflow-hidden frame so
          its fixed positioning isn't clipped by the parent stacking context */}
      <FloatingCartBar cartCount={cartCount} />

      {/* Single modal instance, driven by lifted state, so every card
          (Trending + All Courses) opens the same modal */}
      {selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
}
