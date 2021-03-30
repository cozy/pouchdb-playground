import React, { useState } from 'react'

import Button from 'cozy-ui/transpiled/react/Button'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Label from 'cozy-ui/transpiled/react/Label'
import Input from 'cozy-ui/transpiled/react/Input'
import Checkbox from 'cozy-ui/transpiled/react/Checkbox'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'

import { getAllData, findData, indexData } from '../queries/queries.js'
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

  const handleSubmit = async (maxDocs, { isFindQuery = false } = {}) => {
    try {
      setIsBusy(true)

      if (isFindQuery) {
        await indexData(db)
      }
      const startTime = startMeasure()
      const docs = isFindQuery
        ? await findData(db, { maxDocs, includeDocs })
        : await getAllData(db, { maxDocs, includeDocs })
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
      <div>
        <h3>Get docs</h3>
        <Checkbox
          label="include_docs"
          onChange={handleIncludeDocsChange}
          checked={includeDocs}
        />
        <Divider />
        <h4>Get all docs</h4>
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
        <h4>Get all docs with limit </h4>
        <Input value={nDocs} size="tiny" onChange={handleNDocsChange} />
        <Button
          id="btn-limit-docs"
          type="submit"
          onClick={() => handleSubmit(nDocs)}
          busy={isBusy}
          label={`Get ${nDocs} docs`}
          size="small"
        />
      </div>
      <div>
        <h4>Find docs with mango</h4>
        <Input value={nDocs} size="tiny" onChange={handleNDocsChange} />
        <Button
          id="btn-limit-find-docs"
          type="submit"
          onClick={() => handleSubmit(nDocs, { isFindQuery: true })}
          busy={isBusy}
          label={`Find ${nDocs} docs`}
          size="small"
        />
      </div>
      <Label>{resultText}</Label>
      <Alerter />
    </div>
  )
}

export default GetDocs
