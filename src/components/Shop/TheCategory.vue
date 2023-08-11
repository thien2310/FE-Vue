<template>
    <a-menu mode="" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" class="custom-horizontal">

        <template v-for="item in list" :key="item.key">
            <template v-if="!item.children">
                <a-menu-item :key="item.key" class="custom-item-horizontal">
                    <span>
                        <router-link :to="{ name: item.slug  }">
                            {{ item.title }}
                        </router-link>
                    </span>
                </a-menu-item>
            </template>
        </template>

    </a-menu>
</template>





<script>
import { defineComponent, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useMenu } from '../../store/use-menu';
import axios from 'axios';

export default defineComponent({
    components: {


    },
    setup() {
        const store = useMenu();
        const list = ref([{
            key: '',
            title: '',
            slug: ''
        },
        ]);

        const getdata = () => {
            axios.get('api/category/showhome').then((res) => {
                // console.log(res);
                for (const data of res.data.show) {
                    list.value.push({
                        key: data.id,
                        title: data.name,
                        slug: data.slug
                    })
                }

            }).catch((Error) => {
                console.log(Error);
            })
        }
        // console.log(list);


        getdata();

        return {
            ...storeToRefs(store),
            list
        }

    },
});
</script>

<style>
.custom-horizontal {
    background-color: aquamarine;


}

.custom-horizontal .custom-item-horizontal {
    display: inline-block;
    margin-left: 50px;

}
</style>