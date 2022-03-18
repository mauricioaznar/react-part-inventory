import React from "react";
import { Box, Button, IconButton, TableCell, TableRow } from "@mui/material";
import { Form, Formik, FormikTouched } from "formik";
import * as yup from "yup";
import { SchemaOf } from "yup";
import FormikTextField from "../../dum/inputs/formik/formik-text-field";
import FormikTable from "../../dum/inputs/formik/formik-table";
import { Delete } from "@mui/icons-material";

type Post = { name: string };

interface ITestingForm {
    username: string;
    password: string;
    posts: Post[];
}

const TestingPage = () => {
    const validationSchema: SchemaOf<ITestingForm> = yup.object({
        username: yup.string().required("Username is required"),
        password: yup.string().required("Username is required"),
        posts: yup
            .array()
            .min(1, "Posts required minimum 1 post")
            .of(
                yup.object().shape({
                    name: yup.string().required("Name is required"),
                }),
            )
            .required("Required"),
    });

    const initialValues: ITestingForm = {
        username: "",
        password: "",
        posts: [
            {
                name: "",
            },
        ],
    };

    const initialTouched: FormikTouched<ITestingForm> = {
        username: false,
        password: false,
        posts: [
            {
                name: false,
            },
        ],
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
                    <FormikTable
                        renderHeader={() => {
                            return (
                                <TableRow>
                                    <TableCell width={"70%"}>Name</TableCell>
                                    <TableCell align={"right"}>
                                        Actions
                                    </TableCell>
                                </TableRow>
                            );
                        }}
                        renderRow={(i, index, deleteItem) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>
                                        <FormikTextField
                                            name={`posts[${index}].name`}
                                            label="Name"
                                        />
                                    </TableCell>
                                    <TableCell align={"right"}>
                                        <IconButton onClick={deleteItem}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        }}
                        defaultItem={{
                            name: "",
                        }}
                        name={"posts"}
                        label={"Posts"}
                    />
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
