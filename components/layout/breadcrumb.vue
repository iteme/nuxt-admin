<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in breadcrumbs" :key="item">
      {{ item }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
  import { defineComponent, PropType, computed, useRoute } from '@nuxtjs/composition-api';
  import type { MenuItem } from '@/types/model';

  export default defineComponent({
    props: {
      menus: {
        type: Array as PropType<MenuItem[]>,
        required: true,
      },
    },
    setup(props) {
      const route = useRoute();

      const { menus } = props;

      const breadcrumbs = computed(() => {
        const path = route.value.path;

        for (const item of menus) {
          if (item.path === path) {
            return [item.name];
          } else if (item.children) {
            const arr = [item.name];
            for (const child of item.children) {
              if (child.path === path) {
                arr.push(child.name);
                return arr;
              }
            }
          }
        }
        return [];
      });
      return {
        breadcrumbs,
      };
    },
  });
</script>
