/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Camera, AlertTriangle } from 'lucide-react';

import scenario1Img from '../assets/images/scenario_1.jpg';
import scenario2Img from '../assets/images/scenario_2.jpg';
import scenario3Img from '../assets/images/scenario_3.jpg';
import scenario4Img from '../assets/images/scenario_4.jpg';
import scenario5Img from '../assets/images/scenario_5.jpg';

interface ScenarioIllustrationProps {
  scenarioId: number;
  className?: string;
  isArabic?: boolean;
}

interface PhotoData {
  img: string;
  title: string;
  titleAr: string;
  location: string;
  locationAr: string;
  hazardBadge: string;
  hazardBadgeAr: string;
}

const scenarioPhotos: Record<number, PhotoData> = {
  1: {
    img: scenario1Img,
    title: 'HR Kitchenette Room 305 • Coffee Maker Fire',
    titleAr: 'مطبخ الموارد البشرية 305 • حريق ماكينة القهوة',
    location: 'Airport Admin Building • 3rd Floor East Wing',
    locationAr: 'مبنى إدارة المطار • الطابق الثالث الجناح الشرقي',
    hazardBadge: 'ACTIVE FLAME & ELECTRICAL HAZARD',
    hazardBadgeAr: 'لهب نشط وخطر كهربائي'
  },
  2: {
    img: scenario2Img,
    title: 'Archive Room B-12 • Heavy Cabinet Collapse',
    titleAr: 'أرشيف الوثائق B-12 • سقوط خزانة الملفات',
    location: 'Basement Level B1 • Records Archive Sector',
    locationAr: 'قبو المبنى B1 • قطاع حفظ الوثائق',
    hazardBadge: 'PHYSICAL ENTRAPMENT & BLOCKED EXIT',
    hazardBadgeAr: 'احتجاز جسدي وانسداد المخرج'
  },
  3: {
    img: scenario3Img,
    title: 'Server Room 210 • Overheated UPS Battery Smoke',
    titleAr: 'غرفة الخوادم 210 • دخان بطاريات الطوارئ',
    location: 'Airport Admin Building • 2nd Floor IT Wing',
    locationAr: 'مبنى إدارة المطار • الطابق الثاني تقنية المعلومات',
    hazardBadge: 'TOXIC ACID VAPOR & GAS SUPPRESSION ACTIVE',
    hazardBadgeAr: 'أبخرة حمضية سامة ونظام إطفاء غاز'
  },
  4: {
    img: scenario4Img,
    title: 'Executive Boardroom 501 • Sudden Medical Collapse',
    titleAr: 'قاعة الاجتماعات 501 • إغماء وسقوط مفاجئ',
    location: 'Administration HQ • 5th Floor Executive Suite',
    locationAr: 'المقر الإداري • الطابق الخامس الجناح التنفيذي',
    hazardBadge: 'CARDIAC ARREST • CPR & AED REQUIRED',
    hazardBadgeAr: 'توقف قلب مفاجئ • حاجة للإنعاش وجهاز الصدمات'
  },
  5: {
    img: scenario5Img,
    title: 'Finance Office 220 • Ceiling Water Pipe Burst',
    titleAr: 'مكتب المالية 220 • انفجار أنبوب مياه بالسقف',
    location: 'Airport Admin Building • 2nd Floor Payroll Wing',
    locationAr: 'مبنى إدارة المطار • الطابق الثاني قسم الرواتب',
    hazardBadge: 'FLOODING & SUBMERGED POWER STRIPS',
    hazardBadgeAr: 'غرق مائي وتوصيلات كهربائية مغمورة'
  }
};

export const ScenarioIllustration: React.FC<ScenarioIllustrationProps> = ({
  scenarioId,
  className = '',
  isArabic = false
}) => {
  const data = scenarioPhotos[scenarioId] || scenarioPhotos[1];

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950 shadow-lg ${className}`}>
      {/* Real Ultra-Realistic Photo */}
      <img
        src={data.img}
        alt={isArabic ? data.titleAr : data.title}
        referrerPolicy="no-referrer"
        className="w-full h-56 sm:h-72 object-cover object-center transition-transform duration-500 hover:scale-102"
        loading="eager"
      />

      {/* Cinematic Vignette & Readability Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

      {/* Top Camera HUD Bar */}
      <div className="absolute top-2.5 inset-x-3 flex items-center justify-between text-[11px] font-mono pointer-events-none">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-slate-200 border border-white/10 shadow-xs">
          <Camera className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span className="font-bold tracking-wide">
            {isArabic ? `صورة توثيق الحادث #${scenarioId}` : `INCIDENT SCENE PHOTO #${scenarioId}`}
          </span>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-950/85 backdrop-blur-md text-red-200 border border-red-500/40 font-bold tracking-tight shadow-xs">
          <AlertTriangle className="w-3 h-3 text-red-400" />
          <span>{isArabic ? data.hazardBadgeAr : data.hazardBadge}</span>
        </div>
      </div>

      {/* Bottom Scene Identification Bar */}
      <div className="absolute bottom-2.5 inset-x-3 pointer-events-none space-y-0.5">
        <p className="text-xs text-slate-300 font-medium drop-shadow-md">
          {isArabic ? data.locationAr : data.location}
        </p>
        <h3 className="text-sm sm:text-base font-black text-white drop-shadow-md tracking-tight">
          {isArabic ? data.titleAr : data.title}
        </h3>
      </div>
    </div>
  );
};
