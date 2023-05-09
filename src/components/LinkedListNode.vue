<template>
    <el-tooltip content="链表节点" placement="top">
        <div class="linked-list-node">
        <div class="circle">{{ label }}</div>
        </div>
    </el-tooltip>
</template>
  
<script>
    export default {
        name: "LinkedListNode",
        props: {
            label: {
                type: String,
                default: "NODE",
            },
        },
    };
</script>
  
<style scoped>
  .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    border: 2px solid #409eff;
    border-radius: 50%;
    font-family: "Comic Sans MS", cursive, sans-serif;
    font-size: 18px;
    color: #409eff;
  }
</style>