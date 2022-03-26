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
    />
  </div>

  <!--新增编辑界面-->
  <el-dialog
    :title="isEdit ? t('action.edit') : t('action.add')"
    v-model="dialogVisible"
    draggable
    width="40%"
    :close-on-click-modal="false"
    @close="doClose"
  >
    <el-form ref="formRef" :model="form" label-width="80px" :rules="rules" label-position="right">
      <el-form-item :label="t('form.username')" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="t('form.group')" prop="roleId">
        <el-select v-model="form.roleId" :placeholder="t('form.choose')" style="width: 100%">
          <el-option v-for="item in roles" :key="item.name" :label="item.label" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="doClose">{{ t("action.cancel") }}</el-button>
      <el-button v-if="isEdit" type="primary" @click="handleSetPsw">{{ t("form.resetPassword") }}</el-button>
      <el-button
        type="primary"
        @click="handleSubmit"
        :loading="formLoading"
      >{{ t("action.submit") }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { listPage, save, update, setPsw, remove } from "@/apis/sys-user";
import { roles } from '@/mock/data'
import useTableHandlers from '../use-table-handlers'
const filters = reactive({
  name: ''
})
const form = reactive({
  id: "",
  name: "",
  roleId: "",
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
  doSubmit,
  doRemove,
  doClose
} = useTableHandlers(form);
const operations = [
  {
    type: 'edit',
    show: (row) => row.createdBy !== 'system'
  },
  {
    type: 'delete',
    show: row => row.createdBy !== 'system'
  }
]

// computed
const columns = computed(() => [
  { type: 'selection', selectable: isSelectable },
  { prop: "id", label: t("thead.ID"), minWidth: 50 },
  { prop: "name", label: t('thead.username'), minWidth: 120 },
  { prop: "roleName", label: t('thead.group'), minWidth: 120 },
  { prop: "createdBy", label: t('thead.createdBy'), minWidth: 120 },
  { prop: "ip", label: t('thead.latestIp'), minWidth: 100 },
  { prop: "visitTime", label: t('thead.latestVisit'), minWidth: 120 },
])
const rules = computed(() => {
  return {
    name: [
      { required: true, message: t('form.usernameHolder'), trigger: ['blur', 'change'] },
    ],
    roleId: [
      { required: true, message: t('form.roleRequired'), trigger: ['blur', 'change'] },
    ]
  }
})

// methods
function isSelectable(row) {
  return row.createdBy !== 'system';
}

function handleDelete(ids, callback) {
  doRemove(remove, ids, callback)
}
function handleSubmit() {
  doSubmit({ save, update }, (res) => {
    if (!isEdit.value) {
      ElMessageBox.alert(
        `${t('tips.success')}${t('form.username')}: ${res.data.name},${t('form.password')}: ${res.data.password}`,
        t('tips.title'),
        {
          confirmButtonText: t('action.confirm'),
        }
      )
    }
  })
}

function handleSetPsw() {
  setPsw({ ...form }).then(res => {
    ElMessageBox.alert(
      `${t('tips.success')}${t('form.username')}: ${res.data.name},${t('form.password')}: ${res.data.password}`,
      t('tips.title'),
      {
        confirmButtonText: t('action.confirm'),
      }
    )
  })
}
</script>
