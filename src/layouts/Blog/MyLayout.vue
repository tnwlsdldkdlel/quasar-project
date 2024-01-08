<template>
  <q-layout
    class="q-pa-md"
    view="lHh Lpr lFf"
    style="padding-left: 10%; padding-right: 10%; padding-top: 3%"
  >
    <header elevated>
      <!-- 블로그 제목 -->
      <q-item class="myblog-q-item">
        <b>{{ blog_info.title }}</b>
      </q-item>
      <q-item class="myblog-q-item">
        <!-- 프로필 -->
        <div style="width: 28%">
          <div class="q-pa-m q-gutter-sm">
            <q-img
              src="../../images/default_profile.png"
              style="max-width: 60px; height: 60px; float: left"
            />
            <div class="q-pa-m q-gutter-sm">
              <a class="text-black">
                <b>{{ user_info.name }}</b>
              </a>
              <br />
              <span style="color: gray">{{ user_info.id }}</span>
              <br />
              <span
                >{{ blog_info.profile }}
                <q-btn
                  outline
                  rounded
                  label="EDIT"
                  class="text-gray"
                  size="xs"
                  @click="clickLogout"
              /></span>
              <br />
              <div style="padding-top: 2%">
                <div style="cursor: pointer; width: fit-content">
                  <q-icon name="edit" /><a
                    class="text-black"
                    @click="clickBlogWrite"
                  >
                    글쓰기
                  </a>
                  &nbsp;
                  <q-icon name="settings" /><a
                    class="text-black"
                    @click="clickBlogSetting"
                  >
                    관리
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 카테고리 -->
        <div style="width: 30%">
          <div
            style="cursor: pointer"
            @click="clickCategoryExpand"
            v-if="category_expend"
          >
            <b>category</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <q-icon name="expand_less" />
          </div>
          <div
            style="cursor: pointer"
            @click="clickCategoryExpand"
            v-if="!category_expend"
          >
            <b>category</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <q-icon name="expand_more" />
          </div>
          <div style="padding-top: 3%" v-if="category_expend">
            <div style="padding-bottom: 2%">
              <q-icon name="article" />
              전체보기(0)
            </div>
            <div v-for="item in category" :key="item">
              <q-icon name="article" />
              {{ item }} (0)
            </div>
          </div>
        </div>
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
import { useBlogStore } from "stores/blog";
import COMMON from "../../common/common.js";
import { ref } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";

export default defineComponent({
  setup() {
    const user_store = useUserStore();
    const blog_store = useBlogStore();
    const token = user_store.token;

    var user_info = {};
    var blog_info = {};

    var category = ref({});
    const category_expend = ref(true);

    // 토큰 만료 check
    if (!COMMON.isEmpty(token)) {
      COMMON.checkUserToken(token);
      user_info = JSON.parse(COMMON.setAESDecodnig(user_store.info));
    } else {
      location.href = "/";
    }

    // 로그인하고, blog info가 로컬스토리지에 없는 경우
    if (!COMMON.isEmpty(user_store.info) && COMMON.isEmpty(blog_store.info)) {
      getBlogInfo();

      // 로그인했으면 블로그 정보 가져오기
      async function getBlogInfo() {
        const url = "/v1/blog/info/" + user_store.token;

        await axios.get(url).then((res) => {
          if (res.data.result == "success") {
            blog_store.info = COMMON.setAESEncodnig(
              JSON.stringify(res.data.data.blogInfo)
            );
          }
        });
      }
    }

    // 가져온 블로그 정보
    if (!COMMON.isEmpty(blog_store.info) && !COMMON.isEmpty(user_store.info)) {
      blog_info = JSON.parse(COMMON.setAESDecodnig(blog_store.info));
      user_info = JSON.parse(COMMON.setAESDecodnig(user_store.info));

      category = ref(blog_info.category);
    }

    return {
      blog_store,

      user_info,
      blog_info,
      category,
      category_expend,
    };
  },

  methods: {
    clickCategoryExpand() {
      this.category_expend = this.category_expend == true ? false : true;
    },
    clickBlogWrite() {
      location.href = "/blog/" + this.user_info.id + "/write";
    },
    clickBlogSetting() {
      location.href = "/blog/" + this.user_info.id + "/setting";
    }
  },
});
</script>
