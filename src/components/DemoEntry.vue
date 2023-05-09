<template>
  <div id="app">
  <head>
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
      rel="stylesheet"
    />
  </head>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">Features</el-menu-item>
      <el-menu-item index="2">FAQ</el-menu-item>
      <el-menu-item index="3">Principle</el-menu-item>
      <el-menu-item index="5">Classifier Free</el-menu-item>
      <el-menu-item index="6">Stable Diffusion</el-menu-item>
      <el-menu-item index="7"><a href="https://github.com/zwc233/guided-diffusion" target="_blank">Github</a></el-menu-item>
    </el-menu>
    <el-container style="height: 100vh;">
      <el-main class="centered-content">
        <h1>
          <span style="margin-right: 15px;">Diffusion Model</span>
          <img style="width: 10%; position: relative; top: 11px;" src="../assets/images/with_noisy.png" alt="noisy" />
          <span style="color: #409EFF; margin-left: 5px;">Classifier Guidance</span>
        </h1>
        <div class="centered-image">
          <img src="../assets/images/diffusion_gif/12.gif" alt="Your GIF" />
          <img src="../assets/images/diffusion_gif/13.gif" alt="Your GIF" />
        </div>
        <div class="centered-text">
          <p>
            ZheJiang University, 2023, Graduation Project
            <br />
            <b>Diffusion Model with Classifier Guidance</b>
            <br />
            In these times, research of Image Generate Model has become a hot topic. 
            And the most popular one is <b>Diffusion Model</b>, 
            <br />
            a technique that can remove nosie from an fully noisy image and generate a clean image.
            <br />
            In our research, we use Classifier to guide the model to generate a specific image.
          </p>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
  
<script>

import { Container, Main } from "element-ui"
import "element-ui/lib/theme-chalk/index.css"

export default {
    name: 'demoEntry',
    data() {
      return {
      }
    },
    methods: {
    },
    components: {
      ElContainer: Container,
      ElMain: Main,
    },
}
</script>
  
<style>

.centered-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.centered-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

h1 {
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-size: 5em;
}

.centered-image {
  width: 100%;
  text-align: center;
}

.centered-text {
  text-align: center;
  margin-bottom: 1em;
}

.left-image, .right-image {
  position: absolute;
}

.left-image {
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

.right-image {
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}

p {
  font-family: "Open Sans", sans-serif;
  font-size: 1.2em;
  line-height: 1.5em;
}
</style>
  