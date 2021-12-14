import { render } from 'react-dom'
import './styles/index.scss'

import AppCanvas from './js/components/AppCanvas'

// import './styles/index.scss';

render(<AppCanvas id="faceFilterCanvas" />, document.querySelector('#root'))
