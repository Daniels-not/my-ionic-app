import React from 'react';
import { IonItem, IonLabel, IonSelect, IonSelectOption, IonButton } from '@ionic/react';

const StudyStep = ({ nextStep, formData, setFormData }) => {
  const handleCareerChange = (e) => setFormData({ ...formData, career: e.target.value });

  return (
    <>
      <IonItem className="mb-4">
        <IonLabel position="floating" className="text-gray-600">Select your career</IonLabel>
        <IonSelect value={formData.career} placeholder="Select One" onIonChange={handleCareerChange}>
          <IonSelectOption value="Engineering">Engineering</IonSelectOption>
          <IonSelectOption value="Medicine">Medicine</IonSelectOption>
          <IonSelectOption value="Business">Business</IonSelectOption>
        </IonSelect>
      </IonItem>
      <div className="text-center">
        <IonButton onClick={nextStep} className="bg-indigo-500 text-white w-full py-2 rounded-lg">Next</IonButton>
      </div>
    </>
  );
};

export default StudyStep;
