<template>
  <div class="main-body">
    <!--工具栏-->
    <div class="toolbar">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" :placeholder="t('thead.name')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="search" type="primary" @click="doSearch">{{ t('action.search') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="plus" type="primary" @click="handleAdd">{{ t('action.add') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表格树内容栏-->
    <cm-table
      rowKey="id"
      ref="tableRef"
      :get-page="listTree"
      :filters="filters"
      :columns="columns"
      :showBatchDelete="false"
      :showPagination="false"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
    ></cm-table>
  </div>
  <el-dialog
    :title="isEdit ? t('action.edit') : t('action.add')"
    width="40%"
    draggable
    v-model="dialogVisible"
    :close-on-click-modal="false"
    @close="doClose"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      @keyup.enter="handleSubmit"
      label-width="80px"
    >
      <el-form-item :label="t('thead.name')" prop="name">
        <el-input v-model="form.name" :placeholder="t('thead.name')"></el-input>
      </el-form-item>
      <el-form-item :label="t('form.parent')" prop="parentId">
        <el-cascader
          v-model="form.parentId"
          :props="{ label: 'name', value: 'id', checkStrictly: true, emitPath: false }"
          :options="deptData"
          clearable
          filterable
          class="w100p"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="doClose">{{ t('action.cancel') }}</el-button>
      <el-button type="primary" @click="handleSubmit">{{ t('action.confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { listTree, listOtherTreeById,  save, update, remove } from '@/apis/app-dept'
import useTableHandlers from '../use-table-handlers'
const filters = reactive({
  name: ''
});
const form = reactive({
  id: '',
  name: '',
  parentId: null,
});
const {
  t,
  tableRef,
  dialogVisible,
  isEdit,
  formLoading,
  formRef,
  doSearch,
  doAdd,
  doEdit,
  doRemove,
  doSubmit,
  doClose
} = useTableHandlers(form);
const deptData = ref([])

const columns = computed(() => [
  { prop: "id", label: t("thead.ID") },
  { prop: "name", label: t("thead.name") },
  { prop: "createdBy", label: t("thead.createdBy") },
  { prop: "createdTime", label: t("thead.createdTime"), minWidth: 160 },
  { prop: "lastUpdatedBy", label: t("thead.updatedBy") },
  { prop: "lastUpdatedTime", label: t("thead.updatedTime"), minWidth: 160 },
])

const rules = computed(() => {
  return {
    name: [
      { required: true, message: t('form.usernameHolder'), trigger: ['change', 'blur'] }
    ]
  }
})

// methods
function initFormRequest(row) {
  listOtherTreeById(row ? { id: row.id } : null).then(res => {
    deptData.value = res.data;
  })
}
function handleAdd() {
  initFormRequest();
  doAdd();
}
function handleEdit(row) {
  initFormRequest(row);
  doEdit(row);
}
function handleDelete(ids, callback) {
  doRemove(remove, ids, callback)
}
function handleSubmit() {
  doSubmit({ save, update });
}
</script>
