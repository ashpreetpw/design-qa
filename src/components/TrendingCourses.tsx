import CourseCard, { CourseCardProps } from "./CourseCard";
import SkeletonCard from "./SkeletonCard";

/**
 * TrendingCourses — section header + course cards + "View All Batches".
 *
 * Course data is fetched by the parent (HomePage) from /api/courses and
 * passed down here. Loading state is also driven by the parent so that
 * the skeleton count matches the number of courses being fetched.
 *
 *  - courses: array of course objects from the API
 *  - isLoading: show skeletons while the fetch is in-flight
 *  - onAddToCart: bumps the floating cart count (handled in HomePage)
 *  - onCourseClick: opens the shared CourseDetailsModal (state in HomePage)
 */
export type TrendingCoursesProps = {
  courses: CourseCardProps[];
  isLoading?: boolean;
  onAddToCart?: () => void;
  onCourseClick?: (course: CourseCardProps) => void;
};

export default function TrendingCourses({
  courses,
  isLoading = false,
  onAddToCart,
  onCourseClick,
}: TrendingCoursesProps) {
  // Use fetched course count for skeleton count, fall back to 3 while
  // the first response hasn't arrived yet (courses will be empty).
  const skeletonCount = courses.length || 3;

  return (
    <section
      data-component="TrendingCourses"
      className="flex flex-col gap-16 px-16 pt-16 pb-16"
    >
      <h2 className="text-h3 font-semibold text-heading">Trending Courses</h2>

      <div className="flex flex-col gap-12">
        {isLoading ? (
          Array.from({ length: skeletonCount }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        ) : (
          courses.map((course, idx) => (
            <CourseCard
              key={course.id ?? idx}
              {...course}
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
          document.getElementById('all-courses')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        View All Batches
      </button>
    </section>
  );
}
