export interface Assistance {
    uid: string;
    name: string;
    description: string;
    organization: {
        name: string;
        logo: {
            url: string;
        }
    },
    redirectUrl: string;
    amount: string;
    type: string;
    conditionsSection: string;
    proceduresSection: string;
    amountSection: string;
}
