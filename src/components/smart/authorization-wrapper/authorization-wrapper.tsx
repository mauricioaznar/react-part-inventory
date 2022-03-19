import React, { useEffect } from "react";
import { useTypedSelector } from "../../../hooks/redux-hooks/use-typed-selector";
import LoginForm from "../../pages/auth/login-form";
import { useCurrentUserLazyQuery } from "../../../services/schema";
import { useActions } from "../../../hooks/redux-hooks/use-actions";
import FullScreenLoader from "../../dum/loaders/full-screen-loader";

interface AuthorizationWrapperProps {
    children: React.ReactElement<any, any> | null;
}

const AuthorizationWrapper = (props: AuthorizationWrapperProps) => {
    // auth
    const { accessToken, currentUser } = useTypedSelector(
        (state) => state.auth,
    );

    const { login, setCurrentUser } = useActions();

    const [getCurrentUser, { data, loading: currentUserLoading }] =
        useCurrentUserLazyQuery();

    useEffect(() => {
        console.log(accessToken)
        if (accessToken !== null) {
            void getCurrentUser()
        }
    }, [accessToken]);

    useEffect(() => {
        if (data?.currentUser.username) {
            setCurrentUser(data.currentUser);
            login(window.localStorage.getItem("token")!);
        }
    }, [data]);

    return currentUserLoading ? (
        <FullScreenLoader />
    ) : !currentUser ? (
        <LoginForm />
    ) : (
        props.children
    );
};

export default AuthorizationWrapper;
