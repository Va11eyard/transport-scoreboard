// /src/services/company.ts

export interface Video {
    id: number;
    uuid: string;
    name: string;
    url: string; // e.g. "/company/1/videos/1" or "/addresses/1/videos/11"
    activeFromDate: string;
    activeToDate: string;
}

export interface CompanyAddress {
    id: number;
    address: string;
    latitude: number;
    longitude: number;
    isActive: boolean;
    videos: Video[];
}

export interface Company {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    videos: Video[]; // Company video(s)
    addresses: CompanyAddress[];
}

export const getCompanies = async (): Promise<Company[]> => {
    const res = await fetch("/api/companies");
    if (!res.ok) throw new Error("Failed to fetch companies");
    return res.json();
};

export const getCompany = async (id: number): Promise<Company> => {
    const res = await fetch(`/api/companies/${id}`);
    if (!res.ok) throw new Error("Failed to fetch company details");
    return res.json();
};

export const createCompany = async (data: {
    name: string;
    description: string;
    isActive: boolean;
    video?: { name: string; activeFromDate: string; activeToDate: string };
}): Promise<Company> => {
    const res = await fetch("/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create company");
    return res.json();
};

export const updateCompany = async (
    id: number,
    data: {
        name: string;
        description: string;
        isActive: boolean;
        video?: { name: string; activeFromDate: string; activeToDate: string };
    }
): Promise<Company> => {
    const res = await fetch(`/api/companies/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update company");
    return res.json();
};

export const createAddress = async (
    companyId: number,
    data: {
        address: string;
        latitude: number;
        longitude: number;
        isActive: boolean;
        video?: { name: string; activeFromDate: string; activeToDate: string };
    }
): Promise<CompanyAddress> => {
    const res = await fetch(`/api/companies/${companyId}/addresses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create address");
    return res.json();
};

export const updateAddress = async (
    companyId: number,
    addressId: number,
    data: {
        address: string;
        latitude: number;
        longitude: number;
        isActive: boolean;
        video?: { name: string; activeFromDate: string; activeToDate: string };
    }
): Promise<CompanyAddress> => {
    const res = await fetch(`/api/companies/${companyId}/addresses/${addressId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update address");
    return res.json();
};
