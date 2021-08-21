<template>
  <div class="container">
    <div class="container-table">
      <TableBase :data="records" :query="query" @query-data="queryRecords">
        <el-table-column fixed label="头像" min-width="60">
          <template #default="record">
            <img :src="record.row.avatar" alt="" style="height: 40px" />
          </template>
        </el-table-column>
        <el-table-column fixed prop="name" label="姓名" min-width="120"> </el-table-column>
        <el-table-column fixed prop="alias" label="别名" min-width="120"> </el-table-column>
        <el-table-column prop="mobile" label="手机号" min-width="160"> </el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="200"> </el-table-column>
        <el-table-column label="状态" min-width="80">
          <template #default="scope">
            {{ toNameCn(scope.row.status, userStatusList) }}
          </template>
        </el-table-column>
      </TableBase>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, computed, reactive, toRefs } from '@nuxtjs/composition-api';
  import type { ListUserParams } from '@/types/model';
  import { listUser } from '@/api/system/user';
  import { toNameCn } from '@/utils/dict';
  import { useDictStore } from '@/store/dict';

  export default defineComponent({
    setup() {
      const store = {
        userStatusList: computed(() => useDictStore().getUserStatus),
      };
      const initQuery: ListUserParams = {
        page: 1,
        pageSize: 10,
      };
      const dataMap = reactive({
        records: [],
        query: { ...initQuery },
        async queryRecords() {
          const res = await listUser(dataMap.query);
          if (res?.data.success) {
            const { items, total } = res.data.result;
            dataMap.records = items;
            dataMap.query.total = total;
          }
        },
        refresh() {
          dataMap.query = { ...initQuery };
          dataMap.queryRecords();
        },
      });
      onMounted(() => {
        dataMap.refresh();
      });

      return {
        ...store,
        ...toRefs(dataMap),
        toNameCn,
      };
    },
  });
</script>

<style lang="less" scoped>
  .container {
    margin: 0 auto;

    .bst-table {
      margin: 12px 0;
    }

    .bst-form-item {
      margin: 0 35px 20px 0;
    }
  }
</style>
