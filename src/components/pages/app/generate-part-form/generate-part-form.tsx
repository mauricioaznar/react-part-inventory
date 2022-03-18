import React from "react";
import { Box, Button, IconButton, Modal, Toolbar } from "@mui/material";
import * as yup from "yup";
import { SchemaOf } from "yup";
import {
    Query,
    useCraftPartMutation,
    useFarmPartMutation,
} from "../../../../services/schema";
import { nameof } from "../../../../helpers/nameof";
import { useGeneratePartContext } from "./i-generate-part-context/generate-part-context";
import Typography from "@mui/material/Typography";
import { useActions } from "../../../../hooks/redux-hooks/use-actions";
import ClearIcon from "@mui/icons-material/Clear";
import { Form, Formik, FormikTouched } from "formik";
import { IGeneratePartForm } from "./i-generate-part-context/i-generate-part-form";
import ComponentTable from "./component-table/component-table";
import QuantityInput from "./quantity-input/quantity-input";
import { convertToNumber } from "../../../../helpers/convert-to-number";

const GeneratePartForm = () => {
    const { open, setOpen, mode, part } = useGeneratePartContext();

    const { pushSuccessMessage } = useActions();

    const [craftPartMutation, { loading: isCraftMutationLoading }] =
        useCraftPartMutation({
            update(cache) {
                cache.evict({
                    id: "ROOT_QUERY",
                    fieldName: nameof<Query>("getPartCategories"),
                });
            },
        });

    const [farmPartMutation, { loading: isFarmMutationLoading }] =
        useFarmPartMutation({
            update(cache) {
                cache.evict({
                    id: "ROOT_QUERY",
                    fieldName: nameof<Query>("getPartCategories"),
                });
            },
        });

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
            if (mode === "craft" && part !== null) {
                await craftPartMutation({
                    variables: {
                        craftInput: {
                            part_id: part.part_id,
                            quantity: Number(quantity),
                        },
                    },
                });
                pushSuccessMessage(`${part.name} successfully crafted!`);
            } else if (mode === "farm" && part !== null) {
                await farmPartMutation({
                    variables: {
                        farmInput: {
                            part_id: part.part_id,
                            quantity: Number(quantity),
                        },
                    },
                });
                pushSuccessMessage(`${part.name} successfully added!`);
            }
            setOpen(false);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <Modal
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            keepMounted={false}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 700,
                    bgcolor: "background.paper",
                    borderRadius: "0.5rem",
                    boxShadow: 24,
                    overflow: "hidden",
                }}
            >
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
                                    part !== null
                                        ? part.componentAssignments
                                        : []
                                }
                            />
                            <Button
                                disabled={
                                    isFarmMutationLoading ||
                                    isCraftMutationLoading
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
            </Box>
        </Modal>
    );
};

export default GeneratePartForm;
