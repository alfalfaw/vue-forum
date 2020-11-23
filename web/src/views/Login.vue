<template>
  <div class="container">
    <div class="tabs bg-white pb-5">
      <div class="px-5 pt-2">
        <div class="tab-header fs-md d-flex border-bottom-1">
          <div class="pt-4 pb-2 px-5 item " :class="{ active: $route.path === '/login' }" @click="handleTabClick('/login')">登录</div>
          <div class="pt-4 pb-2 px-5 item ml-5" :class="{ active: $route.path !== '/login' }" @click="handleTabClick('/register')">
            {{ $route.path === '/forget' ? '忘记密码' : '注册' }}
          </div>
        </div>
      </div>
      <div class="overflow-hidden pt-4">
        <div class="tab-content" :style="{ right: $route.path === '/login' ? '0%' : '100%' }">
          <div class="tab px-5">
            <form>
              <div class="form-item">
                <ValidationProvider name="email" tag="div" rules="required|email" v-slot="{ errors }">
                  <label>邮箱</label>
                  <input v-model="loginForm.email" type="text" />
                  <span class="ml-3">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="form-item">
                <ValidationProvider name="password" tag="div" rules="required|password:6,18" v-slot="{ errors }">
                  <label>密码</label>
                  <input v-model="loginForm.password" type="password" autocomplete="off" />
                  <span class="ml-3">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-item">
                <label>验证码</label>
                <input v-model="loginForm.code" type="text" />
                <span class="ml-3" v-html="svg" @click="getCaptcha"></span>
              </div>
              <div class="footer d-flex ai-center">
                <button class="px-4 py-3 mr-4">立即登录</button>

                <div @click="$router.push('/forget')">忘记密码?</div>
              </div>
            </form>
          </div>
          <div class="tab px-5">
            <div v-if="$route.path === '/register'">注册</div>
            <div v-else>找回密码</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, localize } from 'vee-validate'

export default {
  name: 'Login',
  components: {
    ValidationProvider
  },

  data() {
    return {
      svg: '',
      loginForm: {}
    }
  },
  methods: {
    async getCaptcha() {
      const res = await this.$http.get('/getCaptcha')
      if (res.status === 200 && res.data.code === 200) {
        this.svg = res.data.data
      }
    },
    handleTabClick(toPath) {
      if (toPath === this.$route.path || (this.$route.path === '/forget' && toPath === '/register')) {
        return false
      }
      this.$router.push(toPath)
    },
    localize() {
      localize('en')
    }
  },
  mounted() {
    this.getCaptcha()
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 8rem;
  background: map-get($colors, 'gray-3');
  min-height: 100vh;
  .tabs {
    max-width: 600px;
    margin: 0 auto;
    .tab-header {
      .item {
        border-bottom: 2px solid transparent;
      }
      .active {
        border-bottom: 2px solid $primary-color;
      }
    }
    .tab-content {
      display: flex;
      position: relative;
      transition: 0.35s;
      .tab {
        width: 100%;
        flex: 1 0 auto;

        .form-item {
          display: flex;
          margin-bottom: 2rem;
          line-height: 40px;
          height: 40px;
          > div {
            display: flex;
          }
        }
        label {
          text-align: center;
          font-weight: bold;
          display: inline-block;
          width: 90px;
          border: 1px solid #dee2e6;
          border-right: none;
          background: map-get($colors, 'gray-1');
        }
        input {
          border: 1px solid #dee2e6;
          padding: 0 15px;
          min-width: 225px;
        }

        .footer {
          button {
            border: none;
            color: white;
            outline: none;
            background: $primary-color;
          }
        }
      }
    }
  }
}
</style>
