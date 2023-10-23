import { S3Client } from '@aws-sdk/client-s3'

export const s3EndPoint = 'https://2f71f9972c83114d8a38c393de092311.r2.cloudflarestorage.com'
export const s3BucketPublicEndpoint = 'https://pub-cd5662f35446487baa480268411c75c9.r2.dev'
export const s3BucketName = "barbershop"

export const s3 = new S3Client({
	region: 'auto',
	endpoint: s3EndPoint,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
	},
})