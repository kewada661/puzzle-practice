import {
  type RouteConfig,
  index,
  layout,
  route
} from '@react-router/dev/routes';

const routes: RouteConfig = [
  layout("./routes/layout.tsx", [
    index("./routes/home.tsx"),
    route("/oll", "./routes/oll.tsx"),
    route("/pll", "./routes/pll.tsx"),
    route("/times", "./routes/times.tsx"),
  ]),

  route("*", "./routes/catchall.tsx")
]

export default routes;
