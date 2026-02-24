import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { NoteTag } from "@/types/note";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function Notes({ params }: PageProps) {
  const { slug } = await params;
   const currentTag = (slug?.[0] ?? "all") as
    | NoteTag | "all";
  const normalizedTag = currentTag === "all" ? undefined : currentTag;
  
const queryClient = new QueryClient();
  
    await queryClient.prefetchQuery({
      queryKey: ["notes", "", 1, 12, normalizedTag],
      queryFn: () =>
        fetchNotes({
      search: "",
      page: 1,
      perPage: 12,
      tag: normalizedTag,
        }),
    });

return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={currentTag as NoteTag | "all"} />
    </HydrationBoundary>
  </>
)
}
