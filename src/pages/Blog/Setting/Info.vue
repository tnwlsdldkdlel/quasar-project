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
        <q-input
          :dense="false"
          v-model="blog.title"
          clearable
          :error="is_error.title"
        >
          <template v-slot:error>
            {{ is_error_message.title }}
          </template>
        </q-input>
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
        <q-input
          :dense="false"
          v-model="blog.name"
          clearable
          :error="is_error.name"
        >
          <template v-slot:error>
            {{ is_error_message.name }}
          </template>
        </q-input>
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
          v-model="blog.profile"
          type="textarea"
          clearable
          :error="is_error.profile"
        >
          <template v-slot:error>
            {{ is_error_message.profile }}
          </template>
        </q-input>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <b>블로그 프로필 이미지</b>
      </q-item-section>
      <q-item-section>
        <div style="width: 68%">
          <q-img
            v-if="blog.profile_img == ''"
            src="../../../images/default_profile.png"
            style="max-width: 161px; height: 161px"
          />
          <q-img
            v-if="blog.profile_img != ''"
            :src="blog.profile_img"
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
            <q-btn
              rounded
              class="text-gray"
              size="md"
              label="삭제"
              @click="clickBlogProfileImgRemove"
            />
            <br />
            <br />
            <span class="text-gray"
              >프로필 이미지는 가로 161px 섬네일로 생성됩니다.</span
            >
            <br />
            <q-checkbox v-model="blog.apply_progfile" />
            프로필에도 적용합니다.
          </div>
        </div>
      </q-item-section>
    </q-item>
    <q-item style="padding-left: 50%; padding-top: 5%">
      <q-btn
        rounded
        class="myblogwrite-btn"
        size="md"
        label="확인"
        @click="clickUpdate"
      />
    </q-item>

    <!-- 이미지첨부 dialog -->
    <q-dialog v-model="model_dialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm" style="font-weight: bolder">이미지 첨부</span>
        </q-card-section>
        <q-card-section>
          <q-file
            ref="fileInput"
            outlined
            v-model="model_temp_blog_profile_img"
            label="이미지 첨부"
            accept="image/*"
          >
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
import { ref, reactive } from "vue";
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
    var validation = ref([]);

    // 가져온 블로그 정보
    if (!COMMON.isEmpty(blog_store.info) && !COMMON.isEmpty(user_store.info)) {
      blog_info = JSON.parse(COMMON.setAESDecodnig(blog_store.info));
      user_info = JSON.parse(COMMON.setAESDecodnig(user_store.info));
    }

    const blog = reactive({
      title: blog_info.title,
      profile: blog_info.profile,
      apply_progfile: false,
      profile_img: "",
      name: user_info.name,
    });

    const model_dialog = ref(false);
    const img_error = ref(false);
    const model_dialog_close = ref(true);
    const model_img_remove_dialog = ref(false);
    const model_temp_blog_profile_img = ref("");
    const update_img_flag = ref(false);

    if (!COMMON.isEmpty(blog_info.profileImg)) {
      blog.profile_img = ref("/src/images" + blog_info.profileImg);
    }

    var is_error = ref({
      title: false,
      name: false,
      profile: false,
    });
    var is_error_message = ref({
      title: "",
      name: "",
      profile: "",
    });

    return {
      user_store,

      model_dialog,
      img_error,
      model_dialog_close,
      blog_info,
      model_img_remove_dialog,
      model_temp_blog_profile_img,
      blog,
      validation,
      is_error,
      is_error_message,
      update_img_flag
    };
  },
  methods: {
    clickBlogProfileImg() {
      this.model_dialog = true;

      // 기존값 reset
      this.img_error = false;
      this.model_temp_blog_profile_img = null;
    },
    clickBlogProgImgSaveBtn() {
      if (COMMON.isEmpty(this.model_temp_blog_profile_img)) {
        this.img_error = true;
      } else {
        this.model_dialog = false;
        this.blog.profile_img = URL.createObjectURL(
          this.$refs.fileInput.modelValue
        );
        this.update_img_flag = true;
      }
    },
    // imgUpload() {
    //   const url = "/v1/blog/profile";
    //   const formData = new FormData();
    //   formData.append("uploadProfileImg", this.model_temp_blog_profile_img);
    //   formData.append("seq", this.blog_info.seq);
    //   const headers = { "Content-Type": "multipart/form-data" };

    //   axios.post(url, formData, headers).then((res) => {
    //     if (res.data.result == "success") {
    //       this.model_dialog = false;
    //     } else {
    //       this.model_dialog = true;
    //       this.img_error = true;
    //     }
    //   });
    // },
    clickBlogProfileImgRemove() {
      this.blog.profile_img = "";
      this.update_img_flag = true;
    },
    async clickUpdate() {
      this.validation = COMMON.CheckBlogInfoVaildation(this.blog);
      var validation_flag = true;

      for (var index in this.validation) {
        this.is_error[this.validation[index].target] = true;
        this.is_error_message[this.validation[index].target] =
          this.validation[index].message;
        validation_flag = false;
      }

      if (validation_flag) {
        const formData = new FormData();
        Object.entries(this.blog).forEach(([key, value]) => {
          formData.append(COMMON.convertSnakeCaseToCamelCase(key), value);
        });
        formData.append("seq", this.blog_info.seq);

        // 프로필 변경 감지.
        if(this.update_img_flag) {
          formData.append("uploadProfileImg", this.model_temp_blog_profile_img);
          formData.delete("profileImg");
        }

        const headers = { "Content-Type": "multipart/form-data" };
        const url = "/v1/blog/info";
        await axios
          .post(url, formData, headers)
          .then((res) => {
            if (res.data.result == "success") {
              this.user_store.token = res.data.data.token;
              this.user_store.info = COMMON.setAESEncodnig(
                JSON.stringify(res.data.data.userInfo)
              );

              this.q
                .dialog({
                  title: "회원가입 완료",
                  message: "회원가입을 완료하였습니다.",
                })
                .onOk(() => {
                  location.href = "/";
                });
            } else if (res.data.result == "exist") {
              this.is_error["id"] = true;
              this.is_error_message["id"] = "이미 존재하는 회원 아이디입니다.";
              this.validation_flag = false;
            }
          })
          .catch((res) => {
            console.log(res);
          });
      }
    },
  },
};
</script>
