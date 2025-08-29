import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border" style={{ height: 'var(--kiosk-footer-height)' }}>
      <div className="kiosk-container">
        <div className="flex items-center justify-center h-full px-16">
          <div className="flex items-center space-x-3 text-muted-foreground">
            <span className="kiosk-body-sm">Operated and secured by</span>
            <div className="flex items-center space-x-2 bg-muted px-3 py-1 rounded-lg">
              <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-bold">K</span>
              </div>
              <span className="font-semibold text-foreground">KIOSK</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;