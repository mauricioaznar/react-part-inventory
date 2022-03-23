import React, { useEffect, useState } from "react";
import { useGetPartCategoriesQuery } from "../../../services/schema";
import { Route, RouteGroup } from "../../../types/route";
import PartCategoryContainer from "../../smart/part-category/part-category-container";
import PartCategoriesList from "../../smart/part-categories-list/part-categories-list";
import { getPartCategoryRouteName } from "../../../helpers/get-part-category-route-name";
import { SnackbarKey, useSnackbar } from "notistack";

export const useGetPartCategoriesQueryWithRoutes = (): {
    categoriesRouteGroup: RouteGroup;
    categoriesRoutes: Route[];
    hasSetupCompleted: boolean;
} => {
    const [routes, setRoutes] = useState<Route[]>([]);
    const [messageKeys, setMessageKeys] = useState<SnackbarKey[]>([]);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    // use notifyOnNetworkStatusChange so that loading changes to true when it refetches
    const { data, previousData, loading } = useGetPartCategoriesQuery({
        notifyOnNetworkStatusChange: true,
    });
    const [hasSetupCompleted, setHasSetupCompleted] = useState(false);

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
                            path: getPartCategoryRouteName(pc.partCategoryId),
                            component: (
                                <PartCategoryContainer partCategory={pc} />
                            ),
                        };
                    }),
                ),
            );
            setHasSetupCompleted(true);
        }

        const timeout = setTimeout(() => {
            if (previousData !== undefined) {
                if (loading) {
                    const key = enqueueSnackbar("Refetching...", {
                        variant: "info",
                        persist: true,

                    });
                    setMessageKeys([...messageKeys, key])
                } else {
                    closeSnackbar(messageKeys[0]);
                    setMessageKeys(messageKeys.slice(1, messageKeys.length))
                }
            }
        }, 200)

        return () => {
            clearTimeout(timeout)
        }
    }, [data]);

    return {
        categoriesRouteGroup: {
            title: "Categories",
            routes: routes,
        },
        categoriesRoutes: routes,
        hasSetupCompleted,
    };
};
