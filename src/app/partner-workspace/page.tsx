import type { Metadata } from "next";
import { PartnerWorkspace } from "./partner-workspace";

export const metadata: Metadata = {
  title: "Design Print Hub 디자이너 작업실",
  description: "Design Print Hub 디자이너/협업업체 배정 프로젝트 화면"
};

export default function PartnerWorkspacePage() {
  return <PartnerWorkspace />;
}
