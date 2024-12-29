export type PlanType = {
    abbr: string,
    duration: number,
    planName: string,
    planType: number, // Standard = 0 & Fastrack 1,
    price: number,
    currency: string,
    registered: boolean
}