import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSearch,
  faAngleDown,
  faAngleUp,
  faCheck,
  faCircle,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const icons = [faSearch, faAngleDown, faAngleUp, faCheck, faCircle, faMagnifyingGlass]

for (const icon of icons) {
  library.add(icon)
}

export default FontAwesomeIcon
