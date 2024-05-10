import { createRouter, createWebHashHistory } from "vue-router";
import problem from "../views/problem.vue";
import sandbox from "../views/sandbox.vue";
import level1 from "../views/level/level1.vue";
import level2 from "../views/level/level2.vue";
import level3 from "../views/level/level3.vue";
import level4_1 from "../views/level/level4-1.vue";
import level4_2 from "../views/level/level4-2.vue";
import level4_3 from "../views/level/level4-3.vue";
import level5 from "../views/level/level5.vue";
import level6 from "../views/level/level6.vue";
import level7 from "../views/level/level7.vue";
import level8_1 from "../views/level/level8-1.vue";
import level8_2 from "../views/level/level8-2.vue";
import level9 from "../views/level/level9.vue";
import level10_1 from "../views/level/level10-1.vue";
import level10_2 from "../views/level/level10-2.vue";
import level11_1 from "../views/level/level11-1.vue";
import level11_2 from "../views/level/level11-2.vue";
import level11_3 from "../views/level/level11-3.vue";
import level12_1 from "../views/level/level12-1.vue";
import level12_2 from "../views/level/level12-2.vue";
import level12_3 from "../views/level/level12-3.vue";
import level13_1 from "../views/level/level13-1.vue";
import level13_2 from "../views/level/level13-2.vue";
import level14_1 from "../views/level/level14-1.vue";
import level14_2 from "../views/level/level14-2.vue";
import level14_3 from "../views/level/level14-3.vue";
import level15_2 from "../views/level/level15-2.vue";
import level16_1 from "../views/level/level16-1.vue";
import level16_2 from "../views/level/level16-2.vue";
import level16_3 from "../views/level/level16-3.vue";
import level17 from "../views/level/level17.vue";
import level18 from "../views/level/level18.vue";
import level19 from "../views/level/level19.vue";
import level20_3 from "../views/level/level20-3.vue";

const routes = [
    {
        path: "/",
        name: "problem",
        component: problem,
    },
    {
        path: "/sandbox",
        name: "sandbox",
        component: sandbox,
    },
    {
        path: "/level",
        children: [
            {
                path: "1",
                name: "level1",
                component: level1,
            },
            {
                path: "2",
                name: "level2",
                component: level2,
            },
            {
                path: "3",
                name: "level3",
                component: level3,
            },
            {
                path: "4-1",
                name: "level4-1",
                component: level4_1
            },
            {
                path: "4-2",
                name: "level4-2",
                component: level4_2
            },
            {
                path: "4-3",
                name: "level4-3",
                component: level4_3
            },
            {
                path: "5",
                name: "level5",
                component: level5
            },
            {
                path: "6",
                name: "level6",
                component: level6
            },
            {
                path: "7",
                name: "level7",
                component: level7
            },
            {
                path: "8-1",
                name: "level8-1",
                component: level8_1
            }
            ,
            {
                path: "8-2",
                name: "level8-2",
                component: level8_2
            },
            {
                path: "9",
                name: "level9",
                component: level9
            },
            {
                path: "10-1",
                name: "level10-1",
                component: level10_1
            },
            {
                path: "10-2",
                name: "level10-2",
                component: level10_2
            },
            {
                path: "11-1",
                name: "level11-1",
                component: level11_1
            },
            {
                path: "11-2",
                name: "level11-2",
                component: level11_2
            },
            {
                path: "11-3",
                name: "level11-3",
                component: level11_3
            },
            {
                path: "12-1",
                name: "level12-1",
                component: level12_1
            },
            {
                path: "12-2",
                name: "level12-2",
                component: level12_2
            },
            {
                path: "12-3",
                name: "level12-3",
                component: level12_3
            },
            {
                path: "13-1",
                name: "level13-1",
                component: level13_1
            },
            {
                path: "13-2",
                name: "level13-2",
                component: level13_2
            },
            {
                path: "14-1",
                name: "level14-1",
                component: level14_1
            },
            {
                path: "14-2",
                name: "level14-2",
                component: level14_2
            },
            {
                path: "14-3",
                name: "level14-3",
                component: level14_3
            },
            {
                path: "15-2",
                name: "level15-2",
                component: level15_2
            },
            {
                path: "16-1",
                name: "level16-1",
                component: level16_1
            },
            {
                path: "16-2",
                name: "level16-2",
                component: level16_2
            },
            {
                path: "16-3",
                name: "level16-3",
                component: level16_3
            },
            {
                path: "17",
                name: "level17",
                component: level17
            },
            {
                path: "18",
                name: "level18",
                component: level18
            },
            {
                path: "19",
                name: "level19",
                component: level19
            },
            {
                path: "20-3",
                name: "level20-3",
                component: level20_3
            },
        ],
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;