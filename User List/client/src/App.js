import { useEffect, useState } from 'react';

import * as userService from './services/userService'

// import { Fragment } from 'react'; Краткия и по-добър начин да се използва Fragment е с <> </>. Ако използваме пълния вариант, трябва първо да импортнем Fragment и долу с <Fragment> </Fragment>
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Search } from './components/Search';
import './App.css';
import { UserList } from './components/UserList';

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        userService.getAll()
            .then(setUsers)
            .catch(err => {
                console.log('Error' + err);
            });
    }, []);

    const onUserCreateSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const data = Object.fromEntries(formData);

        const createdUser = await userService.create(data);
        setUsers(state => [...state, createdUser]);
    };

    const onUserDelete = async (userId) => {
        await userService.remove(userId);

        setUsers(state => state.filter(x => x._id !== userId));
    };

    const onUserUpdateSubmit = async (e, userId) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        const updatedUser = await userService.update(userId, data)
        
        setUsers(state => state.map(x => x._id === userId ? updatedUser : x));


    };

    return (
        <>
            <Header />

            <main className="main">
                <section className="card users-container">
                    <Search />

                    <UserList
                        users={users}
                        onUserCreateSubmit={onUserCreateSubmit}
                        onUserDelete={onUserDelete}
                        onUserUpdateSubmit={onUserUpdateSubmit}
                    />
                </section>
            </main>

            <Footer />
        </>
    );
};

export default App;
