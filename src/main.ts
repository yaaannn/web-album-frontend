import { createApp } from 'vue';
import VueDOMPurifyHTML from 'vue-dompurify-html';

import App from './App.vue';
import store from './stores';
import router from './router';

const app = createApp(App);

//动态标题
app.directive('title', {
    mounted(el) {
        document.title = el.dataset.title
    }
})

app.use(router);
app.use(store);
app.use(VueDOMPurifyHTML);

app.mount('#app');
