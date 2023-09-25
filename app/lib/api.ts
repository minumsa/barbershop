import { IBarberShop } from "./data";

export async function fetchData() {
  try {
    const response = await fetch("/api/barbershop", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to upload barbershop data");
    }

    let data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchModifyData(pathName: string) {
  try {
    const response = await fetch("/api/barbershop", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to upload barbershop data");
    }

    let data = await response.json();

    console.log("pathName", pathName);

    if (!pathName.includes("upload")) {
      const selectedData = data.filter((barbershop: IBarberShop) =>
        pathName.includes(decodeURIComponent(barbershop.name))
      )[0];

      return selectedData;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function uploadData(barbershopData: IBarberShop, password: string) {
  if (barbershopData !== null) {
    try {
      const response = await fetch("/api/barbershop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...barbershopData,
          password,
        }),
      });

      if (response.status === 401) {
        alert("관리자 비밀번호가 틀렸습니다.");
      } else if (response.status === 409) {
        alert("이미 존재하는 데이터입니다.");
      } else if (!response.ok) {
        throw new Error("데이터 업로드에 실패했습니다.");
      } else {
        alert("데이터가 성공적으로 저장되었습니다.");
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error: ", error);
    }
  }
}

export const deleteData = async (name: string, password: string) => {
  try {
    const response = await fetch("/api/barbershop", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, password: password }),
    });

    if (response.status === 401) {
      alert("관리자 비밀번호가 틀렸습니다.");
    } else if (response.status === 404) {
      alert("존재하지 않는 데이터입니다.");
    } else if (!response.ok) {
      throw new Error("Failed to upload barbershop data");
    } else {
      alert("데이터가 성공적으로 삭제되었습니다.");
    }
  } catch (error) {
    console.error(error);
  }
};

export const modifyData = async (data: Partial<IBarberShop>, password: string) => {
  if (data !== null) {
    try {
      const response = await fetch("/api/barbershop", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: data, password: password }),
      });

      if (response.status === 401) {
        alert("관리자 비밀번호가 틀렸습니다.");
      } else if (response.status === 404) {
        alert("존재하지 않는 데이터입니다.");
      } else if (!response.ok) {
        throw new Error("데이터 수정에 실패했습니다.");
      } else {
        alert("데이터가 성공적으로 수정되었습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  }
};
