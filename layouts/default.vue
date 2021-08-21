<template>
  <el-container class="layout">
    <LayoutSider :menus="menus" :collapsed="collapsed" />

    <el-container>
      <el-header class="layout-header">
        <i v-show="!collapsed" class="el-icon-s-fold" @click="collapsed = !collapsed"></i>
        <i v-show="collapsed" class="el-icon-s-unfold" @click="collapsed = !collapsed"></i>
        <LayoutBreadcrumb :menus="menus" style="margin-left: 20px" />
        <LayoutAvatar class="layout-header-avatar" />
      </el-header>

      <LayoutTab :menus="menus" />

      <el-main class="layout-main">
        <Nuxt />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, useRouter } from '@nuxtjs/composition-api';

  import { loginPath } from '@/config';
  import { queryMenus } from '@/api/common/menu';
  import { getUserInfo } from '@/api/system/user';
  import { useAuthStore } from '@/store/auth';
  import { useDictStore } from '@/store/dict';

  export default defineComponent({
    setup() {
      const menus = queryMenus();
      const collapsed = ref(false);
      onMounted(async () => {
        const res = await getUserInfo();
        if (res?.data.success) {
          useAuthStore().setUserInfo(res.data.result);
        } else {
          useRouter().push(loginPath);
        }
        useDictStore().initDict();
      });
      return {
        menus,
        collapsed,
      };
    },
  });
</script>

<style lang="less" scoped>
  .layout {
    background-color: #f0f2f5;

    &-header {
      display: flex;
      align-items: center;
      height: 60px;
      font-size: 24px;
      background-color: #fff;

      &-avatar {
        margin-left: auto;
        line-height: 60px;
      }
    }

    &-main {
      margin: 16px;
      height: calc(100vh - 150px);
      background-color: #fff;
    }
  }
</style>
