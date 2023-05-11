import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  return (
    <h1 className="bg-blue-300 text-5xl font-bold">
    Hello world!
  </h1> 
  );
}
