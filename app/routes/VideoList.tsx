import { VideoListPage } from "@/components/videoList/videoListPage";

import type { Route } from "./+types/home";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "FrostDawn - 订阅列表" },
    { name: "description", content: "Welcome to FrostDawn" },
  ];
}

export default function VideoList() {
  return <VideoListPage />;
}
