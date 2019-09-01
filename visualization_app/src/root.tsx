import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Provider} from 'react-redux';
import appStore from './appStore';

ReactDOM.render(<Provider store={appStore}><App /></Provider>,document.getElementById('root'));
