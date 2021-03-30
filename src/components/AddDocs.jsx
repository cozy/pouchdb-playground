import React, { useState } from 'react'

import Input from 'cozy-ui/transpiled/react/Input'
import Label from 'cozy-ui/transpiled/react/Label'
import Button from 'cozy-ui/transpiled/react/Button'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import SelectBox from 'cozy-ui/transpiled/react/SelectBox'

import { insertData } from '../queries/queries.js'
import { startMeasure, endMeasure } from '../utils'

const docsSizes = [
  { value: 1000, label: 'Very huge docs (1000 fields)' },
  { value: 100, label: 'Huge docs (100 fields)' },
  { value: 50, label: 'Big docs (50 fields)' },
  { value: 10, label: 'Medium docs (10 fields)' },
  { value: 2, label: 'Small docs (2 fields)' }
]

export const AddDocs = ({ db }) => {
  const [nDocs, setNDocs] = useState(1000)
  const [sizeDocs, setSizeDocs] = useState(2)
  const [isBusy, setIsBusy] = useState(false)
  const [resultText, setResultText] = useState('')

  const handleNDocsChange = event => {
    setNDocs(event.target.value)
  }

  const handleSizeDocsChange = event => {
    setSizeDocs(event.value)
  }

  const handleSubmit = async () => {
    try {
      setIsBusy(true)
      const startTime = startMeasure()
      const data = await insertData(db, nDocs, { nFields: sizeDocs })
      const execTime = endMeasure(startTime)
      setIsBusy(false)
      setResultText(`${data.length} docs inserted in ${execTime} ms`)
      Alerter.success(`${nDocs} docs inserted`)
    } catch (err) {
      console.log(err)
      Alerter.error('Something went wrong')
    }
  }

  return (
    <div>
      <h3>Insert new docs </h3>
      <div className="block">
        <Label htmlFor="number-docs" block={false}>
          Number of docs:
        </Label>
        <Input
          value={nDocs}
          size="tiny"
          type="number"
          onChange={handleNDocsChange}
          id="input-add-docs"
        />
      </div>
      <div className="block">
        <Label htmlFor="size-docs" block={false}>
          Number of doc fields:
        </Label>
        <SelectBox options={docsSizes} onChange={handleSizeDocsChange} />
      </div>
      <Button
        type="submit"
        onClick={handleSubmit}
        busy={isBusy}
        label="add"
        size="small"
      />
      <Label>{resultText}</Label>
      <Alerter />
    </div>
  )
}

export default AddDocs
