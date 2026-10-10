/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LanguageMode = 'en' | 'ar';

export interface TranslationStrings {
  appTitle: string;
  appSubtitle: string;
  badgeAdmin: string;
  langEn: string;
  langAr: string;
  
  // Splash Screen Strings
  splashTitle: string;
  splashSubtitle: string;
  studentNameLabel: string;
  studentNamePlaceholder: string;
  badgeNumberLabel: string;
  badgeNumberPlaceholder: string;
  mainRoleLabel: string;
  secondaryRoleLabel: string;
  thirdRoleLabel: string;
  startAssessmentBtn: string;
  studentRequiredAlert: string;
  traineeLabel: string;
  badgeLabel: string;
  rolesLockedBadge: string;
  assessmentRulesNotice: string;

  // Assessment Sequential Flow
  scenarioProgress: string;
  primaryRoleBadge: string;
  secondaryRoleBadge: string;
  thirdRoleBadge: string;
  
  // Reading Phase
  readingPhaseTitle: string;
  listenScenario: string;
  stopListening: string;
  proceedToReport: string;
  
  // Reporting Phase
  reportingPhaseTitle: string;
  reportingPhaseSubtitle: string;
  timeRemaining: string;
  scenarioLabel: string;
  part1SectionTitle: string;
  part1SectionDesc: string;
  part2SectionTitle: string;
  part2SectionDesc: string;
  l_title: string;
  l_question: string;
  n1_title: string;
  n1_question: string;
  n2_title: string;
  n2_question: string;
  h_title: string;
  h_question: string;
  z_title: string;
  z_question: string;
  s_title: string;
  s_question: string;
  hz_title: string;
  hz_question: string;
  submitAndNext: string;
  submitAndFinish: string;
  itemsAnswered: string;
  
  // Final Results & Grading
  finalGradeTitle: string;
  finalGradeSubtitle: string;
  assessmentGradeLabel: string;
  totalScoreLabel: string;
  scenariosCompleted: string;
  totalDuration: string;
  downloadPdfRequirement: string;
  downloadedConfirmation: string;
  taskFinishedNotice: string;
  pdfDownloadedBadge: string;
  shareWhatsApp: string;
  retakeAssessment: string;
  correctChoice: string;
  yourChoice: string;
  benchmarkReviewTitle: string;
  backToTop: string;
  allScenariosBreakdown: string;
}

export const translations: Record<'en' | 'ar', TranslationStrings> = {
  en: {
    appTitle: "KSIA ERT LNNH-ZSH Simulator",
    appSubtitle: "Airport Administrative Offices Dual-Format Assessment",
    badgeAdmin: "Admin Simulator",
    langEn: "English",
    langAr: "العربية",

    splashTitle: "Participant ERT Profile",
    splashSubtitle: "Enter your details and ERT assignments. You will complete all scenario cards one by one in randomized order.",
    studentNameLabel: "Participant Full Name",
    studentNamePlaceholder: "e.g. Sara Al-Hassan",
    badgeNumberLabel: "Badge / Employee ID #",
    badgeNumberPlaceholder: "e.g. KSIA-8921",
    mainRoleLabel: "Main ERT Assignment (Primary Role)",
    secondaryRoleLabel: "Secondary ERT Assignment (Backup Role)",
    thirdRoleLabel: "Third ERT Assignment (Tertiary Role)",
    startAssessmentBtn: "Begin Randomized Assessment",
    studentRequiredAlert: "Please fill in your Name, Badge ID, and select distinct roles.",
    traineeLabel: "Participant",
    badgeLabel: "Badge ID",
    rolesLockedBadge: "Active Candidate",
    assessmentRulesNotice: "All participants must complete every scenario card. You will receive a performance grade upon completion and download the official PDF report.",

    scenarioProgress: "Scenario",
    primaryRoleBadge: "Main Role",
    secondaryRoleBadge: "Secondary",
    thirdRoleBadge: "Third",

    readingPhaseTitle: "Incident Briefing",
    listenScenario: "Listen Aloud",
    stopListening: "Stop Audio",
    proceedToReport: "Proceed to Emergency Report",

    reportingPhaseTitle: "Emergency Radio Reporting",
    reportingPhaseSubtitle: "Part 1 Initial Discovery (L-N-N-H) & Part 2 Ongoing Check-In (Z-S-H)",
    timeRemaining: "Time",
    scenarioLabel: "Case",
    part1SectionTitle: "Part 1: Initial Discovery (L-N-N-H)",
    part1SectionDesc: "First transmission to alert KSIA EOC and dispatch responders.",
    part2SectionTitle: "Part 2: Operational Check-In (Z-S-H)",
    part2SectionDesc: "Lean 15-second check-in format during active operations.",
    l_title: "L - Location",
    l_question: "Where is the incident taking place?",
    n1_title: "N - Nature",
    n1_question: "What is happening right now?",
    n2_title: "N - Numbers",
    n2_question: "Who is injured and what is their condition?",
    h_title: "H - Hazards",
    h_question: "What immediate danger is present?",
    z_title: "Z - Zone",
    z_question: "Which operational sector are you in?",
    s_title: "S - Status",
    s_question: "What is your team's current operational status?",
    hz_title: "H - Hazard",
    hz_question: "What residual or active hazard remains?",
    submitAndNext: "Submit Report & Proceed to Next Scenario",
    submitAndFinish: "Submit Final Report & Compute Grade",
    itemsAnswered: "items answered",

    finalGradeTitle: "Assessment Completed",
    finalGradeSubtitle: "All scenario cards completed. Review your grade and download the official PDF report to finalize your assessment.",
    assessmentGradeLabel: "Final Performance Grade",
    totalScoreLabel: "Overall Score",
    scenariosCompleted: "Scenarios Completed",
    totalDuration: "Total Time",
    downloadPdfRequirement: "Download Final PDF Report",
    downloadedConfirmation: "Final PDF Downloaded Successfully",
    taskFinishedNotice: "Assessment Task Finalized: Official Report Generated and Downloaded",
    pdfDownloadedBadge: "Official PDF Downloaded",
    shareWhatsApp: "Share to WhatsApp",
    retakeAssessment: "Retake Assessment",
    correctChoice: "KSIA Benchmark",
    yourChoice: "Your Choice",
    benchmarkReviewTitle: "Assessment Breakdown & Scenario Benchmarks",
    backToTop: "Top",
    allScenariosBreakdown: "Scenario-by-Scenario Evaluation"
  },
  ar: {
    appTitle: "محاكي طوارئ مطار الملك خالد LNNH-ZSH",
    appSubtitle: "تقييم بلاغات طوارئ المكاتب الإدارية بالمطار",
    badgeAdmin: "محاكي الإدارة",
    langEn: "English",
    langAr: "العربية",

    splashTitle: "تسجيل بيانات المشارك وتحديد الأدوار",
    splashSubtitle: "أدخل بياناتك الإدارية. سيتم تقديم كافة بطاقات الحالات واحدة تلو الأخرى بترتيب عشوائي لإكمال التقييم.",
    studentNameLabel: "اسم المشارك الثلاثي",
    studentNamePlaceholder: "مثال: سارة الحسن",
    badgeNumberLabel: "رقم البطاقة / الرقم الوظيفي",
    badgeNumberPlaceholder: "مثال: KSIA-8921",
    mainRoleLabel: "الدور الرئيسي في فريق الطوارئ",
    secondaryRoleLabel: "الدور الثانوي (المساند)",
    thirdRoleLabel: "الدور الثالث (الاحتياطي)",
    startAssessmentBtn: "بدء التقييم الشامل (حالات عشوائية)",
    studentRequiredAlert: "يرجى إدخال الاسم ورقم البطاقة واختيار الأدوار.",
    traineeLabel: "المشارك",
    badgeLabel: "رقم البطاقة",
    rolesLockedBadge: "مرشح نشط",
    assessmentRulesNotice: "يتعين على جميع المشاركين إكمال جميع الحالات لتحديد الدرجة النهائية وتحميل تقرير PDF الرسمي لإتمام المهمة.",

    scenarioProgress: "الحالة",
    primaryRoleBadge: "الدور الرئيسي",
    secondaryRoleBadge: "الدور الثانوي",
    thirdRoleBadge: "الدور الثالث",

    readingPhaseTitle: "تفاصيل الحادث الإداري",
    listenScenario: "استماع صوتي",
    stopListening: "إيقاف الصوت",
    proceedToReport: "الانتقال لبلاغ اللاسلكي",

    reportingPhaseTitle: "إرسال البلاغ اللاسلكي",
    reportingPhaseSubtitle: "الجزء 1: بلاغ الاكتشاف (L-N-N-H) • الجزء 2: تحديث العمليات (Z-S-H)",
    timeRemaining: "الوقت",
    scenarioLabel: "الحالة",
    part1SectionTitle: "الجزء 1: بلاغ الاكتشاف الأولي (L-N-N-H)",
    part1SectionDesc: "البلاغ الأولي الموجه لمركز العمليات فور اكتشاف الحادث.",
    part2SectionTitle: "الجزء 2: تحديث العمليات الميداني (Z-S-H)",
    part2SectionDesc: "تحديث سريع ومختصر (أقل من 15 ثانية) للمحافظة على انضباط القناة.",
    l_title: "L - الموقع (Location)",
    l_question: "أين يقع الحادث بدقة؟",
    n1_title: "N - طبيعة الحادث (Nature)",
    n1_question: "ما الذي يحدث الآن؟",
    n2_title: "N - الأعداد والإصابات (Numbers)",
    n2_question: "كم عدد المصابين وما هي حالتهم؟",
    h_title: "H - المخاطر المباشرة (Hazards)",
    h_question: "ما هو الخطر المباشر في الموقع الآن؟",
    z_title: "Z - منطقة العمليات (Zone)",
    z_question: "ما هي منطقة عملياتك المحددة؟",
    s_title: "S - حالة العمليات (Status)",
    s_question: "ما هي حالة الفريق والإجراءات الحالية؟",
    hz_title: "H - الخطر المتبقي (Hazard)",
    hz_question: "ما هو الخطر المستمر أو المتصاعد بالمنطقة؟",
    submitAndNext: "إرسال البلاغ والانتقال للحالة التالية",
    submitAndFinish: "إرسال البلاغ واحتساب الدرجة النهائية",
    itemsAnswered: "حقول مكتملة",

    finalGradeTitle: "اكتمل التقييم الشامل بنجاح",
    finalGradeSubtitle: "تم إكمال جميع بطاقات الحالات. راجع درجتك النهائية وحمل تقرير PDF الرسمي لإنهاء المهمة.",
    assessmentGradeLabel: "الدرجة النهائية للتقييم",
    totalScoreLabel: "النتيجة الإجمالية",
    scenariosCompleted: "الحالات المكتملة",
    totalDuration: "إجمالي الوقت",
    downloadPdfRequirement: "تحميل التقرير النهائي (PDF)",
    downloadedConfirmation: "تم تحميل التقرير النهائي بنجاح",
    taskFinishedNotice: "تم إنهاء مهمة التقييم رسمياً: تم إصدار وتحميل التقرير المعتمد",
    pdfDownloadedBadge: "تم تحميل التقرير الرسمي",
    shareWhatsApp: "مشاركة عبر واتساب",
    retakeAssessment: "إعادة التقييم من جديد",
    correctChoice: "معيار المطار القياسي",
    yourChoice: "اختيارك",
    benchmarkReviewTitle: "تفصيل التقييم ومقارنة معايير الحالات",
    backToTop: "للأعلى",
    allScenariosBreakdown: "تقييم الحالات تفصيلياً"
  }
};
