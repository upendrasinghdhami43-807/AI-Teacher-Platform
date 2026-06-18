"""
Complete GRADE_REGISTRY — all 13 Nepal curriculum grade levels
with full context for AI prompt injection.
"""

from ai_engine.grade.context import GradeContext
from ai_engine.grade.levels import GradeLevel

GRADE_REGISTRY: dict[GradeLevel, GradeContext] = {
    # ═══════════════════════════════════════════════════════
    # SCHOOL LEVEL (Class 8–10)
    # ═══════════════════════════════════════════════════════
    GradeLevel.CLASS_8: GradeContext(
        grade=GradeLevel.CLASS_8,
        display_name="Class 8",
        tier="school",
        exam_board="School Board",
        recommended_difficulty="basic",
        vocabulary_complexity="simple",
        curriculum_note=(
            "Very simple language. Use relatable everyday Nepal examples "
            "(school, home, market, farm). Avoid derivations and complex formulas. "
            "Focus on building foundational concepts. Explain step by step "
            "using stories and real objects students know."
        ),
        subjects_available=[
            "Science", "Mathematics", "English", "Nepali",
            "Social Studies", "Health & Environment",
        ],
        typical_exam_patterns=[
            "1-mark (Very Short Answer)", "2-mark (Short Answer)",
            "4-mark (Long Answer)", "Fill in the blanks", "True/False",
        ],
        example_style="Daily Nepal life — school, farming, markets, homes, family",
    ),
    GradeLevel.CLASS_9: GradeContext(
        grade=GradeLevel.CLASS_9,
        display_name="Class 9",
        tier="school",
        exam_board="School Board",
        recommended_difficulty="basic",
        vocabulary_complexity="simple",
        curriculum_note=(
            "Simple language with slightly more depth than Class 8. "
            "Introduce basic scientific terms alongside simple Nepali explanations. "
            "Use everyday Nepal examples. No complex derivations. "
            "Build bridges between concepts using familiar objects."
        ),
        subjects_available=[
            "Science", "Mathematics", "English", "Nepali",
            "Social Studies", "Health & Environment", "Opt. Mathematics",
        ],
        typical_exam_patterns=[
            "1-mark (Very Short Answer)", "2-mark (Short Answer)",
            "4-mark (Long Answer)", "5-mark (Numericals)",
        ],
        example_style="Daily Nepal life — school, farming, markets, homes, technology",
    ),
    GradeLevel.CLASS_10: GradeContext(
        grade=GradeLevel.CLASS_10,
        display_name="Class 10 (SEE)",
        tier="school",
        exam_board="SEE",
        recommended_difficulty="medium",
        vocabulary_complexity="intermediate",
        curriculum_note=(
            "SEE (School Leaving Examination) preparation level. "
            "Cover both conceptual (Why/How/Explain) and numerical problems. "
            "Reference SEE mark weights: 1 mark, 2 marks, 4 marks, 8 marks. "
            "Include exam-pattern explanations and expected question formats. "
            "Use semi-formal language with technical terms explained."
        ),
        subjects_available=[
            "Science", "Mathematics", "English", "Nepali",
            "Social Studies", "Health & Environment", "Opt. Mathematics",
            "Computer Science",
        ],
        typical_exam_patterns=[
            "1-mark (Very Short Answer)", "2-mark (Short Answer)",
            "4-mark (Long Answer)", "8-mark (Detailed/Numerical)",
            "Group A/B/C format",
        ],
        example_style="Nepal context — SEE exam scenarios, local applications, daily tech",
    ),

    # ═══════════════════════════════════════════════════════
    # HIGHER SECONDARY — NEB (Class 11–12)
    # ═══════════════════════════════════════════════════════
    GradeLevel.CLASS_11_SCIENCE: GradeContext(
        grade=GradeLevel.CLASS_11_SCIENCE,
        display_name="Class 11 Science (NEB)",
        tier="higher_secondary",
        exam_board="NEB",
        recommended_difficulty="medium",
        vocabulary_complexity="intermediate",
        curriculum_note=(
            "NEB Science stream — Physics, Chemistry, Biology, Mathematics. "
            "Scientific terminology is required. Reference IOE/CEE/MBBS entrance prep. "
            "Derivations expected for Physics and Math. "
            "Physics: mechanics, waves, thermodynamics, optics. "
            "Chemistry: atomic structure, chemical bonding, states of matter. "
            "Math: sets, trigonometry, limits, coordinate geometry, matrices. "
            "Biology: cell biology, botany, zoology fundamentals."
        ),
        subjects_available=[
            "Physics", "Chemistry", "Mathematics", "Biology",
            "English", "Nepali", "Computer Science",
        ],
        typical_exam_patterns=[
            "1-mark MCQ", "2-mark Short Answer",
            "4-mark Long Answer", "8-mark Numerical/Derivation",
            "NEB Board Exam format",
        ],
        example_style=(
            "Scientific examples — lab experiments, IOE entrance problems, "
            "engineering applications, Nepal infrastructure projects"
        ),
    ),
    GradeLevel.CLASS_11_MANAGEMENT: GradeContext(
        grade=GradeLevel.CLASS_11_MANAGEMENT,
        display_name="Class 11 Management (NEB)",
        tier="higher_secondary",
        exam_board="NEB",
        recommended_difficulty="medium",
        vocabulary_complexity="intermediate",
        curriculum_note=(
            "NEB Management stream — Accountancy, Economics, Business Studies, "
            "Business Mathematics. Nepal-specific context: NRB policies, cooperatives, "
            "cottage industries, small business economics. "
            "Prepare for CMAT/PU Management entrance. "
            "Include practical business scenarios from Nepal's economy."
        ),
        subjects_available=[
            "Accountancy", "Economics", "Business Studies",
            "Business Mathematics", "English", "Nepali",
        ],
        typical_exam_patterns=[
            "1-mark MCQ", "2-mark Short Answer",
            "4-mark Long Answer", "8-mark Numerical/Case Study",
            "CMAT format questions",
        ],
        example_style=(
            "Nepal business context — NRB, cooperatives, cottage industries, "
            "local markets, Nepal Stock Exchange, remittance economy"
        ),
    ),
    GradeLevel.CLASS_11_HUMANITIES: GradeContext(
        grade=GradeLevel.CLASS_11_HUMANITIES,
        display_name="Class 11 Humanities (NEB)",
        tier="higher_secondary",
        exam_board="NEB",
        recommended_difficulty="medium",
        vocabulary_complexity="intermediate",
        curriculum_note=(
            "NEB Humanities stream — Sociology, Political Science, History, Geography. "
            "Reference Nepal's Constitution 2072, federal structure, democracy movements, "
            "Rana regime, Panchayat system, People's Movement (Jana Andolan). "
            "Include Nepal's social diversity, caste system, gender issues."
        ),
        subjects_available=[
            "Sociology", "Political Science", "History", "Geography",
            "English", "Nepali", "Population Studies",
        ],
        typical_exam_patterns=[
            "1-mark MCQ", "2-mark Short Answer",
            "4-mark Long Answer", "8-mark Essay/Critical Analysis",
        ],
        example_style=(
            "Nepal social and political context — Constitution 2072, "
            "federal provinces, ethnic diversity, historical movements"
        ),
    ),
    GradeLevel.CLASS_12_SCIENCE: GradeContext(
        grade=GradeLevel.CLASS_12_SCIENCE,
        display_name="Class 12 Science (NEB)",
        tier="higher_secondary",
        exam_board="NEB",
        recommended_difficulty="advanced",
        vocabulary_complexity="technical",
        curriculum_note=(
            "IOE/CEE/MBBS entrance preparation level. "
            "Modern physics, organic chemistry, genetics, calculus. "
            "Reference IOE entrance format (75 MCQ, 3 hours) and past question patterns. "
            "Physics: electromagnetism, modern physics, nuclear. "
            "Chemistry: organic chemistry, electrochemistry, chemical kinetics. "
            "Math: calculus, probability, vectors, complex numbers. "
            "Biology: genetics, evolution, ecology, human physiology. "
            "Full derivations and proofs expected."
        ),
        subjects_available=[
            "Physics", "Chemistry", "Mathematics", "Biology",
            "English", "Nepali", "Computer Science",
        ],
        typical_exam_patterns=[
            "NEB Board Exam (Group A/B/C/D)",
            "IOE Entrance MCQ (75Q/3hr)",
            "CEE Medical Entrance",
            "Numerical problems with full derivation",
        ],
        example_style=(
            "Entrance exam problems, engineering applications, "
            "medical scenarios, Nepal tech projects"
        ),
    ),
    GradeLevel.CLASS_12_MANAGEMENT: GradeContext(
        grade=GradeLevel.CLASS_12_MANAGEMENT,
        display_name="Class 12 Management (NEB)",
        tier="higher_secondary",
        exam_board="NEB",
        recommended_difficulty="advanced",
        vocabulary_complexity="technical",
        curriculum_note=(
            "Advanced NEB Management with CMAT/BBS entrance focus. "
            "Financial accounting, cost accounting, marketing management, "
            "macro/micro economics at depth. Nepal corporate governance, "
            "Companies Act 2063, taxation system, banking sector."
        ),
        subjects_available=[
            "Accountancy", "Economics", "Business Studies",
            "Business Mathematics", "English", "Nepali",
        ],
        typical_exam_patterns=[
            "NEB Board Exam", "CMAT Entrance MCQ",
            "BBS Entrance", "Case study analysis",
        ],
        example_style=(
            "Nepal corporate context — Banks, insurance companies, "
            "cooperatives, tax system, Companies Act"
        ),
    ),
    GradeLevel.CLASS_12_HUMANITIES: GradeContext(
        grade=GradeLevel.CLASS_12_HUMANITIES,
        display_name="Class 12 Humanities (NEB)",
        tier="higher_secondary",
        exam_board="NEB",
        recommended_difficulty="advanced",
        vocabulary_complexity="technical",
        curriculum_note=(
            "Advanced NEB Humanities — critical analysis depth. "
            "Nepal's peace process, Madhesh movement, federalism debates, "
            "international relations, global political philosophy. "
            "Sociological research methods, critical theory, Nepal's development challenges."
        ),
        subjects_available=[
            "Sociology", "Political Science", "History", "Geography",
            "English", "Nepali", "Mass Communication",
        ],
        typical_exam_patterns=[
            "NEB Board Exam", "Critical essay (8 marks)",
            "Analytical questions", "Source-based questions",
        ],
        example_style=(
            "Critical analysis — Nepal's political transitions, "
            "peace process, federalism, international context"
        ),
    ),

    # ═══════════════════════════════════════════════════════
    # BACHELOR LEVEL
    # ═══════════════════════════════════════════════════════
    GradeLevel.BACHELOR_1: GradeContext(
        grade=GradeLevel.BACHELOR_1,
        display_name="Bachelor 1st Year",
        tier="bachelor",
        exam_board="TU/PU/KU/PoU",
        recommended_difficulty="advanced",
        vocabulary_complexity="technical",
        curriculum_note=(
            "Foundational university courses. "
            "Engineering: Engineering Mathematics I & II, Engineering Physics, C Programming. "
            "BBS: Business Mathematics, Financial Accounting, Micro Economics. "
            "BSc: General Physics, General Chemistry, Calculus I. "
            "BCA/CSIT: Intro to IT, C Programming, Digital Logic, Statistics. "
            "Assume 12th-level prerequisites are known."
        ),
        subjects_available=[
            "Engineering Mathematics", "Engineering Physics", "C Programming",
            "Financial Accounting", "Micro Economics", "Statistics",
            "Digital Logic", "Calculus",
        ],
        typical_exam_patterns=[
            "TU/PU Semester Exam (3hr written)",
            "Internal assessment + Board exam",
            "Numerical + Theoretical mix",
        ],
        example_style=(
            "University/professional context — lab experiments, "
            "coding exercises, real engineering problems"
        ),
    ),
    GradeLevel.BACHELOR_2: GradeContext(
        grade=GradeLevel.BACHELOR_2,
        display_name="Bachelor 2nd Year",
        tier="bachelor",
        exam_board="TU/PU/KU/PoU",
        recommended_difficulty="advanced",
        vocabulary_complexity="technical",
        curriculum_note=(
            "Mid-level university courses. "
            "Engineering: Data Structures & Algorithms, OOP (Java/C++), Numerical Methods. "
            "BBS: Cost Accounting, Macro Economics, Business Law. "
            "BSc: Organic Chemistry, Quantum Mechanics foundations. "
            "BCA/CSIT: Data Structures, OOP, Database Management, Statistics II. "
            "Build on Year 1 foundations."
        ),
        subjects_available=[
            "Data Structures", "OOP", "Numerical Methods",
            "Cost Accounting", "Macro Economics", "Organic Chemistry",
            "Database Management", "Discrete Mathematics",
        ],
        typical_exam_patterns=[
            "TU/PU Semester Exam", "Lab practicals",
            "Programming assignments", "Theory + Numerical",
        ],
        example_style=(
            "Academic depth — algorithm analysis, code implementation, "
            "research paper references, Nepal industry examples"
        ),
    ),
    GradeLevel.BACHELOR_3: GradeContext(
        grade=GradeLevel.BACHELOR_3,
        display_name="Bachelor 3rd Year",
        tier="bachelor",
        exam_board="TU/PU/KU/PoU",
        recommended_difficulty="advanced",
        vocabulary_complexity="technical",
        curriculum_note=(
            "Advanced university courses. "
            "Engineering: Algorithms, DBMS, Computer Networks, Operating Systems, Software Engineering. "
            "BBS: Financial Management, Auditing, Taxation, Banking. "
            "BSc: Advanced topics in specialization. "
            "BCA/CSIT: Computer Networks, OS, Software Engineering, Web Technology. "
            "Expect independent research capability."
        ),
        subjects_available=[
            "Algorithms", "DBMS", "Computer Networks", "Operating Systems",
            "Software Engineering", "Financial Management", "Web Technology",
        ],
        typical_exam_patterns=[
            "Semester Exam", "Project work",
            "Case study analysis", "Advanced problem solving",
        ],
        example_style=(
            "Professional/industry context — system design, "
            "Nepal IT companies, real-world applications"
        ),
    ),
    GradeLevel.BACHELOR_4: GradeContext(
        grade=GradeLevel.BACHELOR_4,
        display_name="Bachelor 4th Year (Final)",
        tier="bachelor",
        exam_board="TU/PU/KU/PoU",
        recommended_difficulty="advanced",
        vocabulary_complexity="technical",
        curriculum_note=(
            "Final year, industry/project level. "
            "Engineering: AI/ML, Cloud Computing, Distributed Systems, Final Year Project. "
            "Interview-ready explanations expected. "
            "Reference Nepal tech sector: Fusemachines, CloudFactory, Leapfrog, "
            "F1Soft, Javra Software. "
            "Expect students to understand research papers, "
            "system design, and production considerations."
        ),
        subjects_available=[
            "AI/ML", "Cloud Computing", "Distributed Systems",
            "Information Security", "Project Management",
            "Electives (specialization)",
        ],
        typical_exam_patterns=[
            "Final Semester Exam", "Project thesis defense",
            "Viva voce", "Industry-style problem solving",
        ],
        example_style=(
            "Industry/interview ready — system design interviews, "
            "Nepal tech companies, production codebases, research applications"
        ),
    ),
}
