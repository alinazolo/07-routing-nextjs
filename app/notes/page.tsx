import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface PageProps {
  searchParams: {
    search?: string;
    page?: string;
  };
}

import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";


export default async function Notes({ searchParams }: PageProps) {
    const queryClient = new QueryClient();
    const params = await searchParams;
    const search = params.search ?? "";
    const page = Number(params.page ?? 1);
    const perPage = 12;

    await queryClient.prefetchQuery({
        queryKey: ["notes", { search, page, perPage }],
        queryFn: () => fetchNotes({ search, page, perPage }),
    });

// const {data, isLoading, isError, isSuccess} =  useQuery({
//     queryKey: ["notes", query, currentPage, perPage],
//     queryFn: () => fetchNotes(
//       {search: query, page: currentPage, perPage}),
//       placeholderData: keepPreviousData,
//   });
 



return (
    <>
        <HydrationBoundary state={dehydrate(queryClient)}>
           
	
                <NotesClient />
           
      </HydrationBoundary>    </>
)
}
    