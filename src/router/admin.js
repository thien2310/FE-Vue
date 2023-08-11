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
                path: "category/edit",
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

            // quản lý vai trò
            {
                path: "roles",
                name: "admin-roles",
                component: () => import("../pages/admin/roles/index.vue")
            },

            {
                path: "settings",
                name: "admin-settings",
                component: () => import("../pages/admin/settings/index.vue")
            }


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