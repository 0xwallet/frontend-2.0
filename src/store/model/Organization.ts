export class Organization {
    id !: string
    info ?: OrganizationInfo
    name !: string
}

export class OrganizationInfo {
    country ?: string
}

export class OrganizationInfoInput {
    country ?: string = ''
}