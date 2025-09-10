import { useState } from 'react';
import { MapPin, Clock, Phone, Star, Navigation as NavigationIcon } from 'lucide-react';

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

const bakeries: Bakery[] = [
  {
    id: 'sungsimdang-main',
    name: '성심당 본점',
    address: '대전 중구 은행동 145-1',
    phone: '042-253-6402',
    hours: '07:00 - 22:00',
    rating: 4.8,
    description: '1956년 창업한 대전의 대표 베이커리. 튀김소보로의 원조이자 대전 시민들의 사랑을 받는 명소입니다.',
    specialties: ['튀김소보로', '월넛브레드', '초코튀소', '보문산메아리'],
    position: { x: 52, y: 58 }
  }
];

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
            대전의 맛있는 빵집들을 찾아보세요
          </p>
        </div>

        {/* 지도 컨테이너 */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="relative">
            {/* 대전 지역 지도 배경 */}
            <div 
              className="w-full h-96 md:h-[500px] lg:h-[600px] bg-gradient-to-br from-amber-100 to-orange-100 relative overflow-hidden"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 30% 20%, rgba(251, 191, 36, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 70% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.05) 0%, transparent 70%)
                `
              }}
            >
              {/* 대전 지역 윤곽 */}
              <svg 
                className="absolute inset-0 w-full h-full" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="xMidYMid meet"
              >
                {/* 대전 전체 윤곽 */}
                <path
                  d="M15,25 Q20,15 30,18 L40,12 Q50,8 60,15 L70,20 Q80,25 85,35 L88,45 Q90,55 85,65 L80,75 Q75,85 65,88 L50,90 Q35,92 25,88 L15,82 Q8,75 10,65 L12,55 Q10,45 12,35 L15,25 Z"
                  fill="rgba(251, 191, 36, 0.2)"
                  stroke="rgba(251, 191, 36, 0.4)"
                  strokeWidth="0.5"
                />
                
                {/* 유성구 영역 */}
                <path
                  d="M15,25 Q20,15 30,18 L35,25 Q40,30 35,40 L30,50 Q25,60 20,65 L15,70 Q10,60 12,50 L15,40 Q12,35 15,25 Z"
                  fill="rgba(251, 191, 36, 0.1)"
                  stroke="rgba(249, 115, 22, 0.2)"
                  strokeWidth="0.3"
                />
                
                {/* 대덕구 영역 */}
                <path
                  d="M40,12 Q50,8 60,15 L70,20 Q75,25 70,35 L65,45 Q60,50 55,45 L50,40 Q45,35 40,30 L35,25 Q38,18 40,12 Z"
                  fill="rgba(251, 191, 36, 0.1)"
                  stroke="rgba(249, 115, 22, 0.2)"
                  strokeWidth="0.3"
                />
                
                {/* 동구 영역 */}
                <path
                  d="M70,20 Q80,25 85,35 L88,45 Q85,55 80,60 L75,65 Q70,60 65,55 L60,50 Q65,45 70,35 Q75,25 70,20 Z"
                  fill="rgba(251, 191, 36, 0.1)"
                  stroke="rgba(249, 115, 22, 0.2)"
                  strokeWidth="0.3"
                />
                
                {/* 중구 영역 */}
                <path
                  d="M35,40 Q40,35 50,40 L60,45 Q65,50 60,60 L55,70 Q50,75 45,70 L35,65 Q30,60 35,50 L35,40 Z"
                  fill="rgba(251, 191, 36, 0.15)"
                  stroke="rgba(249, 115, 22, 0.3)"
                  strokeWidth="0.4"
                />
                
                {/* 서구 영역 */}
                <path
                  d="M20,65 Q25,60 35,65 L45,70 Q50,75 45,85 L35,88 Q25,88 20,82 L15,75 Q12,70 15,65 L20,65 Z"
                  fill="rgba(251, 191, 36, 0.1)"
                  stroke="rgba(249, 115, 22, 0.2)"
                  strokeWidth="0.3"
                />
              </svg>

              {/* 구별 라벨들 - 실제 위치에 맞게 배치 */}
              <div className="absolute top-6 left-6 text-xs md:text-sm font-semibold text-amber-700 bg-white/90 px-2 py-1 rounded shadow-sm">
                유성구
              </div>
              <div className="absolute top-4 right-6 text-xs md:text-sm font-semibold text-amber-700 bg-white/90 px-2 py-1 rounded shadow-sm">
                대덕구
              </div>
              <div className="absolute top-6 right-16 text-xs md:text-sm font-semibold text-amber-700 bg-white/90 px-2 py-1 rounded shadow-sm">
                동구
              </div>
              <div className="absolute bottom-12 left-8 text-xs md:text-sm font-semibold text-amber-700 bg-white/90 px-2 py-1 rounded shadow-sm">
                서구
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm md:text-base font-bold text-amber-800 bg-white/95 px-3 py-2 rounded-lg shadow-lg border border-amber-200">
                중구
              </div>

              {/* 베이커리 마커들 */}
              {bakeries.map((bakery) => (
                <button
                  key={bakery.id}
                  onClick={() => handleMarkerClick(bakery)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{
                    left: `${bakery.position.x}%`,
                    top: `${bakery.position.y}%`
                  }}
                >
                  <div className="relative">
                    {/* 마커 핀 */}
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200 border-3 border-white">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 text-white" />
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
                <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-2 h-2 text-white" />
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
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
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
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                  <span className="text-gray-700">{selectedBakery.address}</span>
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
                    window.open(`tel:${selectedBakery.phone}`, '_self');
                  }}
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  전화하기
                </button>
                <button
                  onClick={() => {
                    window.open(`https://map.naver.com/v5/search/${encodeURIComponent(selectedBakery.address)}`, '_blank');
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