import React, { useCallback, useContext, useState, useMemo } from 'react';
import { useQuery } from "urql";

import { searchUsersQuery } from '../../queries';
import useDebounce from '../../hooks/useDebounce';
import ApplicationContext from "../../context/ApplicationContext/ApplicationContext";
import TextInput from '../../components/TextInput';
import { useAuth0 } from "../../utils/Auth0";

const ListItem = ({ id, name, currentConnection, pendingRequest }) => {
    const { user = {} } = useAuth0();
    const { handleAddRequest, acceptRequest } = useContext(ApplicationContext);
    const onAddClick = useCallback(() => handleAddRequest(id), [handleAddRequest, id]);
    const onAcceptClick = useCallback(() =>
        acceptRequest(pendingRequest.sent_by_id), 
        [acceptRequest, pendingRequest]
    );
    if (currentConnection) {
        return (
            <li style={{ display: 'flex', justifyContent: 'space-between'}}>
                <span>{name}</span><span>Already connected!</span>
            </li>
        );
    }
    if (pendingRequest) {
        return (
            <li style={{ display: 'flex', justifyContent: 'space-between'}}>
                <span>{name}</span>
                {pendingRequest.sent_by_id === user.sub
                    ? <span>Request Pending</span>
                    : <button onClick={onAcceptClick}>Accept Request</button>
                }
                
            </li>    
        )
    }
    return (
        <li style={{ display: 'flex', justifyContent: 'space-between'}}>
            <span>{name}</span><button onClick={onAddClick}>Add Friend</button>
        </li>
    );
}

const ConnectionPage = () => {
    const { user = {} } = useAuth0();
    const { connections, connectionRequests } = useContext(ApplicationContext);
    const connectionsMap = useMemo(() => new Map(
        connections.map(({ user_connected }) => 
            [user_connected.id, user_connected]
        )
    ), [connections]);
    const connectionRequestsMap = useMemo(() => new Map(
        connectionRequests.map(request => 
            [request.sent_by_id === user.sub
                ? request.sent_to_id : request.sent_by_id,
                request
            ]
        )
    ), [connectionRequests, user]);
    const [searchText, setSearchText] = useState('');
    const debouncedSearchTerm = useDebounce(searchText, 500);
    const [searchResult] = useQuery({
        query: searchUsersQuery,
        variables: { searchTerm: `%${debouncedSearchTerm}%`, userID: user.sub },
        pause: !debouncedSearchTerm || !user.sub
      });
    const {
        fetching: searchLoading,
        data: { users: searchData = [] } = {},
    } = searchResult;
    const filteredSearchData = useMemo(() => searchData && searchData.length >= 0
        ? searchData.map(i => ({
            ...i,
            currentConnection: Boolean(connectionsMap.get(i.id)),
            pendingRequest: connectionRequestsMap.get(i.id),
        }))
      : [], [connectionRequestsMap, connectionsMap, searchData]);
    const onInputChange = useCallback((value) => setSearchText(value), []);
    const renderContent = useCallback(() => {
        if (!debouncedSearchTerm) {
            return  (<>
                <h2>Current Connections</h2>
                <ul>
                    {connections.map(({ user_connected : { id, name }}) => <li key={id}>{name}</li>)}
                </ul>
            </>);
        }
        if (searchLoading) {
            return <div>Loading!</div>;
        }
        if (filteredSearchData.length === 0) {
            return <div>No matching people! :(</div>
        }
        return (
            <ul style={{ padding: 0 }}>
                {filteredSearchData.map(i => <ListItem {...i} key={i.id} />)}
            </ul>
        );
    }, [connections, debouncedSearchTerm, filteredSearchData, searchLoading]);
    return <div>
        <TextInput placeholder="Search for a user!" value={searchText} onChange={onInputChange}/>
        {renderContent()}
    </div>
};

export default ConnectionPage;