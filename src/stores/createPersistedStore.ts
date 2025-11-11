import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type StorageType = "localStorage" | "sessionStorage";

interface CreatePersistedStoreOptions<T> {
  name: string;
  storageType?: StorageType;
  partialize?: (state: T) => Partial<T>;
}

export function createPersistedStore<T extends object>(
  stateCreator: StateCreator<T>,
  options: CreatePersistedStoreOptions<T>,
) {
  const { name, storageType = "localStorage", partialize } = options;
  const storage =
    storageType === "sessionStorage" ? sessionStorage : localStorage;

  return create<T>()(
    persist(stateCreator, {
      name,
      storage: createJSONStorage(() => storage),
      ...(partialize && { partialize }),
    }),
  );
}
