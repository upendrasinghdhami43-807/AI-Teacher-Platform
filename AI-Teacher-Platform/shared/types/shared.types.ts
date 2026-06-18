/**
 * Shared type definitions between student-web and admin-cms.
 * In Stage 1 these are duplicated into each app's types/ folder.
 * In Stage 2+, this will become a shared npm workspace package.
 */

export type Language = 'en' | 'ne' | 'hi' | 'ne_en';
export type Level = 'basic' | 'medium' | 'advanced' | 'recommended';
export type LessonMode = 'ai_teacher' | 'course' | 'smart_pdf';
export type Subject =
  | 'physics' | 'chemistry' | 'math' | 'biology'
  | 'computer_science' | 'nepali' | 'english' | 'social_studies';
export type CourseLevel =
  | 'class_8' | 'class_9' | 'class_10'
  | 'class_11' | 'class_12' | 'bachelor';
export type UserRole = 'student' | 'admin' | 'super_admin';
export type UserPlan = 'free' | 'basic' | 'pro';
export type UserStatus = 'active' | 'inactive' | 'suspended';
