import React, { useState } from 'react'

import Input from 'cozy-ui/transpiled/react/Input'
import Label from 'cozy-ui/transpiled/react/Label'
import Button from 'cozy-ui/transpiled/react/Button'
import Alerter from 'cozy-ui/transpiled/react/Alerter'

import { insertData } from '../queries/queries.js'

export const AddDocs = ({ db }) => {
  const [nDocs, setNDocs] = useState(10)
  const [isBusy, setIsBusy] = useState(false)

  const handleChange = event => {
    setNDocs(event.target.value)
  }

  const handleSubmit = async () => {
    try {
      setIsBusy(true)
      await insertData(db, nDocs)
      console.log('inserted ', nDocs)
      setIsBusy(false)
      Alerter.success(`${nDocs} docs inserted`)
    } catch (err) {
      console.log(err)
      Alerter.error('Something went wrong')
    }
  }

  return (
    <div>
      <h3>Insert new docs </h3>
      <Label htmlFor="form-add-docs"> Number of docs: </Label>
      <Input
        value={nDocs}
        size="tiny"
        onChange={handleChange}
        id="input-add-docs"
      />
      <Button
        type="submit"
        onClick={handleSubmit}
        busy={isBusy}
        label="add"
        size="small"
      />
      <Alerter />
    </div>
  )
}

export default AddDocs
