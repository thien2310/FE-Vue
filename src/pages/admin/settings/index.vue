<template>
    setting
</template>


<script>
import { useMenu } from '../../../store/use-menu.js';

export default {
    setup() {
        useMenu().onSlectedKeys(['admin-settings']);
    },
}

</script>