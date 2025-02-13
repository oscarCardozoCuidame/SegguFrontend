import React, { useState, useEffect } from 'react';
import InputText from '../../../../components/inputs/InputText';
import InputDate from '../../../../components/inputs/InputDate';
import InputSelect from '../../../../components/inputs/InputSelect';
import InputFile from '../../../../components/inputs/InputFile';
import ErrorPopUp from '../../../../components/errors/ErrorPopUp';
import { useInsuranceService } from '../../../../services/Insurance.service';
import { useCompaniesService } from '../../../../services/Companies.service';
import { 
  validateInsuranceForm, 
  validateHealthForm, 
  validateHomeForm,
  validateSoatForm,
  validateVehicleForm
} from '../../../../context/Validators';

import './AddInsuranceForm.scss';

const AddInsuranceForm = () => {
  // Estados para los datos de los formularios
  const [insuranceFormData, setInsuranceFormData] = useState({
    user_id: '',
    health_id: '',
    home_id: '',
    soat_id: '',
    vehicle_id: '',
    product: 'Póliza Todo Riesgo – Auto o Moto',
    policy_number: '', 
    renewal_date: '', 
    coverage: '', 
    asist: '', 
    company_id: '', 
  });  
  const [healthFormData, setHealthFormData] = useState({
    citizenship_card: '',
    profession: '',
    procedures: '',
    responsibility_value: '',
    work_city: '',
  });
  const [homeFormData, setHomeFormData] = useState({
    citizenship_card: '',
    property_value: '',
    property_type: '',
    stratum: '',
    city: '',
    furniture_value: '',
    electronics_value: '',
    computer_value: '',
    valuables_value: '',
  });
  const [soatFormData, setSoatFormData] = useState({
    plate: '',
    citizenship_card: '',
    address: '',
    city: '',
    email: '',
    phone_number: '',
  });
  const [vehicleFormData, setVehicleFormData] = useState({
    plate: '',
    citizenship_card: '',
    birth_date: '',
    city: '',
  });
      
  const formSetters = {
    insurance: setInsuranceFormData,
    home: setHomeFormData,
    soat: setSoatFormData,
    vehicle: setVehicleFormData,
    health: setHealthFormData,
  };
  const isAutoInsurance = insuranceFormData.product === 'Póliza Todo Riesgo – Auto o Moto';
  const isResponsibilityCivil = insuranceFormData.product === 'Responsabilidad Civil Médica';
  const isHomeInsurance = insuranceFormData.product === 'Póliza Hogar';
  const isSoatInsurance = insuranceFormData.product === 'SOAT';
  


  const { createInsurance } = useInsuranceService();
  const { getAllCompanies } = useCompaniesService();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getAllCompanies(); // Espera a que la promesa se resuelva
        setCompanies(data); // Asigna el resultado a la constante de estado
      } catch (error) {
        console.error('Error al obtener las compañías:', error);
      }
    };

    fetchCompanies(); // Llama a la función asincrónica
  }, [getAllCompanies]);

  const closeAddInsuranceForm = () => {
    const addInsuranceForm = document.querySelector('.add-insurance-form');
    const insuranceForm = document.querySelector('.insurance-form');
    const mainHomr = document.querySelector('.main-home');

    addInsuranceForm.style.display = 'none';
    mainHomr.style.overflowY = 'scroll';
    insuranceForm.style.height = '0';
  };

  //----------------------------------------------------- Métodos para manejar los Inputs -----------------------------------------------------//

  const handleChange = (e, formType) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    formSetters[formType]((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleDateChange = (e, formType) => {
    const { name, value } = e.target;

    formSetters[formType]((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (base64Image, formType, fieldName) => {
    if (!base64Image) {
      alert("No se pudo procesar la imagen.");
      return;
    }
  
    formSetters[formType]((prevState) => ({
      ...prevState,
      [fieldName]: base64Image, // Guarda la imagen en Base64.
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError([]);
  
    // Validación de todos los formularios
    const insuranceErrors = validateInsuranceForm(insuranceFormData);
    const healthErrors = isResponsibilityCivil ? validateHealthForm(healthFormData) : {};
    const homeErrors = isHomeInsurance ? validateHomeForm(homeFormData) : {};
    const soatErrors = isSoatInsurance ? validateSoatForm(soatFormData) : {};
    const vehicleErrors = isAutoInsurance ? validateVehicleForm(vehicleFormData) : {};
  
    // Reuniendo todos los errores
    const allErrors = [
      ...Object.values(insuranceErrors).map(msg => ({ id: `insurance-${Math.random()}`, message: msg })),
      ...Object.values(healthErrors).map(msg => ({ id: `health-${Math.random()}`, message: msg })),
      ...Object.values(homeErrors).map(msg => ({ id: `home-${Math.random()}`, message: msg })),
      ...Object.values(soatErrors).map(msg => ({ id: `soat-${Math.random()}`, message: msg })),
      ...Object.values(vehicleErrors).map(msg => ({ id: `vehicle-${Math.random()}`, message: msg })),
    ];
  
    // Si hay errores, se muestra y se detiene el envío
    if (allErrors.length > 0) {
      setError(allErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await createInsurance(insuranceFormData, healthFormData, homeFormData, soatFormData, vehicleFormData);
      alert('¡Seguro creado exitosamente!');
    } catch (err) { 
      console.error('Error al crear el seguro:', err.message);
      setError([{ id: `general-${Math.random()}`, message: 'Ocurrió un error al registrar el seguro. Por favor, intenta de nuevo.' }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  //----------------------------------------------------- Métodos para manejar los errores -----------------------------------------------------//

  const renderErrorPopUps = () => {
    return error.map((err) => (
      <ErrorPopUp
        key={err.id}
        message={err.message}
        onClose={() => handleCloseError(err.id)}
      />
    ));
  };

  const handleCloseError = (id) => {
    setError((prevErrors) => prevErrors.filter((error) => error.id !== id));
  };

  return (
    <div className="add-insurance-form">
      <form className="insurance-form" onSubmit={handleSubmit}>
        <h1>Registrar Seguro</h1>

        <div className="inputs-form">

          <InputSelect
              name="product"
              value={insuranceFormData.product}
              span="Tipo de Seguro"
              options={[
                { value: 'Póliza Todo Riesgo – Auto o Moto', label: 'Póliza Todo Riesgo – Auto o Moto' },
                { value: 'Responsabilidad Civil Médica', label: 'Responsabilidad Civil Médica' },
                { value: 'Póliza Hogar', label: 'Póliza Hogar' },
                { value: 'SOAT', label: 'SOAT' },
              ]}
              onChange={(e) => handleChange(e, 'insurance')}
          />

          <hr />

          {/* Campos comunes */}

          <h2 className='title-insurance-form'>{insuranceFormData.product}</h2>

          <InputText
            type="text"
            name="policy_number"
            value={insuranceFormData.policy_number}
            span="Número de poliza"
            inputClass="input-field"
            onChange={(e) => handleChange(e, 'insurance')}
            iconName="person"
          />
          <InputSelect
            name="company_id"
            value={insuranceFormData.company_id}
            span="Empresa aseguradora"
            options={[
              { value: '', label: 'Seleccione una opción' }, // Primera opción
              ...companies.map((company) => ({
                value: company.company_id,
                label: company.name,
              })),
            ]}
            onChange={(e) => handleChange(e, 'insurance')}
          />
          <InputDate
            name="renewal_date"
            span="Fecha de renovación"
            inputClass="date-input"
            value={insuranceFormData.renewal_date}
            onChange={(e) => handleDateChange(e, 'insurance')}
          />
          <InputFile
            name="coverage"
            span="Archivo cobertura"
            inputClass="custom-input-class"
            value={insuranceFormData.coverage}
            onChange={(base64) => handleFileChange(base64,"insurance", "coverage")}
          />
          <InputFile
            name="asist"
            span="Archivo asistencia"
            inputClass="custom-input-class"
            value={insuranceFormData.asist}
            onChange={(base64) => handleFileChange(base64,"insurance", "asist")}
          />

          <br />
          <hr />
          <br />

          {/* Formularios Condicionales según tipo de seguro */}
          {isAutoInsurance && (
            <>
              <InputText
                type="text"
                name="plate"
                value={vehicleFormData.plate}
                span="Placa"
                inputClass="input-field"
                onChange={(e) => handleChange(e, 'vehicle')}
              />
              <InputText
                type="text"
                name="citizenship_card"
                value={vehicleFormData.citizenship_card}
                span="Documento de identidad"
                inputClass="input-field"
                onChange={(e) => handleChange(e, 'vehicle')}
              />
              <InputText
                type="text"
                name="city"
                value={vehicleFormData.city}
                span="Ciudad de Circulación"
                inputClass="input-field"
                onChange={(e) => handleChange(e, 'vehicle')}
              />
            </>
          )}

          {isResponsibilityCivil && (
            <>
              <InputText
                type="text"
                name="citizenship_card"
                value={healthFormData.citizenship_card}
                span="Documento de identidad"
                inputClass="input-field"
                onChange={(e) => handleChange(e, 'health')}
              />
              <InputText
                type="text"
                name="profession"
                value={healthFormData.profession}
                span="Actividad Profesional"
                inputClass="input-field"
                onChange={(e) => handleChange(e, 'health')}
              />
              <InputText
                type="text"
                name="procedures"
                value={healthFormData.procedures}
                span="Procedimientos Realizados"
                inputClass="input-field"
                onChange={(e) => handleChange(e, 'health')}
              />
              <InputText
                type="text"
                name="responsibility_value"
                value={healthFormData.responsibility_value}
                span="Valor de Responsabilidad"
                inputClass="input-field"
                onChange={(e) => handleChange(e, 'health')}
              />
              <InputText
                type="text"
                name="work_city"
                value={healthFormData.work_city}
                span="Ciudad en la que Labora"
                inputClass="input-field"
                onChange={(e) => handleChange(e, 'health')}
              />
            </>
          )}

          {isHomeInsurance && (
            <>
              <InputText
                type="text"
                name="citizenship_card"
                value={homeFormData.citizenship_card}
                span="Documento de Identidad"
                inputClass="input-field"
                onChange={(e) => handleChange(e, 'home')}
              />
              <InputText
                type="text"
                name="property_value"
                value={homeFormData.property_value}
                span="Valor Comercial Inmueble"
                inputClass="input-field"
                onChange={(e) => handleChange(e, 'home')}
              />
              <InputSelect
                name="property_type"
                value={homeFormData.property_type}
                span="Tipo de Inmueble"
                options={[
                  { value: 'Casa', label: 'Casa' },
                  { value: 'Apto', label: 'Apartamento' },
                  { value: 'Campo', label: 'Casa de Campo' },
                ]}
                onChange={(e) => handleChange(e, 'home')}
              />
              <InputText
                type="text"
                name="stratum"
                value={homeFormData.stratum}
                span="Estrato"
                inputClass="input-field"
                onChange={(e) => handleChange(e, 'home')}
              />
              <InputText
                type="text"
                name="city"
                value={homeFormData.city}
                span="Ciudad"
                inputClass="input-field"
                onChange={(e) => handleChange(e, 'home')}
              />
              <InputText
                type="text"
                name="furniture_value"
                value={homeFormData.furniture_value}
                span="Valor Muebles y Enseres"
                inputClass="input-field"
                onChange={(e) => handleChange(e, 'home')}
              />
              <InputText
                type="text"
                name="electronics_value"
                value={homeFormData.electronics_value}
                span="Valor Electrodomésticos"
                inputClass="input-field"
                onChange={(e) => handleChange(e, 'home')}
              />
              <InputText
                type="text"
                name="computer_value"
                value={homeFormData.computer_value}
                span="Valor Equipo de Computo"
                inputClass="input-field"
                onChange={(e) => handleChange(e, 'home')}
              />
              <InputText
                type="text"
                name="valuables_value"
                value={homeFormData.valuables_value}
                span="Valor Objetos de Valor"
                inputClass="input-field"
                onChange={(e) => handleChange(e, 'home')}
              />
            </>
          )}

          {isSoatInsurance && (
            <>
              <InputText
                type="text"
                name="plate"
                value={soatFormData.plate}
                span="Placa"
                inputClass="input-field"
                onChange={(e) => handleChange(e, 'soat')}
              />
              <InputText
                type="text"
                name="citizenship_card"
                value={soatFormData.citizenship_card}
                span="Documento de identidad"
                inputClass="input-field"
                onChange={(e) => handleChange(e, 'soat')}
              />
              <InputText
                type="text"
                name="address"
                value={soatFormData.address}
                span="Dirección de Residencia"
                inputClass="input-field"
                onChange={(e) => handleChange(e, 'soat')}
              />
              <InputText
                type="text"
                name="city"
                value={soatFormData.city}
                span="Ciudad"
                inputClass="input-field"
                onChange={(e) => handleChange(e, 'soat')}
              />
              <InputText
                type="email"
                name="email"
                value={soatFormData.email}
                span="Correo Electrónico"
                inputClass="input-field"
                onChange={(e) => handleChange(e, 'soat')}
              />
              <InputText
                type="text"
                name="phone_number"
                value={soatFormData.phone_number}
                span="Número Celular"
                inputClass="input-field"
                onChange={(e) => handleChange(e, 'soat')}
              />
            </>
          )}

        </div>

        {/* Botón de envío */}
        <div className="buttons">
          <button
            type="button"
            className="btn btn-atras"
            onClick={closeAddInsuranceForm}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="btn btn-siguiente" 
          >
            Agregar
          </button>
        </div>
      </form>
      <div className='errors-alert'>
        {renderErrorPopUps()}
      </div>
    </div>
  );
};

export default AddInsuranceForm;