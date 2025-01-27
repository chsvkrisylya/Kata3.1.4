const roleList = [
    { id: 1, role: "ROLE_USER" },
    { id: 2, role: "ROLE_ADMIN" }
];

let isUser = true;

$(async function () {
    try {
        await Promise.all([
            getUser(),
            infoUser(),
            tittle(),
            getUsers(),
            getNewUserForm(),
            getDefaultModal(),
            createUser()
        ]);
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

const userFetch = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    findAllUsers: () => fetch('api/users'),
    findUserByUsername: () => fetch(`api/user`),
    findOneUser: (id) => fetch(`api/users/${id}`),
    addNewUser: (user) => fetch('api/users', {
        method: 'POST',
        headers: userFetch.headers,
        body: JSON.stringify(user)
    }),
    updateUser: (user, id) => fetch(`api/users/${id}`, {
        method: 'PUT',
        headers: userFetch.headers,
        body: JSON.stringify(user)
    }),
    deleteUser: (id) => fetch(`api/users/${id}`, {
        method: 'DELETE',
        headers: userFetch.headers
    })
};

async function infoUser() {
    const info = document.querySelector('#info');

    try {
        const response = await userFetch.findUserByUsername();
        const user = await response.json();

        info.innerHTML = `
            <span style="color: white">
                ${user.username} с ролями <span>${user.roles.map(e => " " + e.role.substr(5)).join(', ')}</span>
            </span>
        `;
    } catch (error) {
        console.error('Error fetching user info:', error);
        info.innerHTML = '<span style="color: red">Ошибка загрузки информации о пользователе.</span>';
    }
}