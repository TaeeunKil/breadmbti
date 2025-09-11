import { useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  Star,
  Navigation as NavigationIcon,
} from "lucide-react";

interface Bakery {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  rating: number;
  description: string;
  specialties: string[];
  position: { x: number; y: number };
}

const bakeries: Bakery[] = [];

export default function BakeryMap() {
  const [selectedBakery, setSelectedBakery] = useState<Bakery | null>(null);

  const handleMarkerClick = (bakery: Bakery) => {
    setSelectedBakery(bakery);
  };

  const closeModal = () => {
    setSelectedBakery(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
            대전 빵집 지도
          </h1>
          <p className="text-gray-600 text-lg">
            대전광역시의 공식 '2025 빵산책 in 대전' 지도입니다.
          </p>
        </div>

        {/* 지도 컨테이너 */}
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="relative">
            {/* 대전 빵산책 지도 이미지 */}
            <div className="w-full relative">
              <img
                src="/assets/2025 빵산책 in 대전 - 지도.webp"
                alt="2025 빵산책 in 대전 지도"
                className="w-full h-auto object-contain"
                style={{ minHeight: "70vh" }}
              />

              {/* 베이커리 마커들 */}
              {bakeries.map((bakery) => (
                <button
                  key={bakery.id}
                  onClick={() => handleMarkerClick(bakery)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{
                    left: `${bakery.position.x}%`,
                    top: `${bakery.position.y}%`,
                  }}
                >
                  <div className="relative">
                    {/* 마커 핀 */}
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200 border-3 border-white">
                      <span className="text-white font-bold text-sm md:text-base">
                        1
                      </span>
                    </div>

                    {/* 호버 시 나타나는 라벨 */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <div className="bg-gray-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                        {bakery.name}
                      </div>
                      <div className="w-2 h-2 bg-gray-800 transform rotate-45 mx-auto -mt-1"></div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 범례 */}
          <div className="p-4 bg-gray-50 border-t">
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">1</span>
                </div>
                <span>베이커리</span>
              </div>
              <div className="text-gray-400">|</div>
              <div className="flex items-center gap-2">
                <NavigationIcon className="w-4 h-4 text-amber-600" />
                <span>마커를 클릭하면 상세 정보를 볼 수 있습니다</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 상세 정보 모달 */}
      {selectedBakery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* 헤더 */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {selectedBakery.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(selectedBakery.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">
                      {selectedBakery.rating}
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* 설명 */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {selectedBakery.description}
              </p>

              {/* 정보 */}
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    {selectedBakery.address}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-700">{selectedBakery.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-700">{selectedBakery.hours}</span>
                </div>
              </div>

              {/* 대표 메뉴 */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">대표 메뉴</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedBakery.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    window.open(`tel:${selectedBakery.phone}`, "_self");
                  }}
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  전화하기
                </button>
                <button
                  onClick={() => {
                    window.open(
                      `https://map.naver.com/v5/search/${encodeURIComponent(
                        selectedBakery.address
                      )}`,
                      "_blank"
                    );
                  }}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <NavigationIcon className="w-4 h-4" />
                  길찾기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
