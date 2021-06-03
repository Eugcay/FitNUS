const config = {
    screens: {
        Landing: "landing",
        LoginScreen: "login",
        SignupScreen: "sign-up",
        Home: {
            path: 'home/:id',
            parse: (id) => `${id}`,
        },
        Profile: {
            path: "profile/:id",
            parse: (id) => `${id}`,
        },
        FitBud: {

            path: "fitbud/:id",
            parse: (id) => `${id}`
        }
    }
}


export default config