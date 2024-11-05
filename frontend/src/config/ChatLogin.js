export const getSender = (loggedUser, users) => {
    console.log("users of this on to one chat are: ", users)
    const sender = users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
    console.log(`sender: ${sender}`);
    return sender;
}