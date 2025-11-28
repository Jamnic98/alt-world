import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI as string
let client
let clientPromise: Promise<MongoClient>

if (!process.env.MONGODB_URI) {
  throw new Error('Add MONGODB_URI to your .env')
}

if (process.env.NODE_ENV === 'development') {
  // reuse connection during dev hot reloads
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri)
    ;(global as any)._mongoClientPromise = client.connect()
  }
  clientPromise = (global as any)._mongoClientPromise
} else {
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

export default clientPromise
