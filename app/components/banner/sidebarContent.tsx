import ThemeToggle from "@/components/common/switchTheme/themeToggle";
import { Icon_Circle, Icon_Home, Icon_Starry } from "@/icons";

type SidebarContentProps = {
  onNavigate: (path: string) => void;
  onClose?: () => void;
};

export default function SidebarContent({ onNavigate, onClose }: SidebarContentProps) {
  return (
    <>
      {/* Logo 区域 */}
      <div className="p-4 flex justify-center border-b border-base-300">
        <Icon_Circle />
      </div>

      {/* 导航菜单 */}
      <nav className="flex-1 flex flex-col gap-2 p-4">
        <button
          onClick={() => {
            onNavigate("/");
            onClose?.();
          }}
          type="button"
          className="btn btn-ghost justify-start gap-3 font-normal"
        >
          <Icon_Home />
          <span>主页</span>
        </button>

        <button
          onClick={() => {
            onNavigate("/subscribeVideo");
            onClose?.();
          }}
          type="button"
          className="btn btn-ghost justify-start gap-3 font-normal"
        >
          <Icon_Starry />
          <span>推荐</span>
        </button>
      </nav>

      {/* 底部主题切换 */}
      <div className="p-4 border-t border-base-300">
        <ThemeToggle />
      </div>
    </>
  );
}
