import { Welcome } from "@/components/welcome";
import type { Route } from "./+types/home";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "FrostDawn - 主页" },
    { name: "description", content: "Welcome to FrostDawn" },
  ];
}

export default function Home() {
  return <Welcome />;
}
