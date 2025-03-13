// /src/services/company.ts

export interface Video {
    id: number;
    uuid: string;
    name: string;
    url: string;
    activeFromDate: string;
    activeToDate: string;
}

export interface Company {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    videos?: Video[];
    // addresses are fetched separately from companyAddress.ts in this approach
}

// 1) GET /api/companies
export const getCompanies = async (): Promise<Company[]> => {
    const res = await fetch("/api/companies");
    if (!res.ok) {
        throw new Error(`Failed to fetch companies: ${res.status}`);
    }
    return res.json();
};

// 2) POST /api/companies
export const createCompany = async (data: {
    name: string;
    description: string;
    isActive: boolean;
}): Promise<Company> => {
    const res = await fetch("/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error(`Failed to create company: ${res.status}`);
    }
    return res.json();
};

// 3) GET /api/companies/{id}
export const getCompany = async (id: number): Promise<Company> => {
    const res = await fetch(`/api/companies/${id}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch company: ${res.status}`);
    }
    return res.json();
};

// 4) PUT /api/companies/{id}
export const updateCompany = async (
    id: number,
    data: {
        name: string;
        description: string;
        isActive: boolean;
    }
): Promise<Company> => {
    const res = await fetch(`/api/companies/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error(`Failed to update company: ${res.status}`);
    }
    return res.json();
};

// 5) POST /api/companies/{id}/videos/upload
export const uploadCompanyVideo = async (id: number, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`/api/companies/${id}/videos/upload`, {
        method: "POST",
        body: formData,
    });
    if (!res.ok) {
        throw new Error(`Failed to upload company video: ${res.status}`);
    }
    return res.json();
};
