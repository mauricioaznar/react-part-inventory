import React from "react";
import FormikTextField from "../../../../dum/inputs/formik/formik-text-field";

const QuantityInput = () => {
    return (
        <FormikTextField name="quantity" label="Quantity" autoFocus={false} />
    );
};

export default QuantityInput;
