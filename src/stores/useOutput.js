import { defineStore } from 'pinia'
import { ref } from 'vue'

const useOutputStore = defineStore('outputStore', {
    // 为了完整类型推理，推荐使用箭头函数
    state: () => {
        return {
            output: ref([]),
            ticks: ref(0)
        }
    }
})

export default useOutputStore