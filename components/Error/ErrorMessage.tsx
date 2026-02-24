'use client'
import css from "./ErrorMessage.module.css";

type PropsErrorMessage = {
    error: Error;
};

export default function ErrorMessage({error}: PropsErrorMessage) {
  return <p className={css.text}>Could not fetch note details. {error.message}</p>;
}
