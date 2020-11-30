import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

/*import {Database} from '@nozbe/watermelondb';

import Post from './models/Post';

const database = new Database({modelClasses: [Post]});*/

AppRegistry.registerComponent(appName, () => App);
