import React from "react";

export function HomePage() {
  return (
    <main
      className="min-h-screen transition-all duration-300 bg-gradient-to-br from-pink-100 via-sky-200 to-sky-500 dark:from-gray-950 dark:via-slate-900 dark:to-amber-950 relative overflow-y-auto "
    >
      {/* 内容区域 */}
      <div className="relative z-10">
        {/* 首屏区域 - 简洁视图 */}
        <div className="min-h-screen flex flex-col justify-center items-center p-6">
          <div className="w-full max-w-4xl">
            {/* 欢迎区域 */}
            <div className="mb-12 text-center">
              <h1 className="text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-red-400 dark:to-amber-400">
                FrostDawn
              </h1>
            </div>
            {/* 向下滚动提示 */}
            <div className="mt-12 text-center">
              <p className="base-content text-sm mb-4">向下滚动查看更多内容</p>
              <div className="animate-bounce">
                <svg
                  className="w-6 h-6 mx-auto text-base-content"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 下方内容区域 */}
        <div className="max-w-7xl mx-auto p-6 pb-20">

          {/* 底部提示 */}
          <div className="mt-8 text-center text-gray-300 text-sm">
            <p>FrostDawn - 您的个性化信息中心</p>
          </div>
        </div>
      </div>
    </main>
  );
}
