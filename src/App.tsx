import StatusBar from "./components/StatusBar";
import TopNav from "./components/TopNav";
import ClassSelector from "./components/ClassSelector";
import CivilServicesBanner from "./components/CivilServicesBanner";
import CategoryChips from "./components/CategoryChips";
import TrendingCourses from "./components/TrendingCourses";
import WhatsNew from "./components/WhatsNew";

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
        </div>
      </div>
    </div>
  );
}
