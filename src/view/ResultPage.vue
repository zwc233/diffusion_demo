<template>
    <div>
        <navMenu />
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
                {{ '列表内容 ' + o }}
            </div>
        </el-card>
    </div>
</template>

<script>
import navMenu from "../components/NavMenu.vue"

export default {
    name: 'resultPage',
    methods: {
    },
    components: {
        navMenu,
    }
}
</script>

<style>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    width: 480px;
}

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
</style>