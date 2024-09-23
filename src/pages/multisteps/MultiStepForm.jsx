import React, { useState } from "react";
import { IonPage, IonContent, IonButton, IonProgressBar } from "@ionic/react";
import CareerStep from "./StudyStep";
import ClassesStep from "./ClassesStep";
import ClassificationStep from "./ClassificationStep";

const MultiStepForm = ({ history }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    career: "",
    classes: [],
    classification: "",
    year: "",
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = () => {
    localStorage.setItem("userFormData", JSON.stringify(formData));
    history.push("/dashboard");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <CareerStep
            nextStep={nextStep}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 2:
        return (
          <ClassesStep
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 3:
        return (
          <ClassificationStep
            handleSubmit={handleSubmit}
            prevStep={prevStep}
            formData={formData}
            setFormData={setFormData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding bg-gray-100">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
          <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-600">
            Complete Your Information
          </h2>
          <IonProgressBar value={step / 3} className="mb-4"></IonProgressBar>
          {renderStep()}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MultiStepForm;
