"use server";

import { getHomeFeaturedCourses, HomeCourseItem } from "@/services/course.service";

/**
 * Server Action: Fetch course data for frontend rendering
 * Can be called from Server Components and Client Components
 */
export async function fetchHomeCourses(limit: number = 8): Promise<HomeCourseItem[]> {
  return getHomeFeaturedCourses(limit);
}
