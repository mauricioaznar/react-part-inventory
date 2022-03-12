import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";
import { FormikDefaultProps } from "./common/formik-default-props";

interface FormikTextFieldProps extends FormikDefaultProps {
  type?: "text" | "password" | 'number';
}

export const FormikTextField = ({
  name,
  label,
  type = "text",
}: FormikTextFieldProps) => {
  const [formikProps, { error, touched }] = useField(name);

  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      type={type}
      error={touched && Boolean(error)}
      helperText={touched && error}
      {...formikProps}
      onInput={formikProps.onChange}
      name={formikProps.name}
      value={formikProps.value}
    />
  );
};

export default FormikTextField;
