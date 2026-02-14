'use client';
import { fetchNotes } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import css from './NotesPage.module.css';
import Link from 'next/link';
import { useState } from "react";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from '@/components/NoteList/NoteList';
import Loading from '@/app/loading';
import Error  from '@/app/error';

export default function NotesClient() {
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
        queryKey: ["notes", { search: query, page: currentPage, perPage }],
        queryFn: () => fetchNotes(
        { search: query, page: currentPage, perPage }), 
        refetchOnMount: false,
    });
    
    return (
        <>
            <div className={css.app}>
                <header className={css.toolbar}> <SearchBox text={query} onSearch={debouncedSetQuery} />
            {isSuccess && (
    <Pagination page={currentPage} totalPages={data.totalPages} onPageChange={setCurrentPage}/>
                    )}</header>
                 {isLoading && <Loading/>}
  {error && <Error error={error}/>}
             </div>
            	
            {data && isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} item={data.id} />}
        </>
    )
    }