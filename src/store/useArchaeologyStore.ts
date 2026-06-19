import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ArchaeologyState } from '@/types';
import { initialArchaeologyLocations } from '@/data/archaeologyData';

export const useArchaeologyStore = create<ArchaeologyState>()(
  persist(
    (set, get) => ({
      locations: initialArchaeologyLocations,
      foundClueIds: [],
      solvedPuzzleIds: [],
      unlockedDesignIds: [],
      selectedLocationId: null,
      selectedRoomId: null,
      activePuzzleId: null,
      showReward: false,
      currentReward: null,
      showStory: false,
      currentStory: null,

      foundClue: (locationId, roomId, clueId) => {
        set((state) => {
          if (state.foundClueIds.includes(clueId)) return state;

          const updatedLocations = state.locations.map((loc) => {
            if (loc.id !== locationId) return loc;
            return {
              ...loc,
              rooms: loc.rooms.map((room) => {
                if (room.id !== roomId) return room;
                return {
                  ...room,
                  clues: room.clues.map((clue) =>
                    clue.id === clueId ? { ...clue, found: true } : clue
                  ),
                };
              }),
            };
          });

          return {
            foundClueIds: [...state.foundClueIds, clueId],
            locations: updatedLocations,
          };
        });
      },

      solvePuzzle: (locationId, roomId) => {
        const state = get();
        const location = state.locations.find((l) => l.id === locationId);
        if (!location) return;
        const room = location.rooms.find((r) => r.id === roomId);
        if (!room || room.puzzle.solved) return;

        const puzzleId = room.puzzle.id;
        if (state.solvedPuzzleIds.includes(puzzleId)) return;

        set((s) => {
          const updatedLocations = s.locations.map((loc) => {
            if (loc.id !== locationId) return loc;
            return {
              ...loc,
              rooms: loc.rooms.map((r) => {
                if (r.id !== roomId) return r;
                return {
                  ...r,
                  puzzle: { ...r.puzzle, solved: true },
                  reward: { ...r.reward },
                };
              }),
            };
          });

          return {
            solvedPuzzleIds: [...s.solvedPuzzleIds, puzzleId],
            unlockedDesignIds: [...s.unlockedDesignIds, roomId],
            locations: updatedLocations,
          };
        });

        get().showRewardModal(room.reward);
      },

      unlockLocation: (locationId) => {
        const state = get();
        const location = state.locations.find((l) => l.id === locationId);
        if (!location || location.unlocked) return false;

        set((s) => ({
          locations: s.locations.map((loc) =>
            loc.id === locationId ? { ...loc, unlocked: true } : loc
          ),
        }));
        return true;
      },

      exploreRoom: (locationId, roomId) => {
        set((s) => ({
          locations: s.locations.map((loc) => {
            if (loc.id !== locationId) return loc;
            return {
              ...loc,
              rooms: loc.rooms.map((room) => {
                if (room.id !== roomId) return room;
                return { ...room, explored: true };
              }),
            };
          }),
        }));
      },

      setSelectedLocation: (locationId) => set({ selectedLocationId: locationId, selectedRoomId: null }),

      setSelectedRoom: (roomId) => set({ selectedRoomId: roomId }),

      setActivePuzzle: (puzzleId) => set({ activePuzzleId: puzzleId }),

      showRewardModal: (reward) => set({ showReward: true, currentReward: reward }),

      hideRewardModal: () => set({ showReward: false, currentReward: null }),

      showStoryModal: (story) => set({ showStory: true, currentStory: story }),

      hideStoryModal: () => set({ showStory: false, currentStory: null }),

      canUnlockRoom: (locationId, roomId) => {
        const state = get();
        const location = state.locations.find((l) => l.id === locationId);
        if (!location) return false;
        const room = location.rooms.find((r) => r.id === roomId);
        if (!room) return false;
        if (!room.locked) return true;
        return room.requiredClueIds.every((id) => state.foundClueIds.includes(id));
      },

      getLocationProgress: (locationId) => {
        const state = get();
        const location = state.locations.find((l) => l.id === locationId);
        if (!location) return { rooms: '0/0', clues: '0/0', puzzles: '0/0' };

        const totalRooms = location.rooms.length;
        const exploredRooms = location.rooms.filter((r) => r.explored).length;

        const totalClues = location.rooms.reduce((acc, r) => acc + r.clues.length, 0);
        const foundClues = location.rooms.reduce(
          (acc, r) => acc + r.clues.filter((c) => state.foundClueIds.includes(c.id)).length,
          0
        );

        const totalPuzzles = location.rooms.length;
        const solvedPuzzles = location.rooms.filter((r) =>
          state.solvedPuzzleIds.includes(r.puzzle.id)
        ).length;

        return {
          rooms: `${exploredRooms}/${totalRooms}`,
          clues: `${foundClues}/${totalClues}`,
          puzzles: `${solvedPuzzles}/${totalPuzzles}`,
        };
      },
    }),
    {
      name: 'archaeology-storage',
    }
  )
);
