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

import bitInput from '../../components/io/bit-input.vue';
import bitOutput from '../../components/io/bit-output.vue';

const nodes = ref([
    { id: '-1', position: { x: 0, y: 200 }, type: 'bit-input' },
    { id: '-2', position: { x: 0, y: 0 }, type: 'bit-output' },
]);
const edges = ref([]);

const { onPaneReady, addEdges, removeEdges, removeNodes, setViewport, toObject, updateNodeInternals, updateNodeData } = useVueFlow();
const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop();
const { run } = useRunProcess({
    inputIdList: ['-1'],
    inputValueList: [[0], [1]],
    outputIdList: ['-2'],
    outputValueList: [[0], [1]],
    successDialogMessage: '看来你已经学会了基本操作。'
});

const isOpenDialog = ref(true)
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
</script>

<template>
    <div style="height: 100vh;width: 100vw;overflow: hidden;" @drop="onDrop">
        <VueFlow v-model:nodes="nodes" v-model:edges="edges" :class="{ dark }" class="basicflow"
            :default-viewport="{ zoom: 1.5 }" :min-zoom="0.2" :max-zoom="4" @dragover="onDragOver"
            @dragleave="onDragLeave" @connect="onConnect" @edge-context-menu="removeEdge"
            @node-context-menu="removeNode">
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
            <template #node-bit-input="bitInputNodeProps">
                <bitInput @updateNodeInternals="updateNodeInternals" v-bind="bitInputNodeProps"></bitInput>
            </template>
            <template #node-bit-output="bitOutputNodeProps">
                <bitOutput @updateNodeInternals="updateNodeInternals" v-bind="bitOutputNodeProps"></bitOutput>
            </template>
        </VueFlow>
        <Sidebar :bit-list="[]" :byte-list="[]" :io-list="[]" :tools-list="[]" />
        <feng-customize-dialog width="60%" v-model:open="isOpenDialog" @ok="isOpenDialog = false" @no="isOpenDialog = false">
            <template #body>
                <div class="user-select" style="padding: 20px;font-weight: 300;">
                    <header style="font-size: 20px;font-weight: 500;margin-bottom: 10px;">
                        Hello
                    </header>
                    <p>
                        欢迎来到这里，你将在这关了解一些操作：
                    </p>
                    <p style="font-weight: 800;margin-left: 2em;">
                        1. 鼠标右键可以删除节点和边
                    </p>
                    <p style="font-weight: 800;margin-left: 2em;">
                        2. 鼠标中键可以改变节点数据
                    </p>
                    <p style="font-weight: 800;margin-left: 2em;">
                        3. 通过节点的点可进行布线
                    </p>
                    <p style="font-weight: 800;margin-left: 2em;">
                        4. 点击右上角的运行按钮进行通关测试
                    </p>
                </div>
            </template>
        </feng-customize-dialog>
    </div>
</template>
