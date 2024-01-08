<template>
  <div class="q-pa-md">
    <q-item class="myblog-q-item">
      <b>블로그 정보</b>
    </q-item>
    <hr />
    <q-item>
      <q-item-section>
        <b>블로그명</b>
        <span class="text-gray"
          >한글, 영문, 숫자 혼용가능 (한글 기준 25자 이내)</span
        >
      </q-item-section>
      <q-item-section>
        <q-input :dense="false" v-model="model_blog_title" clearable />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <b>이름</b>
        <span class="text-gray"
          >한글, 영문, 숫자 혼용가능 (한글 기준 10자 이내)</span
        >
      </q-item-section>
      <q-item-section>
        <q-input :dense="false" v-model="model_user_name" clearable />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <b>소개글</b>
        <span class="text-gray"
          >블로그 프로필 영역의 프로필 이미지 아래에 반영됩니다. (한글 기준
          200자 이내)</span
        >
      </q-item-section>
      <q-item-section>
        <q-input
          :dense="false"
          v-model="model_blog_profile"
          type="textarea"
          clearable
        />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <b>블로그 프로필 이미지</b>
      </q-item-section>
      <q-item-section>
        <div style="width: 68%">
          <q-img
            src="../../../images/default_profile.png"
            style="max-width: 161px; height: 161px"
          />
          <div style="float: right">
            <q-btn
              rounded
              class="text-gray"
              size="md"
              label="등록"
              @click="clickBlogProfileImg"
            />
            &nbsp;
            <q-btn rounded class="text-gray" size="md" label="삭제" />
            <br />
            <br />
            <span class="text-gray"
              >프로필 이미지는 가로 161px 섬네일로 생성됩니다.</span
            >
            <br />
            <q-checkbox v-model="model_apply_progfile" />
            프로필에도 적용합니다.
          </div>
        </div>
      </q-item-section>
    </q-item>
    <q-item style="padding-left: 50%; padding-top: 5%">
      <q-btn rounded class="myblogwrite-btn" size="md" label="확인" />
    </q-item>

    <!-- 이미지첨부 dialog -->
    <q-dialog v-model="model_dialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm" style="font-weight: bolder">이미지 첨부</span>
        </q-card-section>
        <q-card-section>
          <q-file outlined v-model="model_blog_profile_img" label="이미지 첨부">
            <template v-slot:append>
              <q-icon name="attachment" />
            </template>
          </q-file>
          <br />
          <span class="text-grey" style="padding-top: 3%"
            >파일명이 영문, 숫자가 아닐경우 이미지가 안보일 수 있습니다.</span
          >
          <br />
          <span class="text-red" v-if="img_error" style="font-weight: bolder"
            >이미지를 확인해주세요.</span
          >
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="취소"
            class="text-grey"
            v-close-popup="model_dialog_close"
          />
          <q-btn
            flat
            label="등록"
            class="default-color"
            @click="clickBlogProgImgSaveBtn"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { useUserStore } from "stores/user";
import { useBlogStore } from "stores/blog";
import COMMON from "../../../common/common.js";
import axios from "axios";

export default {
  setup() {
    const user_store = useUserStore();
    const blog_store = useBlogStore();

    var user_info = {};
    var blog_info = {};

    // 가져온 블로그 정보
    if (!COMMON.isEmpty(blog_store.info) && !COMMON.isEmpty(user_store.info)) {
      blog_info = JSON.parse(COMMON.setAESDecodnig(blog_store.info));
      user_info = JSON.parse(COMMON.setAESDecodnig(user_store.info));
    }

    const model_blog_title = ref(blog_info.title);
    const model_user_name = ref(user_info.name);
    const model_blog_profile = ref(blog_info.profile);
    const model_apply_progfile = ref(false);
    const model_dialog = ref(false);
    const model_blog_profile_img = ref(null);
    const img_error = ref(false);
    const model_dialog_close = ref(true);

    return {
      user_store,

      model_blog_title,
      model_user_name,
      model_blog_profile,
      model_apply_progfile,
      model_dialog,
      model_blog_profile_img,
      img_error,
      model_dialog_close,
    };
  },
  methods: {
    clickBlogProfileImg() {
      this.model_dialog = true;

      // 기존값 reset
      this.img_error = false;
      this.model_blog_profile_img = null;
    },
    clickBlogProgImgSaveBtn() {
      if (COMMON.isEmpty(this.model_blog_profile_img)) {
        this.img_error = true;
      } else {
        this.imgUpload();
      }
    },
    imgUpload() {
      const url = "/v1/blog/profile/";
      const formData = new FormData();
      formData.append("blogProfileImg", this.model_blog_profile_img);
      formData.append("token", this.user_store.token);

      axios.put(url, formData).then((res) => {
        if (res.data.result == "success") {
          // 이미지 업로드 후~
        }
      });
    },
  },
  watch: {
    model_blog_profile_img: function (vaule) {
      if (!COMMON.isEmpty(vaule)) {
        if (!vaule.type.match("image/.*")) {
          this.img_error = true;
          this.model_blog_profile_img = null;
        }
      }
    },
  },
};
</script>
