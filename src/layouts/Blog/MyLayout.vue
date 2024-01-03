<template>
  <q-layout
    class="q-pa-md"
    view="lHh Lpr lFf"
    style="padding-left: 10%; padding-right: 10%; padding-top: 3%"
  >
    <header elevated>
      <!-- 검색 -->
      <q-item>
        <q-item-section>
          <div class="row">
            <q-select
              outlined
              v-model="model_target"
              :options="options_target"
            />
            <q-input
              outlined
              bottom-slots
              v-model="model_search"
              style="padding-bottom: 0%"
            >
              <template v-slot:append>
                <q-icon
                  v-if="model_search !== ''"
                  name="close"
                  @click="model_search = ''"
                  class="cursor-pointer"
                />
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </q-item-section>
        <q-item-section v-if="is_login">
          <div class="blog-tab">
            <q-img
              src="../../images/default_profile.png"
              style="max-width: 35px; height: 35px"
            />
            {{ user_info.name }} |
            <q-btn flat dense round icon="notifications" /> |
            <q-btn flat dense round icon="mail" /> |
            <q-btn flat dense round icon="menu" />
          </div>
        </q-item-section>
      </q-item>
    </header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { useUserStore } from "stores/user";
import COMMON from "../../common/common.js";
import { ref } from "vue";

export default defineComponent({
  setup() {
    const user_store = useUserStore();
    const token = user_store.token;

    const model_target = ref("글");
    const options_target = ["글", "블로그", "별명.아이디"];
    const model_search = ref("");
    var model_blog_tab = ref("home");
    var user_info = {};
    var is_login = false;

    // 토큰 만료 check
    if (!COMMON.isEmpty(token)) {
      COMMON.checkUserToken(token);
      user_info = JSON.parse(COMMON.setAESDecodnig(user_store.info));
      is_login = true;
    }

    return {
      model_target,
      options_target,
      user_info,
      model_blog_tab,
    };
  },

  methods: {
    clickMove(path) {
      location.href = "/" + path;
    },
  },
});
</script>
