import { createRouter, createWebHistory } from "vue-router";


// 路由信息
const routes = [

    {
        path: "/test",
        name: "test",
        component: () => import("../views/test.vue")
    },
    {
        path: "/",
        name: "home",
        component: () => import("../layout/index.vue"),
        redirect: 'list',
        children: [
            {
                path: '/userInfo/:uid',
                name: "userInfo",
                component: () => import("../views/userInfo/index.vue"),
            },
            {
                path: '/list',
                name: "list",
                component: () => import("../views/user/userList.vue"),
                children: [
                    {
                        path: '/chat',
                        name: "chat",
                        component: () => import("../views/chat/index.vue"),
                    },
                    // {
                    //     // 展示上次和某位好友的视频通话时刻，降序，提示多和朋友聊天，对应于mysql的表info
                    //     path: '/info',
                    //     name: "info",
                    //     component: () => import("../views/info/index.vue"), 
                    // },
                ]
            },
            {
                path: '/add',
                name: "add",
                component: () => import("../views/user/userAdd.vue"),
                children: [
                    {
                        path: '/userAdd',
                        name: "userAdd",
                        component: () => import("../views/user/add.vue"),
                    },
                ]
            },
            {
                path: '/call',
                name: "call",
                component: () => import("../views/conversation/index.vue"),
            },
            {
                path: '/appInfo',
                name: 'appInfo',
                component: ()=> import("../views/appInfo/index.vue")
            },
            {
                path: '/postComment',
                name: 'postComment',
                component: ()=> import("../views/postComment/index.vue")
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: () => import('../views/login/index.vue'),
    },
    {
        path: "/register",
        name: "register",
        component: () => import('../views/register/index.vue'),
    }
];





// 导出路由
const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach((to, from, next) => {
    let token = localStorage.getItem("mushan-token");  // 获取token
    if (to.name != 'login') {  //如果不是去登录页面需要判断是否有token
        if(to.name != 'register'){
            if (!token) {
                next({ name: "login" });
            } else {
                next();
            }
        }
        else{
            next();
        }
    } else {
        next();
    }

})


export default router;
