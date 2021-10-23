import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { App } from '@vue/runtime-dom';


export default function (app: App) {
  // Make free FA work
  library.add(fas, fab); // TODO Only include the required ones later
  
  // Setup Font-Awesome
  app.component('fa-icon', FontAwesomeIcon)
}

