"use client";

import { useState } from "react";

const settingsGroups = [
  {
    name: "페이지 기능",
    description: "사이드바 각 페이지에서 노출할 관리 기능을 설정합니다.",
    items: [
      {
        label: "대시보드 주문 파이프라인",
        note: "주문 추가, 삭제, 단계 이동, 상세 보기 버튼을 노출합니다.",
        value: "4개 기능"
      },
      {
        label: "주문 관리 목록",
        note: "주문 목록의 추가, 수정, 삭제, 컬럼 설정을 사용할 수 있게 합니다.",
        value: "4개 기능"
      },
      {
        label: "디자이너/협업 업체",
        note: "목록과 상세 정보의 추가, 수정, 삭제 도구를 표시합니다.",
        value: "4개 기능"
      },
      {
        label: "일정표 카드",
        note: "일정 카드 이동, 편집, 삭제 버튼을 표시합니다.",
        value: "4개 기능"
      },
      {
        label: "파일함 폴더",
        note: "폴더 추가, 수정, 삭제와 파일 정보 수정 도구를 표시합니다.",
        value: "4개 기능"
      }
    ]
  },
  {
    name: "기본 보기",
    description: "각 화면에 처음 진입했을 때 우선 표시할 기준을 설정합니다.",
    items: [
      { label: "첫 화면", note: "로그인 후 처음 열리는 관리 화면입니다.", select: ["대시보드", "주문 관리", "일정표"] },
      { label: "주문 목록 정렬", note: "주문 관리 화면의 기본 정렬 기준입니다.", select: ["신규 주문 우선", "마감 임박 우선", "확인 필요 우선"] },
      { label: "일정표 보기", note: "일정표 화면에서 기본으로 보는 기간입니다.", select: ["이번 주 일정", "다음 주 일정", "전체 일정"] },
      { label: "파일함 보기", note: "파일함 화면의 기본 폴더 필터입니다.", select: ["전체 폴더", "최근 업로드", "외부 폴더"] }
    ]
  },
  {
    name: "표시 방식",
    description: "목록과 카드의 밀도, 강조 기준, 보조 정보를 조정합니다.",
    items: [
      { label: "목록 밀도", note: "반복 업무에 맞게 목록 행 간격을 조정합니다.", select: ["기본", "넓게", "촘촘하게"] },
      { label: "강조 기준", note: "관리자가 먼저 확인할 항목을 시각적으로 강조합니다.", select: ["마감 임박", "신규 주문", "확인 필요"] },
      { label: "보조 설명 표시", note: "버튼과 상태 옆에 설명 텍스트를 함께 보여줍니다.", value: "켜짐" },
      { label: "빈 목록 안내", note: "데이터가 없을 때 안내 문구를 표시합니다.", value: "켜짐" }
    ]
  },
  {
    name: "시스템 안내",
    description: "현재 설정 화면의 적용 범위와 연결 상태를 확인합니다.",
    items: [
      { label: "저장 방식", note: "현재 화면은 mock UI이며 실제 데이터 저장은 연결되어 있지 않습니다.", value: "Mock" },
      { label: "API 연결", note: "공식 API 계약 문서 확인 후 실제 저장 기능을 연결합니다.", value: "대기" },
      { label: "권한 적용", note: "사용자별 권한 분기는 개발자 확인 후 적용합니다.", value: "확인 필요" }
    ]
  }
];

export function SettingsTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGroup = settingsGroups[activeIndex];

  return (
    <section className="settings-standard-shell">
      <aside className="settings-standard-nav" aria-label="설정 카테고리">
        {settingsGroups.map((group, index) => (
          <button
            className={activeIndex === index ? "active" : ""}
            key={group.name}
            onClick={() => setActiveIndex(index)}
            type="button"
          >
            <strong>{group.name}</strong>
            <span>{group.description}</span>
          </button>
        ))}
      </aside>

      <section className="settings-standard-panel" aria-live="polite">
        <div className="settings-standard-panel-head">
          <div>
            <h2>{activeGroup.name}</h2>
            <p>{activeGroup.description}</p>
          </div>
          <span>{activeGroup.items.length}개 항목</span>
        </div>

        <div className="settings-standard-list">
          {activeGroup.items.map((item) => (
            <label className="settings-standard-row" key={item.label}>
              <span>
                <strong>{item.label}</strong>
                <small>{item.note}</small>
              </span>
              {item.select ? (
                <select defaultValue={item.select[0]}>
                  {item.select.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <span className="settings-row-control">
                  <input type="checkbox" defaultChecked />
                  <em>{item.value}</em>
                </span>
              )}
            </label>
          ))}
        </div>
      </section>
    </section>
  );
}
