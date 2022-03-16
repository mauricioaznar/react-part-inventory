import React, {useEffect, useState} from 'react'
import {useGetPartCategoriesQuery} from "../../../services/schema";
import {Route, RouteGroup} from "../../../types/route";
import PartCategoryContainer from "../../smart/part-category/part-category-container";

export const useGetPartCategoriesQueryWithRoutes = (): {
    categoriesRouteGroup: RouteGroup;
    categoriesRoutes: Route[];
    getPartCategoriesLoading: boolean;
} => {
    const [routes, setRoutes] = useState<Route[]>([])

    // onCompleted is not reliable
    const {data, loading} = useGetPartCategoriesQuery()

    useEffect(() => {
        if (data !== undefined) {
            setRoutes(data.getPartCategories.map((pc) => {
                return {
                    name: pc.name,
                    title: pc.name,
                    exact: false,
                    navbar: true,
                    path: `/partCategory/${pc.part_category_id}`,
                    component: <PartCategoryContainer  partCategory={pc} />
                }
            }))
        }
    }, [data])

    return {
        categoriesRouteGroup: {
            title: "Categories",
            routes: routes,
        },
        categoriesRoutes: routes,
        getPartCategoriesLoading: loading
    }
}