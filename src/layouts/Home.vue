<template>
    <section style="">
        <Banner />
    </section>
    <section>
        <div class="title d-flex justify-content-center">
            <h1> THÔNG TIN SẢN PHẨM </h1>
        </div>
        <div class="row">

            <div class="col-sm-6 col-12" style="width: 750px;">
                <img src="../assets/mwc.jpg" alt="" style="max-width: 100%;height: auto; display: block;">
            </div>

            <div class="col-sm-6 col-12">
                <div class="row">
                    <div class="col-sm-6 col-6">
                        <a-card hoverable style="width: 360px">
                            <template #cover>
                                <img alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                            </template>
                            <template #actions>
                                <setting-outlined key="setting" />
                                <edit-outlined key="edit" />
                                <ellipsis-outlined key="ellipsis" />
                            </template>

                            <div class="title d-flex justify-content-center">
                                tên sản phẩm
                            </div>
                            <div class="conten d-flex justify-content-center">
                                thông tin cái
                            </div>
                        </a-card>
                    </div>
                    <div class="col-sm-6 col-6">
                        <a-card hoverable style="width: 360px">
                            <template #cover>
                                <img alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                            </template>
                            <template #actions>
                                <setting-outlined key="setting" />
                                <edit-outlined key="edit" />
                                <ellipsis-outlined key="ellipsis" />
                            </template>

                            <div class="title d-flex justify-content-center">
                                tên sản phẩm
                            </div>
                            <div class="conten d-flex justify-content-center">
                                thông tin cái
                            </div>
                        </a-card>
                    </div>
                </div>
                <div class="row" style="margin-top: 50px;">
                    <div class="col-sm-6 col-6">
                        <a-card hoverable style="width: 360px">
                            <template #cover>
                                <img alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                            </template>
                            <template #actions>
                                <setting-outlined key="setting" />
                                <edit-outlined key="edit" />
                                <ellipsis-outlined key="ellipsis" />
                            </template>

                            <div class="title d-flex justify-content-center">
                                tên sản phẩm
                            </div>
                            <div class="conten d-flex justify-content-center">
                                thông tin cái
                            </div>
                        </a-card>
                    </div>
                    <div class="col-sm-6 col-6">
                        <a-card hoverable style="width: 360px">
                            <template #cover>
                                <img alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                            </template>
                            <template #actions>
                                <setting-outlined key="setting" />
                                <edit-outlined key="edit" />
                                <ellipsis-outlined key="ellipsis" />
                            </template>

                            <div class="title d-flex justify-content-center">
                                tên sản phẩm
                            </div>
                            <div class="conten d-flex justify-content-center">
                                thông tin cái
                            </div>
                        </a-card>
                    </div>
                </div>
            </div>
        </div>
        <div class="title d-flex justify-content-center">
            <a href="#"> Xem tất cả </a>
        </div>
    </section>
    <hr>
    <section>
        <div class="title d-flex justify-content-center m-4">
            <h1> GIÀY NỮ </h1>
        </div>
        <template style="display: inline-block;">
            <div class="row">
                <div class="col-6 col-sm-3" v-for="item in giaynu" :key="item.id">
                    <router-link :to="{ name: 'products', params: { id: item.id, slug: item.slug } }">
                        <a-card hoverable style="width: 365px">
                            <template #cover>
                                <img alt="example" :src="'http://127.0.0.1:8000' + item.image.path" />
                            </template>

                            <div class="title d-flex justify-content-center " style="height:52px;">
                                <p> {{ item.name.toLocaleString() }} </p>
                            </div>
                            <div class="conten d-flex justify-content-center">
                                Giá : {{ formatCurrency(item.price) }}
                            </div>
                        </a-card>
                    </router-link>
                </div>
            </div>
        </template>
        <div class="title d-flex justify-content-center m-4">
            <a href="#"> Xem tất cả </a>
        </div>
    </section>
    <hr>

    <section>
        <div class="title d-flex justify-content-center m-4">
            <h1> GIÀY NAM </h1>
        </div>
        <div class="row">
            <div class="col-6 col-sm-3">
                <a-card hoverable style="width: 365px">
                    <template #cover>
                        <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                    </template>
                    <template #actions>
                        <setting-outlined key="setting" />
                        <edit-outlined key="edit" />
                        <ellipsis-outlined key="ellipsis" />
                    </template>

                    <div class="title d-flex justify-content-center">
                        tên sản phẩm
                    </div>
                    <div class="conten d-flex justify-content-center">
                        thông tin cái
                    </div>
                </a-card>
            </div>
            <div class="col-6 col-sm-3">
                <a-card hoverable style="width: 365px">
                    <template #cover>
                        <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                    </template>
                    <template #actions>
                        <setting-outlined key="setting" />
                        <edit-outlined key="edit" />
                        <ellipsis-outlined key="ellipsis" />
                    </template>

                    <div class="title d-flex justify-content-center">
                        tên sản phẩm
                    </div>
                    <div class="conten d-flex justify-content-center">
                        thông tin cái
                    </div>
                </a-card>
            </div>
            <div class="col-6 col-sm-3">
                <a-card hoverable style="width: 365px">
                    <template #cover>
                        <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                    </template>
                    <template #actions>
                        <setting-outlined key="setting" />
                        <edit-outlined key="edit" />
                        <ellipsis-outlined key="ellipsis" />
                    </template>

                    <div class="title d-flex justify-content-center">
                        tên sản phẩm
                    </div>
                    <div class="conten d-flex justify-content-center">
                        thông tin cái
                    </div>
                </a-card>
            </div>
            <div class="col-6 col-sm-3">
                <a-card hoverable style="width: 365px">
                    <template #cover>
                        <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                    </template>
                    <template #actions>
                        <setting-outlined key="setting" />
                        <edit-outlined key="edit" />
                        <ellipsis-outlined key="ellipsis" />
                    </template>

                    <div class="title d-flex justify-content-center">
                        tên sản phẩm
                    </div>
                    <div class="conten d-flex justify-content-center">
                        thông tin cái
                    </div>
                </a-card>
            </div>
        </div>
        <div class="title d-flex justify-content-center m-4">
            <a href="#"> Xem tất cả </a>
        </div>
    </section>
    <hr>


    <section>
        <div class="title d-flex justify-content-center m-4">
            <h1> GIÀY NAM </h1>
        </div>
        <div class="row">
            <div class="col-6 col-sm-3">
                <a-card hoverable style="width: 365px">
                    <template #cover>
                        <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                    </template>
                    <template #actions>
                        <setting-outlined key="setting" />
                        <edit-outlined key="edit" />
                        <ellipsis-outlined key="ellipsis" />
                    </template>

                    <div class="title d-flex justify-content-center">
                        tên sản phẩm
                    </div>
                    <div class="conten d-flex justify-content-center">
                        thông tin cái
                    </div>
                </a-card>
            </div>
            <div class="col-6 col-sm-3">
                <a-card hoverable style="width: 365px">
                    <template #cover>
                        <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                    </template>
                    <template #actions>
                        <setting-outlined key="setting" />
                        <edit-outlined key="edit" />
                        <ellipsis-outlined key="ellipsis" />
                    </template>

                    <div class="title d-flex justify-content-center">
                        tên sản phẩm
                    </div>
                    <div class="conten d-flex justify-content-center">
                        thông tin cái
                    </div>
                </a-card>
            </div>
            <div class="col-6 col-sm-3">
                <a-card hoverable style="width: 365px">
                    <template #cover>
                        <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                    </template>
                    <template #actions>
                        <setting-outlined key="setting" />
                        <edit-outlined key="edit" />
                        <ellipsis-outlined key="ellipsis" />
                    </template>

                    <div class="title d-flex justify-content-center">
                        tên sản phẩm
                    </div>
                    <div class="conten d-flex justify-content-center">
                        thông tin cái
                    </div>
                </a-card>
            </div>
            <div class="col-6 col-sm-3">
                <a-card hoverable style="width: 365px">
                    <template #cover>
                        <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                    </template>
                    <template #actions>
                        <setting-outlined key="setting" />
                        <edit-outlined key="edit" />
                        <ellipsis-outlined key="ellipsis" />
                    </template>

                    <div class="title d-flex justify-content-center">
                        tên sản phẩm
                    </div>
                    <div class="conten d-flex justify-content-center">
                        thông tin cái
                    </div>
                </a-card>
            </div>
        </div>
        <div class="title d-flex justify-content-center m-4">
            <a href="#"> Xem tất cả </a>
        </div>
    </section>
    <hr>
</template>

<script>
import { defineComponent, ref } from 'vue';
import Banner from '../components/Shop/Banner.vue';
import { useMenu } from '../store/use-menu';
import axios from 'axios';


export default defineComponent({
    components: {
        Banner
    }

    ,
    setup() {
        useMenu().onSlectedKeys(['home'])
        

        const giaynu = ref([])
        const formatCurrency = (price) => {
            return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        }
        const getGiayNu = () => {
            axios.get('/api/home').then((res) => {

                giaynu.value = res.data.giaynu;

            }).catch((Error) => {

                console.log(Error);
            })

        }
   

        getGiayNu();
        return {
            giaynu,
            formatCurrency,
        
        };

    }
})
</script>

<style>
.xxx {
    list-style: none;
}

.xxx li a {
    text-decoration: none;
}

.xxx h4 {
    margin-bottom: 30px;

}

.footer {
    background-color: black;
    color: #fff;
    margin-top: 10px;
}
</style>