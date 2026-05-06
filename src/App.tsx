import StatusBar from "./components/StatusBar";
import TopNav from "./components/TopNav";
import ClassSelector from "./components/ClassSelector";
import CivilServicesBanner from "./components/CivilServicesBanner";
import CategoryChips from "./components/CategoryChips";
import TrendingCourses from "./components/TrendingCourses";
import WhatsNew from "./components/WhatsNew";
import CourseCard from "./components/CourseCard";
import DoubtBubble from "./components/DoubtBubble";

/**
 * App root — mobile-only composition of the course-app home screen.
 * Outer gray page centers a 360px mobile frame; everything inside the
 * frame is the implementation of Figma node 3235-4269.
 */
export default function App() {
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
          <TrendingCourses />
          <WhatsNew />
          <div id="all-courses" className="px-16 pt-16 pb-40 text-left">
            <h2 className="text-h3 font-semibold text-heading mb-12">All Courses</h2>
            <div className="flex flex-col gap-12">
              <CourseCard
                variant="green"
                classTag="Class 12"
                langBadge="HINGLISH"
                title="Lakshya JEE"
                batchName="JEE 2026"
                startDate="Starts on 20th May'25"
                price="₹4,500"
                oldPrice="₹6000"
                discount="25% OFF"
                cta="Buy Now"
                flagLine="Includes infinite test series"
              />
              <CourseCard
                variant="yellow"
                classTag="UPSC CSE"
                langBadge="HINDI"
                title="Sankalp UPSC"
                batchName="UPSC 2026"
                startDate="Starts on 1st Jun'25"
                price="₹10,999"
                oldPrice="₹15000"
                discount="26% OFF"
                cta="Buy Now"
                flagLine="Live Interactive Classes"
              />
              <CourseCard
                variant="gray"
                classTag="Class 10"
                langBadge="ENGLISH"
                title="Udaan Fastrack"
                batchName="Board Exams 2026"
                startDate="Starts on 15th Mar'25"
                price="₹2,499"
                discount="Early Bird"
                cta="Enroll Now"
                flagLine="Complete Science & Math"
              />
            </div>
          </div>
        </div>
        <DoubtBubble />
      </div>
    </div>
  );
}
