import React from 'react';
import { IonIcon } from '@ionic/react';
import { mailOutline, logoLinkedin, paperPlane, logoGithub } from 'ionicons/icons';
import '../styles/BottomStyles.css';

function Bottom() {
  return (
    <div className='bottom'>
      <div className='centered-content'>
        <p className='upperP'>Do you like this website? We could work together! </p>
        <p>Contact me:</p>
      </div>
      <div className='icons'>
        <IonIcon icon={paperPlane} style={{ fontSize: '30px', cursor: 'pointer' }} onClick={() => window.open('https://t.me/o32f87')} />
        <IonIcon icon={mailOutline} style={{ fontSize: '30px', cursor: 'pointer' }} onClick={() => window.open('mailto:3f4g7b@gmail.com')} />
        <IonIcon icon={logoLinkedin} style={{ fontSize: '30px', cursor: 'pointer' }} onClick={() => window.open('https://www.linkedin.com/in/arsenii-pagaev')} />
        <IonIcon icon={logoGithub} style={{ fontSize: '30px', cursor: 'pointer' }} onClick={() => window.open('https://github.com/TiCh0v')} />
      </div>
    </div>
  );
}

export default Bottom;
