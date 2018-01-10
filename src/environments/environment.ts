// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    kinvey: {
        baseUrl: 'https://baas.kinvey.com',
        appKey: 'kid_ryaKCjCWf',
        appSecret: '79ed47387a934eacb8424b167a1466f9'
    }
};
