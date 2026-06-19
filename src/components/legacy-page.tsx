"use client";

import { useEffect } from "react";

type LegacyPageProps = {
  html: string;
  scripts: string[];
};

export function LegacyPage({ html, scripts }: LegacyPageProps) {
  useEffect(() => {
    const loadedScripts: HTMLScriptElement[] = [];
    const settingsButton = document.querySelector<HTMLButtonElement>(".nav button:last-child");
    let cancelled = false;

    function openSettingsPage() {
      window.location.href = "/settings";
    }

    if (settingsButton) {
      settingsButton.addEventListener("click", openSettingsPage);
      settingsButton.setAttribute("aria-label", "설정 페이지로 이동");
    }

    function loadScript(index: number) {
      if (cancelled || index >= scripts.length) return;

      const script = document.createElement("script");
      script.src = scripts[index];
      script.async = false;
      script.onload = () => loadScript(index + 1);
      script.onerror = () => loadScript(index + 1);
      document.body.appendChild(script);
      loadedScripts.push(script);
    }

    loadScript(0);

    return () => {
      cancelled = true;
      settingsButton?.removeEventListener("click", openSettingsPage);
      loadedScripts.forEach((script) => script.remove());
    };
  }, [scripts]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
