import { createMocks, createRequest, RequestMethod } from 'node-mocks-http';
import { expect } from 'chai'
import { GET } from '@/app/api/barbershop/route'
import BarberShopModel from '@/app/api/db/BarberShopModel';
import { BarberShop } from '@/app/model/BarberShop';

beforeEach(async () => {
	await BarberShopModel.deleteMany({}).exec()
})

describe('/api/barbershop endpoints', () => {
	function mockRequest(method: RequestMethod = 'GET') : Request {
		const url = new URL("https://ocalhost:3000/mock")
		const req = new Request(url, {method})
		return req
	}

	it('return empty', async () => {
		const req = mockRequest();
		const res = await GET(req);

		expect(res.status).to.equal(200);
		const json = await res.json() as BarberShop[]
		expect(json.length).to.equal(0);
	});

	it('return all', async () => {
		await BarberShopModel.create({
			name: "바버샵",
			location: {
				description: "test",
				lat: 127.00001,
				lng: 89.00292,
			},
			notice: "notice"
		})
		await BarberShopModel.create({
			name: "바버샵2",
			location: {
				description: "test",
				lat: 127.00001,
				lng: 89.00292,
			},
			notice: "notice"
		})
		const req = mockRequest();
		const res = await GET(req);

		expect(res.status).to.equal(200);
		const json = await res.json() as BarberShop[]
		expect(json.length).to.equal(2);
	})
});