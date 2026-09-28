"use client";

import React from "react";
import { CourseCard } from "@/components/course/course-card";

export interface CourseItem {
  id: string;
  title: string;
  slug: string;
  shortDesc?: string | null;
  thumbnail?: string | null;
  price: number;
  discountedPrice?: number | null;
  level?: string;
  lessonsCount?: number;
  category: string;
  instructor: string;
  instructorRole?: string;
  rating: number;
  reviewsCount: number;
  totalHours: string;
  updatedDate?: string;
  badgeType?: "bestseller" | "hot" | "role_play" | "new" | null;
  outcomes?: string[];
  isPaid: boolean;
}

interface CourseCardGridProps {
  course: CourseItem;
  variant?: "udemy" | "compact";
}

export function CourseCardGrid({ course }: CourseCardGridProps) {
  return (
    <CourseCard
      id={course.id}
      title={course.title}
      slug={course.slug}
      shortDesc={course.shortDesc}
      thumbnail={course.thumbnail}
      price={course.price}
      discountedPrice={course.discountedPrice}
      level={course.level}
      lessonsCount={course.lessonsCount}
      category={course.category}
      instructor={course.instructor}
      rating={course.rating}
      reviewsCount={course.reviewsCount}
      totalHours={course.totalHours}
      updatedDate={course.updatedDate}
      outcomes={course.outcomes}
    />
  );
}






