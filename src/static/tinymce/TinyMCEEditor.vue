<template>
    <div>
      <textarea ref="editor" v-model="editorData"></textarea>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  
  export default {
    props: {
      apiKey: {
        type: String,
        required: true,
      },
      initialValue: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      const editorData = ref(props.initialValue);
      let editorInstance;
  
      onMounted(() => {
        tinymce.init({
          target: props.apiKey,
          selector: 'textarea',
          setup: (editor) => {
            editorInstance = editor;
            editor.on('change', () => {
              editorData.value = editor.getContent();
            });
          },
        });
      });
  
      return { editorData };
    },
    watch: {
      initialValue: {
        immediate: true,
        handler(newValue) {
          if (newValue !== this.editorData) {
            this.editorData = newValue;
            this.editorInstance.setContent(newValue);
          }
        },
      },
    },
    beforeUnmount() {
      if (this.editorInstance) {
        this.editorInstance.destroy();
      }
    },
  };
  </script>
  