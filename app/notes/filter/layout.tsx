import css from "./LayoutNotes.module.css";

export default function FilterLayout({
    children, 
    sidebar,
    modal,
}: Readonly<{
    children: React.ReactNode;
    sidebar: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <>
           <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
            <div className={css.notesWrapper}>{children}</div>
        </section>
            {modal}
        </>
 
    
    );
}