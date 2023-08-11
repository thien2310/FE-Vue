import { defineStore } from 'pinia';
import axios from 'axios';
import { notification } from 'ant-design-vue';


export const useUserStore = defineStore('user', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        role: localStorage.getItem('role') || null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        isAdmin: (state) => state.role === '1',
    },

    actions: {
        setTokenandRole({ token, role }) {
            this.token = token;
            this.role = role;
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
        },

        async login(credentials) {
            try {
                const response = await axios.post('api/auth/login', credentials);
                const { token, role } = response.data;
                this.setTokenandRole({ token, role });

                notification.open({
                    message: 'Thông báo',
                    description: 'Đăng nhập thành công',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                })
            } catch (error) {
                // Xử lý lỗi đăng nhập
                // console.error('Login error:', error);
            }
        },

        logout() {
            this.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            // Đặt lại các trạng thái người dùng khác nếu cần
        },
    },
});