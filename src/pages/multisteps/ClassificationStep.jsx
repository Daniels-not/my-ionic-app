import React from 'react';
import { IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonButton } from '@ionic/react';

const ClassificationStep = ({ handleSubmit, prevStep, formData, setFormData }) => {
  const handleClassificationChange = (e) => setFormData({ ...formData, classification: e.target.value });
  const handleYearChange = (e) => setFormData({ ...formData, year: e.target.value });

  return (
    <>
      <IonItem className="mb-4">
        <IonLabel position="floating" className="text-gray-600">Select classification</IonLabel>
        <IonSelect value={formData.classification} onIonChange={handleClassificationChange}>
          <IonSelectOption value="Freshman">Freshman</IonSelectOption>
          <IonSelectOption value="Sophomore">Sophomore</IonSelectOption>
          <IonSelectOption value="Junior">Junior</IonSelectOption>
          <IonSelectOption value="Senior">Senior</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem className="mb-4">
        <IonLabel position="floating" className="text-gray-600">Enter year</IonLabel>
        <IonInput type="number" value={formData.year} onIonChange={handleYearChange} placeholder="Enter year" />
      </IonItem>
      <div className="flex justify-between">
        <IonButton onClick={prevStep} className="bg-gray-500 text-white w-1/2 mr-2 py-2 rounded-lg">Previous</IonButton>
        <IonButton onClick={handleSubmit} className="bg-indigo-500 text-white w-1/2 py-2 rounded-lg">Submit</IonButton>
      </div>
    </>
  );
};

export default ClassificationStep;
