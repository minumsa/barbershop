import { loadEnvConfig } from '@next/env'
import connectMongoDB, { disconnectMongoDB } from './app/api/db/mongodb'

before(async () => {
	loadEnvConfig(process.env.PWD!)
	await connectMongoDB()
})

after(async () => {
	await disconnectMongoDB()
})
