async function createUser() {
    $('#addUser').click(async () => {
        const addUserForm = $('#addForm');
        const userData = collectUserData(addUserForm);

        const response = await userFetch.addNewUser(userData);

        if (response.ok) {
            await handleSuccessfulUserCreation(addUserForm);
        } else {
            await handleErrorResponse(addUserForm, response);
        }
    });
}

function collectUserData(form) {
    const roles = getSelectedRoles();
    return {
        username: form.find('#usernameCreate').val().trim(),
        password: form.find('#passwordCreate').val().trim(),
        name: form.find('#nameCreate').val().trim(),
        surname: form.find('#surnameCreate').val().trim(),
        age: form.find('#ageCreate').val().trim(),
        email: form.find('#emailCreate').val().trim(),
        roles: roles
    };

    function getSelectedRoles() {
        const selectedRoles = [];
        const options = document.querySelector('#rolesCreate').options;

        for (let option of options) {
            if (option.selected) {
                selectedRoles.push(roleList[option.index]);
            }
        }
        return selectedRoles;
    }
}

async function handleSuccessfulUserCreation(form) {
    await getUsers();
    clearForm(form);
    showAlert(form, 'User created successfully!', 'success');
    $('.nav-tabs a[href="#adminTable"]').tab('show');
}

function clearForm(form) {
    form.find('#usernameCreate').val('');
    form.find('#passwordCreate').val('');
    form.find('#nameCreate').val('');
    form.find('#surnameCreate').val('');
    form.find('#ageCreate').val('');
    form.find('#emailCreate').val('');
}

function showAlert(form, message, type) {
    const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
    const alert = `
        <div class="alert ${alertClass} alert-dismissible fade show col-12" role="alert" id="messageAlert">
            ${message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`;
    form.prepend(alert);
}

async function handleErrorResponse(form, response) {
    const body = await response.json();
    showAlert(form, body.info, 'error');
}