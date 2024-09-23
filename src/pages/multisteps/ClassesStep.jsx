import React from "react";
import {
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonButton,
} from "@ionic/react";

const ClassesStep = ({ nextStep, prevStep, formData, setFormData }) => {
  const handleClassesChange = (e) =>
    setFormData({ ...formData, classes: e.target.value });

  return (
    <>
      <IonItem className="mb-4">
        <IonLabel position="floating" className="text-gray-600">
          Select your classes
        </IonLabel>
        <IonSelect
          value={formData.classes}
          multiple={true}
          onIonChange={handleClassesChange}
        >
          <IonSelectOption value="Math">Math</IonSelectOption>
          <IonSelectOption value="Physics">Physics</IonSelectOption>
          <IonSelectOption value="Chemistry">Chemistry</IonSelectOption>
        </IonSelect>
      </IonItem>
      <div className="flex justify-between">
        <IonButton
          onClick={prevStep}
          className="bg-gray-500 text-white w-1/2 mr-2 py-2 rounded-lg"
        >
          Previous
        </IonButton>
        <IonButton
          onClick={nextStep}
          className="bg-indigo-500 text-white w-1/2 py-2 rounded-lg"
        >
          Next
        </IonButton>
      </div>
    </>
  );
};

export default ClassesStep;
