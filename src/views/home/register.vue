<template>
  <div class="login">
    <Particles
      id="tsparticles"
      class="login__particles"
      :options="options"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
    />

    <div class="loginPart">
      <h2>用户注册</h2>
      <el-form
        aria-autocomplete="off"
        :model="registerForm"
        ref="registerFormRef"
        :rules="rules"
        label-width="100px"
        style="transform: translate(-30px)"
      >
        <el-form-item label="账号" prop="email">
          <el-input
            v-model="registerForm.email"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="registerForm.password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            type="password"
            v-model="registerForm.confirmPassword"
            placeholder="请确认密码"
            show-password
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="验证码" prop="code"> -->
        <!-- <el-input
              style="width: 150px"
              v-model="registerForm.code"
              placeholder="请输入验证码"
              maxlength="6"
              clearable
            ></el-input> -->
        <!-- <el-button
              round
              class="code-btn"
              type="primary"
              v-if="isTime"
              @click="getCode(registerForm.email)"
              >获取验证码</el-button
            >
            <el-button
              round
              class="code-btn"
              size="Large"
              color="#c0c4c3"
              v-if="!isTime"
              >{{ currentTime }}后重新获取</el-button
            > -->
        <!-- </el-form-item> -->
        <el-button class="btn" type="primary" @click="register">注册</el-button>
        <div style="text-align: right; transform: translate(0, 30px)">
          <el-link type="success" @click="goToLogin">已有账号？去登录</el-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { loadFull } from "tsparticles";
import { Engine } from "tsparticles-engine";

const isTime = ref(true);
const currentTime = ref(10);

const registerForm = ref({
  email: "",
  password: "",
  confirmPassword: "",
  code: "",
});

const registerFormRef = ref({
  email: "",
  password: "",
  confirmPassword: "",
  code: "",
});

const rules = {
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "邮箱格式不正确", trigger: ["blur", "change"] },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  confirmPassword: [
    { required: true, message: "请确认密码", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value == "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== registerForm.value.password) {
          callback(new Error("两次密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};

const router = useRouter();

//   const register = async () => {
//     registerForm.value.email = registerForm.value.email.trim();
//     registerForm.value.password = registerForm.value.password.trim();
//     registerForm.value.code = registerForm.value.code.trim();
//     const res = await registerService(registerForm.value);
//     //ElMessage.success(res.message ? res.message : '注册成功!')
//     ElMessage.success("注册成功!");
//     goToLogin;
//   };

const goToLogin = () => {
  router.push("/");
};

const options = ref({
  fpsLimit: 100,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "grab",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.6,
        size: 10,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#000000",
    },
    links: {
      color: "#e67757",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 800,
      },
      value: 60,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 3,
    },
  },
  detectRetina: true,
});

// 粒子效果
const particlesInit = async (engine) => {
  await loadFull(engine);
};
const particlesLoaded = async (container) => {
  // console.log("Particles container loaded", container)
};
</script>

<style scoped>
.login {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.login__particles {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  /* background-image: url("../../assets/6dce1f60360c4e9e9c9968d409833969.png"); */
  opacity: 0.9;
  position: fixed;
  pointer-events: none;
}

.loginPart {
  position: absolute;
  /*定位方式绝对定位absolute*/
  top: 50%;
  left: 80%;
  /*顶和高同时设置50%实现的是同时水平垂直居中效果*/
  transform: translate(-50%, -50%);
  /*实现块元素百分比下居中*/
  width: 450px;
  padding: 50px;
  background: rgba(255, 204, 255, 0.3);
  /*背景颜色为黑色，透明度为0.8*/
  box-sizing: border-box;
  /*box-sizing设置盒子模型的解析模式为怪异盒模型，
      将border和padding划归到width范围内*/
  box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.5);
  /*边框阴影  水平阴影0 垂直阴影15px 模糊25px 颜色黑色透明度0.5*/
  border-radius: 15px;
  /*边框圆角，四个角均为15px*/
}

h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
  /*文字居中*/
}

.btn {
  transform: translate(170px);
  width: 80px;
  height: 40px;
  font-size: 15px;
}
.code-btn {
  transform: translate(20px);
  width: 90px;
  height: 40px;
  font-size: 10px;
}
</style>
