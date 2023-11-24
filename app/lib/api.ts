import { BarberShop, barberType, priceType } from "./data";

interface fetchDataProps {
  itemsPerPage: number;
  currentPage: number;
  barber: barberType;
  price: priceType;
}

export async function fetchData({ itemsPerPage, currentPage, barber, price }: fetchDataProps) {
  try {
    const queryString = `?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}&barber=${barber}&price=${price}`;
    const url = `/api/barbershop${queryString}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get barbershop data");
    }

    let data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function searchData(keyword: string) {
  try {
    const response = await fetch(`/api/barbershop/search?query=${keyword}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get barbershop data");
    }

    let data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchForEdit(id: string) {
  try {
    const response = await fetch(`/api/barbershop/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get barbershop data");
    }

    let data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function uploadData(barbershopData: BarberShop, password: string) {
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
        alert("데이터가 성공적으로 업로드되었습니다.");
      }

      const data = await response.json();
      console.log(data.message);
      return data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }
}

export const uploadImage = async (file: File, id: string, password: string) => {
  if (file !== null) {
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("password", password);
      const response = await fetch(`/api/barbershop/${id}/image`, {
        method: "PUT",
        body: formData,
      });

      if (response.status === 401) {
        alert("관리자 비밀번호가 틀렸습니다.");
      } else if (response.status === 404) {
        alert("존재하지 않는 데이터입니다.");
      } else if (!response.ok) {
        throw new Error("데이터 수정에 실패했습니다.");
      } else {
        alert("이미지가 성공적으로 업로드되었습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  }
};

export const deleteData = async (id: string, password: string) => {
  try {
    const response = await fetch(`/api/barbershop/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, password: password }),
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

export const editData = async (data: Partial<BarberShop>, id: string, password: string) => {
  if (data !== null) {
    try {
      const response = await fetch(`/api/barbershop/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, password: password }),
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
