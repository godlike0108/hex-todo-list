import Vue from 'vue'
import fontawesome from '@fortawesome/fontawesome'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'
import faPlusSqr from '@fortawesome/fontawesome-free-solid/faPlusSquare'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'
import fasStar from '@fortawesome/fontawesome-free-solid/faStar'
import faStar from '@fortawesome/fontawesome-free-regular/faStar'
import fasEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faEdit from '@fortawesome/fontawesome-free-regular/faEdit'
import faDate from '@fortawesome/fontawesome-free-regular/faCalendarAlt'
import faFile from '@fortawesome/fontawesome-free-regular/faFile'
import faComment from '@fortawesome/fontawesome-free-regular/faCommentDots'

import App from './App.vue'
import {store} from './store/store'

fontawesome.library.add(faPlus);
fontawesome.library.add(faPlusSqr);
fontawesome.library.add(faTimes);
fontawesome.library.add(fasStar);
fontawesome.library.add(faStar);
fontawesome.library.add(fasEdit);
fontawesome.library.add(faEdit);
fontawesome.library.add(faDate);
fontawesome.library.add(faFile);
fontawesome.library.add(faComment);

new Vue({
  store: store,
  el: '#app',
  render: h => h(App)
})
