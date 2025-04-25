import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Gallery() {
  const { username } = useParams();
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`https://upload-art-backend.onrender.com/api/gallery/${username}`);
        if (res.data.success) {
          setImages(res.data.urls); // ✅ string[]으로 받기
        } else {
          setError(res.data.message || "갤러리를 불러오지 못했습니다.");
        }
      } catch (err) {
        console.error("❌ 갤러리 에러:", err);
        setError("서버 오류로 인해 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [username]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold text-center mb-4">{username}님의 그림</h1>

        {loading && <p className="text-center text-gray-500">불러오는 중...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && !error && images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
            {images.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`img-${i}`}
                className="rounded shadow cursor-pointer object-cover h-24 w-full"
                loading="lazy"
                onClick={() => setSelectedImage(url)}
              />
            ))}
          </div>
        )}

        {!loading && images.length === 0 && !error && (
          <p className="text-center text-gray-400">업로드된 그림이 없습니다.</p>
        )}
      </div>

      {/* ✅ 전체 이미지 보기 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} alt="Full" className="max-w-full max-h-full rounded" />
          <button
            className="absolute top-4 right-4 text-white text-2xl font-bold"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default Gallery;
