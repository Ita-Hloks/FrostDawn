import { useLocalStorage, useMediaQuery } from "@/components/common/switchTheme/useLocalStorage";
import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  // 存储用户最后一次选择的主题。null 表示用户未选择过（使用系统偏好）
  const [savedTheme, setSavedTheme] = useLocalStorage<"light" | "dark">("theme", "light");
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)", false);

  // 计算最终应使用的主题：用户选择优先，否则系统偏好，默认 light
  const effectiveTheme: "light" | "dark" = savedTheme ?? (prefersDark ? "dark" : "light");

  // 标记是否已在客户端挂载
  const [mounted, setMounted] = useState(false);

  // 用于UI显示的当前主题
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  // 客户端挂载后，从DOM读取真实主题
  useEffect(() => {
    setMounted(true);
    if (typeof document !== "undefined") {
      const htmlTheme = document.documentElement.getAttribute("data-theme") as "light" | "dark";
      if (htmlTheme) {
        setCurrentTheme(htmlTheme);
      }
    }
  }, []);

  // 当effectiveTheme变化时，同步到DOM和state
  useEffect(() => {
    if (!mounted || typeof document === "undefined")
      return;

    const html = document.documentElement;
    if (html.getAttribute("data-theme") !== effectiveTheme) {
      html.setAttribute("data-theme", effectiveTheme);
    }
    setCurrentTheme(effectiveTheme);
  }, [effectiveTheme, mounted]);

  const toggle = () => {
    const next = effectiveTheme === "dark" ? "light" : "dark";
    setSavedTheme(next);
  };

  // SSR时渲染占位符，避免hydration不匹配
  if (!mounted) {
    return (
      <button
        aria-label="切换主题"
        className="swap swap-rotate w-8 h-8"
        type="button"
        disabled
      >
        <svg
          className="w-8 h-8 fill-current opacity-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Z" />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={currentTheme === "dark"}
      aria-label="切换主题"
      className="swap swap-rotate w-8 h-8"
      type="button"
    >
      {/* sun icon */}
      <svg
        className={`${currentTheme === "dark" ? "swap-on" : "swap-off"} w-8 h-8 fill-current`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
      </svg>

      {/* moon icon */}
      <svg
        className={`${currentTheme === "dark" ? "swap-off" : "swap-on"} w-8 h-8 fill-current`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
      </svg>
    </button>
  );
}
