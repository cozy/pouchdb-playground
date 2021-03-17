import React, { useState } from 'react'
import Alerter from 'cozy-ui/transpiled/react/Alerter'

import PouchDB from 'pouchdb-browser'
import AddDocs from './AddDocs'
import GetDocs from './GetDocs'
import ResetDB from './ResetDB'
import { destroyDB } from '../queries/queries.js'

//const remoteDatabase = new PouchDB('http://127.0.0.1:5984/pouch-test')

const createDb = () => {
  return new PouchDB('pouch-browser')
}

const PouchBrowser = () => {
  const [db, setDb] = useState(createDb())

  const handleReset = async () => {
    try {
      await destroyDB(db)
      setDb(createDb())
      Alerter.success(`Db successfully reset`)
    } catch (err) {
      console.log(err)
      Alerter.error('Something went wrong')
    }
  }

  return (
    <div>
      <h2>PouchDB Browser</h2>
      <AddDocs db={db} />
      <GetDocs db={db} />
      <ResetDB handleReset={handleReset} />
      <Alerter />
    </div>
  )
}

export default PouchBrowser
