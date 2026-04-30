import { useState } from "react";
import CourseCard, { CourseCardProps } from "./CourseCard";
import CourseDetailsModal from "./CourseDetailsModal";

/**
 * TrendingCourses — section header + three course cards + "View All Batches".
 * The three cards mirror the Figma design: Arjuna (green / Hinglish),
 * Arjuna (yellow / Hindi), and the gray Power Batch card.
 */
export default function TrendingCourses() {
  const [selectedCourse, setSelectedCourse] = useState<CourseCardProps | null>(null);

  return (
    <section
      data-component="TrendingCourses"
      className="flex flex-col gap-16 px-16 pt-16 pb-12"
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
          onClick={() =>
            setSelectedCourse({
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
            })
          }
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
          onClick={() =>
            setSelectedCourse({
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
            })
          }
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
          onClick={() =>
            setSelectedCourse({
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
            })
          }
        />
      </div>

      <button
        data-component="ViewAllBatchesButton"
        className="rounded border border-brand-primary py-10 text-regular font-semibold text-brand-primary"
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
