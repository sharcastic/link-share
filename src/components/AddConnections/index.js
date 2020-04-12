import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "urql";
import useDebounce from "../../hooks/useDebounce";
import ProfileDetailsContext from "../../context/ProfileDetailsContext/ProfileDetailsContext";
import { useAuth0 } from "../../utils/Auth0";
import AddConnectionItem from "./AddConnectionItem";
import { searchUsersQuery, addRequestMutation } from "../../queries";
import Textfield from "../Textbox";

const AddConnections = () => {
  const { user = {} } = useAuth0();
  const [sendingRequests, setSendingRequests] = useState([]);
  const [connectionsSearchValue, setSearchValue] = useState("");
  const {
    connections,
    currentRequests,
    updateConnectionsAndRequests,
    acceptRequest
  } = useContext(ProfileDetailsContext);
  const debouncedSearchTerm = useDebounce(connectionsSearchValue, 500);
  const [, sendRequest] = useMutation(addRequestMutation);
  const [searchResult] = useQuery({
    query: searchUsersQuery,
    variables: { searchTerm: `%${debouncedSearchTerm}%`, userID: user.sub },
    pause: !debouncedSearchTerm || !user.sub
  });
  const addRequestClick = connection => {
    setSendingRequests([...sendingRequests, connection.id]);
    sendRequest({
      requestedUserID: connection.id,
      userID: user.sub
    }).then(res => {
      if (!res.error) {
        updateConnectionsAndRequests();
        setSendingRequests(sendingRequests.filter(j => j !== connection.id));
      }
    });
  };
  const acceptRequestClick = connection => acceptRequest(connection.id);
  const {
    data: { users: searchData = [] } = {},
    fetching: searchLoading
  } = searchResult;
  const filteredSearchData =
    searchData && searchData.length >= 0
      ? searchData.filter(
          i => !connections.find(j => j.id === i.id || i.id === user.sub)
        )
      : []; // MEMO THIS
  return (
    <div>
      <div>Add Connections</div>
      <Textfield
        value={connectionsSearchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
      {debouncedSearchTerm && (
        <div>
          {!searchLoading ? (
            <>
              {filteredSearchData.map(i => (
                <AddConnectionItem
                  connection={i}
                  sendingRequests={sendingRequests}
                  addRequestClick={addRequestClick}
                  acceptRequestClick={acceptRequestClick}
                  currentRequests={currentRequests}
                  key={i.id}
                />
              ))}
            </>
          ) : (
            "Still Loading"
          )}
        </div>
      )}
    </div>
  );
};

export default AddConnections;
