<template>
  <div v-loading="loading" class="cm-table">
    <!--表格栏-->
    <el-table
      :data="data.content"
      class="cm-table__tb"
      v-bind="$attrs"
      @selection-change="selectionChange"
    >
      <el-table-column v-for="column in columns" :key="column.prop" v-bind="column">
        <template v-if="$slots[`${column.prop}Slot`]" #default="scope">
          <slot :name="`${column.prop}Slot`" :scope="scope" />
        </template>
      </el-table-column>
      <el-table-column
        v-if="showOperation"
        fixed="right"
        :label="t('action.operation')"
        :width="oprWidth"
      >
        <template #default="{ row }">
          <template v-for="(opr, i) in operations" :key="i">
            <template v-if="isShow(opr.show, row)">
              <el-button
                v-if="opr.type === 'edit'"
                type="text"
                :disabled="isDisabled(opr.disabled, row)"
                @click="handleEdit(row)"
              >{{ t('action.edit') }}</el-button>
              <el-button
                v-else-if="opr.type === 'delete'"
                type="text"
                class="danger"
                :disabled="isDisabled(opr.disabled, row)"
                @click="handleDelete(row)"
              >{{ t('action.delete') }}</el-button>
              <el-button
                v-else
                type="text"
                :disabled="isDisabled(opr.disabled, row)"
                @click="opr.onClick(row)"
              >{{ opr.label }}</el-button>
            </template>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <!--分页栏-->
    <div class="cm-table__toolbar">
      <el-button
        v-if="showBatchDelete"
        type="danger"
        :disabled="selections.length === 0"
        @click="handleBatchDelete()"
      >{{ t('action.batchDelete') }}</el-button>
      <el-pagination
        v-if="showPagination"
        class="cm-table__pagination"
        v-model:currentPage="pageRequest.pageNum"
        v-model:page-size="pageRequest.pageSize"
        :total="data.totalSize || 0"
        :page-sizes="[10, 20, 50, 100, 200]"
        layout="total, prev, pager, next, sizes, jumper"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  getPage: Function, // 获取表格分页数据的方法
  filters: Object,
  showPagination: {
    type: Boolean,
    default: true
  },
  columns: Array, // 表格列配置
  showOperation: {
    // 是否显示操作组件
    type: Boolean,
    default: true,
  },
  operations: {
    type: Array,
    default: () => {
      return [
        {
          type: 'edit'
        },
        {
          type: 'delete'
        }
      ]
    }
  },
  oprWidth: {
    type: Number,
    default: 185
  },
  showBatchDelete: {
    // 是否显示操作组件
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['handleEdit', 'handleDelete']);

const { t } = useI18n();
const loading = ref(false)
const pageRequest = reactive({
  pageNum: 1,
  pageSize: 10,
})
const data = ref({});
// 分页查询
function findPage() {
  if (!props.getPage) {
    return;
  }
  loading.value = true;
  const req = props.getPage({ ...pageRequest, ...(props.filters || {}), sortby: props.sortby });
  if (Object(req).constructor === Promise) {
    req.then(res => {
      if (res.data instanceof Array) {
        data.value = {
          content: res.data,
          totalSize: res.data.length
        }
      } else {
        data.value = res.data;
      }
    }).catch(() => {
      data.value = {}
    }).finally(() => {
      loading.value = false;
    });
  }

}
function reload() {
  handlePageChange(1);
}
function handleSizeChange(pageSize) {
  pageRequest.pageSize = pageSize;
  pageRequest.pageNum = 1;
  findPage();
}
// 换页刷新
function handlePageChange(pageNum) {
  pageRequest.pageNum = pageNum;
  findPage();
}

function isShow(showFn, row) {
  if (showFn && typeof showFn === 'function') {
    return showFn(row)
  }
  return true;
}
function isDisabled(disabledFn, row) {
  if (disabledFn && typeof disabledFn === 'function') {
    return disabledFn(row)
  }
  return false;
}
// 编辑
function handleEdit(row) {
  emit("handleEdit", row);
}

// 删除
function handleDelete(row) {
  onDelete(row.id);
}

const selections = ref([]);
function selectionChange(slts) {
  selections.value = slts;
}
// 批量删除
function handleBatchDelete() {
  let ids = selections.value.map((item) => item.id).toString();
  onDelete(ids);
}

// 删除操作
function onDelete(ids) {
  ElMessageBox.confirm(t('tips.deleteConfirm'), t('tips.deleteTitle'), {
    confirmButtonText: t('action.confirm'),
    cancelButtonText: t('action.cancel'),
    type: "warning",
    draggable: true,
  }).then(() => {
    const callback = () => {
      ElMessage({ message: t('tips.success'), type: "success" });
      reload();
    };
    emit("handleDelete", ids, callback);
  }).catch(() => { });
}

reload();

defineExpose({
  refresh: findPage,
  reload,
})
</script>
<style lang="scss" scoped>
.cm-table__tb {
  border: 1px solid #eee;
  border-bottom: none;
  min-width: 100%;
}
.cm-table__toolbar {
  padding: 10px 5px;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}
.cm-table__pagination {
  float: right;
  padding-right: 0;
}
.danger {
  color: var(--el-color-danger) !important;
}
</style>