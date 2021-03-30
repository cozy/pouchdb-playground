import React from 'react'
import { hot } from 'react-hot-loader'
import { Layout, Main, Content } from 'cozy-ui/transpiled/react/Layout'
import { Sprite as IconSprite } from 'cozy-ui/transpiled/react/Icon'

import PouchDB from './PouchDB'

/*
PouchDB.plugin(require('pouchdb-adapter-indexeddb'));
var db = new PouchDB('mydb', {adapter: 'indexeddb'});
*/

const App = () => (
  <Layout>
    <Main>
      <Content className="app-content">
        <PouchDB />
      </Content>
    </Main>
    <IconSprite />
  </Layout>
)

/*
  Enable Hot Module Reload using `react-hot-loader` here
  We enable it here since App is the main root component
  No need to use it anywhere else, it sould work for all
  child components
*/
export default hot(module)(App)
