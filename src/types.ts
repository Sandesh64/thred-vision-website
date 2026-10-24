export interface RfqFormData {
  fullName: string;
  companyName: string;
  businessEmail: string;
  phone: string;
  selectedCategories: string[];
  orderQuantity: string;
  requirements: string;
}

export interface RfqFormErrors {
  fullName?: string;
  companyName?: string;
  businessEmail?: string;
  phone?: string;
  selectedCategories?: string[];
  orderQuantity?: string;
  requirements?: string;
}

export interface ManufacturingStage {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  checkpoint: string;
  machinesInvolved: string;
}

export interface MachineStat {
  name: string;
  count: number;
  category: 'Sewing' | 'Overlock & Specialized' | 'Finishing & Cutting';
}

export interface CompanyCredential {
  id: string;
  title: string;
  issuingAuthority: string;
  identifier: string;
  status: string;
  validity: string;
  summary: string;
}

export interface PillarDepartment {
  title: string;
  leadRole: string;
  responsibilities: string[];
}
