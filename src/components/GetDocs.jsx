import React, { useState } from 'react'

import Button from 'cozy-ui/transpiled/react/Button'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Label from 'cozy-ui/transpiled/react/Label'
import Input from 'cozy-ui/transpiled/react/Input'
import Checkbox from 'cozy-ui/transpiled/react/Checkbox'

import { getAllData } from '../queries/queries.js'
import { startMeasure, endMeasure } from '../utils'

export const GetDocs = ({ db }) => {
  const [isBusy, setIsBusy] = useState(false)
  const [resultText, setResultText] = useState('')
  const [nDocs, setNDocs] = useState(1000)
  const [includeDocs, setIncludeDocs] = useState(true)

  const handleNDocsChange = event => {
    setNDocs(event.target.value)
  }

  const handleIncludeDocsChange = event => {
    setIncludeDocs(event.target.checked)
  }

  const handleSubmit = async maxDocs => {
    try {
      setIsBusy(true)
      const startTime = startMeasure()
      const docs = await getAllData(db, { maxDocs, includeDocs })
      const execTime = endMeasure(startTime)

      setIsBusy(false)
      Alerter.success(`${docs.length} docs retrieved`)
      setResultText(`${docs.length} docs retrieved in ${execTime} ms`)
    } catch (err) {
      console.log(err)
      Alerter.error('Something went wrong')
    }
  }

  return (
    <div>
      <Checkbox
        label="include_docs"
        onChange={handleIncludeDocsChange}
        checked={includeDocs}
      />
      <div>
        <h3>Get all docs </h3>
        <Button
          id="btn-all-docs"
          type="submit"
          onClick={() => handleSubmit(null)}
          busy={isBusy}
          label="Query all docs"
          size="small"
        />
      </div>
      <div>
        <h3>Get some docs </h3>
        <Input value={nDocs} size="tiny" onChange={handleNDocsChange} />
        <Button
          id="btn-limit-docs"
          type="submit"
          onClick={() => handleSubmit(nDocs)}
          busy={isBusy}
          label={`Query ${nDocs} docs`}
          size="small"
        />
      </div>
      <Label>{resultText}</Label>
      <Alerter />
    </div>
  )
}

export default GetDocs
