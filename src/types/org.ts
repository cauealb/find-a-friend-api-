export interface OrgCreate {
    nameOrg: string,
    email: string
    password: string
    address: string
    city: string
    number: number
}

export interface Org extends OrgCreate {
    idOrg?: string
}