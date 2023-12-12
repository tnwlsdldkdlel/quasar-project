<template>
  <q-layout class="q-pa-md" view="lHh Lpr lFf" style="padding-left: 10%;padding-right: 10%;">
    <header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" />

        <q-toolbar-title></q-toolbar-title>
        <div>
          <q-btn flat dense round icon="notifications"/>
        </div>
      </q-toolbar>
    </header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>
