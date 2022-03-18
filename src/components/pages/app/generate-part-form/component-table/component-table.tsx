import React from "react";
import { GetPartCategoriesQuery } from "../../../../../services/schema";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import { useFormikContext } from "formik";
import { IGeneratePartForm } from "../i-generate-part-context/i-generate-part-form";
import { convertToNumber } from "../../../../../helpers/convert-to-number";

interface IComponentTable {
    componentAssignments: GetPartCategoriesQuery["getPartCategories"][number]["parts"][number]["componentAssignments"];
}

const ComponentTable = (props: IComponentTable) => {
    const { componentAssignments } = props;

    const { values } = useFormikContext<IGeneratePartForm>();

    if (componentAssignments.length === 0) return null;

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Component</TableCell>
                    <TableCell>Available component quantity</TableCell>
                    <TableCell>Required quantity per part</TableCell>
                    <TableCell>Total required</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {componentAssignments.map(({ component, requiredQuantity }) => {
                    const partQuantity = convertToNumber(values.quantity);
                    const totalQuantity = partQuantity * requiredQuantity;
                    const hasEnough =
                        component.currentQuantity >= totalQuantity;
                    const tableCellColor = {
                        color: hasEnough ? undefined : "error.main",
                    };
                    return (
                        <TableRow key={component.partId}>
                            <TableCell sx={{ ...tableCellColor }}>
                                {component.name}
                            </TableCell>
                            <TableCell sx={{ ...tableCellColor }}>
                                {component.currentQuantity}
                            </TableCell>
                            <TableCell sx={{ ...tableCellColor }}>
                                {requiredQuantity}
                            </TableCell>
                            <TableCell sx={{ ...tableCellColor }}>
                                {totalQuantity}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default ComponentTable;
