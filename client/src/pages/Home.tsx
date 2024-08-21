import NavBar from "../components/NavBar.tsx";
import Filter from "../features/filters/components/Filter.tsx";
import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";
import {fetchSpaces} from "../features/filters/api/space-api.ts";
import {useEffect, useState} from "react";
import {QueryParams} from "../features/filters/types.ts";
import {useSpaces} from "../hooks/useSpaces.ts";

export default function Home() {
    const queryClient = new QueryClient();
    const [activateQuery, {data: spaces, isLoading, setQueryParams}] = useSpaces();

    if(isLoading){
        return <div>...loading</div>
    }

    return(
        <>
            <NavBar/>
            <QueryClientProvider client={queryClient}>
                <Filter/>
            </QueryClientProvider>
            {
                spaces?.map((space) => {
                    return (
                        <div key={space.id}>
                            {space.name}
                        </div>
                    )
                })
            }
        </>
    )
}