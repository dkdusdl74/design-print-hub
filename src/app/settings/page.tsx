import type { Metadata } from "next";
import Link from "next/link";
import { SettingsTabs } from "./settings-tabs";

const navigation = [
  {
    href: "/",
    label: "대시보드",
    icon: (
      <>
        <path d="M3 13h8V3H3z"></path>
        <path d="M13 21h8v-8h-8z"></path>
        <path d="M13 3h8v6h-8z"></path>
        <path d="M3 21h8v-4H3z"></path>
      </>
    )
  },
  {
    href: "/orders",
    label: "주문 관리",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <path d="M14 2v6h6"></path>
        <path d="M8 13h8"></path>
        <path d="M8 17h5"></path>
      </>
    )
  },
  {
    href: "/designers",
    label: "디자이너",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </>
    )
  },
  {
    href: "/schedule",
    label: "일정표",
    icon: (
      <>
        <path d="M8 2v4"></path>
        <path d="M16 2v4"></path>
        <rect x="3" y="4" width="18" height="18" rx="2"></rect>
        <path d="M3 10h18"></path>
        <path d="M8 14h.01"></path>
        <path d="M12 14h.01"></path>
        <path d="M16 14h.01"></path>
        <path d="M8 18h.01"></path>
        <path d="M12 18h.01"></path>
      </>
    )
  },
  {
    href: "/files",
    label: "파일함",
    icon: (
      <>
        <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <path d="M3 11h18"></path>
      </>
    )
  }
];

export const metadata: Metadata = {
  title: "Design Print Hub 설정",
  description: "Design Print Hub 관리자 설정"
};

export default function SettingsPage() {
  return (
    <div className="shell">
      <aside className="sidebar">
        <Link className="brand" href="/" aria-label="Design Print Hub 대시보드">
          <div className="mark">D</div>
          <div>
            <strong>Design Print Hub</strong>
            <span>주문 배정 관리자</span>
          </div>
        </Link>

        <nav className="nav" aria-label="관리 메뉴">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {item.icon}
              </svg>
              {item.label}
            </Link>
          ))}
          <Link className="active" href="/settings">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-.4-1.1 1.65 1.65 0 0 0-1-.6 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.1-.4 1.65 1.65 0 0 0 .6-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-.6 1.65 1.65 0 0 0 .4-1.1V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 .4 1.1 1.65 1.65 0 0 0 1 .6 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.2.36.48.66.82.88.34.22.74.34 1.16.34H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.1.4c-.34.22-.62.52-.82.88z"></path>
            </svg>
            설정
          </Link>
        </nav>

        <div className="sidebar-note">
          설정 화면은 현재 mock UI입니다. 실제 저장, 권한, DB 반영은 공식 API 계약 확인 후 연결합니다.
        </div>
      </aside>

      <main className="settings-page settings-standard-page">
        <header className="settings-standard-header">
          <div>
            <h1>설정</h1>
            <p>관리자 화면에서 사용할 페이지별 기능 노출, 기본 보기, 공통 표시 방식을 조정합니다.</p>
          </div>
          <div className="actions">
            <button className="btn" type="button">
              초기화
            </button>
            <button className="btn primary" type="button">
              변경사항 저장
            </button>
          </div>
        </header>

        <SettingsTabs />
      </main>
    </div>
  );
}
