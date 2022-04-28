import { getItem, setItem } from '@/utils/storage'
import { LANG, TAGS_VIEW } from '@/constant'

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh',
    tagsViewList: getItem(TAGS_VIEW) || []
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLanguage(state, language) {
      state.language = language
      setItem(LANG, language)
    },
    /**
     * 添加 tags
     * */
    addTagsViewList(state, tag) {
      const idFind = state.tagsViewList.find(item => {
        return item.path === tag.path
      })
      // 处理重复
      if (!idFind) {
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    }
  }
}
