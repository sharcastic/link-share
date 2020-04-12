export const getConnectionsAndRequestsQuery = `
query ($user_id: String!) {
  connections(where: {user_id: {_eq: $user_id}}) {
    id
    user_connected {
      id
      name
      email
    }
  }
  connection_request(where: {_or: [{sent_by_id: {_eq: $user_id}}, {sent_to_id: {_eq: $user_id}}]}) {
    sent_by_id
    sent_to_id
    id
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

export const getNotificationsSubscriptionQuery = `
subscription ($user_id: String!){
  notifications(where: {targeted_user_id: {_eq: $user_id}}, limit: 7, order_by: {status: desc, id: desc}) {
    id
    status
    content_id
    notification_created_by {
      id
      name
    }
    type
  }
}
`;

export const createPostMutation = `
mutation ($userId: String!, $description: String!, $link: String!, $taggedUsers: [post_tagged_users_insert_input!]!, $notifications: [notifications_insert_input!]!) {
  insert_links(objects: { created_by: $userId, description: $description, link: $link, post_tagged_users: {data: $taggedUsers}, notifications: { data: $notifications} }) {
    returning {
      id
    }
  }
}
`;

export const updatePostMutation = `
mutation ($description: String!, $link: String!, $postID: Int!, $addingTags: [post_tagged_users_insert_input!]!, $addNotifications: [notifications_insert_input!]!, $removedUsers: [String!]!) {
  update_links(where: {id: {_eq: $postID}}, _set: {description: $description, link: $link}) {
    affected_rows
  }
  insert_post_tagged_users(objects: $addingTags) {
    affected_rows
  }
  insert_notifications(objects: $addNotifications) {
    affected_rows
  }
  delete_notifications(where: {_and: {content_id: {_eq: $postID}, targeted_user_id: {_in: $removedUsers}}}) {
    affected_rows
  }
  delete_post_tagged_users(where: {_and: {post_id: {_eq: $postID}, user_id: {_in: $removedUsers}}}) {
    affected_rows
  }
}
`;

export const deletePostMutation = `
mutation ($postID: Int!) {
  delete_post_tagged_users(where: {post_id: {_eq: $postID}}) {
    affected_rows
  }
  delete_notifications(where: {content_id: {_eq: $postID}}) {
    affected_rows
  }
  delete_links(where: {id: {_eq: $postID}}) {
    affected_rows
  }
}
`;

export const readNotificationMutation = `
mutation ($notificationID: Int!) {
  update_notifications(where: {id: {_eq: $notificationID}}, _set: {status: READ}) {
    affected_rows
  }
}
`;

export const searchUsersQuery = `
query ($searchTerm: String!, $userID: String!) {
  users(where: {_or: [{email: {_ilike: $searchTerm}}, {name: {_ilike: $searchTerm}}], _and: {id: {_neq: $userID}}}, limit: 20, order_by: {name: asc}) {
    id
    name
    email
  }
}
`;

export const addRequestMutation = `
mutation ($userID: String!, $requestedUserID: String!) {
  insert_connection_request(objects: {sent_by_id: $userID, sent_to_id: $requestedUserID}) {
    affected_rows
  }
  insert_notifications(objects: {created_by_id: $userID, targeted_user_id: $requestedUserID, type: REQUEST_RECEIVED}) {
    affected_rows
  }
}
`;

export const addConnectionMutation = `
mutation ($userID: String!, $requestedUserID: String!, $connectionObject: [connections_insert_input!]!) {
  insert_connections(objects: $connectionObject){
    affected_rows
  }
  delete_notifications(where: {created_by_id: {_eq: $requestedUserID}, targeted_user_id: {_eq: $userID}}) {
    affected_rows
  }
  delete_connection_request(where: {sent_by_id: {_eq: $requestedUserID}, sent_to_id: {_eq: $userID}}) {
    affected_rows
  }
}
`;
