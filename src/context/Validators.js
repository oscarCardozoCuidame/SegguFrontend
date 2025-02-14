export const validateInsuranceForm = (formData) => {
  const errors = {};
  
  if (!formData.product.trim()) errors.product = 'El tipo de seguro es obligatorio.';
  if (!formData.policy_number.trim()) errors.policy_number = 'El número de póliza es obligatorio.';
  if (!/^\d+$/.test(formData.policy_number)) errors.policy_number = 'El número de póliza debe ser numérico.';
  if (!formData.renewal_date) errors.renewal_date = 'La fecha de renovación es obligatoria.';
  
  return errors;
};

export const validateHealthForm = (formData) => {
  const errors = {};
  
  if (!formData.citizenship_card.trim()) errors.citizenship_card = 'La cédula de ciudadanía es obligatoria.';
  if (!/^\d+$/.test(formData.citizenship_card)) errors.citizenship_card = 'La cédula de ciudadanía debe contener solo números.';
  if (!formData.profession.trim()) errors.profession = 'La profesión es obligatoria.';
  if (!formData.procedures.trim()) errors.procedures = 'Los procedimientos son obligatorios.';
  if (!formData.responsibility_value.trim()) errors.responsibility_value = 'El valor de responsabilidad es obligatorio.';
  if (!formData.work_city.trim()) errors.work_city = 'La ciudad de trabajo es obligatoria.';
  
  return errors;
};

export const validateHomeForm = (formData) => {
  const errors = {};

  if (!formData.citizenship_card.trim()) errors.citizenship_card = 'La cédula de ciudadanía es obligatoria.';
  if (!/^\d+$/.test(formData.citizenship_card)) errors.citizenship_card = 'La cédula de ciudadanía debe contener solo números.';
  if (!formData.property_value.trim()) errors.property_value = 'El valor de la propiedad es obligatorio.';
  if (!formData.property_type.trim()) errors.property_type = 'El tipo de propiedad es obligatorio.';
  if (!formData.stratum.trim()) errors.stratum = 'El estrato es obligatorio.';
  if (!formData.city.trim()) errors.city = 'La ciudad es obligatoria.';
  if (!formData.furniture_value.trim()) errors.furniture_value = 'El valor de los muebles es obligatorio.';
  if (!formData.electronics_value.trim()) errors.electronics_value = 'El valor de los electrónicos es obligatorio.';
  if (!formData.computer_value.trim()) errors.computer_value = 'El valor de los computadores es obligatorio.';
  if (!formData.valuables_value.trim()) errors.valuables_value = 'El valor de los objetos de valor es obligatorio.';
  
  return errors;
};

export const validateSoatForm = (formData) => {
  const errors = {};

  if (!formData.plate.trim()) errors.plate = 'La placa es obligatoria.';
  if (!formData.citizenship_card.trim()) errors.citizenship_card = 'La cédula de ciudadanía es obligatoria.';
  if (!/^\d+$/.test(formData.citizenship_card)) errors.citizenship_card = 'La cédula de ciudadanía debe contener solo números.';
  if (!formData.address.trim()) errors.address = 'La dirección es obligatoria.';
  if (!formData.city.trim()) errors.city = 'La ciudad es obligatoria.';
  if (!formData.email.trim()) errors.email = 'El correo electrónico es obligatorio.';
  if (!/^[^@]+@[^@]+\.[^@]+$/.test(formData.email)) errors.email = 'Debe ser un correo electrónico válido.';
  if (!formData.phone_number.trim()) errors.phone_number = 'El número de teléfono es obligatorio.';
  if (!/^\d+$/.test(formData.phone_number)) errors.phone_number = 'El número de teléfono debe ser numérico.';
  
  return errors;
};

export const validateVehicleForm = (formData) => {
  const errors = {};

  if (!formData.plate.trim()) errors.plate = 'La placa es obligatoria.';
  if (!formData.citizenship_card.trim()) errors.citizenship_card = 'La cédula de ciudadanía es obligatoria.';
  if (!/^\d+$/.test(formData.citizenship_card)) errors.citizenship_card = 'La cédula de ciudadanía debe contener solo números.';
  if (!formData.birth_date) errors.birth_date = 'La fecha de nacimiento es obligatoria.';
  if (!formData.city.trim()) errors.city = 'La ciudad es obligatoria.';
  
  return errors;
};

export const validateSegmentNewUser = (segment, formData) => {
  const errors = {};

  switch (segment) {
    case 0: // Validaciones para el primer segmento
      if (!formData.email.trim()) errors.email = 'El correo electrónico es obligatorio.';
      if (!/^[^@]+@[^@]+\.[^@]+$/.test(formData.email)) errors.email = 'Debe ser un correo electrónico válido.';
      if (!formData.password.trim()) errors.password = 'La contraseña es obligatoria.';
      break;

    case 1: // Validaciones para el segundo segmento
      if (!formData.name.trim()) errors.name = 'El nombre es obligatorio.';
      if (!formData.lastname.trim()) errors.lastname = 'Los apellidos son obligatorios.';
      if (!formData.username.trim()) errors.username = 'El nombre de usuario es obligatorio.';
      if (!formData.birth_date) errors.birth_date = 'La fecha de nacimiento es obligatoria.';
      break;

    case 2: // Validaciones para el tercer segmento
      if (!formData.citizenship_card.trim()) errors.citizenship_card = 'La cédula de ciudadanía es obligatoria.';
      if (!/^\d+$/.test(formData.citizenship_card)) errors.citizenship_card = 'La cédula debe contener solo números.';
      if (!formData.role.trim()) errors.role = 'La profesión es obligatoria.';
      if (!formData.locate.trim()) errors.locate = 'La dirección es obligatoria.';
      break;

    case 3: // Validaciones para el cuarto segmento
      if (!formData.img_profile_path) errors.img_profile_path = 'La imagen de perfil es obligatoria.';
      break;

    default:
      break;
  }

  return errors;
};
