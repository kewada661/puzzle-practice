import {
  type RouteConfig,
  index,
  route
} from '@react-router/dev/routes';

const routes: RouteConfig = [
  index("./routes/home.tsx"),
  route("*", "./routes/catchall.tsx")
]

export default routes;
