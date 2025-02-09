"use client";
import { useState } from "react";

interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
}

const AchievementSection = ({ achievements }: { achievements: Achievement[] }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Achievements</h2>
      <ul className="space-y-4">
        {achievements.map((achievement) => (
          <li key={achievement.id} className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-lg font-semibold">{achievement.title}</h3>
            <p className="text-gray-300">{achievement.description}</p>
            <span className="text-sm text-gray-500">{achievement.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Example usage
const achievementsData: Achievement[] = [
  { id: 1, title: "Best Research Paper Award", description: "Received for outstanding research in AI", date: "2023" },
  { id: 2, title: "Keynote Speaker at XYZ Conference", description: "Delivered a talk on deep learning advancements", date: "2022" },
];

export default function ProfessorPortfolio() {
  return <AchievementSection achievements={achievementsData} />;
}
