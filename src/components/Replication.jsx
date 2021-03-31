// pouch.replicate.from(url, options)

import React, { useState } from 'react'

import Button from 'cozy-ui/transpiled/react/Button'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Label from 'cozy-ui/transpiled/react/Label'
import Input from 'cozy-ui/transpiled/react/Input'

import { replicate, REPLICATE_FROM, REPLICATE_TO } from '../queries/queries.js'
import { startMeasure, endMeasure } from '../utils'

export const Replication = ({ db }) => {
  const [isBusy, setIsBusy] = useState(false)
  const [resultText, setResultText] = useState('')
  const [remoteDbName, setRemoteDbName] = useState('test-pouch')

  const handleSubmit = async replicationMode => {
    try {
      setIsBusy(true)

      const startTime = startMeasure()
      const resp = await replicate(db, remoteDbName, replicationMode)
      const execTime = endMeasure(startTime)
      const nDocs = resp.docs_written
      setIsBusy(false)

      setResultText(`${nDocs} docs replicated in ${execTime} ms`)
      Alerter.success(`${nDocs} docs replicated`)
    } catch (err) {
      console.log(err)
      Alerter.error('Something went wrong')
    }
  }

  const handleRemoteDbChange = event => {
    setRemoteDbName(event.target.value)
  }

  return (
    <div>
      <h3>Replication</h3>
      <div className="block">
        <i>
          Note you might need to accept CORS from CouchDB. See
          <a href="https://stackoverflow.com/a/36089633"> here</a>
        </i>
      </div>
      <div className="block">
        <Label htmlFor="remote-db" block={false}>
          Database name:
        </Label>
        <Input
          value="test-pouch"
          size="tiny"
          onChange={handleRemoteDbChange}
          id="input-remote-db"
        />
      </div>
      <div>
        <h4>Replicate docs from CouchDB </h4>
        <Button
          id="btn-replicate-from"
          type="submit"
          onClick={() => handleSubmit(REPLICATE_FROM)}
          busy={isBusy}
          label={`Replicate docs from CouchDB`}
          size="small"
        />
      </div>
      <div>
        <h4>Replicate docs to CouchDB </h4>
        <Button
          id="btn-replicate-from"
          type="submit"
          onClick={() => handleSubmit(REPLICATE_TO)}
          busy={isBusy}
          label={`Replicate docs to CouchDB`}
          size="small"
        />
      </div>
      <Label>{resultText}</Label>
      <Alerter />
    </div>
  )
}

export default Replication
