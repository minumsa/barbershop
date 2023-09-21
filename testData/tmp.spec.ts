import BarberShopModel from "@/app/api/db/BarberShopModel"

describe('add tmp data to db', () => {
	it('data', async () => {
		await BarberShopModel.deleteMany({}).exec()
		await BarberShopModel.create({
			name: "하프바버샵",
			barberList: ["학도"],
			location: {
				description: "서울 중구 을지로18길 15 2층 205호",
				lat: 37.56571603771177,
				lng: 126.99485276474563,
			},
			operatingTime: "11:00 - 20:00",
			closedDays: "매주 일요일",
			contact: "0507-1329-2972",
			description:
				"을지로 3가와 4가 사이 인쇄 골목에 위치한 1인 바버샵입니다. 한 분 한 분 최선을 다하겠습니다.",
			price: 36000,
			imgUrl: "/harf1.jpeg",
			barbershopUrl: "https://www.instagram.com/hakdo__/",
			reservationUrl:
				"https://map.naver.com/p/search/%ED%95%98%ED%94%84%EB%B0%94%EB%B2%84%EC%83%B5/place/1082548337?c=15.00,0,0,0,dh&placePath=%2Fbooking%3FbookingRedirectUrl%3Dhttps%25253A%25252F%25252Fpcmap.place.naver.com%25252Fhairshop%25252F1082548337%25252Fstylist%25253Ftheme%25253Dplace%252526service-target%25253Dmap-pc%252526entry%25253Dbmp",
		})
		await BarberShopModel.create({
			name: "마스터바버샵",
			barberList: ["JUNG"],
			location: {
				description: "서울 종로구 인사동5길 29 태화빌딩 지하1층 7호",
				lat: 37.57195303752545,
				lng: 126.98481224041323,
			},
			operatingTime: "10:00 - 20:00",
			closedDays: "매주 일요일",
			contact: "0507-1343-3926",
			description:
				"마스터바버샵을 찾아주셔서 감사드립니다. 문의는 전화 및 네이버 톡톡으로 주시기 바랍니다. 시술 중에는 전화 연결이 어려울 수 있으니 양해 부탁드립니다.",
			price: 40000,
			imgUrl: "/master1.jpeg",
			barbershopUrl: "https://blog.naver.com/charlesbarbershop_th",
			reservationUrl:
				"https://pcmap.place.naver.com/hairshop/17922754/booking?from=map&fromPanelNum=1&x=126.9848489&y=37.5719999&timestamp=202309191504",
		})
	})
})
