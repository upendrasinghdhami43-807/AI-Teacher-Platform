import type { Lesson } from '@/types';

export const mockLessons: Lesson[] = [
  {
    lesson_id: 'ai-001', mode: 'ai_teacher', title: "Newton's Third Law of Motion",
    summary: 'Every action has an equal and opposite reaction — explored with Nepal-relevant examples.',
    source: { topic: "Newton's Third Law" }, language: 'ne_en', level: 'medium', version: 1,
    created_at: '2026-06-17T10:00:00Z', duration_sec: 420, cache_key: 'newtons-third-law:ne_en:medium',
    audio_url: 'https://storage.aiteacher.np/audio/ai-001.mp3',
    frames: [
      { frame_id: 1, start_sec: 0, duration_sec: 15, board: { action: 'write_title', text: "Newton's Third Law", style: 'heading' }, voice_segments: [{ lang: 'ne', text: 'आज हामी Newton को तेस्रो नियम बुझ्छौं।' }, { lang: 'en', text: "Newton's Third Law of Motion." }] },
      { frame_id: 2, start_sec: 15, duration_sec: 30, board: { action: 'write_text', text: 'Every action has an equal and opposite reaction.', style: 'body' }, voice_segments: [{ lang: 'ne', text: 'प्रत्येक action को equal र opposite reaction हुन्छ।' }, { lang: 'en', text: 'When you push a wall, the wall pushes back with the same force.' }] },
      { frame_id: 3, start_sec: 45, duration_sec: 25, board: { action: 'write_formula', formula: 'F₁ = -F₂', style: 'formula' }, voice_segments: [{ lang: 'ne', text: 'यो formula हेर्नुहोस् — F one बराबर negative F two।' }] },
      { frame_id: 4, start_sec: 70, duration_sec: 35, board: { action: 'draw_diagram', text: 'Rocket Launch Diagram', style: 'diagram', position: { x: 100, y: 200, w: 400, h: 300 } }, voice_segments: [{ lang: 'ne', text: 'Rocket launch को example लिऔं — rocket ले gas तल धकेल्छ, त्यसैले rocket माथि जान्छ।' }] },
      { frame_id: 5, start_sec: 105, duration_sec: 30, board: { action: 'write_text', text: 'Walking: Your foot pushes ground backward, ground pushes you forward.', style: 'body' }, voice_segments: [{ lang: 'en', text: 'Another example: when you walk, your foot pushes the ground backward.' }] },
      { frame_id: 6, start_sec: 135, duration_sec: 25, board: { action: 'highlight', text: 'Key: Forces always come in pairs!', style: 'highlight' }, voice_segments: [{ lang: 'ne', text: 'याद राख्नुहोस् — forces सधैं pairs मा आउँछन्!' }] },
      { frame_id: 7, start_sec: 160, duration_sec: 30, board: { action: 'write_text', text: 'Swimming: You push water backward, water pushes you forward.', style: 'body' }, voice_segments: [{ lang: 'en', text: 'Swimming works the same way.' }] },
      { frame_id: 8, start_sec: 190, duration_sec: 25, board: { action: 'draw_shape', shape: 'arrow', text: 'Action → ← Reaction', style: 'diagram' }, voice_segments: [{ lang: 'ne', text: 'यो arrow diagram हेर्नुहोस्।' }] },
      { frame_id: 9, start_sec: 215, duration_sec: 30, board: { action: 'write_text', text: 'Nepal example: Rafting in Trishuli — paddle pushes water, water propels raft.', style: 'body' }, voice_segments: [{ lang: 'ne', text: 'त्रिशूली नदीमा rafting गर्दा paddle ले पानी धकेल्छ।' }] },
      { frame_id: 10, start_sec: 245, duration_sec: 25, board: { action: 'write_formula', formula: 'F_action = -F_reaction', style: 'formula' }, voice_segments: [{ lang: 'en', text: 'Mathematically, F action equals negative F reaction.' }] },
      { frame_id: 11, start_sec: 270, duration_sec: 30, board: { action: 'write_text', text: 'Common misconception: Action and reaction do NOT cancel out — they act on different objects.', style: 'highlight' }, voice_segments: [{ lang: 'en', text: 'Important: these forces act on different objects, so they do not cancel.' }] },
      { frame_id: 12, start_sec: 300, duration_sec: 20, board: { action: 'write_title', text: 'Summary: Every force has an equal and opposite force.', style: 'heading' }, voice_segments: [{ lang: 'ne', text: 'आजको summary — हरेक force को equal र opposite force हुन्छ।' }, { lang: 'en', text: "That's Newton's Third Law!" }] },
    ],
  },
  {
    lesson_id: 'ai-002', mode: 'ai_teacher', title: 'Quadratic Equations',
    summary: 'Understanding quadratic equations and solving them using the quadratic formula.',
    source: { topic: 'Quadratic Equations' }, language: 'ne', level: 'basic', version: 1,
    created_at: '2026-06-16T14:00:00Z', duration_sec: 360, cache_key: 'quadratic-equations:ne:basic',
    audio_url: 'https://storage.aiteacher.np/audio/ai-002.mp3',
    frames: [
      { frame_id: 1, start_sec: 0, duration_sec: 15, board: { action: 'write_title', text: 'द्विघात समीकरण', style: 'heading' }, voice_segments: [{ lang: 'ne', text: 'आज हामी द्विघात समीकरण सिक्छौं।' }] },
      { frame_id: 2, start_sec: 15, duration_sec: 30, board: { action: 'write_formula', formula: 'ax² + bx + c = 0', style: 'formula' }, voice_segments: [{ lang: 'ne', text: 'द्विघात समीकरणको सामान्य रूप ax² + bx + c = 0 हो।' }] },
    ],
  },
  {
    lesson_id: 'ai-003', mode: 'ai_teacher', title: 'Photosynthesis',
    summary: 'How plants convert light energy into chemical energy through photosynthesis.',
    source: { topic: 'Photosynthesis' }, language: 'en', level: 'advanced', version: 1,
    created_at: '2026-06-15T09:00:00Z', duration_sec: 540, cache_key: 'photosynthesis:en:advanced',
    audio_url: 'https://storage.aiteacher.np/audio/ai-003.mp3',
    frames: [
      { frame_id: 1, start_sec: 0, duration_sec: 15, board: { action: 'write_title', text: 'Photosynthesis', style: 'heading' }, voice_segments: [{ lang: 'en', text: 'Today we explore the process of photosynthesis in depth.' }] },
    ],
  },
  {
    lesson_id: 'ai-004', mode: 'ai_teacher', title: 'World War II Causes',
    summary: 'Exploring the major causes that led to the Second World War.',
    source: { topic: 'World War II Causes' }, language: 'hi', level: 'medium', version: 1,
    created_at: '2026-06-14T11:00:00Z', duration_sec: 480, cache_key: 'ww2-causes:hi:medium',
    audio_url: 'https://storage.aiteacher.np/audio/ai-004.mp3',
    frames: [
      { frame_id: 1, start_sec: 0, duration_sec: 15, board: { action: 'write_title', text: 'द्वितीय विश्वयुद्ध के कारण', style: 'heading' }, voice_segments: [{ lang: 'hi', text: 'आज हम द्वितीय विश्वयुद्ध के प्रमुख कारणों को समझेंगे।' }] },
    ],
  },
  {
    lesson_id: 'ai-005', mode: 'ai_teacher', title: 'Trigonometry Basics',
    summary: 'Introduction to sine, cosine, and tangent ratios with practical examples.',
    source: { topic: 'Trigonometry Basics' }, language: 'ne_en', level: 'basic', version: 1,
    created_at: '2026-06-13T08:00:00Z', duration_sec: 300, cache_key: 'trig-basics:ne_en:basic',
    audio_url: 'https://storage.aiteacher.np/audio/ai-005.mp3',
    frames: [
      { frame_id: 1, start_sec: 0, duration_sec: 15, board: { action: 'write_title', text: 'Trigonometry Basics', style: 'heading' }, voice_segments: [{ lang: 'ne', text: 'Trigonometry को basic concepts सिकौं।' }, { lang: 'en', text: 'Sine, Cosine, and Tangent.' }] },
    ],
  },
  {
    lesson_id: 'ai-006', mode: 'ai_teacher', title: 'Organic Chemistry Introduction',
    summary: 'Basics of carbon compounds and functional groups.',
    source: { topic: 'Organic Chemistry Introduction' }, language: 'en', level: 'medium', version: 1,
    created_at: '2026-06-12T13:00:00Z', duration_sec: 480, cache_key: 'organic-chem:en:medium',
    audio_url: 'https://storage.aiteacher.np/audio/ai-006.mp3',
    frames: [
      { frame_id: 1, start_sec: 0, duration_sec: 15, board: { action: 'write_title', text: 'Organic Chemistry', style: 'heading' }, voice_segments: [{ lang: 'en', text: 'Welcome to organic chemistry — the chemistry of carbon compounds.' }] },
    ],
  },
  {
    lesson_id: 'ai-007', mode: 'ai_teacher', title: 'Computer Memory Types',
    summary: 'Understanding RAM, ROM, cache memory, and storage hierarchy.',
    source: { topic: 'Computer Memory Types' }, language: 'ne_en', level: 'medium', version: 1,
    created_at: '2026-06-11T10:00:00Z', duration_sec: 360, cache_key: 'memory-types:ne_en:medium',
    audio_url: 'https://storage.aiteacher.np/audio/ai-007.mp3',
    frames: [
      { frame_id: 1, start_sec: 0, duration_sec: 15, board: { action: 'write_title', text: 'Computer Memory Types', style: 'heading' }, voice_segments: [{ lang: 'ne', text: 'Computer को memory types बुझौं।' }] },
    ],
  },
  {
    lesson_id: 'ai-008', mode: 'ai_teacher', title: "Nepal's Constitution 2072",
    summary: 'Key features and provisions of the Constitution of Nepal 2072.',
    source: { topic: "Nepal's Constitution 2072" }, language: 'ne', level: 'basic', version: 1,
    created_at: '2026-06-10T15:00:00Z', duration_sec: 420, cache_key: 'nepal-constitution:ne:basic',
    audio_url: 'https://storage.aiteacher.np/audio/ai-008.mp3',
    frames: [
      { frame_id: 1, start_sec: 0, duration_sec: 15, board: { action: 'write_title', text: 'नेपालको संविधान २०७२', style: 'heading' }, voice_segments: [{ lang: 'ne', text: 'आज हामी नेपालको संविधान २०७२ को मुख्य विशेषताहरू पढ्छौं।' }] },
    ],
  },
];
