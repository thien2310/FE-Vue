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

                    <div class="col-sm-6 col-6 mb-3" v-for="item in viewProduct" :key="item.id">
                        <router-link :to="{ name: 'products', params: { id: item.id, slug: item.slug } }"
                            class="custom-link-class">
                            <a-card hoverable style="width: 360px">
                                <template #cover>
                                    <img alt="example"
                                        :src="item.image ? 'http://127.0.0.1:8000' + item.image.path : 'https://fastcare.vn/core/img/default_image.png'" />
                                </template>

                                <div class="title d-flex justify-content-center " style="height:52px;">
                                    <h4> {{ item.name.toLocaleString() }} </h4>
                                </div>
                                <div class="conten d-flex justify-content-center">
                                    <h4>Giá : {{ formatCurrency(item.price) }}</h4>
                                </div>
                                <div class="conten d-flex justify-content-center">
                                    <h4>Số lượt xem : <span> {{ item.views }} </span> </h4>
                                </div>
                            </a-card>
                        </router-link>
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
                    <router-link :to="{ name: 'products', params: { id: item.id, slug: item.slug } }"
                        class="custom-link-class">
                        <a-card hoverable style="width: 365px">
                            <template #cover>
                                <img alt="example"
                                    :src="item.image ? 'http://127.0.0.1:8000' + item.image.path : 'https://fastcare.vn/core/img/default_image.png'" />
                            </template>

                            <div class="title d-flex justify-content-center " style="height:52px;">
                                <h4>
                                    <p> {{ item.name.toLocaleString() }} </p>
                                </h4>
                            </div>
                            <div class="conten d-flex justify-content-center">
                                <h4> Giá : {{ formatCurrency(item.price) }} </h4>
                            </div>
                            <div class="conten d-flex justify-content-center">
                                <h4>Số lượt xem : <span> {{ item.views === null ? 0 : item.views }} </span> </h4>
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
        <template style="display: inline-block;">
            <div class="row">
                <div class="col-6 col-sm-3" v-for="item in giaynam" :key="item.id">
                    <router-link class="custom-link-class"
                        :to="{ name: 'products', params: { id: item.id, slug: item.slug } }">
                        <a-card hoverable style="width: 365px">
                            <template #cover>
                                <img alt="example"
                                    :src="item.image ? 'http://127.0.0.1:8000' + item.image.path : 'https://fastcare.vn/core/img/default_image.png'" />
                            </template>

                            <div class="title d-flex justify-content-center " style="height:52px;">
                                <h4>
                                    <p> {{ item.name.toLocaleString() }} </p>
                                </h4>
                            </div>
                            <div class="conten d-flex justify-content-center">
                                <h4> Giá : {{ formatCurrency(item.price) }} </h4>
                            </div>

                            <div class="conten d-flex justify-content-center">
                                <h4>Số lượt xem : <span> {{ item.views === null ? 0 : item.views }} </span> </h4>
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
            <h1> PHỤ KIỆN </h1>
        </div>
        <template style="display: inline-block;">
            <div class="row">
                <div class="col-6 col-sm-3" v-for="item in phukien" :key="item.id">
                    <router-link class="custom-link-class"
                        :to="{ name: 'products', params: { id: item.id, slug: item.slug } }">
                        <a-card hoverable style="width: 365px" class="custom-link-class">
                            <template #cover>
                                <img alt="example"
                                    :src="item.image ? 'http://127.0.0.1:8000' + item.image.path : 'https://fastcare.vn/core/img/default_image.png'" />
                            </template>

                            <div class="title d-flex justify-content-center " style="height:52px;">
                                <h4>
                                    <p> {{ item.name.toLocaleString() }} </p>
                                </h4>
                            </div>
                            <div class="conten d-flex justify-content-center">
                                <h4> Giá : {{ formatCurrency(item.price) }} </h4>
                            </div>

                            <div class="conten d-flex justify-content-center">
                                <h4>Số lượt xem : <span> {{ item.views === null ? 0 : item.views }} </span> </h4>
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
            <h1> BALO-TÚI </h1>
        </div>
        <template style="display: inline-block;">
            <div class="row">
                <div class="col-6 col-sm-3" v-for="item in balotui" :key="item.id">
                    <router-link class="custom-link-class"
                        :to="{ name: 'products', params: { id: item.id, slug: item.slug } }">
                        <a-card hoverable style="width: 365px" class="custom-link-class">
                            <template #cover>
                                <img alt="example"
                                    :src="item.image ? 'http://127.0.0.1:8000' + item.image.path : 'https://fastcare.vn/core/img/default_image.png'" />
                            </template>

                            <div class="title d-flex justify-content-center " style="height:52px;">
                                <p> {{ item.name.toLocaleString() }} </p>
                            </div>
                            <div class="conten d-flex justify-content-center">
                                <h4> Giá : {{ formatCurrency(item.price) }} </h4>
                            </div>

                            <div class="conten d-flex justify-content-center">
                                <h4>Số lượt xem : <span> {{ item.views === null ? 0 : item.views }} </span> </h4>
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
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import Banner from '../components/Shop/Banner.vue';
import { useMenu } from '../store/use-menu';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default defineComponent({
    components: {
        Banner
    }
    ,
    setup() {
        useMenu().onSlectedKeys(['home'])
        const giaynu = ref([]);
        const giaynam = ref([]);
        const phukien = ref([]);
        const balotui = ref([]);
        const viewProduct = ref([]);
        const formatCurrency = (price) => {
            return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        }

        const getData = () => {
            axios.get('/api/home').then((res) => {
                console.log(res);
                giaynu.value = res.data.giaynu;
                giaynam.value = res.data.giaynam;
                phukien.value = res.data.phukien;
                balotui.value = res.data.balotui;
                viewProduct.value = res.data.viewProduct;

            }).catch((Error) => {
                console.log(Error);
            })
        }

        getData();

        const route = useRoute();

        watch(
            () => route.params,
            (params) => {
                // const productId = params.id;
                axios.post(`api/home/product/viewProduct/${params.id}`).then((res) => {

                }).catch((Error) => {
                    console.log(Error);
                })
            }
        );

        return {
            giaynu,
            giaynam,
            phukien,
            balotui,
            formatCurrency,
            viewProduct
        };

    },

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

.custom-link-class {
    /* Your hover styles here */
    text-decoration: none;
    /* For underline effect */
}
</style>