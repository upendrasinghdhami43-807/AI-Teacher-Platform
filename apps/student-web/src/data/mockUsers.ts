import type { User } from '@/types';

export const mockUsers: User[] = [
  {
    user_id: 'u-001', name: 'Ramesh Sharma', email: 'ramesh@email.com', role: 'student', plan: 'free', status: 'active',
    phone: '+977 9841234567', grade: 'Class 11 (Science)', school: 'Budhanilkantha School',
    enrolled_courses: ['c-001', 'c-003'], progress: [
      { course_id: 'c-001', completed_lessons: ['l-001','l-002','l-003'], current_lesson_id: 'l-004', completion_percentage: 25, last_accessed_at: '2026-06-17T14:00:00Z' },
    ],
    memory: { student_id: 'u-001', preferred_language: 'ne_en', last_level: 'medium', weak_topics: ["Newton's Third Law", 'Trigonometry'], last_topics: ['Photosynthesis', 'Quadratic Equations'], total_sessions: 47, avg_session_duration_min: 18.5, updated_at: '2026-06-17T14:00:00Z' },
    study_streak: 7, total_study_time_min: 272, created_at: '2026-03-15T10:00:00Z', last_active_at: '2026-06-17T16:30:00Z',
  },
  {
    user_id: 'u-002', name: 'Sita Rai', email: 'sita@email.com', role: 'student', plan: 'basic', status: 'active',
    grade: 'Class 12 (Science)', school: 'Shuvatara School', enrolled_courses: ['c-001','c-002'],
    progress: [{ course_id: 'c-001', completed_lessons: ['l-001','l-002','l-003','l-004','l-005','l-006'], current_lesson_id: 'l-007', completion_percentage: 50, last_accessed_at: '2026-06-17T10:00:00Z' }],
    study_streak: 14, total_study_time_min: 540, created_at: '2026-02-20T10:00:00Z', last_active_at: '2026-06-17T18:00:00Z',
  },
  {
    user_id: 'u-003', name: 'Bibek Thapa', email: 'bibek@email.com', role: 'student', plan: 'free', status: 'active',
    grade: 'Class 10', school: "St. Xavier's College", enrolled_courses: ['c-003'],
    progress: [], study_streak: 3, total_study_time_min: 95, created_at: '2026-04-10T10:00:00Z', last_active_at: '2026-06-16T12:00:00Z',
  },
  {
    user_id: 'u-004', name: 'Asha Gurung', email: 'asha@email.com', role: 'student', plan: 'pro', status: 'active',
    grade: 'Bachelor 1st', school: 'Kathmandu Model College', enrolled_courses: ['c-001','c-002','c-005'],
    progress: [{ course_id: 'c-005', completed_lessons: ['l-001','l-002'], current_lesson_id: 'l-003', completion_percentage: 17, last_accessed_at: '2026-06-17T09:00:00Z' }],
    study_streak: 21, total_study_time_min: 1200, created_at: '2026-01-05T10:00:00Z', last_active_at: '2026-06-17T20:00:00Z',
  },
  {
    user_id: 'u-005', name: 'Roshan Adhikari', email: 'roshan@email.com', role: 'student', plan: 'free', status: 'active',
    grade: 'Class 11 (Science)', school: 'Trinity International College', enrolled_courses: ['c-001'],
    progress: [], study_streak: 1, total_study_time_min: 30, created_at: '2026-06-10T10:00:00Z', last_active_at: '2026-06-17T08:00:00Z',
  },
  {
    user_id: 'u-006', name: 'Priya Shrestha', email: 'priya@email.com', role: 'student', plan: 'basic', status: 'active',
    grade: 'Bachelor 1st', school: 'Pulchowk Engineering Campus', enrolled_courses: ['c-003','c-005'],
    progress: [{ course_id: 'c-003', completed_lessons: ['l-001','l-002','l-003','l-004','l-005','l-006','l-007','l-008','l-009'], current_lesson_id: 'l-010', completion_percentage: 75, last_accessed_at: '2026-06-16T15:00:00Z' }],
    study_streak: 12, total_study_time_min: 680, created_at: '2026-02-01T10:00:00Z', last_active_at: '2026-06-17T19:00:00Z',
  },
  {
    user_id: 'u-007', name: 'Nirajan Poudel', email: 'nirajan@email.com', role: 'student', plan: 'free', status: 'inactive',
    grade: 'Class 9', school: 'Galaxy Public School', enrolled_courses: [],
    progress: [], study_streak: 0, total_study_time_min: 15, created_at: '2026-05-20T10:00:00Z', last_active_at: '2026-05-25T10:00:00Z',
  },
  {
    user_id: 'u-008', name: 'Saraswati KC', email: 'saraswati@email.com', role: 'student', plan: 'free', status: 'active',
    grade: 'Class 10', school: 'Himalayan White House College', enrolled_courses: ['c-003','c-006'],
    progress: [], study_streak: 5, total_study_time_min: 180, created_at: '2026-04-01T10:00:00Z', last_active_at: '2026-06-17T11:00:00Z',
  },
  {
    user_id: 'u-009', name: 'Arun Tamang', email: 'arun@email.com', role: 'student', plan: 'basic', status: 'active',
    grade: 'Class 12 (Science)', school: 'Campion Academy', enrolled_courses: ['c-001','c-002','c-003'],
    progress: [{ course_id: 'c-002', completed_lessons: ['l-001','l-002','l-003','l-004'], current_lesson_id: 'l-005', completion_percentage: 33, last_accessed_at: '2026-06-15T10:00:00Z' }],
    study_streak: 8, total_study_time_min: 410, created_at: '2026-03-01T10:00:00Z', last_active_at: '2026-06-17T13:00:00Z',
  },
  {
    user_id: 'u-010', name: 'Manisha Bhandari', email: 'manisha@email.com', role: 'student', plan: 'free', status: 'active',
    grade: 'Class 11 (Management)', school: 'Nepal Commerce Campus', enrolled_courses: ['c-006'],
    progress: [], study_streak: 2, total_study_time_min: 60, created_at: '2026-05-15T10:00:00Z', last_active_at: '2026-06-16T16:00:00Z',
  },
  {
    user_id: 'u-011', name: 'Sujan Maharjan', email: 'sujan@email.com', role: 'student', plan: 'free', status: 'active',
    grade: 'Class 11 (Science)', school: 'Xavier Academy', enrolled_courses: ['c-001'],
    progress: [], study_streak: 4, total_study_time_min: 120, created_at: '2026-04-20T10:00:00Z', last_active_at: '2026-06-17T07:00:00Z',
  },
  {
    user_id: 'u-012', name: 'Kabita Dahal', email: 'kabita@email.com', role: 'student', plan: 'pro', status: 'active',
    grade: 'Bachelor 1st', school: 'IOE Thapathali', enrolled_courses: ['c-003','c-005'],
    progress: [{ course_id: 'c-003', completed_lessons: ['l-001','l-002','l-003','l-004','l-005','l-006','l-007','l-008','l-009','l-010','l-011','l-012'], current_lesson_id: 'l-012', completion_percentage: 100, last_accessed_at: '2026-06-14T10:00:00Z' }],
    study_streak: 30, total_study_time_min: 2100, created_at: '2026-01-01T10:00:00Z', last_active_at: '2026-06-17T21:00:00Z',
  },
  {
    user_id: 'u-013', name: 'Dipesh Khadka', email: 'dipesh@email.com', role: 'student', plan: 'free', status: 'suspended',
    grade: 'Class 10', school: 'Greenfield School', enrolled_courses: [],
    progress: [], study_streak: 0, total_study_time_min: 5, created_at: '2026-06-01T10:00:00Z', last_active_at: '2026-06-05T10:00:00Z',
  },
  {
    user_id: 'u-014', name: 'Anjali Magar', email: 'anjali@email.com', role: 'student', plan: 'free', status: 'active',
    grade: 'Class 9', school: 'Kathmandu Valley School', enrolled_courses: ['c-003'],
    progress: [], study_streak: 6, total_study_time_min: 200, created_at: '2026-03-25T10:00:00Z', last_active_at: '2026-06-17T15:00:00Z',
  },
  {
    user_id: 'u-015', name: 'Bikash Lama', email: 'bikash@email.com', role: 'student', plan: 'basic', status: 'active',
    grade: 'Class 11 (Science)', school: 'Kathmandu Model College', enrolled_courses: ['c-001','c-002'],
    progress: [{ course_id: 'c-001', completed_lessons: ['l-001','l-002','l-003','l-004','l-005','l-006','l-007','l-008','l-009','l-010','l-011','l-012'], current_lesson_id: 'l-012', completion_percentage: 100, last_accessed_at: '2026-06-12T10:00:00Z' }],
    study_streak: 15, total_study_time_min: 890, created_at: '2026-02-14T10:00:00Z', last_active_at: '2026-06-17T17:00:00Z',
  },
  {
    user_id: 'u-016', name: 'Sunita Basnet', email: 'sunita@email.com', role: 'student', plan: 'free', status: 'active',
    grade: 'Class 12 (Humanities)', school: 'Patan Higher Secondary', enrolled_courses: ['c-006'],
    progress: [], study_streak: 1, total_study_time_min: 45, created_at: '2026-06-05T10:00:00Z', last_active_at: '2026-06-16T09:00:00Z',
  },
  {
    user_id: 'u-017', name: 'Prakash Neupane', email: 'prakash@email.com', role: 'student', plan: 'free', status: 'active',
    grade: 'Class 10', school: 'DAV School Lalitpur', enrolled_courses: ['c-003','c-004'],
    progress: [], study_streak: 9, total_study_time_min: 320, created_at: '2026-03-10T10:00:00Z', last_active_at: '2026-06-17T10:00:00Z',
  },
  {
    user_id: 'u-018', name: 'Rupa Limbu', email: 'rupa@email.com', role: 'student', plan: 'free', status: 'active',
    grade: 'Class 11 (Science)', school: 'Little Angels School', enrolled_courses: ['c-001'],
    progress: [], study_streak: 2, total_study_time_min: 75, created_at: '2026-05-01T10:00:00Z', last_active_at: '2026-06-15T14:00:00Z',
  },
  {
    user_id: 'u-019', name: 'Santosh Chhetri', email: 'santosh@email.com', role: 'student', plan: 'basic', status: 'active',
    grade: 'Bachelor 2nd', school: 'Tribhuvan University', enrolled_courses: ['c-005'],
    progress: [{ course_id: 'c-005', completed_lessons: ['l-001','l-002','l-003','l-004','l-005','l-006','l-007','l-008'], current_lesson_id: 'l-009', completion_percentage: 67, last_accessed_at: '2026-06-16T18:00:00Z' }],
    study_streak: 11, total_study_time_min: 560, created_at: '2026-02-28T10:00:00Z', last_active_at: '2026-06-17T12:00:00Z',
  },
  {
    user_id: 'u-020', name: 'Gita Pandey', email: 'gita@email.com', role: 'student', plan: 'free', status: 'active',
    grade: 'Class 12 (Science)', school: 'SOS Hermann Gmeiner School', enrolled_courses: ['c-001','c-004'],
    progress: [], study_streak: 3, total_study_time_min: 110, created_at: '2026-04-15T10:00:00Z', last_active_at: '2026-06-17T06:00:00Z',
  },
];

export const currentUser = mockUsers[0];
