<template>
  <div>
    <el-card>
      <el-table :data="allRules" border style="width: 100%">
        <el-table-column :label="$t('msg.role.index')" type="index" width="120">
        </el-table-column>
        <el-table-column :label="$t('msg.role.name')" prop="title">
        </el-table-column>
        <el-table-column :label="$t('msg.role.desc')" prop="describe">
        </el-table-column>
        <el-table-column
          :label="$t('msg.role.action')"
          prop="action"
          width="260"
          #default="{ row }"
        >
          <el-button
            type="primary"
            size="mini"
            @click="onDistributePermissionClick(row)"
            v-permission="['distributePermission']"
          >
            {{ $t('msg.role.assignPermissions') }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <DistributePermission
      v-model="distributePermissionVisible"
      :roleId="selectRoleId"
    ></DistributePermission>
  </div>
</template>

<script setup>
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import { ref, watch } from 'vue'
import DistributePermission from './components/DistributePermission'

const allRules = ref([])
const getRoleList = async () => {
  allRules.value = await roleList()
}
getRoleList()
watchSwitchLang(getRoleList)

/**
 * 分配权限
 */
const distributePermissionVisible = ref(false)
const selectRoleId = ref('')
const onDistributePermissionClick = row => {
  selectRoleId.value = row.id
  distributePermissionVisible.value = true
}

// 保证每次打开重新获取权限数据
watch(distributePermissionVisible, val => {
  if (!val) selectRoleId.value = ''
})
</script>

<style lang="scss" scoped></style>
