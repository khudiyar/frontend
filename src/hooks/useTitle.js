import { useEffect } from "react";

export function useTitle(pageTitle) {
    useEffect(() => {
        const baseTitle = document.title.split(" | ")[0];
        document.title = pageTitle ? `${baseTitle} | ${pageTitle}` : baseTitle;

        return () => {
            document.title = baseTitle;
        };
    }, [pageTitle]);
}