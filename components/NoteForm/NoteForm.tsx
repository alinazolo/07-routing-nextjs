import css from "./NoteForm.module.css";
import { useId } from "react";
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";


type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

const NoteFormSchema = Yup.object().shape({
    title: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
    content: Yup.string()
    .max(500, "Too Long!"),
    tag: Yup.string<Tag>()
    .required("Required"),
})

interface NoteFormValues {
        title: string;
        content: string;
        tag: Tag;
      }

const initialValues: NoteFormValues = {
            title: "",
            content: "",
            tag: "Todo",
        };
interface NoteFormProps {
  onClose: () => void;
}       

export default function NoteForm({onClose}: NoteFormProps) {
  const queryClient = useQueryClient();

  const {mutate, isPending} = useMutation({
    mutationFn: createNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"]});
      onClose()
    },
  })

   

const fieldId = useId();

const handleSubmit = (
    values: NoteFormValues, 
    actions: FormikHelpers<NoteFormValues>
) => {
mutate(values, {
  onSuccess: () => {
actions.resetForm();
  },
});
};
  

        return (
        <div>
        <Formik 
        initialValues={initialValues} 
        onSubmit={handleSubmit} 
        validationSchema={NoteFormSchema}>
<Form className={css.form}>
  <div className={css.formGroup}>
    <label htmlFor={`${fieldId}-title`}>Title</label>
    <Field id={`${fieldId}-title`} type="text" name="title" className={css.input} />
    <ErrorMessage name="title" className={css.error} component="span"/>
  </div>

  <div className={css.formGroup}>
    <label htmlFor={`${fieldId}-content`}>Content</label>
    <Field
    as="textarea"
      id={`${fieldId}-content`}
      name="content"
      rows={8}
      className={css.textarea}
    />
    <ErrorMessage name="content" className={css.error} component="span"/>
  </div>

  <div className={css.formGroup}>
    <label htmlFor={`${fieldId}-tag`}>Tag</label>
    <Field  as="select"
    id={`${fieldId}-tag`}
    name="tag" 
    className={css.select}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </Field>
    <ErrorMessage name="tag" className={css.error} component="span"/>
  </div>

  <div className={css.actions}>
    <button type="button" 
    className={css.cancelButton}
    onClick={onClose}>
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
      disabled={isPending}
    >
      Create note
    </button>
  </div>
</Form>
</Formik>
</div>
    )
      }
    