const home = [
    {
        path: "/",
        component: () => import("../layouts/index.vue"),
        children: [
            {
                path: "/collection/giaynam",
                name: "giay-nam",
                component: () => import("../pages/home/collections/giaynam.vue")
            },

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
                    {
                        path: "coupons",
                        name: "profile-coupons",
                        component: () => import("../pages/home/ProfileUser/coupon.vue")
                    },
                    

                ]
            },
            {
                path: "resgister",
                name: "resgister",
                component: () => import("../pages/home/ProfileUser/resgister.vue")
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
            ,
            {
                path: "/cart/checkout/:idVoucher",
                name: "checkout",
                component: () => import("../pages/home/Cart/Checkout.vue")
            },
            {
                path: "/cart/comple",
                name: "cart-comple",
                component: () => import("../pages/home/Cart/comple.vue")
            }

        ]
    }

];
export default home;