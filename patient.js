const emojis = ['0', '😢', '😐', '🙂', '😄', '🥳'];

function updateMoodUI(val) {
    document.getElementById('emoji').innerText = emojis[val];
}

async function logMood() {
    const user = await checkSession();
    const { data: patient } = await window.sb.from('patients')
        .select('id').eq('user_id', user.id).single();

    const val = document.getElementById('moodRange').value;
    const note = document.getElementById('moodNote').value;

    await window.sb.from('mood_logs').insert([{
        patient_id: patient.id,
        mood_score: val,
        note: note
    }]);
    
    alert("Mood Logged!");
}
