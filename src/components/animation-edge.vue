<script setup>
import { computed, nextTick, ref, toRef, watch } from 'vue'
import { BaseEdge, EdgeLabelRenderer, Position, getSmoothStepPath, useNodesData, useVueFlow } from '@vue-flow/core'
import { TransitionPresets, executeTransition } from '@vueuse/core'

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        required: true,
    },
    sourceX: {
        type: Number,
        required: true,
    },
    sourceY: {
        type: Number,
        required: true,
    },
    targetX: {
        type: Number,
        required: true,
    },
    targetY: {
        type: Number,
        required: true,
    },
    sourcePosition: {
        type: String,
        default: Position.Right,
    },
    targetPosition: {
        type: String,
        default: Position.Left,
    },
    sourceHandleId: {
        type: String,
        default: null,
    },
    targetHandleId: {
        type: String,
        default: null,
    }
})

const { findEdge, updateNodeData } = useVueFlow()

const nodesData = useNodesData([props.target, props.source])
const edgePoint = ref(0)
const edgeRef = ref()

const labelPosition = ref({ x: 0, y: 0 })
const currentLength = ref(0)
const targetNodeData = toRef(() => nodesData.value[0].data)
const sourceNodeData = toRef(() => nodesData.value[1].data)
// const isFinished = toRef(() => sourceNodeData.value.isFinished)
// const isCancelled = toRef(() => targetNodeData.value.isCancelled)
const isAnimating = ref(false)
const edgeColor = toRef(() => {
    return '#2a70a7';
    // return '#6b7280';
})

const path = computed(() => getSmoothStepPath(props))

watch(edgePoint, (point) => {
    const pathEl = edgeRef.value?.pathEl

    if (!pathEl || point === 0 || !isAnimating.value) {
        return
    }

    const nextLength = pathEl.getTotalLength()

    // if length changed, restart animation
    if (currentLength.value !== nextLength) {
        runAnimation()
        return
    }

    labelPosition.value = pathEl.getPointAtLength(point)
})

async function runAnimation() {
    const pathEl = edgeRef.value?.pathEl
    if (!pathEl) {
        return
    }
    const totalLength = pathEl.getTotalLength()
    // if animation restarted, use last edgePoint value to continue from
    const from = edgePoint.value || 0
    // update initial label position
    labelPosition.value = pathEl.getPointAtLength(from)
    isAnimating.value = true
    // update currentLength value, so we can check if the path length changed during animation
    if (currentLength.value !== totalLength) {
        currentLength.value = totalLength
    }
    await executeTransition(edgePoint, from, totalLength, {
        transition: TransitionPresets.easeInOutCubic,
        duration: Math.max(1500, totalLength / 2),
        abort: () => !isAnimating.value,
    })
    reset()
    requestAnimationFrame(() => {
        runAnimation()
    })
}

function reset() {
    nextTick(() => {
        edgePoint.value = 0
        currentLength.value = 0
        labelPosition.value = { x: 0, y: 0 }
        isAnimating.value = false
    })
}
// 播放动画
nextTick(() => {
    runAnimation()
})


// 关联两个端点的数据
const sourceOutput = toRef(() => sourceNodeData.value[props.sourceHandleId]);
function sourceOutputBind(v) {
    const updata = {}
    updata[props.targetHandleId] = v
    updateNodeData(props.target, { ...updata })
}
sourceOutputBind(sourceOutput.value)
watch(sourceOutput, sourceOutputBind)

</script>

<template>
    <BaseEdge :id="id" ref="edgeRef" :path="path[0]" :style="{ stroke: edgeColor }"/>

    <EdgeLabelRenderer v-if="isAnimating">
        <div :style="{ transform: `translate(-50%, -50%) translate(${labelPosition.x}px,${labelPosition.y}px)` }"
            class="nodrag nopan animated-edge-label">
            <span class="truck">
                {{ sourceNodeData[sourceHandleId] }}
            </span>
        </div>
    </EdgeLabelRenderer>
</template>

<style>
.animated-edge-label {
    position: absolute;
    z-index: 100;
}

.truck {
    position: relative;
    display: inline-block;
    font-size: 0.5em;
}
</style>
