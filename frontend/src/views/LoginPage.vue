<template>
  <div class="app-shell" :style="cursorStyle">
    <div class="cursor-capture" aria-hidden="true"></div>
    <div class="cursor-core" aria-hidden="true"></div>

    <header class="topbar">
      <div class="brand">LEAF-SMS</div>
      <nav class="nav">
        <a href="#home">首页</a>
        <a href="#about">关于</a>
        <a @click.prevent="scrollToLogin">登录</a>
        <a href="#contact">联系</a>
      </nav>
    </header>

    <main class="page">
      <section class="hero" id="home">
        <p class="eyebrow">学生学籍管理系统</p>
        <div ref="titleStackRef" class="title-stack">
          <div class="title-layer title-layer--en">
            <h1 class="hero-title">LEAF-SMS</h1>
          </div>
          <div class="title-layer title-layer--cn">
            <h1 class="hero-title">学生学籍管理系统</h1>
          </div>
        </div>
        <p class="subcopy">专业的学生学籍管理解决方案，助力教育信息化管理</p>
      </section>

      <section
        class="panel flip-panel login-panel"
        :class="{ flipped: flippedPanels.has('login') }"
        id="login-section"
        @mouseenter="flipOn('login')"
      >
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <h2>登录</h2>
          </div>
          <div class="flip-card-back login-back">
            <div class="login-form-wrapper">
              <div class="login-view-header">
                <h2>{{ viewTitle }}</h2>
                <div class="view-indicator">
                  <div class="indicator-dot" :class="{ active: currentView === 'login' }"></div>
                  <div class="indicator-dot" :class="{ active: currentView === 'register' }"></div>
                  <div class="indicator-dot" :class="{ active: currentView === 'forgot' }"></div>
                </div>
              </div>

              <div v-if="currentView === 'login'" class="view-content">
                <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="0">
                  <el-form-item prop="email">
                    <el-input v-model="loginForm.email" placeholder="邮箱" prefix-icon="Message" size="large" />
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input v-model="loginForm.password" type="password" placeholder="密码" prefix-icon="Lock"
                      show-password size="large" @keyup.enter="handleLogin" />
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox v-model="loginForm.rememberPassword">记住密码</el-checkbox>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" :loading="loginLoading" @click="handleLogin" size="large"
                      class="dark-submit-btn">
                      {{ loginLoading ? '登录中...' : '登录' }}
                    </el-button>
                  </el-form-item>
                  <div class="dark-form-footer">
                    <a @click="currentView = 'register'">没有账号？立即注册</a>
                    <a @click="currentView = 'forgot'">忘记密码？</a>
                  </div>
                </el-form>
              </div>

              <div v-else-if="currentView === 'register'" class="view-content">
                <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules" label-width="0">
                  <el-form-item prop="email">
                    <el-input v-model="registerForm.email" placeholder="邮箱" prefix-icon="Message" size="large" />
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input v-model="registerForm.password" type="password" placeholder="密码" prefix-icon="Lock"
                      show-password size="large" @input="checkPasswordStrength" />
                    <div v-if="registerForm.password" class="password-strength">
                      <div class="strength-bar">
                        <div class="strength-level" :class="passwordStrength.level"
                          :style="{ width: passwordStrength.width + '%' }"></div>
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox v-model="registerForm.agreed">
                      我已阅读并同意 <a @click.prevent="showUserAgreement" class="inline-link">用户协议</a> 和
                      <a @click.prevent="showPrivacyPolicy" class="inline-link">隐私政策</a>
                    </el-checkbox>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" :loading="registerLoading" @click="handleRegister" size="large"
                      class="dark-submit-btn">
                      {{ registerLoading ? '注册中...' : '注册' }}
                    </el-button>
                  </el-form-item>
                  <div class="dark-form-footer">
                    <a @click="currentView = 'login'">已有账号？立即登录</a>
                  </div>
                </el-form>
              </div>

              <div v-else-if="currentView === 'forgot'" class="view-content">
                <el-form ref="forgotFormRef" :model="forgotForm" :rules="forgotRules" label-width="0">
                  <el-form-item prop="email">
                    <el-input v-model="forgotForm.email" placeholder="管理员邮箱" prefix-icon="Message" size="large" />
                  </el-form-item>
                  <el-form-item prop="verificationCode">
                    <div class="verification-code-container">
                      <el-input v-model="forgotForm.verificationCode" placeholder="邮箱验证码" prefix-icon="Key"
                        size="large" />
                      <el-button :disabled="forgotCodeSending || forgotCountdown > 0" :loading="forgotCodeSending"
                        @click="sendForgotVerificationCode" size="large" class="dark-code-btn">
                        {{ forgotCountdown > 0 ? `${forgotCountdown}s` : '获取验证码' }}
                      </el-button>
                    </div>
                  </el-form-item>
                  <el-form-item prop="newPassword">
                    <el-input v-model="forgotForm.newPassword" type="password" placeholder="新密码" prefix-icon="Lock"
                      show-password size="large" />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" :loading="forgotLoading" @click="handleForgotPassword" size="large"
                      class="dark-submit-btn">
                      {{ forgotLoading ? '重置中...' : '重置密码' }}
                    </el-button>
                  </el-form-item>
                  <div class="dark-form-footer">
                    <a @click="currentView = 'login'">返回登录</a>
                  </div>
                </el-form>
              </div>
            </div>
          </div>
          <div class="wipe-line"></div>
        </div>
      </section>

      <section
        class="panel flip-panel"
        :class="{ flipped: flippedPanels.has('about') }"
        id="about"
        @mouseenter="flipOn('about')"
      >
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <h2>关于</h2>
          </div>
          <div class="flip-card-back">
            <h2>关于</h2>
            <p>LEAF-SMS 学生学籍管理系统，提供学生信息管理、班级管理、学籍变动管理等功能，助力学校信息化管理。</p>
          </div>
          <div class="wipe-line"></div>
        </div>
      </section>

      <footer
        class="panel footer flip-panel"
        :class="{ flipped: flippedPanels.has('contact') }"
        id="contact"
        @mouseenter="flipOn('contact')"
      >
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <h2>联系</h2>
          </div>
          <div class="flip-card-back">
            <h2>联系</h2>
            <div class="contact-links">
              <a href="https://github.com/BOATCHUANGU/Personnal-Web" target="_blank" rel="noreferrer">Personnal-Web</a>
              <a href="https://github.com/BOATCHUANGU" target="_blank" rel="noreferrer">@BOATCHUANGU</a>
            </div>
          </div>
          <div class="wipe-line"></div>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, reactive, markRaw } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import store from '@/utils/store.js'
import api from '../services/api'
import * as utils from '@/utils/utils.js'

const router = useRouter()
const route = useRoute()

const cursorX = ref(window.innerWidth / 2)
const cursorY = ref(window.innerHeight / 2)
const maskX = ref(window.innerWidth / 2)
const maskY = ref(window.innerHeight / 2)
const titleStackRef = ref(null)
const flippedPanels = ref(new Set())

const flipOn = (id) => {
  if (flippedPanels.value.has(id)) return
  const next = new Set(flippedPanels.value)
  next.add(id)
  flippedPanels.value = next
}

let cursorCleanup = () => {}

const cursorStyle = computed(() => ({
  '--cursor-x': `${cursorX.value}px`,
  '--cursor-y': `${cursorY.value}px`,
  '--mask-x': `${maskX.value}px`,
  '--mask-y': `${maskY.value}px`,
}))

const currentView = ref('login')
const viewTitle = computed(() => {
  const titles = { login: '登录', register: '注册', forgot: '重置密码' }
  return titles[currentView.value]
})

const loginFormRef = ref()
const loginForm = reactive({
  email: '',
  password: '',
  rememberPassword: false
})

const registerFormRef = ref()
const registerForm = reactive({
  email: '',
  password: '',
  agreed: false
})

const passwordStrength = reactive({
  level: 'weak',
  width: 0
})

const forgotFormRef = ref()
const forgotForm = reactive({
  email: '',
  verificationCode: '',
  newPassword: '',
  confirmPassword: ''
})

const loginLoading = ref(false)
const registerLoading = ref(false)
const forgotLoading = ref(false)
const forgotCodeSending = ref(false)
const forgotCountdown = ref(0)

const loginRules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}

const registerRules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}

const forgotRules = {
  email: [
    { required: true, message: '请输入管理员邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  verificationCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}

const sendForgotVerificationCode = async () => {
  if (!forgotForm.email) {
    ElMessage.warning('请先输入管理员邮箱')
    return
  }
  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(forgotForm.email)) {
    ElMessage.warning('请输入正确的邮箱格式')
    return
  }
  try {
    forgotCodeSending.value = true
    const response = await api.users.sendResetCode({ email: forgotForm.email })
    if (response && response.code === 200) {
      ElMessage.success('验证码已发送，请查收邮箱')
      startForgotCountdown()
    } else {
      ElMessage.error(response?.message || '验证码发送失败')
    }
  } catch (error) {
    ElMessage.error('验证码发送失败，请检查网络连接')
  } finally {
    forgotCodeSending.value = false
  }
}

const startForgotCountdown = () => {
  forgotCountdown.value = 60
  const timer = setInterval(() => {
    forgotCountdown.value--
    if (forgotCountdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

const checkPasswordStrength = () => {
  const password = registerForm.password
  if (!password) {
    passwordStrength.level = 'weak'
    passwordStrength.width = 0
    return
  }
  let score = 0
  if (password.length >= 8) score += 25
  else if (password.length >= 6) score += 15
  if (/[a-z]/.test(password)) score += 15
  if (/[A-Z]/.test(password)) score += 15
  if (/[0-9]/.test(password)) score += 15
  if (/[^a-zA-Z0-9]/.test(password)) score += 20
  if (score >= 80) {
    passwordStrength.level = 'strong'
    passwordStrength.width = 100
  } else if (score >= 50) {
    passwordStrength.level = 'medium'
    passwordStrength.width = 66
  } else {
    passwordStrength.level = 'weak'
    passwordStrength.width = 33
  }
}

const showUserAgreement = () => {
  ElMessageBox.alert(
    '欢迎使用LEAF-SMS学生学籍管理系统！\n\n本系统为学生学籍管理提供全面解决方案，包括学生信息管理、班级管理、学籍变动管理等功能。\n\n使用本系统即表示您同意遵守相关规定，妥善保管账号密码，确保学生信息安全。',
    '用户协议',
    {
      confirmButtonText: '我已阅读',
      type: 'info'
    }
  )
}

const showPrivacyPolicy = () => {
  router.push('/privacy-policy')
}

const handleLogin = async () => {
  try {
    const response = await store.login(loginForm)
    if (response.success) {
      ElMessage.success('登录成功')
      const userRole = store.state.user?.roleCode
      const rolePaths = {
        'ADMIN': '/admin',
        'ACADEMIC': '/academic',
        'HEADTEACHER': '/headteacher',
        'TEACHER': '/teacher',
        'PARENT': '/parent'
      }
      const redirectPath = userRole && rolePaths[userRole] ? rolePaths[userRole] : '/admin'
      router.replace(redirectPath)
    } else {
      ElMessage.error(response.message || '登录失败')
    }
  } catch (error) {
    ElMessage.error(error.message || '登录失败，请检查网络连接')
  }
}

const handleRegister = async () => {
  try {
    const registerData = {
      email: registerForm.email,
      password: registerForm.password
    }
    const response = await store.register(registerData)
    if (response.success) {
      ElMessage.success('注册成功，正在自动登录...')
      const userRole = store.state.user?.roleCode
      const rolePaths = {
        'ADMIN': '/admin',
        'ACADEMIC': '/academic',
        'HEADTEACHER': '/headteacher',
        'TEACHER': '/teacher',
        'PARENT': '/parent'
      }
      const redirectPath = userRole && rolePaths[userRole] ? rolePaths[userRole] : '/admin'
      router.replace(redirectPath)
    } else {
      ElMessage.error(response.message || '注册失败')
    }
  } catch (error) {
    ElMessage.error('注册失败，请检查网络连接')
  }
}

const handleForgotPassword = async () => {
  try {
    const response = await store.resetPassword(forgotForm)
    if (response.success) {
      ElMessage.success('密码重置成功')
      currentView.value = 'login'
    } else {
      ElMessage.error(response.message || '密码重置失败')
    }
  } catch (error) {
    ElMessage.error('密码重置失败，请检查网络连接')
  }
}

const scrollToLogin = () => {
  flipOn('login')
  const el = document.getElementById('login-section')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  const update = (clientX, clientY) => {
    cursorX.value = clientX
    cursorY.value = clientY
    const rect = titleStackRef.value?.getBoundingClientRect()
    if (rect) {
      maskX.value = clientX - rect.left
      maskY.value = clientY - rect.top
    }
  }

  const onMove = (event) => update(event.clientX, event.clientY)
  document.addEventListener('mousemove', onMove, { passive: true })

  const touchSet = (event) => {
    const point = event.touches?.[0]
    if (!point) return
    update(point.clientX, point.clientY)
  }
  document.addEventListener('touchmove', touchSet, { passive: true })

  cursorCleanup = () => {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('touchmove', touchSet)
  }

  setTimeout(() => flipOn('login'), 800)

  if (route.query.mode === 'register') {
    currentView.value = 'register'
  }

  const savedCredentials = utils.getCredentials()
  if (savedCredentials) {
    loginForm.email = savedCredentials.username
    loginForm.password = savedCredentials.password
    loginForm.rememberPassword = true
    if (loginForm.email === 'admin@leaf.com') {
      loginForm.email = 'admin@leafsms.com'
    }
  }

  if (loginFormRef.value) loginFormRef.value = markRaw(loginFormRef.value)
  if (registerFormRef.value) registerFormRef.value = markRaw(registerFormRef.value)
  if (forgotFormRef.value) forgotFormRef.value = markRaw(forgotFormRef.value)
})

onBeforeUnmount(() => {
  cursorCleanup()
})
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: #fff;
  color: #111;
  cursor: none;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.cursor-capture,
.cursor-core {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  border-radius: 50%;
  transform: translate3d(var(--cursor-x), var(--cursor-y), 0) translate(-50%, -50%);
  will-change: transform;
}

.cursor-capture {
  z-index: 10;
  width: 168px;
  height: 168px;
  background: #fff;
  mix-blend-mode: difference;
  transition: width 0.6s ease, height 0.6s ease;
}

.cursor-core {
  z-index: 11;
  width: 168px;
  height: 168px;
  background: transparent;
  mix-blend-mode: normal;
  transition: width 0.6s ease, height 0.6s ease;
}

.app-shell:has(.topbar:hover) .cursor-capture,
.app-shell:has(.topbar:hover) .cursor-core {
  width: 0;
  height: 0;
}

.app-shell:has(.login-form-wrapper:hover) .cursor-capture,
.app-shell:has(.login-form-wrapper:hover) .cursor-core {
  width: 0;
  height: 0;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 5vw;
  border-bottom: 1px solid #111;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(12px);
  cursor: auto;
}

.topbar a {
  cursor: pointer;
}

.brand {
  letter-spacing: 0.22em;
  font-size: 0.9rem;
  font-weight: 700;
}

.nav {
  display: flex;
  gap: 24px;
  font-size: 0.92rem;
}

.nav a {
  color: #111;
  text-decoration: none;
  transition: opacity 0.2s;
}

.nav a:hover {
  opacity: 0.6;
}

.page {
  min-height: calc(100vh - 66px);
}

.hero {
  position: relative;
  min-height: calc(100vh - 66px);
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 18px;
  padding: 64px 8vw;
  text-align: center;
}

.title-stack {
  position: relative;
  width: 100%;
  min-height: 240px;
  display: grid;
  place-items: center;
  isolation: isolate;
  pointer-events: none;
  z-index: 5;
}

.title-layer {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}

.hero-title {
  margin: 0;
  max-width: 13ch;
  font-size: clamp(3rem, 8vw, 7rem);
  line-height: 0.95;
  letter-spacing: -0.06em;
  text-align: center;
}

.title-layer--en {
  z-index: 1;
  -webkit-mask-image: radial-gradient(circle 84px at var(--mask-x, var(--cursor-x)) var(--mask-y, var(--cursor-y)), transparent 0 83px, #000 84px);
  mask-image: radial-gradient(circle 84px at var(--mask-x, var(--cursor-x)) var(--mask-y, var(--cursor-y)), transparent 0 83px, #000 84px);
}

.title-layer--cn {
  z-index: 2;
  -webkit-mask-image: radial-gradient(circle 84px at var(--mask-x, var(--cursor-x)) var(--mask-y, var(--cursor-y)), #000 0 83px, transparent 84px);
  mask-image: radial-gradient(circle 84px at var(--mask-x, var(--cursor-x)) var(--mask-y, var(--cursor-y)), #000 0 83px, transparent 84px);
  mix-blend-mode: normal;
}

.eyebrow,
.subcopy,
.panel p {
  margin: 0;
  max-width: 46rem;
  line-height: 1.7;
  color: rgba(17, 17, 17, 0.72);
}

.panel {
  min-height: 38vh;
  display: grid;
  align-content: center;
  gap: 12px;
  padding: 72px 8vw;
  border-top: 1px solid rgba(17, 17, 17, 0.1);
}

.panel h2 {
  margin: 0;
  font-size: clamp(1.5rem, 2vw, 2.25rem);
}

.footer {
  min-height: 28vh;
}

.flip-panel {
  padding: 0;
  min-height: 38vh;
  display: block;
  border-top: 1px solid rgba(17, 17, 17, 0.1);
}

.flip-panel.footer {
  min-height: 28vh;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  min-height: inherit;
  overflow: hidden;
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  inset: 0;
  display: grid;
  align-content: center;
  gap: 12px;
  padding: 72px 8vw;
  min-height: inherit;
}

.flip-card-front {
  background: #fff;
  color: #111;
  z-index: 1;
}

.flip-card-front h2 {
  margin: 0;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  letter-spacing: -0.04em;
}

.flip-card-back {
  background: #111;
  color: #fff;
  z-index: 2;
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1.5s cubic-bezier(0.1, 0.9, 0.20, 1);
  grid-template-columns: 1fr 1fr;
  align-items: center;
  align-content: center;
}

.flip-panel.flipped .flip-card-back {
  clip-path: inset(0 0% 0 0);
}

.flip-card-back h2 {
  margin: 0;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  letter-spacing: -0.04em;
  color: #fff;
  order: 2;
  justify-self: end;
  text-align: right;
  padding-right: 4vw;
}

.flip-card-back p,
.flip-card-back a {
  margin: 0;
  max-width: 46rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.78);
  order: 1;
}

.flip-card-back a {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  order: 1;
}

.wipe-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0%;
  width: 2px;
  background: #fff;
  z-index: 3;
  pointer-events: none;
  transition: left 1.5s cubic-bezier(0.1, 0.9, 0.20, 1);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

.flip-panel.flipped .wipe-line {
  left: 100%;
}

.login-panel {
  min-height: 70vh;
}

.login-back {
  grid-template-columns: 1fr !important;
  padding: 48px 8vw !important;
}

.login-form-wrapper {
  max-width: 480px;
  width: 100%;
  order: 1 !important;
}

.login-view-header {
  margin-bottom: 32px;
}

.login-view-header h2 {
  font-size: clamp(1.8rem, 3vw, 2.5rem) !important;
  order: unset !important;
  justify-self: unset !important;
  text-align: left !important;
  padding-right: 0 !important;
  margin-bottom: 12px !important;
}

.view-indicator {
  display: flex;
  gap: 8px;
}

.indicator-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.indicator-dot.active {
  background: #fff;
  transform: scale(1.4);
}

.view-content {
  animation: fadeInUp 0.4s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-form-wrapper :deep(.el-form-item) {
  margin-bottom: 18px;
}

.login-form-wrapper :deep(.el-input__wrapper) {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  box-shadow: none;
  transition: all 0.3s ease;
}

.login-form-wrapper :deep(.el-input__wrapper:hover) {
  border-color: rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.12);
}

.login-form-wrapper :deep(.el-input__wrapper.is-focus) {
  border-color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.08);
}

.login-form-wrapper :deep(.el-input__inner) {
  color: #fff;
  height: 40px;
  line-height: 40px;
}

.login-form-wrapper :deep(.el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.4);
}

.login-form-wrapper :deep(.el-input__prefix),
.login-form-wrapper :deep(.el-input__suffix) {
  color: rgba(255, 255, 255, 0.5);
}

.login-form-wrapper :deep(.el-checkbox__label) {
  color: rgba(255, 255, 255, 0.7);
}

.login-form-wrapper :deep(.el-checkbox__inner) {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.3);
}

.login-form-wrapper :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background: #fff;
  border-color: #fff;
}

.login-form-wrapper :deep(.el-checkbox__input.is-checked .el-checkbox__inner::after) {
  border-color: #111;
}

.login-form-wrapper :deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
  color: #fff;
}

.dark-submit-btn {
  width: 100%;
  height: 42px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  background: #fff !important;
  border: none !important;
  color: #111 !important;
  transition: all 0.3s ease;
}

.dark-submit-btn:hover {
  background: rgba(255, 255, 255, 0.85) !important;
  transform: translateY(-1px);
}

.dark-code-btn {
  min-width: 120px;
  background: rgba(255, 255, 255, 0.12) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: #fff !important;
  border-radius: 8px;
}

.dark-code-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2) !important;
}

.dark-code-btn:disabled {
  opacity: 0.5;
}

.verification-code-container {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}

.verification-code-container :deep(.el-input) {
  flex: 1;
}

.dark-form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.dark-form-footer a {
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  font-size: 13px;
  text-decoration: none;
  transition: color 0.2s;
}

.dark-form-footer a:hover {
  color: #fff;
}

.inline-link {
  color: rgba(255, 255, 255, 0.8) !important;
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
}

.inline-link:hover {
  color: #fff !important;
}

.password-strength {
  margin-top: 8px;
}

.strength-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 3px;
  overflow: hidden;
}

.strength-level {
  height: 100%;
  border-radius: 3px;
  transition: all 0.5s ease;
}

.strength-level.weak {
  background: #ff6b6b;
}

.strength-level.medium {
  background: #f39c12;
}

.strength-level.strong {
  background: #27ae60;
}

.login-form-wrapper :deep(.el-form-item__error) {
  color: #ff6b6b;
}

@media (max-width: 720px) {
  .topbar {
    gap: 16px;
    align-items: flex-start;
    flex-direction: column;
  }

  .nav {
    gap: 16px;
    flex-wrap: wrap;
  }

  .cursor-core {
    width: 120px;
    height: 120px;
  }

  .cursor-capture {
    width: 120px;
    height: 120px;
  }

  .flip-card-front h2 {
    font-size: clamp(2rem, 6vw, 3rem);
  }

  .login-panel {
    min-height: 80vh;
  }

  .login-back {
    padding: 32px 6vw !important;
  }

  .login-form-wrapper {
    max-width: 100%;
  }

  .verification-code-container {
    flex-direction: column;
    gap: 8px;
  }

  .dark-code-btn {
    min-width: 100%;
  }

  .dark-form-footer {
    flex-direction: column;
    gap: 8px;
    align-items: stretch;
    text-align: center;
  }
}
</style>
