// /src/services/companyAddress.ts

export interface AddressVideo {
    id: number;
    uuid: string;
    name: string;
    url: string;
    activeFromDate: string;
    activeToDate: string;
}

export interface CompanyAddress {
    id: number;
    address: string;
    latitude: number;
    longitude: number;
    isActive: boolean;
    videos?: AddressVideo[];
}

// 1) GET /api/company-addresses/by-company?companyId={id}
export const getAddressesByCompany = async (companyId: number): Promise<CompanyAddress[]> => {
    const res = await fetch(`/api/company-addresses/by-company?companyId=${companyId}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch addresses: ${res.status}`);
    }
    return res.json();
};

// 2) POST /api/company-addresses
// For creating a new address, pass in {companyId, address, latitude, longitude, isActive}
export const createAddress = async (data: {
    companyId: number;
    address: string;
    latitude: number;
    longitude: number;
    isActive: boolean;
}): Promise<CompanyAddress> => {
    const res = await fetch("/api/company-addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error(`Failed to create address: ${res.status}`);
    }
    return res.json();
};

// 3) PUT /api/company-addresses/{id}
export const updateAddress = async (
    id: number,
    data: {
        address: string;
        latitude: number;
        longitude: number;
        isActive: boolean;
    }
): Promise<CompanyAddress> => {
    const res = await fetch(`/api/company-addresses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error(`Failed to update address: ${res.status}`);
    }
    return res.json();
};

// 4) POST /api/company-addresses/{id}/videos/upload
export const uploadAddressVideo = async (addressId: number, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`/api/company-addresses/${addressId}/videos/upload`, {
        method: "POST",
        body: formData,
    });
    if (!res.ok) {
        throw new Error(`Failed to upload address video: ${res.status}`);
    }
    return res.json();
};
