import { useContext } from "react";
import { Container, Stack } from "react-bootstrap";
import { ChatContext } from "../context/ChatContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import UserChat from "../components/Chat/UserChat.jsx";
import PotentialChats from "../components/Chat/PotentialChats.jsx";
import ChatBox from "../components/Chat/ChatBox.jsx";

const Chat = () => {
    const { user } = useContext(AuthContext);
    const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ChatContext);

    return (
        <Container>
            <PotentialChats/>
            {userChats?.length < 1 ? null : (
                <Stack direction="horizontal" gap={4} className="align-items-start">
                    <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
                        {isUserChatsLoading && <p>Loading...</p>}
                        {userChats?.map((chat, index) => (
                            <div key={index} onClick={() => {
                                console.log("chat:",chat); // Verificar si el chat está siendo actualizado
                                updateCurrentChat(chat);
                            }}>
                                <UserChat chat={chat} user={user} />
                            </div>
                        ))}
                    </Stack>
                    <ChatBox/>
                </Stack>
            )}
        </Container>
    );
};

export default Chat;