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
          <q-btn round color="primary" icon="shopping_cart" />
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
          <q-card style="top: 5%;">
            쇼핑~
          </q-card>
        </div>
        <div style="width: 2%"></div>
        <div style="width: 28%">
          <!-- 로그인 -->
          <q-card>
            <q-card-section style="display: grid">
              <div style="text-align: center; padding-bottom: 3%">
                네이버를 더 안전하고 편리하게 이용하세요
              </div>
              <q-btn color="primary" label="Primary" />
              <div
                class="q-pa-md"
                style="text-align: center; padding-bottom: 0%"
              >
                <a href="http://"> 아이디찾기</a> |
                <a href="http://"> 비밀번호찾기</a> |
                <a href="http://"> 회원가입</a>
              </div>
            </q-card-section>
          </q-card>
          <!-- 광고 -->
          <q-card style="top: 5%">
            <q-img src="https://picsum.photos/500/300" :ratio="16 / 9" />
          </q-card>
           <!-- 날씨 -->
          <q-card style="top: 10%">
           날씨~
          </q-card>
        </div>
      </q-item>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const model_search = ref("");

    return {
      model_search,
      slide: ref("style"),
      lorem:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.",
    };
  },
};
</script>
