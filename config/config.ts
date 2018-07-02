
export const config = {
    server: {
        port: 8081
    },
    googleAuth: {
        web: {
            clientID: '546854662215-mmnqq81j1bk4k1nf8jn1flugnf9eik28.apps.googleusercontent.com',
            projectID: 'Real Chat',
            authURI: 'https://accounts.google.com/o/oauth2/auth',
            tokenURI: 'https://accounts.google.com/o/oauth2/token',
            authProviderX509CertURL: 'https://www.googleapis.com/oauth2/v1/certs',
            // clientSecret: 'jgrr-5tXTubiqctMdaouUt14',
            redirectURIs: [
                'http://localhost:8081/auth/google/callback'
            ],
            javascriptOrigins: [
                'http://localhost:8081',
                'http://localhost:8082'
            ]
        }
    }
};
