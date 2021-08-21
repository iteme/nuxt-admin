<template>
  <div class="container">
    <div class="container-table">
      <TableTree :data="records" :query="query" @query-data="queryRecords" @load="loadChild">
        <el-table-column prop="code" label="字典编码"> </el-table-column>
        <el-table-column prop="nameCn" label="中文描述"> </el-table-column>
        <el-table-column prop="nameEn" label="英文描述"> </el-table-column>
      </TableTree>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, toRefs } from '@nuxtjs/composition-api';
  import type { ListDictParams } from '@/types/model';
  import { listDict, childDict } from '@/api/common/dict';

  export default defineComponent({
    setup() {
      const initQuery: ListDictParams = {
        page: 1,
        pageSize: 10,
      };
      const dataMap = reactive({
        records: [],
        query: { ...initQuery },
        addVisible: false,
        async queryRecords() {
          const res = await listDict(dataMap.query);
          if (res?.data.success) {
            const { items, total } = res.data.result;
            items.forEach((item: any) => (item.hasChildren = true));
            dataMap.records = items;
            dataMap.query.total = total;
          }
        },
        async loadChild(tree: any, _treeNode: any, resolve: any) {
          const res = await childDict(tree.code);
          if (res?.data.success) {
            resolve(res.data.result);
          } else {
            resolve([]);
          }
        },
        refresh() {
          dataMap.addVisible = false;
          dataMap.query = { ...initQuery };
          dataMap.queryRecords();
        },
      });
      onMounted(() => {
        dataMap.refresh();
      });

      return {
        ...toRefs(dataMap),
      };
    },
  });
</script>
