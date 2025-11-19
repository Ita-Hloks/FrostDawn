import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import SidebarContent from "@/components/banner/sidebarContent";

export default function Topbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  // 关闭移动端菜单
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // 切换移动端菜单
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // 点击外部关闭移动端菜单
  useEffect(() => {
    if (!isMobileMenuOpen)
      return;

    const handleClickOutside = (event: Event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeMobileMenu();
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileMenuOpen, closeMobileMenu]);
  // 侧边栏内容组件
  return (
    <>
      {/* 移动端顶部栏 */}
      <div className="lg:hidden bg-base-200/50 border-b border-base-300 p-3 gap-3">
        <button
          type="button"
          aria-label="菜单"
          aria-expanded={isMobileMenuOpen}
          className="btn btn-square btn-ghost btn-sm"
          onClick={toggleMobileMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* 移动端遮罩层 */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={closeMobileMenu} />
      )}

      {/* 移动端抽屉式侧边栏 */}
      <div
        ref={sidebarRef}
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-base-200 z-50 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col border-r border-base-300`}
      >
        <SidebarContent onNavigate={navigate} onClose={closeMobileMenu} />
      </div>

      {/* 桌面端侧边栏 */}
      <div className="hidden lg:flex h-full flex-col bg-base-200/50 border-r border-base-300">
        <SidebarContent onNavigate={navigate} />
      </div>
    </>
  );
}
