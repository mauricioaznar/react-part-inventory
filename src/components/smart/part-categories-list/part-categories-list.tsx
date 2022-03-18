import React from "react";
import { GetPartCategoriesQuery } from "../../../services/schema";
import PartCategoryContainer from "../part-category/part-category-container";

interface PartCategoriesListProps {
    partCategories: GetPartCategoriesQuery["getPartCategories"];
}

const PartCategoriesList = (props: PartCategoriesListProps) => {
    const { partCategories } = props;
    return (
        <>
            {partCategories.map((pc) => {
                return (
                    <PartCategoryContainer
                        key={pc.partCategoryId}
                        partCategory={pc}
                    />
                );
            })}
        </>
    );
};

export default PartCategoriesList;
