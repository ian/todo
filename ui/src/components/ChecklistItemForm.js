import { useFormik } from "formik"

export default function ChecklistItemForm({ onSubmit }) {
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      text: "",
    },
    onSubmit,
  })

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="text"
        value={values.text}
        onChange={handleChange}
        className="bg-white w-full rounded-lg shadow px-5 py-6 sm:px-6 outline-none"
        placeholder="What do you want to get done today?"
      />
    </form>
  )
}
