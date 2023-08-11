<template>
    <ckeditor :editor="editor" v-model:value="editorData" :rows="5" :config="editorConfig"></ckeditor>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { defineComponent, ref } from 'vue';
export default defineComponent({

    setup() {

        const editorData = ref('<p> cotentnetne </p>');

        return {

            editor: ClassicEditor,
            editorData: ref('<p> cotentnetne </p>') ,
            editorConfig: {
                // The configuration of the editor.
            }
        };
    }
})
</script>
