import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: useStorage("user_token", null),
    info: useStorage("user_info", null)
  })
});
