import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Translation {
  [key: string]: string;
}

interface Translations {
  [languageCode: string]: Translation;
}

interface InternationalizationContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: string, fallback?: string) => string;
  availableLanguages: string[];
}

const translations: Translations = {
  en: {
    'welcome.title': 'Welcome to our clinic!',
    'welcome.checkInButton': 'Tap to check-in',
    'welcome.selectLanguage': 'Select your language',
    'checkIn.title': 'Patient identification',
    'checkIn.eidCard': 'Enter your eID card',
    'checkIn.heldAccount': 'Sign in with your Held account',
    'checkIn.noCard': "I don't have my eID card or Held app with me",
    'manual.forename': 'Enter the first letter of your forename',
    'manual.surname': 'Enter the first letter of your surname',
    'manual.decade': 'Enter the decade in which you were born',
    'manual.year': 'Enter the year in which you were born',
    'manual.month': 'Enter the month in which you were born',
    'manual.day': 'Enter the day in which you were born',
    'button.continue': 'Continue',
    'button.back': 'Back',
    'button.ok': 'OK',
    'button.no': 'No',
    'button.thisIsCorrect': 'This is correct',
    'loading.pleaseWait': 'Please wait...',
    'appointment.confirm': 'Is this your appointment?',
    'appointment.notFound': "We couldn't find your appointment",
    'appointment.notFoundText': 'Please report to an assistant at the front desk.',
    'final.welcome': 'Welcome!',
    'final.welcomeText': 'Please take a seat in the waiting room until you are called for your appointment.',
    'final.weCallSoon': "We'll call you soon",
    'final.weCallSoonText': 'We have noted your arrival, and your appointment is scheduled. Please take a coffee and have a seat in the waiting room until you are called for your appointment. It will be anytime soon!',
    'contact.verify': 'Verify your contact details',
    'contact.email': 'Email address',
    'contact.phone': 'Phone number',
    'contact.update': 'Update',
  },
  es: {
    'welcome.title': '¡Bienvenido a nuestra clínica!',
    'welcome.checkInButton': 'Toque para registrarse',
    'welcome.selectLanguage': 'Seleccione su idioma',
    'checkIn.title': 'Identificación del paciente',
    'checkIn.eidCard': 'Ingrese su tarjeta eID',
    'checkIn.heldAccount': 'Inicie sesión con su cuenta Held',
    'checkIn.noCard': 'No tengo mi tarjeta eID o la aplicación Held conmigo',
    'manual.forename': 'Ingrese la primera letra de su nombre',
    'manual.surname': 'Ingrese la primera letra de su apellido',
    'button.continue': 'Continuar',
    'button.back': 'Atrás',
    'button.ok': 'Aceptar',
    'button.no': 'No',
    'button.thisIsCorrect': 'Esto es correcto',
    'loading.pleaseWait': 'Por favor espere...',
    'appointment.confirm': '¿Es esta su cita?',
    'appointment.notFound': 'No pudimos encontrar su cita',
    'appointment.notFoundText': 'Por favor, repórtese con un asistente en recepción.',
    'final.welcome': '¡Bienvenido!',
    'final.welcomeText': 'Por favor tome asiento en la sala de espera hasta que lo llamen para su cita.',
    'final.weCallSoon': 'Te llamaremos pronto',
    'final.weCallSoonText': 'Hemos anotado su llegada, y su cita está programada. Por favor tome un café y tenga asiento en la sala de espera hasta que lo llamen para su cita. ¡Será en cualquier momento!',
    'contact.verify': 'Verifique sus datos de contacto',
    'contact.email': 'Dirección de correo electrónico',
    'contact.phone': 'Número de teléfono',
    'contact.update': 'Actualizar',
  },
  fr: {
    'welcome.title': 'Bienvenue dans notre clinique!',
    'welcome.checkInButton': 'Appuyez pour vous enregistrer',
    'welcome.selectLanguage': 'Sélectionnez votre langue',
    'checkIn.title': 'Identification du patient',
    'checkIn.eidCard': 'Insérez votre carte eID',
    'checkIn.heldAccount': 'Connectez-vous avec votre compte Held',
    'checkIn.noCard': "Je n'ai pas ma carte eID ou l'application Held avec moi",
    'manual.forename': 'Entrez la première lettre de votre prénom',
    'manual.surname': 'Entrez la première lettre de votre nom de famille',
    'button.continue': 'Continuer',
    'button.back': 'Retour',
    'button.ok': 'OK',
    'button.no': 'Non',
    'button.thisIsCorrect': 'Ceci est correct',
    'loading.pleaseWait': 'Veuillez patienter...',
    'appointment.confirm': 'Est-ce votre rendez-vous?',
    'appointment.notFound': 'Nous n\'avons pas pu trouver votre rendez-vous',
    'appointment.notFoundText': 'Veuillez vous présenter à un assistant à la réception.',
    'final.welcome': 'Bienvenue!',
    'final.welcomeText': 'Veuillez prendre place dans la salle d\'attente jusqu\'à ce qu\'on vous appelle pour votre rendez-vous.',
    'final.weCallSoon': 'Nous vous appellerons bientôt',
    'final.weCallSoonText': 'Nous avons noté votre arrivée, et votre rendez-vous est programmé. Veuillez prendre un café et vous asseoir dans la salle d\'attente jusqu\'à ce qu\'on vous appelle pour votre rendez-vous. Ce sera bientôt!',
    'contact.verify': 'Vérifiez vos coordonnées',
    'contact.email': 'Adresse e-mail',
    'contact.phone': 'Numéro de téléphone',
    'contact.update': 'Mettre à jour',
  }
};

const InternationalizationContext = createContext<InternationalizationContextType | undefined>(undefined);

interface InternationalizationProviderProps {
  children: ReactNode;
}

export const InternationalizationProvider: React.FC<InternationalizationProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');

  const setLanguage = (language: string) => {
    if (translations[language]) {
      setCurrentLanguage(language);
    }
  };

  const t = (key: string, fallback?: string): string => {
    const translation = translations[currentLanguage]?.[key];
    return translation || fallback || key;
  };

  const availableLanguages = Object.keys(translations);

  const value: InternationalizationContextType = {
    currentLanguage,
    setLanguage,
    t,
    availableLanguages
  };

  return (
    <InternationalizationContext.Provider value={value}>
      {children}
    </InternationalizationContext.Provider>
  );
};

export const useInternationalization = (): InternationalizationContextType => {
  const context = useContext(InternationalizationContext);
  if (!context) {
    throw new Error('useInternationalization must be used within an InternationalizationProvider');
  }
  return context;
};