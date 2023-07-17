import { FormFancy } from "@/components/Form";
import { getClient } from "@/lib/getClient";
import { gql } from "@apollo/client";

const query = gql`
  query {
    findUser(id: "1") {
      id
      firstName
    }
  }
`;

export default async function Home() {
  const { data } = await getClient().query({ query });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>

      <FormFancy />
    </main>
  );
}
