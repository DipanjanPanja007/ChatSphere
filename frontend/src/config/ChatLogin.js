export const getSender = (loggedUser, users) => {
    if (!loggedUser) {
        console.log("loggedUser is null from getSender");
    }
    if (!users) {
        console.log("users is null from getSender");
    }
    return loggedUser.data.user._id === users[0]._id ? users[1].name : users[0].name;
}
export const getSenderFull = (loggedUser, users) => {
    return loggedUser.data.user._id === users[0]._id ? users[1] : users[0];
}