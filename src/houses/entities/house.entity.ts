export class House {
    id: string;
    leaseType: string;
    location: string;
    address: string;
    complexName: string;
    totalUnits: number;
    landlord: string;
    completionDate: string;
    buildingType: string;
    heatingType: string;
    elevator: boolean;
    parkingSpaces: number;
    housingInfo: string;
    status: '공고중' | '마감';
    applicationUrl: string;
  }
  