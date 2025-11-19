import type { RouteConfig } from "@react-router/dev/routes";

import { index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/dashBoard.tsx", [
    index("routes/home.tsx"),
    route("videoList", "routes/videoList.tsx"),
  ]),
] satisfies RouteConfig;
