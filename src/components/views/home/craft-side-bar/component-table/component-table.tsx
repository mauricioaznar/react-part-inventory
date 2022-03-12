import React from 'react';
import {GetPartCategoriesQuery} from "../../../../../services/schema";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useFormikContext} from "formik";
import {IGeneratePartForm} from "../i-generate-part-form";

interface IComponentTable {
    components: GetPartCategoriesQuery["getPartCategories"][number]["parts"][number]["components"]
}

const ComponentTable = (props: IComponentTable) => {
    const {components} = props

    const { values } = useFormikContext<IGeneratePartForm>();

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Component
                    </TableCell>
                    <TableCell>
                        Required quantity per part
                    </TableCell>
                    <TableCell>
                        Total
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    components.map(({ component, required_quantity }) => {
                        const valuesQuantity = Number(values.quantity !== '' ? values.quantity : 0)
                        const totalQuantity = (Number.isNaN(valuesQuantity) ? 0 : valuesQuantity) * required_quantity


                        return (
                            <TableRow key={component.part_id}>
                                <TableCell>
                                    {
                                        component.name
                                    }
                                </TableCell>
                                <TableCell>
                                    {
                                        required_quantity
                                    }
                                </TableCell>
                                <TableCell>
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