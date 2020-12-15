// AXIOS  GLOBALS - We can send this with every single request that we make. Not just post request
axios.defaults.headers.common['X-Auth-Token'] = 'cdsfhgdTfdhfsdwaDHUHjpdja_dlajhcbdsjn';

// GET REQUEST
function getTodos() {
    axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/todos',
        params: {
            _limit: 5,
            timeout: 5000   // It will try to fetch the response. But if cannot find the responsse in 5sec, it will show an error
        }
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err));

    //Shorter code
    // axios
    //     .get('https://jsonplaceholder.typicode.com/todos', { params: { _limit: 5 } })
    //     .then(res => showOutput(res))
    //     .catch(err => console.log(err));

}

// POST REQUEST
function addTodo() {
    // axios({
    //     method: 'post',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     data: {
    //         title: 'New todo',
    //         completed: false
    //     }
    // })
    // .then(res => showOutput(res))
    // .catch(err => console.log(err));

    //Shorter code
    axios
        .post('https://jsonplaceholder.typicode.com/todos', {title: 'New todo from shorter', completed: false})
        .then(res => showOutput(res))
        .catch(err => console.log(err));
        
}

// PUT/PATCH REQUEST
function updateTodo() {
    //Put request
    // axios
    //     .put('https://jsonplaceholder.typicode.com/todos/1', {title: 'Updated todo', completed: true})
    //     .then(res => showOutput(res))
    //     .catch(err => console.log(err));

    //Patch request
    axios
        .patch('https://jsonplaceholder.typicode.com/todos/1', {title: 'Updated todo', completed: true})
        .then(res => showOutput(res))
        .catch(err => console.log(err));
}

// DELETE REQUEST
function removeTodo() {
    axios
        .delete('https://jsonplaceholder.typicode.com/todos/1')
        .then(res => showOutput(res))
        .catch(err => console.log(err));
}

// SIMULTANEOUS DATA
function getData() {
    // axios.all([
    //     axios.get('https://jsonplaceholder.typicode.com/todos'),
    //     axios.get('https://jsonplaceholder.typicode.com/posts')
    // ])
    // .then(res => {
    //     console.log(res[0]);
    //     console.log(res[1]);
    //     showOutput(res[0]);
    // })
    // .catch(err => console.error(err));

    //Shorter code
    axios.all([
        axios.get('https://jsonplaceholder.typicode.com/todos'),
        axios.get('https://jsonplaceholder.typicode.com/posts')
    ])
    .then(axios.spread((todos, posts) => showOutput(todos)))
    .catch(err => console.error(err));
}


// CUSTOM HEADERS - We may need it to send a token attached to the header of the request in order to authorize ourselves
function customHeaders() {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'sometoken'
        }
    }

    axios
        .post('https://jsonplaceholder.typicode.com/todos', { 
            title: 'New todo from shorter', completed: false 
        }, 
        config)
        .then(res => showOutput(res))
        .catch(err => console.log(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
    const options = {
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/todos',
        data:{
            title: 'Hello World'
        },
        transformResponse: axios.defaults.transformResponse.concat(data => {
            data.title.toUpperCase();
            return data;
        })
    };

    axios(options).then(res => showOutput(res))
}

// ERROR HANDLING
function errorHandling() {
    axios
    .get('https://jsonplaceholder.typicode.com/todoss')
    .then(res => showOutput(res))
    .catch(err => {
        if(err.response)
        {
            //Server responded with other than the 200 range(i.e., success range)
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        }
        else if(err.request)
        {
            //Request was made but no response received
            console.error(err.request);
        }
        else
        {
            // Something happened in setting up the request that triggered an Error
            console.error(err.message);
        }
    });
}

// CANCEL TOKEN
function cancelToken() {

    const source = axios.CancelToken.source();

    axios
    .get('https://jsonplaceholder.typicode.com/todos',{
        cancelToken: source.token
    })
    .then(res => showOutput(res))
    .catch(thrown => {
        if(axios.isCancel(thrown)){
            console.log('Request canceled', thrown.message);
        }
    });

    if(true)
    {
        source.cancel('Request Canceled');
    }
}

// INTERCEPTING REQUESTS & RESPONSES - It should not be inside any function 
// This is a request interceptor. We can also create a response interceptor. Get the code at : https://www.npmjs.com/package/axios
axios.interceptors.request.use(
    config => {
            // Do something before request is sent
            console.log(
            `${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`
        );

        return config;
    },
    // Do something with request error
    err => { return Promise.reject(err); }
);



// AXIOS INSTANCES
// const axiosInstance = axios.create({
//     // Other custom settings
//     baseURL: 'https://jsonplaceholder.typicode.com'
// });

// axiosInstance.get('/comments').then(res => showOutput(res));


// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
