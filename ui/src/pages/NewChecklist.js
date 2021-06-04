import { Dialog } from "@headlessui/react"
import { useFormik } from "formik"
import { CheckIcon } from "@heroicons/react/outline"
import { useHistory } from "react-router-dom"
import { graphql } from "../lib/graphql"

export default function Example() {
  const history = useHistory()
  const { handleChange, handleSubmit } = useFormik({
    initialValues: {},
    onSubmit: (input) => {
      graphql(
        `
          mutation CreateList($input: ChecklistInput!) {
            checklist: CreateChecklist(input: $input) {
              id
              name
            }
          }
        `,
        {
          input,
        }
      ).then(({ checklist }) => {
        history.push("/checklists/" + checklist.id)
      })
    },
  })

  return (
    <Dialog
      as="div"
      static
      className="fixed z-10 inset-0 overflow-y-auto"
      open={true}
      onClose={() => {}}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <CheckIcon
                className="h-6 w-6 text-green-600"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3  sm:mt-5">
              <Dialog.Title
                as="h3"
                className="text-lg text-center leading-6 font-medium text-gray-900"
              >
                Create new TODO List
              </Dialog.Title>
              <div className="mt-5">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="p-5 shadow-sm block w-full sm:text-sm rounded-md border-red-500"
                    placeholder="you@example.com"
                    onChange={handleChange}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
