<template>
  <div class="q-pa-md">
    <q-item class="myblog-q-item">
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
                style="color: grey"
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
                  @click="clickBlogWrite"
                >
                  관리
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    <q-item class="myblog-q-item"> <b>전체보기</b>&nbsp;0개의 글 </q-item>
  </div>
</template>

<script>
import { ref } from "vue";
import { useUserStore } from "stores/user";
import { useBlogStore } from "stores/blog";
import COMMON from "../../common/common.js";
import { useQuasar } from "quasar";
import axios from "axios";
import LoginVue from "../User/Login.vue";

export default {
  setup() {
    const user_store = useUserStore();
    const blog_store = useBlogStore();
    const q = useQuasar();

    var user_info = {};
    var blog_info = {};
    var category = ref({});
    const category_expend = ref(true);

    if (!COMMON.isEmpty(blog_store.info) && !COMMON.isEmpty(user_store.info)) {
      blog_info = JSON.parse(COMMON.setAESDecodnig(blog_store.info));
      user_info = JSON.parse(COMMON.setAESDecodnig(user_store.info));

      category = ref(blog_info.category);
    }

    return {
      user_store,
      q,

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
  },
};
</script>
