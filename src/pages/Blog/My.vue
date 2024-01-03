<template>
  <div class="q-pa-md">
    <div>
      <q-item class="blog-q-item">
        <div>
          {{ user_info.name }} <br />
          {{ user_info.id }}
          {{  blog_info }}
        </div>
      </q-item>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useUserStore } from "stores/user";
import COMMON from "../../common/common.js";
import { useQuasar } from "quasar";
import axios from "axios";

export default {
  setup() {
    const user_store = useUserStore();
    const q = useQuasar();

    const model_search = ref("");
    const model_blog_info_tab = ref("my");
    var user_info = {};
    var is_login = false;
    var my_blog_path = "";
    var blog_info = {};

    if (!COMMON.isEmpty(user_store.info)) {
      user_info = JSON.parse(COMMON.setAESDecodnig(user_store.info));
      is_login = true;

      // 로그인했으면 블로그 정보 가져오기
      async function getBlogInfo() {
        const url = "/v1/blog/info/" + token;
        const q = useQuasar();

        await axios.get(url).then((res) => {
          if (res.data.result == "success") {
            blog_info = res.data.data.blogInfo;
          }
        });
      }
    }

    return {
      user_store,
      q,

      is_login,
      user_info,
      model_search,
      model_blog_info_tab,
      my_blog_path,
      blog_info
    };
  },
  methods: {
    clickMove(path) {
      location.href = "/" + path;
    },
    clickLogout() {
      this.user_store.delete();
      location.href = "/user/login";
    },
  },
};
</script>
