import https from 'https';

export default async (req, res) => {
  const { body } = req;
  const { name, phone, birthDate, drivingExperience } = await JSON.parse(body);
  const msg = encodeURI(`
    <b>Новая заявка с сайта</b>

    <b>ФИО:</b> ${name}
    <b>Телефон:</b> ${phone}
    <b>Дата рождения:</b> ${birthDate}
    <b>Стаж вождения:</b> ${drivingExperience}
  `);

  const request = https.request(
    `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${process.env.CHAT_ID}&parse_mode=html&text=${msg}`,
    (response) => {
      let telegramData = '';
      response.on('data', (chunk) => {
        telegramData += chunk;
      });

      response.on('error', () => {
        res.status(500).json({ message: 'Ошибка' });
      });
      response.on('end', async () => {
        const parsedData = await JSON.parse(telegramData);
        if (parsedData.ok) {
          res.status(200).json({ message: 'Успешно' });
        } else {
          res.status(parsedData.error_code).json({
            message: parsedData.description,
          });
        }
      });
    }
  );
  request.end();
};
