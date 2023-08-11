<template>
    <div style="padding-top: 7rem;">
        123
    </div>
</template>


<script>

import { useMenu } from '../../../store/use-menu';

export default {
    setup() {
        useMenu().onSlectedKeys(['giay-nu']);
    }
}

</script>