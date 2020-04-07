export const getFriendsQuery = `
query ($user_id: String!) {
  connections(where: {user_id: {_eq: $user_id}}) {
    id
    user_connected {
      id
      name
      email
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
    post_tagged_users {
      id
      user {
        id
        name
      }
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

export const updatePostMutation = `
mutation ($description: String!, $link: String!, $postID: Int!, $addingTags: [post_tagged_users_insert_input!]!, $deletingTags: [Int!]!) {
  update_links(where: {id: {_eq: $postID}}, _set: {description: $description, link: $link}) {
    affected_rows
  }
  insert_post_tagged_users(objects: $addingTags) {
    affected_rows
  }
  delete_post_tagged_users(where: {id: {_in: $deletingTags}}) {
    affected_rows
  }
}
`;

export const deletePostMutation = `
mutation ($postID: Int!) {
  delete_post_tagged_users(where: {post_id: {_eq: $postID}}) {
    affected_rows
  }
  delete_links(where: {id: {_eq: $postID}}) {
    affected_rows
  }
}
`;
