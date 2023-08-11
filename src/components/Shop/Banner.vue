<template>
    <carousel :autoplay="3000" :wrap-around="true" >
        <slide v-for="item in images" :key="item.id">
            <div class="carousel__item">
                <img :src="item.image" alt="Slide Image" />
            </div>
        </slide>

        <template #addons>
            <navigation />
            <pagination />
        </template>
    </carousel>
    
</template>
  
<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import { defineComponent } from 'vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default defineComponent({
    name: 'Basic',
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },
    setup() {
        const images = [
            {
                id: 1,
                image: 'https://picsum.photos/200/300?grayscale',
                title: 'Slide 1',
                description: 'This is the content of Slide 1',
            },
            {
                id: 2,
                image: 'https://picsum.photos/id/237/200/300',
                title: 'Slide 2',
                description: 'This is the content of Slide 2',
            },
            {
                id: 3,
                image: 'https://picsum.photos/id/237/200/300',
                title: 'Slide 2',
                description: 'This is the content of Slide 2',
            },
            {
                id: 4,
                image: 'https://picsum.photos/id/237/200/300',
                title: 'Slide 2',
                description: 'This is the content of Slide 2',
            },
            {
                id: 5,
                image: 'https://picsum.photos/id/237/200/300',
                title: 'Slide 2',
                description: 'This is the content of Slide 2',
            },
            {
                id: 6,
                image: 'https://picsum.photos/id/237/200/300',
                title: 'Slide 2',
                description: 'This is the content of Slide 2',
            },
        ]

        return {
            images,
           
        }

    },
    
  

})






</script>

<style>
.carousel-item img {
    max-width: 100%;
    height: auto;
}

.carousel__item {
    min-height: 200px;
    width: 100%;
    background-color: white;
    color: var(--vc-clr-white);
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.carousel__slide {
    padding: 10px;
}

.carousel__prev,
.carousel__next {
    box-sizing: content-box;
    border: 5px solid white;
}
</style>
  