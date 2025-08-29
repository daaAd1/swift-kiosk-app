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
    'eid.title': 'Patient identification',
    'eid.instruction': 'Enter your eID card',
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
    'loading.availableOptions': 'Loading available options...',
    'loading.availableYears': 'Loading available years...',
    'loading.availableMonths': 'Loading available months...',
    'loading.availableDays': 'Loading available days...',
    'loading.availableDecades': 'Loading available decades...',
    'loading.clinicInfo': 'Loading clinic information...',
    'appointment.confirm': 'Is this your appointment?',
    'appointment.notFound': "We couldn't find your appointment",
    'appointment.notFoundText': 'Please report to an assistant at the front desk.',
    'appointment.differentLocation': 'Your appointment is at a different location',
    'appointment.differentLocationText': "If you can't arrive on time, please call X.",
    'appointment.patientLate': 'We notice you arrived late on your appointment.',
    'appointment.patientLateText': 'Please report to an assistant at the front desk. Thank you!',
    'final.welcome': 'Welcome!',
    'final.welcomeText': 'Please take a seat in the waiting room until you are called for your appointment.',
    'final.weCallSoon': "We'll call you soon",
    'final.weCallSoonText': 'We have noted your arrival, and your appointment is scheduled. Please take a coffee and have a seat in the waiting room until you are called for your appointment. It will be anytime soon!',
    'final.delayTitle': 'We are sorry for the delay.',
    'final.delayText': 'It takes a bit longer than expected to prepare for your treatment. Please take a coffee and have a seat in the waiting room until you are called for your appointment. It will be anytime soon!',
    'final.eidWarning': 'Please report to an assistant at the front desk.',
    'final.eidWarningText': 'Your eID has not been registered in our system.',
    'contact.verify': 'Verify your contact details',
    'contact.email': 'Email address',
    'contact.phone': 'Phone number',
    'contact.update': 'Update',
    'contact.updateEmail': 'Update Email Address',
    'contact.updatePhone': 'Update Phone Number',
    'button.save': 'Save',
    'button.confirm': 'Confirm',
  },
  es: {
    'welcome.title': '¡Bienvenido a nuestra clínica!',
    'welcome.checkInButton': 'Toque para registrarse',
    'welcome.selectLanguage': 'Seleccione su idioma',
    'checkIn.title': 'Identificación del paciente',
    'checkIn.eidCard': 'Ingrese su tarjeta eID',
    'checkIn.heldAccount': 'Inicie sesión con su cuenta Held',
    'checkIn.noCard': 'No tengo mi tarjeta eID o la aplicación Held conmigo',
    'eid.title': 'Identificación del paciente',
    'eid.instruction': 'Ingrese su tarjeta eID',
    'manual.forename': 'Ingrese la primera letra de su nombre',
    'manual.surname': 'Ingrese la primera letra de su apellido',
    'manual.decade': 'Ingrese la década en la que nació',
    'manual.year': 'Ingrese el año en el que nació',
    'manual.month': 'Ingrese el mes en el que nació',
    'manual.day': 'Ingrese el día en el que nació',
    'button.continue': 'Continuar',
    'button.back': 'Atrás',
    'button.ok': 'Aceptar',
    'button.no': 'No',
    'button.thisIsCorrect': 'Esto es correcto',
    'loading.pleaseWait': 'Por favor espere...',
    'loading.availableOptions': 'Cargando opciones disponibles...',
    'loading.availableYears': 'Cargando años disponibles...',
    'loading.availableMonths': 'Cargando meses disponibles...',
    'loading.availableDays': 'Cargando días disponibles...',
    'loading.availableDecades': 'Cargando décadas disponibles...',
    'loading.clinicInfo': 'Cargando información de la clínica...',
    'appointment.confirm': '¿Es esta su cita?',
    'appointment.notFound': 'No pudimos encontrar su cita',
    'appointment.notFoundText': 'Por favor, repórtese con un asistente en recepción.',
    'appointment.differentLocation': 'Su cita es en una ubicación diferente',
    'appointment.differentLocationText': 'Si no puede llegar a tiempo, llame al X.',
    'appointment.patientLate': 'Notamos que llegó tarde a su cita.',
    'appointment.patientLateText': 'Por favor repórtese con un asistente en recepción. ¡Gracias!',
    'final.welcome': '¡Bienvenido!',
    'final.welcomeText': 'Por favor tome asiento en la sala de espera hasta que lo llamen para su cita.',
    'final.weCallSoon': 'Te llamaremos pronto',
    'final.weCallSoonText': 'Hemos anotado su llegada, y su cita está programada. Por favor tome un café y tenga asiento en la sala de espera hasta que lo llamen para su cita. ¡Será en cualquier momento!',
    'final.delayTitle': 'Lamentamos el retraso.',
    'final.delayText': 'Está tomando más tiempo de lo esperado preparar su tratamiento. Por favor tome un café y siéntese en la sala de espera hasta que lo llamen para su cita. ¡Será pronto!',
    'final.eidWarning': 'Por favor repórtese con un asistente en recepción.',
    'final.eidWarningText': 'Su eID no ha sido registrado en nuestro sistema.',
    'contact.verify': 'Verifique sus datos de contacto',
    'contact.email': 'Dirección de correo electrónico',
    'contact.phone': 'Número de teléfono',
    'contact.update': 'Actualizar',
    'contact.updateEmail': 'Actualizar Dirección de Correo',
    'contact.updatePhone': 'Actualizar Número de Teléfono',
    'button.save': 'Guardar',
    'button.confirm': 'Confirmar',
  },
  fr: {
    'welcome.title': 'Bienvenue dans notre clinique!',
    'welcome.checkInButton': 'Appuyez pour vous enregistrer',
    'welcome.selectLanguage': 'Sélectionnez votre langue',
    'checkIn.title': 'Identification du patient',
    'checkIn.eidCard': 'Insérez votre carte eID',
    'checkIn.heldAccount': 'Connectez-vous avec votre compte Held',
    'checkIn.noCard': "Je n'ai pas ma carte eID ou l'application Held avec moi",
    'eid.title': 'Identification du patient',
    'eid.instruction': 'Insérez votre carte eID',
    'manual.forename': 'Entrez la première lettre de votre prénom',
    'manual.surname': 'Entrez la première lettre de votre nom de famille',
    'manual.decade': 'Entrez la décennie de votre naissance',
    'manual.year': 'Entrez l\'année de votre naissance',
    'manual.month': 'Entrez le mois de votre naissance',
    'manual.day': 'Entrez le jour de votre naissance',
    'button.continue': 'Continuer',
    'button.back': 'Retour',
    'button.ok': 'OK',
    'button.no': 'Non',
    'button.thisIsCorrect': 'Ceci est correct',
    'loading.pleaseWait': 'Veuillez patienter...',
    'loading.availableOptions': 'Chargement des options disponibles...',
    'loading.availableYears': 'Chargement des années disponibles...',
    'loading.availableMonths': 'Chargement des mois disponibles...',
    'loading.availableDays': 'Chargement des jours disponibles...',
    'loading.availableDecades': 'Chargement des décennies disponibles...',
    'loading.clinicInfo': 'Chargement des informations de la clinique...',
    'appointment.confirm': 'Est-ce votre rendez-vous?',
    'appointment.notFound': 'Nous n\'avons pas pu trouver votre rendez-vous',
    'appointment.notFoundText': 'Veuillez vous présenter à un assistant à la réception.',
    'appointment.differentLocation': 'Votre rendez-vous est à un autre endroit',
    'appointment.differentLocationText': 'Si vous ne pouvez pas arriver à l\'heure, appelez le X.',
    'appointment.patientLate': 'Nous remarquons que vous êtes arrivé en retard à votre rendez-vous.',
    'appointment.patientLateText': 'Veuillez vous présenter à un assistant à la réception. Merci!',
    'final.welcome': 'Bienvenue!',
    'final.welcomeText': 'Veuillez prendre place dans la salle d\'attente jusqu\'à ce qu\'on vous appelle pour votre rendez-vous.',
    'final.weCallSoon': 'Nous vous appellerons bientôt',
    'final.weCallSoonText': 'Nous avons noté votre arrivée, et votre rendez-vous est programmé. Veuillez prendre un café et vous asseoir dans la salle d\'attente jusqu\'à ce qu\'on vous appelle pour votre rendez-vous. Ce sera bientôt!',
    'final.delayTitle': 'Nous sommes désolés du retard.',
    'final.delayText': 'Cela prend un peu plus de temps que prévu pour préparer votre traitement. Veuillez prendre un café et vous asseoir dans la salle d\'attente jusqu\'à ce qu\'on vous appelle pour votre rendez-vous. Ce sera bientôt!',
    'final.eidWarning': 'Veuillez vous présenter à un assistant à la réception.',
    'final.eidWarningText': 'Votre eID n\'a pas été enregistré dans notre système.',
    'contact.verify': 'Vérifiez vos coordonnées',
    'contact.email': 'Adresse e-mail',
    'contact.phone': 'Numéro de téléphone',
    'contact.update': 'Mettre à jour',
    'contact.updateEmail': 'Mettre à jour l\'adresse e-mail',
    'contact.updatePhone': 'Mettre à jour le numéro de téléphone',
    'button.save': 'Enregistrer',
    'button.confirm': 'Confirmer',
  },
  nl: {
    'welcome.title': 'Welkom in onze kliniek!',
    'welcome.checkInButton': 'Tik om in te checken',
    'welcome.selectLanguage': 'Selecteer uw taal',
    'checkIn.title': 'Patiënt identificatie',
    'checkIn.eidCard': 'Voer uw eID kaart in',
    'checkIn.heldAccount': 'Meld aan met uw Held account',
    'checkIn.noCard': 'Ik heb mijn eID kaart of Held app niet bij me',
    'eid.title': 'Patiënt identificatie',
    'eid.instruction': 'Voer uw eID kaart in',
    'manual.forename': 'Voer de eerste letter van uw voornaam in',
    'manual.surname': 'Voer de eerste letter van uw achternaam in',
    'manual.decade': 'Voer het decennium in waarin u geboren bent',
    'manual.year': 'Voer het jaar in waarin u geboren bent',
    'manual.month': 'Voer de maand in waarin u geboren bent',
    'manual.day': 'Voer de dag in waarop u geboren bent',
    'button.continue': 'Doorgaan',
    'button.back': 'Terug',
    'button.ok': 'OK',
    'button.no': 'Nee',
    'button.thisIsCorrect': 'Dit is correct',
    'loading.pleaseWait': 'Een moment geduld...',
    'loading.availableOptions': 'Beschikbare opties laden...',
    'loading.availableYears': 'Beschikbare jaren laden...',
    'loading.availableMonths': 'Beschikbare maanden laden...',
    'loading.availableDays': 'Beschikbare dagen laden...',
    'loading.availableDecades': 'Beschikbare decennia laden...',
    'loading.clinicInfo': 'Klinikinformatie laden...',
    'appointment.confirm': 'Is dit uw afspraak?',
    'appointment.notFound': 'We konden uw afspraak niet vinden',
    'appointment.notFoundText': 'Meld u aan bij een assistent aan de receptie.',
    'appointment.differentLocation': 'Uw afspraak is op een andere locatie',
    'appointment.differentLocationText': 'Als u niet op tijd kunt aankomen, bel dan X.',
    'appointment.patientLate': 'We merken dat u te laat bent voor uw afspraak.',
    'appointment.patientLateText': 'Meld u aan bij een assistent aan de receptie. Dank u!',
    'final.welcome': 'Welkom!',
    'final.welcomeText': 'Neem plaats in de wachtruimte tot u wordt opgeroepen voor uw afspraak.',
    'final.weCallSoon': 'We bellen u binnenkort',
    'final.weCallSoonText': 'We hebben uw aankomst genoteerd en uw afspraak staat gepland. Neem een koffie en ga zitten in de wachtruimte tot u wordt opgeroepen voor uw afspraak. Het zal snel zijn!',
    'final.delayTitle': 'Het spijt ons voor de vertraging.',
    'final.delayText': 'Het duurt iets langer dan verwacht om uw behandeling voor te bereiden. Neem een koffie en ga zitten in de wachtruimte tot u wordt opgeroepen voor uw afspraak. Het zal snel zijn!',
    'final.eidWarning': 'Meld u aan bij een assistent aan de receptie.',
    'final.eidWarningText': 'Uw eID is niet geregistreerd in ons systeem.',
    'contact.verify': 'Controleer uw contactgegevens',
    'contact.email': 'E-mailadres',
    'contact.phone': 'Telefoonnummer',
    'contact.update': 'Bijwerken',
    'contact.updateEmail': 'E-mailadres bijwerken',
    'contact.updatePhone': 'Telefoonnummer bijwerken',
    'button.save': 'Opslaan',
    'button.confirm': 'Bevestigen',
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