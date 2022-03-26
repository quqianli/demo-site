<template>
  <div class="main-body">
    <!--工具栏-->
    <div class="toolbar">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.operator" :placeholder="t('thead.operator')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            icon="search"
            type="primary"
            @click="doSearch"
          >{{ t('action.search') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表格内容栏-->
    <cm-table
      ref="tableRef"
      :get-page="listPage"
      :filters="filters"
      :columns="columns"
      :showOperation="false"
      :showBatchDelete="false"
    ></cm-table>
  </div>
</template>

<script setup>
import { listPage } from '@/apis/logs-operation'
import useTableHandlers from '../use-table-handlers'
const filters = reactive({
  operator: ''
});
const {
  t,
  tableRef,
  doSearch,
} = useTableHandlers();
const columns = computed(() => [
  { prop: "id", label: t("thead.ID"), minWidth: 60 },
  { prop: "operator", label: t("thead.operator"), minWidth: 100 },
  { prop: "ip", label: t("thead.IP"), minWidth: 120 },
  { prop: "operation", label: t("thead.operation"), minWidth: 180 },
  { prop: "duration", label: t("thead.duration"), minWidth: 80 },
  { prop: "createdTime", label: t("thead.operateTime"), minWidth: 120 }
])
</script>
