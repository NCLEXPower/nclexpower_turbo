import { PlanType } from '@/components/blocks/HubBlocks/Settings/type';

// Standard = 0 & Fastrack 1,
export const Plan: PlanType[] = [
    {
        abbr: "PN",
        duration: 23,
        planName: 'Practical Nurse',
        planType: 0,
        price: 123,
        currency: "$",
        registered: true,
    },
    {
        abbr: "PN",
        duration: 23,
        planName: 'Practical Nurse',
        planType: 1,
        price: 123,
        currency: "$",
        registered: false
    }
]