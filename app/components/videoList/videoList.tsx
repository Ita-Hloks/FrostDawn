// 视频列表组件
import { VideoCard } from "@/components/videoList/cards/videoCard";

export function VideoList({ videos }: { videos: VideoData[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {videos.map(video => (
        <VideoCard key={video.aid} video={video} />
      ))}
    </div>
  );
}
