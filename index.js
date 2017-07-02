document.addEventListener('DOMContentLoaded', () => {
    let vm = {};
    vm.users = ko.observableArray();
    vm.userName = ko.observable();

    const loadUsers = () => {
        fetch('http://localhost:8080/api/users')
            .then(result => result.json())
            .then(users =>{ 
                return vm.users(users); 
            })
    };

    loadUsers();
     vm.delete = (user) => {
        fetch(`http://localhost:8080/api/users/${user._id}`, {
            method: 'DELETE'
        })
        .then(result => result.json())
        .then(deletedUser => {
            console.log(JSON.stringify(deletedUser));
            vm.users(vm.users().filter(u => u._id != deletedUser._id));

        })         
     };

     vm.update = (user) => {
         fetch(`http://localhost:8080/api/users/${user._id}`, {
             method: 'PUT',
             headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
             body: `name=${user.name}`
        })
        .then(result => result.json())
        .then(updatedUser => {
            const updatedElementIndex = vm.users().map(x => x._id).indexOf(updatedUser._id);
            vm.users()[updatedElementIndex].name = updatedUser.name;
            console.log(vm.users());
            console.log(JSON.stringify(updatedUser));

        })         

     }

    vm.add = () => {
        fetch('http://localhost:8080/api/users',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `name=${vm.userName()}`
        })
        .then(result => result.json())
        .then(user => {
            vm.users.push(user);
            vm.userName('');
        })
    }

    ko.applyBindings(vm);


});