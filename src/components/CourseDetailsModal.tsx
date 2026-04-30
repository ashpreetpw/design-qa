import { useEffect } from "react";
import { CourseCardProps } from "./CourseCard";

interface CourseDetailsModalProps {
  course: CourseCardProps;
  onClose: () => void;
}

export default function CourseDetailsModal({
  course,
  onClose,
}: CourseDetailsModalProps) {
  // Listen for the Escape key to close the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      data-component="CourseDetailsModal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
      >
        <div className="flex items-start justify-between border-b pb-4">
          <div>
            <h2 className="text-2xl font-bold text-heading">{course.title}</h2>
            <p className="mt-1 text-sm font-medium text-orange-500">
              {course.classTag} {course.langBadge && `• ${course.langBadge}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <div className="rounded-lg bg-gray-50 p-4">
            <h3 className="font-semibold text-heading">Batch Details</h3>
            <p className="mt-1 text-sm text-body1">📘 {course.batchName}</p>
            <p className="mt-1 text-sm text-body1">📅 {course.startDate}</p>
          </div>

          <div>
            <h3 className="font-semibold text-heading">Pricing</h3>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-2xl font-bold text-heading">{course.price}</span>
              {course.oldPrice && (
                <span className="text-sm text-body2 line-through">
                  {course.oldPrice}
                </span>
              )}
              {course.discount && (
                <span className="text-sm font-semibold text-green-600">
                  {course.discount}
                </span>
              )}
            </div>
          </div>

          {course.flagLine && (
            <div className="mt-2 rounded border border-orange-200 bg-orange-50 p-3 text-sm font-medium text-orange-700">
              ✨ {course.flagLine}
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-heading py-3 text-center font-semibold text-white sm:w-auto sm:px-8"
          >
            {course.cta}
          </button>
        </div>
      </div>
    </div>
  );
}
