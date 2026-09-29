'use client';

import React, { useState } from 'react';
import { useClinicStore } from '@/lib/useClinicStore';
import { IntroCloudyLogo } from '@/components/IntroCloudyLogo';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';
import { SectionFadeIn } from '@/components/SectionFadeIn';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Statistics } from '@/components/Statistics';
import { TarificationSection } from '@/components/TreatmentsSection';
import { TreatmentModal } from '@/components/TreatmentModal';
import { WhyGHClinic } from '@/components/WhyGHClinic';
import { DoctorProfile } from '@/components/DoctorProfile';
import { Testimonials } from '@/components/Testimonials';
import { FAQSection } from '@/components/FAQSection';
import { LocationSection } from '@/components/LocationSection';
import { Footer } from '@/components/Footer';
import { FloatingActions } from '@/components/FloatingActions';
import { BookingModal } from '@/components/BookingModal';
import { DoctorDashboard } from '@/components/DoctorDashboard';
import { IOSQuickDock } from '@/components/IOSQuickDock';
import { IOSInstallGuide } from '@/components/IOSInstallGuide';
import { AndroidInstallBanner } from '@/components/AndroidInstallBanner';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { Treatment } from '@/lib/clinicData';

export default function HomePage() {
  const {
    settings,
    treatments,
    pricingCategories,
    testimonials,
    faqs,
    appointments,
    addAppointment,
    updateAppointmentStatus,
    deleteAppointment,
    updateTreatmentPrice,
    updateSettings,
    resetToDefault,
    addTestimonial,
  } = useClinicStore();

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingTreatmentId, setBookingTreatmentId] = useState<string | undefined>(undefined);
  const [bookingTreatmentName, setBookingTreatmentName] = useState<string | undefined>(undefined);

  const [isTreatmentModalOpen, setIsTreatmentModalOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(true);
  const [isIOSGuideOpen, setIsIOSGuideOpen] = useState(false);
  const [isAndroidInstallOpen, setIsAndroidInstallOpen] = useState(false);

  const handleOpenInstall = () => {
    if (typeof window === 'undefined') return;
    const ua = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      setIsIOSGuideOpen(true);
    } else {
      setIsAndroidInstallOpen(true);
    }
  };

  // Modal Handlers
  const handleOpenBooking = (treatmentIdentifier?: string) => {
    if (treatmentIdentifier) {
      setBookingTreatmentId(treatmentIdentifier);
      setBookingTreatmentName(treatmentIdentifier);
    } else {
      setBookingTreatmentId(undefined);
      setBookingTreatmentName(undefined);
    }
    setIsBookingOpen(true);
  };

  const handleReplayIntro = () => {
    setIsIntroOpen(true);
  };

  // Deep-link support: e.g. ?service=prp-visage or ?book=botox-full-face
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const serviceParam = params.get('service') || params.get('book') || params.get('soin');
      if (serviceParam) {
        const timer = setTimeout(() => {
          handleOpenBooking(serviceParam);
        }, 50);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleOpenTreatmentModal = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
    setIsTreatmentModalOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#0C0A09] text-stone-900 dark:text-stone-100 selection:bg-[#F4DCD6] dark:selection:bg-[#9E2A50]/40 selection:text-[#9E6B55] dark:selection:text-[#DFBA9D] transition-colors duration-300">
      
      {/* Offline Status & Connectivity Reassurance Indicator */}
      <OfflineIndicator />

      {/* Luxury Fixed Viewport Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Luxury Intro Cloudy Logo Animation */}
      <IntroCloudyLogo
        isOpen={isIntroOpen}
        onClose={() => setIsIntroOpen(false)}
      />

      {/* Luxury Navigation Bar */}
      <Navbar
        settings={settings}
        onOpenBooking={() => handleOpenBooking()}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onReplayIntro={handleReplayIntro}
        onOpenInstall={handleOpenInstall}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <SectionFadeIn>
          <Hero
            settings={settings}
            onOpenBooking={() => handleOpenBooking()}
            onExploreTreatments={() => scrollToSection('tarification')}
          />
        </SectionFadeIn>

        {/* 2. Statistical Highlights */}
        <SectionFadeIn>
          <Statistics />
        </SectionFadeIn>

        {/* 3. Tarification & Soins (4 Best-Sellers + Full Tariff Interface) */}
        <SectionFadeIn>
          <TarificationSection
            treatments={treatments}
            onSelectTreatment={handleOpenTreatmentModal}
            onBookTreatment={(treatmentId) => handleOpenBooking(treatmentId)}
          />
        </SectionFadeIn>

        {/* 4. The GH Standard & Excellence Pillars */}
        <SectionFadeIn>
          <WhyGHClinic />
        </SectionFadeIn>

        {/* 5. Doctor Profile & Medical Ethos */}
        <SectionFadeIn>
          <DoctorProfile
            settings={settings}
            onOpenBooking={() => handleOpenBooking()}
          />
        </SectionFadeIn>

        {/* 6. Patient Testimonials & Google Ratings */}
        <SectionFadeIn>
          <Testimonials
            testimonials={testimonials}
            onOpenBooking={() => handleOpenBooking()}
            onAddReview={addTestimonial}
          />
        </SectionFadeIn>

        {/* 7. Frequently Asked Questions */}
        <SectionFadeIn>
          <FAQSection
            faqs={faqs}
            onOpenBooking={() => handleOpenBooking()}
          />
        </SectionFadeIn>

        {/* 8. Geographic Location & Access (Khemis Miliana) */}
        <SectionFadeIn>
          <LocationSection
            settings={settings}
            onOpenBooking={() => handleOpenBooking()}
          />
        </SectionFadeIn>
      </main>

      {/* Floating Action Triggers (Desktop WhatsApp, Back to Top) */}
      <FloatingActions
        settings={settings}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* iOS Native Experience Quick Dock (Mobile Screen Optimization) */}
      <IOSQuickDock
        settings={settings}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* iOS Safari Home Screen Install Guide & Ambient Banner */}
      <IOSInstallGuide
        forceOpen={isIOSGuideOpen}
        onClose={() => setIsIOSGuideOpen(false)}
      />

      {/* Android Native 1-Click PWA Installation Banner & Dialog */}
      <AndroidInstallBanner
        forceOpen={isAndroidInstallOpen}
        onClose={() => setIsAndroidInstallOpen(false)}
      />

      {/* Luxury Footer */}
      <Footer
        settings={settings}
        onOpenBooking={() => handleOpenBooking()}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onReplayIntro={handleReplayIntro}
      />

      {/* ========================================================================= */}
      {/* INTERACTIVE MODALS & DRAWERS                                              */}
      {/* ========================================================================= */}

      {/* Booking Modal (4-step with WhatsApp dispatch) */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        treatments={treatments}
        settings={settings}
        preselectedTreatmentId={bookingTreatmentId}
        preselectedTreatmentName={bookingTreatmentName}
        onSaveAppointment={addAppointment}
      />

      {/* Medical Dossier Modal for Selected Treatment */}
      <TreatmentModal
        isOpen={isTreatmentModalOpen}
        treatment={selectedTreatment}
        onClose={() => setIsTreatmentModalOpen(false)}
        onBook={(treatmentId) => handleOpenBooking(treatmentId)}
      />

      {/* Doctor and Clinic Admin Portal */}
      {isDashboardOpen && (
        <DoctorDashboard
          appointments={appointments}
          treatments={treatments}
          pricingCategories={pricingCategories}
          settings={settings}
          onUpdateAppointmentStatus={updateAppointmentStatus}
          onDeleteAppointment={deleteAppointment}
          onUpdateTreatmentPrice={updateTreatmentPrice}
          onUpdateSettings={updateSettings}
          onResetData={resetToDefault}
          onClose={() => setIsDashboardOpen(false)}
        />
      )}

    </div>
  );
}
