/*
  Mock data for the designer/cooperator schedule page.
  TODO(API): Replace this dataset with project schedule, designer availability, and delivery milestone APIs.
*/
window.DesignPrintHubData = window.DesignPrintHubData || {};
window.DesignPrintHubData.schedules = [
  {
    id: "sch-hanbit",
    orderNo: "ORD-260605-018",
    project: "한빛초등학교 졸업문집",
    client: "한빛초등학교",
    owner: "정다온 디자이너",
    ownerType: "프리랜서",
    stage: "1차 디자인 확정",
    stageClass: "stage1",
    status: "진행중",
    confirmAt: "6월 12일 15:00",
    deliveryAt: "6월 17일",
    scope: "표지+내지 편집",
    memo: "1차 디자인 발송 이후 디자인 확정 여부를 확인하는 주문입니다.",
    dailyPlan: [
      { day: 1, title: "1차 디자인 발송" }
    ],
    checkpoints: ["1차 디자인 발송", "디자인 확정 확인"]
  },
  {
    id: "sch-neobridge",
    orderNo: "ORD-260605-014",
    project: "네오브릿지 사내 교육 교재",
    client: "네오브릿지",
    owner: "이하린 스튜디오",
    ownerType: "협업 업체",
    stage: "2-2차 오탈자 수정",
    stageClass: "stage2",
    status: "확인 필요",
    confirmAt: "6월 13일 11:00",
    deliveryAt: "6월 18일",
    scope: "전체 시안 확인 및 오탈자 수정",
    memo: "2차 디자인 수정 차수를 순차적으로 확인하는 주문입니다.",
    dailyPlan: [
      { day: 1, title: "2-1차 진행중" },
      { day: 2, title: "2-2차 진행중" },
      { day: 3, title: "2-3차 진행중" }
    ],
    checkpoints: ["2-1차 진행중", "2-2차 진행중", "2-3차 진행중"]
  },
  {
    id: "sch-songdam",
    orderNo: "ORD-260604-031",
    project: "송담중학교 동아리 작품집",
    client: "송담중학교",
    owner: "아틀리에 고운",
    ownerType: "협업 업체",
    stage: "배정 전",
    stageClass: "pending",
    status: "배정 검토",
    confirmAt: "6월 13일 16:00",
    deliveryAt: "6월 20일",
    scope: "포트폴리오 확인 및 일정 조율",
    memo: "배정 후 1차 디자인 발송 단계로 진입할 예정입니다.",
    dailyPlan: [
      { day: 2, title: "1차 디자인 발송" },
      { day: 4, title: "2-1차 진행중" }
    ],
    checkpoints: ["1차 디자인 발송", "2-1차 진행중"]
  },
  {
    id: "sch-reverselab",
    orderNo: "ORD-260604-027",
    project: "리버스랩 제품 카다로그",
    client: "리버스랩",
    owner: "문서윤 디자이너",
    ownerType: "프리랜서",
    stage: "3차 최종 수정",
    stageClass: "stage3",
    status: "최종 확인",
    confirmAt: "6월 14일 12:00",
    deliveryAt: "6월 19일",
    scope: "최종 수정 반영 및 인쇄용 PDF 업로드",
    memo: "최종 진행 중이며 확정 후 인쇄 진행 예정입니다.",
    dailyPlan: [
      { day: 3, title: "최종 진행 중" },
      { day: 4, title: "확정 및 인쇄 진행 예정" }
    ],
    checkpoints: ["최종 진행 중", "확정 및 인쇄 진행 예정"]
  },
  {
    id: "sch-yeonhui",
    orderNo: "ORD-260603-022",
    project: "연희초 학급문집",
    client: "연희초등학교",
    owner: "정다온 디자이너",
    ownerType: "프리랜서",
    stage: "2-1차 오탈자 수정",
    stageClass: "stage2",
    status: "진행중",
    confirmAt: "6월 15일 14:00",
    deliveryAt: "6월 21일",
    scope: "내지 레이아웃 수정",
    memo: "2차 디자인 수정 차수를 진행 중인 주문입니다.",
    dailyPlan: [
      { day: 4, title: "2-1차 진행중" },
      { day: 5, title: "2-2차 진행중" }
    ],
    checkpoints: ["2-1차 진행중", "2-2차 진행중"]
  }
];

window.DesignPrintHubData.scheduleDays = ["월 6/11", "화 6/12", "수 6/13", "목 6/14", "금 6/15", "토 6/16"];
