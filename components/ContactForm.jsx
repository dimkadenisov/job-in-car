import { Button, FormField, TextInput } from 'evergreen-ui';
import InputMask from 'react-input-mask';
import { Form, Field } from 'react-final-form';

export default function ContactForm() {
  const handleFormSubmit = async (values) => {
    console.log(values);

    try {
      const response = await fetch('/api/form', {
        method: 'POST',
        body: JSON.stringify(values),
      });

      const result = await response.json();
      console.log('result', result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      onSubmit={handleFormSubmit}
      render={({ handleSubmit, submiting, pristine, invalid, ...rest }) => {
        console.log({ submiting, pristine, invalid, ...rest });

        return (
          <form onSubmit={handleSubmit}>
            <Field
              name="name"
              required
              label="ФИО"
              placeholder="Фетисов Сергей Михайлович"
              autoComplete="name"
              validate={(value) =>
                value &&
                !value.match(/[\wа-яА-ЯёЁ]{2,}\s[\wа-яА-ЯёЁ]{2,}.*/) &&
                'Некорректно ФИО'
              }
            >
              {({ meta, input, ...props }) => (
                <FormField
                  label={props.label}
                  marginBottom={12}
                  validationMessage={meta.error}
                >
                  <TextInput height={40} {...props} {...input} />
                </FormField>
              )}
            </Field>
            <Field
              name="phone"
              required
              label="Телефон"
              placeholder="+7 (999) 359 23 11"
              type="tel"
              inputMode="tel"
            >
              {({ meta, input, ...props }) => (
                <FormField
                  label={props.label}
                  marginBottom={12}
                  validationMessage={meta.error}
                >
                  <InputMask
                    mask="+7 (999) 999 99 99"
                    maskPlaceholder={null}
                    {...input}
                  >
                    <TextInput height={40} {...props} />
                  </InputMask>
                </FormField>
              )}
            </Field>
            <Field
              name="birthDate"
              required
              label="Дата рождения"
              placeholder="12.05.1975"
              autoComplete="bday"
              inputMode="numeric"
            >
              {({ meta, input, ...props }) => (
                <FormField
                  label={props.label}
                  marginBottom={12}
                  validationMessage={meta.error}
                >
                  <InputMask
                    mask="99.99.9999"
                    maskPlaceholder={null}
                    {...input}
                  >
                    <TextInput height={40} {...props} />
                  </InputMask>
                </FormField>
              )}
            </Field>
            <Field
              name="drivingExperience"
              required
              label="Стаж вождения (лет)"
              placeholder="15"
              inputMode="numeric"
              type="number"
              format={(value) => value?.replace(/\D/, '')}
              validate={(value) => {
                if (value) {
                  if (Number(value) < 3) {
                    return 'Недостаточный опыт вождения';
                  }
                  if (Number(value) > 60) {
                    return 'Некорректное значение';
                  }
                }
              }}
            >
              {({ meta, input, ...props }) => (
                <FormField
                  label={props.label}
                  marginBottom={12}
                  validationMessage={meta.error}
                >
                  <TextInput height={40} {...props} {...input} />
                </FormField>
              )}
            </Field>
            <Button
              appearance="primary"
              disabled={pristine || invalid}
              isLoading={submiting}
              marginTop={12}
              height={40}
              width={280}
              justifyContent="center"
            >
              Submit
            </Button>
          </form>
        );
      }}
    />
  );
}
