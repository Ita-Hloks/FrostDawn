import type { Route } from "./+types/home";
import { VideoListPage } from "@/components/videoList/videoListPage";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "订阅内容 - FrostDawn" },
    { name: "description", content: "Welcome to FrostDawn" },
  ];
}

export default function SubscribeVideo() {
  return <VideoListPage />;
}
