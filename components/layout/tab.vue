<template>
  <div class="bst-tab">
    <el-tabs :value="activePath" type="card" @tab-remove="handleRemove" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in tabs"
        :key="item.path"
        :label="item.title"
        :name="item.path"
        closable
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
  import {
    defineComponent,
    PropType,
    watch,
    reactive,
    useRoute,
    useRouter,
    computed,
    onMounted,
  } from '@nuxtjs/composition-api';

  import type { MenuItem } from '@/types/model';

  interface TabItem {
    path: string;
    title: string;
  }

  export default defineComponent({
    props: {
      menus: {
        type: Array as PropType<MenuItem[]>,
        required: true,
      },
    },
    setup(props) {
      const { menus } = props;

      const tabs = reactive<TabItem[]>([]);

      const route = useRoute();
      const router = useRouter();
      const activePath = computed(() => route.value.path);
      watch(activePath, (cur) => {
        handleAdd(cur);
        router.push(cur || '/');
      });
      onMounted(() => handleAdd(route.value.path));

      function handleAdd(targetName: string) {
        if (!tabs.some((tab) => tab.path === targetName)) {
          for (const menu of menus) {
            if (menu.path === targetName) {
              tabs.push({ path: targetName, title: menu.name });
            } else if (menu.children) {
              for (const child of menu.children) {
                if (child.path === targetName) {
                  tabs.push({ path: targetName, title: child.name });
                }
              }
            }
          }
        }
      }

      function handleRemove(targetName: string) {
        if (activePath.value === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.path === targetName) {
              const nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                router.push(nextTab.path || '/');
              }
            }
          });
        } else {
          router.push(activePath.value || '/');
        }
        const removeIndex = tabs.findIndex((tab) => tab.path === targetName);
        tabs.splice(removeIndex, 1);
        if (tabs.length <= 0) {
          router.push('/');
        }
      }

      function handleClick(targetTab: any) {
        router.push(targetTab.name || '/');
      }

      return {
        activePath,
        tabs,
        handleRemove,
        handleClick,
      };
    },
  });
</script>

<style lang="less">
  .bst-tab {
    height: 46px;
    background-color: #fff;
    padding: 5px 15px 0;
  }
  .el-tabs__header {
    margin-bottom: 0;
  }
</style>
