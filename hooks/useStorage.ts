import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface BearState {
  language: "en.asad" | "ru.kuliev" | "ar.alafasy" | "uz.sodik";
  setLanguage: (
    lan: "en.asad" | "ru.kuliev" | "ar.alafasy" | "uz.sodik"
  ) => void;
  author: string;
  setAuthor: (author: string) => void;
  status: {
    number?: number;
    status?: "play" | "pause";
  };
  setStatus: (num: number, str: "play" | "pause") => void;
  audio: number;
  setAudio: (a: number) => void;
  plusAudio: () => void;
  plusNumber: () => void;
  context: string;
  setContext: (str: string) => void;
}

export const useStorage = create<BearState>()((set) => ({
  language: "en.asad",
  setLanguage: (lan: "en.asad" | "ru.kuliev" | "ar.alafasy" | "uz.sodik") =>
    set((state) => ({ language: lan })),
  author: "ar.alafasy",
  setAuthor: (author: string) =>
    set((state) => ({ author: author.toLowerCase() })),
  status: {},
  setStatus: (num: number, str: "play" | "pause") =>
    set((state) => ({
      status: {
        number: num,
        status: str,
      },
    })),
  audio: 0,
  setAudio: (a) => set((state) => ({ audio: a })),
  plusAudio: () => set((state) => ({ audio: state.audio + 1 })),
  plusNumber: () =>
    set((state) => ({
      status: { number: state.audio + 1, status: "pause" },
    })),
  context: "Toshkent",
  setContext: (str: string) => set((state) => ({ context: str })),
}));
