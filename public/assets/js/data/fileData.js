/*
  Mock data for the file archive page.
  This page is a webhard-style archive for customer-specific visual assets.
  TODO(API): Replace this dataset with folder, file, permission, and external storage APIs.
*/
window.DesignPrintHubData = window.DesignPrintHubData || {};
window.DesignPrintHubData.fileFolders = [
  {
    id: "logos",
    name: "교표(로고)",
    description: "학교 교표와 고객사 로고 원본",
    fileCount: 18,
    updatedAt: "오늘 15:20",
    externalUrl: "https://link.directcloud.net/snIcGYGFCT"
  },
  {
    id: "school-view",
    name: "학교 전경 사진",
    description: "학교 건물, 운동장, 전경 이미지",
    fileCount: 11,
    updatedAt: "어제 17:40"
  },
  {
    id: "reference-image",
    name: "참고 이미지",
    description: "디자인 참고용 행사",
    fileCount: 1,
    updatedAt: "6월 9일"
  }
];

window.DesignPrintHubData.files = [
  {
    id: "file-hanbit-logo-ai",
    folderId: "logos",
    name: "한빛초등학교_교표_원본.ai",
    project: "한빛초등학교",
    client: "한빛초등학교",
    type: "AI",
    size: "3.8MB",
    uploadedAt: "오늘 15:20"
  },
  {
    id: "file-hanbit-logo-png",
    folderId: "logos",
    name: "한빛초등학교_교표_투명배경.png",
    project: "한빛초등학교",
    client: "한빛초등학교",
    type: "PNG",
    size: "820KB",
    uploadedAt: "오늘 15:18"
  },
  {
    id: "file-songdam-building",
    folderId: "school-view",
    name: "송담중학교_학교전경.jpg",
    project: "송담중학교",
    client: "송담중학교",
    type: "JPG",
    size: "4.2MB",
    uploadedAt: "어제 17:40"
  },
  {
    id: "file-hanbit-campus",
    folderId: "school-view",
    name: "한빛초등학교_운동장전경.jpg",
    project: "한빛초등학교",
    client: "한빛초등학교",
    type: "JPG",
    size: "5.1MB",
    uploadedAt: "6월 10일"
  },
  {
    id: "file-reference-yearbook",
    folderId: "reference-image",
    name: "디자인 참고용 행사",
    project: "디자인 참고용 행사",
    client: "내부 공통",
    type: "JPG",
    size: "8.4MB",
    uploadedAt: "6월 9일"
  }
];
