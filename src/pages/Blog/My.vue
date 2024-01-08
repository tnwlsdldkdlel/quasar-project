<template>
  <div class="q-pa-md">
    <q-item class="myblog-q-item"> <b>전체보기</b>&nbsp;0개의 글 </q-item>
  </div>
</template>

<script>
import { ref } from "vue";
import { useUserStore } from "stores/user";
import { useBlogStore } from "stores/blog";
import COMMON from "../../common/common.js";

export default {
  setup() {
    const user_store = useUserStore();
    const blog_store = useBlogStore();

    return {
      user_store
    };
  },
  methods: {
  },
};
</script>
