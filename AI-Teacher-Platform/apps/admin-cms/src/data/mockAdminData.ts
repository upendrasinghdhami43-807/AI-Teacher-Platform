import type { Analytics, ChatSession } from '@/types/api.types';
import type { Persona, SmartPdf, AiLecture, ContentItem, ActivityEvent } from '@/types/admin.types';

export const mockAnalytics: Analytics = {
  total_students: 8432, active_today: 1234, total_sessions_today: 3421,
  total_lessons: 186, total_courses: 24, storage_used_gb: 142,
  user_growth: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(2026, 4, 20 + i).toISOString().split('T')[0],
    count: 180 + Math.floor(Math.random() * 80),
  })),
  hourly_activity: Array.from({ length: 24 }, (_, hour) => ({
    hour, count: hour >= 6 && hour <= 21 ? 50 + Math.floor(Math.random() * 200) * (hour >= 16 && hour <= 20 ? 2 : 1) : Math.floor(Math.random() * 30),
  })),
  subject_distribution: [
    { subject: 'Physics', count: 3200 }, { subject: 'Chemistry', count: 2100 },
    { subject: 'Mathematics', count: 4500 }, { subject: 'Biology', count: 1800 },
    { subject: 'Computer Science', count: 1200 }, { subject: 'English', count: 2800 },
    { subject: 'Nepali', count: 900 }, { subject: 'Social Studies', count: 600 },
  ],
  language_distribution: [
    { language: 'Nep+Eng', count: 5200 }, { language: 'English', count: 2400 },
    { language: 'Nepali', count: 1800 }, { language: 'Hindi', count: 600 },
  ],
};

export const mockPersonas: Persona[] = [
  { id: 'p-001', uuid: 'p-uuid-001', name: 'Exam Mode', tagline: 'Focused, fast, exam-ready', description: 'Covers exam patterns, marks distribution, time management techniques.', style_prompt: 'You are a strict exam preparation teacher. Focus on exam patterns, mark allocation, and quick problem-solving techniques.', voice_id: 'en-US-AriaNeural', color_hex: '#F59E0B', is_active: true, is_premium: false, created_at: '2026-01-01T10:00:00Z' },
  { id: 'p-002', uuid: 'p-uuid-002', name: 'Deep Dive Mode', tagline: 'Thorough, conceptual, research-level', description: 'Explores topics from first principles with full context.', style_prompt: 'You are a university professor. Explain from first principles with rigorous depth.', voice_id: 'ne-NP-HemkalaNeural', color_hex: '#06B6D4', is_active: true, is_premium: true, created_at: '2026-01-01T10:00:00Z' },
  { id: 'p-003', uuid: 'p-uuid-003', name: 'Friend Mode', tagline: 'Casual, fun, relatable explanations', description: 'Explains like a knowledgeable friend — with jokes and analogies.', style_prompt: 'You are a fun, relatable friend. Use humor, pop culture references, and simple analogies.', voice_id: 'en-US-GuyNeural', color_hex: '#10B981', is_active: true, is_premium: false, created_at: '2026-01-01T10:00:00Z' },
];

export const mockSmartPdfs: SmartPdf[] = [
  { id: 'sp-001', uuid: 'sp-uuid-001', title: 'Physics Chapter 3 Worksheet', file_url: '/mock/physics-ch3.pdf', subject: 'Physics', level: 'Class 11', blank_area_percentage: 42, status: 'analyzed', is_published: true, view_count: 234, created_by: 'admin-001', created_at: '2026-05-01T10:00:00Z' },
  { id: 'sp-002', uuid: 'sp-uuid-002', title: 'Chemistry Lab Manual', file_url: '/mock/chem-lab.pdf', subject: 'Chemistry', level: 'Class 11', blank_area_percentage: 35, status: 'analyzed', is_published: true, view_count: 156, created_by: 'admin-001', created_at: '2026-05-10T10:00:00Z' },
  { id: 'sp-003', uuid: 'sp-uuid-003', title: 'Math Practice Set', file_url: '/mock/math-practice.pdf', subject: 'Mathematics', level: 'Class 10', status: 'processing', is_published: false, view_count: 0, created_by: 'admin-001', created_at: '2026-06-15T10:00:00Z' },
];

export const mockLectures: AiLecture[] = [
  { id: 'al-001', uuid: 'al-uuid-001', lesson_id: 'c001-ch1-l1', title: "Newton's First Law", language: 'ne_en', level: 'medium', duration_sec: 420, generation_status: 'completed', created_at: '2026-05-20T10:00:00Z' },
  { id: 'al-002', uuid: 'al-uuid-002', lesson_id: 'c001-ch1-l2', title: "Newton's Second Law", language: 'ne_en', level: 'medium', duration_sec: 0, generation_status: 'generating', created_at: '2026-06-17T10:00:00Z' },
  { id: 'al-003', uuid: 'al-uuid-003', lesson_id: 'c001-ch1-l3', title: "Newton's Third Law", language: 'en', level: 'basic', duration_sec: 0, generation_status: 'pending', created_at: '2026-06-17T12:00:00Z' },
  { id: 'al-004', uuid: 'al-uuid-004', lesson_id: 'c002-ch1-l1', title: 'Dalton to Bohr', language: 'ne_en', level: 'medium', duration_sec: 380, generation_status: 'completed', created_at: '2026-05-22T10:00:00Z' },
  { id: 'al-005', uuid: 'al-uuid-005', title: 'Trigonometric Ratios', language: 'ne', level: 'basic', duration_sec: 0, generation_status: 'failed', created_at: '2026-06-10T10:00:00Z' },
];

export const mockContentItems: ContentItem[] = [
  { id: 'ci-001', name: 'Physics NEB Guide.pdf', type: 'pdf', file_url: '/mock/phys-guide.pdf', file_size_mb: 12.4, subject: 'Physics', linked_lessons: 8, uploaded_at: '2026-03-10T10:00:00Z' },
  { id: 'ci-002', name: 'Chemistry Diagrams.png', type: 'image', file_url: '/mock/chem-diag.png', file_size_mb: 2.1, subject: 'Chemistry', linked_lessons: 3, uploaded_at: '2026-04-05T10:00:00Z' },
  { id: 'ci-003', name: 'Math Formulas.pdf', type: 'pdf', file_url: '/mock/math-formulas.pdf', file_size_mb: 5.6, subject: 'Mathematics', linked_lessons: 12, uploaded_at: '2026-02-20T10:00:00Z' },
  { id: 'ci-004', name: 'Bio Cell Notes.pdf', type: 'notes', file_url: '/mock/bio-notes.pdf', file_size_mb: 3.2, subject: 'Biology', linked_lessons: 4, uploaded_at: '2026-05-15T10:00:00Z' },
];

export const mockActivityEvents: ActivityEvent[] = [
  { id: 'e-001', user_name: 'Ramesh Sharma', event_type: 'course_enrolled', description: 'enrolled in Physics Class 11', timestamp: '2026-06-17T16:28:00Z' },
  { id: 'e-002', user_name: 'Sita Rai', event_type: 'lesson_completed', description: "completed Lesson 3: Newton's Laws", timestamp: '2026-06-17T16:25:00Z' },
  { id: 'e-003', user_name: 'System', event_type: 'lesson_started', description: 'New AI lesson generated: Photosynthesis', timestamp: '2026-06-17T16:23:00Z' },
  { id: 'e-004', user_name: 'Bibek Thapa', event_type: 'question_asked', description: 'asked about Quadratic Equations', timestamp: '2026-06-17T16:20:00Z' },
  { id: 'e-005', user_name: 'Asha Gurung', event_type: 'quiz_passed', description: 'passed quiz in Data Structures with 85%', timestamp: '2026-06-17T16:15:00Z' },
  { id: 'e-006', user_name: 'Roshan Adhikari', event_type: 'pdf_uploaded', description: 'uploaded Physics Chapter 5 Notes', timestamp: '2026-06-17T16:10:00Z' },
  { id: 'e-007', user_name: 'Priya Shrestha', event_type: 'lesson_completed', description: 'completed Trigonometric Identities', timestamp: '2026-06-17T16:05:00Z' },
  { id: 'e-008', user_name: 'Nirajan Poudel', event_type: 'session_ended', description: 'ended study session (42 min)', timestamp: '2026-06-17T16:00:00Z' },
  { id: 'e-009', user_name: 'Kabita Dahal', event_type: 'course_enrolled', description: 'enrolled in CSIT Entrance Prep', timestamp: '2026-06-17T15:55:00Z' },
  { id: 'e-010', user_name: 'Bikash Lama', event_type: 'quiz_attempted', description: 'attempted quiz in Chemical Equilibrium', timestamp: '2026-06-17T15:50:00Z' },
];

export const mockChatSessions: ChatSession[] = [
  { session_id: 'cs-001', student_id: 'u-001', topic: "Newton's Third Law", lesson_id: 'ai-001', messages: [
    { id: 'm-001', role: 'assistant', content: 'आज हामी Newton को तेस्रो नियम सुरु गर्दैछौं। तपाईंसँग कुनै प्रश्न छ?', language: 'ne_en', timestamp: '2026-06-17T10:00:00Z' },
    { id: 'm-002', role: 'user', content: 'Can you give me a real-life example?', language: 'en', timestamp: '2026-06-17T10:01:00Z' },
    { id: 'm-003', role: 'assistant', content: 'एउटा simple example — जब तपाईं rocket launch हुँदा हेर्नुहुन्छ: rocket ले gas तल धकेल्छ (action), र त्यसैले rocket माथि जान्छ (reaction)। Rocket science literally uses this law! 🚀', language: 'ne_en', timestamp: '2026-06-17T10:01:30Z' },
  ], message_count: 3, started_at: '2026-06-17T10:00:00Z', ended_at: '2026-06-17T10:30:00Z' },
  { session_id: 'cs-002', student_id: 'u-006', topic: 'Quadratic Equations', messages: [
    { id: 'm-004', role: 'assistant', content: 'Let\'s solve quadratic equations together!', language: 'en', timestamp: '2026-06-16T14:00:00Z' },
    { id: 'm-005', role: 'user', content: 'How do I use the quadratic formula?', language: 'en', timestamp: '2026-06-16T14:01:00Z' },
    { id: 'm-006', role: 'assistant', content: 'The quadratic formula is x = (-b ± √(b²-4ac)) / 2a. Let me show you step by step.', language: 'en', timestamp: '2026-06-16T14:01:30Z' },
  ], message_count: 3, started_at: '2026-06-16T14:00:00Z' },
];
