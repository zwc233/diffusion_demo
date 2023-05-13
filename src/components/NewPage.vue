<template>
    <div>
        <navMenu/>
        <el-button @click="handleClick">点击我</el-button>
    </div>
</template>

<script>
import navMenu from "./NavMenu.vue"

export default {
    name: 'newPage',
    methods: {
        handleClick() {
            this.$message('你好，这是一个新页面！');
        }
    },
    components: {
        navMenu,
    }
}
</script>