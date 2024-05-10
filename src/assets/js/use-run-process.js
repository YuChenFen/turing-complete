import { ref, getCurrentInstance, h, render } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import successDialog from '../../components/success-dialog.vue';
import { useRouter } from 'vue-router';
import useOutputStore from '../../stores/useOutput';

export function useRunProcess({ inputIdList = [], inputValueList = [], outputIdList = [], outputValueList = [], successDialogMessage = '' }) {
    const router = useRouter();
    const outputStore = useOutputStore();
    const { updateNodeData, getConnectedEdges } = useVueFlow();
    const isRunning = ref(false);
    const currentInstance = getCurrentInstance();
    const isNextPop = ref(false);

    async function run(nodes) {
        outputStore.output = ref([]);
        if (isRunning.value) {
            return;
        }
        isRunning.value = true;
        outputStore.ticks = 0;

        // 获取输出节点
        const outputNodes = {};
        for (const node of nodes) {
            if (node.type.indexOf('output') != -1) {
                outputNodes[node.id] = node;
            }
        }


        for (let i = 0, lenIV = inputValueList.length; i < lenIV; i++) {
            outputStore.ticks += 1;
            for (let j = 0, lenII = inputIdList.length; j < lenII; j++) {
                updateNodeData(inputIdList[j], { value: inputValueList[i][j] });
            }
            await new Promise(resolve => setTimeout(resolve, 200));
            let output = [], flag = false;
            for (let j = 0, lenOI = outputIdList.length; j < lenOI; j++) {
                output.push(outputNodes[outputIdList[j]].data.value);
                if (!equal(outputNodes[outputIdList[j]].data.value, outputValueList[i][j])) {
                    flag = true;
                }
            }
            outputStore.output.push(output);
            if (flag) {
                // 输出值不匹配，进行错误处理
                errorFunction();
                return;
            }
        }

        isRunning.value = false;
        // 输出值匹配，进行下一步处理
        successFunction();
    }

    async function next(nodes) {
        if (isRunning.value) {
            return;
        }
        isRunning.value = true;
        if(outputStore.ticks == 0){
            outputStore.output = ref([]);
        }

        // 获取输出节点
        const outputNodes = {};
        for (const node of nodes) {
            if (node.type.indexOf('output') != -1) {
                outputNodes[node.id] = node;
            }
        }
        console.log(isNextPop);
        if (isNextPop.value) {
            outputStore.output.pop();
            isNextPop.value = false;
        }
        outputStore.ticks += 1;
        for (let j = 0, lenII = inputIdList.length; j < lenII; j++) {
            updateNodeData(inputIdList[j], { value: inputValueList[outputStore.ticks - 1][j] });
        }
        let output = [], flag = false;
        for (let j = 0, lenOI = outputIdList.length; j < lenOI; j++) {
            await new Promise(resolve => setTimeout(resolve, 200));
            output.push(outputNodes[outputIdList[j]].data.value);
            if (!equal(outputNodes[outputIdList[j]].data.value, outputValueList[outputStore.ticks - 1][j])) {
                flag = true;
            }
        }
        outputStore.output.push(output);
        if (flag) {
            errorFunction();
            return;
        }

        isRunning.value = false;
        if (outputStore.ticks == outputValueList.length) {
            // 输出值匹配，进行下一步处理
            successFunction();
        }
    }

    function equal(a, b) {
        return a == b;
    }

    function errorFunction() {
        showMessage('error', '错误', '输出值不匹配');
        outputStore.ticks = 0;
        isRunning.value = false;
        isNextPop.value = true;
    }

    function successFunction() {
        let dialog = h(successDialog, {
            router: router,
            callback: () => { render(null, document.body) },
            message: successDialogMessage
        }, null)
        render(dialog, document.body);
        outputStore.ticks = 0;
    }

    function showMessage(type, title, text) {
        currentInstance?.appContext.config.globalProperties.$FengMessage({
            title: title,
            type: type,
            text: text,
            // isBrief: false,
            duration: 5000
        })
    }

    return { run, next }
}