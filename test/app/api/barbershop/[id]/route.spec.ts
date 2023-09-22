import { GET, PUT, DELETE } from '@/app/api/barbershop/[id]/route';
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

describe('/api/barbershop/[id] GET', () => {

  function mockRequest(): Request {
    const url = new URL("https://test/mock")
    const req = new Request(url, { method: "GET" })
    return req
  }

  it('wrong id', async () => {
    const req = mockRequest();
    const res = await GET(req, { params: { id: "a" } });

    expect(res.status).to.equal(404);
  });

  it('normal api', async () => {
    const newBarbershop = await BarberShopModel.create({
      name: "1",
      location: testLocation,
    })

    const req = mockRequest();
    const res = await GET(req, { params: { id: newBarbershop.id } });

    expect(res.status).to.equal(200);
    const json = await res.json() as BarberShop
    expect(json.name).to.equal("1")
  })
});

describe('/api/barbershop/[id] PUT', () => {
  function mockRequest(body: object): Request {
    const url = new URL("https://test/mock")
    const req = new Request(url, { method: "PUT", body: JSON.stringify(body) })
    return req
  }

  it('wrong password', async () => {
    const req = mockRequest({ password: "wrong_password", });
    const res = await PUT(req, { params: { id: "a" } });

    expect(res.status).to.equal(401);
  })

  it('wrong id', async () => {
    const req = mockRequest({ password: process.env.UPLOAD_PASSWORD, });
    const res = await PUT(req, { params: { id: "a" } });

    expect(res.status).to.equal(404);
  });

  it('normal usage', async () => {
    const newBarbershop = await BarberShopModel.create({
      name: "1",
      location: testLocation,
    })

    const req = mockRequest({
      name: "new",
      location: {
        description: "ll",
        lat: 11.1,
        lng: 22.2,
      },
      imgUrl: "test",
      password: process.env.UPLOAD_PASSWORD,
    });
    const res = await PUT(req, { params: { id: newBarbershop.id } });

    expect(res.status).to.equal(200);
    const json = await res.json() as BarberShop
    expect(json.name).to.equal("new")
    expect(json.imgUrl).to.equal("test")
    expect(json.location.description).to.equal("ll")
    expect(json.location.lat).to.equal(11.1)
    expect(json.location.lng).to.equal(22.2)
  })

  it('ignore unknown properties', async () => {
    const newBarbershop = await BarberShopModel.create({
      name: "1",
      location: testLocation,
      imgUrl: "urlurl"
    })

    const req = mockRequest({
      name: "new",
      asdf: "asdf",
      location: {
        tttt: "tttt"
      },
      password: process.env.UPLOAD_PASSWORD,
    });
    const res = await PUT(req, { params: { id: newBarbershop.id } });

    expect(res.status).to.equal(200);
    const json = await res.json()
    expect(json.name).to.equal("new")
    expect(json.imgUrl).to.equal("urlurl")
    expect(json.asdf).to.undefined
    // location 이 모르는 구조로 되어있기에 완전히 무시해버린다.
    expect(json.location).to.undefined
  })
});

describe('/api/barbershop/[id] DELETE', () => {
  function mockRequest(body: object): Request {
    const url = new URL("https://test/mock")
    const req = new Request(url, { method: "DELETE", body: JSON.stringify(body) })
    return req
  }

  it('wrong password', async () => {
    const req = mockRequest({ password: "wrong_password" });
    const res = await DELETE(req, { params: { id: "a" } });

    expect(res.status).to.equal(401);
  })

  it('wrong id', async () => {
    const req = mockRequest({ password: process.env.UPLOAD_PASSWORD });
    const res = await DELETE(req, { params: { id: "a" } });

    expect(res.status).to.equal(404);
  });

  it('normal usage', async () => {
    const shop1 = await BarberShopModel.create({
      name: "1",
      location: testLocation,
    })
    const shop2 = await BarberShopModel.create({
      name: "2",
      location: testLocation,
    })

    const req = mockRequest({
      password: process.env.UPLOAD_PASSWORD,
    });
    const res = await DELETE(req, { params: { id: shop1.id } });

    expect(res.status).to.equal(200);

    const list = await BarberShopModel.find({}).exec()
    expect(list.length).to.equal(1)
    expect(list[0].name).to.equal("2")
  })
});