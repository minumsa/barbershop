import { GET } from '@/app/api/barbershop/route';
import BarberShopModel from '@/app/api/db/BarberShopModel';
import { GetRequest } from '@/app/model/api/barbershop/GET';
import { BarberShop } from '@/app/model/BarberShop';
import { expect } from 'chai';

const testLocation = {
	description: "test",
	lat: 127.00001,
	lng: 89.00292,
}

beforeEach(async () => {
	await BarberShopModel.deleteMany({}).exec()
})

describe('/api/barbershop GET', () => {
	function mockRequest(request?: GetRequest): Request {
		const url = new URL("https://test/mock")
		if (request != null) {
			for (const [key, value] of Object.entries(request)) {
				url.searchParams.append(key, value)
			}
		}
		const req = new Request(url, { method: "GET" })
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
			location: testLocation,
			notice: "notice"
		})
		await BarberShopModel.create({
			name: "바버샵2",
			location: testLocation,
			notice: "notice"
		})
		const req = mockRequest();
		const res = await GET(req);

		expect(res.status).to.equal(200);
		const json = await res.json() as BarberShop[]
		expect(json.length).to.equal(2);
	})

	it('barberCntRange', async () => {
		await BarberShopModel.create({
			name: "1",
			location: testLocation,
			notice: "notice",
			barberList: ["a"]
		})

		await BarberShopModel.create({
			name: "2",
			location: testLocation,
			notice: "notice",
			barberList: ["a", "b"]
		})

		const req = mockRequest({barberCntRangeMin: 2});
		const res = await GET(req);

		expect(res.status).to.equal(200);
		const json = await res.json() as BarberShop[]
		expect(json.length).to.equal(1);
		expect(json[0].name).to.equal("2")
	})

	it('priceRange', async () => {
		await BarberShopModel.create({
			name: "1",
			location: testLocation,
			notice: "notice",
			price: 10000,
		})

		await BarberShopModel.create({
			name: "2",
			location: testLocation,
			notice: "notice",
			price: 20000,
		})

		const req = mockRequest({priceRangeMax: 10000});
		const res = await GET(req);

		expect(res.status).to.equal(200);
		const json = await res.json() as BarberShop[]
		expect(json.length).to.equal(1);
		expect(json[0].name).to.equal("1")
	})
});