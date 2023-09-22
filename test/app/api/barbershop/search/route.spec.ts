import { GET } from '@/app/api/barbershop/search/route';
import BarberShopModel from '@/app/api/db/BarberShopModel';
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

describe('/api/barbershop/search GET', () => {
	function mockRequest(query: string): Request {
		const url = new URL("https://test/mock")
		url.searchParams.append('query', query)
		const req = new Request(url, { method: "GET" })
		return req
	}

	it('return empty', async () => {
		await BarberShopModel.create({
			name: "강남",
			location: testLocation,
			notice: "notice"
		})
		const req = mockRequest("서울");
		const res = await GET(req);

		expect(res.status).to.equal(200);
		const json = await res.json() as BarberShop[]
		expect(json.length).to.equal(0);
	});

	it('location description search', async () => {
		await BarberShopModel.create({
			name: "바버샵",
			location: {
				description: "서울 중구 을지로18길 15 2층 205호",
				lat: 1,
				lng: 3,
			},
			notice: "notice"
		})
		await BarberShopModel.create({
			name: "test",
			location: testLocation,
			notice: "notice"
		})
		const req = mockRequest("중구");
		const res = await GET(req);

		expect(res.status).to.equal(200);
		const json = await res.json() as BarberShop[]
		expect(json.length).to.equal(1);
		expect(json[0].name).to.equal("바버샵")
	})

	it('name search', async () => {
		await BarberShopModel.create({
			name: "바버샵",
			location: {
				description: "서울 중구 을지로18길 15 2층 205호",
				lat: 1,
				lng: 3,
			},
			notice: "notice"
		})
		await BarberShopModel.create({
			name: "마스터바버샵",
			location: testLocation
		})

		const req = mockRequest("마스터");
		const res = await GET(req);

		expect(res.status).to.equal(200);
		const json = await res.json() as BarberShop[]
		expect(json.length).to.equal(1);
		expect(json[0].name).to.equal("마스터바버샵")
	})
});