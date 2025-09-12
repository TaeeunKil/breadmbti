import { useState } from "react";
import {
  User,
  ExternalLink,
  RotateCcw,
  Gamepad2,
  Plus,
  X,
  Disc,
} from "lucide-react";

export default function RandomPicker() {
  const [showOriginal, setShowOriginal] = useState(false);
  const [showSimple, setShowSimple] = useState(false);

  // 간단한 룰렛 상태
  const [names, setNames] = useState<string[]>(["나"]);
  const [inputName, setInputName] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState("");

  const colors = [
    "#ef4444",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
  ];

  // 간단한 룰렛 함수들
  const addName = () => {
    if (inputName.trim() && !names.includes(inputName.trim())) {
      setNames([...names, inputName.trim()]);
      setInputName("");
    }
  };

  const removeName = (nameToRemove: string) => {
    setNames(names.filter((name) => name !== nameToRemove));
    if (winner === nameToRemove) {
      setWinner("");
    }
  };

  const startSpin = () => {
    if (names.length === 0 || isSpinning) return;

    setIsSpinning(true);
    setWinner("");

    // 룰렛 회전 (3~7바퀴 + 랜덤 각도)
    const fullRotations = Math.floor(Math.random() * 5) + 3;
    const randomAngle = Math.random() * 360;
    const finalRotation = fullRotations * 360 + randomAngle;

    setRotation((prev) => prev + finalRotation);

    // 3초 후 결과 계산
    setTimeout(() => {
      const sectorAngle = 360 / names.length;
      const normalizedAngle = (360 - (randomAngle % 360)) % 360;
      const winnerIndex = Math.floor(normalizedAngle / sectorAngle);
      const resultWinner = names[winnerIndex];

      setWinner(resultWinner);
      setIsSpinning(false);
    }, 3000);
  };

  const resetSimple = () => {
    setWinner("");
    setIsSpinning(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addName();
    }
  };

  if (showSimple) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
              간단한 룰렛
            </h1>
            <p className="text-gray-600 text-lg mb-4">
              원판 돌림판으로 간단하게 결정해요! 🎯
            </p>
            <button
              onClick={() => setShowSimple(false)}
              className="mb-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-200 flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-4 h-4" />
              룰렛 선택으로 돌아가기
            </button>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* 룰렛 게임 섹션 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center mb-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  원판 돌림판
                </h2>
                <p className="text-gray-600">
                  룰렛을 돌려서 당첨자를 정해보세요!
                </p>
              </div>

              {/* SVG 룰렛 휠 */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="bg-gray-100 rounded-full p-2 shadow-xl">
                    <svg
                      width="600"
                      height="600"
                      viewBox="0 0 600 600"
                      className="rounded-full"
                    >
                      {names.length > 0 ? (
                        names.length === 1 ? (
                          // 하나일 때는 전체 원으로 그리기
                          <g
                            style={{
                              transform: `rotate(${rotation}deg)`,
                              transformOrigin: "300px 300px",
                              transition: isSpinning
                                ? "transform 3s ease-out"
                                : "none",
                            }}
                          >
                            <circle
                              cx="300"
                              cy="300"
                              r="270"
                              fill={colors[0]}
                              stroke="#ffffff"
                              strokeWidth="6"
                              opacity="0.9"
                            />
                            <text
                              x="300"
                              y="195"
                              textAnchor="middle"
                              dominantBaseline="central"
                              fill="#ffffff"
                              fontSize="45"
                              fontWeight="bold"
                              stroke="#000000"
                              strokeWidth="1.5"
                            >
                              {names[0]}
                            </text>
                          </g>
                        ) : (
                          names.map((name, index) => {
                            const angle = (360 / names.length) * index;
                            const nextAngle =
                              (360 / names.length) * (index + 1);
                            const color = colors[index % colors.length];

                            const startAngleRad = (angle * Math.PI) / 180;
                            const endAngleRad = (nextAngle * Math.PI) / 180;
                            const x1 = 300 + 270 * Math.cos(startAngleRad);
                            const y1 = 300 + 270 * Math.sin(startAngleRad);
                            const x2 = 300 + 270 * Math.cos(endAngleRad);
                            const y2 = 300 + 270 * Math.sin(endAngleRad);

                            const largeArcFlag =
                              nextAngle - angle > 180 ? 1 : 0;

                            return (
                              <g
                                key={index}
                                style={{
                                  transform: `rotate(${rotation}deg)`,
                                  transformOrigin: "300px 300px",
                                  transition: isSpinning
                                    ? "transform 3s ease-out"
                                    : "none",
                                }}
                              >
                                <path
                                  d={`M 300 300 L ${x1} ${y1} A 270 270 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                                  fill={color}
                                  stroke="#ffffff"
                                  strokeWidth="6"
                                  opacity="0.9"
                                />
                                <text
                                  x={
                                    300 +
                                    165 *
                                      Math.cos(
                                        (startAngleRad + endAngleRad) / 2
                                      )
                                  }
                                  y={
                                    300 +
                                    165 *
                                      Math.sin(
                                        (startAngleRad + endAngleRad) / 2
                                      )
                                  }
                                  textAnchor="middle"
                                  dominantBaseline="central"
                                  fill="#ffffff"
                                  fontSize="45"
                                  fontWeight="bold"
                                  stroke="#000000"
                                  strokeWidth="1.5"
                                  style={{
                                    transform: `rotate(${
                                      (angle + nextAngle) / 2 + 90
                                    }deg)`,
                                    transformOrigin: `${
                                      300 +
                                      165 *
                                        Math.cos(
                                          (startAngleRad + endAngleRad) / 2
                                        )
                                    }px ${
                                      300 +
                                      165 *
                                        Math.sin(
                                          (startAngleRad + endAngleRad) / 2
                                        )
                                    }px`,
                                  }}
                                >
                                  {name}
                                </text>
                              </g>
                            );
                          })
                        )
                      ) : (
                        <circle
                          cx="300"
                          cy="300"
                          r="270"
                          fill="#f3f4f6"
                          stroke="#d1d5db"
                          strokeWidth="5"
                        />
                      )}

                      {/* 중앙 원 */}
                      <circle
                        cx="300"
                        cy="300"
                        r="27"
                        fill="#374151"
                        stroke="#ffffff"
                        strokeWidth="6"
                      />
                    </svg>
                  </div>

                  {/* 화살표 포인터 */}
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-0 h-0 border-l-[16px] border-r-[16px] border-t-[32px] border-l-transparent border-r-transparent border-t-red-600 drop-shadow-2xl"></div>
                  </div>
                </div>
              </div>

              {/* 결과 표시 */}
              {winner && (
                <div className="mb-6 p-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl text-white text-center">
                  <h3 className="text-xl font-bold mb-2">🎉 당첨자 발표! 🎉</h3>
                  <p className="text-2xl font-bold">{winner}</p>
                  <p className="text-sm mt-2">맛있는 빵 부탁드려요!</p>
                </div>
              )}

              {/* 게임 버튼들 */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={startSpin}
                  disabled={names.length === 0 || isSpinning}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                    names.length === 0 || isSpinning
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 hover:scale-105 shadow-lg hover:shadow-xl"
                  }`}
                >
                  <Disc
                    className={`w-5 h-5 ${isSpinning ? "animate-spin" : ""}`}
                  />
                  {isSpinning ? "룰렛 돌리는 중..." : "룰렛 돌리기"}
                </button>

                <button
                  onClick={resetSimple}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  리셋
                </button>
              </div>

              {names.length === 0 && (
                <p className="text-sm text-gray-500 mt-4">
                  먼저 참가자를 추가해주세요
                </p>
              )}
            </div>

            {/* 이름 입력 섹션 */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-amber-600" />
                참가자 추가
              </h2>

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="이름을 입력하세요"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <button
                  onClick={addName}
                  className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-200 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  추가
                </button>
              </div>

              {names.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-700">참가자 목록:</h3>
                  <div className="flex flex-wrap gap-2">
                    {names.map((name, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full"
                      >
                        <span>{name}</span>
                        <button
                          onClick={() => removeName(name)}
                          className="text-amber-600 hover:text-amber-800 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showOriginal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
              오늘의 빵 담당자
            </h1>
            <p className="text-gray-600 text-lg mb-4">
              핀볼룰렛으로 공정하게 결정해요! 🍞
            </p>
            <button
              onClick={() => setShowOriginal(false)}
              className="mb-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-200 flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-4 h-4" />빵 프로젝트로 돌아가기
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-4">
            <div className="relative w-full" style={{ height: "80vh" }}>
              <iframe
                src="/roulette/index.html"
                className="w-full h-full border-0 rounded-xl"
                title="핀볼룰렛"
              />
              <div className="absolute top-4 right-4">
                <a
                  href="/roulette/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black bg-opacity-50 text-white px-3 py-2 rounded-lg hover:bg-opacity-70 transition-all flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />새 창에서 열기
                </a>
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>
                원본 소스:{" "}
                <a
                  href="https://github.com/lazygyu/roulette"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:text-amber-800"
                >
                  github.com/lazygyu/roulette
                </a>{" "}
                (MIT License)
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
            오늘의 빵 담당자
          </h1>
          <p className="text-gray-600 text-lg">
            어떤 방식으로 빵 담당자를 정할까요? 🍞
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* 룰렛 선택 섹션 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                룰렛 방식 선택
              </h2>
              <p className="text-gray-600">원하는 룰렛 방식을 선택해주세요</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 원본 roulette */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all">
                <div className="flex flex-col items-center space-y-4">
                  <div className="bg-purple-100 p-4 rounded-full">
                    <Gamepad2 className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">핀볼룰렛</h3>
                  <p className="text-gray-600 text-sm">
                    고급 Box2D 물리 엔진
                    <br />
                    구슬이 떨어지는 진짜 물리 시뮬레이션
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      Box2D 물리엔진
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      고급 그래픽
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      MIT 라이선스
                    </span>
                  </div>
                  <button
                    onClick={() => setShowOriginal(true)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    핀볼룰렛 사용하기
                  </button>
                </div>
              </div>

              {/* 간단한 버전 */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-200 hover:border-amber-400 transition-all">
                <div className="flex flex-col items-center space-y-4">
                  <div className="bg-amber-100 p-4 rounded-full">
                    <User className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    간단한 룰렛
                  </h3>
                  <p className="text-gray-600 text-sm">
                    빠르고 간단한 뽑기
                    <br />
                    복잡한 설정 없이 바로 사용
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded">
                      빠른 실행
                    </span>
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded">
                      간단한 UI
                    </span>
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded">
                      모바일 최적화
                    </span>
                  </div>
                  <button
                    onClick={() => setShowSimple(true)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    간단한 룰렛 사용하기
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-xl">
              <h4 className="font-semibold text-blue-800 mb-2">💡 추천</h4>
              <p className="text-blue-700 text-sm">
                더 재미있고 시각적인 경험을 원한다면 <strong>핀볼룰렛</strong>을
                추천합니다!
                <br />
                전문적인 물리 시뮬레이션으로 공정한 결과를 경험해보세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
