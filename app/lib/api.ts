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
