export interface OrgCreate {
    nameOrg: string,
    email: string
    password: string
    address: string
    number: string
}

export interface Org extends OrgCreate {
    idOrg?: string
}