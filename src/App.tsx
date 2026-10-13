/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { scenarios23, Scenario23 } from './data/scenarios';
import { translations, LanguageMode } from './data/translations';
import { ertRoles, ERTRoleId, getRoleById } from './data/roles';
import { ScenarioIllustration } from './components/ScenarioIllustration';
import { 
  Building2, 
  Clock, 
  Send, 
  ChevronRight, 
  Download, 
  Share2, 
  Volume2, 
  VolumeX, 
  Check, 
  CheckCircle2, 
  XCircle, 
  ChevronUp, 
  Globe, 
  ShieldCheck, 
  RotateCcw,
  Sparkles,
  Award,
  FileCheck2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import confetti from 'canvas-confetti';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';

type AppStage = 'SPLASH' | 'READING' | 'REPORTING' | 'FINAL_RESULT';

interface ScenarioResult {
  scenario: Scenario23;
  selectedL: string;
  selectedN_Nature: string;
  selectedN_Numbers: string;
  selectedH: string;
  selectedZ: string;
  selectedS: string;
  selectedH_Residual: string;
  score: number;
  readingDuration: number;
  reportingDuration: number;
  items: {
    field: string;
    title: string;
    titleEn: string;
    isCorrect: boolean;
    userText: string;
    userTextEn: string;
    correctText: string;
    correctTextEn: string;
  }[];
}

// Fisher-Yates array shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App() {
  // English by default
  const [lang, setLang] = useState<LanguageMode>('en');
  
  // Student identification state with local storage persistence
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem('ksia_trainee_name') || '';
  });
  const [badgeNumber, setBadgeNumber] = useState<string>(() => {
    return localStorage.getItem('ksia_trainee_badge') || '';
  });
  const [mainRole, setMainRole] = useState<ERTRoleId>(() => {
    return (localStorage.getItem('ksia_main_role') as ERTRoleId) || 'EVACUATION_WARDEN';
  });
  const [secondaryRole, setSecondaryRole] = useState<ERTRoleId>(() => {
    return (localStorage.getItem('ksia_sec_role') as ERTRoleId) || 'FIRST_AID';
  });
  const [thirdRole, setThirdRole] = useState<ERTRoleId>(() => {
    return (localStorage.getItem('ksia_third_role') as ERTRoleId) || 'COMMUNICATIONS';
  });
  const [splashError, setSplashError] = useState<string>('');

  // Assessment Stage and Randomized Queue
  const [stage, setAppStage] = useState<AppStage>('SPLASH');
  const [assessmentQueue, setAssessmentQueue] = useState<Scenario23[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [completedResults, setCompletedResults] = useState<ScenarioResult[]>([]);
  const [hasDownloadedPDF, setHasDownloadedPDF] = useState<boolean>(false);

  // Timer & active scenario state
  const [timeLeft, setTimeLeft] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Current Scenario Answers
  const [selectedL, setSelectedL] = useState<string>('');
  const [selectedN_Nature, setSelectedN_Nature] = useState<string>('');
  const [selectedN_Numbers, setSelectedN_Numbers] = useState<string>('');
  const [selectedH, setSelectedH] = useState<string>('');
  const [selectedZ, setSelectedZ] = useState<string>('');
  const [selectedS, setSelectedS] = useState<string>('');
  const [selectedH_Residual, setSelectedH_Residual] = useState<string>('');
  
  // Time tracking
  const readingStartTimeRef = useRef(0);
  const reportingStartTimeRef = useRef(0);
  const [currentReadingDuration, setCurrentReadingDuration] = useState(0);

  // Active translation set
  const t = translations[lang];
  const isRTL = lang === 'ar';

  // Current active scenario from randomized queue
  const currentScenario = assessmentQueue[currentIndex] || null;

  // Seamless scroll to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToTop();
  }, [stage, currentIndex, scrollToTop]);

  // Monitor scroll for mobile back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 240);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (lang === 'ar') {
      return mins > 0 ? `${mins} دقيقة و ${secs} ثانية` : `${secs} ثانية`;
    }
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  // Start Assessment: Randomize scenarios and begin with scenario #1
  const handleStartAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = studentName.trim();
    const cleanBadge = badgeNumber.trim();
    
    if (!cleanName || !cleanBadge) {
      setSplashError(t.studentRequiredAlert);
      return;
    }
    
    setSplashError('');
    localStorage.setItem('ksia_trainee_name', cleanName);
    localStorage.setItem('ksia_trainee_badge', cleanBadge);
    localStorage.setItem('ksia_main_role', mainRole);
    localStorage.setItem('ksia_sec_role', secondaryRole);
    localStorage.setItem('ksia_third_role', thirdRole);

    // Shuffle scenarios randomly
    const randomized = shuffleArray(scenarios23);
    setAssessmentQueue(randomized);
    setCurrentIndex(0);
    setCompletedResults([]);
    setHasDownloadedPDF(false);

    // Reset current scenario answers
    setSelectedL('');
    setSelectedN_Nature('');
    setSelectedN_Numbers('');
    setSelectedH('');
    setSelectedZ('');
    setSelectedS('');
    setSelectedH_Residual('');

    // Begin Scenario 1 reading phase
    setAppStage('READING');
    setTimeLeft(120); // 2 minutes reading time
    setIsTimerRunning(true);
    readingStartTimeRef.current = Date.now();
    reportingStartTimeRef.current = 0;
  };

  // Auditory helper
  const handleSpeak = (text: string, voiceLang: 'en' | 'ar') => {
    if (!('speechSynthesis' in window)) return;
    
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voiceLang === 'ar' ? 'ar-SA' : 'en-US';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Move from Reading to Reporting
  const handleNextFromReading = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    const now = Date.now();
    const duration = readingStartTimeRef.current > 0 ? Math.round((now - readingStartTimeRef.current) / 1000) : 0;
    setCurrentReadingDuration(duration);
    setAppStage('REPORTING');
    reportingStartTimeRef.current = now;
    setTimeLeft(300); // 5 minutes reporting time
    setIsTimerRunning(true);
  }, []);

  // Answered count for current scenario
  const answeredCount = useMemo(() => {
    let count = 0;
    if (selectedL) count++;
    if (selectedN_Nature) count++;
    if (selectedN_Numbers) count++;
    if (selectedH) count++;
    if (selectedZ) count++;
    if (selectedS) count++;
    if (selectedH_Residual) count++;
    return count;
  }, [selectedL, selectedN_Nature, selectedN_Numbers, selectedH, selectedZ, selectedS, selectedH_Residual]);

  const isFormComplete = answeredCount === 7;

  // Submit current scenario and either advance to next randomized scenario or finalize assessment
  const handleScenarioSubmit = useCallback(() => {
    if (!currentScenario) return;

    const now = Date.now();
    const reportingDuration = reportingStartTimeRef.current > 0 ? Math.round((now - reportingStartTimeRef.current) / 1000) : 0;

    // Evaluate current scenario
    const checks = [
      {
        field: 'L',
        title: lang === 'ar' ? 'الموقع (L)' : 'Location (L)',
        titleEn: 'Location (L)',
        userVal: selectedL,
        options: currentScenario.options.l,
        correctOption: currentScenario.options.l.find(o => o.isCorrect)
      },
      {
        field: 'N1',
        title: lang === 'ar' ? 'طبيعة الحادث (N)' : 'Nature (N)',
        titleEn: 'Nature (N)',
        userVal: selectedN_Nature,
        options: currentScenario.options.n_nature,
        correctOption: currentScenario.options.n_nature.find(o => o.isCorrect)
      },
      {
        field: 'N2',
        title: lang === 'ar' ? 'الأعداد والمصابين (N)' : 'Numbers (N)',
        titleEn: 'Numbers (N)',
        userVal: selectedN_Numbers,
        options: currentScenario.options.n_numbers,
        correctOption: currentScenario.options.n_numbers.find(o => o.isCorrect)
      },
      {
        field: 'H',
        title: lang === 'ar' ? 'المخاطر المباشرة (H)' : 'Hazards (H)',
        titleEn: 'Hazards (H)',
        userVal: selectedH,
        options: currentScenario.options.h_hazards,
        correctOption: currentScenario.options.h_hazards.find(o => o.isCorrect)
      },
      {
        field: 'Z',
        title: lang === 'ar' ? 'منطقة العمليات (Z)' : 'Zone (Z)',
        titleEn: 'Zone (Z)',
        userVal: selectedZ,
        options: currentScenario.options.z_zone,
        correctOption: currentScenario.options.z_zone.find(o => o.isCorrect)
      },
      {
        field: 'S',
        title: lang === 'ar' ? 'حالة العمليات (S)' : 'Status (S)',
        titleEn: 'Status (S)',
        userVal: selectedS,
        options: currentScenario.options.s_status,
        correctOption: currentScenario.options.s_status.find(o => o.isCorrect)
      },
      {
        field: 'HZ',
        title: lang === 'ar' ? 'الخطر المستمر (H)' : 'Residual Hazard (H)',
        titleEn: 'Residual Hazard (H)',
        userVal: selectedH_Residual,
        options: currentScenario.options.h_residual,
        correctOption: currentScenario.options.h_residual.find(o => o.isCorrect)
      }
    ];

    let scScore = 0;
    const items = checks.map(item => {
      const selectedObj = item.options.find(o => o.id === item.userVal);
      const isRight = Boolean(selectedObj && selectedObj.isCorrect);
      if (isRight) scScore++;
      return {
        field: item.field,
        title: item.title,
        titleEn: item.titleEn,
        isCorrect: isRight,
        userText: selectedObj ? (lang === 'ar' ? selectedObj.textAr : selectedObj.text) : 'N/A',
        userTextEn: selectedObj?.text || 'N/A',
        correctText: item.correctOption ? (lang === 'ar' ? item.correctOption.textAr : item.correctOption.text) : '',
        correctTextEn: item.correctOption?.text || ''
      };
    });

    const resultRecord: ScenarioResult = {
      scenario: currentScenario,
      selectedL,
      selectedN_Nature,
      selectedN_Numbers,
      selectedH,
      selectedZ,
      selectedS,
      selectedH_Residual,
      score: scScore,
      readingDuration: currentReadingDuration,
      reportingDuration,
      items
    };

    const nextCompleted = [...completedResults, resultRecord];
    setCompletedResults(nextCompleted);

    // Check if more scenarios remain
    if (currentIndex + 1 < assessmentQueue.length) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      
      // Reset answers for next scenario
      setSelectedL('');
      setSelectedN_Nature('');
      setSelectedN_Numbers('');
      setSelectedH('');
      setSelectedZ('');
      setSelectedS('');
      setSelectedH_Residual('');

      setAppStage('READING');
      setTimeLeft(120);
      setIsTimerRunning(true);
      readingStartTimeRef.current = Date.now();
      reportingStartTimeRef.current = 0;
    } else {
      // Completed all scenarios!
      setIsTimerRunning(false);
      setAppStage('FINAL_RESULT');
      confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#0f766e', '#14b8a6', '#0284c7', '#f59e0b']
      });
    }
  }, [
    currentScenario,
    currentIndex,
    assessmentQueue.length,
    completedResults,
    currentReadingDuration,
    selectedL,
    selectedN_Nature,
    selectedN_Numbers,
    selectedH,
    selectedZ,
    selectedS,
    selectedH_Residual,
    lang
  ]);

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      if (stage === 'READING') {
        handleNextFromReading();
      } else if (stage === 'REPORTING') {
        handleScenarioSubmit();
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, stage, handleNextFromReading, handleScenarioSubmit]);

  // Overall Performance Evaluation across all scenarios
  const overallEvaluation = useMemo(() => {
    const totalQuestions = completedResults.length * 7;
    const totalScore = completedResults.reduce((acc, curr) => acc + curr.score, 0);
    const percentage = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;
    
    const totalReadingSeconds = completedResults.reduce((acc, curr) => acc + curr.readingDuration, 0);
    const totalReportingSeconds = completedResults.reduce((acc, curr) => acc + curr.reportingDuration, 0);

    // Letter grade and certification status
    let grade = 'A+';
    let gradeLabelEn = 'Outstanding Readiness (Gold Certification)';
    let gradeLabelAr = 'جاهزية استثنائية (شهادة ذهبية)';
    let gradeColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';

    if (percentage >= 90) {
      grade = 'A+';
      gradeLabelEn = 'Outstanding Readiness (Gold Certification)';
      gradeLabelAr = 'جاهزية استثنائية (شهادة ذهبية)';
      gradeColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
    } else if (percentage >= 80) {
      grade = 'A';
      gradeLabelEn = 'Competent Readiness (KSIA Certified)';
      gradeLabelAr = 'جاهزية متقدمة (معتمد من المطار)';
      gradeColor = 'text-teal-700 bg-teal-50 border-teal-300';
    } else if (percentage >= 70) {
      grade = 'B';
      gradeLabelEn = 'Proficient Readiness (Passed Standard)';
      gradeLabelAr = 'جاهزية قياسية (اجتياز المعيار)';
      gradeColor = 'text-blue-700 bg-blue-50 border-blue-300';
    } else if (percentage >= 60) {
      grade = 'C';
      gradeLabelEn = 'Developing (Refresher Recommended)';
      gradeLabelAr = 'جاهزية متوسطة (يوصى بمراجعة سريعة)';
      gradeColor = 'text-amber-700 bg-amber-50 border-amber-300';
    } else {
      grade = 'D';
      gradeLabelEn = 'Action Required (Retraining Required)';
      gradeLabelAr = 'بحاجة لإعادة تدريب';
      gradeColor = 'text-red-700 bg-red-50 border-red-300';
    }

    return {
      totalQuestions,
      totalScore,
      percentage,
      grade,
      gradeLabel: lang === 'ar' ? gradeLabelAr : gradeLabelEn,
      gradeLabelEn,
      gradeColor,
      totalReadingSeconds,
      totalReportingSeconds
    };
  }, [completedResults, lang]);

  // Final PDF Generation strictly in English (multi-scenario full assessment)
  const handleDownloadFinalPDF = useCallback(() => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const margin = 18;
    let y = 18;

    // Header bar
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, 210, 34, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(15);
    doc.setFont('helvetica', 'bold');
    doc.text('KSIA ERT LNNH-ZSH SIMULATOR ASSESSMENT REPORT', margin, 15);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(203, 213, 225);
    doc.text('Official Administrative Emergency Readiness Certification • Dual-Format Radio Protocol', margin, 23);

    // Candidate Profile Box
    y = 42;
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, 174, 28, 2, 2, 'FD');

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.text('CANDIDATE IDENTIFICATION & ASSIGNED ROLES', margin + 4, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(`Candidate Name: ${studentName.trim() || 'N/A'}`, margin + 4, y + 12);
    doc.text(`Airport Badge ID: ${badgeNumber.trim() || 'N/A'}`, margin + 4, y + 17);
    doc.text(`Date of Assessment: ${new Date().toLocaleString()}`, margin + 4, y + 22);

    const mainRoleObj = getRoleById(mainRole);
    const secRoleObj = getRoleById(secondaryRole);
    const thirdRoleObj = getRoleById(thirdRole);
    doc.text(`Main Role: ${mainRoleObj.name}`, margin + 85, y + 12);
    doc.text(`2nd Role: ${secRoleObj.name}`, margin + 85, y + 17);
    doc.text(`3rd Role: ${thirdRoleObj.name}`, margin + 85, y + 22);

    // Overall Grade & Summary Score Banner
    y = 75;
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, y, 174, 26, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(`FINAL ASSESSMENT GRADE: ${overallEvaluation.grade} (${overallEvaluation.percentage}%)`, margin + 4, y + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(`Rating: ${overallEvaluation.gradeLabelEn}`, margin + 4, y + 13);
    doc.text(`Total Score: ${overallEvaluation.totalScore} of ${overallEvaluation.totalQuestions} questions correct across ${completedResults.length} scenarios`, margin + 4, y + 18);
    doc.text(`Total Assessment Duration: ${formatDuration(overallEvaluation.totalReadingSeconds + overallEvaluation.totalReportingSeconds)}`, margin + 4, y + 23);

    // Scenario Results Summary Table
    y = 106;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text('SCENARIO PERFORMANCE SUMMARY', margin, y);

    let curY = y + 5;
    completedResults.forEach((res, idx) => {
      // Check if page overflow
      if (curY > 260) {
        doc.addPage();
        curY = 20;
      }

      doc.setFillColor(res.score >= 5 ? 240 : 254, res.score >= 5 ? 253 : 242, res.score >= 5 ? 244 : 242);
      doc.setDrawColor(res.score >= 5 ? 187 : 254, res.score >= 5 ? 247 : 202, res.score >= 5 ? 208 : 202);
      doc.roundedRect(margin, curY, 174, 25, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text(`Scenario ${idx + 1}: ${res.scenario.title} (${res.scenario.floor})`, margin + 4, curY + 6);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      doc.text(`Score: ${res.score}/7 (${Math.round((res.score / 7) * 100)}%) | Reading: ${formatDuration(res.readingDuration)} | Reporting: ${formatDuration(res.reportingDuration)}`, margin + 4, curY + 12);
      doc.text(`Primary Competency Tested: ${getRoleById(res.scenario.primaryRole).name}`, margin + 4, curY + 17);

      const passTag = res.score >= 5 ? 'PASSED' : 'NEEDS PRACTICE';
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(res.score >= 5 ? 21 : 185, res.score >= 5 ? 128 : 28, res.score >= 5 ? 61 : 28);
      doc.text(`Status: ${passTag}`, margin + 4, curY + 22);

      curY += 28;
    });

    // Certification Stamp
    if (curY > 250) {
      doc.addPage();
      curY = 20;
    }

    curY += 4;
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, curY, 174, 18, 2, 2, 'FD');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('OFFICIAL READINESS CERTIFICATION STAMP', margin + 4, curY + 6);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    doc.text(`Verified administrative drill competency for: ${studentName.trim()} [ID: ${badgeNumber.trim()}]`, margin + 4, curY + 12);

    // Footer
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text('KSIA Airport Emergency Response Team • Official Assessment Certification', margin, 287);

    const safeBadge = badgeNumber.trim().replace(/[^a-zA-Z0-9_-]/g, '') || 'REPORT';
    doc.save(`KSIA_ERT_Final_Assessment_${safeBadge}.pdf`);

    // Mark task as downloaded and finished
    setHasDownloadedPDF(true);
  }, [
    studentName,
    badgeNumber,
    mainRole,
    secondaryRole,
    thirdRole,
    overallEvaluation,
    completedResults,
    formatDuration
  ]);

  // WhatsApp share of final grade
  const shareWhatsApp = () => {
    const text = `*KSIA ERT LNNH-ZSH Simulator - Assessment Final Result*
Candidate: ${studentName.trim()} (Badge: ${badgeNumber.trim()})
Grade: ${overallEvaluation.grade} (${overallEvaluation.percentage}%) - ${overallEvaluation.gradeLabelEn}
Score: ${overallEvaluation.totalScore} / ${overallEvaluation.totalQuestions}
Completed Scenarios: ${completedResults.length}
Total Duration: ${formatDuration(overallEvaluation.totalReadingSeconds + overallEvaluation.totalReportingSeconds)}`;

    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const restartAssessment = () => {
    setAppStage('SPLASH');
  };

  return (
    <div 
      className={`min-h-screen bg-slate-50 text-slate-900 selection:bg-teal-100 flex flex-col ${isRTL ? 'font-arabic' : 'font-sans'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <OfflineIndicator />
      
      {/* Top Mobile-First Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-3.5 py-2.5 sm:px-6">
          {/* Logo & KSIA ERT Branding */}
          <div className="flex items-center gap-2.5 select-none">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs">
              <Building2 className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-extrabold text-slate-950 tracking-tight">KSIA ERT</span>
                <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200/60 hidden xs:inline">
                  {t.badgeAdmin}
                </span>
              </div>
              <p className="text-[10.5px] font-medium text-slate-500 leading-none">
                LNNH-ZSH Simulator
              </p>
            </div>
          </div>

          {/* Right Header Controls: Locked Trainee Pill & Top Right Arabic Toggle */}
          <div className="flex items-center gap-2">
            {/* Read-Only Trainee Badge (NO EDITABLE ICONS) */}
            {stage !== 'SPLASH' && studentName && (
              <div 
                className="flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700 border border-slate-200/60"
                title={`${studentName} (${badgeNumber})`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span className="truncate max-w-[85px] sm:max-w-[120px] font-semibold">{studentName}</span>
                <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">#{badgeNumber}</span>
              </div>
            )}

            {/* Arabic Icon Button at top right corner */}
            <button
              onClick={() => setLang(prev => (prev === 'en' ? 'ar' : 'en'))}
              className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 px-2.5 py-1.5 text-xs font-bold text-slate-800 transition-colors cursor-pointer"
              aria-label="Switch language to Arabic or English"
              title={lang === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
            >
              <Globe className="w-3.5 h-3.5 text-teal-600" />
              <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
            </button>
          </div>
        </div>

        {/* Global Assessment Progress Bar (Visible during Reading & Reporting) */}
        {(stage === 'READING' || stage === 'REPORTING') && assessmentQueue.length > 0 && (
          <div className="w-full bg-slate-100 h-1">
            <div 
              className="bg-teal-600 h-1 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / assessmentQueue.length) * 100}%` }}
            />
          </div>
        )}
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 px-3.5 py-4 sm:px-6 sm:py-6 mx-auto w-full max-w-3xl">
        <AnimatePresence mode="wait">
          {/* ======================================================== */}
          {/* STAGE 1: PARTICIPANT PROFILE & ROLE INTAKE               */}
          {/* ======================================================== */}
          {stage === 'SPLASH' && (
            <motion.div
              key="splash"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mx-auto max-w-md space-y-4 pt-1"
            >
              <div className="text-center space-y-1">
                <span className="inline-block text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60">
                  KSIA ERT LNNH-ZSH Simulator
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-950">
                  {t.splashTitle}
                </h1>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  {t.splashSubtitle}
                </p>
              </div>

              {/* Assessment Notice Box */}
              <div className="rounded-xl bg-slate-100 p-3 text-xs text-slate-700 border border-slate-200/80 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {t.assessmentRulesNotice}
                </p>
              </div>

              {splashError && (
                <div className="rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-700 border border-red-200 text-center">
                  {splashError}
                </div>
              )}

              <form onSubmit={handleStartAssessment} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3.5">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800 block">
                    {t.studentNameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder={t.studentNamePlaceholder}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-sm font-medium focus:border-slate-900 focus:outline-none transition-colors"
                  />
                </div>

                {/* Badge Number */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800 block">
                    {t.badgeNumberLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={badgeNumber}
                    onChange={(e) => setBadgeNumber(e.target.value)}
                    placeholder={t.badgeNumberPlaceholder}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-sm font-medium focus:border-slate-900 focus:outline-none transition-colors"
                  />
                </div>

                {/* Main Role Selection */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>{t.mainRoleLabel}</span>
                    <span className="text-[10px] text-teal-700 font-semibold">{t.primaryRoleBadge}</span>
                  </label>
                  <select
                    value={mainRole}
                    onChange={(e) => setMainRole(e.target.value as ERTRoleId)}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs sm:text-sm font-medium bg-white focus:border-slate-900 focus:outline-none"
                  >
                    {ertRoles.map(role => (
                      <option key={role.id} value={role.id}>
                        {lang === 'ar' ? role.nameAr : role.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Secondary Role Selection */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>{t.secondaryRoleLabel}</span>
                    <span className="text-[10px] text-amber-700 font-semibold">{t.secondaryRoleBadge}</span>
                  </label>
                  <select
                    value={secondaryRole}
                    onChange={(e) => setSecondaryRole(e.target.value as ERTRoleId)}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs sm:text-sm font-medium bg-white focus:border-slate-900 focus:outline-none"
                  >
                    {ertRoles.map(role => (
                      <option key={role.id} value={role.id}>
                        {lang === 'ar' ? role.nameAr : role.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Third Role Selection */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>{t.thirdRoleLabel}</span>
                    <span className="text-[10px] text-slate-500 font-semibold">{t.thirdRoleBadge}</span>
                  </label>
                  <select
                    value={thirdRole}
                    onChange={(e) => setThirdRole(e.target.value as ERTRoleId)}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs sm:text-sm font-medium bg-white focus:border-slate-900 focus:outline-none"
                  >
                    {ertRoles.map(role => (
                      <option key={role.id} value={role.id}>
                        {lang === 'ar' ? role.nameAr : role.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full mt-2 rounded-xl bg-slate-900 hover:bg-slate-800 py-3 text-sm font-bold text-white transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{t.startAssessmentBtn}</span>
                  <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </form>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* STAGE 2: READING PHASE (SCENARIO BRIEFING + ILLUSTRATION) */}
          {/* ======================================================== */}
          {stage === 'READING' && currentScenario && (
            <motion.div
              key={`reading-${currentScenario.id}-${currentIndex}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-4 max-w-2xl mx-auto"
            >
              {/* Scenario Progress & Timer Banner */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-teal-700 uppercase tracking-wider">
                    <span>{t.scenarioProgress} {currentIndex + 1} / {assessmentQueue.length}</span>
                    <span>•</span>
                    <span>{t.readingPhaseTitle}</span>
                  </div>
                  <h1 className="text-lg sm:text-xl font-black text-slate-950 mt-0.5">
                    {lang === 'ar' ? currentScenario.titleAr : currentScenario.title}
                  </h1>
                </div>

                <div className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-mono text-sm font-bold shadow-2xs ${
                  timeLeft <= 30 ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse' : 'bg-slate-100 text-slate-800'
                }`}>
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                </div>
              </div>

              {/* High-Quality Visual Illustration Component */}
              <ScenarioIllustration
                scenarioId={currentScenario.id}
                isArabic={lang === 'ar'}
                className="w-full"
              />

              {/* Scenario Narrative Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-800">
                    {lang === 'ar' ? currentScenario.departmentAr : currentScenario.department}
                  </span>
                  <span>
                    {lang === 'ar' ? currentScenario.floorAr : currentScenario.floor}
                  </span>
                </div>

                <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
                  {lang === 'ar' ? currentScenario.scenarioTextAr : currentScenario.scenarioText}
                </p>

                {/* Read Aloud button for auditory drill */}
                <div className="pt-1 flex items-center justify-between">
                  <button
                    onClick={() => handleSpeak(
                      lang === 'ar' ? currentScenario.scenarioTextAr : currentScenario.scenarioText,
                      lang
                    )}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-red-500" />
                        <span>{t.stopListening}</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-teal-600" />
                        <span>{t.listenScenario}</span>
                      </>
                    )}
                  </button>

                  <span className="text-[11px] font-semibold text-slate-400">
                    Scenario #{currentScenario.id}
                  </span>
                </div>
              </div>

              {/* Action: Proceed to Reporting */}
              <button
                onClick={handleNextFromReading}
                className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 py-3.5 text-sm font-bold text-white transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t.proceedToReport}</span>
                <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* STAGE 3: REPORTING PHASE (L-N-N-H & Z-S-H)               */}
          {/* ======================================================== */}
          {stage === 'REPORTING' && currentScenario && (
            <motion.div
              key={`reporting-${currentScenario.id}-${currentIndex}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-4 max-w-2xl mx-auto"
            >
              {/* Header with Scenario Progress & Timer */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-teal-700">
                    {t.scenarioProgress} {currentIndex + 1} of {assessmentQueue.length}
                  </div>
                  <h1 className="text-base sm:text-lg font-black text-slate-950">
                    {lang === 'ar' ? currentScenario.titleAr : currentScenario.title}
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {answeredCount}/7 {t.itemsAnswered}
                  </p>
                </div>

                <div className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-mono text-sm font-bold shadow-2xs ${
                  timeLeft <= 45 ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse' : 'bg-slate-100 text-slate-800'
                }`}>
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                </div>
              </div>

              {/* Quick Scenario Reminder Card with Scene Photo */}
              <details className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700">
                <summary className="font-bold cursor-pointer select-none text-slate-800 flex items-center justify-between">
                  <span>{lang === 'ar' ? 'عرض تفاصيل الحادث وصورة الموقع للمراجعة' : 'View Incident Details & Scene Photo'}</span>
                  <span className="text-[11px] text-teal-700">Tap to expand</span>
                </summary>
                <div className="mt-2.5 pt-2.5 border-t border-slate-100 space-y-2.5">
                  <ScenarioIllustration
                    scenarioId={currentScenario.id}
                    isArabic={lang === 'ar'}
                    className="w-full"
                  />
                  <p className="leading-relaxed text-slate-700 font-medium">
                    {lang === 'ar' ? currentScenario.scenarioTextAr : currentScenario.scenarioText}
                  </p>
                </div>
              </details>

              {/* ======================================================== */}
              {/* PART 1: INITIAL INCIDENT DISCOVERY (L-N-N-H)             */}
              {/* ======================================================== */}
              <div className="space-y-3">
                <div className="border-b border-slate-200 pb-1.5">
                  <h2 className="text-sm font-black text-slate-950">
                    {t.part1SectionTitle}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {t.part1SectionDesc}
                  </p>
                </div>

                {/* Field 1: L - Location */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-wide">
                      {t.l_title}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {t.l_question}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {currentScenario.options.l.map((opt) => {
                      const isSelected = selectedL === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedL(opt.id)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'bg-teal-50 border-teal-600 text-teal-950 font-semibold ring-1 ring-teal-600'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{lang === 'ar' ? opt.textAr : opt.text}</span>
                          <span className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300'
                          }`}>
                            {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Field 2: N1 - Nature */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-wide">
                      {t.n1_title}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {t.n1_question}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {currentScenario.options.n_nature.map((opt) => {
                      const isSelected = selectedN_Nature === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedN_Nature(opt.id)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'bg-teal-50 border-teal-600 text-teal-950 font-semibold ring-1 ring-teal-600'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{lang === 'ar' ? opt.textAr : opt.text}</span>
                          <span className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300'
                          }`}>
                            {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Field 3: N2 - Numbers */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-wide">
                      {t.n2_title}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {t.n2_question}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {currentScenario.options.n_numbers.map((opt) => {
                      const isSelected = selectedN_Numbers === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedN_Numbers(opt.id)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'bg-teal-50 border-teal-600 text-teal-950 font-semibold ring-1 ring-teal-600'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{lang === 'ar' ? opt.textAr : opt.text}</span>
                          <span className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300'
                          }`}>
                            {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Field 4: H - Hazards */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-wide">
                      {t.h_title}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {t.h_question}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {currentScenario.options.h_hazards.map((opt) => {
                      const isSelected = selectedH === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedH(opt.id)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'bg-teal-50 border-teal-600 text-teal-950 font-semibold ring-1 ring-teal-600'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{lang === 'ar' ? opt.textAr : opt.text}</span>
                          <span className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300'
                          }`}>
                            {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ======================================================== */}
              {/* PART 2: OPERATIONAL ZONE CHECK-IN (Z-S-H)                */}
              {/* ======================================================== */}
              <div className="space-y-3 pt-3">
                <div className="border-b border-slate-200 pb-1.5">
                  <h2 className="text-sm font-black text-slate-950">
                    {t.part2SectionTitle}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {t.part2SectionDesc}
                  </p>
                </div>

                {/* Field 5: Z - Zone */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-wide">
                      {t.z_title}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {t.z_question}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {currentScenario.options.z_zone.map((opt) => {
                      const isSelected = selectedZ === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedZ(opt.id)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'bg-amber-50 border-amber-600 text-amber-950 font-semibold ring-1 ring-amber-600'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{lang === 'ar' ? opt.textAr : opt.text}</span>
                          <span className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-amber-600 bg-amber-600 text-white' : 'border-slate-300'
                          }`}>
                            {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Field 6: S - Status */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-wide">
                      {t.s_title}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {t.s_question}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {currentScenario.options.s_status.map((opt) => {
                      const isSelected = selectedS === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedS(opt.id)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'bg-amber-50 border-amber-600 text-amber-950 font-semibold ring-1 ring-amber-600'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{lang === 'ar' ? opt.textAr : opt.text}</span>
                          <span className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-amber-600 bg-amber-600 text-white' : 'border-slate-300'
                          }`}>
                            {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Field 7: H - Hazard */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-wide">
                      {t.hz_title}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {t.hz_question}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {currentScenario.options.h_residual.map((opt) => {
                      const isSelected = selectedH_Residual === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedH_Residual(opt.id)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'bg-amber-50 border-amber-600 text-amber-950 font-semibold ring-1 ring-amber-600'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{lang === 'ar' ? opt.textAr : opt.text}</span>
                          <span className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-amber-600 bg-amber-600 text-white' : 'border-slate-300'
                          }`}>
                            {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Submit / Advance Button */}
              <div className="pt-2">
                <button
                  type="button"
                  disabled={!isFormComplete}
                  onClick={handleScenarioSubmit}
                  className={`w-full rounded-xl py-3.5 text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2 ${
                    isFormComplete
                      ? 'bg-slate-900 hover:bg-slate-800 text-white cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {currentIndex + 1 < assessmentQueue.length
                      ? t.submitAndNext
                      : t.submitAndFinish}
                  </span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* STAGE 4: FINAL ASSESSMENT GRADING & COMPLETION           */}
          {/* ======================================================== */}
          {stage === 'FINAL_RESULT' && (
            <motion.div
              key="final-result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-4 max-w-2xl mx-auto"
            >
              {/* Grand Final Grade Summary Card */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm text-center space-y-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                  <Award className="w-4 h-4 text-teal-600" />
                  <span>{t.finalGradeTitle}</span>
                </div>

                <div className="pt-1">
                  <div className="inline-block rounded-2xl border-2 px-6 py-2.5 my-1 bg-slate-50 font-mono font-black text-4xl sm:text-5xl text-slate-950 shadow-inner">
                    {overallEvaluation.grade}
                  </div>
                  <p className="text-sm font-extrabold text-slate-900 mt-1">
                    {overallEvaluation.gradeLabel}
                  </p>
                  <p className="text-xs font-bold text-slate-500 font-mono">
                    {overallEvaluation.totalScore} / {overallEvaluation.totalQuestions} ({overallEvaluation.percentage}%) {t.totalScoreLabel}
                  </p>
                </div>

                {/* Candidate Stats */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <span className="text-[11px] text-slate-400 block">{t.scenariosCompleted}</span>
                    <span className="font-extrabold text-slate-900">{completedResults.length} Cards (100%)</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <span className="text-[11px] text-slate-400 block">{t.totalDuration}</span>
                    <span className="font-extrabold text-slate-900">
                      {formatDuration(overallEvaluation.totalReadingSeconds + overallEvaluation.totalReportingSeconds)}
                    </span>
                  </div>
                </div>

                {/* PDF Completion Status Banner */}
                {hasDownloadedPDF ? (
                  <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-bold text-emerald-800 flex items-center justify-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t.taskFinishedNotice}</span>
                  </div>
                ) : (
                  <p className="text-xs font-medium text-slate-500">
                    {t.finalGradeSubtitle}
                  </p>
                )}
              </div>

              {/* Mandatory Action: Download Final PDF Report */}
              <div className="space-y-2">
                <button
                  onClick={handleDownloadFinalPDF}
                  className={`w-full flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold text-white transition-all shadow-md cursor-pointer ${
                    hasDownloadedPDF
                      ? 'bg-emerald-700 hover:bg-emerald-800'
                      : 'bg-slate-900 hover:bg-slate-800 ring-2 ring-slate-900/10'
                  }`}
                >
                  <Download className="w-5 h-5" />
                  <span>
                    {hasDownloadedPDF
                      ? `${t.downloadedConfirmation} (Re-download)`
                      : t.downloadPdfRequirement}
                  </span>
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={shareWhatsApp}
                    className="flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 py-2.5 text-xs font-bold text-emerald-900 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-4 h-4 text-emerald-700" />
                    <span>{t.shareWhatsApp}</span>
                  </button>

                  <button
                    onClick={restartAssessment}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 py-2.5 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-slate-500" />
                    <span>{t.retakeAssessment}</span>
                  </button>
                </div>
              </div>

              {/* Comprehensive Scenario Breakdown Accordion */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
                <h2 className="text-sm font-black text-slate-950 border-b border-slate-100 pb-2">
                  {t.allScenariosBreakdown}
                </h2>

                <div className="space-y-3">
                  {completedResults.map((res, scIdx) => (
                    <details 
                      key={res.scenario.id} 
                      className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-xs"
                    >
                      <summary className="font-bold text-slate-900 flex items-center justify-between cursor-pointer select-none">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-black text-slate-700">#{scIdx + 1}</span>
                          <span>{lang === 'ar' ? res.scenario.titleAr : res.scenario.title}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`px-2 py-0.5 rounded-full font-bold ${
                            res.score >= 5 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {res.score}/7
                          </span>
                        </div>
                      </summary>

                      <div className="mt-3 pt-3 border-t border-slate-200 space-y-2.5">
                        <ScenarioIllustration
                          scenarioId={res.scenario.id}
                          isArabic={lang === 'ar'}
                          className="w-full mb-2"
                        />
                        {res.items.map((item) => (
                          <div 
                            key={item.field}
                            className={`p-2.5 rounded-lg border text-[11px] space-y-1 ${
                              item.isCorrect 
                                ? 'bg-white border-emerald-200 text-emerald-950' 
                                : 'bg-white border-red-200 text-red-950'
                            }`}
                          >
                            <div className="flex items-center justify-between font-bold">
                              <span className="flex items-center gap-1">
                                {item.isCorrect ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <XCircle className="w-3.5 h-3.5 text-red-600" />
                                )}
                                <span>{item.title}</span>
                              </span>
                              <span className={`text-[10px] font-semibold ${item.isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                                {item.isCorrect ? 'Pass' : 'Review'}
                              </span>
                            </div>

                            <p className="text-slate-600">
                              <span className="font-semibold">{t.yourChoice}: </span>
                              <span className={item.isCorrect ? 'text-emerald-900 font-medium' : 'text-red-900 font-medium line-through'}>
                                {item.userText}
                              </span>
                            </p>

                            {!item.isCorrect && (
                              <p className="text-emerald-800 font-medium">
                                <span className="font-semibold">{t.correctChoice}: </span>
                                {item.correctText}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Mobile Seamless Scroll to Top Floating Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
