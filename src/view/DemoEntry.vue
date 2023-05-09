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
      <el-menu-item index="1">
        <font-awesome-icon icon="fa-palette" size="2xl" style="color: #409EFF;" />
        <span style="margin-left: 8px;">Diffusion</span>
        &nbsp;&nbsp;
        <span> Model</span>
      </el-menu-item>
      <el-menu-item index="2">Principles</el-menu-item>
      <el-menu-item index="3">FAQ</el-menu-item>
      <el-menu-item index="4">Feature</el-menu-item>
      <el-menu-item index="5">Classifier Guidance</el-menu-item>
      <el-menu-item index="6">Classifier Free</el-menu-item>
      <el-menu-item index="7">Evaluations</el-menu-item>
      <el-menu-item index="8">Stable Diffusion</el-menu-item>
      <el-menu-item index="9">References</el-menu-item>
      <el-menu-item index="10">
        <font-awesome-icon icon="fa-brands fa-github" size="2xl" />
        <a style="margin-left: 8px;" href="https://github.com/zwc233/guided-diffusion" target="_blank">Github</a>
      </el-menu-item>
    </el-menu>
    <div class="page" :ref="addPageRef">
        <el-container style="height: 120vh;">
        <el-main class="centered-content">
            <img src="../assets/images/icosahedron.png" style="width: 10%;" alt="icosahedron" />
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
                <br/>
                <b>Diffusion Model with Classifier Guidance</b>.
                <br/>
                In these times, research of Image Generate Model has become a hot topic. 
                And the most popular one is <b>Diffusion Model</b>, 
                a technique that can remove nosie from an fully noisy image and generate a clear image.
                In our research, we use Classifier to guide the model to generate a specific image.
                In detail, like ink disperses in water. Diffusion Model use forward process to sequentially add guassian noise to the image
                from which we can get useful labels to train to backward process.
                And In backward process we generate a fully noise, use our diffusion model to remove noise util it become clear
            </p>
            </div>
        </el-main>
        </el-container>
    </div>
    <div class="page" :ref="addPageRef">
        <h1>Principles</h1>
        <div class="centered-content">
            <p class="centered-text">
                Diffusion models are inspired by non-equilibrium thermodynamics. 
                They define a Markov chain of diffusion steps to slowly add random noise to data and then learn to reverse the diffusion process to construct desired data samples from the noise. 
                Unlike VAE or flow models, diffusion models are learned with a fixed procedure and the latent variable has high dimensionality (same as the original data).
            </p>
        </div>
        <p class="big_left_title">Forward Process</p>
        <font-awesome-icon icon="fa-sharp fa-solid fa-arrow-right-long"/>
        <el-row>
            <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="2"><linked-list-node label="X0"></linked-list-node></el-col>
            <el-col :span="2"><font-awesome-icon icon="fa-sharp fa-solid fa-arrow-right-long"/></el-col>
            <el-col :span="2"><linked-list-node label="X1"></linked-list-node></el-col>
            <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="2"><linked-list-node label="X2"></linked-list-node></el-col>
            <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="2"><linked-list-node label="X3"></linked-list-node></el-col>
            <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="2"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
        <p class="big_left_title">Backward Process</p>
        <el-row>
            <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
    </div>
  </div>
</template>
  
<script>

import { Container, Main } from "element-ui"
import LinkedListNode from "../components/LinkedListNode.vue";
import "element-ui/lib/theme-chalk/index.css"

export default {
    name: 'demoEntry',
    data() {
      return {
        activeIndex: "1",
        currentPage: 0,
        pages: [],
      }
    },
    methods: {
        addPageRef(el) {
            this.pages.push(el)
        },
        scrollToIndex (index) {
            if (index < this.pages.length) {
                this.pages[index].scrollIntoView({ behavior: "smooth" })
            }
        },
        handleSelect (index) {
            if (index === '1' || index === '2') {
                this.scrollToIndex(parseInt(index) - 1)
            } 
        }
    },
    components: {
      ElContainer: Container,
      ElMain: Main,
      LinkedListNode,
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

.big_left_title {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 3em;
}

.centered-image {
  width: 100%;
  text-align: center;
}

.centered-text {
  text-align: center;
  max-width: 73em;
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

.el-menu-demo {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.el-menu-demo .el-menu-item {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto", sans-serif;
  font-weight: 20;
  color: #303133;
}

.el-menu {
  background: linear-gradient(to bottom, #ADD8E6, #FFFFFF) !important;
}

html, body {
  margin: 0;
  padding: 0;
}

.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
  