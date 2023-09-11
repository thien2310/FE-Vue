const admin = [
    {
        path: "/admin",
        component: () => import("../layouts/admin.vue"),
        name: "admin",
        meta: { requiresAdmin: true },
        children: [
            //quản lý user
            {
                path: "users",
                name: "admin-users",
                component: () => import("../pages/admin/users/index.vue")
            },

            // quản lý đơn hàng

            {
                path: "orders",
                name: "admin-orders",
                component: () => import("../pages/admin/Order/index.vue")
            },
            {
                path: "orders/preview/:id",
                name: "admin-order-preview",
                component: () => import("../pages/admin/Order/preview.vue")
            },
            {
                path: "orders/comple",
                name: "admin-order-comple",
                component: () => import("../pages/admin/Order/comple.vue")
            },



            //creat user
            {
                path: "users/create",
                name: "admin-users-create",
                component: () => import("../pages/admin/users/create.vue")
            },
            //edit user
            {
                path: "users/edit/:id",
                name: "admin-users-edit",
                component: () => import("../pages/admin/users/edit.vue")
            },

            //quản lý danh mục
            {
                path: "category",
                name: "admin-category",
                component: () => import("../pages/admin/Category/index.vue")
            },

            {
                path: "category/create",
                name: "admin-category-create",
                component: () => import("../pages/admin/Category/create.vue")
            },
            {
                path: "category/edit/:id",
                name: "admin-category-edit",
                component: () => import("../pages/admin/Category/edit.vue")
            },

            //quan ly san pham,
            {
                path: "product/create",
                name: "admin-product-create",
                component: () => import("../pages/admin/product/create.vue")
            },
            {
                path: "product",
                name: "admin-product",
                component: () => import("../pages/admin/product/index.vue")
            },

            {
                path: "product/edit/:id",
                name: "admin-product-edit",
                component: () => import("../pages/admin/product/edit.vue")
            },



            // quản lý phí vận chuyển
            {
                path: "ships",
                name: "admin-ships",
                component: () => import("../pages/admin/shippingFee/index.vue")
            },

            {
                path: "ships/create",
                name: "admin-ships-create",
                component: () => import("../pages/admin/shippingFee/create.vue")
            },

    
            // quản lí mã giảm giá
            {
                path: "coupons",
                name: "admin-coupons",
                component: () => import("../pages/admin/Coupon/index.vue")
            },
            {
                path: "coupons/create",
                name: "admin-coupons-create",
                component: () => import("../pages/admin/Coupon/create.vue")
            },


            {
                path: "settings",
                name: "admin-settings",
                component: () => import("../pages/admin/settings/index.vue")
            },

            //THống kê số liệu
            {
                path: "staticical",
                name: "admin-staticical",
                component: () => import("../pages/admin/Staticical/index.vue")
            },


        ],
        beforeEnter(to) {
            if (!localStorage.getItem('token')) {
                return '/home'
            }
        }
    },
    {
        path: "/auth/login",
        component: () => import("../layouts/auth/login.vue"),
        name: "auth-login",

    }

];




export default admin;