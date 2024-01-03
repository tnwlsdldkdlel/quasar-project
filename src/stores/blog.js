import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useBlogStore = defineStore("blog", {
  state: () => ({
    info: useStorage("blog_info", null)
  })
});
