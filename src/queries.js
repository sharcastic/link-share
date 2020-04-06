export const getFriendsQuery = `
query ($user_id: String!) {
  users(where: {id: {_eq: $user_id}}) {
    connections {
      user_connected {
        name
        email
        id
      }
    }
  }
}
`;

export const getPostsForFeedSubscriptionQuery = `
subscription ($user_id: String!){
  links(where: {_or: [{created_by: {_eq: $user_id}}, {post_tagged_users: { user_id: { _eq: $user_id }}}]}, order_by: {id: desc}, limit: 10) {
    description
    id
    link
    created_at
    author {
      name
      id
    }
  }
}
`;

export const createPostMutation = `
mutation ($userId: String!, $description: String!, $link: String!, $taggedUsers: [post_tagged_users_insert_input!]!) {
  insert_links(objects: { created_by: $userId, description: $description, link: $link, post_tagged_users: {data: $taggedUsers} }) {
    returning {
      id
    }
  }
}
`;
