<template>
  <div class="container-fuild">
    <div class="row " style="background-color: cadetblue; padding: 1rem;">
      <div class="col-1 d-flex d-sm-none align-items-center justify-content-center">
        <span @click="showDrawer()"><i class="fa-solid fa-bars"></i></span>
      </div>

      <div class="col-10 col-sm-9 d-flex align-items-center justify-content-center justify-content-sm-start">
        <img src="../assets/5556512.png" alt="logo" height="32" width="34" class="ms-3 me-3">
        <span class="d-none d-sm-flex" v-if="Auth"> Hello {{ Auth.name }}</span>
        <span class="d-none d-sm-flex" v-if="!Auth">Quản trị </span>

      </div>

      <div class="col-sm-3 d-none d-sm-flex align-items-center justify-content-sm-end mr-3">
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            &emsp; &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Lựa chọn
            <DownOutlined />
          </a>

          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="">&emsp;Thông tin</a>
              </a-menu-item>
              <a-menu-item>
                <a href="">&emsp;Hỗ trợ</a>
              </a-menu-item>
              <a-menu-item>
                <a v-if="Auth" @click="logout()">&emsp;Đăng xuất</a>
                <a href="" v-if="!Auth">&emsp;Đăng Kí</a>

              </a-menu-item>

              <a-menu-item>
                <router-link to="/auth/login" v-if="!Auth">&emsp;Đăng Nhập</router-link>
              </a-menu-item>


            </a-menu>
          </template>

        </a-dropdown>
      </div>

      <div class="col-1 d-flex d-sm-none align-items-center justify-content-center">
        <span @click="showDrawer_User()"> <i class="fa-regular fa-user"></i> </span>
      </div>

    </div>
  </div>
  <a-drawer v-model:visible="open" title="DANH MUC" placement="left">
    <TheMenu />
  </a-drawer>

  <a-drawer v-model:visible="open_user" title="ADMIN" placement="right">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>
<script >


import { defineComponent, ref } from 'vue';
import TheMenu from './TheMenu.vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
export default defineComponent({
  components: {
    TheMenu,
  },
  setup() {

    const router = useRoute();

    const logout = () => {

      localStorage.removeItem('token');
      axios.post('api/auth/logout').then((res) => {
        // console.log(res);
        // router.push({ name: auth-login });
        window.location.href = '/auth/login';

      }).catch((Error) => {
        console.log(Error);
      })

    }

    const open = ref(false);
    const open_user = ref(false);
    const Auth = ref('');

    const showDrawer = () => {
      open.value = true;
    }

    const showDrawer_User = () => {
      open_user.value = true;
    }

    const authUser = () => {
      axios.get('api/auth/user').then((res) => {
        Auth.value = res.data

      }).catch((Error) => {
        console.log(Error);
      })
    }

    authUser();

    return {
      router,
      Auth,
      open,
      open_user,
      showDrawer,
      showDrawer_User,
      logout
    };
  },
});

</script>