import express from "express";
const router = express.Router();

import { ProductController } from "./product-controller";
import authenticate from "../common/middlewares/authenticate";
import { canAccess } from "../common/middlewares/canAccess";
import { Roles } from "../common/constants";
import { asyncWrapper } from "../common/utils/wrapper";
import createProductValidator from "./create-product-validator";

const productController = new ProductController();

router.post(
    "/",
    authenticate,
    canAccess([Roles.ADMIN, Roles.MANAGER]),
    createProductValidator,
    asyncWrapper(productController.create),
);

export default router;
