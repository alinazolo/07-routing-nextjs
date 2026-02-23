'use client'
import { fetchNotes } from "@/lib/api";
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import css from './page.module.css';
import { useState } from "react";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from '@/components/NoteList/NoteList';
import Loading from '@/app/loading';
import Error from '@/app/notes/filter/[...slug]/error';
import Modal from "@/components/Modal/Modal";
import NoteForm from '@/components/NoteForm/NoteForm';
import type { NoteTag } from "@/types/note";

interface NotesClientProps {
  tag: NoteTag | "all";
}

export default function NotesClient({ tag }: NotesClientProps) {
  
const [query, setQuery] = useState('');
const [currentPage, setCurrentPage] = useState(1);
 const [perPage] = useState(12);
 const debouncedSetQuery = useDebouncedCallback(
  (value: string) => {
setQuery(value);
setCurrentPage(1);
    },
    300,
 );
  
  
    const { data, isLoading, error, isSuccess } = useQuery({
        queryKey: ["notes", { search: "", page: currentPage, perPage, tag }],
        queryFn: () => fetchNotes(
            { search: query, page: currentPage, perPage, tag}), 
        placeholderData: keepPreviousData,
        refetchOnMount: false,
    });
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <div className={css.app}>
                <header className={css.toolbar}> <SearchBox text={query} onSearch={debouncedSetQuery} />
            {isSuccess && (
    <Pagination page={currentPage} totalPages={data.totalPages} onPageChange={setCurrentPage}/>
                    )}
                    <button className={css.button} onClick={openModal}>Create note +</button>
                    {isModalOpen && (
<Modal onClose={closeModal}>
<NoteForm onClose={closeModal}></NoteForm>
</Modal>
)}
</header>
  {isLoading && <Loading/>}
                {error && <Error error={error} />}
                 {data && isSuccess && data.notes.length > 0 && <NoteList notes={data.notes}/>}
             </div>
        </>
    )
}