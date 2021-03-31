import Faker from 'faker'

const COUCH_URL = 'http://localhost:5984'
export const REPLICATE_TO = 'replicate-to'
export const REPLICATE_FROM = 'replicate-from'

export const insertData = async (db, nDocs, { nFields = 2 }) => {
  let docs = []
  for (let i = 0; i < nDocs; i++) {
    const doc = {
      name: Faker.name.findName(),
      count: i
    }
    for (let j = 2; j < nFields; j++) {
      doc[j] = Faker.datatype.datetime().toISOString()
    }
    docs.push(doc)
  }
  return db.bulkDocs(docs)
}

export const getAllData = async (db, { maxDocs, includeDocs }) => {
  const limit = parseInt(maxDocs) || null
  const docs = await db.allDocs({ limit, include_docs: includeDocs })
  return docs.rows
}

export const indexData = async db => {
  return db.createIndex({
    index: { fields: ['count'] }
  })
}

export const findData = async (db, { maxDocs, includeDocs }) => {
  const limit = parseInt(maxDocs) || null
  const selector = {
    count: {
      $lt: limit
    }
  }
  const docs = await db.find({ selector, limit, include_docs: includeDocs })
  return docs.docs
}

export const destroyDB = async db => {
  return db.destroy()
}

export const replicate = async (db, remoteDbName, replicationMode) => {
  const url = `${COUCH_URL}/${remoteDbName}`
  if (replicationMode === REPLICATE_FROM) {
    return db.replicate.from(url)
  } else if (replicationMode === REPLICATE_TO) {
    return db.replicate.to(url)
  }
}
