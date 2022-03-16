import React, { useEffect, useState } from "react";
import { useGetPartCategoriesQuery } from "../../../services/schema";
import { Route, RouteGroup } from "../../../types/route";
import PartCategoryContainer from "../../smart/part-category/part-category-container";
import PartCategoriesList from "../../smart/part-categories-list/part-categories-list";

export const useGetPartCategoriesQueryWithRoutes = (): {
    categoriesRouteGroup: RouteGroup;
    categoriesRoutes: Route[];
    getPartCategoriesLoading: boolean;
} => {
    const [routes, setRoutes] = useState<Route[]>([]);

    // onCompleted is not reliable
    const { data, loading } = useGetPartCategoriesQuery();

    useEffect(() => {
        if (data !== undefined) {
            setRoutes(
                [
                    {
                        name: "AllCategories",
                        title: "All",
                        exact: false,
                        navbar: true,
                        path: `/partCategory/all`,
                        component: (
                            <PartCategoriesList
                                partCategories={data.getPartCategories}
                            />
                        ),
                    },
                ].concat(
                    data.getPartCategories.map((pc) => {
                        return {
                            name: pc.name,
                            title: pc.name,
                            exact: false,
                            navbar: true,
                            path: `/partCategory/${pc.part_category_id}`,
                            component: (
                                <PartCategoryContainer partCategory={pc} />
                            ),
                        };
                    }),
                ),
            );
        }
    }, [data]);

    return {
        categoriesRouteGroup: {
            title: "Categories",
            routes: routes,
        },
        categoriesRoutes: routes,
        getPartCategoriesLoading: loading,
    };
};
