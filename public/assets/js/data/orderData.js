/*
  Mock data for the order management page.
  TODO(API): Replace this array with paginated order list/detail responses from the backend.
*/
window.DesignPrintHubData = window.DesignPrintHubData || {};
window.DesignPrintHubData.orders = [
      {
        id: "202606021780361389903",
        customerOrderNo: "202606021780361389903",
        buyer: "장정화",
        account: "해강고등학교",
        email: "jjaan2000@hanmail.net",
        phone: "010-9575-6329",
        product: "교육교재",
        productSummary: "A4 · 280권 · 무선제본",
        amount: "787,000원",
        paymentMethod: "신용카드",
        paymentAt: "2026-06-04 08:43:25",
        partner: "이하린 스튜디오",
        partnerRole: "교재 편집 · 오탈자 수정",
        workStage: "2-2차 오탈자 수정",
        workClass: "stage2",
        orderInfo: {
          "주문번호": "202606021780361389903",
          "상점명": "우리학교인쇄",
          "주문일시": "2026-06-02 09:49:50",
          "주문자명": "장정화",
          "학교명": "해강고등학교",
          "결제금액": "787,000원",
          "결제방법": "신용카드",
          "담당 협업업체": "이하린 스튜디오",
          "시안 진행단계": "2-2차 오탈자 수정"
        },
        shipping: {
          "받는사람": "김정화",
          "이메일": "jjaan2000@hanmail.net",
          "연락처": "010-9575-6329",
          "우편번호": "48089",
          "주소": "부산 해운대구 해운대해변로 33",
          "상세주소": "2층 교무실",
          "배송메시지": "수업 전 행정실에 먼저 연락 부탁드립니다."
        },
        items: [
          {
            name: "교육교재",
            quantity: "280개",
            spec: "출력 방식: 디지털 인쇄 / 제작 형태: 중철제본 / 사이즈: A4 / 부수: 280권 / 표지: 컬러양면, 무광, 스노우지 200g / 내지: 흑백양면, 4페이지, 백색모조 120g",
            amount: "373,200원",
            original: "원고 PDF",
            draft: "2-2차 시안",
            final: "대기",
            status: "인쇄중"
          },
          {
            name: "교육교재",
            quantity: "250개",
            spec: "출력 방식: 디지털 인쇄 / 제작 형태: 중철제본 / 사이즈: A4 / 부수: 250권 / 표지: 컬러양면, 무광, 스노우지 200g / 내지: 흑백양면, 8페이지, 백색모조 120g",
            amount: "405,800원",
            original: "원고 PDF",
            draft: "2-2차 시안",
            final: "대기",
            status: "인쇄중"
          }
        ],
        goodsAmount: "779,000원",
        shippingFee: "8,000원",
        total: "787,000원"
      },
      {
        id: "ORD-260605-018",
        customerOrderNo: "ORD-260605-018",
        buyer: "김서연",
        account: "한빛초등학교",
        email: "seoyeon.kim@hanbit.es.kr",
        phone: "010-2384-9112",
        product: "졸업문집",
        productSummary: "A4 · 320부 · 무선제본",
        amount: "3,565,000원",
        paymentMethod: "무통장입금",
        paymentAt: "입금 확인 전",
        partner: "정다온 디자이너",
        partnerRole: "표지+내지 편집",
        workStage: "1차 디자인 확정",
        workClass: "stage1",
        orderInfo: {
          "주문번호": "ORD-260605-018",
          "상점명": "우리학교인쇄",
          "주문일시": "2026-06-05 13:20:00",
          "주문자명": "김서연",
          "학교명": "한빛초등학교",
          "결제금액": "3,565,000원",
          "결제방법": "무통장입금",
          "담당 프리랜서": "정다온 디자이너",
          "시안 진행단계": "1차 디자인 확정"
        },
        shipping: {
          "받는사람": "김서연",
          "이메일": "seoyeon.kim@hanbit.es.kr",
          "연락처": "010-2384-9112",
          "우편번호": "03902",
          "주소": "서울특별시 마포구 월드컵북로 72",
          "상세주소": "행정실",
          "배송메시지": "납품 전 행정실 유선 연락"
        },
        items: [
          {
            name: "졸업문집",
            quantity: "320부",
            spec: "A4 / 148p / 표지: 스노우 250g 무광코팅 / 내지: 백색모조 100g / 무선제본",
            amount: "2,840,000원",
            original: "원고 ZIP",
            draft: "1차 시안",
            final: "대기",
            status: "디자인중"
          },
          {
            name: "디자인 편집",
            quantity: "1식",
            spec: "표지 1종 / 내지 레이아웃 / 사진 보정 포함",
            amount: "680,000원",
            original: "원고 ZIP",
            draft: "진행중",
            final: "대기",
            status: "디자인중"
          }
        ],
        goodsAmount: "3,520,000원",
        shippingFee: "45,000원",
        total: "3,565,000원"
      },
      {
        id: "ORD-260604-027",
        customerOrderNo: "ORD-260604-027",
        buyer: "최유나",
        account: "리버스랩",
        email: "yuna.choi@reverselab.io",
        phone: "070-7729-4105",
        product: "제품 카탈로그",
        productSummary: "A5 · 500부 · 중철",
        amount: "1,948,000원",
        paymentMethod: "신용카드",
        paymentAt: "2026-06-04 15:18:02",
        partner: "문서윤 디자이너",
        partnerRole: "카탈로그 · 최종 PDF",
        workStage: "3차 최종 수정",
        workClass: "stage3",
        orderInfo: {
          "주문번호": "ORD-260604-027",
          "상점명": "우리학교인쇄",
          "주문일시": "2026-06-04 13:45:00",
          "주문자명": "최유나",
          "학교명": "리버스랩",
          "결제금액": "1,948,000원",
          "결제방법": "신용카드",
          "담당 프리랜서": "문서윤 디자이너",
          "시안 진행단계": "3차 최종 수정"
        },
        shipping: {
          "받는사람": "최유나",
          "이메일": "yuna.choi@reverselab.io",
          "연락처": "070-7729-4105",
          "우편번호": "21984",
          "주소": "인천광역시 연수구 송도과학로 85",
          "상세주소": "물류센터 입고 데스크",
          "배송메시지": "50부는 본사 별도 발송"
        },
        items: [
          {
            name: "제품 카탈로그",
            quantity: "500부",
            spec: "A5 / 32p / 표지: 랑데뷰 160g / 내지: 랑데뷰 130g / 중철 / 전면 컬러",
            amount: "1,420,000원",
            original: "원고 PDF",
            draft: "3차 시안",
            final: "최종 PDF",
            status: "최종확정"
          },
          {
            name: "디자인 편집",
            quantity: "1식",
            spec: "제품 이미지 보정 / 최종 PDF 제작 / 인쇄 전 검수",
            amount: "470,000원",
            original: "이미지 ZIP",
            draft: "승인",
            final: "최종 PDF",
            status: "최종확정"
          }
        ],
        goodsAmount: "1,890,000원",
        shippingFee: "58,000원",
        total: "1,948,000원"
      },
      {
        id: "ORD-260604-031",
        customerOrderNo: "ORD-260604-031",
        buyer: "윤지후",
        account: "송담중학교",
        email: "club@songdam.ms.kr",
        phone: "031-774-3180",
        product: "동아리 작품집",
        productSummary: "188x257 · 240부 · 무선제본",
        amount: "2,632,000원",
        paymentMethod: "무통장입금",
        paymentAt: "입금 확인 전",
        partner: "배정 대기",
        partnerRole: "일러스트 가능 디자이너 추천",
        workStage: "작업 배정 대기",
        workClass: "pending",
        orderInfo: {
          "주문번호": "ORD-260604-031",
          "상점명": "우리학교인쇄",
          "주문일시": "2026-06-04 16:22:00",
          "주문자명": "윤지후",
          "학교명": "송담중학교",
          "결제금액": "2,632,000원",
          "결제방법": "무통장입금",
          "담당 협업업체": "배정 대기",
          "시안 진행단계": "작업 배정 대기"
        },
        shipping: {
          "받는사람": "윤지후",
          "이메일": "club@songdam.ms.kr",
          "연락처": "031-774-3180",
          "우편번호": "12572",
          "주소": "경기도 양평군 강상면 송담로 18",
          "상세주소": "교무실",
          "배송메시지": "작품집 파손 방지 포장 요청"
        },
        items: [
          {
            name: "동아리 작품집",
            quantity: "240부",
            spec: "188x257 / 120p / 표지: 아르떼 210g 무광코팅 / 내지: 백색모조 100g / 무선제본",
            amount: "1,980,000원",
            original: "원고 ZIP",
            draft: "대기",
            final: "대기",
            status: "배정대기"
          },
          {
            name: "디자인 편집",
            quantity: "1식",
            spec: "작품 이미지 배치 / 작가 소개 레이아웃 / 일러스트 가능 디자이너 필요",
            amount: "610,000원",
            original: "이미지 ZIP",
            draft: "대기",
            final: "대기",
            status: "배정대기"
          }
        ],
        goodsAmount: "2,590,000원",
        shippingFee: "42,000원",
        total: "2,632,000원"
      }
];
