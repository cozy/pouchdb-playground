import React from 'react'

import Button from 'cozy-ui/transpiled/react/Button'
import Alerter from 'cozy-ui/transpiled/react/Alerter'

export const ResetDB = ({ handleReset }) => {
  return (
    <div>
      <h3>Reset DB </h3>
      <Button
        theme="danger"
        onClick={handleReset}
        label="Reset DB"
        size="small"
      />
      <Alerter />
    </div>
  )
}

export default ResetDB
