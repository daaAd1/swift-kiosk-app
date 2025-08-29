// KIOSK API Service Layer
// Prepared for API integration with placeholder data and delays

export interface ClinicInfo {
  name: string;
  logo: string;
  address: string;
  phone: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface CheckInMethod {
  id: string;
  name: string;
  enabled: boolean;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientForename: string;
  patientSurname: string;
  doctorTitle: string;
  doctorForename: string;
  doctorSurname: string;
  startTime: string;
  location: {
    address: string;
    phone: string;
  };
  isLate: boolean;
  minutesLate?: number;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  needsVerification: boolean;
}

export interface PatientFilters {
  forenameInitial?: string;
  surnameInitial?: string;
  birthDecade?: string;
  birthYear?: string;
  birthMonth?: string;
  birthDay?: string;
}

// Placeholder data
const PLACEHOLDER_CLINIC: ClinicInfo = {
  name: "Central Medical Clinic",
  logo: "/placeholder-logo.png",
  address: "123 Medical Center Dr, Healthcare City",
  phone: "+1 (555) 123-4567"
};

const PLACEHOLDER_LANGUAGES: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

const PLACEHOLDER_CHECKIN_METHODS: CheckInMethod[] = [
  { id: "eid", name: "eID Card", enabled: true },
  { id: "held", name: "Held Account", enabled: true },
];

const PLACEHOLDER_APPOINTMENT: Appointment = {
  id: "APT001",
  patientName: "John M. Doe",
  patientForename: "John",
  patientSurname: "Doe",
  doctorTitle: "Dr.",
  doctorForename: "Sarah",
  doctorSurname: "Johnson",
  startTime: "14:30",
  location: {
    address: "Building B, Floor 2, Room 205",
    phone: "+1 (555) 123-4567"
  },
  isLate: false
};

const PLACEHOLDER_CONTACT: ContactInfo = {
  email: "john.doe@email.com",
  phone: "+1 (555) 987-6543",
  needsVerification: true
};

// API delay simulation
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class KioskAPI {
  // Welcome screen API calls
  static async getClinicInfo(): Promise<ClinicInfo> {
    await delay(300);
    return PLACEHOLDER_CLINIC;
  }

  static async getAvailableLanguages(): Promise<Language[]> {
    await delay(300);
    return PLACEHOLDER_LANGUAGES;
  }

  static async getAvailableCheckInMethods(): Promise<CheckInMethod[]> {
    await delay(300);
    return PLACEHOLDER_CHECKIN_METHODS;
  }

  // Manual check-in API calls
  static async getAvailableLetters(field: 'forename' | 'surname', filters: PatientFilters): Promise<string[]> {
    await delay(300);
    // Simulate filtering based on previous selections
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  }

  static async getAvailableDecades(filters: PatientFilters): Promise<string[]> {
    await delay(300);
    return ['1940s', '1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s'];
  }

  static async getAvailableYears(decade: string, filters: PatientFilters): Promise<string[]> {
    await delay(300);
    const baseYear = parseInt(decade.substring(0, 4));
    return Array.from({ length: 10 }, (_, i) => (baseYear + i).toString());
  }

  static async getAvailableMonths(filters: PatientFilters): Promise<string[]> {
    await delay(300);
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }

  static async getAvailableDays(month: string, year: string, filters: PatientFilters): Promise<string[]> {
    await delay(300);
    const daysInMonth = new Date(parseInt(year), ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].indexOf(month) + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
  }

  // Appointment filtering and verification
  static async findAppointments(filters: PatientFilters): Promise<{ appointments: Appointment[], isFiltered: boolean }> {
    await delay(300);
    // Simulate appointment filtering
    return {
      appointments: [PLACEHOLDER_APPOINTMENT],
      isFiltered: Object.keys(filters).length >= 3 // Filtered when we have enough criteria
    };
  }

  static async getAppointmentDetails(appointmentId: string): Promise<Appointment | null> {
    await delay(300);
    return appointmentId === PLACEHOLDER_APPOINTMENT.id ? PLACEHOLDER_APPOINTMENT : null;
  }

  // Check-in process
  static async performCheckIn(appointmentId: string): Promise<{
    success: boolean;
    alreadyCheckedIn: boolean;
    hasDelay: boolean;
    isLate: boolean;
    needsContactVerification: boolean;
    needsEidRegistration: boolean;
    contactInfo?: ContactInfo;
  }> {
    await delay(300);
    return {
      success: true,
      alreadyCheckedIn: false,
      hasDelay: Math.random() > 0.7, // 30% chance of delay
      isLate: Math.random() > 0.8, // 20% chance of being late
      needsContactVerification: Math.random() > 0.6, // 40% chance needs verification
      needsEidRegistration: Math.random() > 0.9, // 10% chance needs eID registration
      contactInfo: PLACEHOLDER_CONTACT
    };
  }

  static async getContactInfo(patientId: string): Promise<ContactInfo> {
    await delay(300);
    return PLACEHOLDER_CONTACT;
  }

  static async updateContactInfo(patientId: string, contactInfo: Partial<ContactInfo>): Promise<boolean> {
    await delay(300);
    return true;
  }
}