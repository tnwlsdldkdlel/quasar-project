<template>
  <div class="login-container">
    <q-item>
      <q-item-section />
      <q-item-section>
        <q-input
          outlined
          v-model="user.id"
          label="아이디"
          :dense="dense"
          :error="is_error.id"
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
          <template v-slot:error>
            {{ is_error_message.id }}
          </template>
        </q-input>
      </q-item-section>
      <q-item-section />
    </q-item>
    <q-item>
      <q-item-section />
      <q-item-section>
        <q-input
          outlined
          v-model="user.password"
          label="비밀번호"
          :type="is_pwd ? 'password' : 'text'"
          :error="is_error.password"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="is_pwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="is_pwd = !is_pwd"
            />
          </template>
          <template v-slot:error>
            {{ is_error_message.password }}
          </template>
        </q-input>
      </q-item-section>
      <q-item-section />
    </q-item>
    <q-item class="error" v-if="!is_login">
      <q-item-section />
      <q-item-section>
        다시 로그인해주세요.
      </q-item-section>
      <q-item-section />
    </q-item>
    <q-item>
      <q-item-section />
      <q-item-section>
        <q-btn class="join-btn" label="로그인" @click="clickJoin"/>
      </q-item-section>
      <q-item-section />
    </q-item>
    <q-item>
      <q-item-section />
      <q-item-section>
        <div class="idpwjoin-btn">
          <a href="http://"> 아이디찾기</a>
          |
          <a href="http://"> 비밀번호찾기</a>
          |
          <a href="/join"> 회원가입</a>
        </div>
      </q-item-section>
      <q-item-section />
    </q-item>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import COMMON from "../../common/common.js";
import axios from "axios";
import { useQuasar } from "quasar";
import { useUserStore } from "stores/user";

export default {
  setup() {
    const user_store = useUserStore();
    const q = useQuasar();

    const is_pwd = ref(true);
    var validation = ref([]);
    const user = reactive({
      id: "",
      password: "",
    });
    var is_error = ref({
      id: false,
      password: false,
    });
    var is_error_message = ref({
      id: "",
      password: "",
    });
    var is_login = ref(true);

    return {
      user_store,
      q,

      is_pwd,
      validation,
      is_error,
      is_error_message,
      user,
      is_login
    };
  },
  methods: {
    clickJoin() {
      const url = "/v1/user/login";
      this.validation = COMMON.CheckLoginVaildation(this.user);
      var validation_flag = true;

      for (var index in this.validation) {
        this.is_error[this.validation[index].target] = true;
        this.is_error_message[this.validation[index].target] =
          this.validation[index].message;
        validation_flag = false;
      }

      if (validation_flag) {
        this.user.password = COMMON.setAESEncodnig(this.user.password);

        const formData = new FormData();
        Object.entries(this.user).forEach(([key, value]) => {
          formData.append(key, value);
        });

        axios
          .post(url, formData)
          .then((res) => {
            if (res.data.result == "success") {
              this.user_store.token = res.data.data.token;
              this.user_store.info = COMMON.setAESEncodnig(JSON.stringify(res.data.data.user_info));

              location.href = "/";
            } else {
              this.is_login = false;
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
