"use client";

import { gql, useMutation } from "@apollo/client";

const mutation = gql`
  mutation kk(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      id
      firstName
    }
  }
`;

export const FormFancy = () => {
  const [createPerson, re] = useMutation<{ dsa: string }>(mutation, {
    onError: (e) => console.log(e),
  });
  console.log(re.data, "console.log(re.data)");
  return (
    <form
      onClick={async (e) => {
        e.preventDefault();
        const das = await createPerson({
          variables: {
            firstName: "John",
            lastName: "Doe",
            email: "das@email.com",
            password: "ds",
          },
        });

        console.log(das, "my dasdasdas");
      }}
    >
      <h1>My First Heading</h1>

      <pre>
        <code>{JSON.stringify(re.data, null, 2)}</code>
      </pre>

      <button type="submit">Submit</button>
    </form>
  );
};
