'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  Download,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Check,
  Search,
  Tag,
  Info,
  ChevronRight,
  RefreshCw,
  Crown,
  Award
} from 'lucide-react';
import { Treatment, Appointment, ClinicSettings } from '@/lib/clinicData';
import { useLoyalty } from '@/hooks/useLoyalty';
import { calculatePointsFromPrice } from '@/lib/loyalty';
import { triggerHaptic } from '@/lib/iosHaptics';
import { useAndroidModalBack } from '@/hooks/useAndroidModalBack';
import {
  CENTRAL_SERVICES_CATALOG,
  Service,
  ServiceCategory,
  findServiceByIdOrName,
  getServiceById
} from '@/lib/servicesData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  treatments?: Treatment[];
  settings: ClinicSettings;
  preselectedTreatmentId?: string;
  preselectedTreatmentName?: string;
  onSaveAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => Appointment;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  treatments,
  settings,
  preselectedTreatmentId,
  preselectedTreatmentName,
  onSaveAppointment,
}) => {
  // Support Android physical back button & gesture navigation
  useAndroidModalBack(isOpen, onClose);

  // Helper to determine initial date (skipping Friday)
  const getInitialDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (tomorrow.getDay() === 5) {
      tomorrow.setDate(tomorrow.getDate() + 1);
    }
    return tomorrow.toISOString().split('T')[0];
  };

  // Helper to resolve initial service from Central Catalog
  const resolveInitialService = (): Service => {
    if (preselectedTreatmentId) {
      const found = findServiceByIdOrName(preselectedTreatmentId);
      if (found) return found;
    }
    if (preselectedTreatmentName) {
      const found = findServiceByIdOrName(preselectedTreatmentName);
      if (found) return found;
    }
    return CENTRAL_SERVICES_CATALOG[0];
  };

  const [selectedService, setSelectedService] = useState<Service>(resolveInitialService);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(() => {
    const init = resolveInitialService();
    return init.variants && init.variants.length > 0 ? init.variants[0].id : null;
  });
  const [isChangingService, setIsChangingService] = useState<boolean>(() => !preselectedTreatmentId && !preselectedTreatmentName);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>(getInitialDate);
  const [selectedTime, setSelectedTime] = useState<string>('10:30');

  // Patient details state
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('+213 ');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientCity, setPatientCity] = useState('Khemis Miliana');
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [notes, setNotes] = useState('');
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);
  const { simulateTreatmentPoints } = useLoyalty();

  // When props change, re-sync selected service and guarantee Step 1 displays it
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      if (preselectedTreatmentId || preselectedTreatmentName) {
        const match =
          findServiceByIdOrName(preselectedTreatmentId) ||
          findServiceByIdOrName(preselectedTreatmentName);
        if (match) {
          setSelectedService(match);
          setSelectedVariantId(match.variants && match.variants.length > 0 ? match.variants[0].id : null);
          setIsChangingService(false);
          setStep(1);
          return;
        }
      }
      setStep(1);
      setIsChangingService(true);
    }, 0);

    return () => clearTimeout(timer);
  }, [isOpen, preselectedTreatmentId, preselectedTreatmentName]);

  // Active Variant & Calculated Price
  const activeVariant = useMemo(() => {
    if (!selectedService.variants || selectedService.variants.length === 0) return null;
    return selectedService.variants.find((v) => v.id === selectedVariantId) || selectedService.variants[0];
  }, [selectedService, selectedVariantId]);

  const currentPriceDZD = useMemo(() => {
    if (activeVariant) return activeVariant.priceDZD;
    return selectedService.priceDZD;
  }, [selectedService, activeVariant]);

  // Filter catalog in Step 1
  const filteredCatalog = useMemo(() => {
    return CENTRAL_SERVICES_CATALOG.filter((service) => {
      // Category filter
      if (selectedCategoryFilter !== 'all') {
        if (selectedCategoryFilter === 'laser' && service.category !== 'laser') return false;
        if (selectedCategoryFilter === 'injectables' && !['botox', 'filler', 'injectables'].includes(service.category)) return false;
        if (selectedCategoryFilter === 'soins' && !['soins-visage', 'visage'].includes(service.category)) return false;
        if (selectedCategoryFilter === 'prp' && service.category !== 'prp') return false;
        if (selectedCategoryFilter === 'peeling' && service.category !== 'peeling') return false;
        if (selectedCategoryFilter === 'skinbooster' && service.category !== 'skinbooster') return false;
      }

      // Text Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = service.name.toLowerCase().includes(query);
        const matchAr = service.nameAr?.includes(query);
        const matchDesc = service.shortDescription.toLowerCase().includes(query);
        const matchCat = service.categoryLabel.toLowerCase().includes(query);
        const matchPrice = `${service.priceDZD}`.includes(query);
        return matchName || matchAr || matchDesc || matchCat || matchPrice;
      }

      return true;
    });
  }, [selectedCategoryFilter, searchQuery]);

  if (!isOpen) return null;

  const availableTimeSlots = [
    '09:30',
    '10:30',
    '11:30',
    '14:00',
    '15:00',
    '16:00',
    '17:00'
  ];

  // Calendar dates generator (next 14 days excluding Fridays)
  const getNextAvailableDays = () => {
    const days: { dateStr: string; dayName: string; dayNumber: number; monthName: string; isFriday: boolean }[] = [];
    const today = new Date();

    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const isFriday = d.getDay() === 5;
      const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
      const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

      days.push({
        dateStr: d.toISOString().split('T')[0],
        dayName: dayNames[d.getDay()],
        dayNumber: d.getDate(),
        monthName: monthNames[d.getMonth()],
        isFriday,
      });
    }
    return days;
  };

  const availableDays = getNextAvailableDays();

  // Booking completion
  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) {
      alert('Veuillez renseigner votre nom et votre numéro de téléphone.');
      return;
    }

    const fullTreatmentName = activeVariant
      ? `${selectedService.name} (${activeVariant.name})`
      : selectedService.name;

    const created = onSaveAppointment({
      patientName,
      patientPhone,
      patientEmail,
      patientCity,
      treatmentId: selectedService.id,
      treatmentName: fullTreatmentName,
      date: selectedDate,
      timeSlot: selectedTime,
      status: 'pending',
      notes: notes ? `[Option: ${activeVariant?.name || 'Standard'}] ${notes}` : `[Option: ${activeVariant?.name || 'Standard'}]`,
      isFirstVisit,
      totalPriceDZD: currentPriceDZD,
    });

    // Award loyalty points to patient
    simulateTreatmentPoints(fullTreatmentName, currentPriceDZD);

    setConfirmedAppointment(created);
    setStep(4);
  };

  // WhatsApp Pre-filled text
  const getWhatsAppBookingUrl = () => {
    if (!confirmedAppointment) return '#';
    const message = `Bonjour Dr. Ghaouat Sarra (GH Clinic),\n\nJe confirme ma demande de rendez-vous en ligne :\n• Référence : ${confirmedAppointment.id}\n• Patient(e) : ${confirmedAppointment.patientName}\n• Téléphone : ${confirmedAppointment.patientPhone}\n• Soin : ${confirmedAppointment.treatmentName}\n• Tarif : ${confirmedAppointment.totalPriceDZD.toLocaleString('fr-DZ')} DA\n• Date : ${confirmedAppointment.date} à ${confirmedAppointment.timeSlot}\n• Ville : ${confirmedAppointment.patientCity}\n\nMerci de bien vouloir me confirmer ce créneau.`;
    return `https://wa.me/${settings.whatsappPhone}?text=${encodeURIComponent(message)}`;
  };

  // Download .ics Calendar File
  const handleDownloadICS = () => {
    if (!confirmedAppointment) return;
    const [year, month, day] = confirmedAppointment.date.split('-').map(Number);
    const [hours, minutes] = confirmedAppointment.timeSlot.split(':').map(Number);

    const startDate = new Date(year, month - 1, day, hours, minutes);
    const endDate = new Date(startDate.getTime() + (selectedService.durationMinutes || 45) * 60000);

    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const formatDate = (date: Date) =>
      `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//GH Clinic//Dr Ghaouat Sarra//FR
BEGIN:VEVENT
UID:${confirmedAppointment.id}@ghclinic.dz
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:RDV GH Clinic — ${confirmedAppointment.treatmentName}
DESCRIPTION:Consultation & Soin avec Dr. Ghaouat Sarra à Khemis Miliana. Tel: ${settings.phone}
LOCATION:${settings.address}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `RDV-GH-Clinic-${confirmedAppointment.date}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto bg-black/65 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E5D4CB] my-auto max-h-[92dvh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Drag Handle Pill on Mobile */}
        <div className="sm:hidden pt-2.5 pb-1 flex justify-center bg-[#FAF8F5]">
          <div className="w-12 h-1.5 rounded-full bg-stone-300" />
        </div>

        {/* Continuous Linear Top Progress Bar */}
        <div className="w-full bg-pink-100/60 h-1.5 overflow-hidden relative shrink-0">
          <div
            className={`h-full transition-all duration-500 ease-out ${
              step === 4
                ? 'w-full bg-gradient-to-r from-emerald-500 to-emerald-400'
                : step === 3
                ? 'w-full bg-gradient-to-r from-[#C73859] via-[#D8436B] to-[#9E2A50]'
                : step === 2
                ? 'w-2/3 bg-gradient-to-r from-[#C73859] via-[#D8436B] to-[#9E2A50]'
                : 'w-1/3 bg-gradient-to-r from-[#C73859] to-[#D8436B]'
            }`}
          />
        </div>

        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-[#FAF8F5] border-b border-[#E5D4CB] flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C73859]" />
              <span className="text-[10px] sm:text-[11px] font-bold text-[#9E2A50] uppercase tracking-wider font-serif">
                GH CLINIC • Dr. Ghaouat Sarra • Khemis Miliana
              </span>
            </div>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-900 mt-0.5">
              {step === 4
                ? 'Réservation Confirmée !'
                : 'Planifiez Votre Soin Médical'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white text-stone-600 hover:text-stone-900 border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors shadow-2xs"
            aria-label="Fermer la fenêtre de réservation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Stepper Navigation (Steps 1 to 3) */}
        {step < 4 && (
          <div className="px-4 sm:px-6 py-3 bg-white border-b border-stone-100 space-y-2 shrink-0">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-stone-900">
                  Étape {step} sur 3
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-stone-500 font-medium hidden sm:inline">
                  {step === 1 && 'Choix du soin dans le catalogue complet'}
                  {step === 2 && 'Sélection de la date & de l’horaire'}
                  {step === 3 && 'Vos coordonnées & confirmation'}
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 border border-pink-200 text-[#9E2A50] font-bold text-[11px]">
                <Sparkles className="w-3 h-3 text-[#C73859]" />
                <span>
                  {step === 1 && '33%'}
                  {step === 2 && '66%'}
                  {step === 3 && '100%'}
                </span>
              </div>
            </div>

            {/* Step Nodes */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setStep(1)}
                className={`flex items-center gap-2 text-left p-1.5 rounded-xl transition-all ${
                  step === 1 ? 'bg-pink-50/70 border border-pink-200/80' : 'hover:bg-stone-50'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-all ${
                    step > 1
                      ? 'bg-emerald-600 text-white'
                      : step === 1
                      ? 'bg-[#C73859] text-white ring-4 ring-[#C73859]/20'
                      : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {step > 1 ? <Check className="w-3.5 h-3.5" /> : '1'}
                </span>
                <div className="min-w-0">
                  <div className={`text-xs font-semibold truncate ${step >= 1 ? 'text-stone-900' : 'text-stone-400'}`}>
                    1. Soin
                  </div>
                  <div className="text-[10px] text-[#9E2A50] truncate font-medium hidden sm:block">
                    {selectedService ? selectedService.name : 'Choisir'}
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (selectedService) setStep(2);
                }}
                className={`flex items-center gap-2 text-left p-1.5 rounded-xl transition-all ${
                  step === 2 ? 'bg-pink-50/70 border border-pink-200/80' : 'hover:bg-stone-50'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-all ${
                    step > 2
                      ? 'bg-emerald-600 text-white'
                      : step === 2
                      ? 'bg-[#C73859] text-white ring-4 ring-[#C73859]/20'
                      : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {step > 2 ? <Check className="w-3.5 h-3.5" /> : '2'}
                </span>
                <div className="min-w-0">
                  <div className={`text-xs font-semibold truncate ${step >= 2 ? 'text-stone-900' : 'text-stone-400'}`}>
                    2. Créneau
                  </div>
                  <div className="text-[10px] text-stone-500 truncate hidden sm:block">
                    {selectedTime} ({selectedDate.slice(5)})
                  </div>
                </div>
              </button>

              <div
                className={`flex items-center gap-2 text-left p-1.5 rounded-xl transition-all ${
                  step === 3 ? 'bg-pink-50/70 border border-pink-200/80' : ''
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-all ${
                    step === 3
                      ? 'bg-[#C73859] text-white ring-4 ring-[#C73859]/20'
                      : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  3
                </span>
                <div className="min-w-0">
                  <div className={`text-xs font-semibold truncate ${step === 3 ? 'text-stone-900' : 'text-stone-400'}`}>
                    3. Patient
                  </div>
                  <div className="text-[10px] text-stone-400 truncate hidden sm:block">
                    Coordonnées
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">

          {/* ========================================================================= */}
          {/* STEP 1: CHOOSE OR CONFIRM SERVICE FROM CENTRAL CATALOG                    */}
          {/* ========================================================================= */}
          {step === 1 && (
            <div className="space-y-5">
              
              {/* Featured Selected Service Card (Always highlighted and verified) */}
              <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-rose-50/90 via-pink-50/70 to-[#FFF5F7] border-2 border-[#C73859]/30 shadow-xs relative overflow-hidden">
                {/* Top badges: Confirmed Selection, Category, Availability */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C73859] text-white text-xs font-semibold shadow-2xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-pink-200" />
                      <span>Soin sélectionné</span>
                    </span>
                    <span className="text-[11px] font-bold font-serif uppercase tracking-wider text-[#C73859] bg-white/90 px-2.5 py-0.5 rounded-full border border-pink-200">
                      {selectedService.categoryLabel}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {selectedService.availability || 'Disponible immédiatement'}
                  </span>
                </div>

                {/* Service Details: Name, Arabic, Description, Price & Duration */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 tracking-tight">
                      {selectedService.name}
                    </h3>
                    {selectedService.nameAr && (
                      <p className="text-xs text-stone-500 font-medium mt-0.5" dir="rtl">
                        {selectedService.nameAr}
                      </p>
                    )}
                    <p className="text-xs sm:text-sm text-stone-600 font-light mt-2 leading-relaxed">
                      {selectedService.shortDescription}
                    </p>
                  </div>

                  {/* Price & Duration Box */}
                  <div className="shrink-0 p-3 sm:p-4 rounded-2xl bg-white/95 border border-pink-200 shadow-2xs flex sm:flex-col items-center sm:items-end justify-between gap-2 min-w-[150px]">
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider block sm:text-right">Tarif officiel</span>
                      <div className="flex items-baseline gap-1.5 sm:justify-end">
                        <span className="font-serif font-bold text-xl sm:text-2xl text-[#8E2842]">
                          {currentPriceDZD.toLocaleString('fr-DZ')} DA
                        </span>
                        {selectedService.originalPriceDZD && !activeVariant && (
                          <span className="text-xs text-stone-400 line-through">
                            {selectedService.originalPriceDZD.toLocaleString('fr-DZ')} DA
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-xs text-stone-700 bg-pink-50 px-2.5 py-1 rounded-full border border-pink-100">
                      <Clock className="w-3.5 h-3.5 text-[#C73859]" />
                      <span>{activeVariant?.durationMinutes || selectedService.durationMinutes} min</span>
                    </div>
                  </div>
                </div>

                {/* Optional Service Variants (e.g. 1 séance vs 3 séances, or botox zones) */}
                {selectedService.variants && selectedService.variants.length > 0 && (
                  <div className="mt-4 pt-3.5 border-t border-pink-200/80">
                    <label className="block text-xs font-serif font-bold text-[#8E2842] uppercase tracking-wider mb-2">
                      Choisissez votre formule ou option :
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedService.variants.map((v) => {
                        const isVarSelected = (selectedVariantId || selectedService.variants![0].id) === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setSelectedVariantId(v.id)}
                            className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                              isVarSelected
                                ? 'bg-white border-[#C73859] shadow-xs ring-2 ring-[#C73859]/20'
                                : 'bg-white/60 border-stone-200 hover:bg-white hover:border-pink-200'
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className={`w-2 h-2 rounded-full ${isVarSelected ? 'bg-[#C73859]' : 'bg-stone-300'}`} />
                                <span className="text-xs font-bold text-stone-900">{v.name}</span>
                              </div>
                              {v.description && (
                                <span className="text-[10px] text-stone-500 block pl-3.5 mt-0.5">{v.description}</span>
                              )}
                            </div>
                            <div className="text-right pl-2">
                              <span className="font-serif font-bold text-xs text-[#8E2842]">
                                {v.priceDZD.toLocaleString('fr-DZ')} DA
                              </span>
                              {v.durationMinutes && (
                                <span className="text-[10px] text-stone-400 block">{v.durationMinutes} min</span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Card Action Controls */}
                <div className="mt-4 pt-3 border-t border-pink-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setIsChangingService((prev) => !prev)}
                    className="text-xs text-stone-600 hover:text-[#C73859] font-medium inline-flex items-center gap-1.5 transition-colors order-2 sm:order-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#C73859]" />
                    <span>
                      {isChangingService ? 'Masquer le catalogue' : 'Changer de soin (catalogue complet 35+ soins)'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C73859] via-[#D8436B] to-[#9E2A50] text-white text-xs sm:text-sm font-semibold hover:brightness-105 shadow-xs flex items-center justify-center gap-2 order-1 sm:order-2 transition-all"
                  >
                    <span>Étape 2 : Date & Heure</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Complete Catalogue Browser (Toggled or Always Available) */}
              {isChangingService && (
                <div className="space-y-4 pt-2 border-t border-stone-200/70 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-serif font-bold text-base text-stone-900">
                        Catalogue Complet des Soins & Tarifs GH CLINIC
                      </h4>
                      <p className="text-xs text-stone-500 font-light">
                        Cliquez sur n’importe quelle prestation ci-dessous pour la sélectionner.
                      </p>
                    </div>
                    <div className="text-xs font-bold font-serif text-[#C73859] bg-rose-50 px-3 py-1 rounded-full border border-pink-200 shrink-0 self-start sm:self-auto">
                      {filteredCatalog.length} prestations disponibles
                    </div>
                  </div>

                  {/* Live Search & Filter Bar */}
                  <div className="space-y-2.5">
                    <div className="relative">
                      <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Rechercher par soin, zone (ex: PRP, Botox, Laser visage, Lèvres, Peeling...)"
                        className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-pink-200/90 focus:border-[#C73859] focus:ring-2 focus:ring-[#C73859]/20 focus:outline-hidden text-xs text-stone-900 bg-white"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
                        >
                          Effacer
                        </button>
                      )}
                    </div>

                    {/* Category Pills Filter */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
                      {[
                        { id: 'all', label: 'Tous les soins' },
                        { id: 'laser', label: 'Épilation Laser' },
                        { id: 'injectables', label: 'Injectables & Botox' },
                        { id: 'soins', label: 'Soins Visage & Hydra' },
                        { id: 'prp', label: 'PRP' },
                        { id: 'peeling', label: 'Peelings' },
                        { id: 'skinbooster', label: 'Skinboosters' },
                      ].map((tab) => {
                        const isActive = selectedCategoryFilter === tab.id;
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => setSelectedCategoryFilter(tab.id)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                              isActive
                                ? 'bg-[#C73859] text-white shadow-xs'
                                : 'bg-[#FAF8F5] text-stone-700 hover:bg-rose-50 border border-stone-200/80 hover:border-pink-200'
                            }`}
                          >
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Service Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 max-h-[380px] overflow-y-auto pr-1">
                    {filteredCatalog.length === 0 ? (
                      <div className="col-span-2 text-center py-12 space-y-2 bg-[#FAF8F5] rounded-3xl border border-stone-200">
                        <Search className="w-8 h-8 text-stone-400 mx-auto" />
                        <p className="font-serif font-bold text-sm text-stone-800">
                          Aucun soin ne correspond à votre recherche
                        </p>
                        <p className="text-xs text-stone-500">
                          Essayez un autre mot-clé ou réinitialisez les filtres.
                        </p>
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setSelectedCategoryFilter('all');
                          }}
                          className="mt-2 px-4 py-1.5 rounded-full bg-white border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50"
                        >
                          Voir tous les soins
                        </button>
                      </div>
                    ) : (
                      filteredCatalog.map((service) => {
                        const isSelected = selectedService.id === service.id;
                        return (
                          <div
                            key={service.id}
                            onClick={() => {
                              setSelectedService(service);
                              setSelectedVariantId(service.variants && service.variants.length > 0 ? service.variants[0].id : null);
                            }}
                            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                              isSelected
                                ? 'bg-rose-50/70 border-[#C73859] shadow-md ring-2 ring-[#C73859]/20'
                                : 'bg-white border-stone-200 hover:border-pink-300 hover:shadow-xs'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] font-bold font-serif uppercase tracking-wider text-[#C73859] bg-rose-100/60 px-2 py-0.5 rounded-md">
                                  {service.categoryLabel}
                                </span>
                                {service.nameAr && (
                                  <span className="text-[11px] text-stone-500 font-medium" dir="rtl">
                                    {service.nameAr}
                                  </span>
                                )}
                              </div>

                              <h5 className="font-serif font-bold text-stone-900 text-sm group-hover:text-[#C73859] transition-colors">
                                {service.name}
                              </h5>

                              <p className="text-xs text-stone-500 font-light mt-1 line-clamp-2 leading-relaxed">
                                {service.shortDescription}
                              </p>

                              {service.variants && service.variants.length > 0 && (
                                <div className="mt-2 flex items-center gap-1 text-[11px] text-[#9E2A50] font-medium">
                                  <Tag className="w-3 h-3 text-[#C73859]" />
                                  <span>{service.variants.length} formules / zones au choix</span>
                                </div>
                              )}
                            </div>

                            <div className="pt-2.5 mt-2.5 border-t border-stone-100 flex items-center justify-between">
                              <div className="flex items-baseline gap-1.5">
                                <span className="font-serif font-bold text-sm sm:text-base text-[#8E2842]">
                                  {service.priceDZD.toLocaleString('fr-DZ')} DA
                                </span>
                                {service.originalPriceDZD && (
                                  <span className="text-xs text-stone-400 line-through">
                                    {service.originalPriceDZD.toLocaleString('fr-DZ')} DA
                                  </span>
                                )}
                              </div>

                              <span
                                className={`text-[11px] font-semibold flex items-center gap-1 ${
                                  isSelected ? 'text-[#C73859] font-bold' : 'text-stone-500 group-hover:text-[#C73859]'
                                }`}
                              >
                                <span>{isSelected ? 'Sélectionné ✓' : 'Choisir'}</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: CHOOSE DATE, TIME & SELECT VARIANTS                               */}
          {/* ========================================================================= */}
          {step === 2 && (
            <div className="space-y-6">
              
              {/* Selected Service Recap Card with Variant Switcher */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-50/90 to-pink-50/70 border border-pink-200/90 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#C73859] font-serif">
                      Soin Sélectionné ({selectedService.categoryLabel})
                    </span>
                    <h4 className="font-serif font-bold text-lg text-stone-900">
                      {selectedService.name}
                    </h4>
                    {selectedService.shortDescription && (
                      <p className="text-xs text-stone-600 font-light mt-0.5 line-clamp-2">
                        {selectedService.shortDescription}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => setStep(1)}
                    className="shrink-0 px-3 py-1 rounded-full bg-white hover:bg-rose-50 border border-pink-200 text-xs font-semibold text-[#9E2A50] transition-colors shadow-2xs"
                  >
                    Changer de soin
                  </button>
                </div>

                {/* Optional Service Variants Selector (e.g. 1 séance vs 3 séances, or botox zones) */}
                {selectedService.variants && selectedService.variants.length > 0 && (
                  <div className="pt-2 border-t border-pink-200/60 space-y-2">
                    <label className="block text-xs font-serif font-bold text-[#8E2842] uppercase tracking-wider">
                      Choisissez votre formule ou option :
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedService.variants.map((v) => {
                        const isVarSelected = activeVariant?.id === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setSelectedVariantId(v.id)}
                            className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                              isVarSelected
                                ? 'bg-white border-[#C73859] shadow-xs ring-2 ring-[#C73859]/20'
                                : 'bg-white/60 border-stone-200 hover:border-pink-200'
                            }`}
                          >
                            <div>
                              <div className="text-xs font-bold text-stone-900">{v.name}</div>
                              {v.durationMinutes && <span className="text-[10px] text-stone-500">{v.durationMinutes} min</span>}
                            </div>
                            <span className="font-serif font-bold text-sm text-[#8E2842]">
                              {v.priceDZD.toLocaleString('fr-DZ')} DA
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs pt-2 border-t border-pink-200/60 font-medium text-stone-700">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C73859]" />
                    <span>Durée estimée : {activeVariant?.durationMinutes || selectedService.durationMinutes} min</span>
                  </span>
                  <span className="font-serif font-bold text-base text-[#8E2842]">
                    Tarif : {currentPriceDZD.toLocaleString('fr-DZ')} DA
                  </span>
                </div>
              </div>

              {/* Date Selection Carousel */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider font-serif">
                    1. Choisissez la date de consultation :
                  </label>
                  <span className="text-[11px] text-stone-500 italic">
                    Vendredi : Jour de repos
                  </span>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none">
                  {availableDays.map((day) => {
                    const isSelected = selectedDate === day.dateStr;
                    return (
                      <button
                        key={day.dateStr}
                        type="button"
                        disabled={day.isFriday}
                        onClick={() => setSelectedDate(day.dateStr)}
                        className={`shrink-0 w-16 py-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                          day.isFriday
                            ? 'bg-stone-100 border-stone-200 opacity-40 cursor-not-allowed text-stone-400'
                            : isSelected
                            ? 'bg-gradient-to-b from-[#C73859] to-[#9E2A50] text-white border-[#9E2A50] shadow-md scale-102'
                            : 'bg-white border-stone-200 hover:border-pink-300 text-stone-800'
                        }`}
                      >
                        <span className="text-[10px] font-semibold uppercase">{day.dayName}</span>
                        <span className="text-lg font-serif font-bold my-0.5">{day.dayNumber}</span>
                        <span className="text-[9px] opacity-80">{day.monthName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slot Selection */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider font-serif">
                  2. Choisissez votre créneau horaire :
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {availableTimeSlots.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`py-3 rounded-xl border text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#C73859] text-white border-[#C73859] shadow-xs'
                            : 'bg-white border-stone-200 hover:border-pink-300 text-stone-800'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5 text-pink-200" />
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 bg-rose-50/50 rounded-2xl border border-pink-200/80 text-xs text-stone-600 flex items-center gap-2">
                <Info className="w-4 h-4 text-[#C73859] shrink-0" />
                <span>
                  Consultation personnalisée avec <strong>Dr. Ghaouat Sarra</strong> à la clinique de Khemis Miliana.
                </span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3: PATIENT CONTACT INFORMATION FORM                                  */}
          {/* ========================================================================= */}
          {step === 3 && (
            <form id="booking-patient-form" onSubmit={handleCompleteBooking} className="space-y-4">
              
              {/* Order Recap Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 border border-pink-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase font-bold font-serif">Récapitulatif</span>
                  <div className="font-serif font-bold text-sm text-stone-900">
                    {selectedService.name} {activeVariant && `• ${activeVariant.name}`}
                  </div>
                  <div className="text-stone-600 text-[11px] mt-0.5">
                    Date : <strong>{selectedDate}</strong> à <strong>{selectedTime}</strong>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-500 uppercase block">Total estimé</span>
                  <span className="font-serif font-bold text-lg text-[#8E2842]">
                    {currentPriceDZD.toLocaleString('fr-DZ')} DA
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                    +{calculatePointsFromPrice(currentPriceDZD)} pts GH Privilège
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="font-serif font-bold text-lg text-stone-900">
                  Vos Coordonnées Patient
                </h4>
                <p className="text-xs text-stone-500 font-light">
                  Renseignez vos coordonnées pour valider votre fiche de réservation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nom & Prénom *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: Amina Benali"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-200 focus:border-[#C73859] focus:outline-hidden text-xs text-stone-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Numéro de Téléphone (Algérie) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+213 550 12 34 56"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-200 focus:border-[#C73859] focus:outline-hidden text-xs text-stone-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email (Optionnel)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="votre.email@gmail.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-200 focus:border-[#C73859] focus:outline-hidden text-xs text-stone-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Ville / Wilaya de Résidence
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Ex: Khemis Miliana, Blida, Aïn Defla..."
                      value={patientCity}
                      onChange={(e) => setPatientCity(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-200 focus:border-[#C73859] focus:outline-hidden text-xs text-stone-800"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <input
                  type="checkbox"
                  id="firstVisit"
                  checked={isFirstVisit}
                  onChange={(e) => setIsFirstVisit(e.target.checked)}
                  className="rounded text-[#C73859] focus:ring-[#C73859] w-4 h-4 accent-[#C73859]"
                />
                <label htmlFor="firstVisit" className="text-xs text-stone-700 cursor-pointer">
                  Il s’agit de ma première visite chez GH CLINIC avec Dr. Ghaouat Sarra
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Remarques, allergies ou questions spécifiques (Optionnel)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Peau sensible, antécédents, zones prioritaires à examiner..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 focus:border-[#C73859] focus:outline-hidden text-xs text-stone-800"
                />
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-pink-200/70 text-[11px] text-stone-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C73859] shrink-0" />
                <span>Vos données sont strictement confidentielles et protégées par le secret médical.</span>
              </div>
            </form>
          )}

          {/* ========================================================================= */}
          {/* STEP 4: SUCCESS CONFIRMATION & DIRECT WHATSAPP DISPATCH                   */}
          {/* ========================================================================= */}
          {step === 4 && confirmedAppointment && (
            <div className="text-center space-y-5 py-3 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif font-bold text-2xl text-stone-900">
                  Rendez-vous Enregistré avec Succès !
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto font-light">
                  Merci <strong className="font-semibold text-stone-900">{confirmedAppointment.patientName}</strong>. 
                  Votre demande a été transmise au secrétariat médical de <strong>Dr. Ghaouat Sarra</strong>.
                </p>
              </div>

              {/* Appointment Voucher Card */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-pink-200 max-w-md mx-auto text-left space-y-3 text-xs shadow-xs">
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500 font-semibold uppercase text-[10px]">Réf. Dossier</span>
                  <span className="font-mono font-bold text-[#C73859]">{confirmedAppointment.id}</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-stone-400 block text-[10px]">Soin</span>
                    <span className="font-bold text-stone-800">{confirmedAppointment.treatmentName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Tarif</span>
                    <span className="font-bold text-[#8E2842]">{confirmedAppointment.totalPriceDZD.toLocaleString('fr-DZ')} DA</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-pink-100 flex items-center justify-between text-emerald-800 bg-emerald-50/80 px-2.5 py-1.5 rounded-lg">
                    <span className="flex items-center gap-1 font-semibold text-[11px]">
                      <Crown className="w-3.5 h-3.5 text-amber-500" />
                      Points GH Privilège crédités
                    </span>
                    <span className="font-bold text-xs tabular-nums">
                      +{calculatePointsFromPrice(confirmedAppointment.totalPriceDZD)} pts
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Date</span>
                    <span className="font-bold text-stone-800">{confirmedAppointment.date}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Heure</span>
                    <span className="font-bold text-stone-800">{confirmedAppointment.timeSlot}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-200 text-[11px] text-stone-600 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C73859] shrink-0" />
                  <span>{settings.address}</span>
                </div>
              </div>

              {/* Primary WhatsApp Direct Dispatch Action */}
              <div className="space-y-3 max-w-md mx-auto pt-1">
                <a
                  href={getWhatsAppBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Confirmer instantanément sur WhatsApp</span>
                </a>

                <div className="flex gap-2">
                  <button
                    onClick={handleDownloadICS}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-stone-50 border border-pink-200 text-stone-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-[#C73859]" />
                    <span>Ajouter à mon Calendrier (.ics)</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="py-2.5 px-5 rounded-xl bg-stone-900 text-white font-semibold text-xs hover:bg-stone-800 transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer Navigation Buttons for Steps 1-3 */}
        {step < 4 && (
          <div
            className="p-4 sm:p-5 bg-[#FAF8F5] border-t border-[#E5D4CB] flex items-center justify-between shrink-0"
            style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 1rem)' }}
          >
            {step > 1 ? (
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('light');
                  setStep((s) => (s - 1) as 1 | 2 | 3);
                }}
                className="px-4 py-2 rounded-full bg-white border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 active:scale-95 flex items-center gap-1 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Retour</span>
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('medium');
                  setStep((s) => (s + 1) as 1 | 2 | 3);
                }}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C73859] via-[#D8436B] to-[#9E2A50] hover:brightness-105 active:scale-95 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
              >
                <span>Étape Suivante</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                form="booking-patient-form"
                type="submit"
                onClick={() => triggerHaptic('success')}
                className="px-7 py-3 rounded-full bg-gradient-to-r from-[#C73859] via-[#D8436B] to-[#9E2A50] hover:brightness-105 active:scale-95 text-white text-xs sm:text-sm font-semibold shadow-md flex items-center gap-1.5 transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Confirmer ma Réservation</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
