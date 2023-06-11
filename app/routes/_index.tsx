import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Ship Chain App" }];
};

// Loaders only run on the server and provide data
// to your component on GET requests
export const loader = async () => redirect("/auth");
