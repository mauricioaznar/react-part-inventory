import React, { useEffect, useState } from "react";
import { useGetPartCategoriesQuery } from "../../../services/schema";
import { Route, RouteGroup } from "../../../types/route";
import PartCategoryContainer from "../../smart/part-category/part-category-container";
import PartCategoriesList from "../../smart/part-categories-list/part-categories-list";
import { getPartCategoryRouteName } from "../../../helpers/get-part-category-route-name";

export const useGetPartCategoriesQueryWithRoutes = (): {
    categoriesRouteGroup: RouteGroup;
    categoriesRoutes: Route[];
    hasSetupCompleted: boolean;
} => {
    const [routes, setRoutes] = useState<Route[]>([]);

    // onCompleted is not reliable
    const { data } = useGetPartCategoriesQuery();
    const [hasSetupCompleted, setHasSetupCompleted] = useState(false)

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
                            path: getPartCategoryRouteName(pc.part_category_id),
                            component: (
                                <PartCategoryContainer partCategory={pc} />
                            ),
                        };
                    }),
                ),
            );
            setHasSetupCompleted(true)
        }
    }, [data]);

    return {
        categoriesRouteGroup: {
            title: "Categories",
            routes: routes,
        },
        categoriesRoutes: routes,
        hasSetupCompleted
    };
};
