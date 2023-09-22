# API 설명

## 일반적 API 들

**바버샵 리스트 가져오기**
----
  몇가지 핕러링을 한 바버샵 리스트를 가져오는 api 입니다.

* **URL**

  /api/barbershop

* **Method:**

  `GET`

*  **URL Params**

   **Optional:**
   `priceRangeMin=[number]`
   `priceRangeMax=[number]`

      가격의 범위 필터링. 존재하지 않으면 해당 내용으로 필터링을 하지 않는다. 둘 중 하나만 존재해도 작동한다.

   `barberCntRangeMin=[number]`
   `barberCntRangeMax=[number]`

      바버수의 범위 필터링. 존재하지 않으면 해당 내용으로 필터링을 하지 않는다. 둘 중 하나만 존재해도 작동한다.

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
      Barbershop[]
      예시 :
      ```
      [
        {
          "location": {
            "description": "서울 중구 을지로18길 15 2층 205호",
            "lat": 37.56571603771177,
            "lng": 126.99485276474563
          },
          "name": "하프바버샵",
          "description": "을지로 3가와 4가 사이 인쇄 골목에 위치한 1인 바버샵입니다. 한 분 한 분 최선을 다하겠습니다.",
          "contact": "0507-1329-2972",
          "barbershopUrl": "https://www.instagram.com/hakdo__/",
          "price": 36000,
          "barberList": [
            "학도"
          ],
          "operatingTime": "11:00 - 20:00",
          "closedDays": "매주 일요일",
          "reservationUrl": "https://map.naver.com/p/search/%ED%95%98%ED%94%84%EB%B0%94%EB%B2%84%EC%83%B5/place/1082548337?c=15.00,0,0,0,dh&placePath=%2Fbooking%3FbookingRedirectUrl%3Dhttps%25253A%25252F%25252Fpcmap.place.naver.com%25252Fhairshop%25252F1082548337%25252Fstylist%25253Ftheme%25253Dplace%252526service-target%25253Dmap-pc%252526entry%25253Dbmp",
          "id": "65093eacdd27b311a5313f20"
        }
      ]
      ```

**바버샵 검색**
----
  바버샵 검색 api 입니다. 주소나 이름에 검색어가 들어간 바버샵들을 모두 내려줍니다.

* **URL**

  /api/barbershop/search

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `query=[string]`

     검색어

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
      Barbershop[]

**바버샵 id로 fetch**
----
  id 를 가지고 바버샵 정보를 가져옵니다.

* **URL**

  /api/barbershop/:id

* **Method:**

  `GET`

*  **URL Path Params**

   **Required:**

   `id=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
      Barbershop

* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ message : "Data not found" }`


## 어드민 api 들

**바버샵 생성**
----
  바버샵 하나를 생성합니다.
* **URL**

  /api/barbershop

* **Method:**
  
  `POST`

* **Data Params**
  바버샵 정보 + password. type 정보로는 다음과 같다.
  ```
  {
    name: string,
    location: {
      description: string,
      lat: number,
      lng: number,
    },
    description?: string,
    contact?: string,
    barbershopUrl?: string,
    notice?: string,
    price?: number,
    barberList?: string[],
    operatingTime?: string,
    closedDays?: string,
    reservationUrl?: string,
    imgUrl?: string,
    locationUrl?: string,
    password: string,
  }
  ```

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:**
      Barbershop
 
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{ error : "password is not correct" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ error : "Server Error" }`
    
    내용을 잘못 넣었을 때

**바버샵 수정**
----
  바버샵 내용을 수정합니다.
* **URL**

  /api/barbershop/:id

* **Method:**
  
  `PUT`

*  **URL Path Params**

   **Required:**

   `id=[string]`

* **Data Params**
  수정하고 싶은 정보들 + password. type 정보로는 다음과 같다.
  ```
  {
    name?: string,
    location?: {
      description: string,
      lat: number,
      lng: number,
    },
    description?: string,
    contact?: string,
    barbershopUrl?: string,
    notice?: string,
    price?: number,
    barberList?: string[],
    operatingTime?: string,
    closedDays?: string,
    reservationUrl?: string,
    imgUrl?: string,
    locationUrl?: string,
    password: string,
  }
  ```

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:**
      Barbershop
 
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{ error : "password is not correct" }`

  OR

  * **Code:** 404 <br />
    **Content:** `{ message : "Data not found" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ error : "Server Error" }`
    
    내용을 잘못 넣었을 때

**바버샵 삭제**
----
  바버샵을 삭제합니다.
* **URL**

  /api/barbershop/:id

* **Method:**
  
  `DELETE`

*  **URL Path Params**

   **Required:**

   `id=[string]`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** empty
 
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{ error : "password is not correct" }`

  OR

  * **Code:** 404 <br />
    **Content:** `{ message : "Data not found" }`

    
