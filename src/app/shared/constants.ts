export const menus: any = [
    {
        name: 'Dashboard',
        url: 'dashboard',
        icon: 'dashboards.png',
        access: 'SUPER_USER,ORGANISATION_ADMIN,AGENCY_ADMIN'
    },
    {
        name: 'Campaigns',
        url: 'campaigns',
        icon: 'campaign.png',
        access: 'ORGANISATION_ADMIN'
    },{
        name: 'Outlets',
        url: 'outlets',
        icon: 'outlet.png',
        access: 'ORGANISATION_ADMIN'
    },
    // {
    //     name: 'Applications',
    //     url: 'applications',
    //     icon: 'data_entry.png',
    //     access: 'MODULE_DATA_ENTRY'
    // },
    // {
    //     name: 'My Applications',
    //     url: 'apply',
    //     icon: 'data_entry.png',
    //     access: 'MODULE_DATA_ENTRY'
    // },
    {
        name: 'Organisation',
        url: 'organisation',
        icon: 'organisations.png',
        access: 'SUPER_USER,ORGANISATION_VERIFIER'
    },
    {
        name: 'Agency',
        url: 'agency',
        icon: 'agents.png',
        access: 'SUPER_USER,ORGANISATION_ADMIN'
    },
    {
        name: 'Sign Boards',
        url: 'signboards',
        icon: 'planted.png',
        access: 'AGENCY_ADMIN'
    },{
        name: 'Users',
        url: 'users',
        icon: 'users.png',
        access: 'SUPER_USER,ORGANISATION_ADMIN,AGENCY_ADMIN'
    },
    // {
    //     name: 'Reports',
    //     url: 'reports',
    //     icon: 'reports.png',
    //     access: 'MODULE_REPORTING'
    // }
];

export const roles = [
    {id:'SUPER_USER',name:'Super User',value:'SUPER_USER'},
    {id:'ORGANISATION_ADMIN',name:'Organisation Administrator',value:'ORGANISATION_ADMIN'},
    {id:'ORGANISATION_VERIFIER',name:'Organisation Verifier',value:'ORGANISATION_VERIFIER'},
    {id:'AGENCY_NORMAL_USER',name:'Agency Normal User ',value:'AGENCY_NORMAL_USER'},
    {id:'AGENCY_ADMIN',name:'Agency Administrator',value:'AGENCY_ADMIN'},
]

