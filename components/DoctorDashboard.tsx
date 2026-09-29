'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Users,
  TrendingUp,
  Settings,
  Sparkles,
  CheckCircle2,
  Clock,
  XCircle,
  Phone,
  MessageCircle,
  DollarSign,
  Plus,
  Trash2,
  Edit2,
  Save,
  Search,
  ArrowRight,
  ShieldCheck,
  Building,
  RefreshCw
} from 'lucide-react';
import {
  Appointment,
  Treatment,
  PricingCategory,
  ClinicSettings
} from '@/lib/clinicData';
import { ClinicLogo } from '@/components/ClinicLogo';
import { useAndroidModalBack } from '@/hooks/useAndroidModalBack';

interface DoctorDashboardProps {
  appointments: Appointment[];
  treatments: Treatment[];
  pricingCategories: PricingCategory[];
  settings: ClinicSettings;
  onUpdateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  onDeleteAppointment: (id: string) => void;
  onUpdateTreatmentPrice: (id: string, newPrice: number) => void;
  onUpdateSettings: (newSettings: Partial<ClinicSettings>) => void;
  onResetData: () => void;
  onClose: () => void;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({
  appointments,
  treatments,
  pricingCategories,
  settings,
  onUpdateAppointmentStatus,
  onDeleteAppointment,
  onUpdateTreatmentPrice,
  onUpdateSettings,
  onResetData,
  onClose,
}) => {
  useAndroidModalBack(true, onClose);

  const [activeTab, setActiveTab] = useState<'appointments' | 'treatments' | 'settings'>('appointments');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Editing state for settings
  const [tempSettings, setTempSettings] = useState<ClinicSettings>(settings);
  const [isSavedAlert, setIsSavedAlert] = useState(false);

  // Stats calculation
  const totalBookings = appointments.length;
  const pendingBookings = appointments.filter((a) => a.status === 'pending').length;
  const confirmedBookings = appointments.filter((a) => a.status === 'confirmed').length;
  const completedBookings = appointments.filter((a) => a.status === 'completed').length;
  const totalRevenue = appointments
    .filter((a) => a.status === 'confirmed' || a.status === 'completed')
    .reduce((acc, a) => acc + (a.totalPriceDZD || 0), 0);

  const filteredAppointments = appointments.filter((a) => {
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchesSearch =
      a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.treatmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.patientPhone.includes(searchQuery) ||
      a.patientCity.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(tempSettings);
    setIsSavedAlert(true);
    setTimeout(() => setIsSavedAlert(false), 3000);
  };

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-200">
            <Clock className="w-3 h-3" /> En Attente
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Confirmé
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
            <CheckCircle2 className="w-3 h-3" /> Honoré
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200">
            <XCircle className="w-3 h-3" /> Annulé
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-6xl bg-[#FAF8F5] rounded-3xl shadow-2xl overflow-hidden border border-[#E5D4CB] my-auto max-h-[92dvh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Drag Handle Pill on Mobile */}
        <div className="sm:hidden pt-2.5 pb-1 flex justify-center bg-white">
          <div className="w-12 h-1.5 rounded-full bg-stone-300" />
        </div>

        {/* Portal Header */}
        <div className="p-6 bg-white border-b border-[#E5D4CB] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-4">
            <ClinicLogo
              size="md"
              className="w-12 h-12 shrink-0 rounded-full border border-pink-200/80"
              alt="Logo officiel GH Clinic"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9E6B55]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#9E6B55]">
                  Espace Praticien & Administration
                </span>
              </div>
              <h2 className="font-serif font-bold text-2xl text-stone-900 mt-1">
                Tableau de Bord — {settings.clinicName}
              </h2>
              <p className="text-xs text-stone-500 font-light">
                Gestionnaire de rendez-vous & tarification • Dr. Ghaouat Sarra
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-[#1C1917] text-white text-xs font-semibold hover:bg-stone-800 transition-colors shadow-xs"
            >
              Fermer l’espace
            </button>
          </div>
        </div>

        {/* Dashboard Top Stats Cards */}
        <div className="p-6 bg-[#FAF8F5] border-b border-[#E5D4CB]/60 grid grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
          <div className="p-4 rounded-2xl bg-white border border-[#E5D4CB] shadow-xs">
            <div className="flex items-center justify-between text-stone-400 mb-1">
              <span className="text-[11px] font-semibold uppercase">Total Réservations</span>
              <Calendar className="w-4 h-4 text-[#9E6B55]" />
            </div>
            <div className="font-serif font-bold text-2xl text-stone-900">{totalBookings}</div>
            <div className="text-[10px] text-stone-500 mt-1">{pendingBookings} en attente de confirmation</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E5D4CB] shadow-xs">
            <div className="flex items-center justify-between text-stone-400 mb-1">
              <span className="text-[11px] font-semibold uppercase">RDV Confirmés</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-serif font-bold text-2xl text-emerald-700">{confirmedBookings}</div>
            <div className="text-[10px] text-stone-500 mt-1">Planifiés avec patientes</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E5D4CB] shadow-xs">
            <div className="flex items-center justify-between text-stone-400 mb-1">
              <span className="text-[11px] font-semibold uppercase">Soins Honorés</span>
              <Sparkles className="w-4 h-4 text-[#DFBA9D]" />
            </div>
            <div className="font-serif font-bold text-2xl text-stone-900">{completedBookings}</div>
            <div className="text-[10px] text-stone-500 mt-1">Actes réalisés au cabinet</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E5D4CB] shadow-xs">
            <div className="flex items-center justify-between text-stone-400 mb-1">
              <span className="text-[11px] font-semibold uppercase">Chiffre d’Affaires</span>
              <TrendingUp className="w-4 h-4 text-[#9E6B55]" />
            </div>
            <div className="font-serif font-bold text-xl sm:text-2xl text-[#9E6B55]">
              {totalRevenue.toLocaleString()} DZD
            </div>
            <div className="text-[10px] text-stone-500 mt-1">Actes confirmés & réalisés</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-3 bg-white border-b border-[#E5D4CB] flex items-center gap-4 text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`pb-2 px-1 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'appointments'
                ? 'border-[#9E6B55] text-[#9E6B55]'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Rendez-vous Patientes ({appointments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('treatments')}
            className={`pb-2 px-1 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'treatments'
                ? 'border-[#9E6B55] text-[#9E6B55]'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Gestion des Tarifs ({treatments.length} soins)</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-2 px-1 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'border-[#9E6B55] text-[#9E6B55]'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Paramètres du Cabinet</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* 1. APPOINTMENTS TAB */}
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs font-semibold text-stone-600">Filtrer :</span>
                  {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all ${
                        statusFilter === st
                          ? 'bg-[#1C1917] text-white'
                          : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      {st === 'all' ? 'Tous' : st === 'pending' ? 'En attente' : st === 'confirmed' ? 'Confirmés' : st === 'completed' ? 'Honorés' : 'Annulés'}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Rechercher patient, soin, tel..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-full bg-white border border-stone-200 text-xs text-stone-800 focus:outline-hidden focus:border-[#9E6B55]"
                  />
                </div>
              </div>

              {/* Appointments Table */}
              <div className="overflow-x-auto rounded-2xl border border-[#E5D4CB] bg-white shadow-xs">
                <table className="w-full text-left text-xs text-stone-700 border-collapse">
                  <thead className="bg-[#FAF8F5] border-b border-[#E5D4CB] text-stone-900 uppercase font-semibold text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Patiente</th>
                      <th className="py-3 px-4">Soin & Tarif</th>
                      <th className="py-3 px-4">Date & Créneau</th>
                      <th className="py-3 px-4">Statut</th>
                      <th className="py-3 px-4 text-center">Actions & WhatsApp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-stone-400">
                          Aucun rendez-vous ne correspond à vos filtres.
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map((app) => (
                        <tr key={app.id} className="hover:bg-stone-50 transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-bold text-stone-900">{app.patientName}</div>
                            <div className="text-[11px] text-stone-500">{app.patientPhone}</div>
                            <div className="text-[10px] text-stone-400">{app.patientCity} {app.isFirstVisit ? '• 1ère visite' : ''}</div>
                          </td>

                          <td className="py-3 px-4">
                            <div className="font-semibold text-stone-800">{app.treatmentName}</div>
                            <div className="font-serif font-bold text-[#9E6B55]">{app.totalPriceDZD.toLocaleString()} DZD</div>
                            {app.notes && (
                              <div className="text-[10px] text-stone-500 italic mt-0.5 max-w-xs">« {app.notes} »</div>
                            )}
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="font-bold text-stone-800">{app.date}</div>
                            <div className="text-[#9E6B55] font-semibold">{app.timeSlot}</div>
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap">
                            {getStatusBadge(app.status)}
                          </td>

                          <td className="py-3 px-4 text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-1.5">
                              {/* WhatsApp Direct Contact Button */}
                              <a
                                href={`https://wa.me/${app.patientPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Bonjour ${app.patientName}, nous confirmons votre rendez-vous chez GH Clinic (Dr. Ghaouat Sarra) le ${app.date} à ${app.timeSlot} pour ${app.treatmentName}.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-colors"
                                title="Contacter sur WhatsApp"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </a>

                              {/* Status changer buttons */}
                              {app.status === 'pending' && (
                                <button
                                  onClick={() => onUpdateAppointmentStatus(app.id, 'confirmed')}
                                  className="px-2.5 py-1 rounded-md bg-emerald-600 text-white text-[10px] font-bold hover:bg-emerald-700"
                                >
                                  Confirmer
                                </button>
                              )}

                              {app.status === 'confirmed' && (
                                <button
                                  onClick={() => onUpdateAppointmentStatus(app.id, 'completed')}
                                  className="px-2.5 py-1 rounded-md bg-blue-600 text-white text-[10px] font-bold hover:bg-blue-700"
                                >
                                  Terminé
                                </button>
                              )}

                              {app.status !== 'cancelled' && (
                                <button
                                  onClick={() => onUpdateAppointmentStatus(app.id, 'cancelled')}
                                  className="px-2.5 py-1 rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100 text-[10px] font-bold"
                                >
                                  Annuler
                                </button>
                              )}

                              <button
                                onClick={() => {
                                  if (confirm('Voulez-vous supprimer ce rendez-vous ?')) {
                                    onDeleteAppointment(app.id);
                                  }
                                }}
                                className="w-7 h-7 rounded-full text-stone-300 hover:text-red-500 flex items-center justify-center transition-colors"
                                title="Supprimer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 2. TREATMENTS & PRICING LIVE EDITOR */}
          {activeTab === 'treatments' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-[#E5D4CB] shadow-xs">
                <h3 className="font-serif font-bold text-lg text-stone-900 mb-1">
                  Catalogue & Tarifs en Dinars Algériens (DZD)
                </h3>
                <p className="text-xs text-stone-500 font-light mb-4">
                  Modifiez instantanément les tarifs affichés sur le site internet pour chaque prestation médicale.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {treatments.map((t) => (
                    <div key={t.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5D4CB] space-y-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-[#9E6B55]">{t.categoryLabel}</span>
                        <h4 className="font-semibold text-stone-900 text-sm">{t.name}</h4>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-stone-600">Tarif Séance (DZD) :</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            defaultValue={t.priceDZD}
                            onBlur={(e) => onUpdateTreatmentPrice(t.id, Number(e.target.value))}
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-300 font-serif font-bold text-sm text-[#9E6B55] bg-white"
                          />
                          <span className="text-xs font-bold text-stone-500">DZD</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. SETTINGS TAB */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-6 max-w-2xl bg-white p-6 rounded-2xl border border-[#E5D4CB] shadow-xs">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Coordonnées & Informations du Cabinet
              </h3>

              {isSavedAlert && (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Modifications enregistrées avec succès !</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Nom du Médecin :</label>
                  <input
                    type="text"
                    value={tempSettings.doctorName}
                    onChange={(e) => setTempSettings({ ...tempSettings, doctorName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-200"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Téléphone Appel :</label>
                  <input
                    type="text"
                    value={tempSettings.phone}
                    onChange={(e) => setTempSettings({ ...tempSettings, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-200"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Numéro WhatsApp (sans +) :</label>
                  <input
                    type="text"
                    value={tempSettings.whatsappPhone}
                    onChange={(e) => setTempSettings({ ...tempSettings, whatsappPhone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-200"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Ville :</label>
                  <input
                    type="text"
                    value={tempSettings.city}
                    onChange={(e) => setTempSettings({ ...tempSettings, city: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-200"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-stone-700 mb-1">Adresse Complète :</label>
                  <input
                    type="text"
                    value={tempSettings.address}
                    onChange={(e) => setTempSettings({ ...tempSettings, address: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-200"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-stone-700 mb-1">Bandeau d’Annonce Haut de Page :</label>
                  <input
                    type="text"
                    value={tempSettings.announcementText}
                    onChange={(e) => setTempSettings({ ...tempSettings, announcementText: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-200"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Réinitialiser toutes les données par défaut ?')) {
                      onResetData();
                      alert('Données réinitialisées !');
                    }
                  }}
                  className="text-xs text-rose-600 hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Réinitialiser les données démo</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#DFBA9D] via-[#C5A089] to-[#9E6B55] text-white font-semibold text-xs shadow-xs hover:shadow-md transition-all flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Enregistrer les Modifications</span>
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
