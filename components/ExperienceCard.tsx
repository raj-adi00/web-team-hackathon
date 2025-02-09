import { FC } from "react";

interface ExperienceCardProps {
  instituteName: string;
  startDate: { month: string; year: number };
  endDate: { month: string; year: number };
  courses: string[];
  description?: string;
}

const ExperienceCard: FC<ExperienceCardProps> = ({
  instituteName,
  startDate,
  endDate,
  courses,
  description,
}) => {
  const formatDate = (date: { month: string; year: number }) => {
    return `${date.month} ${date.year}`;
  };

  return (
    <div className="rounded-xl overflow-hidden bg-gradient-to-br from-blue-900 to-blue-950 shadow-lg">
      <div className="p-6">
        {/* Institute Name */}
        <h3 className="text-xl font-bold text-white mb-2">{instituteName}</h3>

        {/* Duration */}
        <div className="text-blue-100 mb-4 text-sm">
          {formatDate(startDate)} - {formatDate(endDate)}
        </div>

        {/* Description if available */}
        {description && (
          <p className="text-blue-50 mb-4 text-sm">{description}</p>
        )}

        {/* Courses */}
        <div className="space-y-2">
          <h4 className="text-blue-100 font-semibold text-sm">
            Courses Taught:
          </h4>
          {/* <div className="overflow-auto h-10"> */}
          <div className="flex flex-wrap gap-2">
            {courses.map((course, index) => (
              <span
                key={index}
                className="bg-blue-900/50 text-blue-50 px-3 py-1 rounded-full text-sm"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom decorative bar */}
      <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-300" />
    </div>
  );
};

export default ExperienceCard;
