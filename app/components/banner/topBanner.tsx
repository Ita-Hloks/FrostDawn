import ThemeToggle from "@/components/common/switchTheme/themeToggle";
import { Icon_Circle, Icon_Home, Icon_Menu, Icon_Starry } from "@/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

export default function Topbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const desktopSidebarRef = useRef<HTMLDivElement>(null);

  // 关闭移动端菜单
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleNavigation = useCallback((path: string) => {
    navigate(path);
    closeMobileMenu();
  }, [navigate, closeMobileMenu]);

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
      <div className="lg:hidden bg-base-200 border-base-300 p-3 gap-3 transition-all duration-300">
        <button
          type="button"
          aria-label="菜单"
          aria-expanded={isMobileMenuOpen}
          className="btn btn-square btn-ghost btn-sm"
          onClick={toggleMobileMenu}
        >
          <Icon_Menu />
        </button>
      </div>

      {/* 移动端遮罩层 */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={closeMobileMenu} />
      )}

      {/* 移动端抽屉式侧边栏 */}
      <div
        ref={sidebarRef}
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-base-200 z-50 transition-all duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col border-r`}
      >
        {/* Logo 区域 */}
        <div className="p-4 flex justify-center transition-all duration-300">
          <Icon_Circle />
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 flex flex-col gap-2 p-4 transition-all duration-300">
          <button
            onClick={() => {
              handleNavigation("/");
            }}
            type="button"
            className="btn btn-ghost font-normal justify-start gap-3"
          >
            <Icon_Home />
            <span className="whitespace-nowrap opacity-100 w-auto">
              主页
            </span>
          </button>

          <button
            onClick={() => handleNavigation("/subscribeVideo")}
            type="button"
            className="btn btn-ghost font-normal justify-start gap-3 transition-all duration-300"
          >
            <Icon_Starry />
            <span className="whitespace-nowrap opacity-100 w-auto">
              推荐
            </span>
          </button>
        </nav>

        {/* 底部主题切换 */}
        <div className="p-4 border-t">
          <ThemeToggle />
        </div>
      </div>

      {/* 桌面端侧边栏 - 固定定位悬浮展开 */}
      <div
        ref={desktopSidebarRef}
        className="hidden lg:flex fixed h-full flex-col bg-base-200 transition-all duration-300 z-40 w-16"
      >
        {/* Logo 区域 */}
        <div className="p-3 flex border-b justify-center">
          <Icon_Circle />
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 flex flex-col gap-1 ml-2 p-2">
          <button
            onClick={() => handleNavigation("/")}
            type="button"
            className="btn btn-ghost btn-sm btn-base-200 btn-square transition-all duration-300"
          >
            <Icon_Home />
          </button>

          <button
            onClick={() => handleNavigation("/subscribeVideo")}
            type="button"
            className="btn btn-ghost btn-sm btn-base-200 btn-square"
          >
            <Icon_Starry />
          </button>
        </nav>

        {/* 底部主题切换 */}
        <div className="p-2 flex btn-square justify-center transition-all duration-300">
          <ThemeToggle />
        </div>
      </div>

      {/* 桌面端占位符 - 保持布局 */}
      <div className="hidden lg:block w-16 flex-shrink-0" />
    </>
  );
}
