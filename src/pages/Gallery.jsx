import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Gallery() {
  const { username } = useParams();
  const [images, setImages] = useState([]);
  const [folderLink, setFolderLink] = useState(""); // ✅ 추가
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`https://upload-art-backend.onrender.com/api/gallery/${username}`);
        if (res.data.success) {
          setImages(res.data.urls || []);
          setFolderLink(res.data.folderLink || ""); // ✅ 폴더 링크 세팅
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
                className="rounded shadow"
                loading="lazy"
              />
            ))}
          </div>
        )}

        {!loading && images.length === 0 && !error && (
          <p className="text-center text-gray-400">업로드된 그림이 없습니다.</p>
        )}

        {/* ✅ 폴더 바로가기 링크 표시 */}
        {folderLink && (
          <div className="text-center mt-6">
            <a
              href={folderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              📂 구글 드라이브 폴더 열기
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;
