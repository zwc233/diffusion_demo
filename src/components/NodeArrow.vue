<template>
  <div class="arrow-container">
    <div v-if="!isDashed" class="arrow" :class="arrowDirection">
      <div class="arrow-line" :class="arrowDirection"></div>
      <i class="el-icon-arrow-right arrow-icon" :class="arrowDirection"></i>
      <span class="arrow-text" :class="textDirection">{{ text }}</span>
    </div>
    <div v-else class="dashed-arrow" :class="arrowDirection">
      <div class="dashed-arrow-line" :class="arrowDirection"></div>
      <i class="el-icon-d-arrow-right dashed-arrow-icon" :class="arrowDirection"></i>
      <span class="dashed-arrow-text" :class="textDirection">{{ text }}</span>
    </div>
  </div>
</template>
  
<script>
  export default {
    name: "nodeArrow",
    props: {
      isDashed: {
        type: Boolean,
        default: false
      },
      direction: {
        type: String,
        default: "right"
      },
      bend: {
        type: String,
        default: "straight"
      },
      text: {
        type: String,
        default: ""
      }
    },
    computed: {
      arrowDirection() {
        return `arrow-${this.direction}-${this.bend}`;
      },
      textDirection() {
        return `text-${this.direction}-${this.bend}`;
      }
    }
  };
</script>
  
<style scoped>
  .arrow-container {
    display: flex;
    align-items: center;
  }
  
  .arrow,
  .dashed-arrow {
    display: flex;
    align-items: center;
  }
  
  .arrow-icon,
  .dashed-arrow-icon {
    font-size: 24px;
  }
  
  .arrow-right-straight .arrow-text,
  .dashed-arrow-right-straight .dashed-arrow-text {
    margin-left: 8px;
  }
  
  .arrow-left-straight .arrow-text,
  .dashed-arrow-left-straight .dashed-arrow-text {
    margin-right: 8px;
  }
  
  .arrow-right-up .arrow-text,
  .dashed-arrow-right-up .dashed-arrow-text {
    margin-left: 8px;
    position: relative;
    bottom: 16px;
  }
  
  .arrow-left-up .arrow-text,
  .dashed-arrow-left-up .dashed-arrow-text {
    margin-right: 8px;
    position: relative;
    bottom: 16px;
  }
  
  .arrow-right-down .arrow-text,
  .dashed-arrow-right-down .dashed-arrow-text {
    margin-left: 8px;
    position: relative;
    top: 16px;
  }
  
  .arrow-left-down .arrow-text,
  .dashed-arrow-left-down .dashed-arrow-text {
    margin-right: 8px;
    position: relative;
    top: 16px;
  }

  .arrow-line,
  .dashed-arrow-line {
    width: 50px;
    height: 2px;
    background-color: #000;
    margin-right: 4px;
  }

  .dashed-arrow-line {
    background-image: linear-gradient(to right, #000 50%, rgba(255, 255, 255, 0) 50%);
    background-size: 4px 100%;
  }
</style>