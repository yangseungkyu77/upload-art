// Upload.jsx
import { useState } from "react";
import axios from "axios";
import bannerImg from "../assets/banner.png";

function Upload() {
  const [name, setName] = useState(() => localStorage.getItem("username") || "");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [successList, setSuccessList] = useState([]);
  const [failList, setFailList] = useState([]);

  const handleUpload = async () => {
    if (!name || images.length === 0) {
      alert("이름과 이미지를 모두 입력해주세요.");
      return;
    }

    localStorage.setItem("username", name);

    const formData = new FormData();
    formData.append("name", name);
    for (const image of images) {
      formData.append("images", image);
    }

    setUploading(true);
    try {
      const res = await axios.post(
        "https://upload-art-backend.onrender.com/api/upload",
        formData
      );

      if (res.data.success) {
        setUploaded(true);
        setSuccessList(res.data.successList || []);
        setFailList(res.data.failList || []);
        setImages([]);
        document.getElementById("fileInput").value = null;
      } else {
        alert("업로드 실패");
      }
    } catch (err) {
      console.error("❌ 업로드 실패:", err);
      alert("서버 에러로 업로드 실패");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <img src={bannerImg} alt="배너 이미지" className="w-full rounded mb-6" />
        <h1 className="text-2xl font-bold mb-4 text-center">그림 업로드</h1>

        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded"
        />

        <input
          id="fileInput"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages([...e.target.files])}
          className="w-full mb-4"
        />

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {uploading ? "업로드 중..." : "업로드"}
        </button>

        {uploaded && (
          <div className="mt-4 space-y-2">
            {successList.length > 0 && (
              <div>
                <p className="text-green-600 font-semibold">✅ 성공한 파일:</p>
                <ul className="text-sm list-disc pl-5 text-green-700">
                  {successList.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
            )}
            {failList.length > 0 && (
              <div>
                <p className="text-red-600 font-semibold mt-2">❌ 실패한 파일:</p>
                <ul className="text-sm list-disc pl-5 text-red-700">
                  {failList.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;
