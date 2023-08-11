<template>
    <section style="margin-top: 20px;">
        <div class="row">
            <div class="col-6" style="padding-top: 20px;">
                <a-carousel arrows dots-class="slick-dots slick-thumb">
                    <template #customPaging="props">
                        <a>
                            <img :src="getImgUrl(props.index)" />
                        </a>
                    </template>
                    <div v-for="(item, index) in images" :key="index">
                        <img :src="item.src" />
                    </div>

                </a-carousel>

            </div>
            <div class="col-6">
                <div class="info title">
                    <h1> {{ name }} </h1>
                </div>

                <div class="row">
                    <div class="col-6">
                        <div class="info rate">
                            <div class="row">
                                <div class="col-4">
                                    *****
                                </div>
                                <div class="col-4">
                                    999 Đánh giá
                                </div>
                                <div class="col-4">
                                    Số lượt thích 999
                                </div>
                            </div>
                        </div>
                        <div class="info price">
                            <h3 style="color: brown;"> Giá sản phẩm : <span>{{ formatCurrency(price) }}</span> </h3>
                        </div>
                        <div class="info color">
                            Xanh đỏ tím vàng
                        </div>
                        <div class="info size">
                            36 36 36 37
                        </div>
                        <div class="info intrus">
                            Hướng dẫn size
                        </div>
                        <div class="info map" style="margin-bottom: 10px;">
                            <a-button style="width: 100%;">TÌm sản phẩm tại </a-button>
                        </div>
                        <div class="row">
                            <div class="col-4" style="margin-bottom: 10px;">
                                <a-button style="width: 100%;">Mua ngay</a-button>
                            </div>
                            <div class="col-8">
                                <!-- <router-link :to= "{ name: 'cart' }"> -->
                                <a-button style="width: 100%;" @click="addProductToCart(dataProduct)">Thêm vào giỏ
                                    hàng</a-button>
                                <!-- </router-link> -->

                            </div>
                        </div>
                    </div>
                </div>

                <!-- chinhsach -->
                <div class="row">
                    <div class="col-4">
                        <div class="chinhsach">
                            <img src="../../../assets/icon3.jpg" alt="" width="30px">
                        </div>
                        <span class="tenchinhsach">Bảo hành keo vĩnh viễn</span>
                    </div>

                    <div class="col-4">
                        <div class="chinhsach">
                            <img src="../../../assets/icon4.jpg" alt="" width="30px">
                        </div>
                        <span class="tenchinhsach">MIễn phí vận chuyển toàn quốc
                            cho đơn hàng từ 150k</span>
                    </div>
                    <div class="col-4">
                        <div class="chinhsach">
                            <img src="../../../assets/icon5.jpg" alt="" width="30px">
                        </div>
                        <span class="tenchinhsach">Đổi trả dễ dàng
                            trong vòng 7 ngày nếu lỗi nhà sản xuất
                        </span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-4">
                        <div class="chinhsach">
                            <img src="../../../assets/icon2.jpg" alt="" width="30px">
                        </div>
                        <span class="tenchinhsach">Hotline 0344015JQK
                            hỗ trợ từ 8h30-21h30
                        </span>
                    </div>

                    <div class="col-4">
                        <div class="chinhsach">
                            <img src="../../../assets/icon1.jpg" alt="" width="30px">
                        </div>
                        <span class="tenchinhsach">Giao hàng tận nơi
                            Nhận hàng xong thanh toán</span>
                    </div>
                    <div class="col-4">
                        <div class="chinhsach">
                            <img src="../../../assets/icon3.jpg" alt="" width="30px">
                        </div>
                        <span class="">Ưu đãi tích điểm và
                            hưởng quyền lợi từ MT18
                        </span>
                    </div>
                </div>
                <br>
                <br>
                <br>
                <hr>
            </div>
        </div>
    </section>

    <section>
        <a-card style="width: 100%" :tab-list="tabListNoTitle" :active-tab-key="noTitleKey"
            @tabChange="key => onTabChange(key, 'noTitleKey')">
            <p v-if="noTitleKey === 'Productdetails'">
                {{ intro }}
            </p>
            <p v-else-if="noTitleKey === 'Comment'">
                Vui lòng đăng nhập để bình luận
            </p>
            <p v-else>
                Đăng nhập để đánh giá
            </p>
            <template #tabBarExtraContent>
                <a href="#">More</a>
            </template>
        </a-card>
    </section>

    <section>
        <div class="title d-flex justify-content-start m-4">
            <h3> Có thể bạn thích </h3>
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


    </section>

    <!-- showcart -->

    <!-- <template>
        <a-button type="primary" style="margin-right: 8px" @click="showDrawer('default')">
            Open Default Size (378px)
        </a-button>

        <a-drawer title="Basic Drawer" :size="size" :visible="visible" @close="onClose">
            <template #extra>
                <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
                <a-button type="primary" @click="onClose">Submit</a-button>
            </template>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </a-drawer>
    </template> -->

    <br>
    <br>
    <hr>
</template>

<script>

import { HomeOutlined } from '@ant-design/icons-vue';
import axios from 'axios';
import { defineComponent, ref, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '../../../store/use-cart.js'
import { notification } from 'ant-design-vue';

const baseUrl = 'https://raw.githubusercontent.com/vueComponent/ant-design-vue/main/components/carousel/demo/';

export default defineComponent({
    components: {
        HomeOutlined,
    },
    setup() {
        const getImgUrl = i => {
            if (images[i]) {
                return images[i].src;
            }
            return '';
        };

        const formatCurrency = (price) => {
            return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        }

        const tabListNoTitle = [{
            key: 'Productdetails',
            tab: 'Chi tiết sản phẩm',
        }, {
            key: 'Comment',
            tab: 'BÌnh luận',
        }, {
            key: 'rate',
            tab: 'Đánh giá',
        }];
        const key = ref('tab1');
        const noTitleKey = ref('app');
        const onTabChange = (value, type) => {
            console.log(value, type);
            if (type === 'key') {
                key.value = value;
            } else if (type === 'noTitleKey') {
                noTitleKey.value = value;
            }
        };

        const route = useRoute();
        const product = reactive({
            name: '',
            price: '',
            intro: '',
        });

        const images = ref([]);
        const dataProduct = ref([]);
        const getProduct = () => {
            axios.get(`api/home/products/${route.params.id}`).then((res) => {
                // console.log(res);


                product.name = res.data.product.name;
                product.price = res.data.product.price;
                product.intro = res.data.product.intro;

                dataProduct.value = res.data.product;
                for (const st of res.data.product.images) {

                    images.value.push({
                        src: 'http://127.0.0.1:8000' + st.path,
                    })
                }

            }).catch((Error) => {
                console.log(Error);
            })
        }
     
        // giỏ hàng
        const cart = useCartStore();
        const addProductToCart = (dataProduct) => {
            if (dataProduct) {
                cart.addToCart(dataProduct);
                notification.open({
                    message: 'Thông báo',
                    description: 'Bạn đã thêm sản phẩm vào giỏ hàng thành công',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            }else {
                notification.open({
                    message: 'Thông báo',
                    description: 'Thêm sản phẩm thất bại',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            }

        }


        getProduct();

        return {
          
            getImgUrl,
            tabListNoTitle,
            key,
            noTitleKey,
            onTabChange,
            route,
            product,
            ...toRefs(product),
            images,
            formatCurrency,
            addProductToCart,
            cart,
            dataProduct




        };
    },
});
</script>
<style scoped>
.chinhsach {
    text-align: center;
    margin-bottom: 8px;
    margin-top: 20px;
}

span .tenchinhsach {

    margin-bottom: 20px;
}


/* For demo */
:deep(.slick-dots) {
    position: relative;
    height: auto;
}

:deep(.slick-slide img) {
    border: 5px solid #fff;
    display: block;
    margin: auto;
    max-width: 80%;
}

:deep(.slick-arrow) {
    display: none !important;
}

:deep(.slick-thumb) {
    bottom: 0px;
}

:deep(.slick-thumb li) {
    width: 60px;
    height: 45px;
}

:deep(.slick-thumb li img) {
    width: 100%;
    height: 100%;
    filter: grayscale(100%);
    display: block;
}

:deep .slick-thumb li.slick-active img {
    filter: grayscale(0%);
}

.info {
    margin-top: 30px;
}
</style>