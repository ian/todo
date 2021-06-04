import Rel from "@reldb/run";

export default Rel.model("Item", {
  text: Rel.string().required(),
  checked: Rel.boolean().default(false),
  checklist: Rel.relation("BELONGS_TO").to("Checklist").singular(),
}).endpoints(true);
