<template>
  <div id="bst-avatar">
    <el-dropdown class="bst-avatar-dropdown" size="small" @command="handleCommand">
      <span>
        <img :src="userInfo.avatar" alt="" width="100%" style="border-radius: 50%" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, useRouter } from '@nuxtjs/composition-api';

  import { useAuthStore } from '@/store/auth';
  import { loginPath } from '@/config';

  export default defineComponent({
    setup() {
      const router = useRouter();
      const authStore = useAuthStore();
      const userInfo = computed(() => authStore.getUserInfo);

      function handleCommand(command: string) {
        if (command === 'logout') {
          authStore.setToken('');
          router.push(loginPath);
        }
      }

      return {
        handleCommand,
        userInfo,
      };
    },
  });
</script>

<style lang="less" scoped>
  #bst-avatar {
    height: 40px;
    width: 40px;

    border-radius: 50%;
    cursor: pointer;
    color: #000;

    .bst-avatar-dropdown {
      height: 100%;
    }
  }
</style>
