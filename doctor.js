async function loadPatients() {
    await checkSession();
    
    const { data: patients } = await window.sb.from('patients')
        .select(`*, alerts(severity), assessments(score, test_type)`);

    const list = document.getElementById('patient-list');
    list.innerHTML = '';

    patients.forEach(p => {
        // Determine Badge Color
        let badge = 'bg-green';
        let status = 'Stable';
        const reds = p.alerts.filter(a => a.severity === 'Red');
        const oranges = p.alerts.filter(a => a.severity === 'Orange');

        if(reds.length > 0) { badge = 'bg-red'; status = 'Critical'; }
        else if(oranges.length > 0) { badge = 'bg-orange'; status = 'Watch'; }

        list.innerHTML += `
            <div class="card" onclick="viewProfile('${p.id}')" style="cursor:pointer">
                <h3>${p.name} <span class="badge ${badge}">${status}</span></h3>
                <p>${p.gender}, ${p.age} years old</p>
                <small>Click to view details</small>
            </div>
        `;
    });
}

function viewProfile(id) {
    localStorage.setItem('current_patient', id);
    window.location.href = 'patient-profile.html';
}
