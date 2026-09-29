'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  LoyaltyState,
  INITIAL_LOYALTY_STATE,
  calculatePointsFromPrice,
  getCurrentTier,
  getNextTier,
  AVAILABLE_REWARDS,
  LOYALTY_TIERS,
} from '@/lib/loyalty';

const STORAGE_KEY = 'gh_clinic_loyalty_points_v2';

function getStoredLoyalty(): LoyaltyState {
  if (typeof window === 'undefined') return INITIAL_LOYALTY_STATE;
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : INITIAL_LOYALTY_STATE;
  } catch {
    return INITIAL_LOYALTY_STATE;
  }
}

export function useLoyalty() {
  const [loyalty, setLoyalty] = useState<LoyaltyState>(getStoredLoyalty);

  // Sync to other tabs/windows if needed
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setLoyalty(JSON.parse(e.newValue));
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const saveState = useCallback((newState: LoyaltyState) => {
    setLoyalty(newState);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      } catch (err) {
        console.error('Failed to persist loyalty state', err);
      }
    }
  }, []);

  /**
   * Simulates or records completed treatment and grants points
   */
  const simulateTreatmentPoints = useCallback((treatmentName: string, amountDZD: number) => {
    const earned = calculatePointsFromPrice(amountDZD);
    const newActivity = {
      id: `act-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      treatmentName,
      pointsEarned: earned,
      amountDZD,
      type: 'treatment' as const,
    };

    setLoyalty((prev) => {
      const updated: LoyaltyState = {
        ...prev,
        points: prev.points + earned,
        totalEarned: prev.totalEarned + earned,
        history: [newActivity, ...prev.history],
      };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (err) {
          console.error('Failed to persist loyalty state', err);
        }
      }
      return updated;
    });

    return { earned, total: loyalty.points + earned };
  }, [loyalty.points]);

  /**
   * Redeem a reward
   */
  const redeemReward = useCallback((rewardId: string) => {
    const reward = AVAILABLE_REWARDS.find((r) => r.id === rewardId);
    if (!reward) return { success: false, message: 'Récompense introuvable' };

    if (loyalty.points < reward.pointsRequired) {
      return { success: false, message: 'Solde de points insuffisant' };
    }

    const newActivity = {
      id: `act-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      treatmentName: `Utilisation privilège : ${reward.title}`,
      pointsEarned: -reward.pointsRequired,
      amountDZD: 0,
      type: 'redemption' as const,
      rewardTitle: reward.title,
    };

    const newState: LoyaltyState = {
      ...loyalty,
      points: loyalty.points - reward.pointsRequired,
      history: [newActivity, ...loyalty.history],
      redeemedRewards: [...loyalty.redeemedRewards, rewardId],
    };

    saveState(newState);
    return { success: true, code: reward.code, reward };
  }, [loyalty, saveState]);

  /**
   * Reset loyalty simulation to demo state
   */
  const resetLoyalty = useCallback(() => {
    saveState(INITIAL_LOYALTY_STATE);
  }, [saveState]);

  const currentTier = getCurrentTier(loyalty.points);
  const tierProgress = getNextTier(loyalty.points);

  return {
    loyalty,
    currentTier,
    tierProgress,
    availableRewards: AVAILABLE_REWARDS,
    allTiers: LOYALTY_TIERS,
    simulateTreatmentPoints,
    redeemReward,
    resetLoyalty,
  };
}
