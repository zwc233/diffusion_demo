<template>
    <div>

        <head>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet" />
        </head>
        <el-menu :default-active="this.$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
            <el-menu-item index="/home">
                <font-awesome-icon icon="fa-palette" size="2xl" style="color: #409EFF;" />
                <span style="margin-left: 8px;">Diffusion</span>
                &nbsp;&nbsp;
                <span> Model</span>
            </el-menu-item>
            <el-menu-item index="/principles">Principles</el-menu-item>
            <el-menu-item index="3">Feature</el-menu-item>
            <el-menu-item index="4">Classifier Guidance</el-menu-item>
            <el-menu-item index="5">Classifier Free</el-menu-item>
            <el-menu-item index="6">Evaluations</el-menu-item>
            <el-menu-item index="/result">Result</el-menu-item>
            <el-menu-item index="8">Stable Diffusion</el-menu-item>
            <el-menu-item index="9">References</el-menu-item>
            <el-menu-item index="10">
                <font-awesome-icon icon="fa-brands fa-github" size="2xl" />
                <a style="margin-left: 8px;" href="https://github.com/zwc233/guided-diffusion" target="_blank">Github</a>
            </el-menu-item>
        </el-menu>
    </div>
</template>
   
<script>
export default {
    name: "navMenu",
    data() {
        return {
            path: "",
            activeIndex: "/1",
        };
    },
    created() {
        this.onRouteChanged();
    },
    watch: {
        // 监听路由变化
        '$route.path': {
            handler(routePath) {
                this.handleSelect(routePath)
            }
        }
    },
    methods: {
        onRouteChanged() {

        },
        handleSelect() {
            this.activeIndex = this.$route.path
        }
    },
};
</script>
<style>
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
</style>