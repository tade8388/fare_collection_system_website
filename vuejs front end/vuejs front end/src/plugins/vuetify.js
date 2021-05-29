import "@fortawesome/fontawesome-free/css/all.css"
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);
// const opts = {}

export default new Vuetify({
    icons: {
        iconfont: 'md'||'fa',
    }
});

