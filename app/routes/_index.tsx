import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import * as Auth from "./auth";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

// Loaders only run on the server and provide data
// to your component on GET requests
export const loader = async (args: LoaderArgs) => {
  return Auth.loader(args);
};

// Actions only run on the server and handle POST
// PUT, PATCH, and DELETE. They can also provide data
// to the component
export async function action(args: ActionArgs) {
  return Auth.action(args);
}

// The default export is the component that will be
// rendered when a route matches the URL. This runs
// both on the server and the client
export default function Index() {
  return Auth.default();
}
