"use client";

import { useState } from "react";

export const UploadImage = async (file: File, id: string, password: string) => {
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
        alert("데이터가 성공적으로 수정되었습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  }
};

export default function Page() {
  const [file, setFile] = useState<File | undefined>();
  const [password, setPassword] = useState<string>("");

  const uploadImage = async () => {
    if (file == null) {
      alert("no file");
      return;
    }
    const id = "650d454b013cb30a2a3e5108"; // 개발 DB 의 클래씨 바버샵의 id.
    await UploadImage(file, id, password);
  };
  return (
    <>
      <input type="file" onChange={(e) => setFile(e.target.files![0])} />
      <br/>
      password: 
      <br/>
      <input type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={uploadImage}>Upload</button>
    </>
  );
}
