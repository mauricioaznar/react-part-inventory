import {
    useCraftPartMutation,
    useFarmPartMutation,
} from "../../../../../services/schema";
import { useActions } from "../../../../../hooks/redux-hooks/use-actions";
import { GeneratePartFormPart } from "../i-generate-part-context/generate-part-context";
import { clearClientQueryCache } from "../../../../../helpers/clear-client-query-cache";
import { ApolloCache } from "@apollo/client";

export function useGeneratePartMutationsWithSideEffects(
    part: GeneratePartFormPart,
) {
    const { pushMessage } = useActions();

    const [craftPartMutation, { loading: isCraftMutationLoading }] =
        useCraftPartMutation({
            update(cache) {
                handleUpdate(cache);
            },
        });

    const [farmPartMutation, { loading: isFarmMutationLoading }] =
        useFarmPartMutation({
            update(cache) {
                handleUpdate(cache);
            },
        });

    function handleUpdate(cache: ApolloCache<any>) {
        if (part !== null) {
            pushMessage({
                message: `${part!.name} successfully added!`,
                options: {
                    variant: "success",
                },
            });
            clearClientQueryCache(cache, "getPartCategories");
        }
    }

    return {
        craftPartMutation,
        isCraftMutationLoading,
        farmPartMutation,
        isFarmMutationLoading,
    };
}
