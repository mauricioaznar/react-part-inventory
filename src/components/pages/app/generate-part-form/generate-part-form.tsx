import React from "react";
import { Box, Button, IconButton, Toolbar } from "@mui/material";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { useGeneratePartContext } from "./i-generate-part-context/generate-part-context";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import { Form, Formik, FormikTouched } from "formik";
import { IGeneratePartForm } from "./i-generate-part-context/i-generate-part-form";
import ComponentTable from "./component-table/component-table";
import QuantityInput from "./quantity-input/quantity-input";
import { convertToNumber } from "../../../../helpers/convert-to-number";
import { useGeneratePartMutationsWithSideEffects } from "./use-generate-part-mutations-with-side-effects/use-generate-part-mutations-with-side-effects";
import { FadeModal } from "../../../dum/fade-modal/fade-modal";

const GeneratePartForm = () => {
    const { open, setOpen, mode, part } = useGeneratePartContext();

    const {
        craftPartMutation,
        farmPartMutation,
        isCraftMutationLoading,
        isFarmMutationLoading,
    } = useGeneratePartMutationsWithSideEffects(part);

    const initialValues: IGeneratePartForm = {
        quantity: 1,
    };

    const initialTouched: FormikTouched<IGeneratePartForm> = {
        quantity: true,
    };

    const validationSchema: SchemaOf<IGeneratePartForm> = yup.object({
        quantity: yup
            .number()
            .min(1)
            .required("Quantity is required")
            .test("enough_quantity", "Not enough components", (quantity) => {
                if (part !== null && part.componentAssignments.length > 0) {
                    const partQuantity = convertToNumber(quantity);
                    return part.componentAssignments.every(
                        (componentAssignment) => {
                            return (
                                partQuantity *
                                    componentAssignment.requiredQuantity <=
                                componentAssignment.component.currentQuantity
                            );
                        },
                    );
                }
                return true;
            }),
    });

    async function handleSubmit(data: IGeneratePartForm) {
        const { quantity } = data;
        try {
            if (part !== null) {
                if (mode === "craft") {
                    await craftPartMutation({
                        variables: {
                            craftInput: {
                                partId: part.partId,
                                quantity: Number(quantity),
                            },
                        },
                    });
                } else if (mode === "farm") {
                    await farmPartMutation({
                        variables: {
                            farmInput: {
                                partId: part.partId,
                                quantity: Number(quantity),
                            },
                        },
                    });
                }
            }
            setOpen(false);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <FadeModal open={open}>
            <Toolbar
                sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: "secondary.main",
                }}
            >
                <Typography variant={"h4"} sx={{ flexGrow: 1 }}>
                    {mode}
                </Typography>
                <IconButton
                    color="inherit"
                    size={"small"}
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    <ClearIcon />
                </IconButton>
            </Toolbar>
            <Box sx={{ px: 2, pt: 2 }}>
                <Formik
                    initialValues={initialValues}
                    initialTouched={initialTouched}
                    validateOnMount={true}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <QuantityInput />
                        <ComponentTable
                            componentAssignments={
                                part !== null ? part.componentAssignments : []
                            }
                        />
                        <Button
                            disabled={
                                isFarmMutationLoading || isCraftMutationLoading
                            }
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
        </FadeModal>
    );
};

export default GeneratePartForm;
