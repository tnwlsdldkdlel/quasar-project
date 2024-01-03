<template>
  <div class="q-pa-md">
    <div>
      <!-- 상단 검색 -->
      <q-item>
        <q-item-section />
        <q-item-section>
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
        </q-item-section>
        <q-item-section />
      </q-item>
      <q-item style="padding-bottom: 1%">
        <q-item-section />
        <div class="q-pa-m q-gutter-sm">
          <q-btn round color="primary" icon="shopping_cart" />
          <q-btn round color="primary" icon="shopping_cart" />
          <q-btn round class="default-color" icon="note_alt" @click="clickMove('blog')"/>
          <q-btn round color="primary" icon="shopping_cart" />
          <q-btn round color="primary" icon="shopping_cart" />
          <q-btn round color="primary" icon="shopping_cart" />
          <q-btn round color="primary" icon="shopping_cart" />
          <q-btn round color="primary" icon="shopping_cart" />
          <q-btn round color="primary" icon="shopping_cart" />
          <q-btn round color="primary" icon="shopping_cart" />
        </div>
        <q-item-section />
      </q-item>

      <!-- 상단 광고 -->
      <q-item>
        <q-item-section />
        <div class="q-col-gutter-md row items-start">
          <div class="q-gutter-md">
            <q-carousel
              v-model="slide"
              transition-prev="scale"
              transition-next="scale"
              swipeable
              animated
              control-color="white"
              navigation
              padding
              arrows
              height="200px"
              class="bg-primary text-white shadow-1 rounded-borders"
            >
              <q-carousel-slide name="style" class="column no-wrap flex-center">
                <q-icon name="style" size="56px" />
                <div class="q-mt-md text-center">
                  {{ lorem }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide name="tv" class="column no-wrap flex-center">
                <q-icon name="live_tv" size="56px" />
                <div class="q-mt-md text-center">
                  {{ lorem }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide
                name="layers"
                class="column no-wrap flex-center"
              >
                <q-icon name="layers" size="56px" />
                <div class="q-mt-md text-center">
                  {{ lorem }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide name="map" class="column no-wrap flex-center">
                <q-icon name="terrain" size="56px" />
                <div class="q-mt-md text-center">
                  {{ lorem }}
                </div>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </div>
        <q-item-section />
      </q-item>

      <!-- 중간 1 뉴스기사, 로그인, 광고2 -->
      <q-item style="padding-right: 0%">
        <div style="width: 70%">
          <!-- 뉴스기사 -->
          <q-card>
            <div>
              <q-tabs
                v-model="tab"
                align="justify"
                narrow-indicator
                class="q-mb-lg"
              >
                <q-tab name="mails" label="뉴스스탠드" /> |
                <q-tab name="movies" label="엔터" /> |
                <q-tab name="movies" label="스포츠" /> |
                <q-tab name="movies" label="경제" />
              </q-tabs>

              <div class="q-gutter-y-sm">
                <q-tab-panels
                  v-model="tab"
                  animated
                  transition-prev="scale"
                  transition-next="scale"
                  class="bg-purple text-white text-center"
                >
                  <q-tab-panel name="mails">
                    <div class="text-h6">Mails</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-tab-panel>

                  <q-tab-panel name="alarms">
                    <div class="text-h6">Alarms</div>
                    Ad molestiae non facere animi nobis, similique nemo velit.
                  </q-tab-panel>

                  <q-tab-panel name="movies">
                    <div class="text-h6">Movies</div>
                    Nostrum necessitatibus expedita dolores? Voluptatem.
                  </q-tab-panel>
                </q-tab-panels>

                <q-tab-panels
                  v-model="tab"
                  animated
                  transition-prev="fade"
                  transition-next="fade"
                  class="bg-orange text-white text-center"
                >
                  <q-tab-panel name="mails">
                    <div class="text-h6">Mails</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-tab-panel>

                  <q-tab-panel name="alarms">
                    <div class="text-h6">Alarms</div>
                    Ad molestiae non facere animi nobis, similique nemo.
                  </q-tab-panel>

                  <q-tab-panel name="movies">
                    <div class="text-h6">Movies</div>
                    Nostrum necessitatibus expedita dolores? Voluptatem.
                  </q-tab-panel>
                </q-tab-panels>

                <q-tab-panels
                  v-model="tab"
                  animated
                  transition-prev="jump-up"
                  transition-next="jump-down"
                  class="bg-teal text-white text-center"
                >
                  <q-tab-panel name="mails">
                    <div class="text-h6">Mails</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-tab-panel>

                  <q-tab-panel name="alarms">
                    <div class="text-h6">Alarms</div>
                    Ad molestiae non facere animi nobis, similique nemo.
                  </q-tab-panel>

                  <q-tab-panel name="movies">
                    <div class="text-h6">Movies</div>
                    Nostrum necessitatibus expedita dolores? Voluptatem.
                  </q-tab-panel>
                </q-tab-panels>
              </div>
            </div>
          </q-card>
          <!-- 쇼핑-->
          <q-card style="top: 5%"> 쇼핑~ </q-card>
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
                <a href="/user/findId"> 아이디찾기</a>
                |
                <a href="http://"> 비밀번호찾기</a>
                |
                <a href="/user/join"> 회원가입</a>
              </div>
            </q-card-section>
          </q-card>
          <!-- 계정정보 -->
          <q-card class="login-after" v-if="is_login">
            <q-card-section style="display: grid">
              <div class="q-pa-m q-gutter-sm">
                <q-img
                  src="../images/default_profile.png"
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
                  <a class="text-black" href="http://"> 시작하기 </a> |
                  <a class="text-black" href="http://">
                    쪽지 <span class="default-color">0</span></a
                  >
                </div>
              </div>
            </q-card-section>
          </q-card>
          <q-card class="mailcafelogpay" v-if="is_login">
            <q-card-section style="display: grid">
              <div class="mailcafeblogpay-btn">
                <a
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;메일&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a
                >
                |
                <a
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;카페&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a
                >
                |
                <a
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;블로그&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a
                >
                |
                <a
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;페이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a
                >
              </div>
            </q-card-section>
          </q-card>
          <!-- 광고 -->
          <q-card style="top: 5%">
            <q-img src="https://picsum.photos/500/300" :ratio="16 / 9" />
          </q-card>
          <!-- 날씨 -->
          <q-card style="top: 10%"> 날씨~ </q-card>
        </div>
      </q-item>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useUserStore } from "stores/user";
import COMMON from "../common/common.js";
import { useQuasar } from "quasar";

export default {
  setup() {
    const user_store = useUserStore();
    const q = useQuasar();

    const model_search = ref("");
    var user_info = {};
    var is_login = false;

    if(!COMMON.isEmpty(user_store.info)) {
      user_info = JSON.parse(COMMON.setAESDecodnig(user_store.info));
      is_login = true;
    }

    return {
      user_store,
      q,

      is_login,
      user_info,
      model_search,
      slide: ref("style"),
      lorem:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.",
    };
  },
  methods: {
    clickMove(path) {
      location.href = "/" + path;
    },
    clickLogout() {
      this.user_store.token.delete();
      location.href = "/user/login";
    },
  },
};
</script>
