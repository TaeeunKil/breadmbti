import { useState } from 'react';
import { Shuffle, User, Coffee, Gamepad2, Play, RotateCcw } from 'lucide-react';

interface PinballBall {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  name: string;
  color: string;
}

export default function RandomPicker() {
  const [names, setNames] = useState<string[]>([]);
  const [inputName, setInputName] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<string>('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [gameMode, setGameMode] = useState<'random' | 'pinball'>('random');
  
  // 핀볼 게임 상태
  const [balls, setBalls] = useState<PinballBall[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [winner, setWinner] = useState<string>('');

  const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

  const addName = () => {
    if (inputName.trim() && !names.includes(inputName.trim())) {
      setNames([...names, inputName.trim()]);
      setInputName('');
    }
  };

  const removeName = (nameToRemove: string) => {
    setNames(names.filter(name => name !== nameToRemove));
    if (selectedPerson === nameToRemove) {
      setSelectedPerson('');
    }
    if (winner === nameToRemove) {
      setWinner('');
    }
  };

  const pickRandom = () => {
    if (names.length === 0) return;
    
    setIsSpinning(true);
    setSelectedPerson('');
    
    let counter = 0;
    const interval = setInterval(() => {
      setSelectedPerson(names[Math.floor(Math.random() * names.length)]);
      counter++;
      
      if (counter > 10) {
        clearInterval(interval);
        const finalPick = names[Math.floor(Math.random() * names.length)];
        setSelectedPerson(finalPick);
        setIsSpinning(false);
      }
    }, 100);
  };

  const startPinballGame = () => {
    if (names.length === 0) return;
    
    setIsPlaying(true);
    setWinner('');
    
    // 공들을 상단에서 시작
    const newBalls: PinballBall[] = names.map((name, index) => ({
      id: index,
      x: 50 + (index * 60) % 300, // 상단에 분산 배치
      y: 20,
      vx: (Math.random() - 0.5) * 4, // 랜덤한 수평 속도
      vy: Math.random() * 2 + 1, // 아래로 떨어지는 속도
      name,
      color: colors[index % colors.length]
    }));
    
    setBalls(newBalls);
    
    // 물리 시뮬레이션
    const gameInterval = setInterval(() => {
      setBalls(prevBalls => {
        const updatedBalls = prevBalls.map(ball => {
          let newX = ball.x + ball.vx;
          let newY = ball.y + ball.vy;
          let newVx = ball.vx;
          let newVy = ball.vy + 0.2; // 중력
          
          // 벽 충돌
          if (newX <= 10 || newX >= 390) {
            newVx = -newVx * 0.8;
            newX = newX <= 10 ? 10 : 390;
          }
          
          // 바닥 충돌
          if (newY >= 280) {
            newVy = -newVy * 0.6;
            newY = 280;
            newVx *= 0.9; // 마찰
          }
          
          // 핀볼 범퍼들과의 충돌 (간단한 원형 범퍼들)
          const bumpers = [
            { x: 100, y: 150 },
            { x: 200, y: 120 },
            { x: 300, y: 150 },
            { x: 150, y: 200 },
            { x: 250, y: 200 }
          ];
          
          bumpers.forEach(bumper => {
            const dx = newX - bumper.x;
            const dy = newY - bumper.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 25) {
              const angle = Math.atan2(dy, dx);
              newVx = Math.cos(angle) * 3;
              newVy = Math.sin(angle) * 3;
              newX = bumper.x + Math.cos(angle) * 25;
              newY = bumper.y + Math.sin(angle) * 25;
            }
          });
          
          return {
            ...ball,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy
          };
        });
        
        // 승자 결정 (가장 아래쪽에 있는 공)
        const lowestBall = updatedBalls.reduce((lowest, ball) => 
          ball.y > lowest.y ? ball : lowest
        );
        
        // 모든 공이 안정화되었는지 확인
        const allStable = updatedBalls.every(ball => 
          Math.abs(ball.vx) < 0.1 && Math.abs(ball.vy) < 0.1 && ball.y >= 270
        );
        
        if (allStable) {
          clearInterval(gameInterval);
          setWinner(lowestBall.name);
          setIsPlaying(false);
        }
        
        return updatedBalls;
      });
    }, 50);
    
    // 10초 후 강제 종료
    setTimeout(() => {
      clearInterval(gameInterval);
      if (balls.length > 0) {
        const randomWinner = balls[Math.floor(Math.random() * balls.length)];
        setWinner(randomWinner.name);
      }
      setIsPlaying(false);
    }, 10000);
  };

  const resetGame = () => {
    setSelectedPerson('');
    setWinner('');
    setBalls([]);
    setIsPlaying(false);
    setIsSpinning(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addName();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
            오늘의 빵 담당자
          </h1>
          <p className="text-gray-600 text-lg">
            누가 오늘 성심당 빵을 사올까요? 🍞
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* 게임 모드 선택 */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-amber-600" />
              게임 모드 선택
            </h2>
            
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setGameMode('random')}
                className={`flex-1 p-4 rounded-xl border-2 transition-all duration-200 ${
                  gameMode === 'random'
                    ? 'border-amber-500 bg-amber-50 text-amber-800'
                    : 'border-gray-200 hover:border-amber-300'
                }`}
              >
                <Shuffle className="w-6 h-6 mx-auto mb-2" />
                <div className="font-semibold">랜덤 뽑기</div>
                <div className="text-sm text-gray-600">빠르고 간단한 뽑기</div>
              </button>
              
              <button
                onClick={() => setGameMode('pinball')}
                className={`flex-1 p-4 rounded-xl border-2 transition-all duration-200 ${
                  gameMode === 'pinball'
                    ? 'border-amber-500 bg-amber-50 text-amber-800'
                    : 'border-gray-200 hover:border-amber-300'
                }`}
              >
                <Gamepad2 className="w-6 h-6 mx-auto mb-2" />
                <div className="font-semibold">핀볼 게임</div>
                <div className="text-sm text-gray-600">재미있는 물리 게임</div>
              </button>
            </div>
          </div>

          {/* 이름 입력 섹션 */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
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
                disabled={!inputName.trim()}
                className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
              >
                추가
              </button>
            </div>

            {/* 참가자 목록 */}
            {names.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  참가자 목록 ({names.length}명)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {names.map((name, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"
                    >
                      <span>{name}</span>
                      <button
                        onClick={() => removeName(name)}
                        className="text-amber-600 hover:text-amber-800 ml-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 게임 섹션 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            {gameMode === 'random' ? (
              // 랜덤 뽑기 모드
              <div>
                <div className="mb-8">
                  <Coffee className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                  
                  {selectedPerson ? (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-gray-800">
                        오늘의 빵 담당자는...
                      </h2>
                      <div className={`text-4xl font-bold text-amber-600 p-6 bg-amber-50 rounded-xl border-2 border-amber-200 ${isSpinning ? 'animate-pulse' : 'animate-bounce'}`}>
                        {selectedPerson}
                      </div>
                      {!isSpinning && (
                        <p className="text-gray-600">
                          🎉 축하합니다! 맛있는 빵 부탁드려요!
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-gray-800">
                        준비되셨나요?
                      </h2>
                      <p className="text-gray-600">
                        버튼을 눌러 오늘의 빵 담당자를 정해보세요!
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={pickRandom}
                  disabled={names.length === 0 || isSpinning}
                  className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 mx-auto ${
                    names.length === 0 || isSpinning
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 hover:scale-105 shadow-lg hover:shadow-xl'
                  }`}
                >
                  <Shuffle className={`w-6 h-6 ${isSpinning ? 'animate-spin' : ''}`} />
                  {isSpinning ? '뽑는 중...' : '랜덤 뽑기'}
                </button>
              </div>
            ) : (
              // 핀볼 게임 모드
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    핀볼 뽑기 게임
                  </h2>
                  <p className="text-gray-600">
                    공이 떨어져서 가장 아래쪽에 도착하는 사람이 당첨!
                  </p>
                </div>

                {/* 핀볼 게임 보드 */}
                <div className="relative bg-gray-900 rounded-xl p-4 mb-6 mx-auto" style={{ width: '400px', height: '300px' }}>
                  <svg width="100%" height="100%" className="absolute inset-0">
                    {/* 게임 보드 테두리 */}
                    <rect x="5" y="5" width="390" height="290" fill="none" stroke="#3b82f6" strokeWidth="2" rx="10" />
                    
                    {/* 핀볼 범퍼들 */}
                    <circle cx="100" cy="150" r="20" fill="#10b981" stroke="#059669" strokeWidth="2" />
                    <circle cx="200" cy="120" r="20" fill="#10b981" stroke="#059669" strokeWidth="2" />
                    <circle cx="300" cy="150" r="20" fill="#10b981" stroke="#059669" strokeWidth="2" />
                    <circle cx="150" cy="200" r="20" fill="#10b981" stroke="#059669" strokeWidth="2" />
                    <circle cx="250" cy="200" r="20" fill="#10b981" stroke="#059669" strokeWidth="2" />
                    
                    {/* 바닥 */}
                    <line x1="10" y1="280" x2="390" y2="280" stroke="#ef4444" strokeWidth="3" />
                    
                    {/* 공들 */}
                    {balls.map(ball => (
                      <g key={ball.id}>
                        <circle
                          cx={ball.x}
                          cy={ball.y}
                          r="8"
                          fill={ball.color}
                          stroke="white"
                          strokeWidth="1"
                        />
                        <text
                          x={ball.x}
                          y={ball.y - 15}
                          textAnchor="middle"
                          fill="white"
                          fontSize="10"
                          fontWeight="bold"
                        >
                          {ball.name}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>

                {/* 결과 표시 */}
                {winner && (
                  <div className="mb-6">
                    <div className="text-2xl font-bold text-amber-600 p-4 bg-amber-50 rounded-xl border-2 border-amber-200 animate-bounce">
                      🎉 {winner} 당첨! 🎉
                    </div>
                    <p className="text-gray-600 mt-2">
                      맛있는 빵 부탁드려요!
                    </p>
                  </div>
                )}

                {/* 게임 버튼들 */}
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={startPinballGame}
                    disabled={names.length === 0 || isPlaying}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                      names.length === 0 || isPlaying
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:scale-105 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <Play className={`w-5 h-5 ${isPlaying ? 'animate-spin' : ''}`} />
                    {isPlaying ? '게임 중...' : '게임 시작'}
                  </button>
                  
                  <button
                    onClick={resetGame}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center gap-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    리셋
                  </button>
                </div>
              </div>
            )}

            {names.length === 0 && (
              <p className="text-sm text-gray-500 mt-4">
                먼저 참가자를 추가해주세요
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}