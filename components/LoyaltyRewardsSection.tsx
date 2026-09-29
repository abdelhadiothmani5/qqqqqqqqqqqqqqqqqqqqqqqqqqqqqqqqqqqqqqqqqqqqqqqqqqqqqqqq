'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Award,
  Crown,
  Gift,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  History,
  RotateCcw,
  Copy,
  Check,
  Zap,
  Star,
  Info
} from 'lucide-react';
import { useLoyalty } from '@/hooks/useLoyalty';
import { calculatePointsFromPrice } from '@/lib/loyalty';

interface LoyaltyRewardsSectionProps {
  onOpenBooking?: (treatmentName?: string) => void;
}

const SIMULATION_PRESETS = [
  { name: 'Hydrafacial Médical', priceDZD: 6000, category: 'Soins Visage' },
  { name: 'Botox Front & Pattes d’oie', priceDZD: 12000, category: 'Injectables' },
  { name: 'Filler Lèvres (1ml Acide Hyaluronique)', priceDZD: 22000, category: 'Injectables' },
  { name: 'Épilation Laser Pack 3 Séances (Corps)', priceDZD: 19000, category: 'Laser DIODE' },
  { name: 'Skinbooster Restylane Vital', priceDZD: 18000, category: 'Mésothérapie' },
  { name: 'Peeling Éclat Médical', priceDZD: 8000, category: 'Soins Visage' },
];

export const LoyaltyRewardsSection: React.FC<LoyaltyRewardsSectionProps> = ({ onOpenBooking }) => {
  const {
    loyalty,
    currentTier,
    tierProgress,
    availableRewards,
    allTiers,
    simulateTreatmentPoints,
    redeemReward,
    resetLoyalty,
  } = useLoyalty();

  const [activeTab, setActiveTab] = useState<'simulate' | 'rewards' | 'tiers' | 'history'>('simulate');
  const [selectedPreset, setSelectedPreset] = useState(SIMULATION_PRESETS[0]);
  const [customAmountDZD, setCustomAmountDZD] = useState<number>(SIMULATION_PRESETS[0].priceDZD);
  const [customTreatmentName, setCustomTreatmentName] = useState<string>(SIMULATION_PRESETS[0].name);
  const [justEarnedNotice, setJustEarnedNotice] = useState<{ earned: number; total: number } | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [redeemSuccess, setRedeemSuccess] = useState<string | null>(null);

  const potentialPoints = calculatePointsFromPrice(customAmountDZD);

  const handleSimulateAdd = () => {
    const res = simulateTreatmentPoints(customTreatmentName || 'Soin en Cabinet', customAmountDZD);
    setJustEarnedNotice(res);
    setTimeout(() => {
      setJustEarnedNotice(null);
    }, 4500);
  };

  const handleCopyCode = (code: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    }
  };

  const handleRedeem = (rewardId: string, title: string) => {
    const res = redeemReward(rewardId);
    if (res.success && res.code) {
      setRedeemSuccess(`Privilège débloqué avec succès ! Code : ${res.code}`);
      setTimeout(() => setRedeemSuccess(null), 5000);
    }
  };

  return (
    <section
      id="loyalty-program"
      className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#FFF8FA] to-[#FAF8F5]"
    >
      {/* Subtle Ambient Background */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-pink-200/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#F4DCD6]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-pink-200/90 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C73859]" />
            <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#9E2A50]">
              Programme GH Privilège
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Vos Soins Récompensés
          </h2>

          <p className="text-stone-600 font-light text-sm sm:text-base leading-relaxed">
            Chaque acte médical et soin d’excellence réalisé au cabinet vous permet de cumuler des points fidélité et de débloquer des privilèges exclusifs pour sublimer votre peau.
          </p>
        </div>

        {/* Main Grid: Loyalty Card Preview (Left) + Interactive Simulator & Rewards (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT: Virtual VIP Privilege Membership Card & Status                      */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* The Luxury Membership Card */}
            <div
              className="relative rounded-3xl p-6 sm:p-7 shadow-xl border border-pink-200/90 overflow-hidden text-stone-900 transition-all duration-300 group gh-card-hover"
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F7 50%, #FCE8ED 100%)',
              }}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4 border-b border-pink-100 pb-4">
                <div>
                  <div className="text-[10px] font-serif font-bold tracking-widest text-[#C73859] uppercase">
                    Carte Virtuelle de Fidélité
                  </div>
                  <div className="font-serif font-bold text-xl text-stone-900 mt-0.5">
                    GH CLINIC • PRIVILÈGE
                  </div>
                </div>

                {/* Tier Badge Icon */}
                <div className="w-10 h-10 rounded-2xl bg-white border border-pink-200 flex items-center justify-center text-[#9E2A50] shadow-xs shrink-0">
                  <Crown className="w-5 h-5" />
                </div>
              </div>

              {/* Central Balance Display */}
              <div className="py-6 space-y-1">
                <div className="text-xs text-stone-500 font-serif italic">
                  Solde de points disponibles
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif font-bold text-4xl sm:text-5xl text-[#8E2842] tracking-tight tabular-nums">
                    {loyalty.points}
                  </span>
                  <span className="font-serif text-sm font-semibold text-stone-600 uppercase tracking-wider">
                    Points GH
                  </span>
                </div>

                {/* Current VIP Tier Pill */}
                <div className="pt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#9E2A50] border border-pink-200 text-xs font-serif font-bold shadow-2xs">
                    <Award className="w-3.5 h-3.5 text-[#C73859]" />
                    <span>Statut : {currentTier.name}</span>
                  </span>
                  {currentTier.discountPercent > 0 && (
                    <span className="text-[11px] font-sans font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      -{currentTier.discountPercent}% sur vos soins
                    </span>
                  )}
                </div>
              </div>

              {/* Progress to Next Tier */}
              {tierProgress.nextTier ? (
                <div className="space-y-2 pt-2 border-t border-pink-100/90">
                  <div className="flex items-center justify-between text-xs text-stone-600">
                    <span>
                      Objectif : <strong className="text-stone-900 font-semibold">{tierProgress.nextTier.name}</strong>
                    </span>
                    <span className="font-medium text-[#C73859] tabular-nums">
                      encore {tierProgress.pointsNeeded} pts
                    </span>
                  </div>

                  {/* Progress Track */}
                  <div className="w-full h-2 rounded-full bg-pink-100 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#C73859] to-[#9E2A50] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${tierProgress.progressPercent}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ) : (
                <div className="pt-2 border-t border-pink-100 text-xs text-emerald-700 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Niveau VIP Maximal atteint ! Profitez de tous les avantages Platine.</span>
                </div>
              )}

              {/* Active Tier Perks List */}
              <div className="mt-5 pt-4 border-t border-pink-100/90 space-y-2">
                <div className="text-[11px] font-serif font-bold uppercase tracking-wider text-stone-700">
                  Vos privilèges actuels :
                </div>
                <ul className="space-y-1.5 text-xs text-stone-600">
                  {currentTier.perks.map((perk, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C73859]" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer Bar */}
              <div className="mt-6 pt-4 border-t border-pink-200/80 flex items-center justify-between text-[11px] text-stone-500 font-serif">
                <span>Règle : 1 pt cumulé par tranche de 100 DA</span>
                <button
                  type="button"
                  onClick={resetLoyalty}
                  className="hover:text-stone-800 transition-colors flex items-center gap-1"
                  title="Réinitialiser la simulation"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Réinitialiser</span>
                </button>
              </div>
            </div>

            {/* Quick Live Feedback Notification */}
            <AnimatePresence>
              {justEarnedNotice && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs shadow-md flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">
                      +{justEarnedNotice.earned} Points GH Ajoutés !
                    </div>
                    <div className="text-emerald-700 text-[11px]">
                      Votre nouveau solde est de <strong className="tabular-nums">{justEarnedNotice.total} points</strong>.
                    </div>
                  </div>
                </motion.div>
              )}

              {redeemSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-4 rounded-2xl bg-[#FFF5F7] border border-[#C73859]/30 text-[#8E2842] text-xs shadow-md flex items-center gap-3"
                >
                  <Gift className="w-5 h-5 text-[#C73859] shrink-0" />
                  <div className="font-medium">{redeemSuccess}</div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT: Interactive Simulator, Rewards Catalog & Tiers                     */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-pink-200/80 p-6 sm:p-8 shadow-sm">
            
            {/* Tab Navigation */}
            <div className="flex flex-wrap items-center gap-2 border-b border-pink-100 pb-4 mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('simulate')}
                className={`px-4 py-2 rounded-full text-xs font-serif font-bold uppercase tracking-wider transition-all ${
                  activeTab === 'simulate'
                    ? 'bg-gradient-to-r from-[#C73859] to-[#9E2A50] text-white shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-pink-50/60'
                }`}
              >
                Simulateur de Soins
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('rewards')}
                className={`px-4 py-2 rounded-full text-xs font-serif font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  activeTab === 'rewards'
                    ? 'bg-gradient-to-r from-[#C73859] to-[#9E2A50] text-white shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-pink-50/60'
                }`}
              >
                <Gift className="w-3.5 h-3.5" />
                <span>Récompenses ({availableRewards.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('tiers')}
                className={`px-4 py-2 rounded-full text-xs font-serif font-bold uppercase tracking-wider transition-all ${
                  activeTab === 'tiers'
                    ? 'bg-gradient-to-r from-[#C73859] to-[#9E2A50] text-white shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-pink-50/60'
                }`}
              >
                Niveaux VIP
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-full text-xs font-serif font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${
                  activeTab === 'history'
                    ? 'bg-gradient-to-r from-[#C73859] to-[#9E2A50] text-white shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-pink-50/60'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Historique</span>
              </button>
            </div>

            {/* TAB 1: INTERACTIVE SIMULATOR */}
            {activeTab === 'simulate' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Estimez vos points gagnés selon votre prochain soin
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Sélectionnez l’un de nos soins populaires ou ajustez le montant en Dinars Algériens (DZD).
                  </p>
                </div>

                {/* Presets Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SIMULATION_PRESETS.map((preset, idx) => {
                    const isSelected = selectedPreset.name === preset.name && customAmountDZD === preset.priceDZD;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSelectedPreset(preset);
                          setCustomTreatmentName(preset.name);
                          setCustomAmountDZD(preset.priceDZD);
                        }}
                        className={`text-left p-3 rounded-2xl border transition-all ${
                          isSelected
                            ? 'bg-[#FFF5F7] border-[#C73859] shadow-2xs ring-1 ring-[#C73859]'
                            : 'bg-stone-50/60 border-stone-200/80 hover:border-pink-300 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-serif uppercase tracking-wider text-[#9E2A50] font-bold">
                            {preset.category}
                          </span>
                          <span className="text-xs font-bold text-stone-900 font-serif tabular-nums">
                            {preset.priceDZD.toLocaleString('fr-DZ')} DA
                          </span>
                        </div>
                        <div className="text-xs font-medium text-stone-800 mt-1 truncate">
                          {preset.name}
                        </div>
                        <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                          +{calculatePointsFromPrice(preset.priceDZD)} Points GH
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Treatment / Amount Controls */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-pink-100 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Intitulé du soin
                      </label>
                      <input
                        type="text"
                        value={customTreatmentName}
                        onChange={(e) => setCustomTreatmentName(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-stone-200 focus:outline-none focus:border-[#C73859]"
                        placeholder="Ex: Soin Laser, Peeling..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Montant du soin (DA)
                      </label>
                      <input
                        type="number"
                        min="1000"
                        step="500"
                        value={customAmountDZD}
                        onChange={(e) => setCustomAmountDZD(Math.max(0, Number(e.target.value)))}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-stone-200 focus:outline-none focus:border-[#C73859] tabular-nums"
                      />
                    </div>
                  </div>

                  {/* Estimation Callout Banner */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-pink-200">
                    <div>
                      <div className="text-[11px] text-stone-500 font-serif italic">
                        Points estimés pour ce soin :
                      </div>
                      <div className="font-serif font-bold text-lg text-[#8E2842] tabular-nums">
                        +{potentialPoints} Points GH
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleSimulateAdd}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-[#C73859] via-[#D8436B] to-[#9E2A50] hover:brightness-105 text-white font-serif font-bold text-xs shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5 text-pink-200" />
                      <span>Simuler ce soin effectué</span>
                    </button>
                  </div>
                </div>

                {/* Booking CTA Bridge */}
                {onOpenBooking && (
                  <div className="pt-2 flex items-center justify-between text-xs text-stone-600">
                    <span>Prêt(e) à réserver ce soin au cabinet ?</span>
                    <button
                      type="button"
                      onClick={() => onOpenBooking(customTreatmentName)}
                      className="font-serif font-bold text-[#C73859] hover:underline flex items-center gap-1"
                    >
                      <span>Prendre rendez-vous en ligne</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: REWARDS CATALOG */}
            {activeTab === 'rewards' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-stone-900">
                      Privilèges & Récompenses Déblocables
                    </h3>
                    <p className="text-xs text-stone-500">
                      Échangez vos points contre des remises exclusives ou des soins offerts.
                    </p>
                  </div>
                  <div className="text-xs font-serif font-bold text-[#9E2A50] bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
                    Solde : {loyalty.points} pts
                  </div>
                </div>

                <div className="space-y-3">
                  {availableRewards.map((reward) => {
                    const canAfford = loyalty.points >= reward.pointsRequired;
                    const isRedeemed = loyalty.redeemedRewards.includes(reward.id);

                    return (
                      <div
                        key={reward.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          canAfford
                            ? 'bg-white border-pink-200 hover:border-pink-300 shadow-2xs'
                            : 'bg-stone-50/70 border-stone-200 opacity-80'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-serif uppercase font-bold text-[#C73859] tracking-wider px-2 py-0.5 rounded-full bg-pink-50 border border-pink-100">
                              {reward.category}
                            </span>
                            <span className="text-xs font-bold text-stone-900 font-serif">
                              {reward.title}
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 font-light max-w-md">
                            {reward.description}
                          </p>
                          <div className="text-[11px] font-semibold text-[#8E2842] tabular-nums">
                            Coût : {reward.pointsRequired} Points GH
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-2">
                          {canAfford ? (
                            <button
                              type="button"
                              onClick={() => handleRedeem(reward.id, reward.title)}
                              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#C73859] to-[#9E2A50] text-white text-xs font-serif font-bold hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-xs"
                            >
                              <Gift className="w-3.5 h-3.5 text-pink-200" />
                              <span>Débloquer</span>
                            </button>
                          ) : (
                            <span className="text-[11px] font-serif italic text-stone-400">
                              Manque {reward.pointsRequired - loyalty.points} pts
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={() => handleCopyCode(reward.code)}
                            className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
                            title={`Copier le code : ${reward.code}`}
                          >
                            {copiedCode === reward.code ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: VIP TIERS */}
            {activeTab === 'tiers' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Les 4 Niveaux Privilège GH Clinic
                  </h3>
                  <p className="text-xs text-stone-500">
                    Votre fidélité est récompensée à chaque étape de votre parcours beauté.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {allTiers.map((tier) => {
                    const isCurrent = currentTier.id === tier.id;
                    return (
                      <div
                        key={tier.id}
                        className={`p-4 rounded-2xl border transition-all ${
                          isCurrent
                            ? 'bg-[#FFF5F7] border-[#C73859] shadow-xs ring-1 ring-[#C73859]'
                            : 'bg-stone-50/50 border-stone-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-serif font-bold text-sm text-stone-900">
                            {tier.name}
                          </span>
                          <span className="text-[11px] font-medium text-stone-500 tabular-nums">
                            {tier.maxPoints ? `${tier.minPoints} - ${tier.maxPoints} pts` : `${tier.minPoints}+ pts`}
                          </span>
                        </div>

                        {tier.discountPercent > 0 && (
                          <div className="text-[11px] font-bold text-emerald-700 mb-2">
                            Remise permanente : -{tier.discountPercent}%
                          </div>
                        )}

                        <ul className="space-y-1 text-xs text-stone-600 font-light">
                          {tier.perks.map((perk, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-[#C73859] font-bold">•</span>
                              <span>{perk}</span>
                            </li>
                          ))}
                        </ul>

                        {isCurrent && (
                          <div className="mt-3 text-[10px] font-serif uppercase tracking-widest text-[#9E2A50] font-bold">
                            ★ Votre statut actuel
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 4: HISTORY */}
            {activeTab === 'history' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Historique de vos points
                  </h3>
                  <span className="text-xs text-stone-500 tabular-nums">
                    {loyalty.history.length} opération(s)
                  </span>
                </div>

                <div className="divide-y divide-stone-100 border border-stone-200 rounded-2xl overflow-hidden max-h-72 overflow-y-auto">
                  {loyalty.history.map((act) => (
                    <div key={act.id} className="p-3 bg-white flex items-center justify-between gap-3 text-xs">
                      <div className="min-w-0">
                        <div className="font-medium text-stone-900 truncate">
                          {act.treatmentName}
                        </div>
                        <div className="text-[10px] text-stone-400">
                          {act.date} {act.amountDZD > 0 && `• ${act.amountDZD.toLocaleString('fr-DZ')} DA`}
                        </div>
                      </div>

                      <div className={`font-serif font-bold text-xs shrink-0 tabular-nums ${
                        act.pointsEarned > 0 ? 'text-emerald-700' : 'text-[#C73859]'
                      }`}>
                        {act.pointsEarned > 0 ? `+${act.pointsEarned}` : act.pointsEarned} pts
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
