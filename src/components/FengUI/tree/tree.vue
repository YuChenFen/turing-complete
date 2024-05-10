<template>
    <ul class="tree" :class="{ 'not-tree-root': paddingLeft != 0 }" :style="{ paddingLeft: paddingLeft + 'px' }">
        <li v-for="node in data" :key="node.value" style="margin: 2px 0;">
            <div class="tree-node"
                :class="{ 'tree-node-opened': node.state && node.state === 'opened', 'tree-node-closed': node.state && node.state === 'closed' }"
                @click.stop="click($event, node)">
                <div class="tree-node-before" :class="{ 'tree-node-has-children-before': node.children }">
                    <svg v-if="node.children" t="1712839323855" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="14804" width="16" height="16">
                        <path
                            d="M391.978667 343.893333A25.856 25.856 0 0 1 384 325.12a25.898667 25.898667 0 0 1 8.362667-18.645333A29.44 29.44 0 0 1 412.245333 298.666667a29.525333 29.525333 0 0 1 20.053334 7.509333l199.381333 186.922667A25.898667 25.898667 0 0 1 640 512c0 7.082667-2.986667 13.866667-8.32 18.901333l-199.424 186.922667a29.525333 29.525333 0 0 1-20.053333 7.509333 29.44 29.44 0 0 1-19.84-7.808 25.898667 25.898667 0 0 1-8.362667-18.688 25.856 25.856 0 0 1 7.978667-18.773333L571.306667 512 391.978667 343.893333z">
                        </path>
                    </svg>
                </div>
                <component v-if="node.component" :is="node.component"></component>
                <span class="tree-node-text">{{ node.text }}</span>
            </div>
            <tree v-if="node.children" :data="node.children" :padding-left="paddingLeftStep" class="tree-children"
                @click="attrs.onClick">
            </tree>
        </li>
    </ul>
</template>

<script setup>
import { ref, useAttrs } from 'vue'
const props = defineProps({
    data: {
        type: Array,
        default: () => []
    },
    paddingLeft: {
        type: Number,
        default: 0
    },
    paddingLeftStep: {
        type: Number,
        default: 16
    }
})

props.data.forEach(node => {
    if (node.children && !node.hasOwnProperty('state')) {
        node.state = ref('closed');
    }
})

const attrs = useAttrs();

const click = (event, node) => {
    if (node.state) {
        let nodeChildrens = event.currentTarget.parentNode.querySelector('.tree-children');
        if (node.state === 'closed') {
            node.state = 'opened';
            nodeChildrens.style.height = 'auto';
            let { height } = nodeChildrens.getBoundingClientRect();
            nodeChildrens.style.height = '0px';
            let animate = nodeChildrens.animate([
                {
                    height: '0px'
                },
                {
                    height: `${height}px`
                }
            ], {
                duration: 200
            })
            animate.onfinish = () => {
                nodeChildrens.style.height = '';
            }
        } else {
            node.state = 'closed';
            let { height } = nodeChildrens.getBoundingClientRect();
            let animate = nodeChildrens.animate([
                {
                    height: `${height}px`
                },
                {
                    height: 0
                }
            ], {
                duration: 200
            })
            animate.onfinish = () => {
                nodeChildrens.style.height = '';
            }
        }
    }
    attrs.onClick?.({ ...node });
}
</script>

<style scoped>
.tree {
    list-style: none;
    color: rgb(var(--text-color));
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 100%;
    margin: 0;
    position: relative;
}

.not-tree-root::before {
    content: '';
    position: absolute;
    left: 9px;
    top: 0;
    width: 0.5px;
    height: 100%;
    background: rgb(var(--text-color), 0.4);
}

.tree-node {
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 2px;
    cursor: pointer;
}

.tree-node:hover {
    background-color: #6c6c6c2c;
}

.tree-node-before {
    margin-left: 2px;
    margin-right: 2px;
    width: 16px;
    height: 16px;
    min-width: 16px;
    min-height: 16px;
}

.tree-node-has-children-before {
    margin-left: 2px;
    margin-right: 2px;
    width: 16px;
    height: 16px;
    z-index: 1;
    transform: rotate(0deg);
    transition: all 0.2s;
}

.tree-node-has-children-before :deep(svg) {
    fill: rgb(var(--text-color), 1);
}

.tree-children {
    overflow-y: hidden;
}

.tree-node-opened .tree-node-has-children-before {
    transform: rotate(90deg);
}

.tree-node-closed~.tree-children {
    height: 0;

}

.tree-node-opened~.tree-children {
    height: auto;
}
</style>