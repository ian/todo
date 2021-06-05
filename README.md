# Todo List - Example using Rel

This is a basic TODO application written in React that connects to a Rel backend running on Redis.

To run:

1. `yarn bootstrap`
2. `yarn dev`

This will start:

- Rel GraphQL server running on https://localhost:3282
- React server running on https://localhost:3000

To run Redis (DB persistence):

- `yarn redis` (make sure you have `docker` installed)
