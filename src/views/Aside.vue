<template>
  <el-row class="tac" >
    <el-col :span="24">
      <el-menu
        :default-active="$route.path"
        router 
        :unique-opened="true"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="/stocklist">
          <span slot="title">股票列表</span>
        </el-menu-item>
        <el-menu-item index="/helloworld">
          <span slot="title">HelloWorld</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'Aside',
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    }
  }
</script>

<style lang="less" scoped >
.el-col-12{
    width: 15%;
}
</style>