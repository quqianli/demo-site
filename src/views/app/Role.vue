<template>
  <div class="main-body">
    <!--工具栏-->
    <div class="toolbar">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" :placeholder="t('thead.username')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="search" type="primary" @click="doSearch">{{ t('action.search') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="plus" type="primary" @click="doAdd">{{ t('action.add') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表格内容栏-->
    <cm-table
      ref="tableRef"
      :get-page="listPage"
      :filters="filters"
      :columns="columns"
      :operations="operations"
      @handleEdit="doEdit"
      @handleDelete="handleDelete"
    ></cm-table>
  </div>
  <!-- 新增/编辑 -->
  <el-dialog
    :title="isEdit ? t('action.edit') : t('action.add')"
    width="40%"
    draggable
    v-model="dialogVisible"
    :close-on-click-modal="false"
    @close="doClose"
  >
    <el-form ref="formRef" :model="form" label-width="80px" :rules="rules">
      <el-form-item :label="t('thead.roleName')" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="t('thead.remark')" prop="remark">
        <el-input v-model="form.remark" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="doClose">{{ t("action.cancel") }}</el-button>
        <el-button
          type="primary"
          @click="handleSubmit"
          :loading="formLoading"
        >{{ t("action.submit") }}</el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 绑定资源 -->
  <el-dialog
    :title="t('action.bindResource')"
    width="40%"
    draggable
    v-model="bindDlgVisible"
    :close-on-click-modal="false"
  >
    <el-tree
      ref="treeRef"
      :data="resourceTreeData"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="defaultCheckedKeys"
      :props="{label: 'displayName'}"
    />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="bindDlgVisible = false">{{ t("action.cancel") }}</el-button>
        <el-button
          type="primary"
          @click="onBindResouceConfirm"
          :loading="bindLoading"
        >{{ t("action.submit") }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { listPage, save, update, remove, bindResouce } from "@/apis/app-role";
import { listTree } from "@/apis/app-resource";
import useTableHandlers from "../use-table-handlers";
const filters = reactive({
  name: ''
});
const form = reactive({
  id: "",
  name: "",
  remark: "",
})
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
const resourceTreeData = ref([])
const bindDlgVisible = ref(false)
const defaultCheckedKeys = ref([])
const bindLoading = ref(false)
const treeRef = ref()

// computed
const columns = computed(() => [
  { type: 'selection' },
  { prop: "id", label: t("thead.ID"), minWidth: 50 },
  { prop: "name", label: t("thead.roleName"), minWidth: 120 },
  { prop: "remark", label: t("thead.remark"), minWidth: 120, showOverflowTooltip: true },
  { prop: "createdBy", label: t("thead.createdBy"), minWidth: 120 },
  { prop: "createdTime", label: t("thead.createdTime"), minWidth: 160 },
  { prop: "lastUpdateBy", label: t("thead.updatedBy"), minWidth: 120 },
  { prop: "lastUpdateTime", label: t("thead.updatedTime"), minWidth: 160 }
]);
const operations = computed(() => [
  {
    type: 'edit'
  },
  {
    label: t('action.bindResource'),
    onClick: handleBindResource
  },
  {
    type: 'delete'
  }
])
const rules = computed(() => {
  return {
    name: [{ required: true, message: t('form.nameRequired'), trigger: "blur" }],
  }
});
// methods
function handleDelete(ids, callback) {
  doRemove(remove, ids, callback)
}
function handleSubmit() {
  doSubmit({ save, update });
}
function handleBindResource(row) {
  bindDlgVisible.value = true;
  getResourceTree();
  defaultCheckedKeys.value = row.resourceIds ? row.resourceIds.split(',') : []
}

function getResourceTree() {
  listTree().then(res => {
    resourceTreeData.value = res.data;
  })
}
function onBindResouceConfirm() {
  bindLoading.value = true
  bindResouce({ ids: treeRef.value.getCheckedKeys().toString() }).then(() => {
    ElMessage({ message: t('tips.success'), type: 'success', shoClose: true });
    bindDlgVisible.value = false;
  }).finally(() => {
    bindLoading.value = false
  })
}
</script>
