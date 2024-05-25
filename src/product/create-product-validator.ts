import { body } from "express-validator";

export default [
    body("name")
        .exists()
        .withMessage("category name is required")
        .isString()
        .withMessage("Category name should be a string"),
    body("description").exists().withMessage("description is required"),
    body("priceConfiguration")
        .exists()
        .withMessage("Price configuration is required"),
    body("attribute").exists().withMessage("Attribute field is required"),
    body("tenantId").exists().withMessage("tenant id is required"),
    body("categoryId").exists().withMessage("category id is required"),
    // body("image").custom((value, { req }) => {
    //     if (!req.file) throw new Error("Product image is required");
    //     return true;
    // }),
];
