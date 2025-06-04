import { create, StateCreator } from "zustand";

interface CallingState {
  isCalling: boolean;
  toggleCalling: () => void;
}

const createCallingStateSlice: StateCreator<CallingState> = (set) => ({
  isCalling: false,
  toggleCalling: () =>
    set((state) => ({
      isCalling: !state.isCalling,
    })),
});

export const useCalling = create<CallingState>()((...a) => ({
  ...createCallingStateSlice(...a),
}));
