/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ERTRoleId } from './roles';

export interface DrillOption {
  id: string;
  text: string;
  textAr: string;
  isCorrect: boolean;
}

export interface Scenario23 {
  id: number;
  title: string;
  titleAr: string;
  department: string;
  departmentAr: string;
  floor: string;
  floorAr: string;
  primaryRole: ERTRoleId;
  secondaryRole: ERTRoleId;
  tertiaryRole: ERTRoleId;
  scenarioText: string;
  scenarioTextAr: string;
  extractionKey: {
    l: string;
    l_ar: string;
    n_nature: string;
    n_nature_ar: string;
    n_numbers: string;
    n_numbers_ar: string;
    h: string;
    h_ar: string;
  };
  zshExtractionKey: {
    z_zone: string;
    z_zone_ar: string;
    s_status: string;
    s_status_ar: string;
    h_hazard: string;
    h_hazard_ar: string;
  };
  options: {
    l: DrillOption[];
    n_nature: DrillOption[];
    n_numbers: DrillOption[];
    h_hazards: DrillOption[];
    z_zone: DrillOption[];
    s_status: DrillOption[];
    h_residual: DrillOption[];
  };
}

export const scenarios23: Scenario23[] = [
  {
    id: 1,
    title: "Kitchenette Coffee Machine Fire",
    titleAr: "حريق ماكينة القهوة في مطبخ الموظفين",
    department: "Human Resources (HR)",
    departmentAr: "الموارد البشرية",
    floor: "3rd Floor • Room 305",
    floorAr: "الطابق الثالث • غرفة 305",
    primaryRole: "HAZARD_SAFETY",
    secondaryRole: "FIRST_AID",
    tertiaryRole: "EVACUATION_WARDEN",
    scenarioText: "Airport Admin Building, 3rd Floor, HR Kitchenette Room 305: An electric coffee maker caught fire on the counter, igniting paper cups. Black smoke is drifting into the hallway. An HR clerk burned his right hand trying to unplug the cable. Ten employees evacuated safely. The live wall socket is still powered, and wooden wall cabinets are above the flames.",
    scenarioTextAr: "مبنى إدارة المطار، الطابق الثالث، مطبخ الموارد البشرية غرفة 305: اشتعلت ماكينة قهوة كهربائية فوق المنضدة وامتد اللهب لأكواب ورقية، وتصاعد دخان أسود للممر. أصيب موظف بحروق في يده اليمنى أثناء محاولة فصل السلك. تم إخلاء 10 موظفين بأمان. القابس الكهربائي لا يزال متصلاً بالتيار والخزائن الخشبية تعلو اللهب.",
    extractionKey: {
      l: "Airport Admin Building, 3rd Floor, HR Kitchenette Room 305.",
      l_ar: "مبنى إدارة المطار، الطابق الثالث، مطبخ الموارد البشرية غرفة 305.",
      n_nature: "Small electrical kitchen appliance fire with paper smoke.",
      n_nature_ar: "حريق جهاز مطبخ كهربائي مع ورق متصاعد منه دخان.",
      n_numbers: "1 person conscious with burned hand; 10 evacuated safely.",
      n_numbers_ar: "شخص واحد واعٍ مصاب بحروق باليد؛ وإخلاء 10 بسلام.",
      h: "Live wall outlet, overhead wooden cabinets, hallway smoke.",
      h_ar: "مقبس كهرباء نشط، خزائن خشبية علوية، دخان بالممر."
    },
    zshExtractionKey: {
      z_zone: "Zone 3-HR (3rd Floor East Wing, Kitchenette 305)",
      z_zone_ar: "منطقة 3-الموارد البشرية (الجناح الشرقي، مطبخ 305)",
      s_status: "Primary sweep done; 10 at Stairwell B; burn first aid active.",
      s_status_ar: "اكتمل المسح الأولي؛ 10 عند الدرج B؛ إسعاف الحروق جارٍ.",
      h_hazard: "Ceiling smoke bank; active wall socket awaiting circuit isolation.",
      h_hazard_ar: "دخان متراكم بالسقف؛ مقبس كهرباء نشط بانتظار العزل."
    },
    options: {
      l: [
        { id: "1_l_1", text: "Airport Admin Building, 3rd Floor, HR Kitchenette Room 305", textAr: "مبنى إدارة المطار، الطابق الثالث، مطبخ الموارد البشرية غرفة 305", isCorrect: true },
        { id: "1_l_2", text: "Airport Admin Building, 2nd Floor, Main Breakroom Suite 210", textAr: "مبنى إدارة المطار، الطابق الثاني، استراحة الموظفين جناح 210", isCorrect: false },
        { id: "1_l_3", text: "Airport Admin Building, Ground Floor, Central Staff Cafeteria", textAr: "مبنى إدارة المطار، الطابق الأرضي، كافتيريا الموظفين المركزية", isCorrect: false },
        { id: "1_l_4", text: "Airport Admin Building, 4th Floor, Executive Pantry Room 402", textAr: "مبنى إدارة المطار، الطابق الرابع، بوفيه الإدارة العليا غرفة 402", isCorrect: false }
      ],
      n_nature: [
        { id: "1_nn_1", text: "Electrical appliance fire with paper smoke on counter", textAr: "حريق جهاز كهربائي بالمطبخ مع اشتعال ورق وتصاعد دخان", isCorrect: true },
        { id: "1_nn_2", text: "Overheated microwave explosion with ruptured glass window", textAr: "انفجار جهاز ميكروويف نتيجة حرارة زائدة وتحطم نافذته", isCorrect: false },
        { id: "1_nn_3", text: "Ceiling lighting ballast failure with falling molten plastic", textAr: "عطل في محول إضاءة السقف وتساقط بلاستيك ذائب", isCorrect: false },
        { id: "1_nn_4", text: "Chemical cleaner reaction producing irritating toxic vapor", textAr: "تفاعل منظفات كيميائية نتج عنه انبعاث غازات خانقة", isCorrect: false }
      ],
      n_numbers: [
        { id: "1_num_1", text: "1 person conscious with burned hand; 10 evacuated safely", textAr: "شخص واحد واعٍ مصاب بحرق في اليد، وإخلاء 10 موظفين بأمان", isCorrect: true },
        { id: "1_num_2", text: "2 persons unconscious from smoke; 8 trapped inside kitchen", textAr: "شخصان فاقدا الوعي بسبب الدخان، و8 موظفين محتجزين بالداخل", isCorrect: false },
        { id: "1_num_3", text: "Zero physical injuries; all 12 staff safely assembled outside", textAr: "صفر إصابات جسدية؛ وتجمع كافة الموظفين الـ 12 بالخارج", isCorrect: false },
        { id: "1_num_4", text: "1 person with broken ankle; 5 colleagues standing by", textAr: "شخص واحد مصاب بكسر في الكاحل، و5 زملاء بجواره", isCorrect: false }
      ],
      h_hazards: [
        { id: "1_haz_1", text: "Live wall outlet, wooden cabinets above fire, hallway smoke", textAr: "مقبس كهرباء نشط، خزائن خشبية تعلو اللهب، ودخان بالممر", isCorrect: true },
        { id: "1_haz_2", text: "Natural gas line leak, broken window glass, wet marble floor", textAr: "تسرب خط غاز طبيعي، زجاج نافذة مكسور، وأرضية زلقة", isCorrect: false },
        { id: "1_haz_3", text: "Suspended ceiling collapse hazard, blocked fire stairwell exit", textAr: "خطر انهيار السقف المستعار، وانسداد مخرج درج الطوارئ", isCorrect: false },
        { id: "1_haz_4", text: "Corrosive chemical storage drum, heavy file cabinet tipping", textAr: "برميل مواد كيميائية حارقة، وخطر سقوط خزانة ملفات", isCorrect: false }
      ],
      z_zone: [
        { id: "1_z_1", text: "Zone 3-HR (3rd Floor East Wing, Corridor & Kitchenette 305)", textAr: "منطقة 3-الموارد البشرية (الجناح الشرقي، ممر ومطبخ 305)", isCorrect: true },
        { id: "1_z_2", text: "Zone 2-Admin (2nd Floor West Wing, Training Cluster 205)", textAr: "منطقة 2-الإدارة (الجناح الغربي، قطاع التدريب قاعة 205)", isCorrect: false },
        { id: "1_z_3", text: "Zone 1-Lobby (Ground Floor Reception & Staff Badging Area)", textAr: "منطقة 1-الاستقبال (الطابق الأرضي، كاونتر البطاقات والمدخل)", isCorrect: false },
        { id: "1_z_4", text: "Zone B1-Storage (Basement Level Facilities & Maintenance Room)", textAr: "منطقة B1-المستودعات (قبو المبنى، مستودع المرافق والصيانة)", isCorrect: false }
      ],
      s_status: [
        { id: "1_s_1", text: "Primary sweep done; 10 staff at Stair B; burn first aid active", textAr: "اكتمل المسح الأولي؛ 10 عند الدرج B؛ إسعاف الحروق جارٍ", isCorrect: true },
        { id: "1_s_2", text: "Waiting for keys; kitchen door locked; staff still in offices", textAr: "بانتظار المفاتيح؛ باب المطبخ مغلق؛ والموظفون بمكاتبهم", isCorrect: false },
        { id: "1_s_3", text: "Fire hose connected; entire building evacuated to car park", textAr: "توصيل خرطوم الحريق؛ وإخلاء المبنى بالكامل إلى المواقف", isCorrect: false },
        { id: "1_s_4", text: "All personnel re-entered building; normal work resumed", textAr: "عودة جميع الموظفين للمبنى؛ واستئناف العمل المكتبي المعتاد", isCorrect: false }
      ],
      h_residual: [
        { id: "1_hz_1", text: "Ceiling smoke bank; active wall socket awaiting circuit isolation", textAr: "دخان متراكم بالسقف؛ مقبس كهرباء نشط بانتظار عزل القاطع", isCorrect: true },
        { id: "1_hz_2", text: "High voltage generator backfeed; structural beam failure", textAr: "تيار عكسي من المولد؛ وخطر انهيار جسر خرساني رئيسي", isCorrect: false },
        { id: "1_hz_3", text: "Flooded carpet from sprinkler head; toxic asbestos fibers", textAr: "غرق السجاد من رشاش مياه؛ وانبعاث ألياف مادة الأسبستوس", isCorrect: false },
        { id: "1_hz_4", text: "Overturned propane cylinder; shattered corridor partition glass", textAr: "اسطوانة غاز منقلبة؛ وزجاج قواطع المكاتب متناثر بالممر", isCorrect: false }
      ]
    }
  },
  {
    id: 2,
    title: "Heavy Filing Cabinet Tip-Over",
    titleAr: "سقوط خزانة ملفات ثقيلة على موظف",
    department: "Records & Document Archive",
    departmentAr: "الأرشيف وحفظ الوثائق",
    floor: "Basement Level B1 • Room B-12",
    floorAr: "قبو المبنى B1 • غرفة B-12",
    primaryRole: "FIRST_AID",
    secondaryRole: "HAZARD_SAFETY",
    tertiaryRole: "SEARCH_SWEEP",
    scenarioText: "Airport Admin Building, Basement B1, Archive Room B-12: A 4-drawer metal filing cabinet fell forward onto an archive clerk's lower legs, pinning him to the floor. The clerk is conscious and screaming in severe pain. Falling paper files and document boxes completely blocked the single entrance doorway.",
    scenarioTextAr: "مبنى إدارة المطار، القبو B1، غرفة الأرشيف B-12: سقطت خزانة ملفات معدنية ثقيلة فوق ساقي موظف واحتجزته على الأرض. الموظف واعٍ ويصرخ من ألم شديد في ساقيه. أدت الملفات والصناديق الورقية المتناثرة إلى سد مدخل الغرفة الوحيد.",
    extractionKey: {
      l: "Airport Admin Building, Basement B1, Archive Room B-12.",
      l_ar: "مبنى إدارة المطار، القبو B1، غرفة أرشيف الوثائق B-12.",
      n_nature: "Fallen heavy furniture with physical entrapment and leg injury.",
      n_nature_ar: "سقوط أثاث ثقيل مع احتجاز جسدي واشتباه كسر بالساق.",
      n_numbers: "1 clerk conscious and trapped under heavy metal cabinet.",
      n_numbers_ar: "موظف واحد واعٍ ومحتجز تحت الخزانة المعدنية الثقيلة.",
      h: "Heavy weight on victim legs, single doorway blocked by boxes.",
      h_ar: "ثقل كبير على ساقي المصاب، وانسداد المخرج الوحيد بالصناديق."
    },
    zshExtractionKey: {
      z_zone: "Zone B1-Records (Basement Level Archive Sector Room B-12)",
      z_zone_ar: "منطقة B1-الأرشيف (قبو المبنى، قطاع الأرشيف غرفة B-12)",
      s_status: "Search team lifting cabinet; doorway cleared; leg splint ready.",
      s_status_ar: "فريق التدخل يرفع الخزانة؛ فتح المدخل؛ وتجهيز جبيرة الساق.",
      h_hazard: "Unstable adjacent metal shelving; restricted narrow doorway.",
      h_hazard_ar: "خزائن مجاورة غير مستقرة؛ وممر خروج ضيق ومزدحم."
    },
    options: {
      l: [
        { id: "2_l_1", text: "Airport Admin Building, Basement B1, Archive Room B-12", textAr: "مبنى إدارة المطار، القبو B1، غرفة أرشيف الوثائق B-12", isCorrect: true },
        { id: "2_l_2", text: "Airport Admin Building, Ground Floor, Central Mailroom G-10", textAr: "مبنى إدارة المطار، الطابق الأرضي، مكتب البريد المركزي G-10", isCorrect: false },
        { id: "2_l_3", text: "Airport Admin Building, 1st Floor, Legal Department Records Room 104", textAr: "مبنى إدارة المطار، الطابق الأول، غرفة وثائق الشؤون القانونية 104", isCorrect: false },
        { id: "2_l_4", text: "Airport Admin Building, 3rd Floor, Human Resources Storage 308", textAr: "مبنى إدارة المطار، الطابق الثالث، مستودع الموارد البشرية 308", isCorrect: false }
      ],
      n_nature: [
        { id: "2_nn_1", text: "Fallen heavy metal cabinet with entrapment and leg trauma", textAr: "سقوط خزانة ملفات معدنية ثقيلة واحتجاز موظف وإصابة ساقه", isCorrect: true },
        { id: "2_nn_2", text: "Forklift collision with storage rack causing cargo spill", textAr: "اصطدام رافعة شوكية برفوف التخزين وانهيار البضائع", isCorrect: false },
        { id: "2_nn_3", text: "Basement concrete ceiling spalling with falling masonry", textAr: "تشقق خرسانة سقف القبو وتساقط كتل إسمنتية ثقيلة", isCorrect: false },
        { id: "2_nn_4", text: "Chemical solvent spill from janitorial chemical shelf", textAr: "انسكاب سوائل كيميائية منظفة من رف أدوات النظافة", isCorrect: false }
      ],
      n_numbers: [
        { id: "2_num_1", text: "1 clerk conscious, trapped under cabinet in severe pain", textAr: "موظف واحد واعٍ، محتجز تحت الخزانة ويتألم بشدة", isCorrect: true },
        { id: "2_num_2", text: "3 employees pinned beneath collapsed steel racking", textAr: "3 موظفين محتجزين تحت رفوف حديدية منهارة بالكامل", isCorrect: false },
        { id: "2_num_3", text: "1 clerk unconscious with major head and neck injuries", textAr: "موظف واحد فاقد الوعي مع إصابات بليغة بالرأس والعنق", isCorrect: false },
        { id: "2_num_4", text: "Zero casualties; victim walked out uninjured to corridor", textAr: "صفر إصابات؛ الموظف خرج سالماً دون أذى إلى الممر", isCorrect: false }
      ],
      h_hazards: [
        { id: "2_haz_1", text: "Heavy cabinet pinning legs, doorway blocked by boxes", textAr: "ثقل الخزانة على الساقين، وانسداد مدخل الغرفة بالصناديق", isCorrect: true },
        { id: "2_haz_2", text: "Exposed live high voltage wire, dense toxic smoke cloud", textAr: "سلك كهرباء عالي الجهد مكشوف، وسحابة دخان سام كثيفة", isCorrect: false },
        { id: "2_haz_3", text: "Burst sewer pipe leaking contaminated water on floor", textAr: "انفجار أنبوب مياه صرف صحي وتلوث أرضية المكان", isCorrect: false },
        { id: "2_haz_4", text: "Open elevator shaft drop, flammable gasoline containers", textAr: "فتحة بئر مصعد مفتوحة، وحاويات بنزين سريعة الاشتعال", isCorrect: false }
      ],
      z_zone: [
        { id: "2_z_1", text: "Zone B1-Records (Basement Level Archive Sector Room B-12)", textAr: "منطقة B1-الأرشيف (قبو المبنى، قطاع الأرشيف غرفة B-12)", isCorrect: true },
        { id: "2_z_2", text: "Zone G-Loading (Ground Floor Logistics & Cargo Bay G-02)", textAr: "منطقة G-الخدمات (الطابق الأرضي، رصيف الشحن والتفريغ G-02)", isCorrect: false },
        { id: "2_z_3", text: "Zone 1-Admin (1st Floor North Wing, Purchasing Offices)", textAr: "منطقة 1-الإدارة (الطابق الأول الجناح الشمالي، قسم المشتريات)", isCorrect: false },
        { id: "2_z_4", text: "Zone 2-Audit (2nd Floor Central Corridor, Finance Sector)", textAr: "منطقة 2-المراجعة (الطابق الثاني الممر المركزي، قطاع المالية)", isCorrect: false }
      ],
      s_status: [
        { id: "2_s_1", text: "Lifting cabinet underway; doorway cleared; splinting leg", textAr: "جاري رفع الخزانة؛ فتح مسار الباب؛ وتثبيت كسر الساق", isCorrect: true },
        { id: "2_s_2", text: "No staff present; waiting for external fire service crane", textAr: "الموقع خالٍ؛ بانتظار وصول رافعة الدفاع المدني الخارجية", isCorrect: false },
        { id: "2_s_3", text: "Victim transported to hospital; archive room locked", textAr: "تم نقل المصاب للمستشفى؛ وإغلاق غرفة الأرشيف بالمفتاح", isCorrect: false },
        { id: "2_s_4", text: "Evacuation cancelled; office staff returning to archive", textAr: "إلغاء الإخلاء؛ وعودة الموظفين لمكاتب الأرشيف للعمل", isCorrect: false }
      ],
      h_residual: [
        { id: "2_hz_1", text: "Unstable adjacent metal shelving; restricted narrow doorway", textAr: "خزائن حديدية مجاورة غير مستقرة؛ وممر خروج ضيق ومزدحم", isCorrect: true },
        { id: "2_hz_2", text: "Escalating basement gas leak; active electrical arcing", textAr: "تسرب غاز متصاعد بالقبو؛ وشرر كهربائي نشط بالأرضية", isCorrect: false },
        { id: "2_hz_3", text: "Rising groundwater flood; ceiling light fixture detachment", textAr: "ارتفاع منسوب مياه أرضية؛ وتدلي وحدات الإنارة من السقف", isCorrect: false },
        { id: "2_hz_4", text: "Combustible dust explosion risk; blocked fire hydrant valve", textAr: "خطر انفجار غبار ورقي؛ وانسداد محبس مياه الإطفاء", isCorrect: false }
      ]
    }
  },
  {
    id: 3,
    title: "Admin IT Server Room Battery Smoke",
    titleAr: "تصاعد دخان بطاريات خوادم تقنية المعلومات",
    department: "Administrative IT Services",
    departmentAr: "تقنية المعلومات الإدارية",
    floor: "2nd Floor • Room 210",
    floorAr: "الطابق الثاني • غرفة 210",
    primaryRole: "HAZARD_SAFETY",
    secondaryRole: "COMMUNICATIONS",
    tertiaryRole: "FIRST_AID",
    scenarioText: "Airport Admin Building, 2nd Floor, Server Room 210: A backup battery unit (UPS) swelled and overheated, emitting pungent white acidic smoke. A technician crawled outside coughing and dizzy; nobody else is inside. The automated gas suppression strobe is flashing, and energized server racks remain powered.",
    scenarioTextAr: "مبنى إدارة المطار، الطابق الثاني، غرفة الخوادم 210: انتفخت بطارية طوارئ (UPS) وارتفعت حرارتها مع انبعاث دخان أبيض حمضي خانق. زحف فني للخارج يسعل ويشعر بالدوار، ولا يوجد غيره بالداخل. يومض ضوء نظام إطفاء الغاز التلقائي، وأجهزة الخوادم لا تزال متصلة بالكهرباء.",
    extractionKey: {
      l: "Airport Admin Building, 2nd Floor, Server Room 210.",
      l_ar: "مبنى إدارة المطار، الطابق الثاني، غرفة خوادم تقنية المعلومات 210.",
      n_nature: "Overheating UPS battery emitting pungent acidic white smoke.",
      n_nature_ar: "سخونة زائدة ببطارية خوادم مع انبعاث دخان أبيض حمضي.",
      n_numbers: "1 technician conscious with dizziness and smoke inhalation.",
      n_numbers_ar: "فني واحد واعٍ يعاني من دوار واستنشاق الدخان.",
      h: "Acid fumes, energized server equipment, imminent gas discharge.",
      h_ar: "أبخرة حمضية سامة، أجهزة خوادم كهربائية، وترقب إطلاق غاز الإطفاء."
    },
    zshExtractionKey: {
      z_zone: "Zone 2-IT (2nd Floor Server Room 210 & Data Corridor)",
      z_zone_ar: "منطقة 2-تقنية المعلومات (الطابق الثاني، غرفة 210 وممر البيانات)",
      s_status: "Room 210 evacuated; technician in fresh air; gas alarm active.",
      s_status_ar: "إخلاء غرفة 210؛ نقل الفني للهواء النقي؛ وترقب نظام الغاز.",
      h_hazard: "Dense battery acid vapor; energized high-voltage server racks.",
      h_hazard_ar: "أبخرة حمضية سامة متراكمة؛ ومعدات خوادم كهربائية نشطة."
    },
    options: {
      l: [
        { id: "3_l_1", text: "Airport Admin Building, 2nd Floor, IT Server Room 210", textAr: "مبنى إدارة المطار، الطابق الثاني، غرفة خوادم تقنية المعلومات 210", isCorrect: true },
        { id: "3_l_2", text: "Airport Admin Building, 1st Floor, IT Helpdesk Cubicle Area 112", textAr: "مبنى إدارة المطار، الطابق الأول، منطقة مكاتب الدعم الفني 112", isCorrect: false },
        { id: "3_l_3", text: "Airport Admin Building, Basement B1, Main Telecom Distribution Hub", textAr: "مبنى إدارة المطار، القبو B1، موزع الاتصالات المركزي", isCorrect: false },
        { id: "3_l_4", text: "Airport Admin Building, 4th Floor, Network Switch Closet 405", textAr: "مبنى إدارة المطار، الطابق الرابع، كابينة محولات الشبكة 405", isCorrect: false }
      ],
      n_nature: [
        { id: "3_nn_1", text: "Overheated swelling UPS battery emitting white acid smoke", textAr: "سخونة وانتفاخ بطارية طوارئ مع انبعاث دخان أبيض حمضي", isCorrect: true },
        { id: "3_nn_2", text: "Air conditioning coolant line explosion with Freon vapor", textAr: "انفجار خط تبريد التكييف وتسرب غاز الفريون بالكامل", isCorrect: false },
        { id: "3_nn_3", text: "Electrical arc flash explosion in main power transformer", textAr: "وميض وانفجار كهربائي عنيف في محول الطاقة الرئيسي", isCorrect: false },
        { id: "3_nn_4", text: "Computer monitor plastic combustion with open flames", textAr: "احتراق شاشة كمبيوتر بلاستيكية مع تصاعد ألسنة لهب", isCorrect: false }
      ],
      n_numbers: [
        { id: "3_num_1", text: "1 technician conscious with dizziness and smoke inhalation", textAr: "فني واحد واعٍ يعاني من دوار واستنشاق الدخان", isCorrect: true },
        { id: "3_num_2", text: "3 engineers trapped inside behind automatic locked doors", textAr: "3 مهندسين محتجزين بالداخل خلف أبواب إلكترونية مغلقة", isCorrect: false },
        { id: "3_num_3", text: "Zero casualties; automated detection triggered before entry", textAr: "صفر إصابات؛ الإنذار التلقائي عمل قبل دخول أي موظف", isCorrect: false },
        { id: "3_num_4", text: "2 persons unconscious with severe second-degree burns", textAr: "شخصان فاقدا الوعي مع حروق بليغة من الدرجة الثانية", isCorrect: false }
      ],
      h_hazards: [
        { id: "3_haz_1", text: "Acidic toxic fumes, energized server racks, gas discharge risk", textAr: "أبخرة حمضية سامة، أجهزة خوادم كهربائية نشطة، وخطر إطلاق الغاز", isCorrect: true },
        { id: "3_haz_2", text: "Natural gas line rupture, shattered glass falling outside", textAr: "انكسار خط غاز طبيعي، وزجاج مكسور يتساقط إلى الخارج", isCorrect: false },
        { id: "3_haz_3", text: "Flooded server floorboards, collapse of overhead cable trays", textAr: "غرق أرضية الخوادم بالماء، وانهيار حوامل الكابلات العلوية", isCorrect: false },
        { id: "3_haz_4", text: "Flammable solvent cans, blocked corridor emergency exit door", textAr: "علب مذيبات قابلة للاشتعال، وانسداد مخرج طوارئ الممر", isCorrect: false }
      ],
      z_zone: [
        { id: "3_z_1", text: "Zone 2-IT (2nd Floor Server Room 210 & Data Corridor)", textAr: "منطقة 2-تقنية المعلومات (الطابق الثاني، غرفة 210 وممر البيانات)", isCorrect: true },
        { id: "3_z_2", text: "Zone 3-Executive (3rd Floor Central Boardroom Sector)", textAr: "منطقة 3-الإدارة (الطابق الثالث، قطاع قاعة الاجتماعات التنفيذية)", isCorrect: false },
        { id: "3_z_3", text: "Zone 1-Lobby (Ground Floor Visitor Welcome Center)", textAr: "منطقة 1-الاستقبال (الطابق الأرضي، مركز استقبال الزوار)", isCorrect: false },
        { id: "3_z_4", text: "Zone B1-Archive (Basement Level Secure Vault Area)", textAr: "منطقة B1-الأرشيف (قبو المبنى، منطقة الخزائن والوثائق)", isCorrect: false }
      ],
      s_status: [
        { id: "3_s_1", text: "Room 210 evacuated; technician in fresh air; gas alarm active", textAr: "إخلاء غرفة 210؛ نقل الفني للهواء النقي؛ وترقب نظام الغاز", isCorrect: true },
        { id: "3_s_2", text: "Responders inside room attempting to reset server circuit", textAr: "المسعفون داخل الغرفة يحاولون إعادة تشغيل قواطع الخوادم", isCorrect: false },
        { id: "3_s_3", text: "Water hose deployed into room to cool server racks", textAr: "استخدام خرطوم المياه داخل الغرفة لتبريد أجهزة الخوادم", isCorrect: false },
        { id: "3_s_4", text: "All personnel re-entering; incident declared completely resolved", textAr: "عودة جميع الموظفين للغرفة؛ وإعلان انتهاء الحادث بالكامل", isCorrect: false }
      ],
      h_residual: [
        { id: "3_hz_1", text: "Dense battery acid vapor; energized high-voltage server racks", textAr: "أبخرة حمضية سامة متراكمة؛ ومعدات خوادم كهربائية نشطة", isCorrect: true },
        { id: "3_hz_2", text: "Spilled hydraulic oil on tiles; falling steel ventilation duct", textAr: "زيت هيدروليكي منسكب؛ وسقوط دكت التكييف الحديدي", isCorrect: false },
        { id: "3_hz_3", text: "Combustible cardboard boxes stacked against server cabinets", textAr: "صناديق كرتون قابلة للاشتعال متراكمة قرب كبائن الخوادم", isCorrect: false },
        { id: "3_hz_4", text: "Structural floor deflection; loss of building water pressure", textAr: "هبوط في خرسانة الأرضية؛ وانقطاع ضغط مياه الإطفاء", isCorrect: false }
      ]
    }
  },
  {
    id: 4,
    title: "Executive Boardroom Medical Collapse",
    titleAr: "حالة إغماء مفاجئة في قاعة اجتماعات الإدارة العليا",
    department: "Executive Management",
    departmentAr: "الإدارة العليا والتنفيذية",
    floor: "5th Floor • Room 501",
    floorAr: "الطابق الخامس • غرفة 501",
    primaryRole: "FIRST_AID",
    secondaryRole: "EVACUATION_WARDEN",
    tertiaryRole: "COMMUNICATIONS",
    scenarioText: "Airport Admin HQ, 5th Floor, Executive Boardroom Room 501: During a budget meeting, a 55-year-old director clutched his chest and collapsed unresponsive onto the floor with slow, irregular breathing. Eight managers are in distress. The victim is lying between heavy conference chairs, and an AED defibrillator is urgently required.",
    scenarioTextAr: "مبنى المقر الإداري، الطابق الخامس، قاعة الاجتماعات التنفيذية 501: سقط مدير إدارة (55 عاماً) فاقداً للوعي على الأرض ممسكاً بصدره مع تنفس بطيء وغير منتظم. يوجد 8 مدراء في حالة ذعر. المصاب ممدد بين كراسي الاجتماعات الثقيلة، وهناك حاجة عاجلة لجهاز الصدمات (AED).",
    extractionKey: {
      l: "Airport Admin HQ, 5th Floor, Executive Boardroom Room 501.",
      l_ar: "مبنى المقر الإداري، الطابق الخامس، قاعة الاجتماعات التنفيذية 501.",
      n_nature: "Sudden medical collapse, suspected acute cardiac event.",
      n_nature_ar: "حالة إغماء وسقوط مفاجئ، اشتباه أزمة قلبية حادة.",
      n_numbers: "1 person unconscious, unresponsive with irregular breathing.",
      n_numbers_ar: "شخص واحد فاقد للوعي تماماً مع تنفس غير منتظم.",
      h: "Narrow space between chairs, delayed CPR, urgent AED needed.",
      h_ar: "ضيق المساحة بين الكراسي، وتأخر الإنعاش، وحاجة عاجلة لجهاز AED."
    },
    zshExtractionKey: {
      z_zone: "Zone 5-Executive (5th Floor Executive Suite & Boardroom 501)",
      z_zone_ar: "منطقة 5-الإدارة العليا (الطابق الخامس، الجناح وقاعة 501)",
      s_status: "8 staff cleared outside; CPR compressions started; AED en route.",
      s_status_ar: "إخلاء 8 مدراء؛ بدء الإنعاش القلبي (CPR)؛ وطلب جهاز AED.",
      h_hazard: "Constricted access between heavy chairs; priority elevator hold needed.",
      h_hazard_ar: "ضيق الممر بين الكراسي الثقيلة؛ وحاجة لتثبيت مصعد للمسعفين."
    },
    options: {
      l: [
        { id: "4_l_1", text: "Airport Admin HQ, 5th Floor, Executive Boardroom Room 501", textAr: "مبنى المقر الإداري، الطابق الخامس، قاعة الاجتماعات التنفيذية 501", isCorrect: true },
        { id: "4_l_2", text: "Airport Admin HQ, 4th Floor, Legal Department Meeting Room 408", textAr: "مبنى المقر الإداري، الطابق الرابع، غرفة اجتماعات الشؤون القانونية 408", isCorrect: false },
        { id: "4_l_3", text: "Airport Admin HQ, 1st Floor, Auditorium Presentation Hall G-05", textAr: "مبنى المقر الإداري، الطابق الأول، قاعة المحاضرات والعروض G-05", isCorrect: false },
        { id: "4_l_4", text: "Airport Admin HQ, Ground Floor, VIP Reception Waiting Lounge", textAr: "مبنى المقر الإداري، الطابق الأرضي، استراحة كبار الشخصيات", isCorrect: false }
      ],
      n_nature: [
        { id: "4_nn_1", text: "Sudden medical collapse with suspected acute cardiac arrest", textAr: "سقوط وإغماء مفاجئ مع اشتباه توقف قلب وتنفس حاد", isCorrect: true },
        { id: "4_nn_2", text: "Severe diabetic insulin reaction with violent combative behavior", textAr: "هبوط سكر حاد مع نوبة تشنج واضطراب سلوكي عنيف", isCorrect: false },
        { id: "4_nn_3", text: "Slip and fall on polished floor with compound skull fracture", textAr: "انزلاق وسقوط على أرضية ملساء مع كسر مضاعف بالجمجمة", isCorrect: false },
        { id: "4_nn_4", text: "Choking on catering food with completely obstructed airway", textAr: "غصة واختناق بقطعة طعام مع انسداد كامل لمجرى الهواء", isCorrect: false }
      ],
      n_numbers: [
        { id: "4_num_1", text: "1 person unconscious with irregular breathing; 8 uninjured", textAr: "شخص واحد فاقد الوعي بتنفس غير منتظم؛ و8 حاضرين سالمين", isCorrect: true },
        { id: "4_num_2", text: "4 managers collapsed simultaneously from toxic carbon monoxide", textAr: "4 مدراء مغشياً عليهم بالتزامن بسبب غاز أول أكسيد الكربون", isCorrect: false },
        { id: "4_num_3", text: "1 person fully alert with mild wrist pain; zero distress", textAr: "شخص واحد بكامل وعيه بألم خفيف بالمعصم؛ دون أي ذعر", isCorrect: false },
        { id: "4_num_4", text: "Zero casualties; victim recovered and walked unassisted", textAr: "صفر إصابات؛ الشخص أفاق ومشى بمفرده دون مساعدة", isCorrect: false }
      ],
      h_hazards: [
        { id: "4_haz_1", text: "Narrow space between heavy chairs, urgent CPR & AED needed", textAr: "ضيق المساحة بين الكراسي، وحاجة عاجلة للإنعاش وجهاز الصدمات", isCorrect: true },
        { id: "4_haz_2", text: "Active electrical arcing from boardroom projection screen", textAr: "شرر كهربائي نشط صادر من شاشة العرض بالقاعة", isCorrect: false },
        { id: "4_haz_3", text: "Shattered window glass from high wind storm gusts", textAr: "زجاج نوافذ محطم ومتناثر بفعل رياح عاصفة مفاجئة", isCorrect: false },
        { id: "4_haz_4", text: "Leaking hot water urn spraying boiling water across floor", textAr: "غلاية مياه ساخنة ترش ماءً مغلياً على أرضية المكان", isCorrect: false }
      ],
      z_zone: [
        { id: "4_z_1", text: "Zone 5-Executive (5th Floor Executive Suite & Boardroom 501)", textAr: "منطقة 5-الإدارة العليا (الطابق الخامس، الجناح وقاعة 501)", isCorrect: true },
        { id: "4_z_2", text: "Zone 3-Operations (3rd Floor Central Terminal Management)", textAr: "منطقة 3-العمليات (الطابق الثالث، إدارة الصالات المركزية)", isCorrect: false },
        { id: "4_z_3", text: "Zone 2-Finance (2nd Floor Payroll Accounting Suite 220)", textAr: "منطقة 2-المالية (الطابق الثاني، قسم الرواتب والحسابات 220)", isCorrect: false },
        { id: "4_z_4", text: "Zone 1-Procurement (1st Floor Contract Archive Sector)", textAr: "منطقة 1-المشتريات (الطابق الأول، قطاع عقود المشتريات)", isCorrect: false }
      ],
      s_status: [
        { id: "4_s_1", text: "8 staff cleared outside; CPR compressions started; AED en route", textAr: "إخلاء 8 مدراء؛ بدء الإنعاش القلبي (CPR)؛ وطلب جهاز AED", isCorrect: true },
        { id: "4_s_2", text: "Meeting continuing as planned; victim resting in executive chair", textAr: "استمرار الاجتماع بشكل طبيعي؛ والمصاب يستريح على الكرسي", isCorrect: false },
        { id: "4_s_3", text: "Building fire alarm sounded; entire tower descending stairwell", textAr: "تشغيل جرس إنذار الحريق؛ وإخلاء البرج كاملاً عبر الدرج", isCorrect: false },
        { id: "4_s_4", text: "Paramedics arrived and cleared scene; victim discharged", textAr: "وصول المسعفين وانتهاء الحالة؛ ومغادرة المصاب للمبنى", isCorrect: false }
      ],
      h_residual: [
        { id: "4_hz_1", text: "Constricted access between heavy chairs; priority elevator hold needed", textAr: "ضيق الممر بين الكراسي الثقيلة؛ وحاجة لتثبيت مصعد للمسعفين", isCorrect: true },
        { id: "4_hz_2", text: "Dense smoke banking down corridor; active fire sprinkler head", textAr: "دخان كثيف يتدفق بالممر؛ ورشاش مياه إطفاء نشط", isCorrect: false },
        { id: "4_hz_3", text: "Structural floor collapse threatening 5th floor boardroom", textAr: "خطر انهيار خرسانة الأرضية في قاعة الطابق الخامس", isCorrect: false },
        { id: "4_hz_4", text: "Toxic refrigerant vapor leaking from ceiling AC cassette", textAr: "تسرب غاز تبريد سام من وحدة التكييف المركزية بالسقف", isCorrect: false }
      ]
    }
  },
  {
    id: 5,
    title: "Finance Office Ceiling Water Pipe Burst",
    titleAr: "انفجار أنبوب مياه في سقف مكتب المالية",
    department: "Finance & Accounting",
    departmentAr: "المالية والمحاسبة",
    floor: "2nd Floor • Room 220",
    floorAr: "الطابق الثاني • غرفة 220",
    primaryRole: "HAZARD_SAFETY",
    secondaryRole: "EVACUATION_WARDEN",
    tertiaryRole: "FIRST_AID",
    scenarioText: "Airport Admin Building, 2nd Floor, Finance Office Room 220: A ceiling water pipe burst, dropping ceiling tiles and pouring water over 6 desks. Standing water is 4cm deep. An accountant slipped heavily, spraining her wrist and bruising her back. Seven colleagues evacuated. Three submerged floor power strips are buzzing actively.",
    scenarioTextAr: "مبنى إدارة المطار، الطابق الثاني، قسم المالية غرفة 220: انفجر أنبوب مياه بالسقف وسقطت ألواح الجبس وغمرت المياه 6 مكاتب بعمق 4 سم. انزلقت محاسبة وأصيبت بالتواء بالمعصم وكدمة بالظهر. تم إخلاء 7 موظفين. توجد 3 توصيلات كهربائية أرضية مغمورة وتصدر طنيناً.",
    extractionKey: {
      l: "Airport Admin Building, 2nd Floor, Finance Office Room 220.",
      l_ar: "مبنى إدارة المطار، الطابق الثاني، قسم المالية غرفة 220.",
      n_nature: "Ceiling pipe burst, indoor flooding, and slip-and-fall injury.",
      n_nature_ar: "انفجار أنبوب مياه بالسقف وغرق مكاتب وإصابة انزلاق وسقوط.",
      n_numbers: "1 accountant conscious with wrist injury; 7 colleagues safe.",
      n_numbers_ar: "محاسبة واحدة واعية مصابة بالتواء بالمعصم؛ و7 زملاء سالمون.",
      h: "Submerged buzzing power strips, slippery floor, hanging ceiling tiles.",
      h_ar: "توصيلات كهرباء مغمورة تصدر طنيناً، أرضية زلقة، وألواح سقف متدلية."
    },
    zshExtractionKey: {
      z_zone: "Zone 2-Finance (2nd Floor Payroll Office Room 220 & Hallway)",
      z_zone_ar: "منطقة 2-المالية (الطابق الثاني، مكتب 220 والممر)",
      s_status: "7 staff in corridor; wrist splinted; water main shutoff underway.",
      s_status_ar: "تجمع 7 موظفين بالممر؛ تثبيت المعصم؛ وجاري إغلاق محبس المياه.",
      h_hazard: "Submerged buzzing power strips; standing water depth 4cm.",
      h_hazard_ar: "توصيلات كهرباء مغمورة تصدر طنيناً؛ وبرك مياه بعمق 4 سم."
    },
    options: {
      l: [
        { id: "5_l_1", text: "Airport Admin Building, 2nd Floor, Finance Office Room 220", textAr: "مبنى إدارة المطار، الطابق الثاني، قسم المالية غرفة 220", isCorrect: true },
        { id: "5_l_2", text: "Airport Admin Building, 3rd Floor, Human Resources Suite 304", textAr: "مبنى إدارة المطار، الطابق الثالث، مكاتب الموارد البشرية 304", isCorrect: false },
        { id: "5_l_3", text: "Airport Admin Building, 1st Floor, Procurement Contracts Room 118", textAr: "مبنى إدارة المطار، الطابق الأول، مكتب عقود المشتريات 118", isCorrect: false },
        { id: "5_l_4", text: "Airport Admin Building, Ground Floor, Central Badging Office G-08", textAr: "مبنى إدارة المطار، الطابق الأرضي، مكتب تصاريح الموظفين G-08", isCorrect: false }
      ],
      n_nature: [
        { id: "5_nn_1", text: "Ceiling water pipe burst with office flooding and slip injury", textAr: "انفجار أنبوب مياه بالسقف وغرق مكاتب وإصابة انزلاق وسقوط", isCorrect: true },
        { id: "5_nn_2", text: "Fire sprinkler accidental discharge due to cigarette lighter", textAr: "تشغيل رشاش إطفاء بالخطأ بسبب استخدام ولاعة سجائر", isCorrect: false },
        { id: "5_nn_3", text: "Sewage backflow from broken main drain pipe in wall", textAr: "ارتداد مياه صرف صحي من ماسورة تصريف رئيسية بالجدار", isCorrect: false },
        { id: "5_nn_4", text: "Flash rainwater flood through broken ground floor window", textAr: "تدفق مياه أمطار غزيرة عبر نافذة مكسورة بالطابق الأرضي", isCorrect: false }
      ],
      n_numbers: [
        { id: "5_num_1", text: "1 accountant conscious with wrist/back injury; 7 safe outside", textAr: "محاسبة واحدة واعية مصابة بالمعصم والظهر؛ و7 سالمون بالخارج", isCorrect: true },
        { id: "5_num_2", text: "4 staff trapped by rising water above door handle level", textAr: "4 موظفين محتجزين بسبب ارتفاع منسوب الماء لمقبض الباب", isCorrect: false },
        { id: "5_num_3", text: "Zero physical injuries; all 15 personnel unhurt and dry", textAr: "صفر إصابات؛ وجميع الموظفين الـ 15 سالمون دون بلل", isCorrect: false },
        { id: "5_num_4", text: "2 employees suffering electrical shock cardiac arrest", textAr: "موظفان تعرضا لصعق كهربائي أدى لتوقف عضلة القلب", isCorrect: false }
      ],
      h_hazards: [
        { id: "5_haz_1", text: "Submerged buzzing power strips, slippery carpet, loose tiles", textAr: "توصيلات كهرباء مغمورة تصدر طنيناً، أرضية زلقة، وألواح متدلية", isCorrect: true },
        { id: "5_haz_2", text: "Open flames spreading across soaked acoustic desk dividers", textAr: "ألسنة لهب تنتشر عبر قواطع المكاتب المبللة بالماء", isCorrect: false },
        { id: "5_haz_3", text: "Natural gas smell escaping from kitchen supply pipe", textAr: "انبعاث رائحة غاز طبيعي من أنبوب إمداد المطبخ", isCorrect: false },
        { id: "5_haz_4", text: "Falling high voltage power lines on external glass facade", textAr: "سقوط خطوط ضغط عالٍ خارجية على واجهة المبنى الزجاجية", isCorrect: false }
      ],
      z_zone: [
        { id: "5_z_1", text: "Zone 2-Finance (2nd Floor Payroll Office Room 220 & Hallway)", textAr: "منطقة 2-المالية (الطابق الثاني، مكتب 220 والممر)", isCorrect: true },
        { id: "5_z_2", text: "Zone 4-Legal (4th Floor Contracts & Legal Counsel Suite)", textAr: "منطقة 4-القانونية (الطابق الرابع، جناح المستشارين القانونيين)", isCorrect: false },
        { id: "5_z_3", text: "Zone 1-Lobby (Ground Floor Visitor Welcome Entrance)", textAr: "منطقة 1-الاستقبال (الطابق الأرضي، مدخل استقبال الزوار)", isCorrect: false },
        { id: "5_z_4", text: "Zone B1-Archive (Basement Level Historical Storage Area)", textAr: "منطقة B1-الأرشيف (قبو المبنى، مستودع السجلات القديمة)", isCorrect: false }
      ],
      s_status: [
        { id: "5_s_1", text: "7 staff in corridor; wrist splinted; water main shutoff underway", textAr: "تجمع 7 موظفين بالممر؛ تثبيت المعصم؛ وجاري إغلاق محبس المياه", isCorrect: true },
        { id: "5_s_2", text: "Staff continuing normal work using desks with umbrellas", textAr: "استمرار الموظفين في العمل باستخدام مظلات فوق المكاتب", isCorrect: false },
        { id: "5_s_3", text: "Entire building power turned off; 500 staff in parking lot", textAr: "فصل كهرباء المبنى كاملاً؛ وتجمع 500 موظف بمواقف السيارات", isCorrect: false },
        { id: "5_s_4", text: "Room dried with towels; normal accounting work resumed", textAr: "تجفيف الغرفة بالمناشف؛ واستئناف أعمال المحاسبة كالمعتاد", isCorrect: false }
      ],
      h_residual: [
        { id: "5_hz_1", text: "Submerged buzzing power strips; standing water depth 4cm", textAr: "توصيلات كهرباء مغمورة تصدر طنيناً؛ وبرك مياه بعمق 4 سم", isCorrect: true },
        { id: "5_hz_2", text: "Dense toxic plastic smoke spreading into adjacent elevator", textAr: "دخان بلاستيكي سام كثيف يتسرب إلى مصعد الموظفين المجاور", isCorrect: false },
        { id: "5_hz_3", text: "Unstable exterior masonry parapet wall rocking in wind", textAr: "جدار خارجي غير مستقر يهتز بفعل الرياح في واجهة المبنى", isCorrect: false },
        { id: "5_hz_4", text: "Radiation warning flag on medical parcel stored in office", textAr: "تحذير إشعاعي على طرد طبي محفوظ داخل مكتب الموظفين", isCorrect: false }
      ]
    }
  }
];

// Helper to look up scenarios
export const getScenarioById = (id: number): Scenario23 => {
  return scenarios23.find(s => s.id === id) || scenarios23[0];
};
