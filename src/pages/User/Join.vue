<template>
  <div class="join-container">
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
    <q-item>
      <q-item-section />
      <q-item-section>
        <q-input
          outlined
          v-model="user.name"
          label="이름"
          :dense="dense"
          :error="is_error.name"
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
          <template v-slot:error>
            {{ is_error_message.name }}
          </template>
        </q-input>
      </q-item-section>
      <q-item-section />
    </q-item>
    <q-item>
      <q-item-section />
      <q-item-section>
        <q-input
          v-model="user.birth"
          outlined
          type="date"
          :error="is_error.birth"
        >
          <template v-slot:prepend>
            <q-icon name="calendar_month" />
          </template>
          <template v-slot:error>
            {{ is_error_message.birth }}
          </template>
        </q-input>
      </q-item-section>
      <q-item-section />
    </q-item>
    <q-item>
      <q-item-section />
      <q-item-section>
        <q-select
          outlined
          v-model="user.cell"
          :options="options_cell"
          label="통신사 선택"
          :error="is_error.cell"
        >
          <template v-slot:prepend>
            <q-icon name="cell_tower" />
          </template>
          <template v-slot:error>
            {{ is_error_message.cell }}
          </template>
        </q-select>
      </q-item-section>
      <q-item-section />
    </q-item>
    <q-item>
      <q-item-section />
      <q-item-section>
        <q-input
          outlined
          v-model="user.phone"
          label="휴대폰전화번호"
          :dense="dense"
          type="phone"
          :error="is_error.phone"
        >
          <template v-slot:prepend>
            <q-icon name="phone_iphone" />
          </template>
          <template v-slot:error>
            {{ is_error_message.phone }}
          </template>
        </q-input>
      </q-item-section>
      <q-item-section />
    </q-item>
    <q-item>
      <q-item-section />
      <q-item-section>
        <q-btn class="join-btn" label="회원가입" @click="clickJoin" />
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
import { useUserStore } from 'stores/user';

export default {
  setup() {
    const store = useUserStore();
    const q = useQuasar();

    const is_pwd = ref(true);
    const options_cell = ref([
      "SKT",
      "KT",
      "LG U+",
      "SKT 알뜰폰",
      "KT 알뜰폰",
      "LG U+ 알뜰폰",
    ]);
    var validation = ref([]);
    const user = reactive({
      id: "",
      password: "",
      name: "",
      birth: "",
      cell: "",
      phone: "",
    });
    var is_error = ref({
      id: false,
      password: false,
      name: false,
      birth: false,
      cell: false,
      phone: false,
    });
    var is_error_message = ref({
      id: "",
      password: "",
      name: "",
      birth: "",
      cell: "",
      phone: "",
    });

    return {
      store,
      q,

      options_cell,
      is_pwd,
      validation,
      is_error,
      is_error_message,
      user,
    };
  },
  methods: {
    clickJoin() {
      const url = "/v1/user/join";
      this.validation = COMMON.CheckJoinVaildation(this.user);
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
              const token = res.data.data.token;
              this.store.userToken = token;

              this.q.dialog({
                title: "회원가입 완료",
                message: "회원가입을 완료하였습니다.",
              })
                .onOk(() => {
                  location.href = "/";
                })
            } else if(res.data.result == "exist") {
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
