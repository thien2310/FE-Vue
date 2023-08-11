const home = [
    {
        path: "/",
        component: () => import("../layouts/index.vue"),
        children: [
            {
                path: "/collection/giaynu", 
                name: "giay-nu",
                component: () => import("../pages/home/collections/giaynu.vue")
            },

            {
                path: "/collection/phukien",
                name: "phu-kien",
                component: () => import("../pages/home/collections/phukien.vue")
            },

            {
                path: "/collection/balotui",
                name: "balo-tui",
                component: () => import("../pages/home/collections/balotui.vue")
            },

            {
                path: "/collection/khac",
                name: "khac",
                component: () => import("../pages/home/collections/index.vue")
            },

          

            {
                path: "profile/",
                name: "profileUser",
                component: () => import("../pages/home/ProfileUser/profile.vue"),
                children: [
                    {
                        path: "index",
                        name: "profile-index",
                        component: () => import("../pages/home/ProfileUser/index.vue")
                    },
                ]
            },

            {
                path: "/home",
                name: "home",
                component: () => import("../layouts/Home.vue")
            },  

            {
                path: "/products/:slug/:id",
                name: "products",
                component: () => import("../pages/home/Products/index.vue")
            },

            {
                path: "/cart",
                name: "cart",
                component: () => import("../pages/home/Cart/index.vue")
            }

        ]
    }

];
export default home;