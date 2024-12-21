import { Router } from "express";
import adminRouter from "../modules/admin/admin.route";
import authRouter from "../modules/auth/auth.route";
import blogRouter from "../modules/blog/blog.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/blogs",
    route: blogRouter,
  },
  {
    path: "/admin",
    route: adminRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
