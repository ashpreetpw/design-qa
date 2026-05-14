import { useState, useEffect } from "react";
import CourseCard, { CourseCardProps } from "./CourseCard";
import SkeletonCard from "./SkeletonCard";
import { fetchBatchThumbnail } from "../utils/fetchBatchThumbnail";
import { fetchCourses } from "../utils/supabase";

export type TrendingCoursesProps = {
  onAddToCart?: () => void;
  onCourseClick?: (course: CourseCardProps) => void;
};

export default function TrendingCourses({
  onAddToCart,
  onCourseClick,
}: TrendingCoursesProps) {
  const [courses, setCourses] = useState<CourseCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [thumbnails, setThumbnails] = useState<Record<number, string>>({});

  // Fetch courses from Supabase
  useEffect(() => {
    fetchCourses("trending")
      .then((data) => {
        setCourses(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Fetch thumbnails once courses are loaded
  useEffect(() => {
    if (courses.length === 0) return;
    async function loadThumbnails() {
      const results = await Promise.all(
        courses.map((c, idx) =>
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
      setThumbnails(map);
    }
    loadThumbnails();
  }, [courses]);

  return (
    <section
      data-component="TrendingCourses"
      className="flex flex-col gap-16 px-16 pt-16 pb-16"
    >
      <h2 className="text-h3 font-semibold text-heading">Trending Courses</h2>

      <div className="flex flex-col gap-12">
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          courses.map((course, idx) => (
            <CourseCard
              key={idx}
              {...course}
              imageUrl={thumbnails[idx]}
              onAddToCart={onAddToCart}
              onClick={() => onCourseClick?.(course)}
            />
          ))
        )}
      </div>

      <button
        data-component="ViewAllBatchesButton"
        className="rounded border border-brand-primary py-10 text-regular font-bold text-brand-primary"
        onClick={() => {
          document.getElementById("all-courses")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        View All Batches
      </button>
    </section>
  );
}
