const registerUser = (name, email, lastname, password, choices) =>  {
    const data = JSON.stringify({
        name,
        email,
        lastname,
        password
    })
    
    return fetch('http://localhost:4000/users',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    }).then(response => { 
        return response.body
    })
}

const removeUser = id => {
    return fetch(`http://localhost:4000/users/${id}`, {
        method: "DELETE",
    })
}

const getUser = id => { 
    return fetch(`http://localhost:4000/users/${id}`,{
        method: 'GET'
    }) 
    .then(response => {
        return response.json()
    })
}

const updateUser = (id, name, lastname, email, password) => {
    const json = JSON.stringify({
        name,
        lastname,
        email,
        password
    })
  
    return fetch(`http://localhost:4000/users/${id}`,{
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
            },
        body: json
    })
}
