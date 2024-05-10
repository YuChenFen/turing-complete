<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { ControlButton, Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import Icon from '../../components/icon.vue'
import DropzoneBackground from '../../components/DropzoneBackground.vue'
import Sidebar from '../../components/Sidebar.vue'
import useDragAndDrop from '../../assets/js/useDnD'
import { useRunProcess } from '../../assets/js/use-run-process';

import animationEdge from '../../components/animation-edge.vue'

// io
import bitInput from '../../components/io/bit-input.vue';
import bitOutput from '../../components/io/bit-output.vue';
import byteInput from '../../components/io/byte-input.vue';
import byteOutput from '../../components/io/byte-output.vue';
// bit
import bitAnd from '../../components/bit/bit-and.vue';
import bitOr from '../../components/bit/bit-or.vue';
import bitNot from '../../components/bit/bit-not.vue';
import bitXor from '../../components/bit/bit-xor.vue';
import bitNand from '../../components/bit/bit-nand.vue';
import bitNor from '../../components/bit/bit-nor.vue';
import bitXnor from '../../components/bit/bit-xnor.vue';
import bitHigh from '../../components/bit/bit-high.vue';
import bitLow from '../../components/bit/bit-low.vue';
import bitThreeAnd from '../../components/bit/bit-three-and.vue';
import bitThreeOr from '../../components/bit/bit-three-or.vue';
import bitSwitch from '../../components/bit/bit-switch.vue';
import bitAdd from '../../components/bit/bit-add.vue';
import delay from '../../components/bit/delay.vue';
import bitStorage from '../../components/bit/bit-storage.vue';
import dec38 from '../../components/bit/dec38.vue';
// byte
import byteToBit from '../../components/byte/byte-to-bit.vue';
import bitToByte from '../../components/byte/bit-to-byte.vue';
import byteOr from '../../components/byte/byte-or.vue';
import byteNot from '../../components/byte/byte-not.vue';
import byteSwitch from '../../components/byte/byte-switch.vue';
import byteAdd from '../../components/byte/byte-add.vue';
import byteStorage from '../../components/byte/byte-storage.vue';
// tools
import ifEqual from '../../components/tools/if-equal.vue'

const props = defineProps(['nodes', 'inputIdList', 'inputValueList', 'outputIdList', 'outputValueList', 'successDialogMessage', 'inputAndOutput', 'nodeLabel', 'bitList', 'byteList', 'ioList', 'toolsList'])

const nodes = ref(props.nodes)
const edges = ref([]);

const { onPaneReady, addEdges, removeEdges, removeNodes, setViewport, toObject, updateNodeInternals, updateNodeData } = useVueFlow();
const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop();
const { run, next } = useRunProcess({
    inputIdList: props.inputIdList,
    inputValueList: props.inputValueList,
    outputIdList: props.outputIdList,
    outputValueList: props.outputValueList,
    successDialogMessage: props.successDialogMessage
});

const currentNodeLabel = ref('');
const showResult = ref(true);
const isOpenDialog = ref(true);
const dark = ref(false)
onPaneReady(({ fitView }) => {
    fitView()
})

function logToObject() {
    console.log(toObject())
    isOpenDialog.value = true;
}
function resetTransform() {
    setViewport({ x: 0, y: 0, zoom: 1 })
}

function toggleDarkMode() {
    dark.value = !dark.value
}

function onConnect(params) {
    if (params.sourceHandle.indexOf("input") === -1 && params.targetHandle.indexOf("output") === -1) {
        addEdges({ ...params, type: 'animation', animated: true })
    }
}

function removeEdge({ event, edge }) {
    event.preventDefault();
    let target = edge.target;
    let targetHandleId = edge.targetHandle;
    let updata = {}
    updata[targetHandleId] = void 0;
    updateNodeData(target, { ...updata });
    removeEdges(edge.id);
    // 删除边自动卸载组件关联
}
function removeNode({ event, node }) {
    event.preventDefault();
    let connectEdges = edges.value.filter(edge => edge.source === node.id || edge.target === node.id);
    for (const edge of connectEdges) {
        removeEdge({ event, edge });
    }
    removeNodes(node.id);
}

function nodeClick({ event, node }) {
    currentNodeLabel.value = props.nodeLabel[node.id]
}
</script>

<template>
    <div style="height: 100vh;width: 100vw;overflow: hidden;" @drop="onDrop">
        <VueFlow v-model:nodes="nodes" v-model:edges="edges" :class="{ dark }" class="basicflow"
            :default-viewport="{ zoom: 1.5 }" :min-zoom="0.2" :max-zoom="4" @dragover="onDragOver"
            @dragleave="onDragLeave" @connect="onConnect" @edge-context-menu="removeEdge"
            @node-context-menu="removeNode" @node-click="nodeClick">
            <Background variant="lines" pattern-color="#aaa3" :gap="24" />

            <MiniMap :pannable="true" />

            <Controls position="top-right">
                <ControlButton title="Reset Transform" @click="resetTransform">
                    <Icon name="reset" />
                </ControlButton>
                <ControlButton title="Toggle Dark Mode" @click="toggleDarkMode">
                    <Icon v-if="dark" name="sun" />
                    <Icon v-else name="moon" />
                </ControlButton>
                <ControlButton title="Log `toObject`" @click="logToObject">
                    <Icon name="log" />
                </ControlButton>
                <ControlButton title="next" @click="next(nodes)">
                    <svg-icon name="next"></svg-icon>
                </ControlButton>
                <ControlButton title="run" @click="run(nodes)">
                    <svg-icon name="play"></svg-icon>
                </ControlButton>
            </Controls>
            <DropzoneBackground :style="{
                backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
                transition: 'background-color 0.2s ease',
            }" />

            <!-- 边 -->
            <template #edge-animation="edgeProps">
                <animation-edge :id="edgeProps.id" :source="edgeProps.source" :target="edgeProps.target"
                    :source-x="edgeProps.sourceX" :source-y="edgeProps.sourceY" :targetX="edgeProps.targetX"
                    :targetY="edgeProps.targetY" :source-position="edgeProps.sourcePosition"
                    :target-position="edgeProps.targetPosition" :source-handle-id="edgeProps.sourceHandleId"
                    :target-handle-id="edgeProps.targetHandleId" />
            </template>

            <!-- 节点 -->
            <!-- io -->
            <template #node-bit-input="bitInputNodeProps">
                <bitInput @updateNodeInternals="updateNodeInternals" v-bind="bitInputNodeProps"></bitInput>
            </template>
            <template #node-bit-output="bitOutputNodeProps">
                <bitOutput @updateNodeInternals="updateNodeInternals" v-bind="bitOutputNodeProps"></bitOutput>
            </template>
            <template #node-byte-input="byteInputNodeProps">
                <byteInput @updateNodeInternals="updateNodeInternals" v-bind="byteInputNodeProps"></byteInput>
            </template>
            <template #node-byte-output="byteOutputNodeProps">
                <byteOutput @updateNodeInternals="updateNodeInternals" v-bind="byteOutputNodeProps"></byteOutput>
            </template>
            <!-- bit -->
            <template #node-bit-and="bitAndNodeProps">
                <bitAnd @updateNodeInternals="updateNodeInternals" v-bind="bitAndNodeProps"></bitAnd>
            </template>
            <template #node-bit-nand="bitNandNodeProps">
                <bitNand @updateNodeInternals="updateNodeInternals" v-bind="bitNandNodeProps"></bitNand>
            </template>
            <template #node-bit-or="bitOrNodeProps">
                <bitOr @updateNodeInternals="updateNodeInternals" v-bind="bitOrNodeProps"></bitOr>
            </template>
            <template #node-bit-nor="bitNorNodeProps">
                <bitNor @updateNodeInternals="updateNodeInternals" v-bind="bitNorNodeProps"></bitNor>
            </template>
            <template #node-bit-not="bitNotNodeProps">
                <bitNot @updateNodeInternals="updateNodeInternals" v-bind="bitNotNodeProps"></bitNot>
            </template>
            <template #node-bit-xor="bitXorNodeProps">
                <bitXor @updateNodeInternals="updateNodeInternals" v-bind="bitXorNodeProps"></bitXor>
            </template>
            <template #node-bit-xnor="bitXnorNodeProps">
                <bitXnor @updateNodeInternals="updateNodeInternals" v-bind="bitXnorNodeProps"></bitXnor>
            </template>
            <template #node-bit-high="bitHighNodeProps">
                <bitHigh @updateNodeInternals="updateNodeInternals" v-bind="bitHighNodeProps"></bitHigh>
            </template>
            <template #node-bit-low="bitLowNodeProps">
                <bitLow @updateNodeInternals="updateNodeInternals" v-bind="bitLowNodeProps"></bitLow>
            </template>
            <template #node-bit-three-and="bitThreeAndNodeProps">
                <bitThreeAnd @updateNodeInternals="updateNodeInternals" v-bind="bitThreeAndNodeProps"></bitThreeAnd>
            </template>
            <template #node-bit-three-or="bitThreeOrNodeProps">
                <bitThreeOr @updateNodeInternals="updateNodeInternals" v-bind="bitThreeOrNodeProps"></bitThreeOr>
            </template>
            <template #node-bit-switch="bitSwitchNodeProps">
                <bitSwitch @updateNodeInternals="updateNodeInternals" v-bind="bitSwitchNodeProps"></bitSwitch>
            </template>
            <template #node-bit-add="bitAddNodeProps">
                <bitAdd @updateNodeInternals="updateNodeInternals" v-bind="bitAddNodeProps"></bitAdd>
            </template>
            <template #node-delay="delayNodeProps">
                <delay @updateNodeInternals="updateNodeInternals" v-bind="delayNodeProps"></delay>
            </template>
            <template #node-bit-storage="bitStorageNodeProps">
                <bitStorage @updateNodeInternals="updateNodeInternals" v-bind="bitStorageNodeProps"></bitStorage>
            </template>
            <template #node-dec38="dec38NodeProps">
                <dec38 @updateNodeInternals="updateNodeInternals" v-bind="dec38NodeProps"></dec38>
            </template>
            <!-- byte -->
            <template #node-byte-to-bit="byteToBitNodeProps">
                <byteToBit @updateNodeInternals="updateNodeInternals" v-bind="byteToBitNodeProps"></byteToBit>
            </template>
            <template #node-bit-to-byte="bitToByteNodeProps">
                <bitToByte @updateNodeInternals="updateNodeInternals" v-bind="bitToByteNodeProps"></bitToByte>
            </template>
            <template #node-byte-not="byteNotNodeProps">
                <byteNot @updateNodeInternals="updateNodeInternals" v-bind="byteNotNodeProps"></byteNot>
            </template>
            <template #node-byte-or="byteOrNodeProps">
                <byteOr @updateNodeInternals="updateNodeInternals" v-bind="byteOrNodeProps"></byteOr>
            </template>
            <template #node-byte-switch="byteSwitchNodeProps">
                <byteSwitch @updateNodeInternals="updateNodeInternals" v-bind="byteSwitchNodeProps"></byteSwitch>
            </template>
            <template #node-byte-add="byteAddNodeProps">
                <byteAdd @updateNodeInternals="updateNodeInternals" v-bind="byteAddNodeProps"></byteAdd>
            </template>
            <template #node-byte-storage="byteStorageNodeProps">
                <byteStorage @updateNodeInternals="updateNodeInternals" v-bind="byteStorageNodeProps"></byteStorage>
            </template>
            <!-- tools -->
            <template #node-if-equal="ifEqualNodeProps">
                <ifEqual @updateNodeInternals="updateNodeInternals" v-bind="ifEqualNodeProps"></ifEqual>
            </template>
        </VueFlow>
        <Sidebar :bit-list="bitList ? bitList : []" :byte-list="byteList ? byteList : []"
            :io-list="ioList ? ioList : []" :tools-list="toolsList ? toolsList : []" />
        <div class="show-result" :style="`transform: translateX(${showResult ? '0' : '-100%'});`">
            <div class="input-and-output">
                <div v-for="item in inputAndOutput" :key="item.label">
                    <p>{{ item.label }}</p>
                    <div v-for="(list, index) in item.list" :key="index" class="circle"
                        :class="{ red: list[item.index] === 0, green: list[item.index] === 1 }"
                        style="text-align: center;">
                        {{ list[item.index] > 1 ? list[item.index] : '' }}
                    </div>
                </div>
                <slot name="actual-output"></slot>
            </div>
            <div>
                节点名称: {{ currentNodeLabel }}
            </div>
            <feng-icon-button style="position: absolute;top: 50%;right: -15px;" @click="showResult = !showResult">
                <p style="width: 15px;">{{ showResult ? '◀' : '▶' }}</p>
            </feng-icon-button>
        </div>
        <feng-customize-dialog width="60%" v-model:open="isOpenDialog" @ok="isOpenDialog = false"
            @no="isOpenDialog = false">
            <template #body>
                <slot name="topic-card"></slot>
            </template>
        </feng-customize-dialog>
    </div>
</template>

<style scoped>
.show-result {
    position: fixed;
    top: 0;
    left: 0;
    /* width: 300px; */
    height: 100%;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: .5s;
}

.input-and-output {
    display: flex;
    justify-content: space-between;
    height: max-content;
    overflow-y: auto;
}

.input-and-output>:deep(div) {
    display: flex;
    margin: 10px;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.input-and-output :deep(.circle) {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    flex: 0 0 20px;
}

.input-and-output :deep(.red) {
    background-color: red;
}

.input-and-output :deep(.green) {
    background-color: green;
}
</style>