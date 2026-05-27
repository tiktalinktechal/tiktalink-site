import type { Locale } from "@/i18n/config";

type AIConversationLine = {
  user: string;
  assistant: string;
};

const sectorExperienceProfiles: Record<string, Partial<Record<"en" | "tr", IndustryExperience>>> = {
  "dental-clinics": {
    en: {
      websitePreview: {
        label: "Example dental clinic website experience",
        headline: "Confident care, clear treatments, easier appointments.",
        subheadline: "A premium clinic homepage that moves patients from urgent search intent to treatment clarity, doctor trust, and appointment request.",
        primaryAction: "Book appointment",
        secondaryAction: "Ask the AI assistant",
        highlights: ["Emergency dental care", "Treatment pages", "Dentist profiles", "Patient reviews"],
      },
      navigationTabs: ["Home", "Treatments", "Dentists", "Before / After", "Reviews", "FAQ", "Appointment"],
      exampleModules: ["Treatment card grid", "Emergency appointment banner", "Doctor profile layer", "Google Maps module", "Review wall", "Insurance and FAQ block"],
      customerJourney: ["Emergency or treatment search", "Treatment landing page", "Doctor trust layer", "AI patient question", "Appointment request", "Follow-up reminder"],
      aiConversation: [
        { user: "Do you offer emergency dental appointments?", assistant: "The assistant explains emergency availability, asks about pain level, and routes the patient to the right appointment path." },
        { user: "Can I compare implants and crowns?", assistant: "It guides the patient to treatment pages and prepares questions for the clinic team." },
      ],
      beforeAfter: {
        before: ["Outdated clinic page", "Scattered appointment channels", "Weak treatment explanations", "Reviews disconnected from search"],
        after: ["Treatment-led website", "Mobile appointment flow", "AI patient guidance", "Google visibility and trust system"],
      },
      mobilePreview: ["Tap-to-call", "Mobile appointment form", "Map directions", "AI chat", "Emergency CTA"],
      conversionElements: ["Sticky appointment CTA", "Treatment FAQ", "Review proof", "Doctor profile CTA"],
    },
  },
  restaurants: {
    en: {
      websitePreview: {
        label: "Example restaurant website experience",
        headline: "A menu, reservation, and local discovery system in one place.",
        subheadline: "A restaurant homepage built around menu clarity, table reservations, maps, reviews, QR access, delivery paths, and social trust.",
        primaryAction: "Reserve a table",
        secondaryAction: "View menu",
        highlights: ["Interactive menu", "Reservation flow", "Google Maps", "Delivery links"],
      },
      navigationTabs: ["Home", "Menu", "Reservations", "Gallery", "Reviews", "Location", "Order"],
      exampleModules: ["Seasonal menu system", "Reservation panel", "QR menu layer", "Delivery link hub", "Review highlights", "Social content strip"],
      customerJourney: ["Local food search", "Restaurant homepage", "Menu preview", "Review and location check", "Reservation or delivery CTA", "Confirmation follow-up"],
      aiConversation: [
        { user: "Can I reserve a table for tonight?", assistant: "The assistant checks party size, preferred time, and routes the guest into the reservation flow." },
        { user: "Do you have vegetarian options?", assistant: "It points to menu categories and highlights relevant dishes without forcing a phone call." },
      ],
      beforeAfter: {
        before: ["PDF menu", "No direct reservation path", "Weak Google review flow", "Social channels disconnected"],
        after: ["Live menu system", "Reservation funnel", "Maps and review architecture", "Connected delivery and social layer"],
      },
      mobilePreview: ["Menu-first layout", "Tap-to-reserve", "Map and hours", "Delivery buttons", "AI dining assistant"],
      conversionElements: ["Reservation CTA", "Popular dishes", "Review proof", "Location microcopy"],
    },
  },
  factories: {
    en: {
      websitePreview: {
        label: "Example factory website experience",
        headline: "Industrial capability translated into buyer confidence.",
        subheadline: "A B2B manufacturing website preview with production capabilities, certifications, RFQ flow, export pages, and multilingual buyer trust.",
        primaryAction: "Request a quote",
        secondaryAction: "View capabilities",
        highlights: ["Capabilities", "Certifications", "RFQ flow", "Export visibility"],
      },
      navigationTabs: ["Home", "Capabilities", "Products", "Certifications", "Export", "RFQ", "Contact"],
      exampleModules: ["Capability matrix", "Production process timeline", "Certification library", "B2B catalog", "RFQ form", "Export buyer guide"],
      customerJourney: ["International buyer search", "Capability page", "Certification proof", "Product catalog", "RFQ submission", "Sales follow-up"],
      aiConversation: [
        { user: "Can I request a quote for bulk production?", assistant: "The assistant asks for product type, quantity, material, destination, and routes the RFQ to the right team." },
        { user: "Which certifications can I review?", assistant: "It directs the buyer to relevant certification and compliance documents." },
      ],
      beforeAfter: {
        before: ["Capabilities hidden in PDFs", "No export landing pages", "Unstructured inquiry emails", "Certifications hard to verify"],
        after: ["Searchable B2B catalog", "Export-ready page system", "Structured RFQ workflow", "Trust proof for global buyers"],
      },
      mobilePreview: ["Quick RFQ", "Catalog search", "Certificate access", "WhatsApp/contact", "AI buyer assistant"],
      conversionElements: ["RFQ CTA", "Certification proof", "Technical catalog", "Export capability block"],
    },
  },
};

function buildExperience(slug: string, content: IndustryBaseContent, locale: "en" | "tr"): IndustryExperience {
  const profile = sectorExperienceProfiles[slug]?.[locale];
  if (profile) return profile;

  const isTurkish = locale === "tr";
  const title = content.title;
  const sections = content.exampleWebsiteSections.slice(0, 7);
  const focus = content.cardDescription.toLowerCase();

  return {
    websitePreview: {
      label: isTurkish ? "Örnek sektör web deneyimi" : "Example sector website experience",
      headline: isTurkish ? `${title} için çalışan bir dijital vitrin.` : `A working digital front door for ${title.toLowerCase()}.`,
      subheadline: isTurkish
        ? `${title} için ${focus} odağını web sitesi, SEO, Google görünürlüğü, AI asistanı ve dönüşüm akışıyla birleştiren sektör ön izlemesi.`
        : `A sector preview that connects ${focus} with website structure, SEO, Google visibility, AI assistance, and conversion flow.`,
      primaryAction: isTurkish ? "Talep oluştur" : "Start inquiry",
      secondaryAction: isTurkish ? "Sistemi incele" : "Explore system",
      highlights: content.digitalSystems.slice(0, 4),
    },
    navigationTabs: sections.length > 0 ? sections : content.digitalSystems.slice(0, 7),
    exampleModules: [
      ...content.digitalSystems.slice(0, 3),
      ...content.aiSystems.slice(0, 2),
      ...content.trustElements.slice(0, 2),
    ],
    customerJourney: content.sampleJourney,
    aiConversation: [
      {
        user: isTurkish ? `${title} için uygun hizmeti nasıl seçebilirim?` : `How do I choose the right option for ${title.toLowerCase()}?`,
        assistant: isTurkish
          ? "Asistan ihtiyacı, zamanlamayı ve önceliği netleştirir; kullanıcıyı doğru sayfaya veya talep formuna yönlendirir."
          : "The assistant clarifies need, timing, and priority, then routes the visitor to the right page or inquiry form.",
      },
      {
        user: isTurkish ? "Bir uzmanla hızlıca iletişime geçebilir miyim?" : "Can I contact the team quickly?",
        assistant: isTurkish
          ? "Mobil iletişim, form ve takip akışını tek ekranda sunarak talebin bağlamlı ulaşmasını sağlar."
          : "It presents mobile contact, form, and follow-up paths so the request arrives with useful context.",
      },
    ],
    beforeAfter: {
      before: content.mainPainPoints,
      after: content.tiktalinkSolutions,
    },
    mobilePreview: isTurkish
      ? ["Hızlı iletişim", "Mobil form", "Harita veya yönlendirme", "AI sohbet", "Takip akışı"]
      : ["Fast contact", "Mobile form", "Map or routing", "AI chat", "Follow-up flow"],
    conversionElements: content.conversionFlow,
  };
}

export type IndustryExperience = {
  websitePreview: {
    label: string;
    headline: string;
    subheadline: string;
    primaryAction: string;
    secondaryAction: string;
    highlights: string[];
  };
  navigationTabs: string[];
  exampleModules: string[];
  customerJourney: string[];
  aiConversation: AIConversationLine[];
  beforeAfter: {
    before: string[];
    after: string[];
  };
  mobilePreview: string[];
  conversionElements: string[];
};

type IndustryBaseContent = {
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  badge: string;
  overview: string;
  mainPainPoints: string[];
  tiktalinkSolutions: string[];
  exampleWebsiteSections: string[];
  digitalSystems: string[];
  aiSystems: string[];
  seoStrategy: string[];
  googleVisibility: string[];
  socialMediaSystem: string[];
  automationOpportunities: string[];
  conversionFlow: string[];
  trustElements: string[];
  sampleJourney: string[];
  ctaTitle: string;
  ctaText: string;
  cardDescription: string;
};

export type IndustryContent = IndustryBaseContent & IndustryExperience;

export type IndustryPage = {
  slug: string;
  icon: string;
  content: Partial<Record<Locale, IndustryContent>> & { en: IndustryContent; tr: IndustryContent };
};

function industry(en: IndustryBaseContent, tr: IndustryBaseContent, slug: string, icon: string): IndustryPage {
  return {
    slug,
    icon,
    content: {
      en: { ...en, ...buildExperience(slug, en, "en") },
      tr: { ...tr, ...buildExperience(slug, tr, "tr") },
    },
  };
}

const journey = {
  en: ["Google search", "Industry website", "Service page", "AI assistant or form", "Qualified request", "Follow-up workflow"],
  tr: ["Google araması", "Sektör web sitesi", "Hizmet sayfası", "AI asistanı veya form", "Nitelikli talep", "Takip iş akışı"],
};

export const industryPages: IndustryPage[] = [
  industry(
    {
      title: "Dental Clinics",
      shortTitle: "Dental",
      metaTitle: "Dental Clinic Website, SEO & AI Systems | Tiktalink",
      metaDescription: "Tiktalink builds digital infrastructure for dental clinics, including websites, local SEO, Google visibility, appointment flows, AI assistants, and patient trust systems.",
      heroHeadline: "A complete digital trust system for modern dental clinics.",
      heroSubheadline: "Sector blueprint for clinics that need stronger patient confidence, local discovery, treatment pages, review architecture, and a smoother appointment journey.",
      badge: "Example transformation model",
      overview: "Dental decisions are trust-heavy and often urgent. A clinic needs more than a polished homepage: it needs treatment clarity, doctor credibility, local Google strength, mobile booking, emergency intent coverage, and patient education that reduces hesitation.",
      mainPainPoints: ["Patients cannot quickly compare treatments or doctors.", "Google Maps, reviews, and local search are not structured as one system.", "Appointment requests arrive through scattered channels with no clear follow-up."],
      tiktalinkSolutions: ["Treatment-led website architecture with doctor profiles and trust sections.", "Local SEO pages for high-intent searches such as emergency dental care, implants, whitening, and orthodontics.", "AI patient assistant and appointment routing that prepares inquiries before the clinic responds."],
      exampleWebsiteSections: ["Home", "Treatments", "Dentists", "Appointment", "Reviews", "Google Maps", "FAQ", "AI Assistant", "Emergency Dental Care", "Before / After Gallery"],
      digitalSystems: ["Mobile-first clinic website", "Treatment page system", "Appointment request flow", "Patient education hub", "Review and trust module"],
      aiSystems: ["AI patient FAQ assistant", "Treatment guidance prompts", "Appointment intent qualification", "Knowledge base for clinic policies"],
      seoStrategy: ["Treatment-specific local pages", "Emergency search intent coverage", "Schema for clinic, doctors, and FAQs", "Internal linking between conditions and treatments"],
      googleVisibility: ["Google Business optimization", "Review response structure", "Maps direction and call actions", "Clinic photo and service taxonomy"],
      socialMediaSystem: ["Treatment education content", "Doctor credibility posts", "Before/after governance", "Review-led trust content"],
      automationOpportunities: ["Appointment routing", "Missed-call follow-up", "New patient intake", "Post-visit review request"],
      conversionFlow: ["Search result", "Treatment page", "Trust proof", "AI assistant or appointment form", "Clinic follow-up"],
      trustElements: ["Dentist profiles", "Certificates", "Patient reviews", "Treatment explanations", "Transparent contact options"],
      sampleJourney: journey.en,
      ctaTitle: "Build this dental clinic system.",
      ctaText: "Request a sector-specific digital audit for a dental clinic transformation model.",
      cardDescription: "Appointments, treatments, local SEO, reviews, and AI patient guidance.",
    },
    {
      title: "Diş Klinikleri",
      shortTitle: "Diş Kliniği",
      metaTitle: "Diş Kliniği Web Sitesi, SEO ve Yapay Zekâ Sistemleri | Tiktalink",
      metaDescription: "Tiktalink diş klinikleri için web sitesi, yerel SEO, Google görünürlüğü, randevu akışları, yapay zekâ asistanları ve hasta güven sistemleri kurar.",
      heroHeadline: "Modern diş klinikleri için eksiksiz bir dijital güven sistemi.",
      heroSubheadline: "Hasta güveni, yerel keşif, tedavi sayfaları, yorum mimarisi ve mobil randevu akışını güçlendiren sektör dönüşüm modeli.",
      badge: "Örnek dönüşüm modeli",
      overview: "Diş kliniği seçimi güvene ve çoğu zaman aciliyete dayanır. Klinik yalnızca iyi görünen bir ana sayfaya değil; tedavi netliğine, hekim güvenine, Google gücüne, mobil randevu deneyimine ve hasta eğitimine ihtiyaç duyar.",
      mainPainPoints: ["Hastalar tedavileri ve hekimleri hızlıca anlayamaz.", "Google Maps, yorumlar ve yerel arama tek sistem gibi çalışmaz.", "Randevu talepleri farklı kanallara dağılır ve takip netliği kaybolur."],
      tiktalinkSolutions: ["Hekim profilleri ve güven bölümleriyle tedavi odaklı web mimarisi.", "Acil diş, implant, beyazlatma ve ortodonti gibi yüksek niyetli aramalar için yerel SEO sayfaları.", "Talebi kliniğe ulaşmadan önce hazırlayan AI hasta asistanı ve randevu yönlendirme sistemi."],
      exampleWebsiteSections: ["Ana sayfa", "Tedaviler", "Hekimler", "Randevu", "Yorumlar", "Google Maps", "SSS", "AI Asistan", "Acil Diş Hizmeti", "Önce / Sonra Galerisi"],
      digitalSystems: ["Mobil öncelikli klinik web sitesi", "Tedavi sayfa sistemi", "Randevu talep akışı", "Hasta eğitim merkezi", "Yorum ve güven modülü"],
      aiSystems: ["AI hasta SSS asistanı", "Tedavi yönlendirme soruları", "Randevu niyeti sınıflandırma", "Klinik politika bilgi tabanı"],
      seoStrategy: ["Tedavi bazlı yerel sayfalar", "Acil arama niyeti kapsamı", "Klinik, hekim ve SSS schema yapısı", "Şikâyetler ve tedaviler arasında iç bağlantı"],
      googleVisibility: ["Google Business optimizasyonu", "Yorum yanıt yapısı", "Harita, yol tarifi ve arama aksiyonları", "Klinik fotoğraf ve hizmet taksonomisi"],
      socialMediaSystem: ["Tedavi eğitim içerikleri", "Hekim güven içerikleri", "Önce/sonra yayın kuralları", "Yorum odaklı güven içerikleri"],
      automationOpportunities: ["Randevu yönlendirme", "Cevapsız çağrı takibi", "Yeni hasta ön kabulü", "Ziyaret sonrası yorum talebi"],
      conversionFlow: ["Arama sonucu", "Tedavi sayfası", "Güven kanıtı", "AI asistan veya randevu formu", "Klinik takibi"],
      trustElements: ["Hekim profilleri", "Sertifikalar", "Hasta yorumları", "Tedavi açıklamaları", "Net iletişim seçenekleri"],
      sampleJourney: journey.tr,
      ctaTitle: "Bu diş kliniği sistemini kurun.",
      ctaText: "Diş kliniği dönüşüm modeli için sektöre özel dijital denetim talep edin.",
      cardDescription: "Randevu, tedavi sayfaları, yerel SEO, yorumlar ve AI hasta yönlendirmesi.",
    },
    "dental-clinics",
    "DC"
  ),
  industry(
    {
      title: "Medical Clinics",
      shortTitle: "Medical",
      metaTitle: "Medical Clinic Website, SEO & AI Readiness | Tiktalink",
      metaDescription: "Digital infrastructure for medical clinics: specialty pages, doctor profiles, appointment systems, patient education, Google visibility, and AI-ready support.",
      heroHeadline: "A patient clarity layer for medical clinics.",
      heroSubheadline: "Sector blueprint for clinics that need trust, specialty visibility, appointment flow, patient education, and structured healthcare communication.",
      badge: "Healthcare sector blueprint",
      overview: "Medical clinics need calm, accurate, trust-first digital systems. Patients search by symptom, specialty, doctor, insurance, location, and urgency. The website must guide without overpromising.",
      mainPainPoints: ["Specialties and doctors are hard to understand.", "Patient questions repeat across phone, WhatsApp, and front desk.", "Local search visibility is not tied to appointment conversion."],
      tiktalinkSolutions: ["Specialty and doctor architecture for clear patient navigation.", "Patient education pages and FAQ content designed for search and AI discovery.", "Appointment routing and inquiry preparation for front-desk efficiency."],
      exampleWebsiteSections: ["Home", "Specialties", "Doctors", "Appointments", "Patient Guides", "Insurance FAQ", "Location", "Reviews", "AI Triage Assistant"],
      digitalSystems: ["Clinic website", "Doctor profile system", "Appointment request flow", "Patient education library", "Multilingual page foundation"],
      aiSystems: ["AI intake guidance", "FAQ assistant", "Specialty routing", "Clinic knowledge base"],
      seoStrategy: ["Specialty landing pages", "Symptom-to-specialty content", "Doctor schema", "FAQ schema and internal linking"],
      googleVisibility: ["Google Business category refinement", "Location and hours accuracy", "Review process", "Service list optimization"],
      socialMediaSystem: ["Doctor education videos", "Clinic announcements", "Preventive care posts", "Trust-focused patient education"],
      automationOpportunities: ["Appointment pre-qualification", "Document reminders", "Follow-up messaging", "Review requests"],
      conversionFlow: ["Symptom or clinic search", "Specialty page", "Doctor profile", "Appointment form", "Prepared front-desk response"],
      trustElements: ["Doctor credentials", "Specialty explanations", "Clinic policies", "Reviews", "Clear disclaimers"],
      sampleJourney: journey.en,
      ctaTitle: "Build a clinic-ready digital system.",
      ctaText: "Request a medical clinic infrastructure blueprint.",
      cardDescription: "Specialties, doctors, patient education, booking flow, and AI readiness.",
    },
    {
      title: "Medikal Klinikler",
      shortTitle: "Klinik",
      metaTitle: "Medikal Klinik Web Sitesi, SEO ve AI Hazırlığı | Tiktalink",
      metaDescription: "Medikal klinikler için uzmanlık sayfaları, hekim profilleri, randevu sistemleri, hasta eğitimi, Google görünürlüğü ve AI destek altyapısı.",
      heroHeadline: "Medikal klinikler için hasta netliği katmanı.",
      heroSubheadline: "Güven, uzmanlık görünürlüğü, randevu akışı, hasta eğitimi ve yapılandırılmış sağlık iletişimi için sektör planı.",
      badge: "Sağlık sektörü planı",
      overview: "Medikal klinikler sakin, doğru ve güven odaklı dijital sistemlere ihtiyaç duyar. Hasta semptoma, uzmanlığa, hekime, sigortaya, konuma ve aciliyete göre arama yapar.",
      mainPainPoints: ["Uzmanlıklar ve hekimler yeterince anlaşılır değildir.", "Hasta soruları telefon, WhatsApp ve danışmada tekrar eder.", "Yerel arama görünürlüğü randevu dönüşümüne bağlanmaz."],
      tiktalinkSolutions: ["Net hasta yönlendirmesi için uzmanlık ve hekim mimarisi.", "Arama ve AI keşfi için hasta eğitim sayfaları ve SSS içeriği.", "Danışma verimliliği için randevu yönlendirme ve talep hazırlama."],
      exampleWebsiteSections: ["Ana sayfa", "Uzmanlıklar", "Hekimler", "Randevu", "Hasta Rehberleri", "Sigorta SSS", "Konum", "Yorumlar", "AI Ön Değerlendirme Asistanı"],
      digitalSystems: ["Klinik web sitesi", "Hekim profil sistemi", "Randevu talep akışı", "Hasta eğitim kütüphanesi", "Çok dilli sayfa temeli"],
      aiSystems: ["AI ön kabul yönlendirmesi", "SSS asistanı", "Uzmanlık yönlendirme", "Klinik bilgi tabanı"],
      seoStrategy: ["Uzmanlık açılış sayfaları", "Semptomdan uzmanlığa içerik", "Hekim schema yapısı", "SSS schema ve iç bağlantılar"],
      googleVisibility: ["Google Business kategori düzeni", "Konum ve saat doğruluğu", "Yorum süreci", "Hizmet listesi optimizasyonu"],
      socialMediaSystem: ["Hekim eğitim videoları", "Klinik duyuruları", "Koruyucu sağlık içerikleri", "Güven odaklı hasta eğitimi"],
      automationOpportunities: ["Randevu ön nitelendirme", "Belge hatırlatmaları", "Takip mesajları", "Yorum talepleri"],
      conversionFlow: ["Semptom veya klinik araması", "Uzmanlık sayfası", "Hekim profili", "Randevu formu", "Hazırlanmış danışma yanıtı"],
      trustElements: ["Hekim yetkinlikleri", "Uzmanlık açıklamaları", "Klinik politikaları", "Yorumlar", "Açık bilgilendirme notları"],
      sampleJourney: journey.tr,
      ctaTitle: "Klinik için hazır dijital sistemi kurun.",
      ctaText: "Medikal klinik altyapı planı talep edin.",
      cardDescription: "Uzmanlıklar, hekimler, hasta eğitimi, randevu akışı ve AI hazırlığı.",
    },
    "medical-clinics",
    "MC"
  ),
  industry(
    {
      title: "Doctors",
      shortTitle: "Doctors",
      metaTitle: "Doctor Website, Medical SEO & Appointment Systems | Tiktalink",
      metaDescription: "Personal digital authority systems for doctors, including specialist profile websites, medical SEO, appointment funnels, and patient education.",
      heroHeadline: "Personal authority infrastructure for doctors.",
      heroSubheadline: "A specialist-focused model for doctors who need trust, clarity, discoverability, and consultation conversion without sounding promotional.",
      badge: "Professional authority blueprint",
      overview: "A doctor’s digital presence must communicate expertise, ethics, accessibility, and calm authority. Patients need to understand who the doctor helps, how consultations work, and what to do next.",
      mainPainPoints: ["The doctor's expertise is reduced to a short biography.", "Medical content does not match real patient search intent.", "Consultation requests lack context before the first contact."],
      tiktalinkSolutions: ["Authority-led personal website with specialty, education, and consultation structure.", "Medical SEO pages written around patient questions and conditions.", "Consultation intake flow that captures reason, timing, and preferred channel."],
      exampleWebsiteSections: ["Doctor Profile", "Specialties", "Conditions", "Consultation", "Patient Guides", "Publications", "FAQ", "Contact"],
      digitalSystems: ["Personal brand website", "Specialist content hub", "Consultation funnel", "Patient guide library"],
      aiSystems: ["AI FAQ assistant", "Consultation readiness prompts", "Condition content navigator", "Knowledge-base assistant"],
      seoStrategy: ["Specialty and condition pages", "Doctor entity schema", "Medical FAQ structure", "Local and professional search optimization"],
      googleVisibility: ["Profile consistency", "Clinic/location linking", "Review architecture where appropriate", "Search intent mapping"],
      socialMediaSystem: ["Educational posts", "Professional updates", "Short patient guidance content", "Authority-building content calendar"],
      automationOpportunities: ["Consultation intake", "Document checklist", "Reminder messages", "Referral routing"],
      conversionFlow: ["Doctor search", "Authority profile", "Condition page", "Consultation request", "Prepared response"],
      trustElements: ["Education", "Experience", "Specialty focus", "Publications", "Ethical disclaimers"],
      sampleJourney: journey.en,
      ctaTitle: "Build a doctor authority system.",
      ctaText: "Request a specialist digital presence blueprint.",
      cardDescription: "Personal authority, medical SEO, consultation flow, and patient education.",
    },
    {
      title: "Doktorlar",
      shortTitle: "Doktor",
      metaTitle: "Doktor Web Sitesi, Medikal SEO ve Randevu Sistemleri | Tiktalink",
      metaDescription: "Doktorlar için uzman profil web sitesi, medikal SEO, danışma akışları ve hasta eğitiminden oluşan kişisel dijital otorite sistemi.",
      heroHeadline: "Doktorlar için kişisel otorite altyapısı.",
      heroSubheadline: "Güven, açıklık, keşfedilebilirlik ve etik danışma dönüşümü isteyen uzman hekimler için odaklı model.",
      badge: "Profesyonel otorite planı",
      overview: "Bir hekimin dijital varlığı uzmanlığı, etiği, erişilebilirliği ve sakin güveni anlatmalıdır. Hasta hekimin kime yardımcı olduğunu, danışmanın nasıl ilerlediğini ve sonraki adımı anlamalıdır.",
      mainPainPoints: ["Hekim uzmanlığı kısa bir biyografiye indirgenir.", "Medikal içerik gerçek hasta arama niyetiyle eşleşmez.", "Danışma talepleri ilk temastan önce yeterli bağlam içermez."],
      tiktalinkSolutions: ["Uzmanlık, eğitim ve danışma yapısıyla otorite odaklı kişisel web sitesi.", "Hasta soruları ve durumları etrafında yazılmış medikal SEO sayfaları.", "Sebep, zamanlama ve tercih edilen kanal bilgisini alan danışma akışı."],
      exampleWebsiteSections: ["Hekim Profili", "Uzmanlıklar", "Durumlar", "Danışma", "Hasta Rehberleri", "Yayınlar", "SSS", "İletişim"],
      digitalSystems: ["Kişisel marka web sitesi", "Uzman içerik merkezi", "Danışma hunisi", "Hasta rehber kütüphanesi"],
      aiSystems: ["AI SSS asistanı", "Danışma hazırlık soruları", "Durum içeriği yönlendiricisi", "Bilgi tabanı asistanı"],
      seoStrategy: ["Uzmanlık ve durum sayfaları", "Hekim entity schema", "Medikal SSS yapısı", "Yerel ve profesyonel arama optimizasyonu"],
      googleVisibility: ["Profil tutarlılığı", "Klinik/konum bağlantısı", "Uygun yorum mimarisi", "Arama niyeti haritalama"],
      socialMediaSystem: ["Eğitici paylaşımlar", "Profesyonel güncellemeler", "Kısa hasta bilgilendirme içerikleri", "Otorite içerik takvimi"],
      automationOpportunities: ["Danışma ön kabulü", "Belge kontrol listesi", "Hatırlatma mesajları", "Yönlendirme akışı"],
      conversionFlow: ["Doktor araması", "Otorite profili", "Durum sayfası", "Danışma talebi", "Hazırlanmış yanıt"],
      trustElements: ["Eğitim", "Deneyim", "Uzmanlık odağı", "Yayınlar", "Etik bilgilendirme notları"],
      sampleJourney: journey.tr,
      ctaTitle: "Doktor otorite sistemini kurun.",
      ctaText: "Uzman dijital varlık planı talep edin.",
      cardDescription: "Kişisel otorite, medikal SEO, danışma akışı ve hasta eğitimi.",
    },
    "doctors",
    "DR"
  ),
];

const additional: string[][] = [
  ["lawyers", "LW", "Lawyers", "Law Firm Authority System | Tiktalink", "legal authority, practice-area SEO, consultation funnels, confidential inquiry routing, and trust architecture", "Authority systems for modern law firms.", "practice areas, local search, confidential consultation, and legal trust", "Avukatlar", "AV", "Hukuk büroları için otorite sistemi.", "uzmanlık alanları, yerel arama, gizli danışma ve hukuki güven"],
  ["pharmacies", "PH", "Pharmacies", "Pharmacy Website, Local SEO & Availability Systems | Tiktalink", "local pharmacy visibility, product/service information, availability inquiry, delivery signals, and health content", "Local digital clarity for pharmacies.", "availability, local SEO, delivery/contact flow, and health information", "Eczaneler", "EC", "Eczaneler için yerel dijital netlik.", "stok/uygunluk, yerel SEO, teslimat/iletişim akışı ve sağlık bilgilendirmesi"],
  ["beauty-centers", "BT", "Beauty Centers", "Beauty Center Website, Booking & Social Trust Systems | Tiktalink", "premium service pages, before/after governance, booking flows, social proof, Instagram structure, and local SEO", "Premium digital presence for beauty centers.", "visual trust, booking, service menus, social proof, and local discovery", "Güzellik Merkezleri", "GZ", "Güzellik merkezleri için premium dijital varlık.", "görsel güven, rezervasyon, hizmet menüleri, sosyal kanıt ve yerel keşif"],
  ["restaurants", "RS", "Restaurants", "Restaurant Website, Menu, Reservation & Google Systems | Tiktalink", "menu websites, Google Maps optimization, reservations, reviews, QR menu systems, delivery links, and social media structure", "A connected discovery layer for restaurants.", "menu, reservation, Google Maps, reviews, delivery, and social content", "Restoranlar", "RS", "Restoranlar için bağlantılı keşif katmanı.", "menü, rezervasyon, Google Maps, yorumlar, teslimat ve sosyal içerik"],
  ["real-estate", "RE", "Real Estate", "Real Estate Website, Listings & Lead Systems | Tiktalink", "property listings, neighborhood pages, lead capture, WhatsApp inquiry, agent authority, and local SEO", "Digital infrastructure for property visibility.", "listings, neighborhood SEO, lead capture, WhatsApp inquiry, and agent trust", "Gayrimenkul", "GM", "Gayrimenkul görünürlüğü için dijital altyapı.", "ilanlar, bölge SEO'su, lead toplama, WhatsApp talebi ve danışman güveni"],
  ["car-dealerships", "CD", "Car Dealerships", "Car Dealership Website, Inventory & Lead Systems | Tiktalink", "vehicle inventory, financing requests, test drive flows, reviews, Google visibility, and lead routing", "Vehicle discovery and lead flow infrastructure.", "inventory, financing, test drive, trust, reviews, and lead routing", "Oto Galerileri", "OG", "Araç keşfi ve lead akışı altyapısı.", "stok, finansman, test sürüşü, güven, yorumlar ve lead yönlendirme"],
  ["hotels", "HT", "Hotels", "Hotel Website, Booking & Multilingual Visibility | Tiktalink", "room pages, location SEO, reviews, multilingual pages, direct booking conversion, and guest inquiry systems", "A direct-booking digital layer for hotels.", "rooms, location, multilingual SEO, reviews, and direct booking conversion", "Oteller", "OT", "Oteller için direkt rezervasyon dijital katmanı.", "odalar, konum, çok dilli SEO, yorumlar ve direkt rezervasyon dönüşümü"],
  ["factories", "FC", "Factories", "Factory Website, B2B Catalog & Export Visibility | Tiktalink", "capabilities, certifications, production process, B2B catalog, export pages, RFQ forms, and multilingual visibility", "Industrial digital infrastructure for factories.", "capabilities, certifications, production trust, B2B catalogs, and export inquiries", "Fabrikalar", "FB", "Fabrikalar için endüstriyel dijital altyapı.", "kapasite, sertifikalar, üretim güveni, B2B kataloglar ve ihracat talepleri"],
  ["manufacturers", "MF", "Manufacturers", "Manufacturer Product Catalog, SEO & RFQ Systems | Tiktalink", "product catalogs, technical specs, certifications, buyer trust, RFQ forms, and B2B SEO", "Searchable product infrastructure for manufacturers.", "product catalogs, specs, certifications, RFQ, global buyer trust, and B2B SEO", "Üreticiler", "ÜR", "Üreticiler için aranabilir ürün altyapısı.", "ürün katalogları, teknik bilgiler, sertifikalar, RFQ, global alıcı güveni ve B2B SEO"],
  ["exporters", "EX", "Exporters", "Exporter Website, Multilingual SEO & Buyer Inquiry Systems | Tiktalink", "international visibility, multilingual pages, trade trust, product catalogs, shipping capability, and buyer inquiry workflows", "Global visibility systems for exporters.", "multilingual SEO, trade trust, product catalogs, shipping capability, and buyer inquiries", "İhracatçılar", "İH", "İhracatçılar için küresel görünürlük sistemleri.", "çok dilli SEO, ticari güven, ürün katalogları, lojistik kabiliyeti ve alıcı talepleri"],
  ["local-businesses", "LB", "Local Businesses", "Local Business Website, Google Business & Review Systems | Tiktalink", "local SEO, Google Business optimization, reviews, mobile website, service pages, and contact flows", "From local presence to connected visibility.", "local SEO, Google Business, mobile website, reviews, service pages, and contact flow", "Yerel İşletmeler", "Yİ", "Yerel varlıktan bağlantılı görünürlüğe.", "yerel SEO, Google Business, mobil web sitesi, yorumlar, hizmet sayfaları ve iletişim akışı"],
  ["b2b-companies", "B2B", "B2B Companies", "B2B Website, Authority Content & Lead Infrastructure | Tiktalink", "lead generation, authority content, service pages, case-study structure, CRM flow, and analytics", "A sharper operating layer for B2B companies.", "lead generation, authority content, CRM flow, analytics, and sales-ready service pages", "B2B Şirketler", "B2B", "B2B şirketler için daha keskin operasyon katmanı.", "lead üretimi, otorite içeriği, CRM akışı, analitik ve satışa hazır hizmet sayfaları"],
  ["startups", "ST", "Startups", "Startup Landing Page, Product Positioning & Launch Systems | Tiktalink", "product positioning, investor-ready design, waitlists, demo flows, analytics, and launch systems", "Investor-ready launch infrastructure for startups.", "positioning, landing pages, waitlists, demos, analytics, and launch systems", "Startuplar", "ST", "Startuplar için yatırımcıya hazır lansman altyapısı.", "konumlandırma, landing page, bekleme listesi, demo akışı, analitik ve lansman sistemleri"],
  ["professional-services", "PS", "Professional Services", "Professional Services Website, SEO & Consultation Systems | Tiktalink", "credibility architecture, service explanation, consultation booking, SEO pages, authority content, and trust systems", "Credibility infrastructure for professional services.", "service explanation, consultation booking, SEO pages, trust architecture, and authority content", "Profesyonel Hizmetler", "PH", "Profesyonel hizmetler için güvenilirlik altyapısı.", "hizmet açıklığı, danışma rezervasyonu, SEO sayfaları, güven mimarisi ve otorite içeriği"],
];

function fromCompact([
  slug,
  icon,
  title,
  metaTitle,
  descriptor,
  headline,
  focus,
  trTitle,
  trIcon,
  trHeadline,
  trFocus,
]: string[]): IndustryPage {
  return industry(
    {
      title,
      shortTitle: title,
      metaTitle,
      metaDescription: `Tiktalink builds sector-specific digital infrastructure for ${title.toLowerCase()}, including ${descriptor}.`,
      heroHeadline: headline,
      heroSubheadline: `Sector blueprint for ${title.toLowerCase()} that need ${focus}.`,
      badge: "Sector transformation model",
      overview: `${title} need digital systems that explain value clearly, reduce friction, increase trust, and connect discovery with qualified demand.`,
      mainPainPoints: [`${title} often look generic online.`, "Search visibility and conversion paths are disconnected.", "Inquiries arrive without enough context for fast follow-up."],
      tiktalinkSolutions: ["Industry-specific website architecture", "SEO and Google visibility foundation", "Lead capture, routing, and automation workflows"],
      exampleWebsiteSections: ["Home", "Services", "About", "Trust", "FAQ", "Contact", "AI Assistant", "Google Maps", "Insights"],
      digitalSystems: ["Website infrastructure", "Service page system", "Lead capture flow", "Analytics foundation", "Trust module"],
      aiSystems: ["AI inquiry assistant", "FAQ automation", "Lead qualification prompts", "Knowledge base"],
      seoStrategy: ["Service-intent pages", "Local or B2B keyword mapping", "FAQ schema", "Internal link architecture"],
      googleVisibility: ["Google Business readiness", "Review structure", "Service taxonomy", "Location and contact consistency"],
      socialMediaSystem: ["Authority content", "Service education", "Trust posts", "Channel consistency"],
      automationOpportunities: ["Inquiry routing", "Follow-up reminders", "CRM handoff", "Review requests"],
      conversionFlow: ["Search or social discovery", "Sector-specific page", "Trust proof", "Form or AI assistant", "Qualified follow-up"],
      trustElements: ["Credentials", "Reviews", "Clear service explanations", "Process clarity", "Contact confidence"],
      sampleJourney: journey.en,
      ctaTitle: `Build this system for ${title.toLowerCase()}.`,
      ctaText: "Request an industry-specific digital infrastructure blueprint.",
      cardDescription: focus,
    },
    {
      title: trTitle,
      shortTitle: trTitle,
      metaTitle: `${trTitle} İçin Web Sitesi, SEO ve Dijital Altyapı | Tiktalink`,
      metaDescription: `Tiktalink ${trTitle.toLowerCase()} için ${trFocus} odağında sektöre özel dijital altyapı kurar.`,
      heroHeadline: trHeadline,
      heroSubheadline: `${trTitle} için ${trFocus} ihtiyacını tek dijital sistemde birleştiren sektör planı.`,
      badge: "Sektör dönüşüm modeli",
      overview: `${trTitle}; değeri net anlatan, sürtünmeyi azaltan, güveni artıran ve keşfi nitelikli taleple birleştiren dijital sistemlere ihtiyaç duyar.`,
      mainPainPoints: [`${trTitle} çevrim içi ortamda çoğu zaman jenerik görünür.`, "Arama görünürlüğü ve dönüşüm yolları kopuktur.", "Talepler hızlı takip için yeterli bağlamla gelmez."],
      tiktalinkSolutions: ["Sektöre özel web sitesi mimarisi", "SEO ve Google görünürlük temeli", "Lead toplama, yönlendirme ve otomasyon iş akışları"],
      exampleWebsiteSections: ["Ana sayfa", "Hizmetler", "Hakkında", "Güven", "SSS", "İletişim", "AI Asistan", "Google Maps", "İçgörüler"],
      digitalSystems: ["Web sitesi altyapısı", "Hizmet sayfa sistemi", "Lead toplama akışı", "Analitik temeli", "Güven modülü"],
      aiSystems: ["AI talep asistanı", "SSS otomasyonu", "Lead nitelendirme soruları", "Bilgi tabanı"],
      seoStrategy: ["Hizmet niyeti sayfaları", "Yerel veya B2B anahtar kelime haritası", "SSS schema", "İç bağlantı mimarisi"],
      googleVisibility: ["Google Business hazırlığı", "Yorum yapısı", "Hizmet taksonomisi", "Konum ve iletişim tutarlılığı"],
      socialMediaSystem: ["Otorite içeriği", "Hizmet eğitimi", "Güven paylaşımları", "Kanal tutarlılığı"],
      automationOpportunities: ["Talep yönlendirme", "Takip hatırlatmaları", "CRM aktarımı", "Yorum talepleri"],
      conversionFlow: ["Arama veya sosyal keşif", "Sektöre özel sayfa", "Güven kanıtı", "Form veya AI asistan", "Nitelikli takip"],
      trustElements: ["Yetkinlikler", "Yorumlar", "Net hizmet açıklamaları", "Süreç açıklığı", "İletişim güveni"],
      sampleJourney: journey.tr,
      ctaTitle: `${trTitle} için bu sistemi kurun.`,
      ctaText: "Sektöre özel dijital altyapı planı talep edin.",
      cardDescription: trFocus,
    },
    slug,
    icon || trIcon
  );
}

industryPages.push(...additional.map(fromCompact));

export function getIndustryPage(slug: string) {
  return industryPages.find((industry) => industry.slug === slug);
}
