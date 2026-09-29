'use client';

import { useSyncExternalStore, useCallback } from 'react';
import {
  Treatment,
  PricingCategory,
  BeforeAfterCase,
  Testimonial,
  GalleryItem,
  FAQItem,
  Appointment,
  Patient,
  ClinicSettings,
  TREATMENTS,
  PRICING_CATEGORIES,
  BEFORE_AFTER_CASES,
  TESTIMONIALS,
  GALLERY_ITEMS,
  FAQ_ITEMS,
  INITIAL_APPOINTMENTS,
  INITIAL_PATIENTS,
  INITIAL_CLINIC_SETTINGS
} from './clinicData';
import { CENTRAL_SERVICES_CATALOG } from './servicesData';

const STORAGE_KEYS = {
  TREATMENTS: 'gh_clinic_treatments_v2',
  PRICING: 'gh_clinic_pricing_v2',
  BEFORE_AFTER: 'gh_clinic_before_after_v2',
  TESTIMONIALS: 'gh_clinic_testimonials_v2',
  GALLERY: 'gh_clinic_gallery_v2',
  FAQ: 'gh_clinic_faq_v2',
  APPOINTMENTS: 'gh_clinic_appointments_v2',
  PATIENTS: 'gh_clinic_patients_v2',
  SETTINGS: 'gh_clinic_settings_v2',
};

function getStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

interface ClinicStoreData {
  treatments: Treatment[];
  pricingCategories: PricingCategory[];
  beforeAfterCases: BeforeAfterCase[];
  testimonials: Testimonial[];
  galleryItems: GalleryItem[];
  faqs: FAQItem[];
  appointments: Appointment[];
  patients: Patient[];
  settings: ClinicSettings;
}

const defaultData: ClinicStoreData = {
  treatments: TREATMENTS,
  pricingCategories: PRICING_CATEGORIES,
  beforeAfterCases: BEFORE_AFTER_CASES,
  testimonials: TESTIMONIALS,
  galleryItems: GALLERY_ITEMS,
  faqs: FAQ_ITEMS,
  appointments: INITIAL_APPOINTMENTS,
  patients: INITIAL_PATIENTS,
  settings: INITIAL_CLINIC_SETTINGS,
};

let storeData: ClinicStoreData = defaultData;
let isInitialized = false;
const listeners = new Set<() => void>();

function initStore() {
  if (isInitialized || typeof window === 'undefined') return;
  isInitialized = true;
  storeData = {
    treatments: getStored(STORAGE_KEYS.TREATMENTS, TREATMENTS),
    pricingCategories: getStored(STORAGE_KEYS.PRICING, PRICING_CATEGORIES),
    beforeAfterCases: getStored(STORAGE_KEYS.BEFORE_AFTER, BEFORE_AFTER_CASES),
    testimonials: getStored(STORAGE_KEYS.TESTIMONIALS, TESTIMONIALS),
    galleryItems: getStored(STORAGE_KEYS.GALLERY, GALLERY_ITEMS),
    faqs: getStored(STORAGE_KEYS.FAQ, FAQ_ITEMS),
    appointments: getStored(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS),
    patients: getStored(STORAGE_KEYS.PATIENTS, INITIAL_PATIENTS),
    settings: getStored(STORAGE_KEYS.SETTINGS, INITIAL_CLINIC_SETTINGS),
  };
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!isInitialized && typeof window !== 'undefined') {
    initStore();
  }
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): ClinicStoreData {
  if (!isInitialized && typeof window !== 'undefined') {
    initStore();
  }
  return storeData;
}

function getServerSnapshot(): ClinicStoreData {
  return defaultData;
}

export function useClinicStore() {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const saveTreatments = useCallback((newTreatments: Treatment[]) => {
    storeData = { ...storeData, treatments: newTreatments };
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.TREATMENTS, JSON.stringify(newTreatments));
      } catch {}
    }
    emitChange();
  }, []);

  const updateTreatmentPrice = useCallback((id: string, newPrice: number) => {
    const updated = storeData.treatments.map((t) =>
      t.id === id ? { ...t, priceDZD: newPrice } : t
    );
    saveTreatments(updated);
  }, [saveTreatments]);

  const savePricingCategories = useCallback((newPricing: PricingCategory[]) => {
    storeData = { ...storeData, pricingCategories: newPricing };
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.PRICING, JSON.stringify(newPricing));
      } catch {}
    }
    emitChange();
  }, []);

  const saveBeforeAfter = useCallback((newBA: BeforeAfterCase[]) => {
    storeData = { ...storeData, beforeAfterCases: newBA };
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.BEFORE_AFTER, JSON.stringify(newBA));
      } catch {}
    }
    emitChange();
  }, []);

  const saveTestimonials = useCallback((newTestimonials: Testimonial[]) => {
    storeData = { ...storeData, testimonials: newTestimonials };
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(newTestimonials));
      } catch {}
    }
    emitChange();
  }, []);

  const addTestimonial = useCallback((review: Omit<Testimonial, 'id' | 'date'>) => {
    const formattedDate = new Date().toLocaleDateString('fr-FR', {
      month: 'long',
      year: 'numeric',
    });
    const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    const newTestimonial: Testimonial = {
      ...review,
      id: `rev-${Date.now()}`,
      date: capitalizedDate,
    };
    const updated = [newTestimonial, ...storeData.testimonials];
    saveTestimonials(updated);
    return newTestimonial;
  }, [saveTestimonials]);

  const saveGallery = useCallback((newGallery: GalleryItem[]) => {
    storeData = { ...storeData, galleryItems: newGallery };
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(newGallery));
      } catch {}
    }
    emitChange();
  }, []);

  const saveFaqs = useCallback((newFaqs: FAQItem[]) => {
    storeData = { ...storeData, faqs: newFaqs };
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.FAQ, JSON.stringify(newFaqs));
      } catch {}
    }
    emitChange();
  }, []);

  const saveSettings = useCallback((newSettings: ClinicSettings) => {
    storeData = { ...storeData, settings: newSettings };
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
      } catch {}
    }
    emitChange();
  }, []);

  const updateSettings = useCallback((partial: Partial<ClinicSettings>) => {
    const merged = { ...storeData.settings, ...partial };
    saveSettings(merged);
  }, [saveSettings]);

  const addAppointment = useCallback((newApt: Omit<Appointment, 'id' | 'createdAt'>) => {
    const appointmentId = `apt-${Date.now()}`;
    const fullAppointment: Appointment = {
      ...newApt,
      id: appointmentId,
      createdAt: new Date().toISOString(),
    };

    const updatedApts = [fullAppointment, ...storeData.appointments];
    storeData = { ...storeData, appointments: updatedApts };
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updatedApts));
      } catch {}
    }
    emitChange();

    // Patient registry sync
    const existingPatientIndex = storeData.patients.findIndex(
      (p) => p.phone.replace(/\s+/g, '') === newApt.patientPhone.replace(/\s+/g, '')
    );

    if (existingPatientIndex >= 0) {
      const currentPatient = storeData.patients[existingPatientIndex];
      const updatedPatients = [...storeData.patients];
      updatedPatients[existingPatientIndex] = {
        ...currentPatient,
        name: newApt.patientName,
        email: newApt.patientEmail || currentPatient.email,
        city: newApt.patientCity || currentPatient.city,
        totalVisits: currentPatient.totalVisits + 1,
        totalSpentDZD: currentPatient.totalSpentDZD + (newApt.totalPriceDZD || 0),
        lastTreatment: newApt.treatmentName,
      };
      storeData = { ...storeData, patients: updatedPatients };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(updatedPatients));
        } catch {}
      }
      emitChange();
    } else {
      const newPatient: Patient = {
        id: `pat-${Date.now()}`,
        name: newApt.patientName,
        phone: newApt.patientPhone,
        email: newApt.patientEmail || '',
        city: newApt.patientCity || '',
        totalVisits: 1,
        totalSpentDZD: newApt.totalPriceDZD || 0,
        firstVisitDate: newApt.date,
        lastTreatment: newApt.treatmentName,
        medicalNotes: `Créé automatiquement via prise de RDV pour ${newApt.treatmentName}`,
      };
      const updatedPatients = [newPatient, ...storeData.patients];
      storeData = { ...storeData, patients: updatedPatients };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(updatedPatients));
        } catch {}
      }
      emitChange();
    }

    return fullAppointment;
  }, []);

  const updateAppointmentStatus = useCallback((appointmentId: string, status: Appointment['status']) => {
    const updated = storeData.appointments.map((apt) =>
      apt.id === appointmentId ? { ...apt, status } : apt
    );
    storeData = { ...storeData, appointments: updated };
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
      } catch {}
    }
    emitChange();
  }, []);

  const deleteAppointment = useCallback((appointmentId: string) => {
    const updated = storeData.appointments.filter((apt) => apt.id !== appointmentId);
    storeData = { ...storeData, appointments: updated };
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
      } catch {}
    }
    emitChange();
  }, []);

  const resetToDefault = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
      } catch {}
    }
    storeData = defaultData;
    isInitialized = false;
    emitChange();
  }, []);

  return {
    treatments: data.treatments,
    pricingCategories: data.pricingCategories,
    beforeAfterCases: data.beforeAfterCases,
    testimonials: data.testimonials,
    galleryItems: data.galleryItems,
    faqs: data.faqs,
    appointments: data.appointments,
    patients: data.patients,
    settings: data.settings,
    servicesCatalog: CENTRAL_SERVICES_CATALOG,
    saveTreatments,
    updateTreatmentPrice,
    savePricingCategories,
    saveBeforeAfter,
    saveTestimonials,
    addTestimonial,
    saveGallery,
    saveFaqs,
    saveSettings,
    updateSettings,
    addAppointment,
    updateAppointmentStatus,
    deleteAppointment,
    resetToDefault,
  };
}
