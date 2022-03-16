import React, {useState} from 'react'
import {useGetPartCategoriesQuery} from "../../../services/schema";
import {Route, RouteGroup} from "../../../types/route";
import PartCategoryContainer from "../../smart/part-category/part-category-container";

export const useGetPartCategoriesQueryWithRoutes = (): {
    categoriesRouteGroup: RouteGroup;
    categoriesRoutes: Route[];
} => {
    const [routes, setRoutes] = useState<Route[]>([])
    useGetPartCategoriesQuery({
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
        categoriesRouteGroup: {
            title: "Categories",
            routes: routes,
        },
        categoriesRoutes: routes
    }
}