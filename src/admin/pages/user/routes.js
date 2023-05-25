import { Edit } from "./Edit";
import { Add } from "./Add";

export const userAdminRoutes = [
  {
    path: "add",
    component: <Add />,
  },
  {
    path: "edit/:slug",
    component: <Edit />,
  },
];
