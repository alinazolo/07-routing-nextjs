'use client'
import css from "./NoteDetails.module.css";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function NoteDetailsClient() {
    const { id } = useParams<{ id: string }>();
    
    const { data: note, isLoading, error } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });
   if (isLoading) return <p><p>Loading, please wait...</p></p>;
    if (error || !note) return <p><p>Something went wrong.</p>;</p>;
    
    const formattedDate = note.updatedAt
        ? `Updated at: ${note.updatedAt}`
        : `Created at: ${note.createdAt}`;
    
    return (
        <div className={css.container}>
	<div className={css.item}>
	  <div className={css.header}>
	    <h2>{note.title}</h2>
	  </div>
      <p className={css.tag}>{note?.tag}</p>
	  <p className={css.content}>{note?.content}</p>
	  <p className={css.date}>{formattedDate}</p>
	</div>
</div>
    )
}