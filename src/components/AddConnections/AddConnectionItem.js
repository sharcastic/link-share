import React from "react";
import Button from "@atlaskit/button";
import { useAuth0 } from "../../utils/Auth0";

const AddConnectionsItem = ({
  connection,
  sendingRequests,
  addRequestClick,
  currentRequests,
  acceptRequestClick
}) => {
  const { user = {} } = useAuth0();
  let receivedRequest, sentRequest;
  const addRequest = () => addRequestClick(connection);
  const acceptRequest = () => acceptRequestClick(connection);
  currentRequests.forEach(i => {
    if (i.sent_to_id === user.sub && i.sent_by_id === connection.id) {
      receivedRequest = true;
    } else if (i.sent_to_id === connection.id) {
      sentRequest = true;
    }
  }); // MEMO
  const renderButton = () => {
    if (receivedRequest) {
      return <Button onClick={acceptRequest}>Accept Request</Button>;
    }
    if (sentRequest) {
      return <Button isDisabled>Request Pending!</Button>;
    }
    return (
      <Button
        isLoading={sendingRequests.find(j => j === connection.id)}
        onClick={addRequest}
      >
        Add Friend
      </Button>
    );
  };
  return (
    <div>
      {connection.name} {renderButton()}
    </div>
  );
};

export default AddConnectionsItem;

/*

{currentRequests.find(j => j.sent_to_id === connection.id) ? (
        <Button isDisabled>Request Pending!</Button>
      ) : (
        <Button
          isLoading={sendingRequests.find(j => j === connection.id)}
          onClick={addConnection}
        >
          Add Friend
        </Button>
      )}

      */
