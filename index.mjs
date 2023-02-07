import pagarme from 'pagarme';

const encryptedKey = "your_encrypted_key"; // chave de criptografia (não confundir com a chave de API que aparece ao lado no mesmo painel)

const client = await pagarme.client.connect({ encryption_key: encryptedKey })

try {
  const transaction = await client.transactions.create({
    amount: 100,
    card_holder_name: 'Foo Bar',
    card_expiration_date: '0000', // 4 dígitos, sem hífem
    card_number: '0000000000000000', // 16 dígitos
    card_cvv: '000',
    installments: '1', // parcelamento
    customer: {
      external_id: "#000", // ID do cliente no seu sistema
      name: "Morpheus Fishburne",
      type: "individual",
      country: "br",
      email: "mopheus@nabucodonozor.com",
      "documents": [
        {
          type: "cpf",
          number: "00000000000"
        }
      ],
      "phone_numbers": ["+5551000000000"],
      "birthday": "1965-01-01"
    },
    "items": [
      {
        "id": "r123",
        "title": "Red pill",
        "unit_price": 1,
        "quantity": 1,
        "tangible": false
      },
    ]
  });
  console.log('transaction', { transaction });
} catch (error) {
  console.error(error.response.errors);
}
