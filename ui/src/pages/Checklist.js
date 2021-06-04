import _ from "lodash"
import { useEffect, useState } from "react"
import { graphql } from "../lib/graphql"
import { useParams } from "react-router-dom"
import CardsList from "../components/CardsList"
import ChecklistItemForm from "../components/ChecklistItemForm"

function TodoList() {
  const [checklist, setChecklist] = useState()
  const [items, setItems] = useState([])
  const { id } = useParams()

  useEffect(() => {
    getChecklist(id).then(({ checklist }) => {
      setChecklist(checklist)
      setItems(checklist.items)
    })
  }, [])

  const handleItemAdd = (values, { resetForm }) => {
    addItem(checklist.id, values).then((item) => {
      setItems([item, ...items])
      resetForm()
    })
  }

  const handleItemChange = (item, checked) => {
    updateItem(item.id, {
      text: item.text,
      checked,
    }).then(({ item }) => {
      setItems(
        items.map((i) => {
          if (item.id === i.id) return item
          return i
        })
      )
    })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-indigo-600 pb-32">
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white">TODO List</h1>
          </div>
        </header>
      </div>
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <ChecklistItemForm onSubmit={handleItemAdd} />
        </div>
      </main>
      <div className="mt-10 max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <CardsList items={items} onChange={handleItemChange} />
      </div>
    </div>
  )
}

function getChecklist(id) {
  return graphql(
    `
      query GetChecklist($id: UUID!) {
        checklist: FindChecklist(where: { id: $id }) {
          id
          name
          items {
            id
            text
            checked
          }
        }
      }
    `,
    {
      id,
    }
  )
}

function addItem(checklistId, item) {
  return graphql(
    `
      mutation AddChecklist($item: ItemInput!) {
        item: CreateItem(input: $item) {
          id
          text
          checked
        }
      }
    `,
    {
      checklistId,
      item,
    }
  ).then(async ({ item }) => {
    await graphql(
      `
        mutation AssociateChecklistToItem($checklistId: UUID!, $itemId: UUID!) {
          ChecklistAddItem(checklistId: $checklistId, itemId: $itemId) {
            id
          }
        }
      `,
      {
        checklistId,
        itemId: item.id,
      }
    )
    return item
  })
}

function updateItem(id, item) {
  return graphql(
    `
      mutation AddChecklist($id: UUID!, $item: ItemInput!) {
        item: UpdateItem(id: $id, input: $item) {
          id
          text
          checked
        }
      }
    `,
    {
      id,
      item,
    }
  )
}

export default TodoList
