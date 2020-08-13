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
      render={({ handleSubmit, submiting, pristine }) => (
        <form onSubmit={handleSubmit}>
          <label>
            Имя
            <Field
              name="firstName"
              component="input"
              type="text"
              placeholder="Имя"
              required
            />
          </label>
          <label>
            Фамилия
            <Field
              name="lastName"
              component="input"
              type="text"
              placeholder="Фамилия"
              required
            />
          </label>
          <label>
            Телефон
            <Field
              name="phone"
              component="input"
              type="tel"
              placeholder="Телефон"
              required
            />
          </label>
          <label>
            Дата рождения
            <Field
              name="birthDate"
              component="input"
              type="text"
              placeholder="Дата рождения"
              required
            />
          </label>
          <label>
            Стаж вождения (лет)
            <Field
              name="drivingExperience"
              component="input"
              type="number"
              placeholder="Стаж вождения (лет)"
              required
            />
          </label>
          <button disabled={submiting || pristine} type="submit">
            Submit
          </button>
        </form>
      )}
    />
  );
}
