import React from 'react';
import {GetPartCategoriesQuery} from "../../../../../services/schema";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useFormikContext} from "formik";
import {IGeneratePartForm} from "../i-generate-part-context/i-generate-part-form";

interface IComponentTable {
    components: GetPartCategoriesQuery["getPartCategories"][number]["parts"][number]["components"]
}

const ComponentTable = (props: IComponentTable) => {
    const {components} = props

    const { values } = useFormikContext<IGeneratePartForm>();

    if (components.length === 0) return null

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Component
                    </TableCell>
                    <TableCell>
                        Available component quantity
                    </TableCell>
                    <TableCell>
                        Required quantity per part
                    </TableCell>
                    <TableCell>
                        Total required
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    components.map(({ component, required_quantity }) => {
                        const valuesQuantity = Number(values.quantity !== '' ? values.quantity : 0)
                        const totalQuantity = (Number.isNaN(valuesQuantity) ? 0 : valuesQuantity) * required_quantity
                        const hasEnough = component.current_quantity >= totalQuantity
                        const tableCellColor = {
                            color: hasEnough ? undefined : "error.main"
                        }
                        return (
                            <TableRow key={component.part_id}>
                                <TableCell sx={{...tableCellColor}}>
                                    {
                                        component.name
                                    }
                                </TableCell>
                                <TableCell sx={{...tableCellColor}}>
                                    {
                                        component.current_quantity
                                    }
                                </TableCell>
                                <TableCell sx={{...tableCellColor}}>
                                    {
                                        required_quantity
                                    }
                                </TableCell>
                                <TableCell sx={{...tableCellColor}}>
                                    {
                                        totalQuantity
                                    }
                                </TableCell>
                            </TableRow>
                        )
                    })
                }

            </TableBody>
        </Table>
    );
};

export default ComponentTable;