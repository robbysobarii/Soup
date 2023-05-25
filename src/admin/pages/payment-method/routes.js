import { Edit } from "./Edit";
import { Add } from "./Add";

export const paymentRoutes = [
  {
    path: "add",
    component: <Add />,
  },
  {
    path: "edit/:slug",
    component: <Edit />,
  },
];
