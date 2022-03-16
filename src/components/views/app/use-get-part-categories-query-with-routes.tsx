import React from 'react'
import {GetPartCategoriesQuery, useGetPartCategoriesQuery} from "../../../services/schema";
import {Route, RouteGroup} from "../../../types/route";
import {useState} from "react";
import PartCategoryContainer from "../../smart/part-category/part-category-container";

export const useGetPartCategoriesQueryWithRoutes = (): {
    data: GetPartCategoriesQuery | undefined;
    categoriesLoading: boolean;
    categoriesRouteGroup: RouteGroup;
    categoriesRoutes: Route[];
} => {
    const [routes, setRoutes] = useState<Route[]>([])
    const {data, loading} = useGetPartCategoriesQuery({
        onCompleted: data1 => {
            setRoutes(data1.getPartCategories.map((pc) => {
                return {
                    name: pc.name,
                    title: pc.name,
                    exact: false,
                    navbar: true,
                    path: `/partCategory/${pc.part_category_id}`,
                    component: <PartCategoryContainer partCategory={pc}/>
                }
            }))
        }
    })

    return {
        data,
        categoriesLoading: loading,
        categoriesRouteGroup: {
            title: "Categories",
            routes: routes,
        },
        categoriesRoutes: routes
    }
}