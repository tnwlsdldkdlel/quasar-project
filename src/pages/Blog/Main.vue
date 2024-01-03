<style>
#q-app > div > div > div > div > div > div:nth-child(3) > div.q-card.myblog-info-card > div:nth-child(1) > div > div {
  position: relative !important;
}
</style>
<template>
  <div class="q-pa-md">
    <div>
      <q-item class="blog-q-item">
        <!-- 이웃새글 -->
        <div style="width: 70%">
          <div>
            <span style="font-size: x-large">이웃새글</span>
          </div>
        </div>
        <div style="width: 2%"></div>
        <div style="width: 28%">
          <!-- 로그인 -->
          <q-card v-if="!is_login">
            <q-card-section style="display: grid">
              <div style="text-align: center; padding-bottom: 3%">
                네이버를 더 안전하고 편리하게 이용하세요 {{ is_login }}
              </div>
              <q-btn
                class="login-btn"
                label="로그인"
                @click="clickMove('user/login')"
              />
              <div class="idpwjoin-btn">
                <a href="http://"> 아이디찾기</a>
                |
                <a href="http://"> 비밀번호찾기</a>
                |
                <a href="/join"> 회원가입</a>
              </div>
            </q-card-section>
          </q-card>
          <!-- 계정정보 및 블로그활동정보 -->
          <q-card class="login-after" v-if="is_login">
            <q-card-section style="display: grid">
              <div class="q-pa-m q-gutter-sm">
                <q-img
                  src="../../images/default_profile.png"
                  style="max-width: 60px; height: 60px; float: left"
                />
                <div class="q-pa-m q-gutter-sm">
                  <a class="text-black">
                    <b>{{ user_info.name }}</b>
                  </a>
                  <q-btn
                    class="logout-btn"
                    outline
                    rounded
                    color="primary"
                    label="로그아웃"
                    @click="clickLogout"
                  >
                    <q-icon name="logout" />
                  </q-btn>
                  <br />
                  <span>{{ user_info.id }}</span>
                  <br />
                  <span>오늘 <span class="default-color">0</span>명 방문</span>
                </div>
              </div>
            </q-card-section>
          </q-card>
          <q-card class="myblogwrite-card" v-if="is_login">
            <q-card-section class="myblogwrite-btn">
              <div>
                <a :href="my_blog_path"
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;내
                  블로그&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a
                >
                |
                <a>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<q-icon
                    name="draw"
                    font-size="x-large"
                  />글쓰기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </a>
              </div>
            </q-card-section>
          </q-card>

          <q-card class="myblog-info-card" v-if="is_login">
            <q-card-section>
              <q-tabs
                v-model="model_blog_info_tab"
                dense
                class="text-black"
                active-color="primary"
                indicator-color="primary"
              >
                <q-tab name="my" label="내소식" />
                <q-tab name="activity" label="내활동" />
                <q-tab name="neighbor" label="이웃목록" />
              </q-tabs>
            </q-card-section>
            <q-card-section> test </q-card-section>
          </q-card>
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

export default {
  setup() {
    const user_store = useUserStore();
    const q = useQuasar();

    const model_search = ref("");
    const model_blog_info_tab = ref("my");
    var user_info = {};
    var is_login = false;
    var my_blog_path = "";

    if(!COMMON.isEmpty(user_store.info)) {
      user_info = JSON.parse(COMMON.setAESDecodnig(user_store.info));
      my_blog_path = "/blog/" + user_info.id;
      is_login = true;
    }

    return {
      user_store,
      q,

      is_login,
      user_info,
      model_search,
      model_blog_info_tab,
      my_blog_path
    };
  },
  methods: {
    clickMove(path) {
      location.href = "/" + path;
    },
    clickLogout() {
      localStorage.removeItem("user_info");
      localStorage.removeItem("user_token");
      location.href = "/user/login";
    },
  },
};
</script>
