import { useState, useEffect } from "react";
import { ChevronRight, RotateCcw, Share2, Cake, Loader2 } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    scores: {
      E?: number;
      I?: number;
      S?: number;
      N?: number;
      T?: number;
      F?: number;
      J?: number;
      P?: number;
    };
  }[];
}

interface BreadResult {
  name: string;
  description: string;
  traits: string[];
  image: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "성심당에서 친구들과 빵을 사러 갔을 때 \n 줄이 너무 길다면?",
    options: [
      {
        text: "친구들과 수다떨며 기다리는 시간도 즐겁다! 🗣️",
        scores: { E: 2 },
      },
      {
        text: "다른 시간에 혼자 조용히 오는 게 낫겠어... 😅",
        scores: { I: 2 },
      },
      { text: "온라인 주문이나 다른 방법을 찾아본다 🔍", scores: { N: 1 } },
      { text: "이미 와서 기다리는 게 맞지, 차분히 대기 ⏰", scores: { S: 1 } },
    ],
  },
  {
    id: 2,
    text: "새로 출시된 한정판 빵을 발견했을 때 \n당신의 첫 반응은?",
    options: [
      { text: "어떤 맛일지 상상해보며 바로 주문! ✨", scores: { N: 2 } },
      { text: "리뷰 검색부터... 실패하면 돈 아까워 📱", scores: { S: 2 } },
      { text: "주변 사람들 반응을 살펴보고 결정 👥", scores: { F: 1 } },
      { text: "가격 대비 양과 재료를 꼼꼼히 분석 📊", scores: { T: 1 } },
    ],
  },
  {
    id: 3,
    text: "빵집 아르바이트 첫날 \n 가장 걱정되는 부분은?",
    options: [
      { text: "손님들과 대화를 어떻게 해야 할지... 😰", scores: { I: 2 } },
      { text: "다양한 사람들을 만날 수 있어서 기대돼! 😊", scores: { E: 2 } },
      { text: "빵 종류와 가격을 정확히 외울 수 있을까? 🤔", scores: { S: 1 } },
      { text: "고객 서비스의 철학과 방향성이 궁금해 💭", scores: { N: 1 } },
    ],
  },
  {
    id: 4,
    text: "친구가 빵집 창업하고 싶다고 상담을 요청했다면?",
    options: [
      {
        text: "시장 조사부터 사업계획서까지 체계적으로 도와준다 📋",
        scores: { T: 2, J: 1 },
      },
      {
        text: "친구의 꿈을 응원하며 함께 설레어한다! 💪",
        scores: { F: 2, P: 1 },
      },
      {
        text: "현실적인 어려움들을 차근차근 짚어준다 🤷‍♀️",
        scores: { S: 1, T: 1 },
      },
      {
        text: "창의적인 메뉴 아이디어를 함께 브레인스토밍 💡",
        scores: { N: 1, F: 1 },
      },
    ],
  },
  {
    id: 5,
    text: "빵 맛집 투어를 계획한다면 어떤 스타일?",
    options: [
      { text: "시간표 짜고 교통편까지 완벽하게 준비 🗓️", scores: { J: 2 } },
      { text: "대략적인 루트만 정하고 즉흥적으로 탐험 🚶‍♀️", scores: { P: 2 } },
      { text: "맛집 블로그와 리뷰를 꼼꼼히 리서치 📚", scores: { S: 1 } },
      { text: "숨겨진 로컬 맛집을 발굴하는 게 목표 🕵️‍♀️", scores: { N: 1 } },
    ],
  },
  {
    id: 6,
    text: "빵집에서 일하게 된다면 어떤 업무에 끌릴까?",
    options: [
      {
        text: "카운터에서 손님들과 소통하며 추천해주기 💬",
        scores: { E: 2, F: 1 },
      },
      {
        text: "뒤에서 조용히 빵 만드는 작업에 집중하기 👩‍🍳",
        scores: { I: 2, S: 1 },
      },
      { text: "새로운 레시피 개발과 실험하기 🧪", scores: { N: 1, T: 1 } },
      { text: "매장 운영 시스템과 효율성 개선하기 ⚙️", scores: { T: 1, J: 1 } },
    ],
  },
  {
    id: 7,
    text: "빵집에서 주문이 잘못 나왔을 때 당신의 대응은?",
    options: [
      {
        text: "직원에게 정확한 상황을 설명하고 교정 요청 📝",
        scores: { T: 2 },
      },
      {
        text: "직원이 바빠 보이니 그냥 이것도 괜찮다고 넘어가기 😅",
        scores: { F: 2 },
      },
      { text: "매니저를 불러서 시스템적인 해결책 요구 👔", scores: { J: 1 } },
      { text: "상황을 재미있게 받아들이며 유연하게 대처 😄", scores: { P: 1 } },
    ],
  },
  {
    id: 8,
    text: "빵 만들기 클래스에 참여했을 때 당신의 모습은?",
    options: [
      { text: "다른 참가자들과 활발하게 정보 교환 🤝", scores: { E: 1, F: 1 } },
      {
        text: "레시피북을 꼼꼼히 보며 정확하게 따라하기 📖",
        scores: { I: 1, S: 1 },
      },
      {
        text: "기존 레시피에 나만의 변화를 가미해보기 🎨",
        scores: { N: 1, P: 1 },
      },
      {
        text: "온도와 시간을 정밀하게 체크하며 완벽 추구 🌡️",
        scores: { T: 1, J: 1 },
      },
    ],
  },
  {
    id: 9,
    text: "빵집 데이트코스에서 가장 중요하게 생각하는 건?",
    options: [
      { text: "상대방이 좋아할 만한 빵을 함께 찾아주기 💕", scores: { F: 2 } },
      { text: "가성비 좋고 맛있는 곳으로 효율적인 선택 💰", scores: { T: 2 } },
      { text: "분위기 좋은 곳에서 편안한 대화 나누기 ☕", scores: { S: 1 } },
      {
        text: "특별하고 독특한 빵집으로 기억에 남을 경험 🌟",
        scores: { N: 1 },
      },
    ],
  },
  {
    id: 10,
    text: "빵집 사장이 되어 신메뉴를 개발한다면?",
    options: [
      { text: "고객 설문조사와 시장 분석부터 시작 📊", scores: { S: 2, T: 1 } },
      {
        text: "기존에 없던 완전히 새로운 컨셉으로 도전 🚀",
        scores: { N: 2, P: 1 },
      },
      {
        text: "단계별 출시 계획을 세우고 체계적으로 진행 📅",
        scores: { J: 1 },
      },
      { text: "직감과 영감에 따라 자유롭게 실험 💡", scores: { F: 1 } },
    ],
  },
  {
    id: 11,
    text: "빵집에서 줄을 서서 기다리는 동안 무엇을 할까?",
    options: [
      { text: "주변 사람들과 자연스럽게 대화 시작 💬", scores: { E: 2 } },
      { text: "스마트폰으로 조용히 시간 보내기 📱", scores: { I: 2 } },
      { text: "매장 인테리어와 시스템 관찰하며 분석 🔍", scores: { T: 1 } },
      { text: "빵 냄새 맡으며 상상의 나래 펼치기 ☁️", scores: { N: 1 } },
    ],
  },
  {
    id: 12,
    text: "친구들과 빵집 모임을 주최한다면?",
    options: [
      { text: "미리 예약하고 시간과 장소를 정확히 공지 📋", scores: { J: 2 } },
      { text: "당일 분위기 보고 즉석에서 결정하자! 🎲", scores: { P: 2 } },
      { text: "모든 사람의 취향과 일정을 고려해서 조율 🤝", scores: { F: 1 } },
      {
        text: "가장 효율적인 시간대와 장소로 합리적 선택 ⚡",
        scores: { T: 1 },
      },
    ],
  },
];

const breadResults: Record<string, BreadResult> = {
  INTJ: {
    name: "튀김소보로",
    description:
      "성심당의 절대 대표작! 겉보기엔 단순하지만 깊이 있는 풍미와 완벽한 조화를 자랑해요. 독창적이고 체계적인 당신과 닮았어요.",
    traits: ["전략적 사고", "독립적", "완벽주의", "미래지향적"],
    image: "/assets/튀김소보로.webp",
  },
  INTP: {
    name: "보문산메아리",
    description:
      "대전 보문산의 추억을 담은 부드러운 몽블랑빵. 시작점부터 천천히 뜯어 맛을 음미하듯, 깊이 있게 사고하는 당신과 닮았어요.",
    traits: ["논리적 분석", "창의적", "독립적", "호기심 많음"],
    image: "/assets/보문산메아리.webp",
  },
  ENTJ: {
    name: "S브레드",
    description:
      "맷돌로 간 통밀과 헤이즐넛, 호박씨 등 다양한 견과류가 들어간 든든하고 고소한 빵으로, 목표 지향적인 든든한한 당신의 리더십을 보여줘요.",
    traits: ["리더십", "목표지향", "효율성", "추진력"],
    image: "/assets/S브레드.webp",
  },
  ENTP: {
    name: "초코튀소",
    description:
      "튀김소보로 40주년 기념 혁신작! 바삭한 튀소에 초콜릿 코팅을 더한 '완생의 빵'. 끊임없는 아이디어와 혁신으로 발전하는 당신과 닮았어요.",
    traits: ["창의적", "활발함", "적응력", "혁신적"],
    image: "/assets/초코튀소.webp",
  },
  INFJ: {
    name: "교황님의 치아바타",
    description:
      "2014년 프란치스코 교황님께 제공된 특별한 빵! 인공 첨가물 없는 순수한 재료로 만든 쫄깃한 이탈리아 빵. 깊은 신념과 이상을 가진 당신과 닮았어요.",
    traits: ["이상주의", "통찰력", "공감능력", "신중함"],
    image: "/assets/교황님의 치아바타.webp",
  },
  INFP: {
    name: "딸기시루",
    description:
      "성심당의 봄 한정 시그니처! 섬세한 딸기와 부드러운 시루의 조화처럼, 순수하고 따뜻한 마음을 가진 당신의 감성과 어울려요.",
    traits: ["순수함", "창의적", "공감적", "이상추구"],
    image: "/assets/딸기시루.webp",
  },
  ENFJ: {
    name: "판타롱부추빵",
    description:
      "2012년 특허 등록! 스모크 햄과 부추, 삶은 달걀이 어우러진 든든한 빵. 다양한 재료를 조화롭게 만드는 당신의 리더십을 보여줘요.",
    traits: ["배려심", "카리스마", "공감능력", "협력적"],
    image: "/assets/판타롱부추빵.webp",
  },
  ENFP: {
    name: "크림치즈화이트번",
    description:
      "하얀 부드러운 빵 속 꾸덕한 블루베리 크림치즈와 톡톡 터지는 블루베리 알갱이! 다양한 식감과 상큼함으로 활발하고 창의적인 당신을 표현해요.",
    traits: ["활발함", "낙관적", "창의적", "사교적"],
    image: "/assets/크림치즈화이트번.webp",
  },
  ISTJ: {
    name: "월넛브레드",
    description:
      "2018년 명예의 전당에 오른 검증된 베스트셀러! 호두와 견과류가 가득한 고소하고 든든한 빵으로 신뢰할 수 있는 당신의 안정감을 보여줘요.",
    traits: ["책임감", "신뢰성", "체계적", "현실적"],
    image: "/assets/월넛브레드.webp",
  },
  ISFJ: {
    name: "순수롤",
    description:
      "100% 순수 우유 크림을 듬뿍 넣은 담백한 롤케이크! 깔끔하고 정성스러운 맛으로 헌신적이고 세심한 당신의 따뜻함을 보여줘요.",
    traits: ["배려심", "헌신적", "따뜻함", "세심함"],
    image: "/assets/순수롤.webp",
  },
  ESTJ: {
    name: "명란바게트",
    description:
      "바삭한 바게트에 최고급 덕화명란이 가득! 고품질 재료와 완벽한 조합으로 실용적이면서도 체계적인 당신의 면모를 보여줘요.",
    traits: ["체계적", "실용적", "리더십", "책임감"],
    image: "/assets/명란바게트.webp",
  },
  ESFJ: {
    name: "공주알밤식빵",
    description:
      "부드럽고 촉촉한 식빵 속에 달콤하고 담백한 공주알밤과 고구마가 콕콕 박혀 있는 영양 만점 식빵! 소보로 가루와 아몬드가 듬뿍 들어있어 풍미를 더하며, 자꾸만 손이 가는 마법 같은 맛으로 사교적인 당신과 어울려요.",
    traits: ["사교적", "배려심", "협력적", "따뜻함"],
    image: "/assets/공주알밤식빵.webp",
  },
  ISTP: {
    name: "튀소구마",
    description:
      "튀김소보로의 고구마 버전! 바삭한 튀김옷 속 달콤한 고구마 무스로 조용하지만 확실한 매력을 가진, 실용적인 당신과 닮았어요.",
    traits: ["실용적", "독립적", "분석적", "현실적"],
    image: "/assets/튀소구마.webp",
  },
  ISFP: {
    name: "김치찹쌀주먹밥",
    description:
      "찹쌀밥에 김치와 채소를 넣고 바삭하게 튀긴 독창적인 메뉴! 누룽지 같은 고소함과 매콤함으로 조용하지만 확실한 개성을 보여줘요.",
    traits: ["예술적", "온화함", "섬세함", "개성적"],
    image: "/assets/김치찹쌀주먹밥.webp",
  },
  ESTP: {
    name: "키다리트위스트",
    description:
      "9번 꼬아 만든 길쭉한 꽈배기 도넛! 바삭하고 쫄깃한 페이스트리로 활동적이고 에너지 넘치는 당신의 역동적인 매력을 보여줘요.",
    traits: ["활동적", "즉흥적", "사교적", "현실적"],
    image: "/assets/키다리트위스트.webp",
  },
  ESFP: {
    name: "토요빵",
    description:
      "2005년 토요일에 탄생한 보랏빛 빵! 적고구마와 타피오카 떡, 버터 쿠키 크럼의 특별한 조합으로 밝고 독특한 당신의 매력을 보여줘요.",
    traits: ["밝음", "사교적", "즉흥적", "낙관적"],
    image: "/assets/토요빵.webp",
  },
};

function App() {
  const [currentPage, setCurrentPage] = useState<"start" | "quiz" | "result">(
    "start"
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  });
  const [result, setResult] = useState<string>("");
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const [isPreloading, setIsPreloading] = useState(true);

  // 이미지 preload 함수
  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        setImagesLoaded((prev) => ({ ...prev, [src]: true }));
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  };

  // 앱 시작 시 중요한 이미지들 preload
  useEffect(() => {
    const preloadImages = async () => {
      try {
        // 시작 페이지 이미지와 자주 사용되는 이미지들 미리 로드
        const importantImages = [
          "/assets/튀김소보로.webp",
          "/assets/월넛브레드.webp", // ISTJ - 자주 나올 수 있는 타입
          "/assets/초코튀소.webp", // ENTP
          "/assets/딸기시루.webp", // INFP
        ];

        await Promise.all(importantImages.map(preloadImage));
        setIsPreloading(false);
      } catch (error) {
        console.error("이미지 preload 실패:", error);
        setIsPreloading(false);
      }
    };

    preloadImages();
  }, []);

  const handleAnswer = (scores: Record<string, number>) => {
    const newAnswers = { ...answers };
    Object.entries(scores).forEach(([key, value]) => {
      newAnswers[key] += value;
    });
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<string, number>) => {
    const mbti = [
      finalAnswers.E > finalAnswers.I ? "E" : "I",
      finalAnswers.S > finalAnswers.N ? "S" : "N",
      finalAnswers.T > finalAnswers.F ? "T" : "F",
      finalAnswers.J > finalAnswers.P ? "J" : "P",
    ].join("");

    setResult(mbti);

    // 결과 이미지 미리 로드
    const bread = breadResults[mbti];
    if (bread && !imagesLoaded[bread.image]) {
      preloadImage(bread.image);
    }

    setCurrentPage("result");
  };

  const resetTest = () => {
    setCurrentPage("start");
    setCurrentQuestion(0);
    setAnswers({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
    setResult("");
  };

  const shareResult = () => {
    const bread = breadResults[result];
    const shareText = `나의 성심당 빵 유형은 "${bread.name}"! 대전 성심당 MBTI 테스트 해보세요!`;

    if (navigator.share) {
      try {
        navigator.share({
          title: "성심당 빵 MBTI 테스트",
          text: shareText,
          url: window.location.href,
        });
      } catch {
        // Web Share API 실패 시 클립보드 복사로 대체
        navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
        alert("링크가 복사되었습니다!");
      }
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      alert("링크가 복사되었습니다!");
    }
  };

  if (currentPage === "start") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
          <div className="mb-6 flex justify-center">
            {isPreloading ? (
              <div className="w-48 h-48 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
              </div>
            ) : (
              <img
                src="/assets/튀김소보로.webp"
                alt="성심당 로고"
                className="w-48 h-48 object-contain"
                onLoad={() =>
                  setImagesLoaded((prev) => ({
                    ...prev,
                    "/assets/튀김소보로.webp": true,
                  }))
                }
              />
            )}
          </div>
          <h1 className="text-3xl font-bold text-amber-800 mb-2">
            성심당 빵 MBTI
          </h1>
          <p className="text-sm text-gray-500 mb-4 font-medium">
            (비공식 팬사이트)
          </p>
          <p className="text-gray-600 mb-2 leading-relaxed">
            대전의 자랑, 성심당 빵으로 알아보는
          </p>
          <p className="text-gray-600 mb-8 leading-relaxed">
            나의 성격 유형은?
          </p>
          <button
            onClick={() => setCurrentPage("quiz")}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-4 px-8 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            테스트 시작하기
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  if (currentPage === "quiz") {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Cake className="w-5 h-5 text-amber-600" />
              <span className="text-sm text-gray-500">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-8 leading-relaxed whitespace-pre-line">
            {question.text}
          </h2>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.scores)}
                className="w-full p-4 text-left bg-gray-50 hover:bg-amber-50 rounded-xl transition-all duration-300 border-2 border-transparent hover:border-amber-200 hover:shadow-md transform hover:-translate-y-1"
              >
                <span className="text-gray-700 font-medium">{option.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const bread = breadResults[result];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        <div className="text-8xl mb-6">
          {imagesLoaded[bread.image] ? (
            <img
              src={bread.image}
              alt={bread.name}
              className="w-50 h-50 object-contain mx-auto"
            />
          ) : (
            <div className="w-50 h-50 flex items-center justify-center mx-auto">
              <Loader2 className="w-16 h-16 text-amber-500 animate-spin" />
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-amber-800 mb-2">
          당신은 {bread.name} 타입!
        </h1>

        <div className="bg-amber-100 rounded-lg p-3 mb-6">
          <span className="text-amber-800 font-semibold text-lg">{result}</span>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {bread.description}
        </p>

        <div className="mb-8">
          <h3 className="font-semibold text-gray-800 mb-3">주요 특징</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {bread.traits.map((trait, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={shareResult}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            <Share2 className="w-4 h-4" />
            결과 공유하기
          </button>

          <button
            onClick={resetTest}
            className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            다시 테스트하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
