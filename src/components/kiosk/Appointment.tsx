import React from 'react';
import { Clock, AlertTriangle, MapPin, Phone } from 'lucide-react';
import { Appointment as AppointmentType } from '@/services/api';

interface AppointmentProps {
  appointment: AppointmentType;
  showLocation?: boolean;
  showWarning?: boolean;
  warningMessage?: string;
  className?: string;
  centered?: boolean;
}

const Appointment: React.FC<AppointmentProps> = ({
  appointment,
  showLocation = false,
  showWarning = false,
  warningMessage,
  className = "",
  centered = false
}) => {
  return (
    <div className={`bg-card border border-border rounded-lg p-6 shadow-sm ${className}`}>
      <div className={`${centered ? 'text-center' : 'flex items-start justify-between'}`}>
        <div className={`${centered ? 'w-full' : 'flex-1'}`}>
          {/* Time and Warning */}
          <div className={`${centered ? 'flex flex-col items-center space-y-2' : 'flex items-center space-x-4'} mb-3`}>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-xl font-semibold text-foreground">
                {appointment.startTime}
              </span>
            </div>
            
            {showWarning && warningMessage && (
              <div className="flex items-center space-x-2 text-warning">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-medium">{warningMessage}</span>
              </div>
            )}
          </div>

          {/* Patient and Doctor Info */}
          <div className={`space-y-2 ${centered ? 'text-center' : ''}`}>
            <div>
              <span className="text-muted-foreground">Patient: </span>
              <span className="font-semibold text-foreground text-lg">
                {appointment.patientName}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Doctor: </span>
              <span className="font-semibold text-foreground text-lg">
                {appointment.doctorTitle} {appointment.doctorForename} {appointment.doctorSurname}
              </span>
            </div>
          </div>

          {/* Location Info */}
          {showLocation && (
            <div className={`mt-4 pt-4 border-t border-border space-y-2 ${centered ? 'text-center' : ''}`}>
              <div className={`flex items-start space-x-2 ${centered ? 'justify-center' : ''}`}>
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="font-medium text-foreground">
                    {appointment.location.address}
                  </div>
                </div>
              </div>
              <div className={`flex items-center space-x-2 ${centered ? 'justify-center' : 'ml-7'}`}>
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {appointment.location.phone}
                </span>
              </div>
            </div>
          )}

          {/* Late Info */}
          {appointment.isLate && appointment.minutesLate && (
            <div className={`mt-3 flex items-center space-x-2 text-danger ${centered ? 'justify-center' : ''}`}>
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">
                You arrived {appointment.minutesLate} minutes late
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointment;