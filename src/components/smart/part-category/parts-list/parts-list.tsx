import React from "react";
import { GetPartCategoriesQuery } from "../../../../services/schema";
import PartContainer from "./part-container/part-container";
import { Grid } from "@mui/material";

interface PartsListProps {
    parts: GetPartCategoriesQuery["getPartCategories"][number]["parts"];
}

const PartsList = (props: PartsListProps) => {
    const { parts } = props;

    return (
        <Grid
            container
            direction="row"
            flexWrap={"wrap"}
            margin={"auto"}
            sx={{ my: 4 }}
            rowSpacing={2}
        >
            {parts.map((p) => (
                <Grid key={p.partId} item xs={4} sm={2} md={1.5}>
                    <PartContainer part={p} />
                </Grid>
            ))}
        </Grid>
    );
};

export default PartsList;
