export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  avatar_url?: string;
  last_login_at: string;
}

export interface Persona {
  id: string;
  uuid: string;
  name: string;
  tagline: string;
  description: string;
  style_prompt: string;
  voice_id: string;
  avatar_url?: string;
  color_hex: string;
  is_active: boolean;
  is_premium: boolean;
  created_at: string;
}

export interface SmartPdf {
  id: string;
  uuid: string;
  title: string;
  file_url: string;
  subject?: string;
  level?: string;
  blank_area_percentage?: number;
  status: 'analyzed' | 'processing' | 'failed';
  is_published: boolean;
  view_count: number;
  created_by: string;
  created_at: string;
}

export interface AiLecture {
  id: string;
  uuid: string;
  lesson_id?: string;
  title: string;
  language: string;
  level?: string;
  audio_url?: string;
  duration_sec: number;
  generation_status: 'pending' | 'generating' | 'completed' | 'failed';
  batch_job_id?: string;
  created_at: string;
}

export interface ContentItem {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'notes';
  file_url: string;
  file_size_mb: number;
  subject?: string;
  linked_lessons: number;
  uploaded_at: string;
}

export interface ActivityEvent {
  id: string;
  user_name: string;
  user_avatar?: string;
  event_type: string;
  description: string;
  timestamp: string;
}

export interface PlatformSettings {
  platform_name: string;
  default_language: string;
  default_level: string;
  maintenance_mode: boolean;
  session_timeout_min: number;
  max_free_lessons_per_day: number;
  gemini_api_key: string;
  azure_speech_key: string;
  azure_speech_region: string;
  paaila_tts_key: string;
  khalti_secret_key: string;
  khalti_public_key: string;
  khalti_test_mode: boolean;
  esewa_merchant_code: string;
  esewa_secret_key: string;
  esewa_test_mode: boolean;
  smtp_host: string;
  smtp_port: number;
  smtp_username: string;
  smtp_password: string;
  smtp_from_name: string;
  smtp_from_email: string;
  max_upload_size_mb: number;
}
