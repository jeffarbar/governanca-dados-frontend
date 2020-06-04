export function configureFakeBackend(http) {

    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
 
            setTimeout(() => {

                // authenticate
                if (url.endsWith('/autenticacao') && opts.method === 'POST') {
            
                    let params = JSON.parse(opts.body);
                    
                    /*
                    let responseJson = {
                        username: params.username,
                        token: 'teste'
                    };
                    resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) }); 
                    */
                    
                    let login = {
                        "adminLogin": true,
                        "login":  params.username,
                        "senha": params.password
                    }

                    http.post('/ldapauthentication/login',
                        login
                    ).then(function(response) {
                        console.log('LOGOU ' + JSON.stringify( response.data))

                        if( response.data.codigo === 0 ){
                            let responseJson = {
                                username: params.username,
                                token: response.data.token
                            };
                            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                        }else{
                            reject('Usuário ou senha inválida');
                        }     
                    }).catch(e => {
                        console.log( "ERRO NO LOGIN " +e )
                        reject('Falha na autenticação');
                    })    
                    
                }

                // get users
                if (url.endsWith('/str') && opts.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users)) });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}