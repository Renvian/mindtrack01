// Register
async function register(email, password, role, name, age, gender) {
    const { data, error } = await window.sb.auth.signUp({
        email, password,
        options: { data: { role } } // Store role in metadata
    });
    if (error) return alert(error.message);

    if (role === 'patient') {
        // Create Patient Profile
        await window.sb.from('patients').insert([
            { user_id: data.user.id, name, age, gender }
        ]);
    }
    alert("Registered! Please login.");
    window.location.href = "login.html";
}

// Login
async function login(email, password) {
    const { data, error } = await window.sb.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message);

    const role = data.user.user_metadata.role;
    window.location.href = role === 'doctor' ? 'doctor-dashboard.html' : 'patient-dashboard.html';
}

// Check Session
async function checkSession() {
    const { data } = await window.sb.auth.getSession();
    if (!data.session) window.location.href = "login.html";
    return data.session.user;
}

async function logout() {
    await window.sb.auth.signOut();
    window.location.href = "index.html";
}
