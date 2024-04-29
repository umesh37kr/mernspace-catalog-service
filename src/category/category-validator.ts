import { body } from "express-validator";

export default [
    body("name")
        .exists()
        .withMessage("category name is required")
        .isString()
        .withMessage("Category name should be a string"),
    body("priceConfiguration")
        .exists()
        .withMessage("Price configuration is required"),
    body("priceConfiguration.*.priceType")
        .exists()
        .withMessage("Price type is required")
        .custom((value: "base" | "additional") => {
            const validKeys = ["base", "additional"];
            if (!validKeys.includes(value)) {
                throw new Error(
                    `${value} is invalid attribute for price type field. Possible values are : [${validKeys.join(
                        ", ", // base, additional
                    )}]`,
                );
            }
            return true;
        }),
    body("attribute").exists().withMessage("Attribute field is required"),
];
