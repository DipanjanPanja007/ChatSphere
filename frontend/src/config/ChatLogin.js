export const getSender = (loggedUser, users) => {
    console.log("users of this on to one chat are: ", users)
    console.log(`loggedUser details: ${loggedUser}`);
    const sender = loggedUser.data.user._id === users[0]._id ? users[1].name : users[0].name;
    console.log(`sender: ${sender}`);
    return sender;
}