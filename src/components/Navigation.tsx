import { useState } from "react";
import { MapPin, Cake, Shuffle, Menu, X } from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Navigation({
  currentPage,
  onPageChange,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: "mbti", label: "빵 MBTI", icon: Cake },
    { id: "map", label: "빵집 지도", icon: MapPin },
    { id: "random", label: "오늘의 빵 담당자", icon: Shuffle },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <div className="flex items-center">
            <img
              src="/assets/튀김소보로.webp"
              alt="성심당"
              className="h-10 w-10 object-contain"
            />
            <span className="ml-2 text-xl font-bold text-amber-800">
              대전 빵산책
            </span>
          </div>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onPageChange(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
                      currentPage === item.id
                        ? "bg-amber-100 text-amber-800"
                        : "text-gray-600 hover:text-amber-800 hover:bg-amber-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-amber-800 p-2"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onPageChange(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 transition-all duration-200 ${
                      currentPage === item.id
                        ? "bg-amber-100 text-amber-800"
                        : "text-gray-600 hover:text-amber-800 hover:bg-amber-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
