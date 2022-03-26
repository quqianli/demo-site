// import { ref, getCurrentInstance } from "vue";
// import { useI18n } from "vue-i18n";
// import { ElMessage } from 'element-plus'
export default function useTableHandlers(form) {
  // data
  const { t } = useI18n();
  const tableRef = ref();
  const dialogVisible = ref(false);
  const isEdit = ref(false);
  const formLoading = ref(false);
  const formRef = ref();
  const __formOld__= { ...form }

  // methods
  const doSearch = () => {
    tableRef.value.reload();
  };
  const doAdd = () => {
    dialogVisible.value = true;
    isEdit.value = false;
    formRef.value && formRef.value.clearValidate();
  };
  const doEdit = (row) => {
    if (!form) return;
    isEdit.value = true;
    dialogVisible.value = true;
    for (const k in form) {
      if (k in row) {
        form[k] = row[k];
      }
    }
  };
  
  const doRemove = (api, ids, callback) => {
    api({ id: ids }).then(() => {
      callback && callback();
    });
  };
  const getParams = () => {
    const params = { ...form };
    if (!isEdit.value) {
      delete params.id;
    }
    return params;
  };
  const doSubmit = (apis, callback) => {
    if (!form || !apis) return;
    formRef.value.validate((valid) => {
      if (valid) {
        formLoading.value = true;
        let promise;
        const params = apis.getParams ? apis.getParams() : getParams();
        if (isEdit.value) {
          promise = apis.update(params);
        } else {
          promise = apis.save(params);
        }
        promise
          .then((res) => {
            if (callback) {
              callback(res);
            } else {
              ElMessage({
                message: t("tips.success"),
                type: "success",
                showClose: true,
              });
            }
            doClose();
            if (isEdit.value) {
              tableRef.value.refresh();
            } else {
              tableRef.value.reload();
            }
          })
          .finally(() => {
            formLoading.value = false;
          });
      }
    });
  };
  const resetForm = () => {
    if (!form) return;
    for (const k in __formOld__) {
      form[k] = __formOld__[k];
    }
  };
  function doClose() {
    dialogVisible.value = false;
    resetForm();
  }
  return {
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
    doClose,
    doRemove,
  };
}
