import { Outlet } from "react-router";
import Topbar from "@/components/banner/topBanner";
import type { Route } from "./+types/home";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "FrostDawn" },
    { name: "description", content: "Welcome to FrostDawn" },
  ];
}

export default function DashBoard() {
  return (
    <div className="h-dvh w-screen">
      {/* 移动端: 顶部栏 + 主内容 */}
      <div className="lg:hidden h-full grid grid-rows-[auto_1fr] overflow-auto">
        <Topbar />
        <Outlet />
      </div>
      {/* 桌面端: 左侧边栏 + 主内容 */}
      <div className="hidden lg:grid h-full grid-cols-[200px_1fr] overflow-hidden">
        <Topbar />
        <div className="overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
