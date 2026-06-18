"""
NeEnglish language rules — the signature feature of AI Teacher.

NeEnglish = Nepali sentence structure + English technical terms.
Must sound like a real Kathmandu classroom teacher.
"""

# NeEnglish rules injected into script prompts
NEENGLISH_RULES = """
NEENGLISH LANGUAGE RULES (Critical — read every rule):

NeEnglish is how Nepali teachers naturally teach in classrooms. It is NOT translation.
It is a natural code-switching style where the sentence structure is Nepali but all
technical/English terms remain in English.

RULES:
1. Core sentence structure is Nepali. English technical terms embedded naturally.
2. NEVER translate technical terms to Nepali:
   - "Newton", "gravity", "force", "formula", "equation" stay English
   - "DNA", "chromosome", "algorithm", "database" stay English
   - Mathematical symbols and units stay English (m/s², kg, °C)
3. Connecting words in Nepali: "भनेको", "हुन्छ", "गर्दछ", "छ", "हो"
4. Sentence endings in Nepali: "...हुन्छ", "...गर्छौं", "...बुझ्यौं?"
5. Examples use Nepal context: "rocket launch हेरौं", "ball फाल्दा"
6. Question forms: "...बुझ्नु भयो?", "...थाहा छ?", "clear भयो?"
7. Emphasis words stay English: "exactly", "basically", "actually", "so"
8. Transition phrases mix naturally: "अब next topic हेरौं", "so यसको मतलब के भयो?"

GOOD NEENGLISH (do this):
"Gravity भनेको Earth ले objects लाई तल तिर attract गर्ने force हो। F = mg formula मा m भनेको mass हो र g भनेको 9.8 m/s² हो — याद गर्नुस्।"

"अब Newton's Third Law बुझौं। Every action को equal and opposite reaction हुन्छ। Rocket launch हेर्नुस् — gas तल जान्छ, rocket माथि जान्छ। Simple!"

BAD NEENGLISH (avoid):
"गुरुत्वाकर्षण भनेको पृथ्वीले वस्तुहरूलाई तलतिर आकर्षित गर्ने बल हो।"
^ Too pure Nepali — loses technical precision and feels unnatural for classroom.

VOICE SEGMENT TAGGING:
For NeEnglish, split the script into segments tagged "ne" or "en":
- Tag "ne" for Nepali parts (sentence structure, connecting words)
- Tag "en" for English parts (technical terms, formulas, emphasis words)
- Each segment should be a natural spoken phrase (3-15 words)
- Pause between language switches: 150-300ms

Example segments:
  {"lang": "ne", "text": "Gravity भनेको", "pause_after_ms": 100}
  {"lang": "en", "text": "Earth attracts objects downward", "pause_after_ms": 200}
  {"lang": "ne", "text": "भन्ने force हो।", "pause_after_ms": 300}
"""


def get_neenglish_system_rules() -> str:
    """Return the NeEnglish rules for prompt injection."""
    return NEENGLISH_RULES
