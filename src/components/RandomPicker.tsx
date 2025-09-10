import { useState } from 'react';
import { Shuffle, User, Coffee } from 'lucide-react';

export default function RandomPicker() {
  const [names, setNames] = useState<string[]>([]);
  const [inputName, setInputName] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<string>('');
  const [isSpinning, setIsSpinning] = useState(false);

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
  };

  const pickRandom = () => {
    if (names.length === 0) return;
    
    setIsSpinning(true);
    setSelectedPerson('');
    
    // 랜덤 선택 애니메이션 효과
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

          {/* 뽑기 섹션 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
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