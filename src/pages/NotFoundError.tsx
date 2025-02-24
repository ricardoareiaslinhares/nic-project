import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const NotFoundError = () => {
    const error = useRouteError();

    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Lamentamos, ocorreu um erro inesperado.</p>
            <p>
                <i>
                    {isRouteErrorResponse(error)
                        ? error.statusText
                        : error instanceof Error
                        ? error.message
                        : "Unknown error"}
                </i>
            </p>
        </div>
    );
};

export default NotFoundError;