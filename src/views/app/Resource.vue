<template>
  <div class="main-body">
    <!--工具栏-->
    <div class="toolbar">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" :placeholder="t('thead.name')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            icon="search"
            type="primary"
            @click="doSearch"
          >{{ t('action.search') }}</el-button>
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
      :columns="columns"
      :filters="filters"
      :showBatchDelete="false"
      :showPagination="false"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
    ></cm-table>
  </div>
  <!-- 新增修改界面 -->
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
      <el-form-item :label="t('thead.type')" prop="type">
        <el-radio-group v-model="form.type" :disabled="isEdit">
          <el-radio
            v-for="(type, index) in menuTypeList"
            :label="index"
            :key="index"
          >{{ t(`status.${type}`) }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="t('thead.name')" prop="name">
        <el-input v-model="form.name" :placeholder="t('form.nameRequired')"></el-input>
      </el-form-item>
      <el-form-item :label="t('thead.displayName')" prop="displayName">
        <el-input v-model="form.displayName" :placeholder="t('form.displayNameRequired')"></el-input>
      </el-form-item>
      <el-form-item v-if="form.type !== 2" :label="t('thead.icon')">
        <el-input v-model="form.icon" :placeholder="t('thead.icon')"></el-input>
      </el-form-item>
      <el-form-item :label="t('form.parent')">
        <el-cascader
          v-model="form.parentId"
          :props="{ label: 'displayName', value: 'id', checkStrictly: true, emitPath: false }"
          :options="treeData"
          class="w100p"
        ></el-cascader>
      </el-form-item>
      <el-form-item
        v-if="form.type === 1"
        :label="t('thead.url')"
        :prop="form.type === 1 ? 'url' : ''"
      >
        <el-input v-model="form.url" :placeholder="t('thead.url')"></el-input>
      </el-form-item>
      <el-form-item
        v-if="form.type !== 2"
        :label="t('thead.orderNum')"
        :prop="form.type !== 2 ? 'orderNum' : ''"
      >
        <el-input-number v-model="form.orderNum" controls-position="right" :min="0"></el-input-number>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="doClose">{{ t('action.cancel') }}</el-button>
        <el-button type="primary" @click="handleSubmit">{{ t('action.confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { listTree, listTreeParents, save, update, remove } from '@/apis/app-resource'
import useTableHandlers from '../use-table-handlers'
const menuTypeList = ref(["folder", "menu", "button"])
const filters = reactive({
  name: ""
})
const form = reactive({
  id: '',
  type: 0,
  name: "",
  displayName: "",
  parentId: null,
  url: "",
  orderNum: 0,
  icon: "",
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
const treeData = ref([])

// computed
const columns = computed(() => [
  { prop: "id", label: t("thead.ID") },
  { prop: "name", label: t("thead.name") },
  { prop: "displayName", label: t("thead.displayName") },
  { prop: "icon", label: t("thead.icon") },
  {
    prop: "type", label: t("thead.type"), formatter: (row) => {
      const type = row.type;
      const typeMap = {
        1: 'success',
        2: 'info'
      }
      return h(
        ElTag,
        {
          type: typeMap[type] || ''
        },
        () => t(`status.${menuTypeList.value[type]}`)
      )
    }
  },
  { prop: "url", label: t("thead.url"), showOverflowTooltip: true },
  { prop: "orderNum", label: t("thead.orderNum") },
])
const rules = ref({
  name: [{ required: true, message: t('form.nameRequired'), trigger: "blur" }],
  displayName: [{ required: true, message: t('form.displayNameRequired'), trigger: "blur" }],
  url: [{ required: true, message: t('form.urlRequired'), trigger: "blur" }],
})

// methods
const initForm = () => {
  listTreeParents().then(res => {
    treeData.value = res.data;
  })
}
function handleAdd() {
  initForm();
  doAdd();
}
function handleEdit(row) {
  initForm(row);
  doEdit(row);
}
function handleDelete(ids, callback) {
  doRemove(remove, ids, callback)
}
function handleSubmit() {
  doSubmit({ save, update });
}
</script>
