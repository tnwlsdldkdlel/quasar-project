<template>
  <q-layout
    class="q-pa-md"
    view="lHh Lpr lFf"
    style="padding-left: 10%; padding-right: 10%"
  >
    <header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" />
        <q-toolbar-title></q-toolbar-title>
        <div>
          <q-btn flat dense round icon="notifications" />
        </div>
      </q-toolbar>
    </header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { useUserStore } from "stores/user";
import COMMON from "../common/common.js";

export default defineComponent({
  setup() {
    const user_store = useUserStore();
    const token = user_store.token;

    // 토큰 만료 check
    if (!COMMON.isEmpty(token)) {
      COMMON.checkUserToken(token);
    }
  },
});
</script>
