import NavBar from "../components/NavBar.tsx";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import Filter from "../features/filters/components/Filter.tsx";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useSpaces } from "../features/filters/hooks/useSpaces.ts";
import Cards from "../features/cards/components/Cards.tsx";
import CardsSkeleton from "../features/cards/components/CardsSkeleton.tsx";

export default function Home() {
  const queryClient = new QueryClient();
  const [{ data: spaces, isLoading }, queryParams, setQueryParams] =
    useSpaces();

  return (
    <>
      <NavBar />
      <main>
        <QueryClientProvider client={queryClient}>
          <Filter setQueryParams={setQueryParams} queryParams={queryParams} />
          {isLoading && (
            <>
              <CardsSkeleton />
              <div className="loader"></div>
            </>
          )}
          {spaces && spaces.length !== 0 && (
            <Cards spaces={spaces} setQueryParams={setQueryParams} />
          )}
        </QueryClientProvider>
      </main>
    </>
  );
}

