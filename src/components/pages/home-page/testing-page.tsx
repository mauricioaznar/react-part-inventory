import React from "react";
import { Box, Button } from "@mui/material";
import { Form, Formik, FormikTouched } from "formik";
import * as yup from "yup";
import { SchemaOf } from "yup";
import FormikTextField from "../../dum/inputs/formik/formik-text-field";

interface ITestingForm {
    username: string;
    password: string;
}

const TestingPage = () => {
    const validationSchema: SchemaOf<ITestingForm> = yup.object({
        username: yup.string().required("Username is required"),
        password: yup.string().required("Username is required"),
    });

    const initialValues: ITestingForm = {
        username: "",
        password: "",
    };

    const initialTouched: FormikTouched<ITestingForm> = {
        username: false,
        password: false,
    };

    function handleSubmit() {
        // console.log(data);
    }

    return (
        <Box sx={{ px: 2, pt: 2 }}>
            <Formik
                initialValues={initialValues}
                initialTouched={initialTouched}
                validationSchema={validationSchema}
                validateOnMount={true}
                enableReinitialize={true}
                onSubmit={handleSubmit}
            >
                <Form>
                    <FormikTextField name={"username"} label={"username"} />
                    <FormikTextField name={"password"} label={"password"} />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>
                </Form>
            </Formik>
        </Box>
    );
};

export default TestingPage;
