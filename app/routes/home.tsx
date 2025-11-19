import type { Route } from "./+types/home";
import { HomePage } from "@/components/home/homePage";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "工作站 - FrostDawn" },
    { name: "description", content: "Welcome to FrostDawn" },
  ];
}

export default function Home() {
  return <HomePage />;
}
