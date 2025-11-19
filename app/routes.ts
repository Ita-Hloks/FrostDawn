import type { RouteConfig } from "@react-router/dev/routes";
import { index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/dashBoard.tsx", [
    index("routes/home.tsx"),
    route("subscribeVideo", "routes/subscribeVideo.tsx"),
  ]),
] satisfies RouteConfig;
