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
    <navMenu/>
    <div class="page" :ref="addPageRef">
        <el-container style="height: 90vh;">
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
                In these times, research of Image Generate Model has become a hot topic. 
                And the most popular one is Diffusion Model, 
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
  </div>
</template>
  
<script>

import { Container, Main } from "element-ui"
// import LinkedListNode from "../components/LinkedListNode.vue";
import navMenu from "../components/NavMenu.vue"
import "element-ui/lib/theme-chalk/index.css"

export default {
    name: 'demoEntry',
    data() {
      return {
        activeIndex: "1",
        currentPage: 0,
        pages: [],
        formula: '\\frac{1}{\\sqrt{1-x^2}}',
      }
    },
    methods: {
        addPageRef(el) {
            this.pages.push(el)
        },
        // scrollToIndex (index) {
        //     if (index < this.pages.length) {
        //         this.pages[index].scrollIntoView({ behavior: "smooth" })
        //     }
        // },
        // handleSelect (index) {
        //     if (index === '1' || index === '2') {
        //         this.scrollToIndex(parseInt(index) - 1)
        //     } 
        // }
    },
    components: {
      ElContainer: Container,
      ElMain: Main,
      navMenu,
      // LinkedListNode,
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
  