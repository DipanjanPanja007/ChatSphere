
// import { useToast } from '@chakra-ui/react';


// const showMessage = () => {
//     const toast = useToast()

//     return ({ status = "error", message = "something went wrong", duration = 5000, position = "bottom" }) => {
//             toast({
//                 title: message,
//                 status: status,
//                 duration: duration,
//                 position: position,
//                 isClosable: true,
//             });
//     }

// }

// export default showMessage;

import { useToast } from '@chakra-ui/react';

const useShowMessage = () => {
    const toast = useToast();

    const showMessage = ({ status = "error", message = "something went wrong", duration = 5000, position = "bottom" } = {}) => {
        toast({
            title: message,
            status,
            duration,
            position,
            isClosable: true,
        });
    };

    return showMessage;
};

export default useShowMessage;