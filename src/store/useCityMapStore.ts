import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CityMapState, Building, MapRegion, Challenge } from '@/types';
import { initialRegions, initialChallenges } from '@/data/cityMapData';

export const useCityMapStore = create<CityMapState>()(
  persist(
    (set, get) => ({
      coins: 50,
      unlockedRegions: ['downtown'],
      completedChallenges: [],
      unlockedShoes: [],
      unlockedElements: [],
      currentPosition: {
        x: 15,
        y: 50,
        moving: false,
      },
      selectedBuilding: null,
      selectedChallenge: null,
      showReward: false,
      rewardData: null,
      regions: initialRegions,
      challenges: initialChallenges,

      setCoins: (coins) => set({ coins }),

      addCoins: (amount) =>
        set((state) => ({ coins: state.coins + amount })),

      unlockRegion: (regionId) => {
        const state = get();
        const region = state.regions.find((r) => r.id === regionId);
        if (!region || region.unlocked) return false;
        if (state.coins < region.unlockCost) return false;

        set((s) => ({
          coins: s.coins - region.unlockCost,
          unlockedRegions: [...s.unlockedRegions, regionId],
          regions: s.regions.map((r) =>
            r.id === regionId
              ? {
                  ...r,
                  unlocked: true,
                  buildings: r.buildings.map((b) => ({ ...b, unlocked: true })),
                }
              : r
          ),
        }));
        return true;
      },

      completeChallenge: (challengeId) => {
        const state = get();
        const challenge = state.challenges.find((c) => c.id === challengeId);
        if (!challenge || challenge.completed) return;

        const rewardShoes = challenge.buildingId
          ? state.regions
              .flatMap((r) => r.buildings)
              .find((b) => b.id === challenge.buildingId)
              ?.exclusiveShoes || []
          : [];

        const rewardElements = challenge.buildingId
          ? state.regions
              .flatMap((r) => r.buildings)
              .find((b) => b.id === challenge.buildingId)
              ?.designElements || []
          : [];

        const unlockedRegion = challenge.unlocksRegion
          ? state.regions.find((r) => r.id === challenge.unlocksRegion)
          : undefined;

        set((s) => {
          const updatedChallenges = s.challenges.map((c) =>
            c.id === challengeId ? { ...c, completed: true } : c
          );

          const updatedRegions = unlockedRegion
            ? s.regions.map((r) =>
                r.id === unlockedRegion.id
                  ? {
                      ...r,
                      unlocked: true,
                      buildings: r.buildings.map((b) => ({ ...b, unlocked: true })),
                    }
                  : r
              )
            : s.regions;

          return {
            completedChallenges: [...s.completedChallenges, challengeId],
            coins: s.coins + challenge.rewardCoins,
            challenges: updatedChallenges,
            regions: updatedRegions,
            unlockedRegions: unlockedRegion
              ? [...s.unlockedRegions, unlockedRegion.id]
              : s.unlockedRegions,
            unlockedShoes: [...s.unlockedShoes, ...rewardShoes.map((sh) => sh.id)],
            unlockedElements: [...s.unlockedElements, ...rewardElements.map((e) => e.id)],
          };
        });

        get().showRewardModal({
          coins: challenge.rewardCoins,
          shoes: rewardShoes,
          elements: rewardElements,
          region: unlockedRegion,
        });
      },

      unlockShoe: (shoeId) =>
        set((state) => ({
          unlockedShoes: [...state.unlockedShoes, shoeId],
        })),

      unlockElement: (elementId) =>
        set((state) => ({
          unlockedElements: [...state.unlockedElements, elementId],
        })),

      setCurrentPosition: (position) =>
        set({ currentPosition: position }),

      moveToBuilding: (buildingId) => {
        const state = get();
        const building = state.regions
          .flatMap((r) => r.buildings)
          .find((b) => b.id === buildingId);

        if (!building || !building.unlocked) return;

        set((s) => ({
          currentPosition: {
            ...s.currentPosition,
            moving: true,
            targetBuildingId: buildingId,
          },
        }));

        setTimeout(() => {
          set((s) => ({
            currentPosition: {
              x: building.x,
              y: building.y,
              moving: false,
              targetBuildingId: buildingId,
            },
          }));
          get().setSelectedBuilding(building);
        }, 1500);
      },

      setSelectedBuilding: (building) =>
        set({ selectedBuilding: building }),

      setSelectedChallenge: (challenge) =>
        set({ selectedChallenge: challenge }),

      showRewardModal: (data) =>
        set({
          showReward: true,
          rewardData: data,
        }),

      hideRewardModal: () =>
        set({
          showReward: false,
          rewardData: null,
        }),

      updateChallengeProgress: (challengeId, progress) => {
        set((state) => ({
          challenges: state.challenges.map((c) =>
            c.id === challengeId
              ? {
                  ...c,
                  requirements: {
                    ...c.requirements,
                    current: Math.min(progress, c.requirements.target),
                  },
                }
              : c
          ),
        }));
      },
    }),
    {
      name: 'city-map-storage',
    }
  )
);
