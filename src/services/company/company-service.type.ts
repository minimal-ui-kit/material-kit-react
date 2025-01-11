export type PartnerType = 'CARRIER' | 'WAREHOUSE' | 'CUSTOMS' | 'SUPPLIER' | 'CUSTOMER';

export interface BankAccount {
    bankName: string;
    branch: string;
    accountNumber: string;
    iban: string;
    currency: string;
}

export interface InsuranceInfo {
    provider: string;
    policyNumber: string;
    coverage: string;
    expiryDate: Date;
}

export interface CompanyDetails {
    id: string;
    name: string;
    type: PartnerType;
    taxNumber: string;
    taxOffice?: string;
    phone: string;
    email: string;
    website?: string;
    address: string;
    status: 'active' | 'passive';
    foundedYear?: number;
    employeeCount?: number;
    certifications?: string[];
    operationAreas?: string[];
    description?: string;
    insuranceInfo?: InsuranceInfo;
    bankAccounts?: BankAccount[];
}

export interface ContactAvailability {
    workHours: string;
    timezone: string;
    preferredContactMethod: 'PHONE' | 'EMAIL' | 'WHATSAPP';
}

export interface ContactPerson {
    id: string;
    companyId: string;
    name: string;
    position: string;
    department: string;
    phone: string;
    mobile?: string;
    email: string;
    isMainContact: boolean;
    availability: ContactAvailability;
}

export type Contract = {
    id: string;
    companyId: string;
    type: 'SERVICE' | 'PARTNERSHIP' | 'FRAMEWORK';
    startDate: Date;
    endDate: Date;
    status: 'DRAFT' | 'ACTIVE' | 'EXPIRED' | 'TERMINATED';
    terms: {
        paymentTerms: string;
        deliveryTerms: string;
        specialConditions: string[];
    };
    attachments: {
        id: string;
        name: string;
        type: string;
        url: string;
    }[];
    history: {
        date: Date;
        action: string;
        user: string;
        notes: string;
    }[];
};

export type Performance = {
    partnerId: string;
    metrics: {
        onTimeDelivery: number;
        qualityScore: number;
        responseTime: number;
        incidentCount: number;
    };
    reviews: {
        date: Date;
        score: number;
        feedback: string;
        reviewer: string;
    }[];
    incidents: {
        date: Date;
        type: string;
        description: string;
        status: 'OPEN' | 'RESOLVED' | 'CLOSED';
        resolution?: string;
    }[];
};

export type Pricing = {
    partnerId: string;
    rateCards: {
        id: string;
        name: string;
        validFrom: Date;
        validTo: Date;
        currency: string;
        services: {
            serviceType: string;
            unitPrice: number;
            unit: string;
            conditions: string[];
        }[];
    }[];
    specialOffers: {
        id: string;
        description: string;
        validFrom: Date;
        validTo: Date;
        discountRate: number;
        conditions: string[];
    }[];
};

export type Analytics = {
    partnerId: string;
    financials: {
        totalRevenue: number;
        outstandingBalance: number;
        paymentHistory: {
            date: Date;
            amount: number;
            type: 'INVOICE' | 'PAYMENT';
            status: 'PENDING' | 'COMPLETED' | 'OVERDUE';
        }[];
    };
    operationalMetrics: {
        serviceUtilization: number;
        incidentResolutionTime: number;
        customerSatisfaction: number;
    };
    trends: {
        period: string;
        metrics: {
            name: string;
            value: number;
            change: number;
        }[];
    }[];
};