import { useState, useEffect } from "react";
import CourseCard, { CourseCardProps } from "./CourseCard";
import SkeletonCard from "./SkeletonCard";
import CourseDetailsModal from "./CourseDetailsModal";

const COURSES: CourseCardProps[] = [
  {
    variant: "green",
    classTag: "Class 11 NEET",
    langBadge: "HINGLISH",
    title: "Arjuna",
    batchName: "NEET 2026",
    startDate: "Starts on 14th Apr'25",
    price: "₹4,999",
    oldPrice: "₹5600",
    discount: "11% OFF",
    cta: "Buy Now",
    flagLine: "Multiple plans inside: Infinity & Infinity Pro",
  },
  {
    variant: "yellow",
    classTag: "Class 11 NEET",
    langBadge: "हिंदी",
    title: "अर्जुना",
    batchName: "NEET 2026",
    startDate: "Starts on 14th Apr'25",
    price: "₹3,199",
    oldPrice: "₹5000",
    discount: "36% OFF",
    cta: "Buy Now",
    flagLine: "Limited Time Offer: Get it for ₹6,999 till 8th Feb",
  },
  {
    variant: "gray",
    classTag: "NEET 2027",
    langBadge: "हिंglish",
    title: "Power Batch",
    batchName: "Small Group Online Classes",
    startDate: "Starts on 8th Jan'25",
    price: "₹499",
    discount: "For Seat Booking",
    cta: "Book A Seat",
    flagLine: "Power Batch: Small Group Online Classes",
  },
];

/**
 * TrendingCourses — section header + three course cards + "View All Batches".
 * The three cards mirror the Figma design: Arjuna (green / Hinglish),
 * Arjuna (yellow / Hindi), and the gray Power Batch card.
 */
export type TrendingCoursesProps = {
  onAddToCart?: () => void;
};

export default function TrendingCourses({ onAddToCart }: TrendingCoursesProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCourse, setSelectedCourse] = useState<CourseCardProps | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      data-component="TrendingCourses"
      className="flex flex-col gap-16 px-16 pt-16 pb-16"
    >
      <h2 className="text-h3 font-semibold text-heading">Trending Courses</h2>

      <div className="flex flex-col gap-12">
        <CourseCard
          variant="green"
          classTag="Class 11 NEET"
          langBadge="HINGLISH"
          title="Arjuna"
          batchName="NEET 2026"
          startDate="Starts on 14th Apr'25"
          price="₹4,999"
          oldPrice="₹5600"
          discount="11% OFF"
          cta="Buy Now"
          flagLine="Multiple plans inside: Infinity & Infinity Pro"
          onAddToCart={onAddToCart}
        />

        <CourseCard
          variant="yellow"
          classTag="Class 11 NEET"
          langBadge="हिंदी"
          title="अर्जुना"
          batchName="NEET 2026"
          startDate="Starts on 14th Apr'25"
          price="₹3,199"
          oldPrice="₹5000"
          discount="36% OFF"
          cta="Buy Now"
          flagLine="Limited Time Offer: Get it for ₹6,999 till 8th Feb"
          onAddToCart={onAddToCart}
        />

        <CourseCard
          variant="gray"
          classTag="NEET 2027"
          langBadge="हिंglish"
          title="Power Batch"
          batchName="Small Group Online Classes"
          startDate="Starts on 8th Jan'25"
          price="₹499"
          discount="For Seat Booking"
          cta="Book A Seat"
          flagLine="Power Batch: Small Group Online Classes"
          onAddToCart={onAddToCart}
        />
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            {COURSES.map((course, idx) => (
              <CourseCard
                key={idx}
                {...course}
                onClick={() => setSelectedCourse(course)}
              />
            ))}
          </>
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

      {selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </section>
  );
}
