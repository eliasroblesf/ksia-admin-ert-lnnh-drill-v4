/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ScenarioIllustrationProps {
  scenarioId: number;
  className?: string;
  isArabic?: boolean;
}

export const ScenarioIllustration: React.FC<ScenarioIllustrationProps> = ({
  scenarioId,
  className = '',
  isArabic = false
}) => {
  // Return high-quality, lightweight SVG graphic scene matching the specific scenario
  switch (scenarioId) {
    case 1:
      // Coffee machine fire in HR Kitchenette 305
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 border border-amber-500/20 shadow-md ${className}`}>
          <svg viewBox="0 0 600 320" className="w-full h-auto select-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="wall1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="counter1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
              <linearGradient id="fireGrad1" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
              <radialGradient id="smokeGlow1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#1e293b" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Room background */}
            <rect width="600" height="320" fill="url(#wall1)" />
            
            {/* Wall tiles pattern */}
            <line x1="50" y1="80" x2="550" y2="80" stroke="#334155" strokeWidth="1" strokeDasharray="6 6" opacity="0.4" />
            <line x1="50" y1="140" x2="550" y2="140" stroke="#334155" strokeWidth="1" strokeDasharray="6 6" opacity="0.4" />

            {/* Overhead wooden cabinets */}
            <rect x="80" y="30" width="440" height="70" rx="4" fill="#78350f" opacity="0.9" />
            <rect x="85" y="35" width="140" height="60" rx="2" fill="#92400e" stroke="#b45309" strokeWidth="1.5" />
            <rect x="230" y="35" width="140" height="60" rx="2" fill="#92400e" stroke="#b45309" strokeWidth="1.5" />
            <rect x="375" y="35" width="140" height="60" rx="2" fill="#92400e" stroke="#b45309" strokeWidth="1.5" />
            {/* Cabinet handles */}
            <line x1="210" y1="65" x2="210" y2="80" stroke="#fcd34d" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="245" y1="65" x2="245" y2="80" stroke="#fcd34d" strokeWidth="2.5" strokeLinecap="round" />

            {/* Kitchen Countertop */}
            <rect x="40" y="210" width="520" height="90" rx="3" fill="url(#counter1)" stroke="#64748b" strokeWidth="1.5" />
            <rect x="40" y="210" width="520" height="12" fill="#94a3b8" />

            {/* Wall electrical outlet with sparks */}
            <rect x="410" y="160" width="30" height="36" rx="4" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
            <circle cx="420" cy="174" r="2" fill="#1e293b" />
            <circle cx="430" cy="174" r="2" fill="#1e293b" />
            {/* Spark lines */}
            <path d="M405 155 L395 145 M415 145 L415 135 M435 150 L445 140" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />

            {/* Coffee machine body */}
            <rect x="260" y="145" width="80" height="70" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
            <rect x="270" y="155" width="60" height="30" rx="3" fill="#0f172a" />
            <circle cx="280" cy="170" r="3" fill="#ef4444" />
            <rect x="290" y="167" width="30" height="6" rx="2" fill="#38bdf8" />
            {/* Coffee pot with flames */}
            <rect x="275" y="185" width="50" height="26" rx="4" fill="#334155" opacity="0.8" />

            {/* Flammable paper cups & napkins */}
            <rect x="360" y="188" width="22" height="24" rx="2" fill="#fde68a" />
            <rect x="375" y="194" width="20" height="18" rx="2" fill="#fed7aa" />

            {/* Active Fire Flames */}
            <path d="M285 190 Q270 140 290 120 Q295 145 305 130 Q320 150 310 190 Z" fill="url(#fireGrad1)" opacity="0.95" />
            <path d="M295 185 Q285 150 300 135 Q308 155 315 145 Q325 160 320 185 Z" fill="#fef08a" opacity="0.9" />
            <path d="M360 200 Q365 170 375 160 Q385 180 378 200 Z" fill="url(#fireGrad1)" opacity="0.85" />

            {/* Rolling black smoke plumes toward hallway */}
            <ellipse cx="295" cy="100" rx="45" ry="25" fill="url(#smokeGlow1)" />
            <ellipse cx="260" cy="70" rx="55" ry="30" fill="url(#smokeGlow1)" />
            <ellipse cx="210" cy="45" rx="75" ry="35" fill="url(#smokeGlow1)" />
            <ellipse cx="140" cy="30" rx="85" ry="40" fill="url(#smokeGlow1)" />

            {/* Warning Tag */}
            <rect x="50" y="240" width="160" height="34" rx="8" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" />
            <text x="130" y="262" fill="#fee2e2" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
              {isArabic ? 'حريق مطبخ HR 305' : 'HR Kitchen Fire 305'}
            </text>
          </svg>
        </div>
      );

    case 2:
      // Heavy Filing Cabinet Tip-Over in Basement Archive B-12
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-zinc-900 to-slate-900 border border-slate-700 shadow-md ${className}`}>
          <svg viewBox="0 0 600 320" className="w-full h-auto select-none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="320" fill="#090d16" />
            {/* Concrete wall lines */}
            <line x1="0" y1="230" x2="600" y2="230" stroke="#334155" strokeWidth="2" />
            <rect x="0" y="230" width="600" height="90" fill="#1e293b" />
            
            {/* Archive tall shelving in background */}
            <rect x="50" y="40" width="100" height="190" fill="#1e293b" stroke="#475569" strokeWidth="2" />
            <line x1="50" y1="90" x2="150" y2="90" stroke="#475569" strokeWidth="2" />
            <line x1="50" y1="140" x2="150" y2="140" stroke="#475569" strokeWidth="2" />
            <line x1="50" y1="190" x2="150" y2="190" stroke="#475569" strokeWidth="2" />
            
            {/* Archive boxes on shelf */}
            <rect x="60" y="55" width="24" height="30" fill="#d97706" rx="2" />
            <rect x="90" y="55" width="24" height="30" fill="#b45309" rx="2" />
            <rect x="60" y="105" width="35" height="30" fill="#d97706" rx="2" />
            <rect x="102" y="105" width="35" height="30" fill="#92400e" rx="2" />

            {/* Single exit door in background */}
            <rect x="440" y="70" width="90" height="160" fill="#0f172a" stroke="#475569" strokeWidth="2" />
            <rect x="450" y="80" width="70" height="145" fill="#1e293b" />
            <circle cx="510" cy="155" r="4" fill="#cbd5e1" />
            {/* Door exit sign */}
            <rect x="465" y="45" width="40" height="18" fill="#15803d" rx="2" />
            <text x="485" y="58" fill="#ffffff" fontSize="9" fontWeight="800" textAnchor="middle">EXIT</text>

            {/* Fallen filing cabinet (tipped at angle) */}
            <g transform="rotate(38 310 200)">
              <rect x="230" y="130" width="130" height="75" rx="3" fill="#64748b" stroke="#94a3b8" strokeWidth="2.5" />
              <line x1="270" y1="130" x2="270" y2="205" stroke="#475569" strokeWidth="2" />
              <line x1="315" y1="130" x2="315" y2="205" stroke="#475569" strokeWidth="2" />
              <rect x="245" y="160" width="14" height="6" rx="1" fill="#cbd5e1" />
              <rect x="288" y="160" width="14" height="6" rx="1" fill="#cbd5e1" />
              <rect x="332" y="160" width="14" height="6" rx="1" fill="#cbd5e1" />
            </g>

            {/* Trapped person silhouette */}
            <ellipse cx="270" cy="245" rx="14" ry="12" fill="#f87171" opacity="0.8" />
            <rect x="280" y="240" width="85" height="14" rx="4" fill="#3b82f6" opacity="0.7" />
            
            {/* Scattered loose files & boxes blocking doorway */}
            <rect x="420" y="235" width="30" height="20" rx="2" fill="#d97706" />
            <rect x="460" y="245" width="28" height="18" rx="2" fill="#b45309" />
            <polygon points="380,245 405,240 400,255 375,252" fill="#f8fafc" />
            <polygon points="350,250 370,248 368,260 348,258" fill="#f8fafc" />
            <polygon points="410,255 435,250 430,265 405,262" fill="#e2e8f0" />

            {/* Impact indicator */}
            <circle cx="340" cy="235" r="22" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            <text x="340" y="239" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">⚠️</text>

            <rect x="50" y="255" width="170" height="34" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
            <text x="135" y="277" fill="#fef3c7" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
              {isArabic ? 'احتجاز وسقوط خزانة B-12' : 'Archive Cabinet Tip-Over'}
            </text>
          </svg>
        </div>
      );

    case 3:
      // Admin IT Server Room 210 UPS Battery Smoke
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 border border-cyan-500/30 shadow-md ${className}`}>
          <svg viewBox="0 0 600 320" className="w-full h-auto select-none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="320" fill="#040b14" />
            
            {/* Raised server floor grid */}
            <line x1="0" y1="240" x2="600" y2="240" stroke="#0e7490" strokeWidth="1.5" />
            <rect x="0" y="240" width="600" height="80" fill="#082f49" opacity="0.6" />
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={i} x1={i * 80} y1="240" x2={i * 80 + 20} y2="320" stroke="#155e75" strokeWidth="1" opacity="0.4" />
            ))}

            {/* Server Rack 1 (Left) */}
            <rect x="70" y="50" width="100" height="190" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            {Array.from({ length: 6 }).map((_, i) => (
              <g key={i}>
                <rect x="80" y={65 + i * 28} width="80" height="20" rx="2" fill="#1e293b" />
                <circle cx="90" cy={75 + i * 28} r="2.5" fill="#22c55e" />
                <circle cx="100" cy={75 + i * 28} r="2.5" fill="#38bdf8" />
                <line x1="120" y1={75 + i * 28} x2="150" y2={75 + i * 28} stroke="#475569" strokeWidth="2" strokeDasharray="3 3" />
              </g>
            ))}

            {/* Server Rack 2 (Middle - Affected UPS unit) */}
            <rect x="250" y="50" width="110" height="190" rx="4" fill="#0f172a" stroke="#ef4444" strokeWidth="2" />
            {Array.from({ length: 4 }).map((_, i) => (
              <rect key={i} x="260" y={65 + i * 28} width="90" height="20" rx="2" fill="#1e293b" />
            ))}
            
            {/* Swollen UPS unit with warning glow */}
            <rect x="258" y="180" width="94" height="42" rx="4" fill="#7f1d1d" stroke="#f87171" strokeWidth="2" />
            <text x="305" y="205" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">UPS BATTERY</text>
            <circle cx="275" cy="202" r="3" fill="#ef4444" className="animate-pulse" />
            <circle cx="335" cy="202" r="3" fill="#fbbf24" />

            {/* Server Rack 3 (Right) */}
            <rect x="440" y="50" width="100" height="190" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            {Array.from({ length: 6 }).map((_, i) => (
              <g key={i}>
                <rect x="450" y={65 + i * 28} width="80" height="20" rx="2" fill="#1e293b" />
                <circle cx="460" cy={75 + i * 28} r="2.5" fill="#22c55e" />
                <circle cx="470" cy={75 + i * 28} r="2.5" fill="#22c55e" />
              </g>
            ))}

            {/* Gas fire suppression warning strobe */}
            <circle cx="305" cy="30" r="14" fill="#eab308" opacity="0.9" />
            <circle cx="305" cy="30" r="22" stroke="#fde047" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            <text x="305" y="34" fill="#422006" fontSize="9" fontWeight="900" textAnchor="middle">GAS</text>

            {/* Billowing thick white acid smoke clouds */}
            <ellipse cx="305" cy="155" rx="40" ry="24" fill="#f8fafc" opacity="0.75" />
            <ellipse cx="270" cy="120" rx="55" ry="32" fill="#f1f5f9" opacity="0.8" />
            <ellipse cx="340" cy="95" rx="60" ry="35" fill="#e2e8f0" opacity="0.7" />
            <ellipse cx="290" cy="65" rx="75" ry="40" fill="#cbd5e1" opacity="0.65" />
            <ellipse cx="220" cy="40" rx="85" ry="42" fill="#94a3b8" opacity="0.5" />

            <rect x="50" y="255" width="190" height="34" rx="8" fill="#082f49" stroke="#38bdf8" strokeWidth="1" />
            <text x="145" y="277" fill="#e0f2fe" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
              {isArabic ? 'دخان بطاريات الخوادم 210' : 'IT Server Battery Smoke 210'}
            </text>
          </svg>
        </div>
      );

    case 4:
      // Executive Boardroom 501 Medical Collapse
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/20 shadow-md ${className}`}>
          <svg viewBox="0 0 600 320" className="w-full h-auto select-none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="320" fill="#0f172a" />
            
            {/* Elegant wood paneling */}
            <rect x="0" y="0" width="600" height="200" fill="#1e1b4b" opacity="0.4" />
            <line x1="0" y1="200" x2="600" y2="200" stroke="#3730a3" strokeWidth="2" />
            <rect x="0" y="200" width="600" height="120" fill="#1e293b" />

            {/* Heavy Boardroom Conference Table (Isometric ellipse) */}
            <ellipse cx="300" cy="190" rx="180" ry="50" fill="#78350f" stroke="#b45309" strokeWidth="3" />
            <ellipse cx="300" cy="186" rx="170" ry="44" fill="#92400e" />

            {/* Conference Chairs surrounding table */}
            <circle cx="160" cy="160" r="14" fill="#334155" stroke="#64748b" strokeWidth="2" />
            <circle cx="230" cy="140" r="14" fill="#334155" stroke="#64748b" strokeWidth="2" />
            <circle cx="370" cy="140" r="14" fill="#334155" stroke="#64748b" strokeWidth="2" />
            <circle cx="440" cy="160" r="14" fill="#334155" stroke="#64748b" strokeWidth="2" />
            
            {/* Fallen chair on foreground left */}
            <g transform="rotate(-35 220 230)">
              <rect x="210" y="210" width="28" height="32" rx="4" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="210" y1="242" x2="205" y2="260" stroke="#64748b" strokeWidth="2" />
              <line x1="238" y1="242" x2="242" y2="260" stroke="#64748b" strokeWidth="2" />
            </g>

            {/* Collapsed person silhouette on floor */}
            <ellipse cx="320" cy="255" rx="16" ry="12" fill="#ef4444" opacity="0.85" />
            <rect x="280" y="250" width="75" height="18" rx="6" fill="#6366f1" opacity="0.7" />
            {/* Urgent CPR / Heart indicator */}
            <circle cx="320" cy="255" r="24" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" fill="none" />
            <path d="M312 254 Q320 244 328 254 Q320 264 312 254 Z" fill="#f43f5e" />

            {/* AED Defibrillator Indicator */}
            <rect x="470" y="40" width="70" height="50" rx="6" fill="#15803d" stroke="#4ade80" strokeWidth="1.5" />
            <text x="505" y="65" fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle">AED ⚡</text>
            <text x="505" y="80" fill="#bbf7d0" fontSize="8" fontWeight="bold" textAnchor="middle">EN ROUTE</text>

            <rect x="50" y="255" width="180" height="34" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" />
            <text x="140" y="277" fill="#e0e7ff" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
              {isArabic ? 'إغماء قاعة الاجتماعات 501' : 'Boardroom Collapse 501'}
            </text>
          </svg>
        </div>
      );

    case 5:
      // Finance Office 220 Water Pipe Burst & Flooding
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 border border-sky-500/20 shadow-md ${className}`}>
          <svg viewBox="0 0 600 320" className="w-full h-auto select-none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="320" fill="#082f49" />
            
            {/* Suspended Ceiling with broken/collapsed tiles */}
            <rect x="0" y="0" width="600" height="40" fill="#0f172a" />
            <line x1="0" y1="40" x2="600" y2="40" stroke="#334155" strokeWidth="2" />
            <rect x="60" y="40" width="80" height="10" fill="#cbd5e1" />
            <rect x="150" y="40" width="80" height="10" fill="#cbd5e1" />
            <rect x="360" y="40" width="80" height="10" fill="#cbd5e1" />
            <rect x="450" y="40" width="80" height="10" fill="#cbd5e1" />
            
            {/* Gap in ceiling where tile fell */}
            <g transform="rotate(22 280 65)">
              <rect x="250" y="45" width="70" height="10" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
            </g>

            {/* Broken Pipe with spraying water torrent */}
            <rect x="280" y="10" width="40" height="14" fill="#64748b" />
            {/* Water stream pouring down */}
            <path d="M290 24 Q280 120 270 240 Q315 240 310 24 Q300 24 290 24 Z" fill="#38bdf8" opacity="0.65" />
            <path d="M295 24 Q290 120 285 240 Q305 240 302 24 Z" fill="#bae6fd" opacity="0.8" />
            
            {/* Office Desks & Computers */}
            <rect x="90" y="150" width="120" height="70" rx="3" fill="#334155" stroke="#475569" strokeWidth="2" />
            <rect x="120" y="125" width="40" height="25" rx="2" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
            <rect x="135" y="150" width="10" height="6" fill="#64748b" />

            <rect x="390" y="150" width="120" height="70" rx="3" fill="#334155" stroke="#475569" strokeWidth="2" />
            <rect x="420" y="125" width="40" height="25" rx="2" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />

            {/* Flooded floor water layer (4cm deep) with ripple waves */}
            <rect x="0" y="230" width="600" height="90" fill="#0369a1" opacity="0.75" />
            <ellipse cx="290" cy="240" rx="80" ry="12" fill="#7dd3fc" opacity="0.5" />
            <ellipse cx="290" cy="255" rx="140" ry="18" stroke="#38bdf8" strokeWidth="1.5" fill="none" opacity="0.7" />
            <ellipse cx="290" cy="275" rx="220" ry="24" stroke="#0284c7" strokeWidth="1.5" fill="none" opacity="0.6" />

            {/* Submerged electrical power strip with hazard buzz */}
            <rect x="220" y="260" width="50" height="16" rx="3" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="230" cy="268" r="2" fill="#78350f" />
            <circle cx="245" cy="268" r="2" fill="#78350f" />
            <circle cx="260" cy="268" r="2" fill="#78350f" />
            {/* Electric zap sparks */}
            <path d="M210 255 L215 250 L220 258 M275 255 L280 248 L285 258" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />

            <rect x="50" y="260" width="180" height="34" rx="8" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1" />
            <text x="140" y="282" fill="#e0f2fe" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
              {isArabic ? 'غرق مكتب المالية 220' : 'Finance Office Flooding 220'}
            </text>
          </svg>
        </div>
      );

    default:
      // Generic thematic administrative office incident illustration
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 border border-slate-700 shadow-md ${className}`}>
          <svg viewBox="0 0 600 320" className="w-full h-auto select-none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="320" fill="#0f172a" />
            
            {/* Airport Admin Building Window Background */}
            <line x1="0" y1="210" x2="600" y2="210" stroke="#334155" strokeWidth="2" />
            <rect x="0" y="210" width="600" height="110" fill="#1e293b" />

            {/* Office glass partition / window frame */}
            <rect x="60" y="40" width="480" height="150" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="2" opacity="0.6" />
            <line x1="220" y1="40" x2="220" y2="190" stroke="#475569" strokeWidth="2" />
            <line x1="380" y1="40" x2="380" y2="190" stroke="#475569" strokeWidth="2" />
            <line x1="60" y1="115" x2="540" y2="115" stroke="#475569" strokeWidth="2" />

            {/* Airport tower view in window */}
            <rect x="280" y="60" width="20" height="50" fill="#334155" />
            <polygon points="275,60 305,60 290,45" fill="#475569" />
            <circle cx="290" cy="45" r="3" fill="#ef4444" />

            {/* Emergency response beacon */}
            <circle cx="300" cy="190" r="32" fill="#0f766e" opacity="0.2" />
            <circle cx="300" cy="190" r="18" fill="#0d9488" stroke="#2dd4bf" strokeWidth="2" />
            <path d="M295 180 L305 180 L308 195 L292 195 Z" fill="#ffffff" />
            <circle cx="300" cy="200" r="3" fill="#ffffff" />

            {/* KSIA Admin ERT Badge */}
            <rect x="210" y="240" width="180" height="36" rx="10" fill="#0f172a" stroke="#14b8a6" strokeWidth="1.5" />
            <text x="300" y="263" fill="#2dd4bf" fontSize="13" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
              {isArabic ? `حالة طوارئ إدارية #${scenarioId}` : `Admin ERT Scenario #${scenarioId}`}
            </text>
          </svg>
        </div>
      );
  }
};
