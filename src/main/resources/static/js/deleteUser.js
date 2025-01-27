async function deleteUser(modal, id) {
    try {
        const oneUser = await userFetch.findOneUser(id);
        const user = await oneUser.json();

        modal.find('.modal-title').html('Delete user');

        const deleteButton = `<button class="btn btn-danger" id="deleteButton">Delete</button>`;
        const closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
        modal.find('.modal-footer').append(deleteButton, closeButton);

        const bodyForm = `
            <form class="form-group text-center" id="deleteUser">
                <div class="form-group">
                    <label for="userId" class="col-form-label">ID</label>
                    <input type="text" class="form-control" id="userId" value="${user.userId}" readonly>
                </div>
                <div class="form-group">
                    <label for="username" class="col-form-label">Username</label>
                    <input type="text" class="form-control" id="username" value="${user.username}" readonly>
                </div>
                <div class="form-group">
                    <label for="name" class="com-form-label">Name</label>
                    <input type="text" class="form-control" id="name" value="${user.name}" readonly>
                </div>
                <div class="form-group">
                    <label for="surname" class="com-form-label">Surname</label>
                    <input type="text" class="form-control" id="surname" value="${user.surname}" readonly>
                </div>
                <div class="form-group">
                    <label for="age" class="com-form-label">Age</label>
                    <input type="number" class="form-control" id="age" value="${user.age}" readonly>
                    <div class="invalid-feedback">Age cannot be empty</div>
                </div>
                <div class="form-group">
                    <label for="email" class="com-form-label">Email</label>
                    <input type="text" class="form-control" id="email" value="${user.email}" readonly>
                </div>
                <div class="form-group">
                    <label for="roles" class="com-form-label">Role:</label>
                    <select id="roles" class="form-control select" size="2" name="roles" style="max-height: 100px" disabled>
                        ${user.roles.map(role => `<option>${role.role.substr(5)}</option>`).join('')}
                    </select>
                </div>
            </form>
        `;
        modal.find('.modal-body').append(bodyForm);

        $("#deleteButton").on('click', async () => {
            const response = await userFetch.deleteUser(id);
            if (response.ok) {
                await getUsers();
                modal.modal('hide');
            } else {
                const body = await response.json();
                const alert = `
                    <div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="messageError">
                        ${body.info}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`;
                modal.find('.modal-body').prepend(alert);
            }
        });
    } catch (error) {
        console.error("Ошибка удаления юзера", error);
    }
}