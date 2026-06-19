/*
  Mock data for the designer/cooperator management page.
  TODO(API): Replace this array with designer/vendor list and detail responses from the backend.
*/
window.DesignPrintHubData = window.DesignPrintHubData || {};
window.DesignPrintHubData.designers = [
  {
    id: "jung-daon",
    type: "프리랜서",
    name: "정다온 디자이너",
    shortName: "정다온",
    phone: "010-4821-7730",
    email: "daon.design@workmail.kr",
    specialty: "학교 문집 · 내지 편집",
    availability: "작업 가능",
    activeLoad: "74%",
    memo: "졸업문집과 학교 행사 책자 편집 속도가 빠르고, 사진 정리 요청 대응이 안정적입니다.",
    projects: [
      {
        id: "hanbit-yearbook",
        title: "한빛초등학교 졸업문집",
        orderNo: "ORD-260605-018",
        stage: "1차 디자인 확정",
        statusClass: "stage1",
        scope: "표지+내지 편집",
        due: "2026-06-09 15:00"
      },
      {
        id: "yeonhui-classbook",
        title: "연희초 학급문집",
        orderNo: "ORD-260603-022",
        stage: "2-1차 오탈자 수정",
        statusClass: "stage2",
        scope: "내지 레이아웃 수정",
        due: "2026-06-10 12:00"
      }
    ],
    pastProjects: [
      {
        id: "mirae-festival",
        title: "미래초 축제 작품집",
        orderNo: "ORD-260520-009",
        stage: "작업 완료",
        statusClass: "paid",
        scope: "내지 편집 · 사진 보정",
        due: "2026-05-28 완료",
        history: [
          ["최종 파일 전달", "2026-05-27 · 인쇄용 PDF 전달 완료"],
          ["수정 반영", "2026-05-26 · 사진 순서 변경 요청 반영"]
        ]
      }
    ],
    history: [
      ["작업 의뢰", "오늘 13:20 · 한빛초 졸업문집 표지+내지 편집 요청"],
      ["진행 확인", "오늘 15:20 · 1차 시안 구성 진행 중"],
      ["파일 공유", "어제 17:40 · 참고 이미지 폴더 확인 완료"]
    ]
  },
  {
    id: "harin-studio",
    type: "협업 업체",
    name: "이하린 스튜디오",
    shortName: "이하린",
    phone: "02-718-4420",
    email: "hello@harinstudio.co.kr",
    specialty: "기업 교재 · 인포그래픽",
    availability: "신규 배정 제한",
    activeLoad: "91%",
    memo: "기업 교육 교재, 표/도식 정리, 인포그래픽 보강 작업에 적합합니다.",
    projects: [
      {
        id: "neobridge-training",
        title: "네오브릿지 사내 교육 교재",
        orderNo: "ORD-260605-014",
        stage: "2-2차 오탈자 수정",
        statusClass: "stage2",
        scope: "전체 시안 확인 · 오탈자 수정",
        due: "2026-06-08 18:00"
      },
      {
        id: "daon-onboarding",
        title: "다온HR 온보딩 북",
        orderNo: "ORD-260602-011",
        stage: "3차 최종 수정",
        statusClass: "stage3",
        scope: "최종 PDF 검수",
        due: "2026-06-09 11:00"
      }
    ],
    pastProjects: [
      {
        id: "corelab-manual",
        title: "코어랩 운영 매뉴얼",
        orderNo: "ORD-260518-004",
        stage: "작업 완료",
        statusClass: "paid",
        scope: "표/도식 정리 · 최종 PDF",
        due: "2026-05-25 완료",
        history: [
          ["최종본 확인", "2026-05-24 · 관리자 검수 완료"],
          ["3차 수정 반영", "2026-05-23 · 도식 색상 조정 완료"]
        ]
      }
    ],
    history: [
      ["2-2차 수정 요청", "오늘 11:20 · 오탈자 18건 수정 요청"],
      ["수정본 확인", "오늘 14:05 · 도식 2개 반영 완료"],
      ["작업량 조율", "어제 16:10 · 신규 배정은 내일 이후 가능"]
    ]
  },
  {
    id: "moon-seoyun",
    type: "프리랜서",
    name: "문서윤 디자이너",
    shortName: "문서윤",
    phone: "010-6204-1876",
    email: "seoyun.moon@designmail.kr",
    specialty: "카탈로그 · 인쇄용 PDF",
    availability: "작업 가능",
    activeLoad: "56%",
    memo: "색상 보정과 최종 PDF 검수에 강점이 있어 인쇄 전 마감 단계에 적합합니다.",
    projects: [
      {
        id: "reverselab-catalog",
        title: "리버스랩 제품 카탈로그",
        orderNo: "ORD-260604-027",
        stage: "3차 최종 수정",
        statusClass: "stage3",
        scope: "최종 수정 반영 · PDF 업로드",
        due: "2026-06-09 12:00"
      }
    ],
    pastProjects: [
      {
        id: "brightone-catalog",
        title: "브라이트원 제품 소개서",
        orderNo: "ORD-260512-018",
        stage: "작업 완료",
        statusClass: "paid",
        scope: "이미지 보정 · 최종 PDF",
        due: "2026-05-20 완료",
        history: [
          ["최종 PDF 전달", "2026-05-19 · 재단선 포함 PDF 전달"],
          ["색상 보정 확인", "2026-05-18 · 제품 이미지 톤 보정 완료"]
        ]
      }
    ],
    history: [
      ["최종 수정본 요청", "오늘 10:40 · 제품명 표기 1건 반영 요청"],
      ["최종 PDF 업로드", "오늘 15:02 · 재단선과 여백 검수 완료"],
      ["인쇄 전 확인", "오늘 15:30 · 발주 가능 상태로 전달"]
    ]
  },
  {
    id: "atelier-goun",
    type: "협업 업체",
    name: "아틀리에 고운",
    shortName: "고운",
    phone: "031-774-9921",
    email: "contact@goun-atelier.kr",
    specialty: "일러스트 · 작품집",
    availability: "배정 검토",
    activeLoad: "42%",
    memo: "작품집, 동아리 결과물, 일러스트가 필요한 학교 프로젝트 후보 업체입니다.",
    projects: [
      {
        id: "songdam-clubbook",
        title: "송담중학교 동아리 작품집",
        orderNo: "ORD-260604-031",
        stage: "작업 배정 검토",
        statusClass: "pending",
        scope: "포트폴리오 확인",
        due: "2026-06-08 16:00"
      }
    ],
    pastProjects: [
      {
        id: "namu-artbook",
        title: "나무고 미술 동아리집",
        orderNo: "ORD-260501-006",
        stage: "작업 완료",
        statusClass: "paid",
        scope: "작품 이미지 배치 · 일러스트 보정",
        due: "2026-05-12 완료",
        history: [
          ["최종 파일 전달", "2026-05-11 · 관리자에게 최종본 공유"],
          ["작품 순서 수정", "2026-05-10 · 페이지 순서 변경 반영"]
        ]
      }
    ],
    history: [
      ["배정 가능 여부 문의", "오늘 12:10 · 작품집 일러스트 편집 가능 여부 확인"],
      ["포트폴리오 요청", "오늘 14:30 · 학교 작품집 유사 사례 요청"],
      ["회신 대기", "오늘 16:00 · 일정 가능 여부 회신 대기"]
    ]
  }
];
