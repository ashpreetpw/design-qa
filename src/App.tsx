import StatusBar from "./components/StatusBar";
import TopNav from "./components/TopNav";
import ClassSelector from "./components/ClassSelector";
import CivilServicesBanner from "./components/CivilServicesBanner";
import CategoryChips from "./components/CategoryChips";
import TrendingCourses from "./components/TrendingCourses";
import WhatsNew from "./components/WhatsNew";
import FloatingCartBar from "./components/FloatingCartBar";
import { useState, useEffect } from "react";
import CourseCard, { CourseCardProps } from "./components/CourseCard";
import CourseDetailsModal from "./components/CourseDetailsModal";
import DoubtBubble from "./components/DoubtBubble";
import { fetchBatchThumbnail } from "./utils/fetchBatchThumbnail";
import { fetchCourses } from "./utils/supabase";

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState<CourseCardProps | null>(null);
  const [allCourses, setAllCourses] = useState<CourseCardProps[]>([]);
  const [allCourseThumbnails, setAllCourseThumbnails] = useState<Record<number, string>>({});

  // Fetch "all" courses from Supabase
  useEffect(() => {
    fetchCourses("all").then((data) => setAllCourses(data));
  }, []);

  // Fetch thumbnails once courses are loaded
  useEffect(() => {
    if (allCourses.length === 0) return;
    async function loadThumbnails() {
      const results = await Promise.all(
        allCourses.map((c, idx) =>
          fetchBatchThumbnail({
            id: (c as any).id,
            title: c.title,
            batchName: c.batchName,
            bannerColor: (c as any).bannerColor,
            imageUrl: c.imageUrl,
            variant: c.variant,
          }).then((url) => ({ idx, url }))
        )
      );
      const map: Record<number, string> = {};
      for (const { idx, url } of results) {
        if (url) map[idx] = url;
      }
      setAllCourseThumbnails(map);
    }
    loadThumbnails();
  }, [allCourses]);

  const handleAddToCart = () => setCartCount((c) => c + 1);
  const handleCourseClick = (course: CourseCardProps) => setSelectedCourse(course);

  return (
    <div className="min-h-screen w-full bg-gray-200 flex justify-center">
      <div
        data-component="MobileFrame"
        className="relative w-[360px] min-h-screen bg-white shadow-card overflow-hidden"
      >
        {/* Gradient backdrop */}
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
              {allCourses.map((course, idx) => (
                <CourseCard
                  key={idx}
                  {...course}
                  imageUrl={allCourseThumbnails[idx]}
                  onAddToCart={handleAddToCart}
                  onClick={() => handleCourseClick(course)}
                />
              ))}
            </div>
          </div>
        </div>

        <DoubtBubble />
      </div>

      <FloatingCartBar cartCount={cartCount} />

      {selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
}
