import React, { useEffect } from "react";
import { useQuery } from "urql";

const Home = () => {
  const QUERY = `
    {
      users {
        id
        email
        name
      }
    }
  `;
  const [result, reExecuteQuery] = useQuery({
    query: QUERY
  });
  const { data, fetching, error } = result;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <ul>
      {data.users.map(user => (
        <li key={user.id}>
          {user.email} {user.name}
        </li>
      ))}
    </ul>
  );
};

export default Home;
