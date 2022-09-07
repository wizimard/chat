import { chatActions } from "../reducer/chatSlice"
import { AppDispatch } from "../store"

export const fetchContacts = () => {
    return async(dispatch: AppDispatch) => {
        // dispatch(chatActions.fetchContacts());
        try {
            // dispatch(chatActions.fetchContactsSuccess([
            //     {id: '1', name: 'Leo Gill', avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-HD.png', unread: 5, lastMessageDate: Math.random().toString(), isOnline: true },
            //     {id: '2', name: 'Orlando Diggs', avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-HD.png', unread: 0, lastMessageDate: Math.random().toString(), isOnline: false },
            //     {id: '3', name: 'Alex Lee', avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-HD.png', unread: 0, lastMessageDate: Math.random().toString(), isOnline: true },
            //     {id: '4', name: 'Marie Jensen', avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-HD.png', unread: 3, lastMessageDate: Math.random().toString(), isOnline: false },
            //     {id: '5', name: 'Carmen Velasco', avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-HD.png', unread: 12, lastMessageDate: Math.random().toString(), isOnline: false },
            //     {id: '6', name: 'Johny Dep', avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-HD.png', unread: 0, lastMessageDate: Math.random().toString(), isOnline: true },
            //     {id: '7', name: '#general', unread: 5, lastMessageDate: Math.random().toString()},
            //     {id: '8', name: '#Great Britain', unread: 5, lastMessageDate: Math.random().toString()},
            //     {id: '9', name: '#frontend', unread: 5, lastMessageDate: Math.random().toString()},
            //     {id: '10', name: '#English', unread: 5, lastMessageDate: Math.random().toString()},
            //     {id: '11', name: '#music', unread: 5, lastMessageDate: Math.random().toString()},
            //     {id: '12', name: '#anime', unread: 5, lastMessageDate: Math.random().toString()},
            //     {id: '13', name: 'Leo Gill', avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-HD.png', unread: 5, lastMessageDate: Math.random().toString(), isOnline: true },
            //     {id: '14', name: 'Orlando Diggs', avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-HD.png', unread: 0, lastMessageDate: Math.random().toString(), isOnline: false },
            //     {id: '15', name: 'Alex Lee', avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-HD.png', unread: 0, lastMessageDate: Math.random().toString(), isOnline: true },
            //     {id: '16', name: 'Marie Jensen', avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-HD.png', unread: 3, lastMessageDate: Math.random().toString(), isOnline: false },
            //     {id: '17', name: 'Carmen Velasco', avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-HD.png', unread: 12, lastMessageDate: Math.random().toString(), isOnline: false },
            //     {id: '18', name: 'Johny Dep', avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-HD.png', unread: 0, lastMessageDate: Math.random().toString(), isOnline: true },
            //     {id: '19', name: '#general', unread: 5, lastMessageDate: Math.random().toString()},
            //     {id: '20', name: '#Great Britain', unread: 5, lastMessageDate: Math.random().toString()},
            //     {id: '21', name: '#frontend', unread: 5, lastMessageDate: Math.random().toString()},
            //     {id: '22', name: '#English', unread: 5, lastMessageDate: Math.random().toString()},
            //     {id: '23', name: '#music', unread: 5, lastMessageDate: Math.random().toString()},
            //     {id: '24', name: '#anime', unread: 5, lastMessageDate: Math.random().toString()}
            // ].sort((item1, item2) => {
            //     if (Number(item1.lastMessageDate) > Number(item2.lastMessageDate)) return 1
            //     return -1;
            // })));
        } catch(e) {
            dispatch(chatActions.fetchConstactsError('error'));
        }
    }
}
export const fetchCurrentContact = (url: string) => {
    return async(dispatch: AppDispatch) => {
        dispatch(chatActions.fetchCurrentContact());
        try {
            const [type, id] = url.split('=');

            if ((type !== 'ch' && type !== 'sel') || !id) {
                dispatch(chatActions.fetchCurrentContactSuccess(null));
            }

            if (type === 'ch') {
                // dispatch(chatActions.fetchCurrentContactSuccess({
                //     type: 'channel',
                //     content: {
                //         id: '1',
                //         name: '#general',
                //         description: 'General channel web programming.',
                //         isPublic: true,
                //         admin: { id: '1', fullname: 'Maxim Voronin', avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-HD.png', role: 'admin' },
                //         administrators: [
                //             { id: '2', fullname: 'Marie Jensen', avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-HD.png', role: 'administrator' },
                //             { id: '3', fullname: 'Leo Gill', avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-HD.png', role: 'administrator' },
                //         ],
                //         members: [
                //             { id: '4', fullname: 'Alex Drok', avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-HD.png', role: 'member' },
                //             { id: '5', fullname: 'Johny Depp', avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-HD.png', role: 'member' },
                //             { id: '6', fullname: 'Garry Dogles', avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-HD.png', role: 'member' },
                //             { id: '7', fullname: 'Orlando Diggs', avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-HD.png', role: 'member' },
                //             { id: '8', fullname: 'Margaret Ewanse', avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-HD.png', role: 'member' }
                //         ],
                //         links: ['https://facebook.com', 'https://vk.com', 'https://twitter.com'],
                //         attachs: {
                //             images: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                //             videos: [1, 2, 3],
                //             files: [1, 2, 3, 4, 5],
                //             links: [1, 2, 3, 4]
                //         },
                //         role: 'admin',
                //         link: 'http://localhost:3000/ch=13',
                //         isSubscribed: false
                //     }
                // }));
                return;
            }
            // dispatch(chatActions.fetchCurrentContactSuccess({
            //     type: 'person',
            //     content: {
            //         id: '1', 
            //         email: 'email@email.com',
            //         fullname: 'Leo Gill', 
            //         avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-HD.png',
            //         bio: 'Frontend developer',
            //         links: ['https://facebook.com', 'https://vk.com', 'https://twitter.com'],
            //         isFriend: false,
            //         username: 'leo_gill'
            //     }
            // }));
        } catch(e) {
            dispatch(chatActions.fetchCurrentContactError('error'));
        }
    }
}