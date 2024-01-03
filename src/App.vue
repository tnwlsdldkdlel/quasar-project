<template>
  <component :is="$route.meta.layout || 'div'">
    <router-view></router-view>
  </component>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>
