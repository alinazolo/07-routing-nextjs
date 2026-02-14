import css from "./Footer.module.css";
 export default function Footer () {
    return (
        <footer className={css.footer}>
  <div className={css.content}>
    <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
    <div className={css.wrap}>
      <p>Developer: Alina Zolotopup</p>
      <p>
        Contact us:
        <a href="mailto:alinazolotopup99@gmail.com">student@notehub.app</a>
      </p>
    </div>
  </div>
</footer>

    )
 }