import React from "react";

export function VideoCard({ video }: { video: VideoData }) {
  const formatNumber = (num: number) => {
    if (num >= 10000) {
      return `${(num / 10000).toFixed(1)}万`;
    }
    return num.toString();
  };

  const formatDuration = (length: string) => {
    return length;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("zh-CN");
  };

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      {/* 封面图 */}
      <div className="relative aspect-video bg-gray-200">
        <img
          src={video.pic}
          alt={video.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {formatDuration(video.length)}
        </div>
      </div>

      {/* 视频信息 */}
      <div className="p-3">
        {/* 标题 */}
        <h3 className="text-sm font-medium line-clamp-2 mb-2 min-h-[40px]">
          {video.title}
        </h3>

        {/* UP主 */}
        <div className="text-xs text-gray-600 mb-2">
          {video.author}
        </div>

        {/* 统计信息 */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                />
              </svg>
              {formatNumber(video.play)}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"
                />
              </svg>
              {formatNumber(video.comment)}
            </span>
          </div>
          <span>{formatDate(video.created)}</span>
        </div>

        {/* 合集信息 */}
        {video.meta && (
          <div className="mt-2 pt-2 border-t border-gray-100">
            <div className="text-xs text-blue-600 truncate">
              合集:
              {" "}
              {video.meta.title}
              {" "}
              (
              {video.meta.ep_count}
              集)
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
