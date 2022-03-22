import { ApolloCache } from "@apollo/client";
import { Query } from "../services/schema";

export function clearClientQueryCache(
    cache: ApolloCache<any>,
    key: keyof Query,
) {
    cache.evict({
        id: "ROOT_QUERY",
        fieldName: key,
    });
}
