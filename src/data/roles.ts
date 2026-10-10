/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ERTRoleId = 
  | 'EVACUATION_WARDEN' 
  | 'FIRST_AID' 
  | 'COMMUNICATIONS' 
  | 'HAZARD_SAFETY' 
  | 'SEARCH_SWEEP';

export interface ERTRoleDefinition {
  id: ERTRoleId;
  name: string;
  nameAr: string;
  shortLabel: string;
  shortLabelAr: string;
  description: string;
  descriptionAr: string;
}

export const ertRoles: ERTRoleDefinition[] = [
  {
    id: 'EVACUATION_WARDEN',
    name: 'Floor Evacuation Warden',
    nameAr: 'مسؤول إخلاء الطابق',
    shortLabel: 'Evacuation',
    shortLabelAr: 'إخلاء',
    description: 'Guides staff safely along designated evacuation routes to emergency stairwells and outdoor assembly areas.',
    descriptionAr: 'توجيه الموظفين بأمان عبر مسارات الطوارئ إلى مخارج النجاة ونقاط التجمع الخارجية.'
  },
  {
    id: 'FIRST_AID',
    name: 'First Aid & Medical Triage',
    nameAr: 'الإسعافات الأولية والفرز الطبي',
    shortLabel: 'First Aid',
    shortLabelAr: 'إسعاف',
    description: 'Provides immediate trauma care, CPR/AED deployment, burn cooling, and casualty stabilization.',
    descriptionAr: 'تقديم الرعاية الطارئة للإصابات، واستخدام جهاز الصدمات، وتثبيت حالة المصابين.'
  },
  {
    id: 'COMMUNICATIONS',
    name: 'Incident Communications Officer',
    nameAr: 'ضابط الاتصال وبلاغات الطوارئ',
    shortLabel: 'Comms (LNNH/ZSH)',
    shortLabelAr: 'اتصال وراديو',
    description: 'Transmits structured L-N-N-H initial discovery reports and periodic Z-S-H operational updates to KSIA EOC.',
    descriptionAr: 'إرسال بلاغ L-N-N-H الأولي وتحديثات Z-S-H الدورية لمركز عمليات المطار.'
  },
  {
    id: 'HAZARD_SAFETY',
    name: 'Hazard & Utility Safety Controller',
    nameAr: 'مسؤول عزل المخاطر والسلامة',
    shortLabel: 'Hazard Safety',
    shortLabelAr: 'سلامة ومخاطر',
    description: 'Isolates live electricity, water valves, deploys fire extinguishers, and establishes hazard cordons.',
    descriptionAr: 'عزل قواطع الكهرباء وصمامات المياه، واستخدام الطفايات وتطويق بؤر الخطر.'
  },
  {
    id: 'SEARCH_SWEEP',
    name: 'Search & Accountability Marshal',
    nameAr: 'مسؤول المسح وحصر الموظفين',
    shortLabel: 'Search & Sweep',
    shortLabelAr: 'مسح وحصر',
    description: 'Sweeps restrooms, conference rooms, and quiet zones to guarantee 100% staff headcount clearance.',
    descriptionAr: 'مسح دورات المياه وقاعات الاجتماعات لضمان إخلاء كافة الموظفين والتأكد من خلو المنطقة.'
  }
];

export const getRoleById = (id?: string): ERTRoleDefinition => {
  return ertRoles.find(r => r.id === id) || ertRoles[0];
};
