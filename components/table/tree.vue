<template>
  <div class="table">
    <el-table
      class="table-main"
      row-key="id"
      :tree-props="{ hasChildren: 'hasChildren' }"
      :load="handleLoad"
      lazy
      height="100%"
      :data="data"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="showSelection" type="selection" width="50" />
      <el-table-column v-if="showIndex" label="序号" width="60">
        <template #default="scope">
          {{ (query.page - 1) * query.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
    <el-pagination
      v-if="showPagination"
      class="table-pagination"
      background
      :current-page="query.page"
      :layout="pageLayout"
      :total="query.total"
      :page-size="query.pageSize"
      :page-sizes="pageSizes"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api';

  export default defineComponent({
    props: {
      data: { type: Array, default: () => [] }, // 数据源
      select: { type: Array, default: () => [] }, // 已选择的数据，与selection结合使用
      showIndex: { type: Boolean, default: false }, // 是否展示index选择，默认否
      showSelection: { type: Boolean, default: false }, // 是否展示选择框，默认否
      showPagination: { type: Boolean, default: true }, // 是否展示页级组件，默认是
      query: {
        type: Object,
        default: () => {
          return { page: 1, pageSize: 10, total: 0 };
        },
      }, // 分页参数
      pageLayout: { type: String, default: 'total, sizes, prev, pager, next, jumper' }, // 分页需要显示的东西，默认全部
      pageSizes: {
        type: Array,
        default() {
          return [10, 20, 50, 100];
        },
      },
    },
    emits: ['queryData', 'load', 'selectionChange'],

    setup(props: any, { emit }: any) {
      // 分页相关：监听页码切换事件

      const { query } = props;
      const handleCurrentChange = (val: number) => {
        query.page = val;
        emit('queryData');
      };

      // 分页相关：监听单页显示数量切换事件
      const handleSizeChange = (val: number) => {
        query.page = 1;
        query.pageSize = val;
        emit('queryData');
      };

      // 选择监听器
      const handleSelectionChange = (val: []) => {
        emit('selectionChange', val);
      };

      // 加载子节点
      const handleLoad = (tree: any, treeNode: any, resolve: any) => {
        emit('load', tree, treeNode, resolve);
      };

      return {
        ...{ props },
        handleCurrentChange,
        handleSizeChange,
        handleSelectionChange,
        handleLoad,
      };
    },
  });
</script>

<style lang="less" scoped>
  .table {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 100%;
    padding: 15px;
    overflow: auto;

    &-pagination {
      padding-top: 15px;
    }
  }
</style>
