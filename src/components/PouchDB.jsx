import React, { useState, useEffect } from 'react'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Card from 'cozy-ui/transpiled/react/Card'
import Label from 'cozy-ui/transpiled/react/Label'
import SelectBox from 'cozy-ui/transpiled/react/SelectBox'

import PouchDB from 'pouchdb'
import PouchIndexedDB from 'pouchdb-adapter-indexeddb'
import PouchFind from 'pouchdb-find'
import PouchDebug from 'pouchdb-debug'

import AddDocs from './AddDocs'
import GetDocs from './GetDocs'
import ResetDB from './ResetDB'
import Replication from './Replication'
import { destroyDB } from '../queries/queries.js'

PouchDB.plugin(PouchIndexedDB)
  .plugin(PouchFind)
  .plugin(PouchDebug)

/*
  To enable debug: PouchDB.debug.enable('*')
*/

const Pouch = () => {
  const [adapter, setAdapter] = useState('indexeddb')
  const [db, setDb] = useState(null)

  useEffect(
    () => {
      createDb(adapter)
    },
    [adapter]
  )

  const createDb = adapter => {
    let newDb
    if (adapter === 'idb') {
      newDb = new PouchDB('pouch-test-idb', { adapter })
    } else {
      newDb = new PouchDB('pouch-test-indexeddb', { adapter })
    }
    setDb(newDb)
  }

  const handleReset = async () => {
    try {
      await destroyDB(db)
      createDb(adapter)
      Alerter.success(`Db successfully reset`)
    } catch (err) {
      console.log(err)
      Alerter.error('Something went wrong')
    }
  }

  const handleAdapterChange = event => {
    setAdapter(event.value.trim())
  }

  const adapters = [
    { value: 'indexeddb', label: 'indexedDB' },
    { value: 'idb', label: 'idb (classic)' }
  ]

  return (
    <div>
      <h2>PouchDB Perfs</h2>
      <div className="block">
        <Label block={false}>Adapter:</Label>
        <SelectBox options={adapters} onChange={handleAdapterChange} />
      </div>
      <Card>
        <ResetDB handleReset={handleReset} />
      </Card>
      <Card>
        <AddDocs db={db} />
      </Card>
      <Card>
        <GetDocs db={db} />
      </Card>
      <Card>
        <Replication db={db} />
      </Card>
      <Alerter />
    </div>
  )
}

export default Pouch
