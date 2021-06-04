import Rel from "@reldb/run";

export default Rel.model("Checklist", {
  name: Rel.string().required(),
  items: Rel.relation("BELONGS_TO").to("Item").inbound().endpoints(true),
}).endpoints(true);
