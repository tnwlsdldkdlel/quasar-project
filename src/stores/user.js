import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", {
  state: () => ({
    userToken: useStorage('userToken', null)
  })
});
