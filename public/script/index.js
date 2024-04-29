
function createCard(prescriptionData) {
    // Iterate through each prescription in the patient data
    prescriptionData.forEach(prescription => {
        // Extract data from the prescription object
        const name = prescription.name;
        const adharNo = prescription.adharnum;
        const review = prescription.review;
        const medicalRequirements = prescription.medicalRequirements;
        const medicines = prescription.medicines;
        const createdAt = new Date(prescription.createdAt).toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
        // Create HTML for medicines table
        let medicinesTable = `
            <table class="medicines-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Medicine Name</th>
                        <th>ID</th>
                        <th>Quantity</th>
                        
                    </tr>
                </thead>
                <tbody>
        `;
        medicines.forEach(medicine => {
            // Extract data from each medicine object
            const medicineName = medicine.medicineName;
            const rank = medicine.rank;
            const quantity = medicine.quantity;
            const ID = medicine.id; // Assuming dosage is present in the medicine object

            // Append medicine information to the medicines table
            medicinesTable += `
                <tr>
                    <td>${rank}</td>
                    <td>${medicineName}</td>
                    <td>${ID}</td>
                    <td>${quantity}</td>
                    
                </tr>
            `;
        });
        medicinesTable += `
                </tbody>
            </table>
        `;

        // Create HTML for the card
        const cardContainer = document.querySelector('.left .card-container');
        const newCard = document.createElement('div');
        newCard.classList.add('card');
        newCard.innerHTML = `
            <p>Review: ${review}</p>
            <p>Medical Requirements: ${medicalRequirements}</p>
            <h4>Prescribed Medicines:</h4>
            ${medicinesTable}
            <p>Created At: ${createdAt}</p>
        `;

        // Append the new card to the card container
        cardContainer.appendChild(newCard);
    });
}



function displayPatientInfo(patientData) {
    document.getElementById('firstNamePlaceholder').textContent = data.FirstName;
    document.getElementById('lastNamePlaceholder').textContent = data.lastName;
    document.getElementById('dobPlaceholder').textContent = data.DOB;
    document.getElementById('sexPlaceholder').textContent = data.Sex;
    document.getElementById('heightPlaceholder').textContent = data.Height;
    document.getElementById('weightPlaceholder').textContent = data.Weight;
    document.getElementById('maritalStatusPlaceholder').textContent = data.MaritialStatus;
    document.getElementById('contactNumberPlaceholder').textContent = data.ContactNumber;
    document.getElementById('emailPlaceholder').textContent = data.Email;
    document.getElementById('emergencyNumberPlaceholder').textContent = data.EmergencyNumber;
    document.getElementById('adharNoPlaceholder').textContent = data.AdharNo;
    adharnumber = data.AdharNo;
    // Show the patient info container
    document.getElementById('patient-info-container').style.display = 'block';
}