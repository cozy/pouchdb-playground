import Faker from 'faker'

export const insertData = async (db, nDocs) => {
  let docs = []
  for (let i = 0; i < nDocs; i++) {
    const doc = {
      name: Faker.name.findName(),
      count: i,
      _id: i.toString()
    }
    docs.push(doc)
  }
  await db.bulkDocs(docs)
}

export const getAllData = async (db, { maxDocs, includeDocs }) => {
  console.log('include doc : ', includeDocs)
  const limit = parseInt(maxDocs) || null
  const docs = await db.allDocs({ limit, include_docs: includeDocs })
  return docs.rows
}

export const destroyDB = async db => {
  return db.destroy()
}
